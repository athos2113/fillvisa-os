function setFieldState(id, isValid, shouldMark = true) {
  const el = document.getElementById(id);
  if (!el) return;

  el.classList.remove("is-valid", "is-invalid");
  if (!shouldMark) return;

  el.classList.add(isValid ? "is-valid" : "is-invalid");
}

function isUnitedStatesMailingCountry() {
  const value = document.getElementById("mailing_country")?.value.trim().toLowerCase() || "";
  return value === "" || ["us", "u.s.", "u.s.a.", "usa", "united states", "united states of america"].includes(value);
}

function validatePersonOrOrganization() {
  const last = document.getElementById("last_name").value.trim();
  const first = document.getElementById("first_name").value.trim();
  const company = document.getElementById("company_name").value.trim();
  const individualComplete = last !== "" && first !== "";
  const companyComplete = company !== "";
  const isValid = individualComplete || companyComplete;

  setFieldState("last_name", isValid, !companyComplete || last !== "");
  setFieldState("first_name", isValid, !companyComplete || first !== "");
  setFieldState("company_name", isValid, company !== "" || !individualComplete);

  return isValid;
}

function validateRadioPair(yesId, noId) {
  const yes = document.getElementById(yesId);
  const no = document.getElementById(noId);
  const isValid = yes.checked || no.checked;

  [yes, no].forEach(el => {
    el.classList.remove("is-valid", "is-invalid");
    el.classList.add(isValid ? "is-valid" : "is-invalid");
  });

  return isValid;
}

const fields = [

  {
    id: "last_name",
    required: true,
    skipDefaultState: true,
    validate: validatePersonOrOrganization,
    message: "Please enter either the individual's family and given name, or the company/organization name."
  },

  {
    id: "middle_name",
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
    required: false,
    validate: () => true,
    message: ""
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
    condition: isUnitedStatesMailingCountry,
    validate: v => v.trim() !== "",
    message: "State is required for a U.S. mailing address."
  },

  {
    id: "mailing_zip",
    required: true,
    condition: isUnitedStatesMailingCountry,
    validate: v => /^[0-9]{5}(-[0-9]{4})?$/.test(v.trim()),
    message: "Please enter a valid ZIP Code (##### or #####-####)."
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
    id: "ein",
    required: false,
    validate: v => {
      const company = document.getElementById("company_name").value.trim();
      const ein = v.trim();
      if (company !== "") return /^[0-9]{9}$/.test(ein);
      return ein === "" || /^[0-9]{9}$/.test(ein);
    },
    message: "Enter a valid 9-digit EIN. EIN is required when a company or organization is filing."
  },

  {
    id: "nonprofit_yes",
    required: true,
    validate: () => validateRadioPair("nonprofit_yes", "nonprofit_no"),
    message: "Please answer whether the petitioner is a nonprofit or governmental research organization."
  },

  {
    id: "employ25_yes",
    required: true,
    validate: () => validateRadioPair("employ25_yes", "employ25_no"),
    message: "Please answer whether the petitioner employs 25 or fewer full-time equivalent employees in the United States."
  },

  {
    id: "ssn_number",
    required: false,
    validate: v => v.trim() === "" || /^[0-9]{9}$/.test(v.trim()),
    message: "Please enter a valid 9-digit SSN or leave it blank."
  },

  {
    id: "uscis_number",
    required: false,
    validate: v => v.trim() === "" || /^[0-9]{1,12}$/.test(v.trim()),
    message: "Please enter a valid USCIS Online Account Number, up to 12 digits, or leave it blank."
  }

];
