const fields = [

  /* =====================================================
     Interpreter – Full Name
     ===================================================== */

  {
    id: "interpreter_lastname",
    // required: true,
    // validate: v => v.trim() !== "",
    validate: () => true,
    // message: "Please enter the interpreter’s family name (last name)."
    message: ""
  },

  {
    id: "interpreter_firstname",
    validate: v => v.trim() !== "",
    message:
      "Please enter the interpreter’s given name (first name)."
  },

  {
    id: "interpreter_businessname",
    validate: () => true,
    message: ""
  },

  /* =====================================================
     Interpreter – Contact Information
     ===================================================== */

  {
    id: "interpreter_telephone",
    validate: v => v.trim() !== "",
    message:
      "Please provide the interpreter’s daytime telephone number."
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
      "Please enter a valid email address for the interpreter."
  },

  {
    id: "interpreter_language",
    validate: v => v.trim() !== "",
    message:
      "Please enter the language you interpreted for the applicant."
  }

];
