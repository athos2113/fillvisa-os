/* Translate validation dialogs while preserving saved answers and PDF values. */
window.i485Alert = function (message) {
    const t = text => window.FillvisaI18n?.t(text) ?? text;
    window.alert(String(message).split('\n').map(t).join('\n'));
};
