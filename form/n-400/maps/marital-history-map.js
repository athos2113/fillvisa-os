// Marital History

function isMarriedSelected() {
  return document.getElementById("marital_married").checked;
}

function isMarriageBasicActive() {
  return !document.getElementById("marriage_basic_block").classList.contains("d-none");
}

function isCurrentMarriageActive() {
  return !document.getElementById("current_marriage_block").classList.contains("d-none");
}

function isSpouseAddressDifferent() {
  return document.getElementById("current_spouse_address_same_no").checked;
}

function isSpouseCitizenOther() {
  return document.getElementById("current_spouse_citizen_other").checked;
}

function isSpouseEmployerRequired() {
  try {
    const data = JSON.parse(localStorage.getItem("n400-1"));
    return data && data.eligibility_spouse_outside === true;
  } catch {
    return false;
  }
}



const fields = [

  // =========================
  // 1. Marital Status (required)
  // =========================
  {
    id: "marital_status",
    label: "Current marital status",
    validate: () =>
      document.getElementById("marital_single").checked ||
      document.getElementById("marital_married").checked ||
      document.getElementById("marital_divorced").checked ||
      document.getElementById("marital_widowed").checked ||
      document.getElementById("marital_seperated").checked ||
      document.getElementById("marital_annulled").checked,
    message: "Please select your current marital status."
  },

  // =========================
  // 2. Spouse in Armed Forces
  // =========================
  {
    id: "spouse_armed_force",
    label: "Spouse a member of the U.S. armed forces",
    condition: () => isMarriageBasicActive(),
    validate: () =>
      document.getElementById("spouse_armed_force_yes").checked ||
      document.getElementById("spouse_armed_force_no").checked,
    message: "Please select Yes or No."
  },

  // =========================
  // 3. Number of marriages (user)
  // =========================
  {
    id: "number_marriages",
    label: "Number of times you have been married",
    condition: () => isMarriageBasicActive(),
    validate: v => v.trim() !== "",
    message: "Please enter the number of times you have been married."
  },

  // =========================
  // 4.a Current spouse name
  // =========================
  {
    id: "current_spouse_lastname",
    label: "Current spouse family name",
    condition: () => isCurrentMarriageActive(),
    validate: v => v.trim() !== "",
    message: "Please enter your spouse’s last name."
  },
  {
    id: "current_spouse_firstname",
    label: "Current spouse given name",
    condition: () => isCurrentMarriageActive(),
    validate: v => v.trim() !== "",
    message: "Please enter your spouse’s first name."
  },
  {
    id: "current_spouse_middlename",
    label: "Current spouse middle name",
    condition: () => isCurrentMarriageActive(),
    validate: () => true,
    message: ""
  },

  // =========================
  // 4.b / 4.c Dates
  // =========================
  {
    id: "current_spouse_dob",
    label: "Current spouse date of birth",
    condition: () => isCurrentMarriageActive(),
    validate: v => v !== "",
    message: "Please enter your spouse’s date of birth."
  },
  {
    id: "current_spouse_date_marriage",
    label: "Date you entered into marriage",
    condition: () => isCurrentMarriageActive(),
    validate: v => v !== "",
    message: "Please enter the date you entered into this marriage."
  },

  // =========================
  // 4.d Address same decision
  // =========================
  {
    id: "current_spouse_address_same",
    label: "Spouse address same as yours",
    condition: () => isCurrentMarriageActive(),
    validate: () =>
      document.getElementById("current_spouse_address_same_yes").checked ||
      document.getElementById("current_spouse_address_same_no").checked,
    message: "Please select Yes or No."
  },
  {
    id: "current_spouse_address_additional_info",
    label: "Current spouse address",
    condition: () =>
      isCurrentMarriageActive() && isSpouseAddressDifferent(),
    validate: v => v.trim() !== "",
    message: "Please provide your spouse’s current address."
  },

  // =========================
  // 5.a Spouse citizenship
  // =========================
  {
    id: "spouse_citizenship",
    label: "Spouse U.S. citizenship basis",
    condition: () => isCurrentMarriageActive(),
    validate: () =>
      document.getElementById("current_spouse_citizen_birth").checked ||
      document.getElementById("current_spouse_citizen_other").checked,
    message: "Please select how your spouse became a U.S. citizen."
  },
  {
    id: "current_spouse_citizen_date",
    label: "Date spouse became U.S. citizen",
    condition: () =>
      isCurrentMarriageActive() && isSpouseCitizenOther(),
    validate: v => v !== "",
    message: "Please enter the date your spouse became a U.S. citizen."
  },

  // =========================
  // 6. A-Number (optional)
  // =========================
  {
    id: "current_spouse_a_number",
    label: "Current spouse A-Number",
    condition: () => isCurrentMarriageActive(),
    validate: () => true,
    message: ""
  },

  // =========================
  // 7. Spouse marriages
  // =========================
  {
    id: "current_spouse_marriages",
    label: "Number of times spouse has been married",
    condition: () => isCurrentMarriageActive(),
    validate: v => v.trim() !== "",
    message: "Please enter the number of times your spouse has been married."
  },

  // =========================
  // 8. Spouse employer (INA 319(b) only)
  // =========================
  {
    id: "current_spouse_current_employer",
    label: "Current spouse employer",
    condition: () =>
      isCurrentMarriageActive() && isSpouseEmployerRequired(),
    validate: v => v.trim() !== "",
    message: "Please enter your spouse’s current employer or company."
  }

];
