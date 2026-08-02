const beneficiarySexIds = ["beneficiary_male", "beneficiary_female"];
const beneficiaryFiledIds = ["beneficiary_filed_yes", "beneficiary_filed_no", "beneficiary_filed_unknown"];
const beneficiaryPhysicalUnitIds = [
   "beneficiary_physical_apt",
   "beneficiary_physical_ste",
   "beneficiary_physical_flr"
];
const beneficiaryOtherUnitIds = [
   "beneficiary_other_apt",
   "beneficiary_other_ste",
   "beneficiary_other_flr"
];
const beneficiaryOutsideUnitIds = [
   "beneficiary_outside_apt",
   "beneficiary_outside_ste",
   "beneficiary_outside_flr"
];
const beneficiaryEntryIds = ["beneficiary_entry_yes", "beneficiary_entry_no"];
const beneficiaryCurrentlyUsaIds = ["beneficiary_currently_usa_yes", "beneficiary_currently_usa_no"];
const beneficiaryEntryDetailIds = [
   "beneficiary_class_admission",
   "beneficiary_i94",
   "beneficiary_arrival_date",
   "beneficiary_expire_date"
];
const beneficiaryEmploymentUnitIds = [
   "beneficiary_employment_apt",
   "beneficiary_employment_ste",
   "beneficiary_employment_flr"
];
const beneficiaryEmploymentDataIds = [
   "beneficiary_employment_name",
   "beneficiary_employment_street",
   "beneficiary_employment_number",
   "beneficiary_employment_city",
   "beneficiary_employment_state",
   "beneficiary_employment_zip",
   "beneficiary_employment_province",
   "beneficiary_employment_postal",
   "beneficiary_employment_country",
   "beneficiary_employment_date"
];
const beneficiaryProceedingIds = ["beneficiary_proceeding_yes", "beneficiary_proceeding_no"];
const beneficiaryProceedingTypeIds = [
   "beneficiary_proceeding_type_removal",
   "beneficiary_proceeding_type_exclusion",
   "beneficiary_proceeding_type_rescission",
   "beneficiary_proceeding_type_other"
];
const beneficiaryProceedingDataIds = [
   ...beneficiaryProceedingTypeIds,
   "beneficiary_proceeding_city",
   "beneficiary_proceeding_state",
   "beneficiary_proceeding_date"
];
const beneficiaryNativeUnitIds = [
   "beneficiary_native_apt",
   "beneficiary_native_ste",
   "beneficiary_native_flr"
];
const beneficiaryNativeDataIds = [
   "beneficiary_native_lastname",
   "beneficiary_native_firstname",
   "beneficiary_native_middlename",
   "beneficiary_native_street",
   "beneficiary_native_number",
   "beneficiary_native_city",
   "beneficiary_native_province",
   "beneficiary_native_postal",
   "beneficiary_native_country"
];
const beneficiaryLastUnitIds = [
   "beneficiary_last_apt",
   "beneficiary_last_ste",
   "beneficiary_last_flr"
];
const beneficiaryLastAddressDataIds = [
   "beneficiary_last_street",
   "beneficiary_last_number",
   "beneficiary_last_city",
   "beneficiary_last_state",
   "beneficiary_last_zip",
   "beneficiary_last_province",
   "beneficiary_last_postal",
   "beneficiary_last_country",
   "beneficiary_last_date_from",
   "beneficiary_last_date_to"
];
const beneficiaryProcessingIds = ["beneficiary_processing_usa", "beneficiary_processing_abroad"];
const beneficiaryUsaProcessingIds = ["beneficiary_usa_city", "beneficiary_usa_state"];
const beneficiaryAbroadProcessingIds = [
   "beneficiary_abroad_city",
   "beneficiary_abroad_province",
   "beneficiary_abroad_country"
];
const beneficiaryMarriageStatusIds = [
   "beneficiary_marriage_status_single",
   "beneficiary_marriage_status_married",
   "beneficiary_marriage_status_divorced",
   "beneficiary_marriage_status_widowed",
   "beneficiary_marriage_status_separated",
   "beneficiary_marriage_status_annulled"
];
const beneficiarySpouse2DataIds = [
   "beneficiary_marriage_spouse2_lastname",
   "beneficiary_marriage_spouse2_firstname",
   "beneficiary_marriage_spouse2_middlename",
   "beneficiary_marriage_spouse2_date"
];
const beneficiaryFamilyPersonFieldIds = Array.from({ length: 5 }, (_, index) => {
   const person = index + 1;
   return [
      `beneficiary_marriage_family${person}_lastname`,
      `beneficiary_marriage_family${person}_firstname`,
      `beneficiary_marriage_family${person}_middlename`,
      `beneficiary_marriage_family${person}_relationship`,
      `beneficiary_marriage_family${person}_dob`,
      `beneficiary_marriage_family${person}_country`
   ];
});

