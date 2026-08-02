function isEmployerRowActive(row) {
  return [
    `employer_name_${row}`,
    `employer_fromdate_${row}`,
    `employer_occupation_${row}`
  ].some(id => {
    const el = document.getElementById(id);
    return el && el.value.trim() !== "";
  });
}


const fields = [

  // ===== ROW 1 (required) =====
  {
    id: "employer_name_1",
    label: "Employer or school name",
    validate: v => v.trim() !== "",
    message: "Please enter the employer or school name."
  },
  {
    id: "employer_fromdate_1",
    label: "From date",
    validate: v => v !== "",
    message: "Please enter the start date."
  },
  {
    id: "employer_occupation_1",
    label: "Occupation or field of study",
    validate: v => v.trim() !== "",
    message: "Please enter your occupation or field of study."
  },

  // ===== ROW 2 =====
  {
    id: "employer_name_2",
    condition: () => isEmployerRowActive(2),
    validate: v => v.trim() !== "",
    message: "Please enter the employer or school name."
  },
  {
    id: "employer_fromdate_2",
    condition: () => isEmployerRowActive(2),
    validate: v => v !== "",
    message: "Please enter the start date."
  },
  {
    id: "employer_todate_2",
    condition: () => isEmployerRowActive(2),
    validate: v => v !== "",
    message: "Please enter the end date."
  },

  // ===== ROW 3 =====
  {
    id: "employer_name_3",
    condition: () => isEmployerRowActive(3),
    validate: v => v.trim() !== "",
    message: "Please enter the employer or school name."
  },
  {
    id: "employer_fromdate_3",
    condition: () => isEmployerRowActive(3),
    validate: v => v !== "",
    message: "Please enter the start date."
  },
  {
    id: "employer_todate_3",
    condition: () => isEmployerRowActive(3),
    validate: v => v !== "",
    message: "Please enter the end date."
  },

  // Additional info (optional)
  {
    id: "employment_additional_info",
    validate: () => true,
    message: ""
  }
];
