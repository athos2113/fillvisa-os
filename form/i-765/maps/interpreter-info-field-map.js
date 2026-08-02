const fields = [

   // ============================
   // INTERPRETER'S FULL NAME
   // ============================
   {
      id: "interpreter_family_name",
      label: "Interpreter Family Name",
      validate: (v) => v.trim() !== "",
      message: "Please enter the interpreter’s family name."
   },
   {
      id: "interpreter_given_name",
      label: "Interpreter Given Name",
      validate: (v) => v.trim() !== "",
      message: "Please enter the interpreter’s given name."
   },
   {
      id: "interpreter_business",
      label: "Interpreter Business/Organization",
      validate: () => true,     // optional
      message: ""
   },

   // ============================
   // MAILING ADDRESS
   // ============================
   {
      id: "interpreter_mailing_street",
      label: "Interpreter Street Address",
      validate: (v) => v.trim() !== "",
      message: "Street address is required."
   },

   // 3.b Unit Type (checkbox-like radios)
   {
      id: "interpreter_mailing_unit_type",
      label: "Unit Type",
      validate: () => true,     // optional
      message: ""
   },

   {
      id: "interpreter_mailing_number",
      label: "Unit Number",
      validate: () => true,     // optional
      message: ""
   },

   {
      id: "interpreter_mailing_city",
      label: "City",
      validate: (v) => v.trim() !== "",
      message: "City is required."
   },

   {
      id: "interpreter_mailing_state",
      label: "State",
      validate: (v) => v.trim() !== "",
      message: "State is required."
   },

   {
      id: "interpreter_mailing_zip",
      label: "ZIP Code",
      validate: (v) => /^[0-9\-]{5,10}$/.test(v.trim()),
      message: "Please enter a valid ZIP Code."
   },

   // Province / Postal Code / Country (optional but valid if filled)
   {
      id: "interpreter_mailing_province",
      label: "Province",
      validate: () => true,
      message: ""
   },
   {
      id: "interpreter_mailing_postal_code",
      label: "Postal Code",
      validate: () => true,
      message: ""
   },
   {
      id: "interpreter_mailing_country",
      label: "Country",
      validate: (v) => v.trim() !== "",
      message: "Country is required."
   },

   // ============================
   // CONTACT INFORMATION
   // ============================
   {
      id: "interpreter_telephone",
      label: "Interpreter Daytime Telephone",
      validate: (v) => v.trim() !== "",
      message: "Interpreter daytime phone number is required."
   },

   {
      id: "interpreter_mobile",
      label: "Interpreter Mobile Phone",
      validate: () => true,
      message: ""
   },

   {
      id: "interpreter_email",
      label: "Interpreter Email",
      validate: (v) => {
         if (v.trim() === "") return true; // optional
         return /\S+@\S+\.\S+/.test(v);
      },
      message: "Please enter a valid email address."
   },

   // ============================
   // INTERPRETER CERTIFICATION
   // ============================
   {
      id: "interpreter_fluent_language",
      label: "Interpreter Fluent Language",
      validate: (v) => v.trim() !== "",
      message: "Please enter the language the interpreter is fluent in."
   }

];
