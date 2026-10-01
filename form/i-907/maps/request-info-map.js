const applicantUnitIds = ["applicant_apt", "applicant_ste", "applicant_flr"];

function isApplicantUnitSelected() {
  return applicantUnitIds.some(id => document.getElementById(id)?.checked);
}

function normalizeCountry(value) {
  return String(value || "").trim().toLowerCase();
}

function isUnitedStates(value) {
  const country = normalizeCountry(value);
  return country === "" || ["us", "u.s.", "u.s.a.", "usa", "united states", "united states of america"].includes(country);
}

function isApplicantUnitedStates() {
  return isUnitedStates(document.getElementById("applicant_country")?.value);
}

function normalizeDigits(value) {
  return String(value || "").replace(/\D/g, "");
}

const fields = [
  {
    id: "form_number",
    required: true,
    validate: v => v.trim() !== "",
    message: "Form number is required."
  },
  {
    id: "receipt_number",
    required: false,
    validate: v => v.trim() !== "",
    message: "Enter a valid 13-character receipt number, or leave it blank."
  },
  {
    id: "classification",
    required: true,
    validate: v => v.trim() !== "",
    message: "Classification or eligibility requested is required."
  },
  {
    id: "applicant_lastname",
    required: true,
    validate: v => v.trim() !== "",
    message: "Petitioner or applicant family name is required."
  },
  {
    id: "applicant_firstname",
    required: true,
    validate: v => v.trim() !== "",
    message: "Petitioner or applicant given name is required."
  },
  {
    id: "applicant_middlename",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "beneficiary_lastname",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "beneficiary_firstname",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "beneficiary_middlename",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "contact_lastname",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "contact_firstname",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "contact_middlename",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "postition_title",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "ein",
    required: false,
    validate: v => {
      const digits = normalizeDigits(v);
      return v.trim() === "" || digits.length === 9;
    },
    message: "Enter a valid 9-digit EIN, or leave it blank."
  },
  {
    id: "applicant_street",
    required: true,
    validate: v => v.trim() !== "",
    message: "Street number and name is required."
  },
  {
    id: "applicant_apt",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "applicant_ste",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "applicant_flr",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "applicant_number",
    required: true,
    condition: isApplicantUnitSelected,
    validate: v => v.trim() !== "",
    message: "Unit number is required when Apt., Ste., or Flr. is selected."
  },
  {
    id: "applicant_city",
    required: true,
    validate: v => v.trim() !== "",
    message: "City or town is required."
  },
  {
    id: "applicant_state",
    required: true,
    condition: isApplicantUnitedStates,
    validate: v => v.trim() !== "",
    message: "State is required for a U.S. address."
  },
  {
    id: "applicant_zip",
    required: true,
    condition: isApplicantUnitedStates,
    validate: v => /^[0-9]{5}(-[0-9]{4})?$/.test(v.trim()),
    message: "Enter a valid ZIP Code (##### or #####-####)."
  },
  {
    id: "applicant_province",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "applicant_postal",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "applicant_country",
    required: true,
    validate: v => v.trim() !== "",
    message: "Country is required."
  }
];
