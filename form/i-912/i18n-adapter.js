function i912Translate(text) { return window.FillvisaI18n?.t(text) ?? text; }
function i912Alert(message) { window.alert(String(message).split('\n').map(i912Translate).join('\n')); }
