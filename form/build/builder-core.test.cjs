const { test } = require('node:test');
const assert = require('node:assert/strict');
const B = require('./builder-core.js');
function storage() {
   const values = new Map();
   return { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), values };
}
test('editing a draft does not persist; save does not publish; publish snapshots are independent', () => {
   const s = storage(), config = B.starter();
   config.title = 'My intake';
   assert.equal(s.values.size, 0);
   const first = B.commit(s, config, false, null);
   assert.equal(first.record.published, null);
   const published = B.commit(s, config, true, first.serialized);
   config.fields[1].label = 'New label';
   assert.notEqual(published.record.published.fields[1].label, 'New label');
   const saved = B.commit(s, config, false, published.serialized);
   assert.equal(saved.record.draft.fields[1].label, 'New label');
   assert.notEqual(saved.record.published.fields[1].label, 'New label');
   assert.equal(B.commit(s, config, true, saved.serialized).record.published.fields[1].label, 'New label');
});
test('responses retain Fillvisa flat values, required flags, comments and boolean checkboxes', () => {
   const config = B.starter();
   config.fields.push({ ...B.field('checkbox'), id: 'consent', required: true });
   const data = B.response(config, { last_name: 'Example', consent: true, unknown: 'excluded' }, { last_name: '  A note  ', unknown: 'excluded' });
   assert.equal(data.last_name, 'Example'); assert.equal(data.consent, true);
   assert.equal(data._requiredFields.last_name, true); assert.equal(data._requiredFields.email_address, false);
   assert.deepEqual(data._comments, { last_name: 'A note' });
   assert.equal(data.unknown, undefined); assert.equal(data.basic_identity, undefined);
   const bundle = B.bundle(config, data, true), keys = B.keys(config.id);
   assert.deepEqual(Object.keys(bundle), [keys.config, keys.data, keys.valid]);
   assert.equal(bundle[keys.valid], true); assert.equal(bundle[keys.data].consent, true);
});
test('JSON config and combined export both round trip', () => {
   const config = B.starter();
   assert.deepEqual(B.importConfig(JSON.parse(JSON.stringify(config))), config);
   assert.deepEqual(B.importConfig(JSON.parse(JSON.stringify(B.bundle(config)))), config);
});
test('simultaneous editors cannot silently overwrite a saved form', () => {
   const s = storage(), config = B.starter();
   const first = B.commit(s, config, true, null);
   config.title = 'Newer'; const second = B.commit(s, config, false, first.serialized);
   assert.throws(() => B.commit(s, config, true, first.serialized), /another tab/);
   assert.equal(s.getItem(B.keys(config.id).config), second.serialized);
});
test('malformed configuration and duplicate or unsafe field IDs are rejected', () => {
   assert.throws(() => B.importConfig({}), /supported/);
   for (const id of ['__proto__', 'constructor', 'prototype', '<script>', 'two words']) {
      const config = B.starter(); config.fields[0].id = id;
      assert.throws(() => B.validate(config), /unique/);
   }
   const config = B.starter(); config.fields[1].id = config.fields[0].id;
   assert.throws(() => B.validate(config), /unique/);
});
test('choice validation blocks blanks and duplicates before writing', () => {
   const config = B.starter(), s = storage();
   config.fields.push({ ...B.field('radio'), options: ['Email', 'Email'] });
   assert.throws(() => B.commit(s, config, true, null), /unique/);
   config.fields.at(-1).options = ['Email', ''];
   assert.throws(() => B.commit(s, config, true, null), /non-empty/);
   assert.equal(s.values.size, 0);
});
test('empty drafts can save but cannot publish; storage failures propagate', () => {
   const config = B.starter(), s = storage(); config.fields = [];
   const saved = B.commit(s, config, false, null);
   assert.throws(() => B.commit(s, config, true, saved.serialized), /at least one input/);
   assert.equal(s.getItem(B.keys(config.id).config), saved.serialized);
   assert.throws(() => B.commit({ getItem: () => null, setItem: () => { throw new Error('quota'); } }, B.starter(), false, null), /quota/);
});
test('form IDs isolate configurations, responses, and validation keys', () => {
   const a = B.starter(), b = B.starter();
   assert.notEqual(a.id, b.id);
   assert.equal(Object.values(B.keys(a.id)).some(k => Object.values(B.keys(b.id)).includes(k)), false);
   const s = storage(); s.setItem('bad', '{broken');
   assert.throws(() => B.read(s, 'bad'), /could not be read/);
});

