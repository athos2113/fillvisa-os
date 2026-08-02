const fields = [

  /* =====================================================
     Children Count
     ===================================================== */

  {
    id: "number_children",
    validate: v => v !== "" && Number(v) >= 0,
    message:
      "Please indicate the total number of living children."
  },

  /* =====================================================
     Child 1 (optional block, but if started → required)
     ===================================================== */

  {
    id: "childone_lastname",
    validate: v => v !== "",
    message:
      "If providing Child 1 information, last and first name are required."
  },

  {
    id: "childone_firstname",
    validate: v => v !== "",
    message:
      "If providing Child 1 information, last and first name are required."
  },

  {
    id: "childone_dob",
    validate: () => true,
    message: ""
  },

  {
    id: "childone_a_number",
    validate: v =>
      v.trim() === "" || /^[0-9]{9}$/.test(v),
    message:
      "A-Number must contain exactly 9 digits."
  },

  /* =====================================================
     Child 2 (optional block, but if started → required)
     ===================================================== */

  {
    id: "childtwo_lastname",
    validate: v => v !== "",
    message:
      "If providing Child 2 information, last and first name are required."
  },

  {
    id: "childtwo_firstname",
    validate: v => v !== "",
    message:
      "If providing Child 2 information, last and first name are required."
  },

  {
    id: "childtwo_a_number",
    validate: v =>
      v.trim() === "" || /^[0-9]{9}$/.test(v),
    message:
      "A-Number must contain exactly 9 digits."
  }

];
