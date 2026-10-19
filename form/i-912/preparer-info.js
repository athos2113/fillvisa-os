(function () {
 function update(document) {
  const get = id => document.getElementById(id);
  const statement = I912Flow.read(7);
  const used = statement.requestor_used_preparer !== false;
  get('preparerDetails').hidden = !used;
  get('preparerNotice').hidden = used;
  get('preparerNotice').textContent = 'Part 7 indicates that you did not use a preparer. This section does not apply. Change Part 7 if someone prepared this request for you.';
  const fields = [...get('preparerDetails').querySelectorAll('input, select')];
  fields.forEach(el => { el.disabled = !used; el.required = used && el.hasAttribute('data-required'); el.setCustomValidity(''); });
  if (!used) return;
  const attorney = get('preparer_attorney').checked;
  get('preparerRepresentationSection').hidden = !attorney;
  for (const id of ['preparer_representation_extends', 'preparer_representation_not_extends']) {
   const el = get(id); el.disabled = !attorney; el.required = attorney;
   if (!attorney) {
    el.checked = false; el.classList.remove('is-valid', 'is-invalid'); el.removeAttribute('aria-invalid');
    const feedback = get(el.dataset.feedbackId);
    if (feedback) { feedback.hidden = true; feedback.className = ''; }
   }
  }
 get('preparer_number').required = !!get('preparer_unit_type').value;
  const country = get('preparer_country').value.trim().toLowerCase().replace(/\./g, '');
  const us = ['us','usa','united states','united states of america'].includes(country);
  get('preparer_state').required = get('preparer_zip').required = us;
  if (us && get('preparer_zip').value && !/^\d{5}(-\d{4})?$/.test(get('preparer_zip').value)) get('preparer_zip').setCustomValidity('Enter a five-digit ZIP Code or ZIP+4.');
  for (const id of ['preparer_telephone','preparer_mobile']) {
   const el = get(id), digits = el.value.replace(/\D/g, '');
   if (el.value && (!/^[+()\d .-]+$/.test(el.value) || digits.length < 7 || digits.length > 15)) el.setCustomValidity('Enter a telephone number containing 7–15 digits.');
  }
  const date = get('preparer_sign_date'), now = new Date();
  date.required = !!get('preparer_sign').value;
  date.max = [now.getFullYear(), String(now.getMonth()+1).padStart(2,'0'), String(now.getDate()).padStart(2,'0')].join('-');
 }
 window.I912Preparer = { update };
   // Run after section.js has restored the saved hidden PNG value.
   document.addEventListener('DOMContentLoaded', () => {
      const canvas = document.getElementById('preparer_sign_canvas');
      const input = document.getElementById('preparer_sign');
      const ctx = canvas.getContext('2d');
      let drawing = false, version = 0;
      const image = new Image(), savedVersion = version;
      image.onload = () => { if (version === savedVersion) ctx.drawImage(image, 0, 0, canvas.width, canvas.height); };
      if (input.value.startsWith('data:image/png;base64,')) image.src = input.value;
      const point = event => {
         const rect = canvas.getBoundingClientRect();
         return [(event.clientX - rect.left) * canvas.width / rect.width, (event.clientY - rect.top) * canvas.height / rect.height];
      };
      const save = () => input.dispatchEvent(new Event('input', { bubbles: true }));
      canvas.addEventListener('pointerdown', event => {
         event.preventDefault(); version++; drawing = true;
         canvas.setPointerCapture(event.pointerId);
         const [x, y] = point(event);
         ctx.beginPath(); ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = '#000';
         ctx.moveTo(x, y); ctx.lineTo(x + 0.1, y); ctx.stroke();
      });
      canvas.addEventListener('pointermove', event => { if (drawing) { ctx.lineTo(...point(event)); ctx.stroke(); } });
      const finish = () => { if (!drawing) return; drawing = false; input.value = canvas.toDataURL('image/png'); save(); };
      for (const event of ['pointerup', 'pointercancel', 'lostpointercapture']) canvas.addEventListener(event, finish);
      document.getElementById('clearSignature').addEventListener('click', () => {
         version++; drawing = false; ctx.clearRect(0, 0, canvas.width, canvas.height); input.value = ''; save();
      });
   });
})();
