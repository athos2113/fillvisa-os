function setGroupState(ids, isValid) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    el.classList.remove("is-valid", "is-invalid");
    el.classList.add(isValid ? "is-valid" : "is-invalid");
  });
}

function validateRadioGroup(ids) {
  const isValid = ids.some(id => document.getElementById(id)?.checked);
  setGroupState(ids, isValid);
  return isValid;
}

function isUnitedStates(value) {
  const normalized = (value || "").trim().toLowerCase();
  return ["us", "u.s.", "u.s.a.", "usa", "united states", "united states of america"].includes(normalized);
}

function didProvideUSAddressInPart3() {
  try {
    const part3 = JSON.parse(localStorage.getItem("i140-3") || "{}");
    return isUnitedStates(part3.whom_country);
  } catch {
    return false;
  }
}

const foreignAddressIds = [
  "processing_foreign_street",
  "processing_foreign_number",
  "processing_foreign_city",
  "processing_foreign_province",
  "processing_foreign_postal",
  "processing_foreign_country"
];

function isForeignAddressActive() {
  return didProvideUSAddressInPart3() ||
    foreignAddressIds.some(id => document.getElementById(id)?.value.trim() !== "") ||
    document.getElementById("processing_foreign_apt")?.checked ||
    document.getElementById("processing_foreign_ste")?.checked ||
    document.getElementById("processing_foreign_flr")?.checked;
}

const processingTypeIds = [
  "processing_visa_abroad",
  "processing_adjustment_status"
];

const nativeAlphabetIds = [
  "native_alphabet_yes",
  "native_alphabet_no"
];

const filingOtherIds = [
  "filing_other_yes",
  "filing_other_no"
];

const filingOtherCheckboxIds = [
  "filing_other_485",
  "filing_other_131",
  "filing_other_765",
  "filing_other_other"
];

function validateFilingOtherCheckboxes() {
  const isValid = filingOtherCheckboxIds.some(id => document.getElementById(id)?.checked);
  setGroupState(filingOtherCheckboxIds, isValid);
  return isValid;
}

const fields = [

  {
    id: "processing_visa_abroad",
    required: true,
    validate: () => validateRadioGroup(processingTypeIds),
    message: "Please select whether the person will apply for a visa abroad or adjustment of status."
  },

  {
    id: "processing_city",
    required: true,
    condition: () => document.getElementById("processing_visa_abroad")?.checked,
    validate: v => v.trim() !== "",
    message: "City or town is required when applying for a visa abroad."
  },

  {
    id: "processing_country",
    required: true,
    condition: () => document.getElementById("processing_visa_abroad")?.checked,
    validate: v => v.trim() !== "",
    message: "Country is required when applying for a visa abroad."
  },

  {
    id: "processing_residence_country",
    required: true,
    condition: () => document.getElementById("processing_adjustment_status")?.checked,
    validate: v => v.trim() !== "",
    message: "Country of residence is required when adjustment of status is selected."
  },

  {
    id: "processing_foreign_street",
    required: true,
    condition: isForeignAddressActive,
    validate: v => v.trim() !== "",
    message: "Foreign street number and name is required."
  },

  {
    id: "processing_foreign_apt",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "processing_foreign_ste",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "processing_foreign_flr",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "processing_foreign_number",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "processing_foreign_city",
    required: true,
    condition: isForeignAddressActive,
    validate: v => v.trim() !== "",
    message: "Foreign city or town is required."
  },

  {
    id: "processing_foreign_province",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "processing_foreign_postal",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "processing_foreign_country",
    required: true,
    condition: isForeignAddressActive,
    validate: v => v.trim() !== "",
    message: "Foreign country is required."
  },

  {
    id: "native_alphabet_yes",
    required: true,
    validate: () => validateRadioGroup(nativeAlphabetIds),
    message: "Please answer whether the person's native alphabet is other than Roman letters."
  },

  {
    id: "processing_lastname",
    required: true,
    condition: () => document.getElementById("native_alphabet_yes")?.checked,
    validate: v => v.trim() !== "",
    message: "Family name in the native alphabet is required."
  },

  {
    id: "processing_firstname",
    required: true,
    condition: () => document.getElementById("native_alphabet_yes")?.checked,
    validate: v => v.trim() !== "",
    message: "Given name in the native alphabet is required."
  },

  {
    id: "processing_middlename",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "processing_mailing_incare_of_name",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "processing_mailing_street",
    required: true,
    condition: () => document.getElementById("native_alphabet_yes")?.checked,
    validate: v => v.trim() !== "",
    message: "Street number and name in the native alphabet is required."
  },

  {
    id: "processing_mailing_apt",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "processing_mailing_ste",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "processing_mailing_flr",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "processing_mailing_number",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "processing_mailing_city",
    required: true,
    condition: () => document.getElementById("native_alphabet_yes")?.checked,
    validate: v => v.trim() !== "",
    message: "City or town in the native alphabet is required."
  },

  {
    id: "processing_mailing_province",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "processing_mailing_postal",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "processing_mailing_country",
    required: true,
    condition: () => document.getElementById("native_alphabet_yes")?.checked,
    validate: v => v.trim() !== "",
    message: "Country in the native alphabet is required."
  },

  {
    id: "filing_other_yes",
    required: true,
    validate: () => validateRadioGroup(filingOtherIds),
    message: "Please answer whether you are filing other petitions or applications with this Form I-140."
  },

  {
    id: "filing_other_485",
    required: true,
    condition: () => document.getElementById("filing_other_yes")?.checked,
    validate: validateFilingOtherCheckboxes,
    message: "Please select at least one other petition or application."
  },

  {
    id: "filing_other_details",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "person_removal_yes",
    required: true,
    validate: () => validateRadioGroup(["person_removal_yes", "person_removal_no"]),
    message: "Please answer whether the person is in removal proceedings."
  },

  {
    id: "person_removal_details",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "visa_petition_yes",
    required: true,
    validate: () => validateRadioGroup(["visa_petition_yes", "visa_petition_no"]),
    message: "Please answer whether any immigrant visa petition has ever been filed by or on behalf of this person."
  },

  {
    id: "visa_petition_details",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "original_labor_yes",
    required: true,
    validate: () => validateRadioGroup(["original_labor_yes", "original_labor_no"]),
    message: "Please answer whether this petition is being filed without an original labor certification."
  },

  {
    id: "original_labor_details",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "dol_yes",
    required: true,
    validate: () => validateRadioGroup(["dol_yes", "dol_no"]),
    message: "Please answer whether you are requesting a duplicate labor certification from DOL."
  },

  {
    id: "dol_details",
    required: false,
    validate: () => true,
    message: ""
  }

];
