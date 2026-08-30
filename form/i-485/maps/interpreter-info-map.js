const interpreterDataIds = [
  "interpreter_lastname",
  "interpreter_firstname",
  "interpreter_businessname",
  "interpreter_telephone",
  "interpreter_mobile",
  "interpreter_email",
  "interpreter_language"
];

function hasInterpreterData() {
  return interpreterDataIds.some(id => (document.getElementById(id)?.value.trim() || "") !== "");
}

const fields = [

  /* =====================================================
     Interpreter – Full Name
     ===================================================== */

  {
    id: "interpreter_lastname",
    condition: hasInterpreterData,
    validate: v => v.trim() !== "",
    message: "Please enter the interpreter’s family name (last name)."
  },

  {
    id: "interpreter_firstname",
    condition: hasInterpreterData,
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
    condition: hasInterpreterData,
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
    condition: hasInterpreterData,
    validate: v => v.trim() !== "",
    message:
      "Please enter the language you interpreted for the applicant."
  }

];
