const mailingUnitIds = ["mailing_apt", "mailing_ste", "mailing_flr"];
const mailingSameIds = ["mailing_same_yes", "mailing_same_no"];
const physicalUnitIds = ["physical_apt", "physical_ste", "physical_flr"];
const premiumRoleIds = [
  "premium_petitioner",
  "premium_represent",
  "premium_applicant",
  "premium_process"
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

function normalizeCountry(value) {
  return String(value || "").trim().toLowerCase();
}

function isUnitedStates(value) {
  const country = normalizeCountry(value);
  return country === "" || ["us", "u.s.", "u.s.a.", "usa", "united states", "united states of america"].includes(country);
}

function isMailingUnitedStates() {
  return isUnitedStates(document.getElementById("mailing_country")?.value);
}

function isPhysicalUnitedStates() {
  return isUnitedStates(document.getElementById("physical_country")?.value);
}

function isMailingUnitSelected() {
  return mailingUnitIds.some(isChecked);
}

function isPhysicalAddressRequired() {
  return isChecked("mailing_same_no");
}

function isPhysicalUnitSelected() {
  return isPhysicalAddressRequired() && physicalUnitIds.some(isChecked);
}

const fields = [
  {
    id: "a_number",
    required: false,
    validate: v => v.trim() === "" || /^[0-9]{1,9}$/.test(v.trim()),
    message: "Enter a valid A-Number, up to 9 digits, or leave it blank."
  },
  {
    id: "uscis_number",
    required: false,
    validate: v => v.trim() === "" || /^[0-9]{1,12}$/.test(v.trim()),
    message: "Enter a valid USCIS Online Account Number, up to 12 digits, or leave it blank."
  },
  {
    id: "last_name",
    required: true,
    validate: v => v.trim() !== "",
    message: "Family name is required."
  },
  {
    id: "first_name",
    required: true,
    validate: v => v.trim() !== "",
    message: "Given name is required."
  },
  {
    id: "middle_name",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "company_name",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "mailing_incare_of_name",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "mailing_street",
    required: true,
    validate: v => v.trim() !== "",
    message: "Mailing street number and name is required."
  },
  {
    id: "mailing_apt",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "mailing_ste",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "mailing_flr",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "mailing_number",
    required: true,
    condition: isMailingUnitSelected,
    validate: v => v.trim() !== "",
    message: "Mailing unit number is required when Apt., Ste., or Flr. is selected."
  },
  {
    id: "mailing_city",
    required: true,
    validate: v => v.trim() !== "",
    message: "Mailing city or town is required."
  },
  {
    id: "mailing_state",
    required: true,
    condition: isMailingUnitedStates,
    validate: v => v.trim() !== "",
    message: "State is required for a U.S. mailing address."
  },
  {
    id: "mailing_zip",
    required: true,
    condition: isMailingUnitedStates,
    validate: v => /^[0-9]{5}(-[0-9]{4})?$/.test(v.trim()),
    message: "Enter a valid mailing ZIP Code (##### or #####-####)."
  },
  {
    id: "mailing_province",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "mailing_postal",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "mailing_country",
    required: true,
    validate: v => v.trim() !== "",
    message: "Mailing country is required."
  },
  {
    id: "mailing_same_yes",
    required: true,
    validate: () => validateRadioGroup(mailingSameIds),
    message: "Select whether the mailing address is the same as the physical address."
  },
  {
    id: "mailing_same_no",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "physical_street",
    required: true,
    condition: isPhysicalAddressRequired,
    validate: v => v.trim() !== "",
    message: "Physical street number and name is required."
  },
  {
    id: "physical_apt",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "physical_ste",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "physical_flr",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "physical_number",
    required: true,
    condition: isPhysicalUnitSelected,
    validate: v => v.trim() !== "",
    message: "Physical unit number is required when Apt., Ste., or Flr. is selected."
  },
  {
    id: "physical_city",
    required: true,
    condition: isPhysicalAddressRequired,
    validate: v => v.trim() !== "",
    message: "Physical city or town is required."
  },
  {
    id: "physical_state",
    required: true,
    condition: () => isPhysicalAddressRequired() && isPhysicalUnitedStates(),
    validate: v => v.trim() !== "",
    message: "State is required for a U.S. physical address."
  },
  {
    id: "physical_zip",
    required: true,
    condition: () => isPhysicalAddressRequired() && isPhysicalUnitedStates(),
    validate: v => /^[0-9]{5}(-[0-9]{4})?$/.test(v.trim()),
    message: "Enter a valid physical ZIP Code (##### or #####-####)."
  },
  {
    id: "physical_province",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "physical_postal",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "physical_country",
    required: true,
    condition: isPhysicalAddressRequired,
    validate: v => v.trim() !== "",
    message: "Physical country is required."
  },
  {
    id: "premium_petitioner",
    required: true,
    validate: () => validateRadioGroup(premiumRoleIds),
    message: "Select one premium processing request role."
  },
  {
    id: "premium_represent",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "premium_applicant",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "premium_process",
    required: false,
    validate: () => true,
    message: ""
  }
];
