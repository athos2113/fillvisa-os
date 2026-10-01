const eligibilitySelectionIds = [
  "eligible_attorney",
  "accredited_representative",
  "associated_with",
  "law_student"
];

const subjectOrderIds = ["not_subject", "am_subject"];

function setGroupState(ids, isValid) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    el.classList.remove("is-valid", "is-invalid");
    el.classList.add(isValid ? "is-valid" : "is-invalid");
  });
}

function isChecked(id) {
  return !!document.getElementById(id)?.checked;
}

function validateEligibilitySelection() {
  const isValid = eligibilitySelectionIds.some(isChecked);
  setGroupState(eligibilitySelectionIds, isValid);
  return isValid;
}

function validateSubjectOrderSelection() {
  const isValid = subjectOrderIds.some(isChecked);
  setGroupState(subjectOrderIds, isValid);
  return isValid;
}

const fields = [
  {
    id: "eligible_attorney",
    required: true,
    validate: validateEligibilitySelection,
    message: "Select at least one applicable eligibility category."
  },
  {
    id: "license_no",
    required: true,
    condition: () => isChecked("eligible_attorney"),
    validate: v => v.trim() !== "",
    message: "Licensing authority is required when attorney eligibility is selected."
  },
  {
    id: "bar_no",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "license_additional",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "not_subject",
    required: true,
    condition: () => isChecked("eligible_attorney"),
    validate: validateSubjectOrderSelection,
    message: "Select whether you are subject to any order suspending, enjoining, restraining, disbarring, or otherwise restricting you in the practice of law."
  },
  {
    id: "subject_orders_explanation",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "name_law_firm",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "accredited_representative",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "name_recognized_organization",
    required: true,
    condition: () => isChecked("accredited_representative"),
    validate: v => v.trim() !== "",
    message: "Name of recognized organization is required when accredited representative is selected."
  },
  {
    id: "date_accreditation",
    required: true,
    condition: () => isChecked("accredited_representative"),
    validate: v => v.trim() !== "",
    message: "Date of accreditation is required when accredited representative is selected."
  },
  {
    id: "associated_with",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "associated_with_attorney",
    required: true,
    condition: () => isChecked("associated_with"),
    validate: v => v.trim() !== "",
    message: "Name of the attorney or accredited representative you are associated with is required."
  },
  {
    id: "law_student",
    required: false,
    validate: () => true,
    message: ""
  },
  {
    id: "name_law_student",
    required: true,
    condition: () => isChecked("law_student"),
    validate: v => v.trim() !== "",
    message: "Name of law student or law graduate is required when law student eligibility is selected."
  }
];
