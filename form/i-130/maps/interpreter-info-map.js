const interpreterUnitIds = [
   "interpreter_apt",
   "interpreter_ste",
   "interpreter_flr"
];

const interpreterDataIds = [
   "interpreter_lastname",
   "interpreter_firstname",
   "interpreter_business",
   "interpreter_street",
   "interpreter_number",
   "interpreter_city",
   "interpreter_state",
   "interpreter_zip",
   "interpreter_province",
   "interpreter_postal",
   "interpreter_country",
   "interpreter_telephone",
   "interpreter_mobile",
   "interpreter_email",
   "interpreter_language",
   "interpreter_sign",
   "interpreter_sign_date"
];

function isChecked(id) {
   return !!document.getElementById(id)?.checked;
}

function hasValue(id) {
   return (document.getElementById(id)?.value.trim() || "") !== "";
}

function normalizeCountry(value) {
   return String(value || "").trim().toLowerCase();
}

function isUnitedStates(value) {
   const country = normalizeCountry(value);
   return country === "" || ["us", "u.s.", "u.s.a.", "usa", "united states", "united states of america"].includes(country);
}

function isInterpreterUnitedStates() {
   return isUnitedStates(document.getElementById("interpreter_country")?.value);
}

function isInterpreterUnitSelected() {
   return interpreterUnitIds.some(isChecked);
}

function hasInterpreterData() {
   return interpreterDataIds.some(hasValue) || isInterpreterUnitSelected();
}

function isInterpreterInfoRequired() {
   return hasInterpreterData();
}

function isInterpreterUnitNumberRequired() {
   return isInterpreterInfoRequired() && isInterpreterUnitSelected();
}

function normalizeDigits(value) {
   return String(value || "").replace(/\D/g, "");
}

function isPhoneLike(value) {
   const digits = normalizeDigits(value);
   return digits.length >= 7 && digits.length <= 15;
}

const fields = [
   {
      id: "interpreter_lastname",
      required: true,
      condition: isInterpreterInfoRequired,
      validate: value => value.trim() !== "",
      message: "Interpreter family name is required when interpreter information is provided."
   },
   {
      id: "interpreter_firstname",
      required: true,
      condition: isInterpreterInfoRequired,
      validate: value => value.trim() !== "",
      message: "Interpreter given name is required when interpreter information is provided."
   },
   {
      id: "interpreter_business",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "interpreter_street",
      required: true,
      condition: isInterpreterInfoRequired,
      validate: value => value.trim() !== "",
      message: "Street number and name is required when interpreter information is provided."
   },
   {
      id: "interpreter_apt",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "interpreter_ste",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "interpreter_flr",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "interpreter_number",
      required: true,
      condition: isInterpreterUnitNumberRequired,
      validate: value => value.trim() !== "",
      message: "Unit number is required when Apt., Ste., or Flr. is selected."
   },
   {
      id: "interpreter_city",
      required: true,
      condition: isInterpreterInfoRequired,
      validate: value => value.trim() !== "",
      message: "City or town is required when interpreter information is provided."
   },
   {
      id: "interpreter_state",
      required: true,
      condition: () => isInterpreterInfoRequired() && isInterpreterUnitedStates(),
      validate: value => value.trim() !== "",
      message: "State is required for a U.S. mailing address."
   },
   {
      id: "interpreter_zip",
      required: true,
      condition: () => isInterpreterInfoRequired() && isInterpreterUnitedStates(),
      validate: value => /^[0-9]{5}(-[0-9]{4})?$/.test(value.trim()),
      message: "Enter a valid ZIP Code (##### or #####-####)."
   },
   {
      id: "interpreter_province",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "interpreter_postal",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "interpreter_country",
      required: true,
      condition: isInterpreterInfoRequired,
      validate: value => value.trim() !== "",
      message: "Country is required when interpreter information is provided."
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
      validate: value => value.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
      message: "Enter a valid email address, or leave it blank."
   },
   {
      id: "interpreter_language",
      required: true,
      condition: isInterpreterInfoRequired,
      validate: value => value.trim() !== "",
      message: "Interpreter language is required when interpreter information is provided."
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
