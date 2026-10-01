function isUnitedStatesMailingCountry() {
  const value = document.getElementById("whom_country")?.value.trim().toLowerCase() || "";
  return value === "" || ["us", "u.s.", "u.s.a.", "usa", "united states", "united states of america"].includes(value);
}

const lastArrivalIds = [
  "last_arrival_date",
  "i94_arrival_number",
  "expirate_i94_date",
  "i94_status",
  "passport_number",
  "travel_document_number",
  "country_issuance_passport",
  "expirate_passport_date"
];

function isLastArrivalSectionActive() {
  return lastArrivalIds.some(id => document.getElementById(id)?.value.trim() !== "");
}

function validatePassportOrTravelDocument() {
  const passport = document.getElementById("passport_number");
  const travel = document.getElementById("travel_document_number");
  const isValid = passport.value.trim() !== "" || travel.value.trim() !== "";

  [passport, travel].forEach(el => {
    el.classList.remove("is-valid", "is-invalid");
    el.classList.add(isValid ? "is-valid" : "is-invalid");
  });

  return isValid;
}

const fields = [

  {
    id: "whom_last_name",
    required: true,
    validate: v => v.trim() !== "",
    message: "Family name is required."
  },

  {
    id: "whom_first_name",
    required: true,
    validate: v => v.trim() !== "",
    message: "Given name is required."
  },

  {
    id: "whom_middle_name",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "whom_mailing_incare_of_name",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "whom_mailing_street",
    required: true,
    validate: v => v.trim() !== "",
    message: "Mailing street number and name is required."
  },

  {
    id: "whom_mailing_apt",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "whom_mailing_ste",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "whom_mailing_flr",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "whom_mailing_number",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "whom_mailing_city",
    required: true,
    validate: v => v.trim() !== "",
    message: "Mailing city or town is required."
  },

  {
    id: "whom_mailing_state",
    required: true,
    condition: isUnitedStatesMailingCountry,
    validate: v => v.trim() !== "",
    message: "State is required for a U.S. mailing address."
  },

  {
    id: "whom_mailing_zip",
    required: true,
    condition: isUnitedStatesMailingCountry,
    validate: v => /^[0-9]{5}(-[0-9]{4})?$/.test(v.trim()),
    message: "Please enter a valid ZIP Code (##### or #####-####)."
  },

  {
    id: "whom_province",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "whom_postal",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "whom_country",
    required: true,
    validate: v => v.trim() !== "",
    message: "Mailing country is required."
  },

  {
    id: "whom_dob",
    required: true,
    validate: v => v.trim() !== "",
    message: "Date of birth is required."
  },

  {
    id: "whom_city",
    required: true,
    validate: v => v.trim() !== "",
    message: "City, town, or village of birth is required."
  },

  {
    id: "whom_state",
    required: true,
    validate: v => v.trim() !== "",
    message: "State or province of birth is required."
  },

  {
    id: "whom_country_birth",
    required: true,
    validate: v => v.trim() !== "",
    message: "Country of birth is required."
  },

  {
    id: "whom_country_citizenship",
    required: true,
    validate: v => v.trim() !== "",
    message: "Country of citizenship or nationality is required."
  },

  {
    id: "whom_a_number",
    required: false,
    validate: v => v.trim() === "" || /^[0-9]{1,9}$/.test(v.trim()),
    message: "Please enter a valid A-Number, up to 9 digits, or leave it blank."
  },

  {
    id: "whom_ssn",
    required: false,
    validate: v => v.trim() === "" || /^[0-9]{9}$/.test(v.trim()),
    message: "Please enter a valid 9-digit SSN or leave it blank."
  },

  {
    id: "last_arrival_date",
    required: true,
    condition: isLastArrivalSectionActive,
    validate: v => v.trim() !== "",
    message: "Date of last arrival is required when this section applies."
  },

  {
    id: "i94_arrival_number",
    required: true,
    condition: isLastArrivalSectionActive,
    validate: v => /^[A-Za-z0-9]{11}$/.test(v.trim()),
    message: "Please enter a valid 11-character I-94 arrival number."
  },

  {
    id: "expirate_i94_date",
    required: true,
    condition: isLastArrivalSectionActive,
    validate: v => v.trim() !== "",
    message: "I-94 expiration date is required when this section applies."
  },

  {
    id: "i94_status",
    required: true,
    condition: isLastArrivalSectionActive,
    validate: v => v.trim() !== "",
    message: "I-94 status is required when this section applies."
  },

  {
    id: "passport_number",
    required: true,
    skipDefaultState: true,
    condition: isLastArrivalSectionActive,
    validate: validatePassportOrTravelDocument,
    message: "Please enter either a passport number or a travel document number."
  },

  {
    id: "travel_document_number",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "country_issuance_passport",
    required: true,
    condition: isLastArrivalSectionActive,
    validate: v => v.trim() !== "",
    message: "Country of issuance is required when this section applies."
  },

  {
    id: "expirate_passport_date",
    required: true,
    condition: isLastArrivalSectionActive,
    validate: v => v.trim() !== "",
    message: "Passport or travel document expiration date is required when this section applies."
  }

];
