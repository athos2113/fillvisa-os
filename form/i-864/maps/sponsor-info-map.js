const mailingUnitTypeIds = [
   "sponsor_mailing_apt",
   "sponsor_mailing_ste",
   "sponsor_mailing_flr"
];

const sameMailingIds = [
   "sponsor_same_mailing_yes",
   "sponsor_same_mailing_no"
];

const physicalUnitTypeIds = [
   "sponsor_physical_apt",
   "sponsor_physical_ste",
   "sponsor_physical_flr"
];

const immigrationStatusIds = [
   "immigration_status_citizen",
   "immigration_status_national",
   "immigration_status_permanent"
];

const activeDutyIds = [
   "active_duty_yes",
   "active_duty_no"
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

function isSameMailingNo() {
   return isChecked("sponsor_same_mailing_no");
}

function hasMailingUnitType() {
   return mailingUnitTypeIds.some(isChecked);
}

function hasMailingUnitNumber() {
   return hasValue("sponsor_mailing_number");
}

function hasPhysicalUnitType() {
   return isSameMailingNo() && physicalUnitTypeIds.some(isChecked);
}

function hasPhysicalUnitNumber() {
   return isSameMailingNo() && hasValue("sponsor_physical_number");
}

function hasRequiredText(value) {
   return value.trim() !== "";
}

function isValidZip(value) {
   if (value.trim() === "") return true;
   return /^\d{5}(-?\d{4})?$/.test(value.trim());
}

function isValidDateOfBirth(value) {
   if (!value) return false;

   const parsed = new Date(`${value}T00:00:00`);
   if (Number.isNaN(parsed.getTime())) return false;

   const today = new Date();
   today.setHours(0, 0, 0, 0);
   return parsed < today;
}

function isNineDigits(value) {
   return /^\d{9}$/.test(value.trim());
}

function isOptionalDigitsUpTo(maxLength) {
   return value => value.trim() === "" || new RegExp(`^\\d{1,${maxLength}}$`).test(value.trim());
}

function isPetitionerSponsorSelected() {
   const saved = JSON.parse(localStorage.getItem("i864-1") || "null");
   return !!saved?.basis_petitioner;
}

const fields = [
   {
      id: "sponsor_last_name",
      required: true,
      validate: hasRequiredText,
      message: "Family name is required."
   },
   {
      id: "sponsor_first_name",
      required: true,
      validate: hasRequiredText,
      message: "Given name is required."
   },
   {
      id: "sponsor_middle_name",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "sponsor_mailing_incare_name",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "sponsor_mailing_street",
      required: true,
      validate: hasRequiredText,
      message: "Mailing street number and name is required."
   },
   {
      id: "sponsor_mailing_apt",
      required: true,
      condition: hasMailingUnitNumber,
      validate: () => validateRadioGroup(mailingUnitTypeIds),
      message: "Select Apt., Ste., or Flr. for the mailing address unit number."
   },
   {
      id: "sponsor_mailing_ste",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "sponsor_mailing_flr",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "sponsor_mailing_number",
      required: true,
      condition: hasMailingUnitType,
      validate: hasRequiredText,
      message: "Enter the mailing address unit number."
   },
   {
      id: "sponsor_mailing_city",
      required: true,
      validate: hasRequiredText,
      message: "Mailing city or town is required."
   },
   {
      id: "sponsor_mailing_state",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "sponsor_mailing_zip",
      required: false,
      validate: isValidZip,
      message: "Enter a valid ZIP Code."
   },
   {
      id: "sponsor_mailing_province",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "sponsor_mailing_postal",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "sponsor_mailing_country",
      required: true,
      validate: hasRequiredText,
      message: "Mailing country is required."
   },
   {
      id: "sponsor_same_mailing_yes",
      required: true,
      validate: () => validateRadioGroup(sameMailingIds),
      message: "Select whether your mailing address is the same as your physical address."
   },
   {
      id: "sponsor_same_mailing_no",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "sponsor_physical_street",
      required: true,
      condition: isSameMailingNo,
      validate: hasRequiredText,
      message: "Physical street number and name is required."
   },
   {
      id: "sponsor_physical_apt",
      required: true,
      condition: hasPhysicalUnitNumber,
      validate: () => validateRadioGroup(physicalUnitTypeIds),
      message: "Select Apt., Ste., or Flr. for the physical address unit number."
   },
   {
      id: "sponsor_physical_ste",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "sponsor_physical_flr",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "sponsor_physical_number",
      required: true,
      condition: hasPhysicalUnitType,
      validate: hasRequiredText,
      message: "Enter the physical address unit number."
   },
   {
      id: "sponsor_physical_city",
      required: true,
      condition: isSameMailingNo,
      validate: hasRequiredText,
      message: "Physical city or town is required."
   },
   {
      id: "sponsor_physical_state",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "sponsor_physical_zip",
      required: false,
      condition: isSameMailingNo,
      validate: isValidZip,
      message: "Enter a valid ZIP Code."
   },
   {
      id: "sponsor_physical_province",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "sponsor_physical_postal",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "sponsor_physical_country",
      required: true,
      condition: isSameMailingNo,
      validate: hasRequiredText,
      message: "Physical country is required."
   },
   {
      id: "sponsor_domicile",
      required: true,
      validate: hasRequiredText,
      message: "Country of domicile is required."
   },
   {
      id: "sponsor_dob",
      required: true,
      validate: isValidDateOfBirth,
      message: "Enter a valid date of birth."
   },
   {
      id: "sponsor_country_birth",
      required: true,
      validate: hasRequiredText,
      message: "Country of birth is required."
   },
   {
      id: "sponsor_ssn",
      required: true,
      validate: isNineDigits,
      message: "Enter a 9-digit U.S. Social Security Number."
   },
   {
      id: "immigration_status_citizen",
      required: true,
      validate: () => validateRadioGroup(immigrationStatusIds),
      message: "Select the sponsor's immigration status."
   },
   {
      id: "immigration_status_national",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "immigration_status_permanent",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "sponsor_a_number",
      required: false,
      validate: isOptionalDigitsUpTo(9),
      message: "Enter no more than 9 digits for the A-Number."
   },
   {
      id: "sponsor_uscis_number",
      required: false,
      validate: isOptionalDigitsUpTo(12),
      message: "Enter no more than 12 digits for the USCIS Online Account Number."
   },
   {
      id: "active_duty_yes",
      required: true,
      condition: isPetitionerSponsorSelected,
      validate: () => validateRadioGroup(activeDutyIds),
      message: "Select whether you are currently on active duty."
   },
   {
      id: "active_duty_no",
      required: false,
      validate: () => true,
      message: ""
   }
];
