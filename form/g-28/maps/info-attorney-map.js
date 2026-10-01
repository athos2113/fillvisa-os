function setFieldState(id, isValid, shouldMark = true) {
  const el = document.getElementById(id);
  if (!el) return;

  el.classList.remove("is-valid", "is-invalid");
  if (!shouldMark) return;

  el.classList.add(isValid ? "is-valid" : "is-invalid");
}

function isUnitedStatesAttorneyCountry() {
  const value = document.getElementById("attorney_country")?.value.trim().toLowerCase() || "";
  return value === "" || ["us", "u.s.", "u.s.a.", "usa", "united states", "united states of america"].includes(value);
}

function isAttorneyUnitSelected() {
  return ["attorney_apt", "attorney_ste", "attorney_flr"].some(id => document.getElementById(id)?.checked);
}

function isPhoneLike(value) {
  const normalized = value.replace(/[^\d]/g, "");
  return normalized.length >= 7 && normalized.length <= 15;
}

const fields = [
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
    id: "attorney_street",
    required: true,
    validate: v => v.trim() !== "",
    message: "Street number and name is required."
  },
  {
    id: "attorney_apt",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "attorney_ste",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "attorney_flr",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "attorney_number",
    required: true,
    condition: isAttorneyUnitSelected,
    validate: v => v.trim() !== "",
    message: "Unit number is required when Apt., Ste., or Flr. is selected."
  },
  {
    id: "attorney_city",
    required: true,
    validate: v => v.trim() !== "",
    message: "City or town is required."
  },
  {
    id: "attorney_state",
    required: true,
    condition: isUnitedStatesAttorneyCountry,
    validate: v => v.trim() !== "",
    message: "State is required for a U.S. address."
  },
  {
    id: "attorney_zip",
    required: true,
    condition: isUnitedStatesAttorneyCountry,
    validate: v => /^[0-9]{5}(-[0-9]{4})?$/.test(v.trim()),
    message: "Enter a valid ZIP Code (##### or #####-####)."
  },
  {
    id: "attorney_province",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "attorney_postal",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "attorney_country",
    required: true,
    validate: v => v.trim() !== "",
    message: "Country is required."
  },
  {
    id: "attorney_telephone",
    required: true,
    validate: isPhoneLike,
    message: "Enter a valid daytime telephone number."
  },
  {
    id: "attorney_mobile",
    required: false,
    validate: v => v.trim() === "" || isPhoneLike(v),
    message: "Enter a valid mobile telephone number, or leave it blank."
  },
  {
    id: "attorney_email",
    required: false,
    validate: v => v.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    message: "Enter a valid email address, or leave it blank."
  },
  {
    id: "attorney_fax",
    required: false,
    validate: v => v.trim() === "" || isPhoneLike(v),
    message: "Enter a valid fax number, or leave it blank."
  }
];
