const fields = [

  /* =====================================================
     Parent 1 – Legal Name (REQUIRED)
     ===================================================== */

  {
    id: "parentone_lastname",
    required: true,
    validate: v => v.trim() !== "",
    message: "Parent 1 family name (last name) is required."
  },

  {
    id: "parentone_firstname",
    required: true,
    validate: v => v.trim() !== "",
    message: "Parent 1 given name (first name) is required."
  },

  {
    id: "parentone_middlename",
    required: false,
    validate: () => true,
    message: ""
  },

  /* =====================================================
     Parent 1 – Name at Birth (OPTIONAL, CONSISTENT IF USED)
     ===================================================== */

  {
    id: "parentone_birth_lastname",
    required: false,
    validate: v =>
      v.trim() === "" ||
      parentone_birth_firstname.value.trim() !== "",
    message:
      "If Parent 1 name at birth is provided, both family and given names are required."
  },

  {
    id: "parentone_birth_firstname",
    required: false,
    validate: v =>
      v.trim() === "" ||
      parentone_birth_lastname.value.trim() !== "",
    message:
      "If Parent 1 name at birth is provided, both family and given names are required."
  },

  {
    id: "parentone_birth_middlename",
    required: false,
    validate: () => true,
    message: ""
  },

  /* =====================================================
     Parent 1 – Birth Info (REQUIRED)
     ===================================================== */

  {
    id: "parentone_dob",
    required: true,
    validate: v => v.trim() !== "",
    message: "Parent 1 date of birth is required."
  },

  {
    id: "parentone_country",
    required: true,
    validate: v => v.trim() !== "",
    message: "Parent 1 country of birth is required."
  },

  /* =====================================================
     Parent 2 – Legal Name (REQUIRED)
     ===================================================== */

  {
    id: "parenttwo_lastname",
    required: true,
    validate: v => v.trim() !== "",
    message: "Parent 2 family name (last name) is required."
  },

  {
    id: "parenttwo_firstname",
    required: true,
    validate: v => v.trim() !== "",
    message: "Parent 2 given name (first name) is required."
  },

  {
    id: "parenttwo_middlename",
    required: false,
    validate: () => true,
    message: ""
  },

  /* =====================================================
     Parent 2 – Name at Birth (OPTIONAL, CONSISTENT IF USED)
     ===================================================== */

  {
    id: "parenttwo_birth_lastname",
    required: false,
    validate: v =>
      v.trim() === "" ||
      parenttwo_birth_firstname.value.trim() !== "",
    message:
      "If Parent 2 name at birth is provided, both family and given names are required."
  },

  {
    id: "parenttwo_birth_firstname",
    required: false,
    validate: v =>
      v.trim() === "" ||
      parenttwo_birth_lastname.value.trim() !== "",
    message:
      "If Parent 2 name at birth is provided, both family and given names are required."
  },

  {
    id: "parenttwo_birth_middlename",
    required: false,
    validate: () => true,
    message: ""
  },

  /* =====================================================
     Parent 2 – Birth Info (REQUIRED)
     ===================================================== */

  {
    id: "parenttwo_dob",
    required: true,
    validate: v => v.trim() !== "",
    message: "Parent 2 date of birth is required."
  },

  {
    id: "parenttwo_country",
    required: true,
    validate: v => v.trim() !== "",
    message: "Parent 2 country of birth is required."
  }

];
