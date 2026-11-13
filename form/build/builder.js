(function () {
   'use strict';
   const B = window.FillvisaBuilder;
   const $ = id => document.getElementById(id);
   const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
   const icon = name => `<i class="bi bi-${name}" aria-hidden="true"></i>`;
   const url = (page, id) => `${page}.html?id=${encodeURIComponent(id)}`;
   function message(text, error = false) {
      $('message').className = `builder-message alert ${error ? 'alert-danger' : 'alert-success'}`;
      $('message').textContent = text;
   }
   function report(error) { message(error.name === 'QuotaExceededError' ? 'Browser storage is full. Your latest changes could not be saved. Keep this page open while you free space.' : error.message || 'Browser storage is unavailable. Allow storage to save this form.', true); }
   function download(value, name) {
      const objectUrl = URL.createObjectURL(new Blob([value], { type: 'application/pdf' }));
      const a = document.createElement('a');
      a.href = objectUrl; a.download = name; a.click();
      setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
   }
   function inputs(f, preview = false, value = '', interactive = false) {
      const id = `${preview ? 'preview_' : 'answer_'}${f.id}`;
      const attrs = `id="${id}" name="${esc(f.id)}" ${f.required ? 'required' : ''} ${preview && !interactive ? 'disabled tabindex="-1"' : ''} aria-describedby="${id}_description${preview ? '' : ` ${id}_error`}"`;
      if (!B.isInput(f)) return '';
      if (f.type === 'textarea') return `<textarea class="form-control" rows="3" ${attrs} placeholder="${esc(f.placeholder)}">${esc(value)}</textarea>`;
      if (f.type === 'select') return `<select class="form-select" ${attrs}><option value="">${esc(f.placeholder || 'Select an option')}</option>${f.options.map(o => `<option value="${esc(o)}" ${o === value ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select>`;
      if (f.type === 'radio') return f.options.map((o, i) => `<div class="form-check"><input class="form-check-input" type="radio" ${attrs.replace(`id="${id}"`, `id="${id}_${i}"`)} value="${esc(o)}" ${o === value ? 'checked' : ''}><label class="form-check-label" for="${id}_${i}">${esc(o)}</label></div>`).join('');
      if (f.type === 'checkbox') return `<div class="form-check"><input class="form-check-input" type="checkbox" ${attrs} ${value === true ? 'checked' : ''}><label class="form-check-label" for="${id}">${esc(f.placeholder || 'Yes / I agree')}</label></div>`;
      return `<input class="form-control" type="${f.type}" ${f.type === 'number' ? 'step="any"' : ''} ${attrs} placeholder="${esc(f.placeholder)}" value="${esc(value)}">`;
   }
   function fieldBody(f, preview = false, value = '', interactive = false) {
      const id = `${preview ? 'preview_' : 'answer_'}${f.id}`;
      if (!B.isInput(f)) return `<h2 class="h4 mb-2">${esc(f.label)}</h2><p class="field-description mb-0">${esc(f.description)}</p>`;
      return `<div class="field-control-row">${f.type === 'radio' ? `<span id="${id}_label" class="form-label fw-bold">` : `<label for="${id}" class="form-label fw-bold">`}${esc(f.label)}${f.required ? ' <span class="text-primary" aria-label="required">*</span>' : ''}${f.type === 'radio' ? '</span>' : '</label>'}${preview ? '' : `<button type="button" class="comment-toggle" data-comment="${f.id}" aria-label="Comment for ${esc(f.label)}" aria-expanded="false" aria-controls="comment_panel_${f.id}">${icon('chat-left-text')}</button>`}</div><p class="field-description" id="${id}_description">${esc(f.description)}</p><div class="field-inputs" ${f.type === 'radio' ? `role="group" aria-labelledby="${id}_label"` : ''}>${inputs(f, preview, value, interactive)}</div>${preview ? '' : `<div class="invalid-feedback" id="${id}_error">${esc(f.type === 'checkbox' ? 'Please check this box to continue.' : f.type === 'radio' || f.type === 'select' ? 'Please select an option.' : 'Please enter a valid value for this field.')}</div>`}`;
   }
   function applyVisibility(container, config, values) {
      const visible = B.visibility(config, values);
      container.querySelectorAll('[data-render-field]').forEach(section => {
         section.hidden = !visible[section.dataset.renderField];
         section.querySelectorAll('input, select, textarea, button').forEach(el => {
            el.disabled = !visible[section.dataset.renderField];
            if (el.disabled && el.setCustomValidity) {
               el.setCustomValidity(''); el.classList.remove('is-invalid', 'is-valid'); el.removeAttribute('aria-invalid');
            }
         });
         if (section.hidden) section.querySelectorAll('.invalid-feedback').forEach(el => el.classList.remove('d-block'));
      });
      return visible;
   }
   function landing() {
      let skipped = 0;
      const records = [];
      for (let i = 0; i < localStorage.length; i++) {
         const key = localStorage.key(i);
         if (!key.startsWith('buildConfig-')) continue;
         try {
            const record = B.read(localStorage, key);
            B.validate(record.draft);
            records.push(record);
         } catch { skipped++; }
      }
      records.sort((a, b) => String(b.savedAt).localeCompare(String(a.savedAt)));
      $('savedForms').innerHTML = records.length ? records.map(r => `<article class="saved-form"><div><h3>${esc(r.draft.title)}</h3><span class="small text-body-secondary">${r.draft.fields.filter(B.isInput).length} fields · ${r.published ? 'Published' : 'Draft'} · Saved ${esc(new Date(r.savedAt).toLocaleString())}</span></div><div class="builder-actions"><a class="btn btn-outline-primary btn-sm" href="${url('editor', r.draft.id)}">Edit form</a>${r.published ? `<a class="btn btn-primary btn-sm" href="${url('live', r.draft.id)}">Open live</a>` : ''}</div></article>`).join('') : '<div class="feature-card text-center py-5"><i class="bi bi-file-earmark-plus"></i><h3 class="h5 mt-3">Your first form starts here</h3><p class="text-body-secondary">Start with a few client details, then make it your own.</p><a class="btn btn-primary" href="editor.html">Create a form</a></div>';
      if (skipped) message(`${skipped} saved form(s) could not be read. Their stored data has been left intact.`, true);
   }
   function editor() {
      const requested = new URLSearchParams(location.search).get('id');
      let record = null, expected = null;
      if (requested) {
         const key = B.keys(requested).config;
         expected = localStorage.getItem(key);
         record = B.read(localStorage, key);
         if (!record) throw new Error('This saved form was not found in this browser. Go to My forms to create a form.');
         B.validate(record.draft);
      }
      let draft = record ? B.clone(record.draft) : B.starter();
      let saved = record ? JSON.stringify(draft) : null;
      let selected = draft.fields[0]?.id;
      let dragging = null;
      let testing = false;
      let testAnswers = {};
      const undo = [];
      const dirty = () => JSON.stringify(draft) !== saved;
      function refreshStatus() {
         $('saveStatus').textContent = dirty() ? 'Unsaved changes' : record?.published && JSON.stringify(record.published) === saved ? 'Published · Saved' : 'Draft saved';
         $('openLive').hidden = !record?.published;
         $('openLive').href = url('live', draft.id);
         $('toolbarTitle').textContent = draft.title || 'Untitled form';
         $('previewTitle').textContent = draft.title || 'Untitled form';
         $('previewDescription').textContent = draft.description;
         $('previewSubmit').textContent = draft.submitLabel || 'Validate form';
      }
      function palette() {
         const query = $('elementSearch').value.toLowerCase();
         $('palette').innerHTML = Object.entries(B.types).filter(([, t]) => t.label.toLowerCase().includes(query)).map(([type, t]) => `<button type="button" class="palette-item" draggable="true" data-add="${type}" aria-label="Add ${t.label}">${icon(t.icon)}${t.label}</button>`).join('') || '<p class="panel-note">No matching elements.</p>';
      }
      const find = id => draft.fields.find(f => f.id === id);
      function ruleSummary(block) {
         if (!block.condition.rules.length) return 'Choose a condition in block settings';
         return `Show when ${block.condition.match} rules match`;
      }
      function render() {
         refreshStatus();
         $('fieldCount').textContent = draft.fields.length;
         function list(parentId = '') {
            return B.children(draft, parentId).map(f => `<div class="element-row ${f.id === selected ? 'is-selected' : ''} ${parentId ? 'block-child-row' : ''}" data-target="${f.id}"><span class="drag-handle" draggable="true" data-move="${f.id}" title="Drag to reorder">${icon('grip-vertical')}</span><button type="button" class="element-select" data-select="${f.id}" aria-pressed="${f.id === selected}">${icon(B.types[f.type].icon)} ${esc(f.label || 'Untitled field')}</button></div>${f.type === 'conditional' ? `<div class="block-list-children">${list(f.id)}<div class="block-drop" data-drop-parent="${f.id}">Drop fields into this block</div></div>` : ''}`).join('');
         }
         function canvas(parentId = '') {
            const siblings = B.children(draft, parentId);
            return siblings.map((f, index) => {
               const block = f.type === 'conditional';
               if (testing) return `<section class="live-field ${block ? 'conditional-live' : ''}" data-render-field="${f.id}">${fieldBody(f, true, testAnswers[f.id], true)}${block ? canvas(f.id) : ''}</section>`;
               return `<article class="preview-field ${block ? 'conditional-block' : ''} ${f.id === selected ? 'is-selected' : ''}" data-target="${f.id}" data-select="${f.id}" tabindex="0" aria-label="Edit ${esc(f.label)}"><div class="field-tools"><span class="drag-handle" draggable="true" data-move="${f.id}" title="Drag to reorder">${icon('grip-vertical')}</span><button type="button" data-action="up" data-id="${f.id}" ${index === 0 ? 'disabled' : ''} aria-label="Move ${esc(f.label)} up">${icon('arrow-up')}</button><button type="button" data-action="down" data-id="${f.id}" ${index === siblings.length - 1 ? 'disabled' : ''} aria-label="Move ${esc(f.label)} down">${icon('arrow-down')}</button><button type="button" data-action="duplicate" data-id="${f.id}" aria-label="Duplicate ${esc(f.label)}">${icon('copy')}</button><button type="button" data-action="delete" data-id="${f.id}" aria-label="Delete ${esc(f.label)}">${icon('trash')}</button></div>${block ? `<p class="conditional-caption">${icon('diagram-2')} Conditional block · ${esc(ruleSummary(f))}</p>` : ''}${fieldBody(f, true)}${block ? `<div class="block-children">${canvas(f.id)}<div class="block-drop" data-drop-parent="${f.id}">Drop fields here, or select this block and click an element to add it</div></div>` : ''}</article>`;
            }).join('');
         }
         $('elementList').innerHTML = list();
         $('previewFields').innerHTML = canvas();
         $('dropEnd').hidden = testing;
         $('previewSubmit').hidden = testing;
         document.querySelector('.elements-panel').inert = testing;
         document.querySelector('.settings-panel').inert = testing;
         $('testConditions').textContent = testing ? 'Back to editing' : 'Test conditions';
         $('testConditions').setAttribute('aria-pressed', String(testing));
         $('conditionTestNote').hidden = !testing;
         if (testing) applyVisibility($('previewFields'), draft, testAnswers);
         $('dropEnd').textContent = draft.fields.length ? 'Drop here to move or add a field outside all blocks' : 'Your canvas is ready. Click an element on the left, or drag it here.';
      }
      function ruleSettings(block) {
         const sources = B.controllers(draft);
         return `<div class="condition-settings"><h3 class="h6">Show this block when</h3><label for="conditionMatch" class="form-label">Match conditions</label><select id="conditionMatch" class="form-select mb-3"><option value="all" ${block.condition.match === 'all' ? 'selected' : ''}>All rules match</option><option value="any" ${block.condition.match === 'any' ? 'selected' : ''}>Any rule matches</option></select>${sources.length ? '' : '<p class="panel-note">Add a dropdown, single choice, or checkbox outside the block to control it.</p>'}${block.condition.rules.map((rule, i) => {
            const source = sources.find(f => f.id === rule.fieldId);
            const ops = B.operators(source?.type);
            const hasValue = ['equals', 'not_equals', 'contains'].includes(rule.operator);
            return `<fieldset class="condition-rule"><legend>Rule ${i + 1}</legend><label for="ruleField_${i}" class="form-label">Answer to</label><select id="ruleField_${i}" class="form-select mb-2" data-rule="${i}" data-rule-prop="fieldId"><option value="">Choose a field</option>${sources.map(f => `<option value="${f.id}" ${rule.fieldId === f.id ? 'selected' : ''}>${esc(f.label)}</option>`).join('')}</select><label for="ruleOp_${i}" class="form-label">Comparison</label><select id="ruleOp_${i}" class="form-select mb-2" data-rule="${i}" data-rule-prop="operator">${Object.entries(ops).map(([op, label]) => `<option value="${op}" ${op === rule.operator ? 'selected' : ''}>${label}</option>`).join('')}</select>${hasValue ? `<label for="ruleValue_${i}" class="form-label">Value</label>${source && rule.operator !== 'contains' ? `<select id="ruleValue_${i}" class="form-select" data-rule="${i}" data-rule-prop="value"><option value="">Choose an answer</option>${source.options.map(o => `<option value="${esc(o)}" ${o === rule.value ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select>` : `<input id="ruleValue_${i}" class="form-control" data-rule="${i}" data-rule-prop="value" maxlength="200" value="${esc(rule.value)}">`}` : ''}<button type="button" class="btn btn-light btn-sm mt-2" data-remove-rule="${i}">Remove rule ${i + 1}</button></fieldset>`;
         }).join('')}<button type="button" class="btn btn-outline-primary btn-sm" id="addRule" ${block.condition.rules.length >= 20 ? 'disabled' : ''}>+ Add rule</button><p class="panel-note mt-3">Use a field outside all conditional blocks. You can save unfinished rules as a draft; complete them before publishing.</p></div>`;
      }
      function settings() {
         const f = find(selected);
         $('fieldSettings').innerHTML = `<div class="d-flex justify-content-between mb-3"><h2 class="panel-title">${f ? esc(B.types[f.type].label) : 'Field settings'}</h2><button type="button" id="undoDelete" class="btn btn-light btn-sm" ${undo.length ? '' : 'disabled'}>Undo delete</button></div>` + (f ? `<div class="mb-3"><label for="fieldLabel" class="form-label">${B.isInput(f) ? 'Label / question' : 'Heading'}</label><textarea id="fieldLabel" class="form-control" data-setting="label" maxlength="500">${esc(f.label)}</textarea></div><div class="mb-3"><label for="fieldDescription" class="form-label">Description</label><textarea id="fieldDescription" class="form-control" data-setting="description" maxlength="4000">${esc(f.description)}</textarea></div>${!B.isInput(f) ? '' : `<div class="mb-3"><label for="fieldPlaceholder" class="form-label">${f.type === 'checkbox' ? 'Checkbox text' : 'Placeholder'}</label><input id="fieldPlaceholder" class="form-control" data-setting="placeholder" maxlength="500" value="${esc(f.placeholder)}"></div><div class="form-check form-switch mb-4"><input class="form-check-input" type="checkbox" id="fieldRequired" data-setting="required" ${f.required ? 'checked' : ''}><label class="form-check-label ms-2" for="fieldRequired">Required</label></div>`}${['radio', 'select'].includes(f.type) ? `<div class="mb-3"><label for="fieldOptions" class="form-label">Options · one per line</label><textarea id="fieldOptions" class="form-control" rows="5" data-setting="options">${esc(f.options.join('\n'))}</textarea></div>` : ''}${f.type === 'conditional' ? ruleSettings(f) : `<div class="mb-3"><label for="fieldParent" class="form-label">Place field in</label><select id="fieldParent" class="form-select"><option value="">Main form (outside blocks)</option>${draft.fields.filter(b => b.type === 'conditional').map(b => `<option value="${b.id}" ${f.parentId === b.id ? 'selected' : ''}>${esc(b.label)}</option>`).join('')}</select></div>`}<label for="fieldKey" class="form-label">Field ID</label><input id="fieldKey" class="form-control form-control-sm" value="${esc(f.id)}" readonly><p class="panel-note mt-2">A stable ID keeps answers connected when you change a label or move a field.</p>` : '<p class="panel-note">Add or select an element to edit its details.</p>');
         $('undoDelete').onclick = () => {
            if (!undo.length) return;
            const removed = undo[undo.length - 1];
            if (draft.fields.length + removed.length > 100) return message('There is not enough room to restore these elements.', true);
            const candidate = B.clone(draft);
            removed.forEach(({index, field}) => candidate.fields.splice(Math.min(index, candidate.fields.length), 0, B.clone(field)));
            try { B.validate(candidate); } catch { return message('Restore the block or controlling fields first before undoing this deletion.', true); }
            undo.pop(); draft.fields = candidate.fields; selected = removed[0].field.id; render(); settings();
         };
      }
      function all() {
         $('formTitle').value = draft.title; $('formDescription').value = draft.description; $('submitLabel').value = draft.submitLabel;
         render(); settings();
      }
      function focusSettings() {
         if (window.matchMedia('(max-width: 1199px)').matches) $('fieldSettings').scrollIntoView({ block: 'start', behavior: 'smooth' });
         $('fieldLabel')?.focus({ preventScroll: window.matchMedia('(min-width: 1200px)').matches });
      }
      function add(type, parentId = '', beforeId = '') {
         if (draft.fields.length >= 100) return message('This form has reached the limit of 100 elements.', true);
         const f = B.field(type);
         if (type === 'conditional') {
            if (parentId) return message('Blocks can contain fields, but cannot contain another block.', true);
            const source = B.controllers(draft)[0];
            f.condition.rules.push({fieldId: source?.id || '', operator: source?.type === 'checkbox' ? 'checked' : 'equals', value: source?.options?.[0] || ''});
         }
         draft.fields.push(f);
         try { B.move(draft, f.id, parentId, beforeId); } catch (error) { draft.fields.pop(); return report(error); }
         selected = f.id; render(); settings();
      }
      document.querySelector('.canvas-caption').insertAdjacentHTML('beforeend', '<button type="button" id="testConditions" class="btn btn-outline-primary btn-sm" aria-pressed="false">Test conditions</button>');
      $('previewFields').insertAdjacentHTML('beforebegin', '<p id="conditionTestNote" class="alert alert-info small" hidden>Try answers below to test your conditions. These preview answers are temporary and are never saved.</p>');
      $('testConditions').onclick = () => {
         if (!testing) { try { B.validate(draft, true); } catch (error) { return report(error); } }
         testing = !testing; render();
      };
      $('previewFields').addEventListener('input', event => {
         if (!testing || !event.target.name) return;
         const el = event.target;
         testAnswers[el.name] = el.type === 'checkbox' ? el.checked : el.value;
         applyVisibility($('previewFields'), draft, testAnswers);
      });
      $('elementSearch').addEventListener('input', palette);
      document.addEventListener('click', event => {
         const addButton = event.target.closest('[data-add]');
         if (addButton && !testing) {
            const current = find(selected);
            return add(addButton.dataset.add, addButton.dataset.add === 'conditional' ? '' : current?.type === 'conditional' ? current.id : current?.parentId || '');
         }
         const action = event.target.closest('[data-action]');
         if (action && !testing) {
            const f = find(action.dataset.id);
            if (!f) return;
            if (action.dataset.action === 'delete') {
               const ids = new Set([f.id, ...B.children(draft, f.id).map(f => f.id)]);
               if (draft.fields.some(b => b.type === 'conditional' && !ids.has(b.id) && b.condition.rules.some(r => ids.has(r.fieldId)))) return message('This field controls a conditional block. Remove its rules before deleting the field.', true);
               undo.push(draft.fields.map((field, index) => ({field, index})).filter(item => ids.has(item.field.id)));
               draft.fields = draft.fields.filter(f => !ids.has(f.id)); selected = draft.fields[0]?.id;
            } else if (action.dataset.action === 'duplicate') {
               const originals = [f, ...B.children(draft, f.id)];
               if (draft.fields.length + originals.length > 100) return message('This form has reached the limit of 100 elements.', true);
               const copies = originals.map(f => ({...B.clone(f), id: B.field(f.type).id}));
               copies.slice(1).forEach(f => { f.parentId = copies[0].id; });
               draft.fields.splice(draft.fields.indexOf(f) + 1, 0, ...copies); selected = copies[0].id;
            } else {
               const siblings = B.children(draft, f.parentId || '');
               const index = siblings.indexOf(f), to = index + (action.dataset.action === 'up' ? -1 : 1);
               if (to < 0 || to >= siblings.length) return;
               B.move(draft, f.id, f.parentId || '', action.dataset.action === 'up' ? siblings[to].id : siblings[to + 1]?.id || ''); selected = f.id;
            }
            render(); settings();
            const nextAction = document.querySelector(`[data-action="${action.dataset.action}"][data-id="${selected}"]:not(:disabled)`);
            if (nextAction) nextAction.focus(); else $('fieldLabel')?.focus();
            return;
         }
         const selection = event.target.closest('[data-select]');
         if (selection && !testing) { selected = selection.dataset.select; render(); settings(); focusSettings(); }
      });
      $('previewFields').addEventListener('keydown', event => {
         if (event.target.matches('article') && ['Enter', ' '].includes(event.key)) { event.preventDefault(); selected = event.target.dataset.select; render(); settings(); $('fieldLabel').focus(); }
      });
      $('fieldSettings').addEventListener('input', event => {
         const prop = event.target.dataset.setting;
         const f = find(selected);
         if (f?.type === 'conditional' && event.target.matches('input[data-rule-prop="value"]')) {
            f.condition.rules[Number(event.target.dataset.rule)].value = event.target.value;
            render(); return;
         }
         if (!prop || !f) return;
         f[prop] = prop === 'required' ? event.target.checked : prop === 'options' ? event.target.value.split('\n').map(v => v.trim()) : event.target.value;
         render();
      });
      $('fieldSettings').addEventListener('change', event => {
         const f = find(selected), el = event.target;
         if (!f) return;
         if (el.id === 'fieldParent') {
            try { B.move(draft, f.id, el.value); } catch (error) { report(error); }
            render(); settings(); return;
         }
         if (f.type !== 'conditional') return;
         if (el.id === 'conditionMatch') f.condition.match = el.value;
         else if (el.dataset.rule !== undefined) {
            const rule = f.condition.rules[Number(el.dataset.rule)], prop = el.dataset.ruleProp;
            rule[prop] = el.value;
            if (prop === 'fieldId') {
               const source = find(el.value); rule.operator = source?.type === 'checkbox' ? 'checked' : 'equals'; rule.value = source?.options?.[0] || '';
            } else if (prop === 'operator') rule.value = ['equals', 'not_equals'].includes(rule.operator) ? find(rule.fieldId)?.options?.[0] || '' : '';
         } else return;
         render(); settings();
      });
      $('fieldSettings').addEventListener('click', event => {
         const block = find(selected);
         if (block?.type !== 'conditional') return;
         if (event.target.closest('#addRule')) {
            if (block.condition.rules.length >= 20) return;
            const source = B.controllers(draft)[0];
            block.condition.rules.push({fieldId: source?.id || '', operator: source?.type === 'checkbox' ? 'checked' : 'equals', value: source?.options?.[0] || ''});
         } else if (event.target.closest('[data-remove-rule]')) block.condition.rules.splice(Number(event.target.closest('[data-remove-rule]').dataset.removeRule), 1);
         else return;
         render(); settings();
      });
      [['formTitle', 'title'], ['formDescription', 'description'], ['submitLabel', 'submitLabel']].forEach(([id, prop]) => $(id).addEventListener('input', () => { draft[prop] = $(id).value; refreshStatus(); }));
      document.addEventListener('dragstart', event => {
         const source = event.target.closest('[data-add], [data-move]');
         if (!source || testing) return;
         dragging = source.dataset.add ? { type: source.dataset.add } : { id: source.dataset.move };
         event.dataTransfer.setData('text/plain', JSON.stringify(dragging)); event.dataTransfer.effectAllowed = dragging.type ? 'copy' : 'move';
      });
      const clearDrop = () => document.querySelectorAll('.drop-target').forEach(el => el.classList.remove('drop-target'));
      const dropTarget = event => event.target.closest('[data-drop-parent], [data-target], #dropEnd');
      document.addEventListener('dragover', event => {
         const target = dropTarget(event);
         if (!dragging || !target || testing) return;
         event.preventDefault(); clearDrop(); target.classList.add('drop-target'); event.dataTransfer.dropEffect = dragging.type ? 'copy' : 'move';
      });
      document.addEventListener('drop', event => {
         const target = dropTarget(event);
         if (!dragging || !target || testing) return;
         event.preventDefault(); clearDrop();
         const beforeId = target.dataset.target || '';
         const parentId = target.dataset.dropParent || find(beforeId)?.parentId || '';
         if (dragging.type) add(dragging.type, parentId, beforeId);
         else { try { B.move(draft, dragging.id, parentId, beforeId); selected = dragging.id; render(); settings(); } catch (error) { report(error); } }
         dragging = null;
      });
      document.addEventListener('dragend', () => { dragging = null; clearDrop(); });
      function save(publish) {
         try {
            const result = B.commit(localStorage, draft, publish, expected);
            record = result.record; expected = result.serialized; saved = JSON.stringify(draft);
            history.replaceState(null, '', url('editor', draft.id)); refreshStatus();
            message(publish ? 'Published. Open live to complete this form in this browser.' : 'Draft saved. The published version stays as it was until you publish again.');
         } catch (error) { report(error); }
      }
      $('saveForm').onclick = () => save(false);
      $('publishForm').onclick = () => save(true);
      window.addEventListener('beforeunload', event => { if (dirty()) { event.preventDefault(); event.returnValue = ''; } });
      window.addEventListener('storage', event => { if (event.key === B.keys(draft.id).config || event.key === null) message('Saved forms changed in another tab. Keep this page open to preserve your edits and compare with the saved form in another tab before reloading.', true); });
      palette(); all();
   }
   function live() {
      const id = new URLSearchParams(location.search).get('id');
      if (!id) { $('liveEmpty').hidden = false; return; }
      const k = B.keys(id);
      const record = B.read(localStorage, k.config);
      if (!record?.published) { $('liveEmpty').hidden = false; return; }
      const config = B.validate(record.published);
      let data = B.response(config, B.read(localStorage, k.data) || {}, B.read(localStorage, k.data)?._comments || {});
      let valid = B.read(localStorage, k.valid) === true;
      let stale = false;
      let validatedSnapshot = null;
      let generatingPDF = false;
      const autosaveToast = document.createElement('div');
      autosaveToast.id = 'autosave-toast';
      autosaveToast.className = 'builder-autosave-toast';
      autosaveToast.setAttribute('role', 'status');
      autosaveToast.setAttribute('aria-live', 'polite');
      autosaveToast.hidden = true;
      autosaveToast.textContent = '✅ Autosaved';
      document.body.appendChild(autosaveToast);
      let autosaveTimer;
      function hideAutosaveToast() {
         clearTimeout(autosaveTimer);
         autosaveToast.hidden = true;
      }
      function showAutosaveToast() {
         hideAutosaveToast();
         autosaveToast.hidden = false;
         autosaveTimer = setTimeout(hideAutosaveToast, 1500);
      }
      $('liveContent').hidden = false;
      $('editForm').href = url('editor', id);
      $('liveTitle').textContent = config.title; $('liveDescription').textContent = config.description;
      $('validateForm').textContent = config.submitLabel; document.title = `${config.title} | Fillvisa`;
      function liveFields(parentId = '') {
         return B.children(config, parentId).map(f => `<section class="form-section live-field ${f.type === 'conditional' ? 'conditional-live' : ''}" id="section_${f.id}" data-field="${f.id}" data-render-field="${f.id}">${fieldBody(f, false, data[f.id])}${f.type === 'conditional' ? liveFields(f.id) : ''}${!B.isInput(f) ? '' : `<div class="field-comment-panel mt-3" id="comment_panel_${f.id}" hidden><label for="comment_${f.id}" class="form-label small">Comment for ${esc(f.label)}</label><textarea class="form-control" id="comment_${f.id}" data-field-comment="${f.id}" placeholder="Add context or notes for this answer">${esc(data._comments[f.id] || '')}</textarea></div>`}</section>`).join('');
      }
      $('liveFields').innerHTML = liveFields();
      const sections = config.fields.filter(f => f.type === 'heading' || f.type === 'conditional');
      $('sectionNav').innerHTML = (sections.length ? sections : config.fields).map(f => `<a data-nav-field="${f.id}" href="#section_${f.id}">${esc(f.label)}</a>`).join('');
      const form = $('liveForm');
      function collect() {
         const values = {}, comments = {};
         config.fields.filter(B.isInput).forEach(f => {
            const controls = Array.from(form.elements).filter(el => el.name === f.id);
            values[f.id] = f.type === 'radio' ? controls.find(el => el.checked)?.value || '' : f.type === 'checkbox' ? controls[0].checked : controls[0].value;
            comments[f.id] = $(`comment_${f.id}`).value;
         });
         return B.response(config, values, comments);
      }
      function updateVisibility() {
         const visible = applyVisibility($('liveFields'), config, data);
         document.querySelectorAll('[data-nav-field]').forEach(link => { link.hidden = !visible[link.dataset.navField]; });
      }
      function preview() {
         const ready = valid && !stale && validatedSnapshot === JSON.stringify(data);
         $('pdfDownload').hidden = !ready;
         $('pdfDownloadLink').hidden = !ready;
         document.querySelectorAll('[data-comment]').forEach(el => el.classList.toggle('is-active', !!data._comments[el.dataset.comment]));
      }
      function save(autosave = false) {
         try {
            const latest = B.read(localStorage, k.config);
            if (stale || JSON.stringify(latest?.published) !== JSON.stringify(config)) throw new Error('The published form changed. Keep this page open to preserve your current answers and compare with the latest form in another tab before reloading.');
            localStorage.setItem(k.valid, 'false');
            localStorage.setItem(k.data, JSON.stringify(B.response(config, data, data._comments, true)));
            localStorage.setItem(k.valid, JSON.stringify(valid));
            $('responseStatus').textContent = valid ? 'Validated · Saved in this browser' : 'Autosaved in this browser';
            if (autosave) showAutosaveToast();
            return true;
         } catch (error) { valid = false; validatedSnapshot = null; hideAutosaveToast(); $('responseStatus').textContent = 'Answers not saved'; report(error); return false; }
      }
      function validate(show) {
         let result = true;
         config.fields.filter(B.isInput).forEach(f => {
            const section = $(`section_${f.id}`);
            if (section.hidden) return;
            const controls = Array.from(section.querySelectorAll('[name]'));
            controls.forEach(el => { el.setCustomValidity(''); if (f.required && ['text', 'textarea', 'tel'].includes(f.type) && !el.value.trim()) el.setCustomValidity('Please complete this field.'); });
            const ok = controls.every(el => el.checkValidity());
            if (!ok) result = false;
            if (show) {
               controls.forEach(el => { el.classList.toggle('is-invalid', !ok); el.classList.toggle('is-valid', ok && (el.type === 'checkbox' || el.type === 'radio' ? el.checked : !!el.value)); el.setAttribute('aria-invalid', String(!ok)); });
               section.querySelector('.invalid-feedback').classList.toggle('d-block', !ok);
            }
         });
         return result;
      }
      form.addEventListener('input', event => {
         data = collect(); valid = false; validatedSnapshot = null; updateVisibility();
         const section = event.target.closest('[data-field]');
         section?.querySelectorAll('[name]').forEach(el => { el.setCustomValidity(''); el.classList.remove('is-valid', 'is-invalid'); el.removeAttribute('aria-invalid'); });
         section?.querySelector('.invalid-feedback')?.classList.remove('d-block');
         $('message').textContent = ''; save(true); preview();
      });
      form.addEventListener('click', event => {
         const button = event.target.closest('[data-comment]'); if (!button) return;
         const panel = $(`comment_panel_${button.dataset.comment}`); panel.hidden = !panel.hidden;
         button.setAttribute('aria-expanded', String(!panel.hidden)); if (!panel.hidden) panel.querySelector('textarea').focus();
      });
      form.addEventListener('submit', event => {
         event.preventDefault(); data = collect(); updateVisibility(); valid = validate(true); const stored = save(); validatedSnapshot = valid && stored ? JSON.stringify(data) : null; preview();
         if (stored) message(valid ? 'Form validated and saved in this browser. You can download your completed PDF below.' : 'Please complete the highlighted fields, then validate again.', !valid);
         if (valid && stored) window.alert('✅ Form validated successfully. Your answers have been saved in this browser.');
         if (!valid) form.querySelector('.is-invalid')?.focus();
      });
      $('downloadPDF').onclick = async () => {
         if (generatingPDF) return;
         data = collect(); updateVisibility();
         if (!valid || stale || validatedSnapshot !== JSON.stringify(data) || !validate(false)) {
            valid = false; validatedSnapshot = null; preview();
            message('Please validate the form before downloading a PDF.', true); return;
         }
         if (!save()) { preview(); return; }
         const snapshot = B.clone(data);
         const button = $('downloadPDF');
         const originalLabel = button.innerHTML;
         generatingPDF = true; button.disabled = true;
         button.setAttribute('aria-busy', 'true'); button.textContent = 'Preparing PDF…';
         message('Preparing your completed form PDF…');
         try {
            if (!window.FillvisaBuilderPDF) throw new Error('PDF tools did not load. Reload this page and try again.');
            const result = await window.FillvisaBuilderPDF.create(config, snapshot, document.querySelector('.live-main .form-paper'));
            const latest = B.read(localStorage, k.config);
            if (stale || !valid || validatedSnapshot !== JSON.stringify(snapshot) || JSON.stringify(collect()) !== JSON.stringify(snapshot) || JSON.stringify(latest?.published) !== JSON.stringify(config)) {
               valid = false; validatedSnapshot = null; preview();
               throw new Error('The form changed while preparing the PDF. Validate the latest form and download again.');
            }
            download(result.bytes, result.filename);
            message('Your completed form PDF is ready.');
         } catch (error) { report(error); }
         finally {
            generatingPDF = false; button.disabled = false;
            button.removeAttribute('aria-busy'); button.innerHTML = originalLabel;
         }
      };
      window.addEventListener('storage', event => {
         if (![k.config, k.data, k.valid, null].includes(event.key)) return;
         // Draft-only saves do not invalidate the published form.
         if (event.key === k.config) { try { if (JSON.stringify(B.read(localStorage, k.config)?.published) === JSON.stringify(config)) return; } catch { /* Mark unreadable storage stale. */ } }
         stale = true; valid = false; validatedSnapshot = null; preview();
         $('responseStatus').textContent = 'Reload needed';
         message('This form or its answers changed in another tab. Keep this page open to preserve your current answers and compare with the saved form in another tab before reloading.', true);
      });
      // Normalize answers against current controls (for example, a removed dropdown option).
      data = collect(); updateVisibility(); valid = valid && validate(false); validatedSnapshot = valid ? JSON.stringify(data) : null; preview();
      // Opening a form never writes configuration or creates an empty response.
      $('responseStatus').textContent = valid ? 'Validated · Saved in this browser' : 'Responses autosave in this browser';
   }
   try {
      const page = document.body.dataset.builderPage;
      if (page === 'editor') editor(); else if (page === 'live') live(); else landing();
   } catch (error) { report(error); }
})();
