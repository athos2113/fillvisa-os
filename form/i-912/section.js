/* Shared autosave and navigation for the screenshot-built I-912 sections. */
(function () {
   'use strict';
   const form = document.getElementById('sectionForm');
   const part = Number(form.dataset.part);
   const controls = [...form.querySelectorAll('input[id], textarea[id], select[id]')];
   const status = document.getElementById('saveStatus');
   let storageReady = true;
   const autosaveToast = document.createElement('div');
   autosaveToast.id = 'autosave-toast';
   autosaveToast.style.cssText = 'display:none; position:fixed; bottom:30px; right:30px; background:#d1e7dd; color:#0f5132; padding:12px 20px; border-radius:6px; box-shadow:0 2px 8px rgba(0,0,0,0.15); z-index:1000;';
   autosaveToast.innerText = '\u2705 Autosaved';
   autosaveToast.setAttribute('role', 'status');
   document.body.appendChild(autosaveToast);
   let toastTimer;
   let lastSavedData;
   function showAutosaveToast() {
      clearTimeout(toastTimer);
      autosaveToast.style.display = 'block';
      toastTimer = setTimeout(() => { autosaveToast.style.display = 'none'; }, 1500);
   }
   const feedback = new Map();
   const radioFeedback = new Map();
   controls.forEach(el => {
      let message = el.type === 'radio' ? radioFeedback.get(el.name) : null;
      if (!message) {
         message = document.createElement('div');
         message.id = el.id + '-feedback';
         message.hidden = true;
         if (el.type === 'radio') {
            // Keep feedback outside the options row so it cannot change flex wrapping.
            el.parentElement.parentElement.insertAdjacentElement('afterend', message);
            radioFeedback.set(el.name, message);
         } else {
            (el.closest('.input-group') || (el.type === 'checkbox' ? el.parentElement : el)).insertAdjacentElement('afterend', message);
         }
      }
      el.dataset.feedbackId = message.id;
      el.setAttribute('aria-describedby', [el.getAttribute('aria-describedby'), message.id].filter(Boolean).join(' '));
      feedback.set(el, message);
   });
   function validateField(el) {
      if (el.disabled) {
         el.classList.remove('is-invalid', 'is-valid');
         el.removeAttribute('aria-invalid');
         feedback.get(el).hidden = true;
         feedback.get(el).className = '';
         return '';
      }
      let error = '';
      const row = el.closest('[data-application-row], [data-benefit-row]');
      const label = (row ? 'Row ' + (row.dataset.applicationRow || row.dataset.benefitRow) + ' — ' : '') + (el.labels?.[0]?.textContent.trim() || el.id);
      if (I912Flow.basisIds.includes(el.id)) {
         if (!I912Flow.basisIds.some(id => data()[id])) error = 'Select at least one basis for your request.';
      } else if (el.type === 'radio') {
         if (controls.some(input => input.type === 'radio' && input.name === el.name && input.required && !input.disabled) && !controls.some(input => input.type === 'radio' && input.name === el.name && input.checked)) error = 'Select an answer for: ' + (el.closest('fieldset')?.querySelector('legend')?.textContent.trim() || el.name);
      } else if (el.required && !el.value.trim()) error = label + ' is required.';
      else if (!el.validity.valid) {
         error = el.id === 'requestor_anumber' ? 'A-Number must contain 7–9 digits, without the A prefix.'
            : el.id === 'requestor_uscis_account' ? 'USCIS Online Account Number must contain exactly 12 digits.'
            : el.id === 'requestor_ssn' ? 'U.S. Social Security Number must contain exactly 9 digits, or be left blank.'
            : label + ': ' + el.validationMessage;
      }
      el.classList.toggle('is-invalid', !!error);
      el.classList.toggle('is-valid', !error);
      el.setAttribute('aria-invalid', String(!!error));
      const message = feedback.get(el);
      message.hidden = false;
      message.className = (error ? 'invalid-feedback' : 'valid-feedback') + ' d-block';
      message.textContent = error || (el.type !== 'checkbox' && !el.value.trim() ? 'Optional — left blank.' : 'Looks good.');
      return error;
   }
   function data() {
      const result = Object.fromEntries(controls.map(el => [el.id, ['checkbox', 'radio'].includes(el.type) ? el.checked : el.disabled ? '' : el.value]));
      if (part === 8 || part === 9) {
         const prefix = part === 8 ? 'interpreter' : 'preparer';
         for (const unit of ['apt', 'ste', 'flr']) result[prefix + '_' + unit] = result[prefix + '_unit_type'] === unit;
      }
      return result;
   }
   function conditionalFields() {
      if (part === 9) window.I912Preparer.update(document);
      if (part === 8) window.I912Interpreter.update(document);
      if (part === 7) window.I912Requestor.update(document);
      if (part === 5) window.I912Income.update(document);
      if (part === 6) window.I912Hardship.update(document);
      form.querySelectorAll('[data-application-row], [data-benefit-row]').forEach(row => {
         const fields = [...row.querySelectorAll('input')];
         const active = (row.dataset.applicationRow || row.dataset.benefitRow) === '1' || fields.some(el => el.value.trim());
         row.querySelectorAll('[data-row-required]').forEach(el => { el.required = active; });
         if (row.dataset.benefitRow) {
            const awarded = fields.find(el => el.id.endsWith('_awarded_date'));
            const expires = fields.find(el => el.id.endsWith('_expires_date'));
            expires.min = awarded.value || '';
         }
      });
      const explanation = document.getElementById('requestor_marital_other_explanation');
      if (!explanation) return;
      const selected = document.getElementById('requestor_marital_other').checked;
      document.getElementById('maritalOtherSection').hidden = !selected;
      explanation.disabled = !selected;
      explanation.required = selected;
      if (!selected) validateField(explanation);
   }
   function report(error) {
      storageReady = false;
      status.textContent = 'Your responses could not be saved or restored. Check browser storage before continuing.';
      status.className = 'text-danger';
      console.error('I-912 storage error', error);
   }
   function basis() { return part === 1 ? data() : I912Flow.read(1); }
   function navigation() {
      const active = I912Flow.route(basis());
      const previous = document.getElementById('previousSection');
      if (previous) {
         const prior = active[active.indexOf(part) - 1];
         previous.href = I912Flow.sections.find(section => section[0] === prior)?.[1] || 'basis-for-request.html';
      }
      for (const nav of document.querySelectorAll('[data-workflow-nav]')) {
         nav.replaceChildren();
         for (const [number, href, title] of I912Flow.sections) {
            if (!active.includes(number) && number !== part) continue;
            const link = document.createElement('a');
            link.href = href;
            link.className = 'list-group-item list-group-item-action' + (number === part ? ' active' : '');
            if (number === part) link.setAttribute('aria-current', 'step');
            link.textContent = 'Part ' + number + ': ' + title + (localStorage.getItem('i912Valid-' + number) === 'true' ? ' ✅' : '');
            nav.append(link);
         }
         const download = document.createElement('a');
         download.href = 'download.html';
         download.className = 'list-group-item list-group-item-action';
         download.textContent = 'Preview and Download';
         nav.append(download);
      }
      if (part === 1) document.getElementById('routeSummary').textContent = active.length === 1
         ? 'Select at least one basis to see your sections.' : 'Your request includes Parts ' + active.join(', ') + '.';
   }
   function validateBasis() {
      if (part !== 1) return;
      document.getElementById(I912Flow.basisIds[0]).setCustomValidity(
         I912Flow.basisIds.some(id => data()[id]) ? '' : 'Select at least one basis for your request.');
   }
   function save() {
      if (!storageReady) return false;
      try {
         // Merge to preserve later Part 2 fields as additional PDF pages are added.
         localStorage.setItem('i912-' + part, JSON.stringify({ ...I912Flow.read(part), ...data() }));
         localStorage.setItem('i912Valid-' + part, 'false');
         status.textContent = 'Saved in this browser.';
         const currentData = JSON.stringify(data());
         if (currentData !== lastSavedData) showAutosaveToast();
         lastSavedData = currentData;
         navigation();
         return true;
      } catch (error) { report(error); return false; }
   }
   try {
      const saved = I912Flow.read(part);
      controls.forEach(el => { if (['checkbox', 'radio'].includes(el.type)) el.checked = saved[el.id] === true; else el.value = saved[el.id] ?? ''; });
      if (part === 8 && !Object.prototype.hasOwnProperty.call(saved, 'interpreter_unit_type')) {
         document.getElementById('interpreter_unit_type').value = ['apt', 'ste', 'flr'].find(unit => saved['interpreter_' + unit] === true) || '';
      }
      const birthDates = form.querySelectorAll('#requestor_dob, [data-birth-date]');
      birthDates.forEach(dob => {
         const today = new Date();
         dob.max = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, '0'), String(today.getDate()).padStart(2, '0')].join('-');
      });
      const selfRelationship = document.getElementById('application_1_relationship');
      if (selfRelationship) selfRelationship.value = 'Self';
      conditionalFields();
      lastSavedData = JSON.stringify(data());
      navigation();
   } catch (error) { report(error); }
   for (const event of ['input', 'change']) form.addEventListener(event, event => {
      if (!controls.includes(event.target)) return;
      validateBasis();
      conditionalFields();
      if (I912Flow.basisIds.includes(event.target.id)) {
         controls.filter(el => I912Flow.basisIds.includes(el.id)).forEach(validateField);
      } else if (event.target.type === 'radio') {
         controls.filter(el => el.type === 'radio' && el.name === event.target.name).forEach(validateField);
      } else if (event.target.closest('[data-application-row], [data-benefit-row]')) {
         event.target.closest('[data-application-row], [data-benefit-row]').querySelectorAll('input').forEach(validateField);
      } else validateField(event.target);
      save();
   });
   form.addEventListener('submit', event => {
      event.preventDefault();
      validateBasis();
      conditionalFields();
      const errors = [...new Set(controls.map(validateField).filter(Boolean))];
      if (errors.length) {
         alert('Please fix the following issues:\n\n' + errors.join('\n'));
         controls.find(el => el.classList.contains('is-invalid'))?.focus();
         return;
      }
      if (!save()) return;
      try {
         if (form.dataset.complete === 'true') {
            localStorage.setItem('i912Valid-' + part, 'true');
            location.href = I912Flow.next(part, basis());
         } else {
            status.textContent = 'Saved. The remaining Part 2 questions will be added from the next PDF page.';
            alert('✓ Information validated and saved. Part 2 continues on the next PDF page.');
         }
      } catch (error) { report(error); }
   });
})();
