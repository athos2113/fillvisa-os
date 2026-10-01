function setRadioGroupState(ids, isValid) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    el.classList.remove("is-valid", "is-invalid");
    el.classList.add(isValid ? "is-valid" : "is-invalid");
  });
}

const petitionTypeIds = [
  "petition_alien",
  "petition_professor",
  "petition_manager",
  "petition_advanced",
  "petition_bachelor",
  "petition_skilled",
  "petition_otherworker",
  "petition_niw"
];

const petitionFiledIds = [
  "petition_filed_amend",
  "petition_filed_schedule"
];

const fields = [

  {
    id: "petition_alien",
    required: true,
    validate: () => {
      const isValid = petitionTypeIds.some(id => document.getElementById(id).checked);
      setRadioGroupState(petitionTypeIds, isValid);
      return isValid;
    },
    message: "Please select one petition type."
  },

  {
    id: "petition_filed_amend",
    required: true,
    validate: () => {
      const isValid = petitionFiledIds.some(id => document.getElementById(id).checked);
      setRadioGroupState(petitionFiledIds, isValid);
      return isValid;
    },
    message: "Please select whether this is an amended petition or a Schedule A petition."
  },

  {
    id: "previous_petition_number",
    required: true,
    condition: () => document.getElementById("petition_filed_amend")?.checked,
    validate: v => /^[A-Za-z0-9]{1,13}$/.test(v.trim()),
    message: "Please enter the previous petition receipt number, up to 13 alphanumeric characters."
  }

];
