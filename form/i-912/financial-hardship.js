(function (root) {
   function update(document) {
      const get = id => document.getElementById(id);
      const amounts = [];
      for (let n = 1; n <= 3; n++) {
         const type = get('hardship_asset_' + n + '_type');
         const value = get('hardship_asset_' + n + '_value');
         type.required = value.required = !!(type.value.trim() || value.value);
         amounts.push(value.value || (type.required ? '' : '0'));
      }
      const extra = get('hardship_assets_additional');
      const extraValue = get('hardship_assets_additional_value');
      extra.required = extraValue.required = !!(extra.value.trim() || extraValue.value);
      amounts.push(extraValue.value || (extra.required ? '' : '0'));
      get('hardship_assets_total').value = amounts.reduce((sum, amount) => root.I912Income.total(sum, amount), '0');
      const explanation = get('hardship_expenses_other_explanation');
      const selected = get('hardship_expense_other').checked;
      get('hardshipOtherSection').hidden = !selected;
      explanation.disabled = !selected;
      explanation.required = selected;
      if (!selected) {
         explanation.classList.remove('is-invalid', 'is-valid');
         explanation.removeAttribute('aria-invalid');
         const message = get(explanation.dataset.feedbackId);
         if (message) { message.hidden = true; message.className = ''; }
      }
   }
   root.I912Hardship = { update };
   if (typeof module !== 'undefined' && module.exports) module.exports = root.I912Hardship;
})(typeof window === 'undefined' ? globalThis : window);
