const fields = [

  /* =====================================================
     Applicant Contact Information
     ===================================================== */

  {
    id: "applicant_telephone",
    validate: v => v.trim() !== "",
    message:
      "Please provide your daytime telephone number."
  },

  {
    id: "applicant_mobile",
    validate: () => true,
    message: ""
  },

  {
    id: "applicant_email",
    validate: v =>
      v.trim() === "" ||
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    message:
      "Please enter a valid email address."
  }

];
