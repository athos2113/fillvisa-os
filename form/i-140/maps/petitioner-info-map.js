const fields = [

  /* =====================================================
     Petitioner Contact Information
     ===================================================== */
  {
    id: "petitioner_lastname",
    validate: v => v.trim() !== "",
    message:
      "Please provide last name."
  },

  {
    id: "petitioner_firstname",
    validate: v => v.trim() !== "",
    message:
      "Please provide first name."
  },

  {
    id: "petitioner_title",
    validate: () => true,
    message: ""
  },

  {
    id: "petitioner_telephone",
    validate: v => v.trim() !== "",
    message:
      "Please provide daytime telephone number."
  },

  {
    id: "petitioner_mobile",
    validate: () => true,
    message: ""
  },

  {
    id: "petitioner_email",
    validate: v =>
      v.trim() === "" ||
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    message:
      "Please enter a valid email address."
  }

];
