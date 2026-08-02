const fields = [

  /* =====================================================
     Preparer – Full Name
     ===================================================== */

  {
    id: "preparer_lastname",
    validate: v => v.trim() !== "",
    message:
      "Please enter the preparer’s family name (last name)."
  },

  {
    id: "preparer_firstname",
    validate: v => v.trim() !== "",
    message:
      "Please enter the preparer’s given name (first name)."
  },

  {
    id: "preparer_businessname",
    validate: () => true,
    message: ""
  },

  /* =====================================================
     Preparer – Contact Information
     ===================================================== */

  {
    id: "preparer_telephone",
    validate: v => v.trim() !== "",
    message:
      "Please provide the preparer’s daytime telephone number."
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
      "Please enter a valid email address for the preparer."
  }

];
