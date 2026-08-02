const petitionerStatementIds = [
   "petitioner_statement_read",
   "petitioner_statement_interpreter"
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
   return isChecked("petitioner_statement_interpreter");
}

function isPreparerSelected() {
   return isChecked("petitioner_statement_preparer");
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
      id: "petitioner_statement_read",
      required: true,
      validate: () => validateRadioGroup(petitionerStatementIds),
      message: "Select one petitioner's statement."
   },
   {
      id: "petitioner_statement_interpreter",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "petitioner_statement_language",
      required: true,
      condition: isInterpreterSelected,
      validate: value => value.trim() !== "",
      message: "Interpreter language is required when interpreter help is selected."
   },
   {
      id: "petitioner_statement_preparer",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "petitioner_statement_preparer_name",
      required: true,
      condition: isPreparerSelected,
      validate: value => value.trim() !== "",
      message: "Preparer name is required when preparer help is selected."
   },
   {
      id: "petitioner_telephone",
      required: true,
      validate: isPhoneLike,
      message: "Enter a valid daytime telephone number."
   },
   {
      id: "petitioner_mobile",
      required: false,
      validate: value => value.trim() === "" || isPhoneLike(value),
      message: "Enter a valid mobile telephone number, or leave it blank."
   },
   {
      id: "petitioner_email",
      required: false,
      validate: value => value.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
      message: "Enter a valid email address, or leave it blank."
   },
   {
      id: "petitioner_sign",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "petitioner_sign_date",
      required: false,
      validate: () => true,
      message: ""
   }
];
