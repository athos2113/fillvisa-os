const bankHolderTypeIds = ["bank_holder_business", "bank_holder_personal"];
const bankAccountTypeIds = ["bank_account_checking", "bank_account_saving"];

function isChecked(id) {
  return !!document.getElementById(id)?.checked;
}

function setGroupState(ids, isValid) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    el.classList.remove("is-valid", "is-invalid");
    el.classList.add(isValid ? "is-valid" : "is-invalid");
  });
}

function validateRadioGroup(ids) {
  const isValid = ids.some(isChecked);
  setGroupState(ids, isValid);
  return isValid;
}

function isBusinessAccount() {
  return isChecked("bank_holder_business");
}

function isPersonalAccount() {
  return isChecked("bank_holder_personal");
}

function normalizeDigits(value) {
  return String(value || "").replace(/\D/g, "");
}

function normalizeMoney(value) {
  return String(value || "").replace(/[$,\s]/g, "");
}

const fields = [
  {
    id: "applicant_firstname",
    required: true,
    validate: v => v.trim() !== "",
    message: "Applicant, petitioner, or requester first name is required."
  },
  {
    id: "applicant_middlename",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "applicant_lastname",
    required: true,
    validate: v => v.trim() !== "",
    message: "Applicant, petitioner, or requester last name is required."
  },
  {
    id: "bank_holder_business",
    required: true,
    validate: () => validateRadioGroup(bankHolderTypeIds),
    message: "Select whether the bank account is a business or personal account."
  },
  {
    id: "bank_holder_personal",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "account_holder_firstname",
    required: true,
    condition: isPersonalAccount,
    validate: v => v.trim() !== "",
    message: "Account holder first name is required for a personal account."
  },
  {
    id: "account_holder_middilename",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "account_holder_lastname",
    required: true,
    condition: isPersonalAccount,
    validate: v => v.trim() !== "",
    message: "Account holder last name is required for a personal account."
  },
  {
    id: "account_holder_business",
    required: true,
    condition: isBusinessAccount,
    validate: v => v.trim() !== "",
    message: "Business name is required for a business account."
  },
  {
    id: "bank_account_checking",
    required: true,
    validate: () => validateRadioGroup(bankAccountTypeIds),
    message: "Select checking account or savings account."
  },
  {
    id: "bank_account_saving",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "bank_holder_amount",
    required: true,
    validate: v => Number(normalizeMoney(v)) > 0,
    message: "Authorized payment amount must be greater than 0."
  },
  {
    id: "bank_holder_routing",
    required: true,
    validate: v => normalizeDigits(v).length === 9,
    message: "Enter a valid 9-digit routing number."
  },
  {
    id: "bank_holder_account",
    required: true,
    validate: v => {
      const digits = normalizeDigits(v);
      return digits.length >= 4 && digits.length <= 17;
    },
    message: "Enter a valid bank account number."
  },
  {
    id: "bank_holder_bank",
    required: true,
    validate: v => v.trim() !== "",
    message: "Bank name is required."
  },
  {
    id: "sign",
    required: false,
    validate: () => true,
    message: ""
  }
];
