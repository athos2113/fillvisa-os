(function (root) {
   'use strict';
   const types = {
      conditional: { label: 'Conditional block', icon: 'diagram-2' },
      heading: { label: 'Heading', icon: 'type-h2' },
      text: { label: 'Short text', icon: 'input-cursor-text' },
      textarea: { label: 'Long text', icon: 'text-paragraph' },
      email: { label: 'Email', icon: 'envelope' },
      tel: { label: 'Phone number', icon: 'telephone' },
      number: { label: 'Number', icon: '123' },
      date: { label: 'Date', icon: 'calendar3' },
      select: { label: 'Dropdown', icon: 'menu-button-wide' },
      radio: { label: 'Single choice', icon: 'ui-radios' },
      checkbox: { label: 'Checkbox', icon: 'check-square' }
   };
   const clone = value => JSON.parse(JSON.stringify(value));
   const isInput = f => !['heading', 'conditional'].includes(f.type);
   const controllers = config => config.fields.filter(f => !f.parentId && ['select', 'radio', 'checkbox'].includes(f.type));
   const operators = type => type === 'checkbox'
      ? { checked: 'Is checked', unchecked: 'Is not checked' }
      : { equals: 'Equals', not_equals: 'Does not equal', empty: 'Is empty', not_empty: 'Is not empty', contains: 'Contains' };
   const children = (config, parentId = '') => config.fields.filter(f => (f.parentId || '') === parentId);
   function visibility(config, values = {}) {
      const result = {};
      config.fields.filter(f => f.type === 'conditional').forEach(block => {
         const rules = block.condition?.rules || [];
         const matches = rules.map(rule => {
            const source = controllers(config).find(f => f.id === rule.fieldId);
            if (!source || !Object.hasOwn(operators(source.type), rule.operator)) return false;
            const value = values[source.id];
            if (rule.operator === 'checked') return value === true;
            if (rule.operator === 'unchecked') return value !== true;
            const text = typeof value === 'string' && source.options.includes(value) ? value : '';
            if (rule.operator === 'empty') return text === '';
            if (rule.operator === 'not_empty') return text !== '';
            // Unanswered choice fields never satisfy value comparisons.
            if (!text || !rule.value) return false;
            if (rule.operator === 'equals') return text === rule.value;
            if (rule.operator === 'not_equals') return text !== rule.value;
            return text.includes(rule.value);
         });
         result[block.id] = rules.length > 0 && (block.condition.match === 'any' ? matches.some(Boolean) : matches.every(Boolean));
      });
      config.fields.filter(f => f.type !== 'conditional').forEach(f => { result[f.id] = f.parentId ? result[f.parentId] === true : true; });
      return result;
   }
   function move(config, id, parentId = '', beforeId = '') {
      const f = config.fields.find(f => f.id === id);
      const parent = config.fields.find(f => f.id === parentId);
      if (!f || (parentId && parent?.type !== 'conditional')) throw new Error('Choose a valid destination.');
      if (parentId && f.type === 'conditional') throw new Error('Conditional blocks cannot be nested inside another block.');
      if (parentId && config.fields.some(b => b.type === 'conditional' && b.condition.rules.some(r => r.fieldId === id))) throw new Error('This field controls a block. Keep it outside conditional blocks, or remove its rules first.');
      if (beforeId === id) return;
      const before = config.fields.find(f => f.id === beforeId);
      if (beforeId && (!before || (before.parentId || '') !== parentId)) throw new Error('Choose a valid position.');
      config.fields.splice(config.fields.indexOf(f), 1);
      if (parentId) f.parentId = parentId; else delete f.parentId;
      config.fields.splice(before ? config.fields.indexOf(before) : config.fields.length, 0, f);
   }
   const uid = () => 'form_' + (root.crypto?.randomUUID?.() || Date.now().toString(36) + Math.random().toString(36).slice(2));
   const validId = id => typeof id === 'string' && /^[a-z][a-z0-9_-]{0,79}$/i.test(id) && !['__proto__', 'prototype', 'constructor'].includes(id);
   const keys = id => {
      if (!validId(id)) throw new Error('Invalid form ID.');
      return { config: `buildConfig-${id}`, data: `build-${id}-1`, valid: `buildValid-${id}-1` };
   };
   function field(type) {
      if (!Object.hasOwn(types, type)) throw new Error('Unsupported field type.');
      return { id: 'field_' + uid().slice(5), type, label: types[type].label, description: '', placeholder: '', required: false,
         ...(type === 'select' || type === 'radio' ? { options: ['Option 1', 'Option 2', 'Option 3'] } : {}),
         ...(type === 'conditional' ? { condition: { match: 'all', rules: [] } } : {}) };
   }
   function starter() {
      return { version: 1, id: uid(), title: 'Client information', description: 'Please complete your details below. Your information stays in this browser.', submitLabel: 'Validate form', fields: [
         { ...field('heading'), id: 'basic_identity', label: 'Basic identity', description: 'Enter your name as it appears on your official documents.' },
         { ...field('text'), id: 'last_name', label: 'Family Name (Last Name)', required: true },
         { ...field('text'), id: 'first_name', label: 'Given Name (First Name)', required: true },
         { ...field('email'), id: 'email_address', label: 'Email Address' }
      ] };
   }
   function validate(config, publish = false) {
      if (!config || config.version !== 1 || !validId(config.id)) throw new Error('This is not a supported Fillvisa builder configuration.');
      if (typeof config.title !== 'string' || !config.title.trim() || config.title.length > 200) throw new Error('Give your form a title (up to 200 characters).');
      if (typeof config.description !== 'string' || config.description.length > 4000) throw new Error('The form description is too long.');
      if (typeof config.submitLabel !== 'string' || !config.submitLabel.trim() || config.submitLabel.length > 80) throw new Error('Enter a button label (up to 80 characters).');
      if (!Array.isArray(config.fields) || config.fields.length > 100) throw new Error('A form can contain up to 100 elements.');
      const ids = new Set();
      for (const f of config.fields) {
         if (!f || !validId(f.id) || ids.has(f.id) || !Object.hasOwn(types, f.type)) throw new Error('Every element needs a unique, valid field ID and supported type.');
         ids.add(f.id);
         if (typeof f.label !== 'string' || !f.label.trim() || f.label.length > 500) throw new Error('Every element needs a label (up to 500 characters).');
         if (typeof f.description !== 'string' || f.description.length > 4000 || typeof f.placeholder !== 'string' || f.placeholder.length > 500 || typeof f.required !== 'boolean') throw new Error('An element contains invalid settings.');
         if (['select', 'radio'].includes(f.type) && (!Array.isArray(f.options) || !f.options.length || f.options.length > 100 || f.options.some(o => typeof o !== 'string' || !o.trim() || o.length > 200) || new Set(f.options).size !== f.options.length)) throw new Error('Choice fields need 1–100 unique, non-empty options (up to 200 characters each).');
      }
      for (const f of config.fields) {
         if (f.parentId !== undefined && (!validId(f.parentId) || f.type === 'conditional' || !config.fields.some(b => b.id === f.parentId && b.type === 'conditional'))) throw new Error('Fields must belong to an existing block. Blocks cannot be nested.');
         if (f.type !== 'conditional') continue;
         const condition = f.condition;
         if (!condition || !['all', 'any'].includes(condition.match) || !Array.isArray(condition.rules) || condition.rules.length > 20) throw new Error('Conditional blocks need an all/any match mode and up to 20 rules.');
         if (publish && !condition.rules.length) throw new Error(`Add a condition to "${f.label}" before publishing.`);
         for (const rule of condition.rules) {
            if (!rule || typeof rule.fieldId !== 'string' || typeof rule.operator !== 'string' || typeof rule.value !== 'string' || rule.value.length > 200) throw new Error('A condition contains invalid settings.');
            const source = controllers(config).find(source => source.id === rule.fieldId);
            if (!source && (rule.fieldId || publish)) throw new Error(`Choose a dropdown, single choice, or checkbox outside the block for "${f.label}".`);
            if (source && !Object.hasOwn(operators(source.type), rule.operator)) throw new Error('Choose a supported comparison for the condition.');
            if (publish && ['equals', 'not_equals', 'contains'].includes(rule.operator) && !rule.value.trim()) throw new Error(`Complete the comparison value for "${f.label}".`);
            if (publish && source && ['equals', 'not_equals'].includes(rule.operator) && !source.options.includes(rule.value)) throw new Error(`A choice used by "${f.label}" no longer exists. Update its condition.`);
         }
      }
      return config;
   }
   function read(storage, key) {
      const value = storage.getItem(key);
      if (value === null) return null;
      try { return JSON.parse(value); } catch { throw new Error('Saved data could not be read. Go to My forms to create a new form.'); }
   }
   function commit(storage, config, publish, expected) {
      validate(config, publish);
      if (publish && !config.fields.some(isInput)) throw new Error('Add at least one input before publishing.');
      const key = keys(config.id).config;
      const current = storage.getItem(key);
      if (current !== expected) throw new Error('This form changed in another tab. Keep this page open to preserve your edits and compare with the saved form in another tab before reloading.');
      const previous = current ? read(storage, key) : null;
      const record = { draft: clone(config), published: publish ? clone(config) : previous?.published || null,
         savedAt: new Date().toISOString(), publishedAt: publish ? new Date().toISOString() : previous?.publishedAt || null };
      const serialized = JSON.stringify(record);
      storage.setItem(key, serialized);
      return { record, serialized };
   }
   function response(config, values = {}, comments = {}, visibleOnly = false) {
      const data = { _requiredFields: {}, _comments: {} };
      const visible = visibility(config, values);
      config.fields.filter(isInput).forEach(f => {
         if (visibleOnly && !visible[f.id]) return;
         const value = Object.hasOwn(values, f.id) ? values[f.id] : '';
         data[f.id] = f.type === 'checkbox' ? value === true : typeof value === 'string' ? value : '';
         data._requiredFields[f.id] = f.required;
         if (typeof comments[f.id] === 'string' && comments[f.id].trim()) data._comments[f.id] = comments[f.id].trim();
      });
      return data;
   }
   function bundle(config, data, valid = false) {
      const k = keys(config.id);
      return { [k.config]: clone(config), [k.data]: response(config, data, data?._comments, true), [k.valid]: !!valid };
   }
   function importConfig(value) {
      const config = value?.version === 1 ? value : Object.entries(value || {}).find(([key]) => key.startsWith('buildConfig-'))?.[1];
      return clone(validate(config));
   }
   const api = { types, clone, uid, validId, keys, field, starter, validate, read, commit, response, bundle, importConfig, isInput, controllers, operators, children, visibility, move };
   if (typeof module !== 'undefined' && module.exports) module.exports = api;
   root.FillvisaBuilder = api;
})(typeof window === 'undefined' ? globalThis : window);
