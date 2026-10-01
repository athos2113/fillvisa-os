const noticeAgencyIds = ["notice_uscis", "notice_ice", "notice_cbp"];
const appearanceRoleIds = [
  "appearance_applicant",
  "appearance_petitioner",
  "appearance_requestor",
  "appearance_beneficiary",
  "appearance_respondent"
];

function setGroupState(ids, isValid) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    el.classList.remove("is-valid", "is-invalid");
    el.classList.add(isValid ? "is-valid" : "is-invalid");
  });
}

function isChecked(id) {
  return !!document.getElementById(id)?.checked;
}

function validateRadioGroup(ids) {
  const isValid = ids.some(isChecked);
  setGroupState(ids, isValid);
  return isValid;
}

function hasCompleteClientName() {
  const last = document.getElementById("client_lastname")?.value.trim() || "";
  const first = document.getElementById("client_firstname")?.value.trim() || "";
  return last !== "" && first !== "";
}

function hasClientEntity() {
  return (document.getElementById("client_entity")?.value.trim() || "") !== "";
}

function isUnitedStatesCountry() {
  const value = document.getElementById("country")?.value.trim().toLowerCase() || "";
  return value === "" || ["us", "u.s.", "u.s.a.", "usa", "united states", "united states of america"].includes(value);
}

function isMailingUnitSelected() {
  return ["mailing_apt", "mailing_ste", "mailing_flr"].some(isChecked);
}

function isPhoneLike(value) {
  const normalized = value.replace(/[^\d]/g, "");
  return normalized.length >= 7 && normalized.length <= 15;
}

const fields = [
  {
    id: "notice_uscis",
    required: true,
    validate: () => validateRadioGroup(noticeAgencyIds),
    message: "Select the immigration agency this appearance relates to."
  },
  {
    id: "notice_uscis_number",
    required: true,
    condition: () => isChecked("notice_uscis"),
    validate: v => v.trim() !== "",
    message: "List the USCIS form numbers or specific matter when USCIS is selected."
  },
  {
    id: "notice_ice",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "notice_ice_matter",
    required: true,
    condition: () => isChecked("notice_ice"),
    validate: v => v.trim() !== "",
    message: "List the specific matter when ICE is selected."
  },
  {
    id: "notice_cbp",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "notice_cbp_matter",
    required: true,
    condition: () => isChecked("notice_cbp"),
    validate: v => v.trim() !== "",
    message: "List the specific matter when CBP is selected."
  },
  {
    id: "notice_receipt",
    required: false,
    validate: v => v.trim() === "" || /^[A-Za-z0-9]{13}$/.test(v.trim()),
    message: "Enter a 13-character receipt number, or leave it blank."
  },
  {
    id: "appearance_applicant",
    required: true,
    validate: () => validateRadioGroup(appearanceRoleIds),
    message: "Select the role represented by this appearance."
  },
  {
    id: "appearance_additional",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "client_lastname",
    required: true,
    condition: () => !hasClientEntity(),
    validate: v => v.trim() !== "",
    message: "Provide the client's family and given name, or provide an entity name."
  },
  {
    id: "client_firstname",
    required: true,
    condition: () => !hasClientEntity(),
    validate: v => v.trim() !== "",
    message: "Provide the client's family and given name, or provide an entity name."
  },
  {
    id: "client_middlename",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "client_entity",
    required: true,
    condition: () => !hasCompleteClientName(),
    validate: v => v.trim() !== "",
    message: "Provide an entity name, or provide the client's family and given name."
  },
  {
    id: "client_title",
    required: true,
    condition: hasClientEntity,
    validate: v => v.trim() !== "",
    message: "Title of authorized signatory is required when an entity name is provided."
  },
  {
    id: "client_uscis_number",
    required: false,
    validate: v => v.trim() === "" || /^[0-9]{1,12}$/.test(v.trim()),
    message: "Enter a valid USCIS Online Account Number, up to 12 digits, or leave it blank."
  },
  {
    id: "client_alien_number",
    required: false,
    validate: v => v.trim() === "" || /^[0-9]{9}$/.test(v.trim()),
    message: "Enter a valid 9-digit Alien Registration Number, or leave it blank."
  },
  {
    id: "client_telephone",
    required: true,
    validate: isPhoneLike,
    message: "Enter a valid daytime telephone number."
  },
  {
    id: "client_mobile",
    required: false,
    validate: v => v.trim() === "" || isPhoneLike(v),
    message: "Enter a valid mobile telephone number, or leave it blank."
  },
  {
    id: "client_email",
    required: false,
    validate: v => v.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    message: "Enter a valid email address, or leave it blank."
  },
  {
    id: "mailing_incare_of_name",
    required: true,
    validate: v => v.trim() !== "",
    message: "Street number and name is required."
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
    message: "Unit number is required when Apt., Ste., or Flr. is selected."
  },
  {
    id: "mailing_city",
    required: true,
    validate: v => v.trim() !== "",
    message: "City or town is required."
  },
  {
    id: "mailing_state",
    required: true,
    condition: isUnitedStatesCountry,
    validate: v => v.trim() !== "",
    message: "State is required for a U.S. mailing address."
  },
  {
    id: "mailing_zip",
    required: true,
    condition: isUnitedStatesCountry,
    validate: v => /^[0-9]{5}(-[0-9]{4})?$/.test(v.trim()),
    message: "Enter a valid ZIP Code (##### or #####-####)."
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
    id: "country",
    required: true,
    validate: v => v.trim() !== "",
    message: "Country is required."
  }
];
