const requestorStatementIds = [
   "requestor_statement_read",
   "requestor_statement_interpreter"
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
   return isChecked("requestor_statement_interpreter");
}

function isPreparerSelected() {
   return isChecked("requestor_statement_preparer");
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
      id: "requestor_statement_read",
      required: true,
      validate: () => validateRadioGroup(requestorStatementIds),
      message: "Select one requestor statement."
   },
   {
      id: "requestor_statement_interpreter",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "requestor_statement_language",
      required: true,
      condition: isInterpreterSelected,
      validate: value => value.trim() !== "",
      message: "Interpreter language is required when interpreter help is selected."
   },
   {
      id: "requestor_statement_preparer",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "requestor_statement_preparer_name",
      required: true,
      condition: isPreparerSelected,
      validate: value => value.trim() !== "",
      message: "Preparer name is required when preparer help is selected."
   },
   {
      id: "requestor_telephone",
      required: false,
      validate: value => value.trim() === "" || isPhoneLike(value),
      message: "Enter a valid daytime telephone number, or leave it blank."
   },
   {
      id: "requestor_mobile",
      required: false,
      validate: value => value.trim() === "" || isPhoneLike(value),
      message: "Enter a valid mobile telephone number, or leave it blank."
   },
   {
      id: "requestor_fax",
      required: false,
      validate: value => value.trim() === "" || isPhoneLike(value),
      message: "Enter a valid fax number, or leave it blank."
   },
   {
      id: "requestor_email",
      required: false,
      validate: value => value.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
      message: "Enter a valid email address, or leave it blank."
   },
   {
      id: "requestor_sign",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "requestor_sign_date",
      required: false,
      validate: () => true,
      message: ""
   }
];
