const part2Groups = [
  {
    name: "family",
    ids: [
      "familybased_spouse",
      "familybased_unmarried",
      "familybased_parent",
      "familybased_fiancee",
      "familybased_widow",
      "familybased_deceased",
      "familybased_other_unmarried",
      "familybased_other_married",
      "familybased_other_brother",
      "familybased_relative_spouse",
      "familybased_relative_child",
      "familybased_relative_unmarried",
      "familybased_vawa_spouse",
      "familybased_vawa_child",
      "familybased_vawa_parent"
    ]
  },
  {
    name: "employment",
    ids: [
      "employment_investor",
      "employment_extraordinary",
      "employment_professor",
      "employment_manager",
      "employment_advanced_degree",
      "employment_professional",
      "employment_skilled",
      "employment_other_worker",
      "employment_niw"
    ]
  },
  {
    name: "special_immigrant",
    ids: [
      "specialimmigrant_juvenile",
      "specialimmigrant_afghan",
      "specialimmigrant_broadcaster",
      "specialimmigrant_g4",
      "specialimmigrant_armed",
      "specialimmigrant_panama",
      "specialimmigrant_physicians",
      "specialimmigrant_employee",
      "specialimmigrant_religion",
      "specialimmigrant_other_religion"
    ]
  },
  {
    name: "asylum_refugee",
    ids: [
      "asylum_status",
      "refugee_status"
    ]
  },
  {
    name: "trafficking_cr",
    ids: [
      "human_trafficking",
      "crime_victim"
    ]
  },
  {
    name: "special_programs",
    ids: [
      "specialprogram_cuban",
      "specialprogram_battery",
      "specialprogram_haitian",
      "specialprogram_extreme",
      "specialprogram_lautenberg",
      "specialprogram_diplomat",
      "specialprogram_vietnam",
      "specialprogram_amerasian"
    ]
  },
  {
    name: "additional",
    ids: [
      "additionaloption_diversity",
      "additionaloption_residence",
      "additionaloption_individual",
      "additionaloption_nonimmigrant",
      "additionaloption_other"
    ]
  }
];


function isGroupSelected(group) {
  return group.ids.some(id => {
    const el = document.getElementById(id);
    return el && el.checked;
  });
}


const fields = [

  // EOIR question (required)
  {
    id: "adjustment_eoir_yes",
    validate: () =>
      adjustment_eoir_yes.checked || adjustment_eoir_no.checked,
    message: "Please select Yes or No."
  },
  
  {
    id: "i485CategoryAccordion",
    required: true,
    validate: () => {
      const selectedGroups = part2Groups.filter(isGroupSelected);
      return selectedGroups.length === 1;
    },
    message:
      "Please select exactly ONE eligibility category in Part 2 (Items 3.a–3.g)."
  },


  // Underlying petition info (optional)
  {
    id: "eoir_number",
    validate: () => true,
    message: ""
  },

  {
    id: "eoir_date",
    validate: () => true,
    message: ""
  },

  // Principal vs Derivative (required)
  {
    id: "i485_principal",
    validate: () =>
      i485_principal.checked || i485_derivative.checked,
    message: "Please select whether you are a principal or derivative applicant."
  },

  // Principal applicant details (only if derivative)
  {
    id: "principal_lastname",
    validate: v =>
      !i485_derivative.checked || v.trim() !== "",
    message: "Enter the principal applicant’s last name."
  },

  {
    id: "principal_firstname",
    validate: v =>
      !i485_derivative.checked || v.trim() !== "",
    message: "Enter the principal applicant’s first name."
  },

  {
    id: "principal_middlename",
    validate: () => true,
    message: ""
  },

  {
    id: "principal_a_number",
    validate: () => true,
    message: ""
  },

  {
    id: "principal_dob",
    validate: v =>
      !i485_derivative.checked || v !== "",
    message: "Enter the principal applicant’s date of birth."
  },

//   3a
  {
    id: "__part2__", // synthetic field (not a real DOM id)
    validate: () => {
      const selectedGroups = part2Groups.filter(isGroupSelected);
      return selectedGroups.length === 1;
    },
    message:
      "Please select exactly ONE eligibility category in Part 2 (Items 3.a – 3.g)."
  },
  {
    id: "adjustment_ina_yes",
    required: true,
    validate: () => {
        const yes = document.getElementById("adjustment_ina_yes");
        const no  = document.getElementById("adjustment_ina_no");

        const selected = yes.checked || no.checked;

        if (!selected) {
          yes.classList.add("is-invalid");
          no.classList.add("is-invalid");
          yes.classList.remove("is-valid");
          no.classList.remove("is-valid");
        } else {
          yes.classList.remove("is-invalid");
          no.classList.remove("is-invalid");
          yes.classList.add("is-valid");
          no.classList.add("is-valid");
        }

        return selected;
    },
    message: "Please select Yes or No."
  },

  {
    id: "cspa_yes",
    required: true,
    validate: () => {
        const yes = document.getElementById("cspa_yes");
        const no  = document.getElementById("cspa_no");

        const selected = yes.checked || no.checked;

        if (!selected) {
          yes.classList.add("is-invalid");
          no.classList.add("is-invalid");
          yes.classList.remove("is-valid");
          no.classList.remove("is-valid");
        } else {
          yes.classList.remove("is-invalid");
          no.classList.remove("is-invalid");
          yes.classList.add("is-valid");
          no.classList.add("is-valid");
        }

        return selected;
    },
    message: "Please select Yes or No."
  },

  

];
