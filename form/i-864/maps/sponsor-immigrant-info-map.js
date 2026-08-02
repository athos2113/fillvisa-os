const immigrantSponsorChoiceIds = [
   "immigrant_sponsor_yes",
   "immigrant_sponsor_no",
   "immigrant_sponsor_family_within",
   "immigrant_sponsor_family_more"
];

function isChecked(id) {
   return !!document.getElementById(id)?.checked;
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

function hasRequiredText(value) {
   return value.trim() !== "";
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

function isFamilyMemberSectionRequired() {
   return isChecked("immigrant_sponsor_family_within") || isChecked("immigrant_sponsor_family_more");
}

function isFamilyRowVisible(row) {
   const rowEl = document.getElementById(`immigrantFamilyRow${row}`);
   return isFamilyMemberSectionRequired() && !!rowEl && !rowEl.classList.contains("d-none");
}

function isAdditionalFamilySpaceVisible() {
   const section = document.getElementById("immigrantFamilyMoreSection");
   return isFamilyMemberSectionRequired() && !!section && !section.classList.contains("d-none");
}

function familyField(row, suffix, required, validate, message) {
   return {
      id: `immigrant_family_${row}_${suffix}`,
      required,
      condition: () => isFamilyRowVisible(row),
      validate,
      message
   };
}

const fields = [
   {
      id: "immigrant_sponsor_yes",
      required: true,
      validate: () => validateRadioGroup(immigrantSponsorChoiceIds),
      message: "Select one option for the immigrants you are sponsoring."
   },
   {
      id: "immigrant_sponsor_no",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "immigrant_sponsor_family_within",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "immigrant_sponsor_family_more",
      required: false,
      validate: () => true,
      message: ""
   }
];

[1, 2, 3, 4].forEach(row => {
   fields.push(
      familyField(
         row,
         "lastname",
         true,
         hasRequiredText,
         `Family member ${row} family name is required.`
      ),
      familyField(
         row,
         "firstname",
         true,
         hasRequiredText,
         `Family member ${row} given name is required.`
      ),
      familyField(
         row,
         "middlename",
         false,
         () => true,
         ""
      ),
      familyField(
         row,
         "relationship",
         true,
         hasRequiredText,
         `Family member ${row} relationship is required.`
      ),
      familyField(
         row,
         "date",
         true,
         isValidDateOfBirth,
         `Enter a valid date of birth for family member ${row}.`
      ),
      familyField(
         row,
         "a_number",
         false,
         isOptionalDigitsUpTo(9),
         `Enter no more than 9 digits for family member ${row}'s A-Number.`
      ),
      familyField(
         row,
         "uscis",
         false,
         isOptionalDigitsUpTo(12),
         `Enter no more than 12 digits for family member ${row}'s USCIS Online Account Number.`
      )
   );
});

fields.push({
   id: "immigrant_family_4_more",
   required: true,
   condition: isAdditionalFamilySpaceVisible,
   validate: hasRequiredText,
   message: "Provide information for additional family members."
});
