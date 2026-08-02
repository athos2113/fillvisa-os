const fields = [

  /* =====================================================
     Marital Status
     ===================================================== */

  {
    id: "marital_status",
    validate: () =>
      maritialstatus_single.checked ||
      maritialstatus_married.checked ||
      maritialstatus_divorced.checked ||
      maritialstatus_widowed.checked ||
      maritialstatus_annulled.checked ||
      maritialstatus_seperated.checked,
    message:
      "Please select your current marital status."
  },

  {
    id: "marital_armed",
    validate: () =>
      maritialstatus_armed_na.checked ||
      maritialstatus_armed_yes.checked ||
      maritialstatus_armed_no.checked,
    message:
      "Please indicate whether your spouse is a member of the U.S. armed forces or select N/A."
  },

  {
    id: "maritialstatus_marriage_number",
    validate: v =>
      v !== "" && Number(v) >= 0,
    message:
      "Please indicate how many times you have been married."
  },

  {
    id: "currentspouse_lastname",
    validate: v => v.trim() !== "",
    message: "Please provide your current spouse’s last name."
  },

  {
    id: "currentspouse_firstname",
    validate: v => v.trim() !== "",
    message: "Please provide your current spouse’s first name."
  },

  {
    id: "currentspouse_dob",
    validate: v => v.trim() !== "",
    message: "Please provide your current spouse’s date of birth."
  },

  {
    id: "currentspouse_country_birth",
    validate: v => v.trim() !== "",
    message: "Please provide your current spouse’s country of birth."
  },

  {
    id: "currentspouse_marriage_date",
    validate: v => v.trim() !== "",
    message: "Please provide the date of marriage to your current spouse."
  },

  {
    id: "currentspouse_apply",
    validate: v => v.trim() !== "",
    message:
      "Please indicate whether your current spouse is applying with you."
  },

  {
    id: "priorspouse_lastname",
    validate: v => v.trim() !== "",
    message:
      "Please provide your prior spouse’s last name."
  },

  {
    id: "priorspouse_firstname",
    validate: v => v.trim() !== "",
    message:
      "Please provide your prior spouse’s first name."
  },

  {
    id: "priorspouse_marriage_date",
    validate: v => v.trim() !== "",
    message:
      "Please provide the date of marriage to your prior spouse."
  },

  {
    id: "priorspouse_marriage_date_ended",
    validate: v => v.trim() !== "",
    message:
      "Please provide the date the prior marriage legally ended."
  },

  {
    id: "priorspouse_ended",
    validate: v => v.trim() !== "",
    message:
      "Please indicate how the prior marriage ended."
  },

  {
    id: "priorspouse_ended_other_explain",
    validate: v => v.trim() !== "",
    message:
      "Please explain how the prior marriage ended."
  }

];
