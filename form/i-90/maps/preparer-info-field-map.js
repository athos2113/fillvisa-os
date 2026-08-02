const fields = [

   // ============================================
   // PREPARER FULL NAME
   // ============================================
   {
      id: "preparer_family_name",
      label: "Preparer Family Name",
      validate: (v) => v.trim() !== "",
      message: "Please enter the preparer's family name."
   },
   {
      id: "preparer_given_name",
      label: "Preparer Given Name",
      validate: (v) => v.trim() !== "",
      message: "Please enter the preparer's given name."
   },
   {
      id: "preparer_business",
      label: "Preparer Business/Organization Name",
      validate: () => true,     // optional
      message: ""
   },

   // ============================================
   // PREPARER MAILING ADDRESS
   // ============================================
   {
      id: "preparer_mailing_street",
      label: "Preparer Street Number & Name",
      validate: (v) => v.trim() !== "",
      message: "Street address is required."
   },

   // 3.b Unit Type – Optional
   {
      id: "preparer_mailing_unit_type",
      label: "Unit type (Apt, Ste, Flr)",
      validate: () => true,
      message: ""
   },

   // Number – optional
   {
      id: "preparer_mailing_number",
      label: "Unit Number",
      validate: () => true,
      message: ""
   },

   {
      id: "preparer_mailing_city",
      label: "City / Town",
      validate: (v) => v.trim() !== "",
      message: "City is required."
   },
   {
      id: "preparer_mailing_state",
      label: "State",
      validate: (v) => v.trim() !== "",
      message: "State is required."
   },
   {
      id: "preparer_mailing_zip",
      label: "ZIP Code",
      validate: (v) => /^[0-9\-]{5,10}$/.test(v.trim()),
      message: "Please enter a valid ZIP Code."
   },

   // Province (optional)
   {
      id: "preparer_mailing_province",
      label: "Province",
      validate: () => true,
      message: ""
   },
   // Postal Code (optional)
   {
      id: "preparer_mailing_postal_code",
      label: "Postal Code",
      validate: () => true,
      message: ""
   },
   {
      id: "preparer_mailing_country",
      label: "Country",
      validate: (v) => v.trim() !== "",
      message: "Country is required."
   },

   // ============================================
   // PREPARER CONTACT INFORMATION
   // ============================================
   {
      id: "preparer_telephone",
      label: "Preparer Daytime Telephone Number",
      validate: (v) => v.trim() !== "",
      message: "Please enter the preparer's daytime phone number."
   },

   {
      id: "preparer_mobile",
      label: "Preparer Mobile Number",
      validate: () => true,  // optional
      message: ""
   },
   {
      id: "preparer_email",
      label: "Preparer Email",
      validate: (v) => {
         if (v.trim() === "") return true; // optional
         return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "Please enter a valid email address."
   },

   // ============================================
   // PREPARER STATEMENT
   // ============================================
   {
      id: "preparer_status",
      label: "Preparer Status",
      validate: () => document.querySelector('input[name="preparer_status"]:checked'),
      message: "Please select the preparer's status."
   },

   // Conditional: Only required if preparer_status == attorney
   {
      id: "representation_scope",
      label: "Representation Scope",
      condition: () => document.querySelector('input[name="preparer_status"]:checked')?.value === "attorney",
      validate: () => {
         const selected = document.querySelector('input[name="representation_scope"]:checked');
         return selected ? true : false;
      },
      message: "Please select whether representation extends or does not extend."
   }

];