function conditionalForm() {
   const config = B.starter();
   config.fields = [
      {...B.field('select'), id: 'marital_status', options: ['Single', 'Married']},
      {...B.field('checkbox'), id: 'has_interpreter'},
      {...B.field('conditional'), id: 'spouse', label: 'Spouse details', condition: {match: 'all', rules: [{fieldId: 'marital_status', operator: 'equals', value: 'Married'}]}},
      {...B.field('text'), id: 'spouse_name', parentId: 'spouse', required: true}
   ];
   return config;
}
test('conditional visibility supports all/any and strict checkbox values', () => {
   const config = conditionalForm(), block = config.fields[2];
   assert.equal(B.visibility(config, {}).spouse_name, false);
   assert.equal(B.visibility(config, {marital_status: 'Married'}).spouse_name, true);
   block.condition.rules.push({fieldId: 'has_interpreter', operator: 'checked', value: ''});
   assert.equal(B.visibility(config, {marital_status: 'Married'}).spouse, false);
   assert.equal(B.visibility(config, {marital_status: 'Married', has_interpreter: true}).spouse, true);
   assert.equal(B.visibility(config, {marital_status: 'Married', has_interpreter: 'true'}).spouse, false);
   block.condition.match = 'any';
   assert.equal(B.visibility(config, {marital_status: 'Single', has_interpreter: true}).spouse_name, true);
   assert.equal(B.visibility(config, {marital_status: 'Single', has_interpreter: false}).spouse_name, false);
});
test('choice comparisons handle empty values without showing negative rules prematurely', () => {
   const config = conditionalForm(), rule = config.fields[2].condition.rules[0];
   for (const [operator, value, answer, expected] of [
      ['not_equals', 'Married', '', false], ['not_equals', 'Married', 'Single', true],
      ['empty', '', '', true], ['empty', '', 'Single', false],
      ['not_empty', '', 'Single', true], ['not_empty', '', 'Removed option', false], ['contains', 'arr', 'Married', true],
      ['contains', '', 'Married', false]
   ]) {
      Object.assign(rule, {operator, value});
      assert.equal(B.visibility(config, {marital_status: answer}).spouse, expected);
   }
   Object.assign(rule, {fieldId: 'has_interpreter', operator: 'unchecked', value: ''});
   assert.equal(B.visibility(config, {has_interpreter: false}).spouse, true);
   assert.equal(B.visibility(config, {has_interpreter: true}).spouse, false);
});
test('hidden answers, required flags and comments are omitted while in-memory answers remain', () => {
   const config = conditionalForm();
   const values = {marital_status: 'Single', spouse_name: 'Example'};
   const memory = B.response(config, values, {spouse_name: 'Private note'});
   assert.equal(memory.spouse_name, 'Example');
   const output = B.bundle(config, memory, true)[B.keys(config.id).data];
   assert.equal(Object.hasOwn(output, 'spouse_name'), false);
   assert.equal(Object.hasOwn(output._requiredFields, 'spouse_name'), false);
   assert.deepEqual(output._comments, {});
   assert.equal(Object.hasOwn(output, 'spouse'), false);
   memory.marital_status = 'Married';
   const shown = B.response(config, memory, memory._comments, true);
   assert.equal(shown.spouse_name, 'Example');
   assert.equal(shown._requiredFields.spouse_name, true);
   assert.equal(shown._comments.spouse_name, 'Private note');
});
test('conditional config survives JSON round trips and save/publish isolation', () => {
   const config = conditionalForm(), s = storage();
   B.validate(config, true);
   assert.deepEqual(B.importConfig(B.bundle(config)), config);
   const published = B.commit(s, config, true, null);
   config.fields[2].condition.match = 'any';
   const draft = B.commit(s, config, false, published.serialized);
   assert.equal(draft.record.published.fields[2].condition.match, 'all');
   assert.equal(draft.record.draft.fields[2].condition.match, 'any');
});
test('unfinished blocks save as drafts but cannot publish', () => {
   const config = conditionalForm(), s = storage();
   config.fields[2].condition.rules = [];
   const saved = B.commit(s, config, false, null);
   assert.throws(() => B.commit(s, config, true, saved.serialized), /Add a condition/);
   config.fields[2].condition.rules = [{fieldId: '', operator: 'equals', value: ''}];
   assert.doesNotThrow(() => B.validate(config));
   assert.throws(() => B.validate(config, true), /outside the block/);
});
test('rejects orphan fields, nested blocks, cycles and unsupported rule sources', () => {
   for (const mutate of [
      c => { c.fields[3].parentId = 'missing'; },
      c => { c.fields[2].parentId = 'spouse'; },
      c => { c.fields[0].parentId = 'spouse'; },
      c => { c.fields[2].condition.rules[0].fieldId = 'spouse_name'; },
      c => { c.fields[2].condition.rules[0].operator = 'unknown'; }
   ]) {
      const config = conditionalForm(); mutate(config);
      assert.throws(() => B.validate(config, true));
   }
   const config = conditionalForm(); config.fields[0].options = ['Single'];
   assert.throws(() => B.validate(config, true), /no longer exists/);
});
test('moving fields into/out of blocks preserves IDs and rejects controllers or nested blocks', () => {
   const config = conditionalForm();
   B.move(config, 'spouse_name', '');
   assert.equal(B.children(config).some(f => f.id === 'spouse_name'), true);
   B.move(config, 'spouse_name', 'spouse');
   assert.equal(B.children(config, 'spouse')[0].id, 'spouse_name');
   assert.throws(() => B.move(config, 'marital_status', 'spouse'), /controls a block/);
   assert.throws(() => B.move(config, 'spouse', 'spouse'), /nested/);
   B.move(config, 'spouse', '', 'marital_status');
   assert.equal(B.children(config)[0].id, 'spouse');
   assert.equal(B.children(config, 'spouse')[0].id, 'spouse_name');
   assert.doesNotThrow(() => B.validate(config, true));
});
