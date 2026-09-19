const contactFields = [

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

// A self-prepared application can leave this section blank. Once started,
// require the preparer's name and daytime phone, as on the interpreter page.
function hasPreparerData() {
   return contactFields.some(field => document.getElementById(field.id).value.trim() !== "");
}
const requiredContactIds = ["preparer_lastname", "preparer_firstname", "preparer_telephone"];
const fields = [
   ...contactFields.map(field => ({
      ...field,
      pdfField: field.id,
      type: field.id === "preparer_email" ? "email" : "text",
      required: requiredContactIds.includes(field.id) ? hasPreparerData : false
   })),
   { id: "signaturePreparer", type: "signature", required: false, validate: () => true, message: "" }
];
