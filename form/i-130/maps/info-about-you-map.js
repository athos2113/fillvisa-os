const sexIds = ["sex_male", "sex_female"];
const mailingUnitIds = ["mailing_apt", "mailing_ste", "mailing_flr"];
const samePhysicalIds = ["same_physical_yes", "same_physical_no"];
const physical1UnitIds = ["physical_1_apt", "physical_1_ste", "physical_1_flr"];
const physical2UnitIds = ["physical_2_apt", "physical_2_ste", "physical_2_flr"];
const maritalStatusIds = [
   "marital_status_single",
   "marital_status_married",
   "marital_status_divorced",
   "marital_status_widowed",
   "marital_status_seperated",
   "marital_status_annulled"
];
const parent1SexIds = ["parent_1_male", "parent_1_female"];
const parent2SexIds = ["parent_2_male", "parent_2_female"];
const citizenshipStatusIds = ["citizenship_usa", "citizenship_permanent"];
const citizenshipAcquiredIds = ["citizenship_birth", "citizenship_naturalization", "citizenship_parent"];
const citizenshipCertificateIds = ["citizenship_certificate_yes", "citizenship_certificate_no"];
const residentMarriageIds = ["resident_marriage_yes", "resident_marriage_no"];
const employer1UnitIds = ["employer_1_apt", "employer_1_ste", "employer_1_flr"];
const employer2UnitIds = ["employer_2_apt", "employer_2_ste", "employer_2_flr"];

const physical2DataIds = [
   "physical_2_street",
   "physical_2_number",
   "physical_2_city",
   "physical_2_state",
   "physical_2_zip",
   "physical_2_province",
   "physical_2_postal",
   "physical_2_country",
   "physical_2_date_from",
   "physical_2_date_to"
];

const spouse2DataIds = [
   "spouse_2_lastname",
   "spouse_2_firstname",
   "spouse_2_middlename",
   "spouse_2_date"
];

const employer2DataIds = [
   "employer_2_name",
   "employer_2_street",
   "employer_2_number",
   "employer_2_city",
   "employer_2_state",
   "employer_2_zip",
   "employer_2_province",
   "employer_2_postal",
   "employer_2_country",
   "employer_2_occupation",
   "employer_2_date_from",
   "employer_2_date_to"
];

function isChecked(id) {
   return !!document.getElementById(id)?.checked;
}

function hasValue(id) {
   return (document.getElementById(id)?.value.trim() || "") !== "";
}

