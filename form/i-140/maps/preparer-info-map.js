const fields = [

  /* =====================================================
     Petitioner Contact Information
     ===================================================== */
  {
    id: "preparer_lastname",
    validate: v => v.trim() !== "",
    message:
      "Please provide last name."
  },

  {
    id: "preparer_firstname",
    validate: v => v.trim() !== "",
    message:
      "Please provide first name."
  },

  {
    id: "preparer_businessname",
    validate: () => true,
    message: ""
  },

  {
    id: "preparer_telephone",
    validate: v => v.trim() !== "",
    message:
      "Please provide daytime telephone number."
  },

  {
    id: "preparer_mobile",
    validate: () => true,
    message: ""
  },

  {
    id: "preparer_email",
    validate: v =>
      v.trim() === "" ||
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    message:
      "Please enter a valid email address."
  }

];
