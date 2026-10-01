function setGroupState(ids, isValid) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    el.classList.remove("is-valid", "is-invalid");
    el.classList.add(isValid ? "is-valid" : "is-invalid");
  });
}

const petitionerTypeIds = [
  "petitioner_employer",
  "petitioner_self",
  "petitioner_other"
];

function validatePetitionerType() {
  const isValid = petitionerTypeIds.some(id => document.getElementById(id)?.checked);
  setGroupState(petitionerTypeIds, isValid);
  return isValid;
}

function isEmployerPetitioner() {
  return document.getElementById("petitioner_employer")?.checked;
}

function isIndividualPetitioner() {
  return document.getElementById("petitioner_self")?.checked ||
    document.getElementById("petitioner_other")?.checked;
}

function isOtherPetitioner() {
  return document.getElementById("petitioner_other")?.checked;
}

function isMoney(value) {
  return /^\$?\s*[0-9][0-9,]*(\.[0-9]{1,2})?$/.test(value.trim());
}

const fields = [

  {
    id: "petitioner_employer",
    required: true,
    validate: validatePetitionerType,
    message: "Please select the type of petitioner."
  },

  {
    id: "petitioner_other_explain",
    required: true,
    condition: isOtherPetitioner,
    validate: v => v.trim() !== "",
    message: "Please explain who is filing on behalf of the alien."
  },

  {
    id: "business_type",
    required: true,
    condition: isEmployerPetitioner,
    validate: v => v.trim() !== "",
    message: "Type of business is required."
  },

  {
    id: "business_date",
    required: true,
    condition: isEmployerPetitioner,
    validate: v => v.trim() !== "",
    message: "Date established is required."
  },

  {
    id: "business_number_employees",
    required: true,
    condition: isEmployerPetitioner,
    validate: v => /^[0-9]+$/.test(v.trim()),
    message: "Enter the current number of U.S. employees."
  },

  {
    id: "business_gross_income",
    required: true,
    condition: isEmployerPetitioner,
    validate: isMoney,
    message: "Enter a valid gross annual income."
  },

  {
    id: "business_net_income",
    required: true,
    condition: isEmployerPetitioner,
    validate: isMoney,
    message: "Enter a valid net annual income."
  },

  {
    id: "naics_code",
    required: true,
    condition: isEmployerPetitioner,
    validate: v => /^[0-9]{6}$/.test(v.trim()),
    message: "Enter a valid 6-digit NAICS code."
  },

  {
    id: "labor_certification_number",
    required: true,
    condition: isEmployerPetitioner,
    validate: v => v.trim() !== "",
    message: "Labor certification DOL case number is required."
  },

  {
    id: "labor_certification_filing_date",
    required: true,
    condition: isEmployerPetitioner,
    validate: v => v.trim() !== "",
    message: "Labor certification filing date is required."
  },

  {
    id: "labor_certification_expiration_date",
    required: true,
    condition: isEmployerPetitioner,
    validate: v => v.trim() !== "",
    message: "Labor certification expiration date is required."
  },

  {
    id: "occupation",
    required: true,
    condition: isIndividualPetitioner,
    validate: v => v.trim() !== "",
    message: "Occupation is required."
  },

  {
    id: "annual_income",
    required: true,
    condition: isIndividualPetitioner,
    validate: isMoney,
    message: "Enter a valid annual income."
  }

];
