const mailingUnitTypeIds = [
   "principal_mailing_apt",
   "principal_mailing_ste",
   "principal_mailing_flr"
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

function hasMailingUnitType() {
   return mailingUnitTypeIds.some(isChecked);
}

function hasMailingUnitNumber() {
   return hasValue("principal_mailing_number");
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

function isOptionalDigitsUpTo(maxLength) {
   return value => value.trim() === "" || new RegExp(`^\\d{1,${maxLength}}$`).test(value.trim());
}

function isValidTelephone(value) {
   const digits = value.replace(/\D/g, "");
   return digits.length >= 7;
}

const fields = [
   {
      id: "principal_last_name",
      required: true,
      validate: hasRequiredText,
      message: "Family name is required."
   },
   {
      id: "principal_first_name",
      required: true,
      validate: hasRequiredText,
      message: "Given name is required."
   },
   {
      id: "principal_middle_name",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "principal_mailing_incare_name",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "principal_mailing_street",
      required: true,
      validate: hasRequiredText,
      message: "Mailing street number and name is required."
   },
   {
      id: "principal_mailing_apt",
      required: true,
      condition: hasMailingUnitNumber,
      validate: () => validateRadioGroup(mailingUnitTypeIds),
      message: "Select Apt., Ste., or Flr. for the mailing address unit number."
   },
   {
      id: "principal_mailing_ste",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "principal_mailing_flr",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "principal_mailing_number",
      required: true,
      condition: hasMailingUnitType,
      validate: hasRequiredText,
      message: "Enter the mailing address unit number."
   },
   {
      id: "principal_mailing_city",
      required: true,
      validate: hasRequiredText,
      message: "Mailing city or town is required."
   },
   {
      id: "principal_mailing_state",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "principal_mailing_zip",
      required: false,
      validate: isValidZip,
      message: "Enter a valid ZIP Code."
   },
   {
      id: "principal_mailing_province",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "principal_mailing_postal",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "principal_mailing_country",
      required: true,
      validate: hasRequiredText,
      message: "Mailing country is required."
   },
   {
      id: "principal_citizenship",
      required: true,
      validate: hasRequiredText,
      message: "Country of citizenship or nationality is required."
   },
   {
      id: "principal_dob",
      required: true,
      validate: isValidDateOfBirth,
      message: "Enter a valid date of birth."
   },
   {
      id: "principal_a_number",
      required: false,
      validate: isOptionalDigitsUpTo(9),
      message: "Enter no more than 9 digits for the A-Number."
   },
   {
      id: "principal_uscis",
      required: false,
      validate: isOptionalDigitsUpTo(12),
      message: "Enter no more than 12 digits for the USCIS Online Account Number."
   },
   {
      id: "principal_telephone",
      required: true,
      validate: isValidTelephone,
      message: "Enter a valid daytime telephone number."
   }
];
