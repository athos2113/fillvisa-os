(function (root) {
   'use strict';
   // US Letter, with half-inch margins and room for page numbers.
   const PAGE_WIDTH = 612, PAGE_HEIGHT = 792, MARGIN = 36, FOOTER = 18;
   const CONTENT_WIDTH = 720, PX_TO_PT = (PAGE_WIDTH - MARGIN * 2) / CONTENT_WIDTH;
   const PAGE_CONTENT_HEIGHT = (PAGE_HEIGHT - MARGIN * 2 - FOOTER) / PX_TO_PT;

   // Keep text lines intact when a single response is taller than a page.
   function safeEnd(start, available, total, bands) {
      let end = Math.min(total, start + available);
      if (end === total) return end;
      for (let i = bands.length - 1; i >= 0; i--) {
         const [top, bottom] = bands[i];
         if (top < end && bottom > end) end = top;
      }
      if (end <= start + 1) throw new Error('A form element is too tall to fit on a PDF page. Shorten its text and try again.');
      return end;
   }

   function filename(title) {
      return (title.replace(/[<>:"/\\|?*\u0000-\u001f]/g, '-').replace(/[. ]+$/g, '').slice(0, 100) || 'Fillvisa-form') + '.pdf';
   }

   const printCSS = `
      html, body { margin: 0 !important; padding: 0 !important; width: 720px !important; background: white !important; }
      .pdf-sheet { width: 720px; color: #334155; font-size: 16px; line-height: 1.5; background: white; overflow-wrap: anywhere; }
      .pdf-item { margin: 0 !important; padding: 2px 0 24px; background: white; width: 720px; box-sizing: border-box; display: flow-root; }
      .pdf-item h1 { font-size: 28.8px; letter-spacing: -.04em; color: #0f172a; margin: 0 0 12px; }
      .pdf-item h2 { font-size: 22px; color: #0f172a; margin: 0 0 8px; }
      .pdf-item p { margin-bottom: 12px; }
      .pdf-item .form-intro { margin-bottom: 0; }
      .pdf-item .field-description, .pdf-item .form-intro { color: #64748b; white-space: pre-wrap; }
      .pdf-item .form-label, .pdf-item .form-check-label { color: #334155; }
      .pdf-item .field-control-row { display: block; }
      .pdf-item .pdf-answer { display: block; white-space: pre-wrap; overflow-wrap: anywhere; height: auto; min-height: 44px; padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 6px; color: #334155; background: #fff; line-height: 24px; font-size: 16px; }
      .pdf-item .pdf-answer-long { min-height: 96px; }
      .pdf-item .form-check { display: flex; align-items: flex-start; gap: 10px; margin: 0 0 8px; padding: 0; }
      .pdf-choice-mark { flex: 0 0 18px; display: inline-flex; width: 18px; height: 18px; margin-top: 3px; border: 1px solid #94a3b8; border-radius: 3px; align-items: center; justify-content: center; box-sizing: border-box; }
      .pdf-choice-mark.is-radio { border-radius: 50%; }
      .pdf-choice-mark.is-checked { border-color: #8b3dff; background: #8b3dff; }
      .pdf-choice-mark.is-checked::after { content: ''; width: 7px; height: 11px; border-right: 2px solid white; border-bottom: 2px solid white; transform: rotate(40deg); margin-top: -3px; }
      .pdf-choice-mark.is-radio.is-checked::after { width: 7px; height: 7px; border: 0; border-radius: 50%; background: white; transform: none; margin: 0; }
      .pdf-in-block { border-left: 3px solid #8b3dff; padding-left: 20px; }
      .pdf-item .field-comment-panel { background: #f7f8fb; padding: 12px; margin-top: 12px; }
      .pdf-item .field-comment-panel .pdf-answer { background: #f7f8fb; }
      .pdf-item .text-primary, .pdf-item .eyebrow { color: #8b3dff !important; }
      .pdf-item .eyebrow { font-size: 12px; letter-spacing: .12em; font-weight: 700; }
   `;

   function snapshot(config, data, source) {
      const B = root.FillvisaBuilder, visible = B.visibility(config, data);
      const items = [];
      const intro = document.createElement('div');
      intro.className = 'pdf-item';
      ['.eyebrow', '#liveTitle', '#liveDescription'].forEach(selector => {
         const element = source.querySelector(selector);
         if (element) intro.appendChild(element.cloneNode(true));
      });
      items.push({element: intro, keepNext: true});
      function addFields(parentId = '') {
         B.children(config, parentId).forEach(f => {
            if (!visible[f.id]) return;
            const original = source.querySelector(`#section_${f.id}`);
            if (!original) throw new Error('The form is incomplete. Reload it and validate again.');
            const element = original.cloneNode(true);
            element.className = `pdf-item${parentId || f.type === 'conditional' ? ' pdf-in-block' : ''}`;
            element.hidden = false;
            // Blocks are paginated as their heading and individual child fields.
            element.querySelectorAll('[data-field], button, .invalid-feedback, .valid-feedback').forEach(el => el.remove());
            const comment = data._comments?.[f.id] || '';
            const panel = element.querySelector('.field-comment-panel');
            if (panel) { if (comment) panel.hidden = false; else panel.remove(); }
            element.querySelectorAll('input, select, textarea').forEach(control => {
               if (control.type === 'checkbox' || control.type === 'radio') {
                  const checked = control.type === 'checkbox' ? data[f.id] === true : data[f.id] === control.value;
                  const mark = document.createElement('span');
                  mark.className = `pdf-choice-mark${control.type === 'radio' ? ' is-radio' : ''}${checked ? ' is-checked' : ''}`;
                  control.replaceWith(mark);
               } else {
                  const answer = document.createElement('div');
                  answer.className = `pdf-answer${control.tagName === 'TEXTAREA' ? ' pdf-answer-long' : ''}`;
                  answer.textContent = control.dataset.fieldComment ? comment : String(data[f.id] ?? '');
                  control.replaceWith(answer);
               }
            });
            element.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
            element.querySelectorAll('label').forEach(el => el.removeAttribute('for'));
            items.push({element, keepNext: !B.isInput(f)});
            if (f.type === 'conditional') addFields(f.id);
         });
      }
      addFields();
      return items;
   }

   function lineBands(element) {
      const top = element.getBoundingClientRect().top;
      const bands = [];
      const walker = element.ownerDocument.createTreeWalker(element, NodeFilter.SHOW_TEXT);
      let text;
      while ((text = walker.nextNode())) {
         if (!text.textContent.trim()) continue;
         const range = element.ownerDocument.createRange();
         range.selectNodeContents(text);
         for (const rect of range.getClientRects()) {
            if (rect.height) bands.push([Math.max(0, Math.floor(rect.top - top - 2)), Math.ceil(rect.bottom - top + 2)]);
         }
      }
      element.querySelectorAll('.pdf-choice-mark').forEach(mark => {
         const rect = mark.getBoundingClientRect();
         bands.push([Math.floor(rect.top - top - 2), Math.ceil(rect.bottom - top + 2)]);
      });
      return bands.sort((a, b) => a[0] - b[0]);
   }

   async function create(config, data, source) {
      if (!root.html2canvas || !root.PDFLib) throw new Error('PDF tools did not load. Reload this page and try again.');
      // Capture synchronously so edits during rendering cannot mix different answers.
      const items = snapshot(config, data, source);
      const frame = document.createElement('iframe');
      frame.title = 'Preparing form PDF';
      frame.setAttribute('aria-hidden', 'true');
      frame.tabIndex = -1;
      frame.style.cssText = 'position:fixed;left:-10000px;top:0;width:816px;height:1056px;border:0;pointer-events:none;';
      document.body.appendChild(frame);
      try {
         const doc = frame.contentDocument;
         doc.documentElement.dataset.bsTheme = 'light';
         const stylesheetLoads = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(link => new Promise((resolve, reject) => {
            const copy = doc.createElement('link'); copy.rel = 'stylesheet'; copy.href = link.href;
            copy.onload = resolve; copy.onerror = () => reject(new Error('Could not load form styles for the PDF. Please try again.'));
            doc.head.appendChild(copy);
         }));
         const style = doc.createElement('style'); style.textContent = printCSS; doc.head.appendChild(style);
         const sheet = doc.createElement('div'); sheet.className = 'pdf-sheet';
         sheet.style.fontFamily = getComputedStyle(source).fontFamily;
         items.forEach(item => sheet.appendChild(doc.adoptNode(item.element)));
         doc.body.appendChild(sheet);
         await Promise.all(stylesheetLoads);
         await doc.fonts.ready;
         const pdf = await root.PDFLib.PDFDocument.create();
         pdf.setTitle(config.title); pdf.setCreator('Fillvisa'); pdf.setSubject('Completed custom form');
         const font = await pdf.embedFont(root.PDFLib.StandardFonts.Helvetica);
         let page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]), used = 0;
         const heights = items.map(item => Math.ceil(item.element.getBoundingClientRect().height));
         for (let i = 0; i < items.length; i++) {
            const item = items[i], total = heights[i];
            const nextSpace = item.keepNext && heights[i + 1] ? Math.min(heights[i + 1], 120) : 0;
            if (used && ((total <= PAGE_CONTENT_HEIGHT && total > PAGE_CONTENT_HEIGHT - used) || (item.keepNext && total + nextSpace > PAGE_CONTENT_HEIGHT - used))) {
               page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]); used = 0;
            }
            const bands = lineBands(item.element);
            let offset = 0;
            while (offset < total) {
               let end;
               try { end = safeEnd(offset, PAGE_CONTENT_HEIGHT - used, total, bands); }
               catch (error) {
                  // A tall response may begin when less than one text line remains.
                  if (!used) throw error;
                  page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]); used = 0;
                  continue;
               }
               const height = end - offset;
               // Render one page-sized slice, avoiding browser canvas-size limits for long answers.
               const canvas = await root.html2canvas(item.element, {
                  backgroundColor: '#ffffff', scale: 2, logging: false,
                  width: CONTENT_WIDTH, height, x: 0, y: offset,
                  windowWidth: 816, windowHeight: 1056, scrollX: 0, scrollY: 0,
                  onclone: cloned => { cloned.documentElement.dataset.bsTheme = 'light'; }
               });
               const image = await pdf.embedPng(canvas.toDataURL('image/png'));
               page.drawImage(image, {x: MARGIN, y: PAGE_HEIGHT - MARGIN - (used + height) * PX_TO_PT, width: PAGE_WIDTH - MARGIN * 2, height: height * PX_TO_PT});
               canvas.width = canvas.height = 0;
               used += height; offset = end;
               if (offset < total) { page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]); used = 0; }
            }
         }
         const pages = pdf.getPages();
         pages.forEach((page, index) => {
            const label = `Page ${index + 1} of ${pages.length}`;
            page.drawText(label, {x: PAGE_WIDTH - MARGIN - font.widthOfTextAtSize(label, 9), y: 22, size: 9, font, color: root.PDFLib.rgb(.4, .45, .53)});
         });
         return {bytes: await pdf.save(), filename: filename(config.title)};
      } finally { frame.remove(); }
   }
   const api = {create, safeEnd, filename};
   if (typeof module !== 'undefined' && module.exports) module.exports = api;
   root.FillvisaBuilderPDF = api;
})(typeof window === 'undefined' ? globalThis : window);
