const billingUnitIds = ["billing_apt", "billing_ste", "billing_flr"];
const creditTypeIds = [
  "credit_type_visa",
  "credit_type_master",
  "credit_type_american",
  "credit_type_discover"
];

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

function isBillingUnitSelected() {
  return billingUnitIds.some(isChecked);
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
    id: "firstname",
    required: true,
    validate: v => v.trim() !== "",
    message: "Applicant, petitioner, or requester first name is required."
  },
  {
    id: "middlename",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "lastname",
    required: true,
    validate: v => v.trim() !== "",
    message: "Applicant, petitioner, or requester last name is required."
  },
  {
    id: "credit_firstname",
    required: true,
    validate: v => v.trim() !== "",
    message: "Credit card holder first name is required."
  },
  {
    id: "credit_middlename",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "credit_lastname",
    required: true,
    validate: v => v.trim() !== "",
    message: "Credit card holder last name is required."
  },
  {
    id: "billing_street",
    required: true,
    validate: v => v.trim() !== "",
    message: "Billing street number and name is required."
  },
  {
    id: "billing_apt",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "billing_ste",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "billing_flr",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "billing_number",
    required: true,
    condition: isBillingUnitSelected,
    validate: v => v.trim() !== "",
    message: "Billing unit number is required when Apt., Ste., or Flr. is selected."
  },
  {
    id: "billing_city",
    required: true,
    validate: v => v.trim() !== "",
    message: "Billing city or town is required."
  },
  {
    id: "billing_state",
    required: true,
    validate: v => v.trim() !== "",
    message: "Billing state is required."
  },
  {
    id: "billing_zip",
    required: true,
    validate: v => /^[0-9]{5}(-[0-9]{4})?$/.test(v.trim()),
    message: "Enter a valid ZIP Code (##### or #####-####)."
  },
  {
    id: "sign",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "telephone",
    required: true,
    validate: isPhoneLike,
    message: "Enter a valid daytime telephone number."
  },
  {
    id: "email",
    required: true,
    validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    message: "Enter a valid email address."
  },
  {
    id: "credit_number",
    required: true,
    validate: v => {
      const digits = normalizeDigits(v);
      return digits.length >= 13 && digits.length <= 19;
    },
    message: "Enter a valid credit card number."
  },
  {
    id: "credit_expiration_date",
    required: true,
    validate: v => v.trim() !== "",
    message: "Credit card expiration date is required."
  },
  {
    id: "credit_cvv",
    required: true,
    validate: v => /^[0-9]{3,4}$/.test(v.trim()),
    message: "Enter a valid 3- or 4-digit CVV code."
  },
  {
    id: "credit_type_visa",
    required: true,
    validate: () => validateRadioGroup(creditTypeIds),
    message: "Select a credit card type."
  },
  {
    id: "credit_type_master",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "credit_type_american",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "credit_type_discover",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "payment_amount",
    required: true,
    validate: v => Number(v) > 0,
    message: "Authorized payment amount must be greater than 0."
  }
];
