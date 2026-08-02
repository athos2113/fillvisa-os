const preparerUnitIds = [
   "preparer_apt",
   "preparer_ste",
   "preparer_flr"
];

const preparerStatementIds = [
   "preparer_statement_preparerd",
   "preparer_statement_not_preparerd"
];

const preparerScopeIds = [
   "preparer_statement_not_preparerd_extend",
   "preparer_statement_not_preparerd_not_extend"
];

const preparerDataIds = [
   "preparer_lastname",
   "preparer_firstnname",
   "preparer_business",
   "preparer_street",
   "preparer_number",
   "preparer_city",
   "preparer_state",
   "preparer_zip",
   "preparer_province",
   "preparer_postal",
   "preparer_country",
   "preparer_telephone",
   "preparer_mobile",
   "preparer_email",
   "preparer_sign",
   "preparer_date"
];

function isChecked(id) {
   return !!document.getElementById(id)?.checked;
}

function setGroupState(ids, isValid) {
   ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;

      el.classList.toggle("is-valid", isValid);
      el.classList.toggle("is-invalid", !isValid);
   });
}

function validateRadioGroup(ids) {
   const isValid = ids.some(isChecked);
   setGroupState(ids, isValid);
   return isValid;
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

function isPreparerUnitedStates() {
   return isUnitedStates(document.getElementById("preparer_country")?.value);
}

function isPreparerUnitSelected() {
   return preparerUnitIds.some(isChecked);
}

function wasPreparerSelectedInPart6() {
   try {
      const part6 = JSON.parse(localStorage.getItem("i130-6") || "{}");
      return !!part6.petitioner_statement_preparer;
   } catch (error) {
      return false;
   }
}

function hasPreparerData() {
   return preparerDataIds.some(hasValue) ||
      preparerUnitIds.some(isChecked) ||
      preparerStatementIds.some(isChecked) ||
      preparerScopeIds.some(isChecked);
}

function isPreparerInfoRequired() {
   return wasPreparerSelectedInPart6() || hasPreparerData();
}

function isPreparerUnitNumberRequired() {
   return isPreparerInfoRequired() && isPreparerUnitSelected();
}

function isAttorneyPreparerSelected() {
   return isChecked("preparer_statement_not_preparerd");
}

function isPreparerScopeRequired() {
   return isPreparerInfoRequired() && isAttorneyPreparerSelected();
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
      id: "preparer_lastname",
      required: true,
      condition: isPreparerInfoRequired,
      validate: value => value.trim() !== "",
      message: "Preparer family name is required when preparer information is provided."
   },
   {
      id: "preparer_firstnname",
      required: true,
      condition: isPreparerInfoRequired,
      validate: value => value.trim() !== "",
      message: "Preparer given name is required when preparer information is provided."
   },
   {
      id: "preparer_business",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "preparer_street",
      required: true,
      condition: isPreparerInfoRequired,
      validate: value => value.trim() !== "",
      message: "Street number and name is required when preparer information is provided."
   },
   {
      id: "preparer_apt",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "preparer_ste",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "preparer_flr",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "preparer_number",
      required: true,
      condition: isPreparerUnitNumberRequired,
      validate: value => value.trim() !== "",
      message: "Unit number is required when Apt., Ste., or Flr. is selected."
   },
   {
      id: "preparer_city",
      required: true,
      condition: isPreparerInfoRequired,
      validate: value => value.trim() !== "",
      message: "City or town is required when preparer information is provided."
   },
   {
      id: "preparer_state",
      required: true,
      condition: () => isPreparerInfoRequired() && isPreparerUnitedStates(),
      validate: value => value.trim() !== "",
      message: "State is required for a U.S. mailing address."
   },
   {
      id: "preparer_zip",
      required: true,
      condition: () => isPreparerInfoRequired() && isPreparerUnitedStates(),
      validate: value => /^[0-9]{5}(-[0-9]{4})?$/.test(value.trim()),
      message: "Enter a valid ZIP Code (##### or #####-####)."
   },
   {
      id: "preparer_province",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "preparer_postal",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "preparer_country",
      required: true,
      condition: isPreparerInfoRequired,
      validate: value => value.trim() !== "",
      message: "Country is required when preparer information is provided."
   },
   {
      id: "preparer_telephone",
      required: true,
      condition: isPreparerInfoRequired,
      validate: isPhoneLike,
      message: "Enter a valid daytime telephone number."
   },
   {
      id: "preparer_mobile",
      required: false,
      validate: value => value.trim() === "" || isPhoneLike(value),
      message: "Enter a valid mobile telephone number, or leave it blank."
   },
   {
      id: "preparer_email",
      required: false,
      validate: value => value.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
      message: "Enter a valid email address, or leave it blank."
   },
   {
      id: "preparer_statement_preparerd",
      required: true,
      condition: isPreparerInfoRequired,
      validate: () => validateRadioGroup(preparerStatementIds),
      message: "Select one preparer statement."
   },
   {
      id: "preparer_statement_not_preparerd",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "preparer_statement_not_preparerd_extend",
      required: true,
      condition: isPreparerScopeRequired,
      validate: () => validateRadioGroup(preparerScopeIds),
      message: "Select whether representation extends beyond preparation of this petition."
   },
   {
      id: "preparer_statement_not_preparerd_not_extend",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "preparer_sign",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "preparer_date",
      required: false,
      validate: () => true,
      message: ""
   }
];
