const preparerDataIds = [
   "preparer_lastname",
   "preparer_firstname",
   "preparer_business",
   "preparer_telephone",
   "preparer_mobile",
   "preparer_email",
   "preparer_sign",
   "preparer_sign_date"
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

function hasPreparerData() {
   return preparerDataIds.some(hasValue);
}

function isPreparerRequiredFromSponsorStatement() {
   const sponsorSignatureData = getSavedJson("i864-8");
   return !!sponsorSignatureData?.sponsor_preparer;
}

function isPreparerInfoRequired() {
   return isPreparerRequiredFromSponsorStatement() || hasPreparerData();
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
      id: "preparer_lastname",
      required: true,
      condition: isPreparerInfoRequired,
      validate: hasRequiredText,
      message: "Preparer family name is required when preparer information is required."
   },
   {
      id: "preparer_firstname",
      required: true,
      condition: isPreparerInfoRequired,
      validate: hasRequiredText,
      message: "Preparer given name is required when preparer information is required."
   },
   {
      id: "preparer_business",
      required: false,
      validate: () => true,
      message: ""
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
      validate: isOptionalEmail,
      message: "Enter a valid email address, or leave it blank."
   },
   {
      id: "preparer_sign",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "preparer_sign_date",
      required: false,
      validate: () => true,
      message: ""
   }
];
