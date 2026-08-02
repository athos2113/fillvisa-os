const interpreterDataIds = [
   "interpreter_lastname",
   "interpreter_firstname",
   "interpreter_business",
   "interpreter_telephone",
   "interpreter_mobile",
   "interpreter_email",
   "interpreter_language",
   "interpreter_sign",
   "interpreter_sign_date"
];

function getSavedJson(key) {
   try {
      return JSON.parse(localStorage.getItem(key) || "null");
   } catch (error) {
      return null;
   }
}

function hasValue(id) {
   return (document.getElementById(id)?.value.trim() || "") !== "";
}

function hasInterpreterData() {
   return interpreterDataIds.some(hasValue);
}

function isInterpreterRequiredFromSponsorStatement() {
   const sponsorSignatureData = getSavedJson("i864-8");
   return !!sponsorSignatureData?.sponsor_interpreter;
}

function isInterpreterInfoRequired() {
   return isInterpreterRequiredFromSponsorStatement() || hasInterpreterData();
}

function hasRequiredText(value) {
   return value.trim() !== "";
}

function normalizeDigits(value) {
   return String(value || "").replace(/\D/g, "");
}

function isPhoneLike(value) {
   const digits = normalizeDigits(value);
   return digits.length >= 7 && digits.length <= 15;
}

function isOptionalEmail(value) {
   const trimmed = value.trim();
   return trimmed === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

const fields = [
   {
      id: "interpreter_lastname",
      required: true,
      condition: isInterpreterInfoRequired,
      validate: hasRequiredText,
      message: "Interpreter family name is required when interpreter information is required."
   },
   {
      id: "interpreter_firstname",
      required: true,
      condition: isInterpreterInfoRequired,
      validate: hasRequiredText,
      message: "Interpreter given name is required when interpreter information is required."
   },
   {
      id: "interpreter_business",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "interpreter_telephone",
      required: true,
      condition: isInterpreterInfoRequired,
      validate: isPhoneLike,
      message: "Enter a valid daytime telephone number."
   },
   {
      id: "interpreter_mobile",
      required: false,
      validate: value => value.trim() === "" || isPhoneLike(value),
      message: "Enter a valid mobile telephone number, or leave it blank."
   },
   {
      id: "interpreter_email",
      required: false,
      validate: isOptionalEmail,
      message: "Enter a valid email address, or leave it blank."
   },
   {
      id: "interpreter_language",
      required: true,
      condition: isInterpreterInfoRequired,
      validate: hasRequiredText,
      message: "Interpreter language is required when interpreter information is required."
   },
   {
      id: "interpreter_sign",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "interpreter_sign_date",
      required: false,
      validate: () => true,
      message: ""
   }
];