function isChecked(id) {
   return !!document.getElementById(id)?.checked;
}

function hasValue(id) {
   return (document.getElementById(id)?.value.trim() || "") !== "";
}

function hasAnyValue(ids) {
   return ids.some(hasValue);
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

function isPhysicalUnitedStates() {
   return isUnitedStates(document.getElementById("beneficiary_physical_country")?.value);
}

function isPhysicalStreetRequired() {
   return isPhysicalUnitedStates();
}

function isPhysicalUnitSelected() {
   return beneficiaryPhysicalUnitIds.some(isChecked);
}

function isOtherAddressSame() {
   return isChecked("beneficiary_other_same");
}

function isOtherAddressRequired() {
   return !isOtherAddressSame();
}

function isOtherUnitSelected() {
   return isOtherAddressRequired() && beneficiaryOtherUnitIds.some(isChecked);
}

function isOutsideAddressSame() {
   return isChecked("beneficiary_outside_same");
}

function isOutsideAddressRequired() {
   return !isOutsideAddressSame();
}

function isOutsideUnitSelected() {
   return isOutsideAddressRequired() && beneficiaryOutsideUnitIds.some(isChecked);
}

function isBeneficiaryEntryYes() {
   return isChecked("beneficiary_entry_yes");
}

function isBeneficiaryEntryKnown() {
   return beneficiaryEntryIds.some(isChecked);
}

function isBeneficiaryCurrentlyUsa() {
   return isChecked("beneficiary_currently_usa_yes");
}

function isBeneficiaryCurrentlyUsaKnown() {
   return isBeneficiaryEntryYes() && beneficiaryCurrentlyUsaIds.some(isChecked);
}

function isBeneficiaryEntryDetailRequired() {
   return isBeneficiaryEntryYes() && isBeneficiaryCurrentlyUsa();
}

function isBeneficiaryUnemployed() {
   return isChecked("beneficiary_employment_unemployed");
}

function hasBeneficiaryEmploymentData() {
   return hasAnyValue(beneficiaryEmploymentDataIds) || beneficiaryEmploymentUnitIds.some(isChecked);
}

function isBeneficiaryEmploymentAddressRequired() {
   return !isBeneficiaryUnemployed() && hasBeneficiaryEmploymentData();
}

function isBeneficiaryEmploymentUnitSelected() {
   return isBeneficiaryEmploymentAddressRequired() && beneficiaryEmploymentUnitIds.some(isChecked);
}

function isBeneficiaryEmploymentUnitedStates() {
   return isBeneficiaryEmploymentAddressRequired() && isUnitedStates(document.getElementById("beneficiary_employment_country")?.value);
}

function isBeneficiaryProceedingYes() {
   return isChecked("beneficiary_proceeding_yes");
}

function isBeneficiaryProceedingRequired() {
   return beneficiaryProceedingIds.some(isChecked) || hasAnyValue(beneficiaryProceedingDataIds);
}

function isBeneficiaryProceedingDetailRequired() {
   return isBeneficiaryProceedingYes();
}

function isBeneficiaryNativeRequired() {
   return isChecked("beneficiary_native_required") || hasAnyValue(beneficiaryNativeDataIds) || beneficiaryNativeUnitIds.some(isChecked);
}

function isBeneficiaryNativeUnitSelected() {
   return isBeneficiaryNativeRequired() && beneficiaryNativeUnitIds.some(isChecked);
}

function wasSpouseSelectedInPart1() {
   try {
      const part1 = JSON.parse(localStorage.getItem("i130-1") || "{}");
      return !!part1.relationship_spouse;
   } catch (error) {
      return false;
   }
}

function isBeneficiaryLastNeverLived() {
   return isChecked("beneficiary_last_never_lived");
}

function hasBeneficiaryLastAddressData() {
   return hasAnyValue(beneficiaryLastAddressDataIds) || beneficiaryLastUnitIds.some(isChecked);
}

function isBeneficiaryLastAddressRequired() {
   return !isBeneficiaryLastNeverLived() && (wasSpouseSelectedInPart1() || hasBeneficiaryLastAddressData());
}

function isBeneficiaryLastUnitSelected() {
   return isBeneficiaryLastAddressRequired() && beneficiaryLastUnitIds.some(isChecked);
}

function isBeneficiaryLastAddressUnitedStates() {
   return isBeneficiaryLastAddressRequired() && isUnitedStates(document.getElementById("beneficiary_last_country")?.value);
}

function isBeneficiaryProcessingRequired() {
   return beneficiaryProcessingIds.some(isChecked) ||
      hasAnyValue(beneficiaryUsaProcessingIds) ||
      hasAnyValue(beneficiaryAbroadProcessingIds);
}

function isBeneficiaryProcessingUsa() {
   return isChecked("beneficiary_processing_usa");
}

function isBeneficiaryProcessingAbroad() {
   return isChecked("beneficiary_processing_abroad");
}

function getBeneficiaryMarriageNumber() {
   const value = Number.parseInt(document.getElementById("beneficiary_marriage_number")?.value || "0", 10);
   return Number.isNaN(value) ? 0 : value;
}

function isBeneficiaryCurrentlyMarried() {
   return isChecked("beneficiary_marriage_status_married");
}

function isBeneficiaryNeverMarried() {
   return isChecked("beneficiary_marriage_status_single");
}

function hasBeneficiaryEverBeenMarried() {
   if (isBeneficiaryNeverMarried()) return false;

   const nonSingleStatusSelected = beneficiaryMarriageStatusIds
      .filter(id => id !== "beneficiary_marriage_status_single")
      .some(isChecked);

   return getBeneficiaryMarriageNumber() > 0 || nonSingleStatusSelected;
}

function isBeneficiaryCurrentMarriageUnitedStates() {
   return isBeneficiaryCurrentlyMarried() && isUnitedStates(document.getElementById("beneficiary_marriage_current_country")?.value);
}

function isBeneficiarySpouse1EndDateRequired() {
   return hasBeneficiaryEverBeenMarried() && !isBeneficiaryCurrentlyMarried();
}

function hasBeneficiarySpouse2Data() {
   return beneficiarySpouse2DataIds.some(id => (document.getElementById(id)?.value || "").trim() !== "");
}

function isBeneficiarySpouse2Required() {
   return getBeneficiaryMarriageNumber() >= 2 || hasBeneficiarySpouse2Data();
}

function getBeneficiaryFamilyCount() {
   const value = Number.parseInt(document.getElementById("beneficiary_family_count")?.value || "0", 10);
   if (Number.isNaN(value)) return 0;
   return Math.min(Math.max(value, 0), 5);
}

function hasBeneficiaryFamilyPersonData(index) {
   const ids = beneficiaryFamilyPersonFieldIds[index - 1] || [];
   return ids.some(id => (document.getElementById(id)?.value || "").trim() !== "");
}

function isBeneficiaryFamilyPersonRequired(index) {
   return getBeneficiaryFamilyCount() >= index || hasBeneficiaryFamilyPersonData(index);
}

function normalizeDigits(value) {
   return String(value || "").replace(/\D/g, "");
}

function isPhoneLike(value) {
   const digits = normalizeDigits(value);
   return digits.length >= 7 && digits.length <= 15;
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

function isValidDate(value) {
   if (!value) return false;

   const parsed = new Date(`${value}T00:00:00`);
   return !Number.isNaN(parsed.getTime());
}

const fields = [
   {
      id: "beneficiary_a_number",
      required: false,
      validate: value => value.trim() === "" || /^[0-9]{1,9}$/.test(value.trim()),
      message: "Enter a valid A-Number, up to 9 digits, or leave it blank."
   },
   {
      id: "beneficiary_uscis_number",
      required: false,
      validate: value => value.trim() === "" || /^[0-9]{1,12}$/.test(value.trim()),
      message: "Enter a valid USCIS Online Account Number, up to 12 digits, or leave it blank."
   },
   {
      id: "beneficiary_ssn",
      required: false,
      validate: value => value.trim() === "" || /^[0-9]{9}$/.test(value.trim()),
      message: "Enter a valid 9-digit Social Security number, or leave it blank."
   },
   {
      id: "beneficiary_lastname",
      required: true,
      validate: value => value.trim() !== "",
      message: "Beneficiary family name is required."
   },
   {
      id: "beneficiary_firstname",
      required: true,
      validate: value => value.trim() !== "",
      message: "Beneficiary given name is required."
   },
   {
      id: "beneficiary_middlename",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "beneficiary_other_lastname",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "beneficiary_other_firstname",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "beneficiary_other_middlename",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "beneficiary_city",
      required: true,
      validate: value => value.trim() !== "",
      message: "City, town, or village of birth is required."
   },
   {
      id: "beneficiary_country",
      required: true,
      validate: value => value.trim() !== "",
      message: "Country of birth is required."
   },
   {
      id: "beneficiary_dob",
      required: true,
      validate: isNotFutureDate,
      message: "Enter a valid date of birth."
   },
   {
      id: "beneficiary_male",
      required: true,
      validate: () => validateRadioGroup(beneficiarySexIds),
      message: "Select the beneficiary's sex."
   },
   {
      id: "beneficiary_female",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "beneficiary_filed_yes",
      required: true,
      validate: () => validateRadioGroup(beneficiaryFiledIds),
      message: "Select whether anyone else has ever filed a petition for the beneficiary."
   },
   {
      id: "beneficiary_filed_no",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "beneficiary_filed_unknown",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "beneficiary_physical_street",
      required: true,
      condition: isPhysicalStreetRequired,
      validate: value => value.trim() !== "",
      message: "Physical street number and name is required for a U.S. physical address."
   },
   {
      id: "beneficiary_physical_apt",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "beneficiary_physical_ste",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "beneficiary_physical_flr",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "beneficiary_physical_number",
      required: true,
      condition: isPhysicalUnitSelected,
      validate: value => value.trim() !== "",
      message: "Unit number is required when Apt., Ste., or Flr. is selected."
   },
   {
      id: "beneficiary_physical_city",
      required: true,
      validate: value => value.trim() !== "",
      message: "Physical address city or town is required."
   },
   {
      id: "beneficiary_physical_state",
      required: true,
      condition: isPhysicalUnitedStates,
      validate: value => value.trim() !== "",
      message: "State is required for a U.S. physical address."
   },
   {
      id: "beneficiary_physical_zip",
      required: true,
      condition: isPhysicalUnitedStates,
      validate: isValidZip,
      message: "Enter a valid ZIP Code (##### or #####-####)."
   },
   {
      id: "beneficiary_physical_province",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "beneficiary_physical_postal",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "beneficiary_physical_country",
      required: true,
      validate: value => value.trim() !== "",
      message: "Physical address country is required."
   },
   {
      id: "beneficiary_other_same",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "beneficiary_other_street",
      required: true,
      condition: isOtherAddressRequired,
      validate: value => value.trim() !== "",
      message: "U.S. address street number and name is required, or mark it as same as physical address."
   },
   {
      id: "beneficiary_other_apt",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "beneficiary_other_ste",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "beneficiary_other_flr",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "beneficiary_other_number",
      required: true,
      condition: isOtherUnitSelected,
      validate: value => value.trim() !== "",
      message: "Unit number is required when Apt., Ste., or Flr. is selected."
   },
   {
      id: "beneficiary_other_city",
      required: true,
      condition: isOtherAddressRequired,
      validate: value => value.trim() !== "",
      message: "U.S. address city or town is required."
   },
   {
      id: "beneficiary_other_state",
      required: true,
      condition: isOtherAddressRequired,
      validate: value => value.trim() !== "",
      message: "U.S. address state is required."
   },
   {
      id: "beneficiary_other_zip",
      required: true,
      condition: isOtherAddressRequired,
      validate: isValidZip,
      message: "Enter a valid ZIP Code (##### or #####-####)."
   },
   {
      id: "beneficiary_outside_same",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "beneficiary_outside_street",
      required: true,
      condition: isOutsideAddressRequired,
      validate: value => value.trim() !== "",
      message: "Outside-U.S. street number and name is required, or mark it as same as physical address."
   },
   {
      id: "beneficiary_outside_apt",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "beneficiary_outside_ste",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "beneficiary_outside_flr",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "beneficiary_outside_number",
      required: true,
      condition: isOutsideUnitSelected,
      validate: value => value.trim() !== "",
      message: "Unit number is required when Apt., Ste., or Flr. is selected."
   },
   {
      id: "beneficiary_outside_city",
      required: true,
      condition: isOutsideAddressRequired,
      validate: value => value.trim() !== "",
      message: "Outside-U.S. city or town is required."
   },
   {
      id: "beneficiary_outside_province",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "beneficiary_outside_postal",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "beneficiary_outside_country",
      required: true,
      condition: isOutsideAddressRequired,
      validate: value => value.trim() !== "",
      message: "Outside-U.S. country is required."
   },
   {
      id: "beneficiary_outside_telephone",
      required: false,
      validate: value => value.trim() === "" || isPhoneLike(value),
      message: "Enter a valid daytime telephone number, or leave it blank."
   },
   {
      id: "beneficiary_outside_mobile",
      required: false,
      validate: value => value.trim() === "" || isPhoneLike(value),
      message: "Enter a valid mobile telephone number, or leave it blank."
   },
   {
      id: "beneficiary_outside_email",
      required: false,
      validate: value => value.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
      message: "Enter a valid email address, or leave it blank."
   },
   {
      id: "beneficiary_marriage_number",
      required: true,
      validate: value => {
         const trimmed = value.trim();
         const number = Number(trimmed);
         const nonSingleStatusSelected = beneficiaryMarriageStatusIds
            .filter(id => id !== "beneficiary_marriage_status_single")
            .some(isChecked);

         if (trimmed === "" || !Number.isInteger(number) || number < 0 || number > 99) {
            return false;
         }

         if (isBeneficiaryNeverMarried()) {
            return number === 0;
         }

         if (nonSingleStatusSelected) {
            return number >= 1;
         }

         return true;
      },
      message: "Enter 0 if the beneficiary has never married; otherwise enter 1 or more."
   },
   {
      id: "beneficiary_marriage_status_single",
      required: true,
      validate: () => validateRadioGroup(beneficiaryMarriageStatusIds),
      message: "Select the beneficiary's current marital status."
   },
   {
      id: "beneficiary_marriage_status_married",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "beneficiary_marriage_status_divorced",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "beneficiary_marriage_status_widowed",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "beneficiary_marriage_status_separated",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "beneficiary_marriage_status_annulled",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "beneficiary_marriage_date",
      required: true,
      condition: isBeneficiaryCurrentlyMarried,
      validate: isNotFutureDate,
      message: "Enter a valid current marriage date."
   },
   {
      id: "beneficiary_marriage_current_city",
      required: true,
      condition: isBeneficiaryCurrentlyMarried,
      validate: value => value.trim() !== "",
      message: "City or town of current marriage is required."
   },
   {
      id: "beneficiary_marriage_current_dropdown",
      required: true,
      condition: isBeneficiaryCurrentMarriageUnitedStates,
      validate: value => value.trim() !== "",
      message: "State is required for a U.S. marriage location."
   },
   {
      id: "beneficiary_marriage_current_province",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "beneficiary_marriage_current_country",
      required: true,
      condition: isBeneficiaryCurrentlyMarried,
      validate: value => value.trim() !== "",
      message: "Country of current marriage is required."
   },
   {
      id: "beneficiary_marriage_spouse1_lastname",
      required: true,
      condition: hasBeneficiaryEverBeenMarried,
      validate: value => value.trim() !== "",
      message: "Spouse 1 family name is required."
   },
   {
      id: "beneficiary_marriage_spouse1_firstname",
      required: true,
      condition: hasBeneficiaryEverBeenMarried,
      validate: value => value.trim() !== "",
      message: "Spouse 1 given name is required."
   },
   {
      id: "beneficiary_marriage_spouse1_middlename",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "beneficiary_marriage_spouse1_date",
      required: true,
      condition: isBeneficiarySpouse1EndDateRequired,
      validate: isNotFutureDate,
      message: "Enter the date the first listed marriage ended."
   },
   {
      id: "beneficiary_marriage_spouse2_lastname",
      required: true,
      condition: isBeneficiarySpouse2Required,
      validate: value => value.trim() !== "",
      message: "Spouse 2 family name is required when Spouse 2 is provided."
   },
   {
      id: "beneficiary_marriage_spouse2_firstname",
      required: true,
      condition: isBeneficiarySpouse2Required,
      validate: value => value.trim() !== "",
      message: "Spouse 2 given name is required when Spouse 2 is provided."
   },
   {
      id: "beneficiary_marriage_spouse2_middlename",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "beneficiary_marriage_spouse2_date",
      required: true,
      condition: isBeneficiarySpouse2Required,
      validate: isNotFutureDate,
      message: "Enter the date the second listed marriage ended."
   },
   {
      id: "beneficiary_family_count",
      required: false,
      validate: value => {
         const number = Number(value || "0");
         return Number.isInteger(number) && number >= 0 && number <= 5;
      },
      message: ""
   },
   {
      id: "beneficiary_marriage_family1_lastname",
      required: true,
      condition: () => isBeneficiaryFamilyPersonRequired(1),
      validate: value => value.trim() !== "",
      message: "Person 1 family name is required."
   },
   {
      id: "beneficiary_marriage_family1_firstname",
      required: true,
      condition: () => isBeneficiaryFamilyPersonRequired(1),
      validate: value => value.trim() !== "",
      message: "Person 1 given name is required."
   },
   {
      id: "beneficiary_marriage_family1_middlename",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "beneficiary_marriage_family1_relationship",
      required: true,
      condition: () => isBeneficiaryFamilyPersonRequired(1),
      validate: value => value.trim() !== "",
      message: "Person 1 relationship is required."
   },
   {
      id: "beneficiary_marriage_family1_dob",
      required: true,
      condition: () => isBeneficiaryFamilyPersonRequired(1),
      validate: isNotFutureDate,
      message: "Enter Person 1 date of birth."
   },
   {
      id: "beneficiary_marriage_family1_country",
      required: true,
      condition: () => isBeneficiaryFamilyPersonRequired(1),
      validate: value => value.trim() !== "",
      message: "Person 1 country of birth is required."
   },
   {
      id: "beneficiary_marriage_family2_lastname",
      required: true,
      condition: () => isBeneficiaryFamilyPersonRequired(2),
      validate: value => value.trim() !== "",
      message: "Person 2 family name is required."
   },
   {
      id: "beneficiary_marriage_family2_firstname",
      required: true,
      condition: () => isBeneficiaryFamilyPersonRequired(2),
      validate: value => value.trim() !== "",
      message: "Person 2 given name is required."
   },
   {
      id: "beneficiary_marriage_family2_middlename",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "beneficiary_marriage_family2_relationship",
      required: true,
      condition: () => isBeneficiaryFamilyPersonRequired(2),
      validate: value => value.trim() !== "",
      message: "Person 2 relationship is required."
   },
   {
      id: "beneficiary_marriage_family2_dob",
      required: true,
      condition: () => isBeneficiaryFamilyPersonRequired(2),
      validate: isNotFutureDate,
      message: "Enter Person 2 date of birth."
   },
   {
      id: "beneficiary_marriage_family2_country",
      required: true,
      condition: () => isBeneficiaryFamilyPersonRequired(2),
      validate: value => value.trim() !== "",
      message: "Person 2 country of birth is required."
   },
   {
      id: "beneficiary_marriage_family3_lastname",
      required: true,
      condition: () => isBeneficiaryFamilyPersonRequired(3),
      validate: value => value.trim() !== "",
      message: "Person 3 family name is required."
   },
   {
      id: "beneficiary_marriage_family3_firstname",
      required: true,
      condition: () => isBeneficiaryFamilyPersonRequired(3),
      validate: value => value.trim() !== "",
      message: "Person 3 given name is required."
   },
   {
      id: "beneficiary_marriage_family3_middlename",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "beneficiary_marriage_family3_relationship",
      required: true,
      condition: () => isBeneficiaryFamilyPersonRequired(3),
      validate: value => value.trim() !== "",
      message: "Person 3 relationship is required."
   },
   {
      id: "beneficiary_marriage_family3_dob",
      required: true,
      condition: () => isBeneficiaryFamilyPersonRequired(3),
      validate: isNotFutureDate,
      message: "Enter Person 3 date of birth."
   },
   {
      id: "beneficiary_marriage_family3_country",
      required: true,
      condition: () => isBeneficiaryFamilyPersonRequired(3),
      validate: value => value.trim() !== "",
      message: "Person 3 country of birth is required."
   },
   {
      id: "beneficiary_marriage_family4_lastname",
      required: true,
      condition: () => isBeneficiaryFamilyPersonRequired(4),
      validate: value => value.trim() !== "",
      message: "Person 4 family name is required."
   },
   {
      id: "beneficiary_marriage_family4_firstname",
      required: true,
      condition: () => isBeneficiaryFamilyPersonRequired(4),
      validate: value => value.trim() !== "",
      message: "Person 4 given name is required."
   },
   {
      id: "beneficiary_marriage_family4_middlename",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "beneficiary_marriage_family4_relationship",
      required: true,
      condition: () => isBeneficiaryFamilyPersonRequired(4),
      validate: value => value.trim() !== "",
      message: "Person 4 relationship is required."
   },
   {
      id: "beneficiary_marriage_family4_dob",
      required: true,
      condition: () => isBeneficiaryFamilyPersonRequired(4),
      validate: isNotFutureDate,
      message: "Enter Person 4 date of birth."
   },
   {
      id: "beneficiary_marriage_family4_country",
      required: true,
      condition: () => isBeneficiaryFamilyPersonRequired(4),
      validate: value => value.trim() !== "",
      message: "Person 4 country of birth is required."
   },
   {
      id: "beneficiary_marriage_family5_lastname",
      required: true,
      condition: () => isBeneficiaryFamilyPersonRequired(5),
      validate: value => value.trim() !== "",
      message: "Person 5 family name is required."
   },
   {
      id: "beneficiary_marriage_family5_firstname",
      required: true,
      condition: () => isBeneficiaryFamilyPersonRequired(5),
      validate: value => value.trim() !== "",
      message: "Person 5 given name is required."
   },
   {
      id: "beneficiary_marriage_family5_middlename",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "beneficiary_marriage_family5_relationship",
      required: true,
      condition: () => isBeneficiaryFamilyPersonRequired(5),
      validate: value => value.trim() !== "",
      message: "Person 5 relationship is required."
   },
   {
      id: "beneficiary_marriage_family5_dob",
      required: true,
      condition: () => isBeneficiaryFamilyPersonRequired(5),
      validate: isNotFutureDate,
      message: "Enter Person 5 date of birth."
   },
   {
      id: "beneficiary_marriage_family5_country",
      required: true,
      condition: () => isBeneficiaryFamilyPersonRequired(5),
      validate: value => value.trim() !== "",
      message: "Person 5 country of birth is required."
   }
];

function optionalField(id) {
   return {
      id,
      required: false,
      validate: () => true,
      message: ""
   };
}

function requiredTextField(id, condition, message) {
   return {
      id,
      required: true,
      condition,
      validate: value => value.trim() !== "",
      message
   };
}

fields.push(
   {
      id: "beneficiary_entry_yes",
      required: true,
      validate: () => validateRadioGroup(beneficiaryEntryIds),
      message: "Select whether the beneficiary was ever in the United States."
   },
   optionalField("beneficiary_entry_no"),
   {
      id: "beneficiary_currently_usa_yes",
      required: true,
      condition: isBeneficiaryEntryYes,
      validate: () => validateRadioGroup(beneficiaryCurrentlyUsaIds),
      message: "Select whether the beneficiary is currently in the United States."
   },
   optionalField("beneficiary_currently_usa_no"),
   requiredTextField(
      "beneficiary_class_admission",
      isBeneficiaryEntryDetailRequired,
      "Class of admission is required when the beneficiary is currently in the United States."
   ),
   {
      id: "beneficiary_i94",
      required: true,
      condition: isBeneficiaryEntryDetailRequired,
      validate: value => /^[A-Za-z0-9]{1,11}$/.test(value.trim()),
      message: "Enter a valid I-94 number, up to 11 letters or numbers."
   },
   {
      id: "beneficiary_arrival_date",
      required: true,
      condition: isBeneficiaryEntryDetailRequired,
      validate: isNotFutureDate,
      message: "Enter a valid date of arrival."
   },
   {
      id: "beneficiary_expire_date",
      required: true,
      condition: isBeneficiaryEntryDetailRequired,
      validate: isValidDate,
      message: "Enter a valid authorized stay expiration date."
   },
   optionalField("beneficiary_passport"),
   optionalField("beneficiary_travel_number"),
   optionalField("beneficiary_travel_country"),
   {
      id: "beneficiary_travel_expire_date",
      required: false,
      validate: value => value.trim() === "" || isValidDate(value),
      message: "Enter a valid passport or travel document expiration date, or leave it blank."
   },
   optionalField("beneficiary_employment_unemployed"),
   {
      id: "beneficiary_employment_name",
      required: true,
      validate: value => isBeneficiaryUnemployed() || value.trim() !== "",
      message: "Enter the employer name, or mark the beneficiary as unemployed."
   },
   requiredTextField(
      "beneficiary_employment_street",
      isBeneficiaryEmploymentAddressRequired,
      "Employer street number and name is required."
   ),
   optionalField("beneficiary_employment_apt"),
   optionalField("beneficiary_employment_ste"),
   optionalField("beneficiary_employment_flr"),
   requiredTextField(
      "beneficiary_employment_number",
      isBeneficiaryEmploymentUnitSelected,
      "Unit number is required when Apt., Ste., or Flr. is selected."
   ),
   requiredTextField(
      "beneficiary_employment_city",
      isBeneficiaryEmploymentAddressRequired,
      "Employer city or town is required."
   ),
   requiredTextField(
      "beneficiary_employment_state",
      isBeneficiaryEmploymentUnitedStates,
      "State is required for a U.S. employer address."
   ),
   {
      id: "beneficiary_employment_zip",
      required: true,
      condition: isBeneficiaryEmploymentUnitedStates,
      validate: isValidZip,
      message: "Enter a valid ZIP Code (##### or #####-####)."
   },
   optionalField("beneficiary_employment_province"),
   optionalField("beneficiary_employment_postal"),
   requiredTextField(
      "beneficiary_employment_country",
      isBeneficiaryEmploymentAddressRequired,
      "Employer country is required."
   ),
   {
      id: "beneficiary_employment_date",
      required: true,
      condition: isBeneficiaryEmploymentAddressRequired,
      validate: isNotFutureDate,
      message: "Enter a valid employment start date."
   },
   {
      id: "beneficiary_proceeding_yes",
      required: true,
      validate: () => validateRadioGroup(beneficiaryProceedingIds),
      message: "Select whether the beneficiary was ever in immigration proceedings."
   },
   optionalField("beneficiary_proceeding_no"),
   {
      id: "beneficiary_proceeding_type_removal",
      required: true,
      condition: isBeneficiaryProceedingDetailRequired,
      validate: () => validateRadioGroup(beneficiaryProceedingTypeIds),
      message: "Select the type of immigration proceedings."
   },
   optionalField("beneficiary_proceeding_type_exclusion"),
   optionalField("beneficiary_proceeding_type_rescission"),
   optionalField("beneficiary_proceeding_type_other"),
   requiredTextField(
      "beneficiary_proceeding_city",
      isBeneficiaryProceedingDetailRequired,
      "Proceedings city or town is required."
   ),
   requiredTextField(
      "beneficiary_proceeding_state",
      isBeneficiaryProceedingDetailRequired,
      "Proceedings state is required."
   ),
   {
      id: "beneficiary_proceeding_date",
      required: true,
      condition: isBeneficiaryProceedingDetailRequired,
      validate: isNotFutureDate,
      message: "Enter a valid proceedings date."
   },
   optionalField("beneficiary_native_required"),
   requiredTextField(
      "beneficiary_native_lastname",
      isBeneficiaryNativeRequired,
      "Native-language family name is required."
   ),
   requiredTextField(
      "beneficiary_native_firstname",
      isBeneficiaryNativeRequired,
      "Native-language given name is required."
   ),
   optionalField("beneficiary_native_middlename"),
   requiredTextField(
      "beneficiary_native_street",
      isBeneficiaryNativeRequired,
      "Native-language street number and name is required."
   ),
   optionalField("beneficiary_native_apt"),
   optionalField("beneficiary_native_ste"),
   optionalField("beneficiary_native_flr"),
   requiredTextField(
      "beneficiary_native_number",
      isBeneficiaryNativeUnitSelected,
      "Unit number is required when Apt., Ste., or Flr. is selected."
   ),
   requiredTextField(
      "beneficiary_native_city",
      isBeneficiaryNativeRequired,
      "Native-language city or town is required."
   ),
   optionalField("beneficiary_native_province"),
   optionalField("beneficiary_native_postal"),
   requiredTextField(
      "beneficiary_native_country",
      isBeneficiaryNativeRequired,
      "Native-language country is required."
   ),
   optionalField("beneficiary_last_never_lived"),
   requiredTextField(
      "beneficiary_last_street",
      isBeneficiaryLastAddressRequired,
      "Last shared street number and name is required when filing for a spouse."
   ),
   optionalField("beneficiary_last_apt"),
   optionalField("beneficiary_last_ste"),
   optionalField("beneficiary_last_flr"),
   requiredTextField(
      "beneficiary_last_number",
      isBeneficiaryLastUnitSelected,
      "Unit number is required when Apt., Ste., or Flr. is selected."
   ),
   requiredTextField(
      "beneficiary_last_city",
      isBeneficiaryLastAddressRequired,
      "Last shared city or town is required."
   ),
   requiredTextField(
      "beneficiary_last_state",
      isBeneficiaryLastAddressUnitedStates,
      "State is required for a U.S. last shared address."
   ),
   {
      id: "beneficiary_last_zip",
      required: true,
      condition: isBeneficiaryLastAddressUnitedStates,
      validate: isValidZip,
      message: "Enter a valid ZIP Code (##### or #####-####)."
   },
   optionalField("beneficiary_last_province"),
   optionalField("beneficiary_last_postal"),
   requiredTextField(
      "beneficiary_last_country",
      isBeneficiaryLastAddressRequired,
      "Last shared country is required."
   ),
   {
      id: "beneficiary_last_date_from",
      required: true,
      condition: isBeneficiaryLastAddressRequired,
      validate: isNotFutureDate,
      message: "Enter a valid last shared address date from."
   },
   {
      id: "beneficiary_last_date_to",
      required: true,
      condition: isBeneficiaryLastAddressRequired,
      validate: isNotFutureDate,
      message: "Enter a valid last shared address date to."
   },
   {
      id: "beneficiary_processing_usa",
      required: true,
      validate: () => validateRadioGroup(beneficiaryProcessingIds),
      message: "Select where the beneficiary will apply."
   },
   optionalField("beneficiary_processing_abroad"),
   requiredTextField(
      "beneficiary_usa_city",
      isBeneficiaryProcessingUsa,
      "USCIS office city or town is required."
   ),
   requiredTextField(
      "beneficiary_usa_state",
      isBeneficiaryProcessingUsa,
      "USCIS office state is required."
   ),
   requiredTextField(
      "beneficiary_abroad_city",
      isBeneficiaryProcessingAbroad,
      "Embassy or consulate city or town is required."
   ),
   optionalField("beneficiary_abroad_province"),
   requiredTextField(
      "beneficiary_abroad_country",
      isBeneficiaryProcessingAbroad,
      "Embassy or consulate country is required."
   )
);
