(function () {
 function update(document) {
  const get = id => document.getElementById(id);
  const statement = I912Flow.read(7);
  const used = statement.requestor_statement_english !== true || statement.requestor_statement_interpreter === true;
  get('interpreterDetails').hidden = !used;
  get('interpreterNotice').hidden = used;
  get('interpreterNotice').textContent = 'Part 7 indicates that you read and understand English without an interpreter. This section does not apply. Change Part 7 if you used an interpreter.';
  const fields = [...get('interpreterDetails').querySelectorAll('input, select')];
  fields.forEach(el => { el.disabled = !used; el.required = used && el.hasAttribute('data-required'); el.setCustomValidity(''); });
  if (!used) return;
  const language = get('interpreter_language');
  if (!language.value) language.value = statement.requestor_interpreter_language || '';
  if (statement.requestor_interpreter_language && language.value.trim().toLowerCase() !== statement.requestor_interpreter_language.trim().toLowerCase()) language.setCustomValidity('Enter the same language as Part 7, Item 1.B.');
  get('interpreter_number').required = !!get('interpreter_unit_type').value;
  const country = get('interpreter_country').value.trim().toLowerCase().replace(/\./g, '');
  const us = ['us','usa','united states','united states of america'].includes(country);
  get('interpreter_state').required = get('interpreter_zip').required = us;
  if (us && get('interpreter_zip').value && !/^\d{5}(-\d{4})?$/.test(get('interpreter_zip').value)) get('interpreter_zip').setCustomValidity('Enter a five-digit ZIP Code or ZIP+4.');
  for (const id of ['interpreter_telephone','interpreter_mobile']) {
   const el = get(id), digits = el.value.replace(/\D/g, '');
   if (el.value && (!/^[+()\d .-]+$/.test(el.value) || digits.length < 7 || digits.length > 15)) el.setCustomValidity('Enter a telephone number containing 7–15 digits.');
  }
  const date = get('interpreter_sign_date'), now = new Date();
  date.required = !!get('interpreter_sign').value;
  date.max = [now.getFullYear(), String(now.getMonth()+1).padStart(2,'0'), String(now.getDate()).padStart(2,'0')].join('-');
 }
 window.I912Interpreter = { update };
   // Run after section.js has restored the saved hidden PNG value.
   document.addEventListener('DOMContentLoaded', () => {
      const canvas = document.getElementById('interpreter_sign_canvas');
      const input = document.getElementById('interpreter_sign');
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
