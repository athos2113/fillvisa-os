const sponsorStatementIds = [
   "sponsor_understand",
   "sponsor_interpreter"
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

function isInterpreterSelected() {
   return isChecked("sponsor_interpreter");
}

function isPreparerSelected() {
   return isChecked("sponsor_preparer");
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
      id: "sponsor_understand",
      required: true,
      validate: () => validateRadioGroup(sponsorStatementIds),
      message: "Select one sponsor statement."
   },
   {
      id: "sponsor_language",
      required: true,
      condition: isInterpreterSelected,
      validate: hasRequiredText,
      message: "Interpreter language is required when interpreter help is selected."
   },
   {
      id: "sponsor_preparer",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "sponsor_preparer_name",
      required: true,
      condition: isPreparerSelected,
      validate: hasRequiredText,
      message: "Preparer name is required when preparer help is selected."
   },
   {
      id: "sponsor_telephone",
      required: true,
      validate: isPhoneLike,
      message: "Enter a valid daytime telephone number."
   },
   {
      id: "sponsor_mobile",
      required: false,
      validate: value => value.trim() === "" || isPhoneLike(value),
      message: "Enter a valid mobile telephone number, or leave it blank."
   },
   {
      id: "sponsor_email",
      required: false,
      validate: isOptionalEmail,
      message: "Enter a valid email address, or leave it blank."
   },
   {
      id: "sponsor_sign",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "sponsor_sign_date",
      required: false,
      validate: () => true,
      message: ""
   }
];
