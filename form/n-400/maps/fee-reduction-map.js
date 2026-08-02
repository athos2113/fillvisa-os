const fields = [

  /* =====================================================
     1. Household income ≤ 400% FPG
     ===================================================== */
  {
    id: "poverty_yes",
    validate: () =>
      poverty_yes.checked || poverty_no.checked,
    message:
      "Please indicate whether your household income is less than or equal to 400% of the Federal Poverty Guidelines."
  },
  {
    id: "poverty_no",
    validate: () =>
      poverty_yes.checked || poverty_no.checked,
    message:
      "Please indicate whether your household income is less than or equal to 400% of the Federal Poverty Guidelines."
  },

  /* =====================================================
     2. Total household income
     ===================================================== */
  {
    id: "total_income",
    condition: () => poverty_yes.checked,
    validate: v => v.trim() !== "",
    message:
      "Please enter your total household income."
  },

  /* =====================================================
     3. Household size
     ===================================================== */
  {
    id: "house_size",
    condition: () => poverty_yes.checked,
    validate: v => v.trim() !== "",
    message:
      "Please enter your household size."
  },

  /* =====================================================
     4. Number of income earners
     ===================================================== */
  {
    id: "number_of_earners",
    condition: () => poverty_yes.checked,
    validate: v => v.trim() !== "",
    message:
      "Please enter the number of household members earning income."
  },

  /* =====================================================
     5.a Head of household
     ===================================================== */
  {
    id: "headhouse_yes",
    condition: () => poverty_yes.checked,
    validate: () =>
      headhouse_yes.checked || headhouse_no.checked,
    message:
      "Please indicate whether you are the head of household."
  },
  {
    id: "headhouse_no",
    condition: () => poverty_yes.checked,
    validate: () =>
      headhouse_yes.checked || headhouse_no.checked,
    message:
      "Please indicate whether you are the head of household."
  },

  /* =====================================================
     5.b Name of head of household
     ===================================================== */
  {
    id: "househead_name",
    condition: () =>
      poverty_yes.checked && headhouse_no.checked,
    validate: v => v.trim() !== "",
    message:
      "Please provide the name of the head of household."
  }

];
