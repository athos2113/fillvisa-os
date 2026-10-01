function setGroupState(ids, isValid) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    el.classList.remove("is-valid", "is-invalid");
    el.classList.add(isValid ? "is-valid" : "is-invalid");
  });
}

function validateRadioGroup(ids) {
  const isValid = ids.some(id => document.getElementById(id)?.checked);
  setGroupState(ids, isValid);
  return isValid;
}

function isPartTimePosition() {
  return document.getElementById("fulltime_no")?.checked;
}

function isDifferentWorksiteAddress() {
  return document.getElementById("worksite_same_no")?.checked;
}

function validateSocCode() {
  const first = document.getElementById("soc_1")?.value.trim() || "";
  const second = document.getElementById("soc_2")?.value.trim() || "";
  const isValid = /^[0-9]{2}$/.test(first) && /^[0-9]{4}$/.test(second);
  const feedback = document.getElementById("soc_feedback");

  setGroupState(["soc_1", "soc_2"], isValid);

  if (feedback) {
    feedback.textContent = isValid ? "" : "Enter a valid SOC code using 2 digits, then 4 digits.";
  }

  return isValid;
}

function validateHours(value) {
  const trimmed = value.trim();
  if (!/^[0-9]+(\.[0-9]{1,2})?$/.test(trimmed)) return false;

  const hours = Number(trimmed);
  return hours > 0 && hours <= 168;
}

function isMoney(value) {
  return /^\$?\s*[0-9][0-9,]*(\.[0-9]{1,2})?$/.test(value.trim());
}

const fields = [

  {
    id: "job_title",
    required: true,
    validate: v => v.trim() !== "",
    message: "Job title is required."
  },

  {
    id: "soc_1",
    required: true,
    validate: validateSocCode,
    message: "Enter a valid SOC code using 2 digits, then 4 digits."
  },

  {
    id: "nontechnical_job_description",
    required: true,
    validate: v => v.trim() !== "",
    message: "Nontechnical job description is required."
  },

  {
    id: "fulltime_yes",
    required: true,
    validate: () => validateRadioGroup(["fulltime_yes", "fulltime_no"]),
    message: "Please select whether this is a full-time position."
  },

  {
    id: "part_time_hours",
    required: true,
    condition: isPartTimePosition,
    validate: validateHours,
    message: "Enter the number of part-time hours per week."
  },

  {
    id: "permanent_position_yes",
    required: true,
    validate: () => validateRadioGroup(["permanent_position_yes", "permanent_position_no"]),
    message: "Please select whether this is a permanent position."
  },

  {
    id: "new_position_yes",
    required: true,
    validate: () => validateRadioGroup(["new_position_yes", "new_position_no"]),
    message: "Please select whether this is a new position."
  },

  {
    id: "wages_dollar",
    required: true,
    validate: isMoney,
    message: "Enter a valid wage dollar amount."
  },

  {
    id: "wages_time",
    required: true,
    validate: v => v.trim() !== "",
    message: "Specify the wage period."
  },

  {
    id: "worksite_same_yes",
    required: true,
    validate: () => validateRadioGroup(["worksite_same_yes", "worksite_same_no"]),
    message: "Please select whether the worksite address is the same as Part 1."
  },

  {
    id: "worksite_street",
    required: true,
    condition: isDifferentWorksiteAddress,
    validate: v => v.trim() !== "",
    message: "Worksite street number and name is required."
  },

  {
    id: "worksite_apt",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "worksite_flr",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "worksite_ste",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "worksite_number",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "worksite_city",
    required: true,
    condition: isDifferentWorksiteAddress,
    validate: v => v.trim() !== "",
    message: "Worksite city or town is required."
  },

  {
    id: "worksite_state",
    required: true,
    condition: isDifferentWorksiteAddress,
    validate: v => v.trim() !== "",
    message: "Worksite state is required."
  },

  {
    id: "worksite_zip",
    required: true,
    condition: isDifferentWorksiteAddress,
    validate: v => /^[0-9]{5}(-[0-9]{4})?$/.test(v.trim()),
    message: "Please enter a valid ZIP Code (##### or #####-####)."
  }

];
