const fields = [

   // =====================================================
   // 1.a / 1.b — Language Option (Required Radio)
   // =====================================================
   {
      id: "language_option",
      label: "Language option (English or Interpreter)",
      validate: () => document.querySelector('input[name="language_option"]:checked'),
      message: "Please select whether you understand English or used an interpreter."
   },

   // Interpreter language (required only if interpreter help selected)
   {
      id: "interpreter_language",
      label: "Interpreter language",
      condition: () => document.querySelector('input[name="language_option"]:checked')?.value === "interpreter",
      validate: (v) => v.trim() !== "",
      message: "Please provide the interpreter's language."
   },


   // =====================================================
   // Item 2 — Preparer (Optional checkbox + Conditional text)
   // =====================================================

   // Checkbox itself is optional — no validation needed
   // BUT if checked → preparer_name is required

   {
      id: "preparer_name",
      label: "Preparer name",
      condition: () => document.getElementById("preparer_request")?.checked === true,
      validate: (v) => v.trim() !== "",
      message: "Please provide the preparer's name."
   },


   // =====================================================
   // Item 3 — Applicant Daytime Telephone (Required)
   // =====================================================
   {
      id: "applicant_telephone",
      label: "Applicant daytime phone number",
      validate: (v) => /^[0-9()+\-\s]{7,20}$/.test(v.trim()),
      message: "Please enter a valid telephone number."
   },


   // =====================================================
   // Item 4 — Mobile (Optional)
   // =====================================================
   {
      id: "applicant_mobile",
      label: "Applicant mobile phone number",
      validate: () => true, // optional
      optional: true
   },


   // =====================================================
   // Item 5 — Email (Optional but must be valid if entered)
   // =====================================================
   {
      id: "applicant_email",
      label: "Applicant email",
      validate: (v) => {
         if (v.trim() === "") return true; // optional
         return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
      },
      message: "Please enter a valid email address."
   }

];
