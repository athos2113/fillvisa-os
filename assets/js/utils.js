// utils.js

function clearVisaData(prefix) {
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith(prefix)) {
      localStorage.removeItem(key);
    }
  });

  // Also remove exact match flags
  localStorage.removeItem(`${prefix}Valid`);
}


function hasSavedVisaData(prefix) {
  return Object.keys(localStorage).some(key => key.startsWith(prefix));
}