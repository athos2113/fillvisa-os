/* Conditional fields and exact-cent addition for Part 5. */
(function (root) {
   function total(a, b) {
      if (!/^-?\d+(?:\.\d{1,2})?$/.test(a) || !/^-?\d+(?:\.\d{1,2})?$/.test(b)) return '';
      const cents = value => {
         const negative = value.startsWith('-');
         const [whole, fraction = ''] = value.replace(/^-/, '').split('.');
         return (BigInt(whole) * 100n + BigInt(fraction.padEnd(2, '0'))) * (negative ? -1n : 1n);
      };
      const sum = cents(a) + cents(b), absolute = sum < 0n ? -sum : sum;
      return (sum < 0n ? '-' : '') + absolute / 100n + '.' + String(absolute % 100n).padStart(2, '0');
   }
   function update(document) {
      const get = id => document.getElementById(id);
      const toggle = (id, active) => {
         const section = get(id);
         section.hidden = !active;
         section.querySelectorAll('input, textarea').forEach(el => {
            el.disabled = !active;
            el.required = active;
            if (!active && el.type === 'radio') el.checked = false;
            if (!active) {
               el.classList.remove('is-valid', 'is-invalid');
               el.removeAttribute('aria-invalid');
               const feedback = get(el.dataset.feedbackId || el.id + '-feedback');
               if (feedback) { feedback.hidden = true; feedback.className = ''; }
            }
         });
      };
      toggle('incomeOtherSection', get('income_employment_other').checked);
      toggle('incomeUnemployedSection', get('income_employment_unemployed').checked);
      get('income_circumstances_explanation').required = get('income_circumstances_changed_yes').checked;
      get('income_household_earners').max = get('income_household_size').value || '';
      const now = new Date();
      get('income_unemployed_date').max = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-');
      get('income_annual_total').value = total(get('income_annual_self').value, get('income_annual_family').value);
   }
   root.I912Income = { total, update };
   if (typeof module !== 'undefined' && module.exports) module.exports = root.I912Income;
})(typeof window === 'undefined' ? globalThis : window);
