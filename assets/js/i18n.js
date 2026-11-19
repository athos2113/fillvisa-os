/* Opt-in, dictionary-based UI translation. Never translate form values or HTML. */
(() => {
    'use strict';
    // Each form owns its dictionaries; the loader is shared across forms.
    const localeRoot = new URL(document.currentScript.dataset.locales || './locales/', document.baseURI);
    const cache = new Map();
    const originals = new WeakMap();
    const attributes = new WeakMap();
    let english = {};
    let dictionary = {};
    let keys = new Map();
    let templates = [];
    let language = 'en';
    let request = 0;
    let observer;
    let status;
    let languageSelect;
    let languageLabel;
    const normalize = text => text.trim().replace(/\s+/g, ' ');
    const skip = 'script, style, textarea, input, [contenteditable], [translate="no"], [data-i18n-control]';

    // Only numeric placeholders are matched; user-entered text is never interpolated.
    function resolve(text) {
        const normalized = normalize(text);
        const key = keys.get(normalized);
        if (key) return { key };
        for (const template of templates) {
            const match = template.pattern.exec(normalized);
            if (match) return { key: template.key, values: Object.fromEntries(template.names.map((name, i) => [name, match[i + 1]])) };
        }
        return null;
    }

    function translated(record) {
        const value = dictionary[record.key] ?? english[record.key];
        return record.values ? value.replace(/\{(\w+)\}/g, (token, name) => record.values[name] ?? token) : value;
    }

    function t(text) {
        const record = resolve(text);
        return record ? translated(record) : text;
    }

    async function load(lang) {
        if (cache.has(lang)) return cache.get(lang);
        const response = await fetch(new URL(`${lang}.json`, localeRoot));
        if (!response.ok) throw new Error(`Translation HTTP ${response.status}`);
        const value = await response.json();
        if (!value || Array.isArray(value) || typeof value !== 'object' ||
            Object.values(value).some(text => typeof text !== 'string')) {
            throw new Error('Invalid translation dictionary');
        }
        cache.set(lang, value);
        return value;
    }

    function translateDOM() {
        observer?.disconnect();
        try {
            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
            let node;
            while ((node = walker.nextNode())) {
                const parent = node.parentElement;
                if (!parent || parent.closest(skip)) continue;
                // An option without an explicit value uses its text as form data.
                if (parent.tagName === 'OPTION' && !parent.hasAttribute('value')) continue;
                let record = originals.get(node);
                if (!record || node.nodeValue !== record.rendered) {
                    const source = node.nodeValue;
                    const text = normalize(source);
                    const id = parent.getAttribute('for') || parent.id;
                    const explicit = parent.dataset.i18n;
                    const match = explicit && english[explicit] !== undefined && normalize(english[explicit]) === text ? { key: explicit }
                        : id && english[id] !== undefined && normalize(english[id]) === text ? { key: id } : resolve(text);
                    if (!match) continue;
                    record = { source, ...match };
                    originals.set(node, record);
                    // Only mark a whole element when it contains one text node.
                    if (parent.childNodes.length === 1) parent.dataset.i18n = record.key;
                }
                const value = translated(record);
                record.rendered = record.source.replace(/\S(?:[\s\S]*\S)?/, () => value);
                if (node.nodeValue !== record.rendered) node.nodeValue = record.rendered;
            }
            document.querySelectorAll('[placeholder], [title], [aria-label], optgroup[label]').forEach(element => {
                if (element.closest('[data-i18n-control], [translate="no"]')) return;
                let saved = attributes.get(element);
                if (!saved) { saved = {}; attributes.set(element, saved); }
                for (const name of ['placeholder', 'title', 'aria-label', 'label']) {
                    if (!element.hasAttribute(name)) continue;
                    const current = element.getAttribute(name);
                    if (!saved[name] || current !== saved[name].rendered) saved[name] = { source: current };
                    const translated = t(saved[name].source);
                    saved[name].rendered = translated;
                    if (current !== translated) element.setAttribute(name, translated);
                }
            });
        } finally {
            observer?.observe(document.body, { childList: true, characterData: true, subtree: true });
        }
    }

    async function setLanguage(lang) {
        if (!['en', 'es'].includes(lang)) return false;
        const sequence = ++request;
        try {
            const base = await load('en');
            const translated = lang === 'en' ? base : await load(lang);
            if (sequence !== request) return false;
            english = base;
            dictionary = translated;
            keys = new Map(Object.entries(base).map(([key, text]) => [normalize(text), key]));
            templates = [];
            // Multi-page forms rebuild navigation labels as sections are completed.
            // Recognize their previously translated text after those DOM updates too.
            for (const loaded of cache.values()) {
                for (const [key, text] of Object.entries(loaded)) {
                    if (key in base && !keys.has(normalize(text))) keys.set(normalize(text), key);
                    if (key in base && /\{\w+\}/.test(text)) {
                        const names = [];
                        const pattern = normalize(text).split(/(\{\w+\})/).map(part => {
                            if (/^\{\w+\}$/.test(part)) { names.push(part.slice(1, -1)); return '(\\d+)'; }
                            return part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                        }).join('');
                        templates.push({ key, names, pattern: new RegExp(`^${pattern}$`) });
                    }
                }
            }
            language = lang;
            document.documentElement.lang = lang;
            translateDOM();
            document.querySelectorAll('[data-language-option]').forEach(option => {
                const selected = option.dataset.languageOption === lang;
                option.classList.toggle('active', selected);
                option.querySelector('.language-check').classList.toggle('invisible', !selected);
                option.setAttribute('aria-pressed', String(selected));
            });
            updateLanguageLabel();
            status.textContent = '';
            try { localStorage.setItem('fillvisa.language', lang); } catch { /* Storage is optional. */ }
            const url = new URL(location.href);
            url.searchParams.set('lang', lang);
            history.replaceState(null, '', url);
            return true;
        } catch (error) {
            if (sequence !== request) return false;
            status.textContent = language === 'es'
                ? 'No se pudo cargar el idioma. Inténtelo de nuevo.'
                : 'Could not load the language. Please try again.';
            console.warn('Unable to load translations.', error);
            return false;
        }
    }

    window.FillvisaI18n = { t, setLanguage };

    function updateLanguageLabel() {
        const selected = document.querySelector(`[data-language-option="${language}"]`);
        const prefix = document.createElement('span');
        prefix.textContent = `${t('Select language')}:`;
        const flag = selected.querySelector('svg').cloneNode(true);
        const name = selected.querySelector('span').cloneNode(true);
        name.lang = language;
        languageLabel.replaceChildren(prefix, flag, name);
    }

    function init() {
        const controls = document.createElement('nav');
        controls.className = 'd-flex flex-wrap align-items-center gap-2';
        controls.dataset.i18nControl = '';
        controls.setAttribute('aria-label', 'Language / Idioma');
        const dropdown = document.createElement('div');
        dropdown.className = 'dropdown';
        languageLabel = document.createElement('span');
        languageLabel.className = 'd-inline-flex align-items-center gap-2';
        languageLabel.textContent = 'Select language';
        languageSelect = document.createElement('button');
        languageSelect.type = 'button';
        languageSelect.id = 'fillvisa-language';
        languageSelect.className = 'btn btn-primary dropdown-toggle d-inline-flex align-items-center gap-2';
        languageSelect.setAttribute('data-bs-toggle', 'dropdown');
        languageSelect.setAttribute('aria-expanded', 'false');
        languageSelect.setAttribute('aria-controls', 'fillvisa-language-options');
        languageSelect.append(languageLabel);
        const menu = document.createElement('div');
        menu.id = 'fillvisa-language-options';
        menu.className = 'dropdown-menu dropdown-menu-end';
        menu.setAttribute('aria-labelledby', languageSelect.id);
        const flags = {
            en: '<svg class="flex-shrink-0" width="18" height="12" viewBox="0 0 18 12" aria-hidden="true"><path fill="#fff" d="M0 0h18v12H0z"/><path stroke="#bf2440" stroke-width="1.8" d="M0 1h18M0 4.3h18M0 7.6h18M0 11h18"/><path fill="#244779" d="M0 0h8v7H0z"/><path fill="#fff" d="M1 1h1v1H1zm3 0h1v1H4zm2 2h1v1H6zM2 3h1v1H2zM1 5h1v1H1zm3 0h1v1H4z"/></svg>',
            es: '<svg class="flex-shrink-0" width="18" height="12" viewBox="0 0 18 12" aria-hidden="true"><path fill="#c52232" d="M0 0h18v12H0z"/><path fill="#ffcf36" d="M0 3h18v6H0z"/><path fill="#bf2932" d="M4 5h2v3H4z"/></svg>'
        };
        for (const [lang, label] of [['en', 'English'], ['es', 'Español']]) {
            const option = document.createElement('button');
            option.type = 'button';
            option.className = 'dropdown-item d-flex align-items-center gap-3';
            option.dataset.languageOption = lang;
            option.lang = lang;
            option.setAttribute('aria-pressed', String(lang === language));
            option.classList.toggle('active', lang === language);
            option.innerHTML = flags[lang];
            const name = document.createElement('span');
            name.textContent = label;
            const check = document.createElement('span');
            check.className = 'language-check ms-auto';
            check.classList.toggle('invisible', lang !== language);
            check.setAttribute('aria-hidden', 'true');
            check.textContent = '✓';
            option.append(name, check);
            option.addEventListener('click', () => setLanguage(lang));
            menu.append(option);
        }
        dropdown.append(languageSelect, menu);
        status = document.createElement('span');
        status.setAttribute('role', 'status');
        status.className = 'small';
        controls.append(dropdown, status);
        const breadcrumb = document.querySelector('main .breadcrumb');
        if (breadcrumb) {
            const breadcrumbNav = breadcrumb.closest('nav');
            const toolbar = document.createElement('div');
            toolbar.className = 'd-flex flex-wrap justify-content-between align-items-center gap-3 mb-4 px-3 px-md-0';
            breadcrumbNav.before(toolbar);
            breadcrumbNav.classList.remove('mb-4');
            breadcrumb.classList.remove('px-3', 'px-md-0');
            breadcrumb.classList.add('mb-0');
            toolbar.append(breadcrumbNav, controls);
        } else {
            controls.classList.add('container', 'py-2');
            const header = document.querySelector('header');
            if (header) header.after(controls); else document.body.prepend(controls);
        }
        updateLanguageLabel();
        observer = new MutationObserver(translateDOM);
        let preferred = new URLSearchParams(location.search).get('lang');
        if (!['en', 'es'].includes(preferred)) {
            try { preferred = localStorage.getItem('fillvisa.language'); } catch { /* English fallback. */ }
        }
        setLanguage(preferred === 'es' ? 'es' : 'en');
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
