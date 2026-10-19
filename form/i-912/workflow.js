/* Routes from the supplied I-912 page 1. Multiple bases are allowed.
 * Parts 7–9 stay in the route; their applicability is handled within each part.
 * Inactive answers are retained, but must be excluded from PDF generation.
 */
(function (root) {
   'use strict';
   const sections = [
      [1, 'basis-for-request.html', 'Basis For Your Request'],
      [2, 'info-about-you.html', 'Information About You (Requestor)'],
      [3, 'applications-petitions.html', 'Applications & Petitions for Which You are Requesting a Fee Waiver'],
      [4, 'means-tested-benefits.html', 'Means-Tested Benefits'],
      [5, 'income.html', 'Income at or Below 150 Percent of the Federal Poverty Guidelines'],
      [6, 'financial-hardship.html', 'Financial Hardship'],
      [7, 'requestor-info.html', "Requestor's Information"],
      [8, 'interpreter-info.html', "Interpreter's Information"],
      [9, 'preparer-info.html', "Preparer's Information"]
   ];
   const basisIds = ['basis_means_tested_benefit', 'basis_low_income', 'basis_financial_hardship'];
   function route(data = {}) {
      if (!basisIds.some(id => data[id] === true)) return [1];
      return [1, 2, 3, ...(data.basis_means_tested_benefit === true ? [4] : []),
         ...(data.basis_low_income === true ? [5] : []),
         ...(data.basis_financial_hardship === true ? [6] : []), 7, 8, 9];
   }
   function read(part, storage = root.localStorage) {
      const value = JSON.parse(storage.getItem('i912-' + part) || '{}');
      return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
   }
   function next(part, data) {
      const active = route(data), index = active.indexOf(part);
      if (index < 0) return sections[0][1];
      return index === active.length - 1 ? (part === 1 ? null : 'download.html') : sections.find(s => s[0] === active[index + 1])[1];
   }
   // Download will consume only active sections and route these entries to Part 10.
   function packet(storage = root.localStorage) {
      const active = route(read(1, storage));
      const data = Object.fromEntries(active.map(part => [part, read(part, storage)]));
      if (data[7]?.requestor_statement_english === true && data[7]?.requestor_statement_interpreter !== true) data[8] = {};
      if (data[7]?.requestor_used_preparer === false) data[9] = {};
      const additionalInformation = [];
      if (data[6]?.hardship_assets_additional?.trim()) {
         additionalInformation.push({ page: 4, part: 6, item: 2, text: data[6].hardship_assets_additional.trim() });
      }
      if (data[4]?.benefits_additional?.trim()) {
         additionalInformation.push({ page: 2, part: 4, item: 1, text: data[4].benefits_additional.trim() });
      }
      if (data[3]?.applications_additional?.trim()) {
         additionalInformation.push({ page: 2, part: 3, item: 1, text: data[3].applications_additional.trim() });
      }
      if (data[2]?.requestor_other_names_additional?.trim()) {
         additionalInformation.push({ page: 1, part: 2, item: 3, text: data[2].requestor_other_names_additional.trim() });
      }
      return { activeParts: active, sections: data, additionalInformation };
   }
   const api = { sections, basisIds, route, read, next, packet };
   root.I912Flow = api;
   if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window === 'undefined' ? globalThis : window);