function setGroupState(ids, isValid) {
   ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;

      el.classList.toggle("is-valid", isValid);
      el.classList.toggle("is-invalid", !isValid);
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

function isPhysical1UnitedStates() {
   return isUnitedStates(document.getElementById("physical_1_country")?.value);
}

function isPhysical2UnitedStates() {
   return isUnitedStates(document.getElementById("physical_2_country")?.value);
}

function isCurrentMarriageUnitedStates() {
   return isUnitedStates(document.getElementById("current_marriage_country")?.value);
}

function isEmployer1UnitedStates() {
   return isUnitedStates(document.getElementById("employer_1_country")?.value);
}

function isEmployer2UnitedStates() {
   return isUnitedStates(document.getElementById("employer_2_country")?.value);
}

function isMailingUnitSelected() {
   return mailingUnitIds.some(isChecked);
}

function isPhysicalHistoryRequired() {
   return isChecked("same_physical_no");
}

function isPhysicalHistoryAnswered() {
   return samePhysicalIds.some(isChecked);
}

function isPhysical1UnitSelected() {
   return isPhysicalHistoryRequired() && physical1UnitIds.some(isChecked);
}

function hasPhysical2Data() {
   return isPhysicalHistoryAnswered() &&
      (physical2DataIds.some(hasValue) || physical2UnitIds.some(isChecked));
}

function isPhysical2UnitSelected() {
   return hasPhysical2Data() && physical2UnitIds.some(isChecked);
}

function maritalNumberValue() {
   const value = document.getElementById("marital_number")?.value.trim();
   if (!value || !/^[0-9]+$/.test(value)) return 0;
   return Number.parseInt(value, 10);
}

function isCurrentlyMarried() {
   return isChecked("marital_status_married");
}

function hasEverBeenMarried() {
   const marriedStatusSelected = [
      "marital_status_married",
      "marital_status_divorced",
      "marital_status_widowed",
      "marital_status_seperated",
      "marital_status_annulled"
   ].some(isChecked);

   return maritalNumberValue() > 0 || marriedStatusSelected;
}

function isSpouse1EndedDateRequired() {
   return hasEverBeenMarried() && !isCurrentlyMarried();
}

function hasSpouse2Data() {
   return maritalNumberValue() >= 2 || spouse2DataIds.some(hasValue);
}

function isUsCitizen() {
   return isChecked("citizenship_usa");
}

function isPermanentResident() {
   return isChecked("citizenship_permanent");
}

function hasCitizenshipCertificate() {
   return isUsCitizen() && isChecked("citizenship_certificate_yes");
}

function isUnemployed() {
   return isChecked("unemployed");
}

function isEmploymentHistoryRequired() {
   return !isUnemployed();
}

function isEmployer1UnitSelected() {
   return isEmploymentHistoryRequired() && employer1UnitIds.some(isChecked);
}

function hasEmployer2Data() {
   return isEmploymentHistoryRequired() &&
      (employer2DataIds.some(hasValue) || employer2UnitIds.some(isChecked));
}

function isEmployer2UnitSelected() {
   return hasEmployer2Data() && employer2UnitIds.some(isChecked);
}

function isValidZip(value) {
   return /^[0-9]{5}(-[0-9]{4})?$/.test(value.trim());
}

function isNotFutureDate(value) {
   if (!value) return false;

   const parsed = new Date(`${value}T00:00:00`);
   if (Number.isNaN(parsed.getTime())) return false;

   const today = new Date();
   today.setHours(0, 0, 0, 0);
   return parsed <= today;
}

function isPhysical2DateRangeValid() {
   const from = document.getElementById("physical_2_date_from")?.value;
   const to = document.getElementById("physical_2_date_to")?.value;
   if (!from || !to) return true;
   return new Date(`${from}T00:00:00`) <= new Date(`${to}T00:00:00`);
}

function isEmployer2DateRangeValid() {
   const from = document.getElementById("employer_2_date_from")?.value;
   const to = document.getElementById("employer_2_date_to")?.value;
   if (!from || !to) return true;
   return new Date(`${from}T00:00:00`) <= new Date(`${to}T00:00:00`);
}

const fields = [
   {
      id: "a_number",
      required: false,
      validate: value => value.trim() === "" || /^[0-9]{1,9}$/.test(value.trim()),
      message: "Enter a valid A-Number, up to 9 digits, or leave it blank."
   },
   {
      id: "uscis_number",
      required: false,
      validate: value => value.trim() === "" || /^[0-9]{1,12}$/.test(value.trim()),
      message: "Enter a valid USCIS Online Account Number, up to 12 digits, or leave it blank."
   },
   {
      id: "ssn_number",
      required: false,
      validate: value => value.trim() === "" || /^[0-9]{9}$/.test(value.trim()),
      message: "Enter a valid 9-digit Social Security number, or leave it blank."
   },
   {
      id: "lastname",
      required: true,
      validate: value => value.trim() !== "",
      message: "Family name is required."
   },
   {
      id: "firstname",
      required: true,
      validate: value => value.trim() !== "",
      message: "Given name is required."
   },
   {
      id: "middlename",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "other_lastname",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "other_firstname",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "other_middlename",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "city_birth",
      required: true,
      validate: value => value.trim() !== "",
      message: "City, town, or village of birth is required."
   },
   {
      id: "country_birth",
      required: true,
      validate: value => value.trim() !== "",
      message: "Country of birth is required."
   },
   {
      id: "dob",
      required: true,
      validate: isNotFutureDate,
      message: "Enter a valid date of birth."
   },
   {
      id: "sex_male",
      required: true,
      validate: () => validateRadioGroup(sexIds),
      message: "Select sex."
   },
   {
      id: "sex_female",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "mailing_incare",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "mailing_street",
      required: true,
      validate: value => value.trim() !== "",
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
      validate: value => value.trim() !== "",
      message: "Unit number is required when Apt., Ste., or Flr. is selected."
   },
   {
      id: "mailing_city",
      required: true,
      validate: value => value.trim() !== "",
      message: "Mailing city or town is required."
   },
   {
      id: "mailing_state",
      required: true,
      condition: isMailingUnitedStates,
      validate: value => value.trim() !== "",
      message: "State is required for a U.S. mailing address."
   },
   {
      id: "mailing_zip",
      required: true,
      condition: isMailingUnitedStates,
      validate: isValidZip,
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
      id: "mailing_country",
      required: true,
      validate: value => value.trim() !== "",
      message: "Mailing country is required."
   },
   {
      id: "same_physical_yes",
      required: true,
      validate: () => validateRadioGroup(samePhysicalIds),
      message: "Select whether your mailing address is the same as your physical address."
   },
   {
      id: "same_physical_no",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "physical_1_street",
      required: true,
      condition: isPhysicalHistoryRequired,
      validate: value => value.trim() !== "",
      message: "Physical Address 1 street is required when the physical address is different."
   },
   {
      id: "physical_1_apt",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "physical_1_ste",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "physical_1_flr",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "physical_1_number",
      required: true,
      condition: isPhysical1UnitSelected,
      validate: value => value.trim() !== "",
      message: "Unit number is required when Apt., Ste., or Flr. is selected."
   },
   {
      id: "physical_1_city",
      required: true,
      condition: isPhysicalHistoryRequired,
      validate: value => value.trim() !== "",
      message: "Physical Address 1 city or town is required."
   },
   {
      id: "physical_1_state",
      required: true,
      condition: () => isPhysicalHistoryRequired() && isPhysical1UnitedStates(),
      validate: value => value.trim() !== "",
      message: "State is required for a U.S. physical address."
   },
   {
      id: "physical_1_zip",
      required: true,
      condition: () => isPhysicalHistoryRequired() && isPhysical1UnitedStates(),
      validate: isValidZip,
      message: "Enter a valid ZIP Code (##### or #####-####)."
   },
   {
      id: "physical_1_province",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "physical_1_postal",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "physical_1_country",
      required: true,
      condition: isPhysicalHistoryRequired,
      validate: value => value.trim() !== "",
      message: "Physical Address 1 country is required."
   },
   {
      id: "physical_1_date_from",
      required: true,
      condition: isPhysicalHistoryAnswered,
      validate: isNotFutureDate,
      message: "Enter a valid Date From for Physical Address 1."
   },
   {
      id: "physical_1_date_to",
      required: false,
      validate: value => value.trim() === "" || value.trim().toUpperCase() === "PRESENT",
      message: ""
   },
   {
      id: "physical_2_street",
      required: true,
      condition: hasPhysical2Data,
      validate: value => value.trim() !== "",
      message: "Physical Address 2 street is required when this address is provided."
   },
   {
      id: "physical_2_apt",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "physical_2_ste",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "physical_2_flr",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "physical_2_number",
      required: true,
      condition: isPhysical2UnitSelected,
      validate: value => value.trim() !== "",
      message: "Unit number is required when Apt., Ste., or Flr. is selected."
   },
   {
      id: "physical_2_city",
      required: true,
      condition: hasPhysical2Data,
      validate: value => value.trim() !== "",
      message: "Physical Address 2 city or town is required when this address is provided."
   },
   {
      id: "physical_2_state",
      required: true,
      condition: () => hasPhysical2Data() && isPhysical2UnitedStates(),
      validate: value => value.trim() !== "",
      message: "State is required for a U.S. physical address."
   },
   {
      id: "physical_2_zip",
      required: true,
      condition: () => hasPhysical2Data() && isPhysical2UnitedStates(),
      validate: isValidZip,
      message: "Enter a valid ZIP Code (##### or #####-####)."
   },
   {
      id: "physical_2_province",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "physical_2_postal",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "physical_2_country",
      required: true,
      condition: hasPhysical2Data,
      validate: value => value.trim() !== "",
      message: "Physical Address 2 country is required when this address is provided."
   },
   {
      id: "physical_2_date_from",
      required: true,
      condition: hasPhysical2Data,
      validate: value => isNotFutureDate(value) && isPhysical2DateRangeValid(),
      message: "Enter a valid Date From for Physical Address 2."
   },
   {
      id: "physical_2_date_to",
      required: true,
      condition: hasPhysical2Data,
      validate: value => isNotFutureDate(value) && isPhysical2DateRangeValid(),
      message: "Enter a valid Date To for Physical Address 2."
   },
   {
      id: "marital_number",
      required: true,
      validate: value => /^[0-9]{1,2}$/.test(value.trim()),
      message: "Enter the number of times you have been married."
   },
   {
      id: "marital_status_single",
      required: true,
      validate: () => validateRadioGroup(maritalStatusIds),
      message: "Select your current marital status."
   },
   {
      id: "marital_status_married",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "marital_status_divorced",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "marital_status_widowed",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "marital_status_seperated",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "marital_status_annulled",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "current_marriage_date",
      required: true,
      condition: isCurrentlyMarried,
      validate: isNotFutureDate,
      message: "Enter a valid current marriage date."
   },
   {
      id: "current_marriage_city",
      required: true,
      condition: isCurrentlyMarried,
      validate: value => value.trim() !== "",
      message: "City or town of current marriage is required."
   },
   {
      id: "current_marriage_state",
      required: true,
      condition: () => isCurrentlyMarried() && isCurrentMarriageUnitedStates(),
      validate: value => value.trim() !== "",
      message: "State is required for a U.S. marriage location."
   },
   {
      id: "current_marriage_province",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "current_marriage_country",
      required: true,
      condition: isCurrentlyMarried,
      validate: value => value.trim() !== "",
      message: "Country of current marriage is required."
   },
   {
      id: "spouse_1_lastname",
      required: true,
      condition: hasEverBeenMarried,
      validate: value => value.trim() !== "",
      message: "Spouse 1 family name is required."
   },
   {
      id: "spouse_1_firstname",
      required: true,
      condition: hasEverBeenMarried,
      validate: value => value.trim() !== "",
      message: "Spouse 1 given name is required."
   },
   {
      id: "spouse_1_middlename",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "spouse_1_date",
      required: true,
      condition: isSpouse1EndedDateRequired,
      validate: isNotFutureDate,
      message: "Enter the date this marriage ended."
   },
   {
      id: "spouse_2_lastname",
      required: true,
      condition: hasSpouse2Data,
      validate: value => value.trim() !== "",
      message: "Spouse 2 family name is required when Spouse 2 is provided."
   },
   {
      id: "spouse_2_firstname",
      required: true,
      condition: hasSpouse2Data,
      validate: value => value.trim() !== "",
      message: "Spouse 2 given name is required when Spouse 2 is provided."
   },
   {
      id: "spouse_2_middlename",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "spouse_2_date",
      required: true,
      condition: hasSpouse2Data,
      validate: isNotFutureDate,
      message: "Enter the date this marriage ended."
   },
   {
      id: "parent_1_lastname",
      required: true,
      validate: value => value.trim() !== "",
      message: "Parent 1 family name is required."
   },
   {
      id: "parent_1_firstname",
      required: true,
      validate: value => value.trim() !== "",
      message: "Parent 1 given name is required."
   },
   {
      id: "parent_1_middlename",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "parent_1_date",
      required: true,
      validate: isNotFutureDate,
      message: "Enter Parent 1's date of birth."
   },
   {
      id: "parent_1_male",
      required: true,
      validate: () => validateRadioGroup(parent1SexIds),
      message: "Select Parent 1's sex."
   },
   {
      id: "parent_1_female",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "parent_1_country",
      required: true,
      validate: value => value.trim() !== "",
      message: "Parent 1 country of birth is required."
   },
   {
      id: "parent_1_city",
      required: true,
      validate: value => value.trim() !== "",
      message: "Parent 1 city, town, or village of residence is required."
   },
   {
      id: "parent_1_residence",
      required: true,
      validate: value => value.trim() !== "",
      message: "Parent 1 country of residence is required."
   },
   {
      id: "parent_2_lastname",
      required: true,
      validate: value => value.trim() !== "",
      message: "Parent 2 family name is required."
   },
   {
      id: "parent_2_firstname",
      required: true,
      validate: value => value.trim() !== "",
      message: "Parent 2 given name is required."
   },
   {
      id: "parent_2_middlename",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "parent_2_date",
      required: true,
      validate: isNotFutureDate,
      message: "Enter Parent 2's date of birth."
   },
   {
      id: "parent_2_male",
      required: true,
      validate: () => validateRadioGroup(parent2SexIds),
      message: "Select Parent 2's sex."
   },
   {
      id: "parent_2_female",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "parent_2_country",
      required: true,
      validate: value => value.trim() !== "",
      message: "Parent 2 country of birth is required."
   },
   {
      id: "parent_2_city",
      required: true,
      validate: value => value.trim() !== "",
      message: "Parent 2 city, town, or village of residence is required."
   },
   {
      id: "parent_2_residence",
      required: true,
      validate: value => value.trim() !== "",
      message: "Parent 2 country of residence is required."
   },
   {
      id: "citizenship_usa",
      required: true,
      validate: () => validateRadioGroup(citizenshipStatusIds),
      message: "Select whether you are a U.S. citizen or lawful permanent resident."
   },
   {
      id: "citizenship_permanent",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "citizenship_birth",
      required: true,
      condition: isUsCitizen,
      validate: () => validateRadioGroup(citizenshipAcquiredIds),
      message: "Select how your U.S. citizenship was acquired."
   },
   {
      id: "citizenship_naturalization",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "citizenship_parent",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "citizenship_certificate_yes",
      required: true,
      condition: isUsCitizen,
      validate: () => validateRadioGroup(citizenshipCertificateIds),
      message: "Select whether you obtained a Certificate of Naturalization or Certificate of Citizenship."
   },
   {
      id: "citizenship_certificate_no",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "citizenship_certificate_number",
      required: true,
      condition: hasCitizenshipCertificate,
      validate: value => value.trim() !== "",
      message: "Certificate number is required."
   },
   {
      id: "citizenship_certificate_place",
      required: true,
      condition: hasCitizenshipCertificate,
      validate: value => value.trim() !== "",
      message: "Place of issuance is required."
   },
   {
      id: "citizenship_certificate_date",
      required: true,
      condition: hasCitizenshipCertificate,
      validate: isNotFutureDate,
      message: "Enter a valid certificate date of issuance."
   },
   {
      id: "class_admission",
      required: true,
      condition: isPermanentResident,
      validate: value => value.trim() !== "",
      message: "Class of admission is required."
   },
   {
      id: "date_admission",
      required: true,
      condition: isPermanentResident,
      validate: isNotFutureDate,
      message: "Enter a valid date of admission."
   },
   {
      id: "city_admission",
      required: true,
      condition: isPermanentResident,
      validate: value => value.trim() !== "",
      message: "City or town of admission is required."
   },
   {
      id: "state_admission",
      required: true,
      condition: isPermanentResident,
      validate: value => value.trim() !== "",
      message: "State of admission is required."
   },
   {
      id: "resident_marriage_yes",
      required: true,
      condition: isPermanentResident,
      validate: () => validateRadioGroup(residentMarriageIds),
      message: "Select whether you gained lawful permanent resident status through marriage."
   },
   {
      id: "resident_marriage_no",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "unemployed",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "employer_1_name",
      required: true,
      condition: isEmploymentHistoryRequired,
      validate: value => value.trim() !== "",
      message: "Employer 1 name is required unless you are unemployed."
   },
   {
      id: "employer_1_street",
      required: true,
      condition: isEmploymentHistoryRequired,
      validate: value => value.trim() !== "",
      message: "Employer 1 street number and name is required."
   },
   {
      id: "employer_1_apt",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "employer_1_ste",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "employer_1_flr",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "employer_1_number",
      required: true,
      condition: isEmployer1UnitSelected,
      validate: value => value.trim() !== "",
      message: "Unit number is required when Apt., Ste., or Flr. is selected."
   },
   {
      id: "employer_1_city",
      required: true,
      condition: isEmploymentHistoryRequired,
      validate: value => value.trim() !== "",
      message: "Employer 1 city or town is required."
   },
   {
      id: "employer_1_state",
      required: true,
      condition: () => isEmploymentHistoryRequired() && isEmployer1UnitedStates(),
      validate: value => value.trim() !== "",
      message: "State is required for a U.S. employer address."
   },
   {
      id: "employer_1_zip",
      required: true,
      condition: () => isEmploymentHistoryRequired() && isEmployer1UnitedStates(),
      validate: isValidZip,
      message: "Enter a valid ZIP Code (##### or #####-####)."
   },
   {
      id: "employer_1_province",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "employer_1_postal",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "employer_1_country",
      required: true,
      condition: isEmploymentHistoryRequired,
      validate: value => value.trim() !== "",
      message: "Employer 1 country is required."
   },
   {
      id: "employer_1_occupation",
      required: true,
      condition: isEmploymentHistoryRequired,
      validate: value => value.trim() !== "",
      message: "Employer 1 occupation is required."
   },
   {
      id: "employer_1_date_from",
      required: true,
      condition: isEmploymentHistoryRequired,
      validate: isNotFutureDate,
      message: "Enter a valid Date From for Employer 1."
   },
   {
      id: "employer_1_date_to",
      required: false,
      validate: value => value.trim() === "" || value.trim().toUpperCase() === "PRESENT",
      message: ""
   },
   {
      id: "employer_2_name",
      required: true,
      condition: hasEmployer2Data,
      validate: value => value.trim() !== "",
      message: "Employer 2 name is required when Employer 2 is provided."
   },
   {
      id: "employer_2_street",
      required: true,
      condition: hasEmployer2Data,
      validate: value => value.trim() !== "",
      message: "Employer 2 street number and name is required when Employer 2 is provided."
   },
   {
      id: "employer_2_apt",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "employer_2_ste",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "employer_2_flr",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "employer_2_number",
      required: true,
      condition: isEmployer2UnitSelected,
      validate: value => value.trim() !== "",
      message: "Unit number is required when Apt., Ste., or Flr. is selected."
   },
   {
      id: "employer_2_city",
      required: true,
      condition: hasEmployer2Data,
      validate: value => value.trim() !== "",
      message: "Employer 2 city or town is required when Employer 2 is provided."
   },
   {
      id: "employer_2_state",
      required: true,
      condition: () => hasEmployer2Data() && isEmployer2UnitedStates(),
      validate: value => value.trim() !== "",
      message: "State is required for a U.S. employer address."
   },
   {
      id: "employer_2_zip",
      required: true,
      condition: () => hasEmployer2Data() && isEmployer2UnitedStates(),
      validate: isValidZip,
      message: "Enter a valid ZIP Code (##### or #####-####)."
   },
   {
      id: "employer_2_province",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "employer_2_postal",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "employer_2_country",
      required: true,
      condition: hasEmployer2Data,
      validate: value => value.trim() !== "",
      message: "Employer 2 country is required when Employer 2 is provided."
   },
   {
      id: "employer_2_occupation",
      required: true,
      condition: hasEmployer2Data,
      validate: value => value.trim() !== "",
      message: "Employer 2 occupation is required when Employer 2 is provided."
   },
   {
      id: "employer_2_date_from",
      required: true,
      condition: hasEmployer2Data,
      validate: value => isNotFutureDate(value) && isEmployer2DateRangeValid(),
      message: "Enter a valid Date From for Employer 2."
   },
   {
      id: "employer_2_date_to",
      required: true,
      condition: hasEmployer2Data,
      validate: value => isNotFutureDate(value) && isEmployer2DateRangeValid(),
      message: "Enter a valid Date To for Employer 2."
   }
];
