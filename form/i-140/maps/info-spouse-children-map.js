const spousePersonRows = [1, 2, 3, 4, 5, 6];

const spouseRequiredFields = [
  "lastname",
  "firstname",
  "dob",
  "country",
  "relationship"
];

const spouseAllTextFields = [
  "lastname",
  "firstname",
  "middlename",
  "dob",
  "country",
  "relationship"
];

function setGroupState(ids, isValid) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    el.classList.remove("is-valid", "is-invalid");
    el.classList.add(isValid ? "is-valid" : "is-invalid");
  });
}

function visiblePersonCount() {
  return window.getVisibleSpouseChildrenCount?.() || 1;
}

function isPersonRowStarted(row) {
  const hasText = spouseAllTextFields.some(field => {
    const el = document.getElementById(`spouse_${field}_${row}`);
    return el && el.value.trim() !== "";
  });

  const hasRadio = [
    `spouse_status_yes_${row}`,
    `spouse_status_no_${row}`,
    `spouse_abroad_yes_${row}`,
    `spouse_abroad_no_${row}`
  ].some(id => document.getElementById(id)?.checked);

  return hasText || hasRadio;
}

function isPersonRowRequired(row) {
  const count = visiblePersonCount();
  if (row > count) return false;
  if (count > 1) return true;

  return isPersonRowStarted(row);
}

function isStatusAnswered(row) {
  const ids = [`spouse_status_yes_${row}`, `spouse_status_no_${row}`];
  const isValid = ids.some(id => document.getElementById(id)?.checked);
  setGroupState(ids, isValid);
  return isValid;
}

function isAbroadAnswered(row) {
  const ids = [`spouse_abroad_yes_${row}`, `spouse_abroad_no_${row}`];
  const isValid = ids.some(id => document.getElementById(id)?.checked);
  setGroupState(ids, isValid);
  return isValid;
}

const fields = [];

spousePersonRows.forEach(row => {
  fields.push(
    {
      id: `spouse_lastname_${row}`,
      required: true,
      condition: () => isPersonRowRequired(row),
      validate: v => v.trim() !== "",
      message: `Family name is required for Person ${row}.`
    },
    {
      id: `spouse_firstname_${row}`,
      required: true,
      condition: () => isPersonRowRequired(row),
      validate: v => v.trim() !== "",
      message: `Given name is required for Person ${row}.`
    },
    {
      id: `spouse_middlename_${row}`,
      required: false,
      validate: () => true,
      message: ""
    },
    {
      id: `spouse_dob_${row}`,
      required: true,
      condition: () => isPersonRowRequired(row),
      validate: v => v.trim() !== "",
      message: `Date of birth is required for Person ${row}.`
    },
    {
      id: `spouse_country_${row}`,
      required: true,
      condition: () => isPersonRowRequired(row),
      validate: v => v.trim() !== "",
      message: `Country of birth is required for Person ${row}.`
    },
    {
      id: `spouse_relationship_${row}`,
      required: true,
      condition: () => isPersonRowRequired(row),
      validate: v => v.trim() !== "",
      message: `Relationship is required for Person ${row}.`
    },
    {
      id: `spouse_status_yes_${row}`,
      required: true,
      condition: () => isPersonRowRequired(row),
      validate: () => isStatusAnswered(row),
      message: `Select whether Person ${row} is applying for adjustment of status.`
    },
    {
      id: `spouse_abroad_yes_${row}`,
      required: true,
      condition: () => isPersonRowRequired(row),
      validate: () => isAbroadAnswered(row),
      message: `Select whether Person ${row} is applying for a visa abroad.`
    }
  );
});

fields.push({
  id: "spouse_additional",
  required: false,
  validate: () => true,
  message: ""
});
