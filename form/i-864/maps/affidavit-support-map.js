const basisFilingIds = [
   "basis_petitioner",
   "basis_alien",
   "basis_ownership",
   "basis_only",
   "basis_joint",
   "basis_deceased"
];

const basisJointIds = [
   "basis_joint_first",
   "basis_joint_second"
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

function isBasisAlienSelected() {
   return isChecked("basis_alien");
}

function isBasisOwnershipSelected() {
   return isChecked("basis_ownership");
}

function isBasisJointSelected() {
   return isChecked("basis_joint");
}

function isBasisDeceasedSelected() {
   return isChecked("basis_deceased");
}

function hasRequiredText(value) {
   return value.trim() !== "";
}

const fields = [
   {
      id: "basis_petitioner",
      required: true,
      validate: () => validateRadioGroup(basisFilingIds),
      message: "Select one basis for filing this affidavit of support."
   },
   {
      id: "basis_alien",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "basis_ownership",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "basis_only",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "basis_joint",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "basis_deceased",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "basis_alien_text",
      required: true,
      condition: isBasisAlienSelected,
      validate: hasRequiredText,
      message: "Enter your relationship to the intending immigrant."
   },
   {
      id: "basis_owner_text_1",
      required: true,
      condition: isBasisOwnershipSelected,
      validate: hasRequiredText,
      message: "Enter the entity name for the ownership interest basis."
   },
   {
      id: "basis_owner_text_2",
      required: true,
      condition: isBasisOwnershipSelected,
      validate: hasRequiredText,
      message: "Enter your relationship to the intending immigrant for the ownership interest basis."
   },
   {
      id: "basis_joint_first",
      required: true,
      condition: isBasisJointSelected,
      validate: () => validateRadioGroup(basisJointIds),
      message: "Select whether you are the first or second joint sponsor."
   },
   {
      id: "basis_joint_second",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "basis_deceased_text",
      required: true,
      condition: isBasisDeceasedSelected,
      validate: hasRequiredText,
      message: "Enter your relationship to the intending immigrant as the substitute sponsor."
   }
];
