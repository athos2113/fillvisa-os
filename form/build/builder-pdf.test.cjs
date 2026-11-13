const {test} = require('node:test');
const assert = require('node:assert/strict');
const {safeEnd, filename} = require('./builder-pdf.js');

test('PDF page breaks stay outside text lines and preserve the final fragment', () => {
   const bands = [[10, 30], [38, 58], [66, 86], [94, 114]];
   assert.equal(safeEnd(0, 50, 130, bands), 38);
   assert.equal(safeEnd(38, 60, 130, bands), 94);
   assert.equal(safeEnd(94, 60, 130, bands), 130);
});
test('overlapping line and choice-marker bands cannot be cut', () => {
   assert.equal(safeEnd(0, 60, 100, [[20, 55], [50, 70]]), 20);
   assert.throws(() => safeEnd(0, 15, 100, [[0, 30]]), /too tall/);
});
test('long-answer pagination advances without losing or duplicating content', () => {
   const bands = Array.from({length: 150}, (_, i) => [i * 24 + 2, i * 24 + 22]);
   const total = 3610, pieces = [];
   let offset = 0;
   while (offset < total) {
      const end = safeEnd(offset, 936, total, bands);
      assert.ok(end > offset);
      assert.ok(end === total || !bands.some(([top, bottom]) => top < end && end < bottom));
      pieces.push(end - offset); offset = end;
   }
   assert.equal(pieces.reduce((sum, size) => sum + size, 0), total);
   assert.ok(pieces.length > 3);
});
test('PDF filenames are safe for downloads and have a fallback', () => {
   assert.equal(filename('Client / spouse: details?'), 'Client - spouse- details-.pdf');
   assert.equal(filename(' . '), 'Fillvisa-form.pdf');
   assert.equal(filename('x'.repeat(200)).length, 104);
});
