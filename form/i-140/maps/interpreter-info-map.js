const fields = [

  /* =====================================================
     Petitioner Contact Information
     ===================================================== */
  {
    id: "interpreter_lastname",
    validate: v => v.trim() !== "",
    message:
      "Please provide last name."
  },

  {
    id: "interpreter_firstname",
    validate: v => v.trim() !== "",
    message:
      "Please provide first name."
  },

  {
    id: "interpreter_businessname",
    validate: () => true,
    message: ""
  },

  {
    id: "interpreter_telephone",
    validate: v => v.trim() !== "",
    message:
      "Please provide daytime telephone number."
  },

  {
    id: "interpreter_mobile",
    validate: () => true,
    message: ""
  },

  {
    id: "interpreter_email",
    validate: v =>
      v.trim() === "" ||
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    message:
      "Please enter a valid email address."
  },

  {
    id: "interpreter_language",
    validate: v => v.trim() !== "",
    message:
      "Please enter the language you interpreted for the applicant."
  }

];
