const fields = [

  {
    id: "permanent_resident_applied",
    required: true,
    validate: () =>
      permanent_resident_yes.checked || permanent_resident_no.checked,
    message: "Please answer whether you applied for an immigrant visa abroad."
  },

  {
    id: "permanent_resident_city",
    required: false,
    validate: () =>
      !permanent_resident_yes.checked ||
      permanent_resident_city.value.trim() !== "",
    message: "City is required if you answered Yes."
  },

  {
    id: "permanent_resident_country",
    required: false,
    validate: () =>
      !permanent_resident_yes.checked ||
      permanent_resident_country.value.trim() !== "",
    message: "Country is required if you answered Yes."
  },

  {
    id: "permanent_resident_decision",
    required: false,
    validate: () =>
      !permanent_resident_yes.checked ||
      permanent_resident_decision.value.trim() !== "",
    message: "Decision is required if you answered Yes."
  },

  {
    id: "permanent_resident_decision_date",
    required: false,
    validate: () =>
      !permanent_resident_yes.checked ||
      permanent_resident_decision_date.value.trim() !== "",
    message: "Decision date is required if you answered Yes."
  },

  {
    id: "permanent_resident_previous",
    required: true,
    validate: () =>
      permanent_resident_previous_yes.checked ||
      permanent_resident_previous_no.checked,
    message: "Please answer whether you previously applied in the U.S."
  },

  {
    id: "permanent_resident_everheld",
    required: true,
    validate: () =>
      permanent_resident_everheld_yes.checked ||
      permanent_resident_everheld_no.checked,
    message: "Please answer whether you ever held LPR status."
  },

  {
    id: "employer_choose",
    required: true,
    validate: v => v.trim() !== "",
    message: "Employer or school is required."
  },

  {
    id: "employer_name",
    required: true,
    validate: v => v.trim() !== "",
    message: "Employer, company, or school name is required."
  },

  {
    id: "employer_occupation",
    required: true,
    validate: v => v.trim() !== "",
    message: "Occupation is required."
  },

  {
    id: "employer_street",
    required: true,
    validate: v => v.trim() !== "",
    message: "Street address is required."
  },

  {
    id: "employer_city",
    required: true,
    validate: v => v.trim() !== "",
    message: "City is required."
  },

  {
    id: "employer_country",
    required: true,
    validate: v => v.trim() !== "",
    message: "Country is required."
  },

  {
    id: "employer_fromdate",
    required: true,
    validate: v => v.trim() !== "",
    message: "From date is required."
  },

  {
    id: "employer_additional_info",
    required: false,
    validate: v => v.trim() !== "",
    message: "Additional Info about current employer required."
  },

  {
    id: "outside_employer_choose",
    required: false,
    validate: v =>
      v.trim() === "" ||
      outside_employer_name.value.trim() !== "",
    message:
      "If providing outside employment, employer or school must be specified."
  },

  {
    id: "outside_employer_name",
    required: false,
    validate: v =>
      v.trim() === "" ||
      outside_employer_choose.value.trim() !== "",
    message:
      "If providing outside employment, employer or school must be specified."
  },

  {
    id: "outside_employer_street",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "outside_employer_city",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "outside_employer_country",
    required: false,
    validate: v =>
      v.trim() === "" ||
      outside_employer_name.value.trim() !== "",
    message:
      "Country is required when providing outside employment details."
  },

  {
    id: "outside_employer_fromdate",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "outside_employer_todate",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "outside_employer_support",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "outside_employer_additional_info",
    required: false,
    validate: () => true,
    message: ""
  }

];
