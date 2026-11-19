/* Translate page-owned validation dialogs without changing stored answers or PDF data. */
window.i539Alert = function (message) {
    const t = text => window.FillvisaI18n?.t(text) ?? text;
    window.alert(String(message).split('\n').map(t).join('\n'));
};
