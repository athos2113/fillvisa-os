(function () {
   function update(document) {
      const get = id => document.getElementById(id);
      for (const [section, field, choice] of [
         ['requestorLanguageSection', 'requestor_interpreter_language', 'requestor_statement_interpreter'],
         ['requestorPreparerSection', 'requestor_preparer_name', 'requestor_used_preparer']
      ]) {
         const active = get(choice).checked, input = get(field);
         get(section).hidden = !active;
         input.disabled = !active;
         input.required = active;
         if (!active) {
            input.classList.remove('is-valid', 'is-invalid');
            input.removeAttribute('aria-invalid');
            const feedback = get(input.dataset.feedbackId);
            if (feedback) { feedback.hidden = true; feedback.className = ''; }
         }
      }
      const date = get('requestor_sign_date'), now = new Date();
      date.required = !!get('requestor_sign').value;
      date.max = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-');
   }
   window.I912Requestor = { update };
   // Run after section.js has restored the saved hidden PNG value.
   document.addEventListener('DOMContentLoaded', () => {
      const canvas = document.getElementById('requestor_sign_canvas');
      const input = document.getElementById('requestor_sign');
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
