// As with the interpreter, blank means the applicant did not use a preparer.
function hasPreparerData() {
  if (typeof signatureBuffer !== "undefined" && signatureBuffer) return true;
  return ["lastname", "firstname", "businessname", "telephone", "mobile", "email"]
    .some(name => document.getElementById("preparer_" + name).value.trim() !== "");
}

const fields = [

  /* =====================================================
     Preparer – Full Name
     ===================================================== */

  {
    id: "preparer_lastname",
    required: true,
    condition: hasPreparerData,
    validate: v => v.trim() !== "",
    message:
      "Please enter the preparer’s family name (last name)."
  },

  {
    id: "preparer_firstname",
    required: true,
    condition: hasPreparerData,
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
    required: true,
    condition: hasPreparerData,
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
