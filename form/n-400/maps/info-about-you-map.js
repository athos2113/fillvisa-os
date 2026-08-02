// name-info-field-map.js

const fields = [

   // === 1. Current legal name (required) ===
   {
      id: "last_name",
      // label: "Family Name (Last Name)",
      validate: v => v !== "",
      message: "Please enter your family name (last name)."
   },

   {
      id: "first_name",
      label: "Given Name (First Name)",
      required: true,
      validate: (v) => v.trim() !== "",
      message: "Please enter your given name (first name)."
   },

   {
      id: "middle_name",
      label: "Middle Name",
      validate: () => true, // optional
      message: ""
   },

   // === 2. Other names – row 1 (conditionally required as a group) ===
   {
    id: "othername_lastname_1",
    label: "Other Name – Family Name (Row 1)",
    validate: () => {
        const ln = document.getElementById("othername_lastname_1").value.trim();
        const fn = document.getElementById("othername_firstname_1").value.trim();
        const mn = document.getElementById("othername_middlename_1").value.trim();

        // All empty → valid
        if (!ln && !fn && !mn) return true;

        // PARTIAL typing → do NOT invalidate yet
        if (ln && !fn) return true;
        if (fn && !ln) return true;

        // Fully filled → valid
        return ln !== "" && fn !== "";
    },
    message: "Please complete both last name and first name for the other name."
    },
   {
      id: "othername_firstname_1",
      label: "Other Name – Given Name (Row 1)",
      validate: () => true, // validated via lastname_1
      message: ""
   },

   {
      id: "othername_middlename_1",
      label: "Other Name – Middle Name (Row 1)",
      validate: () => true,
      message: ""
   },

   // === 3. Other names – row 2 (conditional + grouped) ===
   {
      id: "othername_lastname_2",
      label: "Other Name – Family Name (Row 2)",
      condition: () => {
         // Row 2 is considered active if any value exists
         return (
            document.getElementById("othername_lastname_2")?.value.trim() !== "" ||
            document.getElementById("othername_firstname_2")?.value.trim() !== "" ||
            document.getElementById("othername_middlename_2")?.value.trim() !== ""
         );
      },
      validate: () => {
            const ln = document.getElementById("othername_lastname_2").value.trim();
            const fn = document.getElementById("othername_firstname_2").value.trim();
            const mn = document.getElementById("othername_middlename_2").value.trim();

            // All empty → valid
            if (!ln && !fn && !mn) return true;

            // PARTIAL typing → do NOT invalidate yet
            if (ln && !fn) return true;
            if (fn && !ln) return true;

            // Fully filled → valid
            return ln !== "" && fn !== "";


      },
      message: "Please complete both last name and first name for the second other name."
   },

   {
      id: "othername_firstname_2",
      label: "Other Name – Given Name (Row 2)",
      validate: () => true,
      message: ""
   },

   {
      id: "othername_middlename_2",
      label: "Other Name – Middle Name (Row 2)",
      validate: () => true,
      message: ""
   },



   // -----------------------------------------------------
   // 1. Name change decision (REQUIRED: yes or no)
   // -----------------------------------------------------
   {
      id: "name_change_yes",
      required: true,
      validate: () => {
         const yes = document.getElementById("name_change_yes");
         const no  = document.getElementById("name_change_no");

         const isSelected = yes.checked || no.checked;

         // 🔴 Highlight BOTH radios on error
         if (!isSelected) {
               yes.classList.add("is-invalid");
               no.classList.add("is-invalid");
         } else {
               yes.classList.remove("is-invalid");
               no.classList.remove("is-invalid");
               yes.classList.add("is-valid");
               no.classList.add("is-valid");
         }

         return isSelected;
      },
      message: "Please select Yes or No."
   },

   // -----------------------------------------------------
   // 2. New First Name (REQUIRED only if Yes)
   // -----------------------------------------------------
   {
      id: "changename_firstname",
      required: true , // conditional requirement
      condition: () => document.getElementById("name_change_yes")?.checked,
      validate: v => v.trim() !== "",
      message: "Please enter the new given name (first name) you would like to use."
   },

   // -----------------------------------------------------
   // 3. New Last Name (optional, but validated if shown)
   // -----------------------------------------------------
   {
      id: "changename_lastname",
      required: false,
      condition: () => document.getElementById("name_change_yes")?.checked,
      validate: v => true,
      message: ""
   },

   // -----------------------------------------------------
   // 4. New Middle Name (optional)
   // -----------------------------------------------------
   {
      id: "changename_middlename",
      required: false,
      condition: () => document.getElementById("name_change_yes")?.checked,
      validate: v => true,
      message: ""
   },


   // === USCIS Online Account Number (optional) ===
   {
      id: "uscis_number",
      required: false,
      validate: v => true,
      message: ""
   },

   // === Sex (required: male or female) ===
   {
      id: "sex_male", // anchor
      required: true,
      validate: () => {
         const male = document.getElementById("sex_male");
         const female = document.getElementById("sex_female");

         const selected = male.checked || female.checked;

         // Highlight both radios
         if (!selected) {
               male.classList.add("is-invalid");
               female.classList.add("is-invalid");
         } else {
               male.classList.remove("is-invalid");
               female.classList.remove("is-invalid");
               male.classList.add("is-valid");
               female.classList.add("is-valid");
         }

         return selected;
      },
      message: "Please select your sex."
   },


   /* =====================================================
     A-Number
     ===================================================== */
  {
    id: "a_number",
    validate: v => /^[0-9]{9}$/.test(v),
    message:
      "Please enter a valid 9-digit A-Number."
  },


   // === Date of Birth (required) ===
   {
      id: "dob",
      required: true,
      validate: (v) => {
         if (!v) return false;

         const selected = new Date(v);
         const today = new Date();

         // Clear time for accurate comparison
         today.setHours(0, 0, 0, 0);

         // Must be a valid date and not in the future
         return !isNaN(selected.getTime()) && selected <= today;
      },
      message: "Please enter a valid date of birth."
   },

   // === Additional DOB information (optional) ===
   {
      id: "dob_additional_info",
      required: false,
      validate: v => true,
      message: ""
   },


   // === Lawful Permanent Resident Date (optional) ===
   {
      id: "permanent_resident_date",
      required: false,
      validate: (v) => {
         if (!v) return true;

         const d = new Date(v);
         if (isNaN(d.getTime())) return false;

         const today = new Date();
         today.setHours(0, 0, 0, 0);

         return d <= today;
      },
      message: "Please enter a valid date that is not in the future."
   },

   // === Country of Birth (required) ===
   {
      id: "country_of_birth",
      required: true,
      validate: v => v.trim() !== "",
      message: "Country of birth is required."
   },

   // === Country of Citizenship or Nationality (required) ===
   {
      id: "country_of_citizenship",
      required: true,
      validate: v => v.trim() !== "",
      message: "Country of citizenship or nationality is required."
   },

   // === Additional citizenship information (optional) ===
   {
      id: "citizenship_additional_info",
      required: false,
      validate: v => true,
      message: ""
   },



   // === 10. Parent U.S. citizen before 18 (required) ===
   {
      id: "parent_citizen_yes",
      required: true,
      validate: () => {
         const yes = document.getElementById("parent_citizen_yes");
         const no  = document.getElementById("parent_citizen_no");

         const selected = yes.checked || no.checked;

         if (!selected) {
               yes.classList.add("is-invalid");
               no.classList.add("is-invalid");
         } else {
               yes.classList.remove("is-invalid");
               no.classList.remove("is-invalid");
               yes.classList.add("is-valid");
               no.classList.add("is-valid");
         }

         return selected;
      },
      message: "Please select Yes or No."
   },

   // === 11. Disability exemption (required) ===
   {
      id: "disability_exemption_yes",
      required: true,
      validate: () => {
         const yes = document.getElementById("disability_exemption_yes");
         const no  = document.getElementById("disability_exemption_no");

         const selected = yes.checked || no.checked;

         if (!selected) {
               yes.classList.add("is-invalid");
               no.classList.add("is-invalid");
         } else {
               yes.classList.remove("is-invalid");
               no.classList.remove("is-invalid");
               yes.classList.add("is-valid");
               no.classList.add("is-valid");
         }

         return selected;
      },
      message: "Please select Yes or No."
   },



   // === 12.a SSA Update (required) ===
   {
      id: "ssa_update_yes",
      required: true,
      validate: () => {
         const yes = document.getElementById("ssa_update_yes");
         const no  = document.getElementById("ssa_update_no");

         const selected = yes.checked || no.checked;

         if (!selected) {
               yes.classList.add("is-invalid");
               no.classList.add("is-invalid");
         } else {
               yes.classList.remove("is-invalid");
               no.classList.remove("is-invalid");
               yes.classList.add("is-valid");
               no.classList.add("is-valid");
         }

         return selected;
      },
      message: "Please select Yes or No."
   },

   // === 12.b SSN (optional) ===
   {
      id: "ssn_number",
      required: false,
      condition: () => document.getElementById("ssa_update_yes").checked,
      validate: v => true,
      message: ""
   },

   // === 12.c Consent (required IF 12.a = Yes, must be Yes) ===
   {
      id: "ssa_consent_yes",
      required: false,
      condition: () => document.getElementById("ssa_update_yes").checked,
      validate: () => {
         const yes = document.getElementById("ssa_consent_yes");
         const no  = document.getElementById("ssa_consent_no");

         const valid = yes.checked;

         if (!valid) {
               yes.classList.add("is-invalid");
               no.classList.add("is-invalid");
         } else {
               yes.classList.remove("is-invalid");
               no.classList.remove("is-invalid");
               yes.classList.add("is-valid");
               no.classList.add("is-valid");
         }

         return valid;
      },
      message: "You must consent to receive a Social Security card."
   },





];
