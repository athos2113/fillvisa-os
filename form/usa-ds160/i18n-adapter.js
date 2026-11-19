/* Translate page-owned validation dialogs without changing saved DS-160 answers. */
window.ds160Alert = function (message) {
    const t = text => window.FillvisaI18n?.t(text) ?? text;
    window.alert(String(message).split('\n').map(t).join('\n'));
};

// A standalone preview has no shared loader; translate its UI before creating the blob.
window.ds160PreviewDocument = function (html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    doc.documentElement.lang = document.documentElement.lang;
    const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
        if (node.parentElement.closest('[translate="no"], script, style')) continue;
        node.nodeValue = node.nodeValue.replace(/\S(?:[\s\S]*\S)?/, text => window.FillvisaI18n?.t(text) ?? text);
    }
    return '<!doctype html>' + doc.documentElement.outerHTML;
};
