
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

   {
        id: "dob",
        label: "Date of Birth",
        required: true,
        validate: (v) => v.trim() !== "",
        message: "Please enter your date of birth."
    },

    // === Have you ever used any other date of birth? ===
   {
      id: "other_dob_yes",
      required: true,
      validate: () => {
         const yes = document.getElementById("other_dob_yes");
         const no  = document.getElementById("other_dob_no");

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

    {
    id: "other_dob_1",
    required: true, // conditional requirement
    condition: () => document.getElementById("other_dob_yes")?.checked,
    validate: v => v !== "",
    message: "Please enter at least one other date of birth."
    },

    {
      id: "other_dob_2",
      condition: () => document.getElementById("other_dob_yes")?.checked,
      validate: v => v === "" || /^\d{4}-\d{2}-\d{2}$/.test(v),
      message: "Please enter a valid second other date of birth."
   },



    {
      id: "a_number_yes",
      required: true,
      validate: () => {
         const yes = document.getElementById("a_number_yes");
         const no  = document.getElementById("a_number_no");

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

    {
    id: "a_number",
    required: false,
    condition: () => document.getElementById("a_number_yes")?.checked,
    validate: v => /^[0-9]{7,9}$/.test(v),
    message: "Please enter a valid A-Number."
    },


    {
      id: "other_a_number_yes",
      required: true,
      validate: () => {
         const yes = document.getElementById("other_a_number_yes");
         const no  = document.getElementById("other_a_number_no");

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

    {
    id: "other_anumber_1",
    required: true, // conditional
    condition: () => document.getElementById("other_a_number_yes")?.checked,
    validate: v => /^[0-9]{7,9}$/.test(v),
    message: "Please enter at least one other A-Number."
    },

    {
      id: "other_anumber_2",
      condition: () => document.getElementById("other_a_number_yes")?.checked,
      validate: v => v === "" || /^[0-9]{7,9}$/.test(v),
      message: "Please enter a valid second other A-Number."
   },

    //    6.
   {
      id: "sex_male",
      required: true,
      validate: () => {
         const yes = document.getElementById("sex_male");
         const no  = document.getElementById("sex_female");

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
      message: "Please select Sex."
   },


   {
    id: "city_of_birth",
    required: true,
    validate: v => v.trim() !== "",
    message: "Please enter your city or town of birth."
    },

    {
    id: "country_of_birth",
    required: true,
    validate: v => v.trim() !== "",
    message: "Please enter your country of birth."
    },

    {
    id: "country_of_citizenship",
    required: true,
    validate: v => v.trim() !== "",
    message: "Please enter your country of citizenship or nationality."
    },

    {
    id: "uscis_number",
    required: false,
    validate: v => v === "" || /^[0-9]{10,12}$/.test(v),
    message: "Please enter a valid USCIS Online Account Number."
    },

    // 10
    {
    id: "passport_number",
    required: false,
    validate: () => true,
    message: ""
    },

    {
    id: "passport_expiration_date",
    required: false,
    validate: v => v === "" || /^\d{4}-\d{2}-\d{2}$/.test(v),
    message: "Please enter a valid expiration date of your passport or travel document."
    },

    {
    id: "passport_issued_country",
    required: false,
    validate: () => true,
    message: ""
    },

    {
    id: "visa_number",
    required: false,
    validate: v => v === "" || v.trim().length >= 3,
    message: "Please enter a valid visa number."
    },

    {
    id: "visa_issued_date",
    required: false,
    // condition: () => document.getElementById("visa_number")?.value.trim() !== "",
    // validate: v => v === "" || v !== "",
    validate: v => true,
    message: "Please enter the visa issuance date."
    },

    {
    id: "usa_arrival_city",
    required: true,
    validate: v => v.trim() !== "",
    message: "Please enter the city or town of your last arrival."
    },

    {
    id: "usa_arrival_state",
    required: true,
    validate: v => v !== "",
    message: "Please select the state of your last arrival."
    },

    {
    id: "usa_arrival_date",
    required: true,
    validate: v => v !== "",
    message: "Please enter the date of your last arrival."
    },


    {
        id: "usa_arrival_inspected_admitted",
        required: true,
        validate: () => {
            const opt1 = document.getElementById("usa_arrival_inspected_admitted");
            const opt2 = document.getElementById("usa_arrival_inspected_paroled");
            const opt3 = document.getElementById("usa_arrival_without");
            const opt4 = document.getElementById("usa_arrival_other");

            const selected =
                opt1.checked ||
                opt2.checked ||
                opt3.checked ||
                opt4.checked;

            if (!selected) {
                opt1.classList.add("is-invalid");
                opt2.classList.add("is-invalid");
                opt3.classList.add("is-invalid");
                opt4.classList.add("is-invalid");

                opt1.classList.remove("is-valid");
                opt2.classList.remove("is-valid");
                opt3.classList.remove("is-valid");
                opt4.classList.remove("is-valid");
            } else {
                opt1.classList.remove("is-invalid");
                opt2.classList.remove("is-invalid");
                opt3.classList.remove("is-invalid");
                opt4.classList.remove("is-invalid");

                opt1.classList.add("is-valid");
                opt2.classList.add("is-valid");
                opt3.classList.add("is-valid");
                opt4.classList.add("is-valid");
            }

            return selected;
        },
        message: "Please select how you last arrived in the United States."
    },


    {
    id: "usa_arrival_inspected_admitted_detail",
    required: true,
    condition: () =>
        document.getElementById("usa_arrival_inspected_admitted")?.checked,
    validate: v => v.trim() !== "",
    message: "Please specify how you were admitted."
    },

    {
    id: "usa_arrival_inspected_paroled_detail",
    required: true,
    condition: () =>
        document.getElementById("usa_arrival_inspected_paroled")?.checked,
    validate: v => v.trim() !== "",
    message: "Please specify how you were paroled."
    },

    {
    id: "usa_arrival_other_detail",
    required: true,
    condition: () =>
        document.getElementById("usa_arrival_other")?.checked,
    validate: v => v.trim() !== "",
    message: "Please specify your manner of entry."
    },


    {
        id: "last_arrival_first_yes",
        required: true,
        validate: () => {
            const y = last_arrival_first_yes;
            const n = last_arrival_first_no;
            const ok = y.checked || n.checked;

            if (!ok) {
            y.classList.add("is-invalid");
            n.classList.add("is-invalid");
            } else {
            y.classList.remove("is-invalid");
            n.classList.remove("is-invalid");
            y.classList.add("is-valid");
            n.classList.add("is-valid");
            }
            return ok;
        },
        message: "Please indicate whether this was your first arrival."
    },

    {
        id: "alien_crewman_yes",
        required: true,
        validate: () => {
            const y = alien_crewman_yes;
            const n = alien_crewman_no;
            const ok = y.checked || n.checked;

            if (!ok) {
            y.classList.add("is-invalid");
            n.classList.add("is-invalid");
            } else {
            y.classList.remove("is-invalid");
            n.classList.remove("is-invalid");
            y.classList.add("is-valid");
            n.classList.add("is-valid");
            }
            return ok;
        },
        message: "Please indicate whether you were issued an alien crewman visa."
    },

    {
        id: "join_crewman_yes",
        required: true,
        validate: () => {
            const y = join_crewman_yes;
            const n = join_crewman_no;
            const ok = y.checked || n.checked;

            if (!ok) {
            y.classList.add("is-invalid");
            n.classList.add("is-invalid");
            } else {
            y.classList.remove("is-invalid");
            n.classList.remove("is-invalid");
            y.classList.add("is-valid");
            n.classList.add("is-valid");
            }
            return ok;
        },
        message: "Please indicate whether you arrived to join a vessel or aircraft."
    },

    {
        id: "i94-number",
        required: true,
        validate: v => /^[0-9]{11}$/.test(v),
        message: "Please enter a valid 11-digit I-94 number."
    },

  /* ================= Physical Address ================= */

  {
    id: "physical_incare_of_name",
    label: "In Care Of Name",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "physical_street",
    label: "Street Number and Name",
    required: true,
    validate: v => v.trim() !== "",
    message: "Please enter your street number and name."
  },

  {
    id: "physical_apt",
    label: "Apartment",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "physical_ste",
    label: "Suite",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "physical_flr",
    label: "Floor",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "physical_number",
    label: "Number",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "physical_city",
    label: "City or Town",
    required: true,
    validate: v => v.trim() !== "",
    message: "Please enter your city or town."
  },

  {
    id: "physical_state",
    label: "State",
    required: true,
    validate: v => v.trim() !== "",
    message: "Please select your state."
  },

  {
    id: "physical_zip",
    label: "ZIP Code",
    required: true,
    validate: v => v.trim() !== "",
    message: "Please enter your ZIP Code."
  },

  {
    id: "physical_province",
    label: "Province",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "physical_postal_code",
    label: "Postal Code",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "physical_country",
    label: "Country",
    required: true,
    validate: v => v.trim() !== "",
    message: "Please enter your country."
  },

  {
    id: "physical_reside_date",
    label: "Date You First Resided at This Address",
    required: true,
    validate: v => v !== "",
    message: "Please enter the date you first resided at this address."
  },

  /* ================= Mailing Address (Yes / No) ================= */

  {
    id: "mailing_address_yes",
    required: true,
    validate: () => {
      const y = document.getElementById("mailing_address_yes");
      const n = document.getElementById("mailing_address_no");
      const ok = y.checked || n.checked;

      if (!ok) {
        y.classList.add("is-invalid");
        n.classList.add("is-invalid");
      } else {
        y.classList.remove("is-invalid");
        n.classList.remove("is-invalid");
        y.classList.add("is-valid");
        n.classList.add("is-valid");
      }
      return ok;
    },
    message: "Please indicate whether your mailing address is the same as your physical address."
  },

  /* ================= Mailing Address ================= */

  {
    id: "mailing_incare_of_name",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "mailing_street",
    required: true,
    condition: () => document.getElementById("mailing_address_no")?.checked,
    validate: v => v.trim() !== "",
    message: "Please enter your mailing street address."
  },

  {
    id: "mailing_apt",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "mailing_ste",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "mailing_flr",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "mailing_number",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "mailing_city",
    required: true,
    condition: () => document.getElementById("mailing_address_no")?.checked,
    validate: v => v.trim() !== "",
    message: "Please enter your mailing city."
  },

  {
    id: "mailing_state",
    required: true,
    condition: () => document.getElementById("mailing_address_no")?.checked,
    validate: v => v.trim() !== "",
    message: "Please select your mailing state."
  },

  {
    id: "mailing_zip",
    required: true,
    condition: () => document.getElementById("mailing_address_no")?.checked,
    validate: v => v.trim() !== "",
    message: "Please enter your mailing ZIP Code."
  },

  {
    id: "mailing_province",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "mailing_postal_code",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "mailing_country",
    required: true,
    condition: () => document.getElementById("mailing_address_no")?.checked,
    validate: v => v.trim() !== "",
    message: "Please enter your mailing country."
  },

  /* ================= Resided ≥ 5 Years (Yes / No) ================= */

  {
    id: "residing_address_yes",
    required: true,
    validate: () => {
      const y = document.getElementById("residing_address_yes");
      const n = document.getElementById("residing_address_no");
      const ok = y.checked || n.checked;

      if (!ok) {
        y.classList.add("is-invalid");
        n.classList.add("is-invalid");
      } else {
        y.classList.remove("is-invalid");
        n.classList.remove("is-invalid");
        y.classList.add("is-valid");
        n.classList.add("is-valid");
      }
      return ok;
    },
    message: "Please indicate whether you have resided at your current address for at least 5 years."
  },

  /* ================= Prior Address ================= */

  {
    id: "prior_incare_of_name",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "prior_street",
    required: true,
    condition: () => document.getElementById("residing_address_no")?.checked,
    validate: v => v.trim() !== "",
    message: "Please enter your prior street address."
  },

  {
    id: "prior_apt",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "prior_ste",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "prior_flr",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "prior_number",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "prior_city",
    required: true,
    condition: () => document.getElementById("residing_address_no")?.checked,
    validate: v => v.trim() !== "",
    message: "Please enter your prior city."
  },

  {
    id: "prior_state",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "prior_zip",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "prior_province",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "prior_postal_code",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "prior_country",
    required: true,
    condition: () => document.getElementById("residing_address_no")?.checked,
    validate: v => v.trim() !== "",
    message: "Please enter your prior country."
  },

  {
    id: "prior_reside_date_from",
    required: true,
    condition: () => document.getElementById("residing_address_no")?.checked,
    validate: v => v !== "",
    message: "Please enter the start date of your prior residence."
  },

  {
    id: "prior_reside_date_to",
    required: true,
    condition: () => document.getElementById("residing_address_no")?.checked,
    validate: v => v !== "",
    message: "Please enter the end date of your prior residence."
  },

  /* ================= Most Recent Address Outside the U.S. ================= */

  {
    id: "recent_street",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "recent_city",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "recent_state",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "recent_zip",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "recent_province",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "recent_postal_code",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "recent_country",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "recent_reside_date_from",
    required: false,
    validate: () => true,
    message: ""
  },

  {
    id: "recent_reside_date_to",
    required: false,
    validate: () => true,
    message: ""
  },

  // 19
  // === 19. Social Security Card ===
  {
    id: "ssn_issued_yes",
    required: true,
    validate: () => {
        const yes = document.getElementById("ssn_issued_yes");
        const no  = document.getElementById("ssn_issued_no");

        const selected = yes.checked || no.checked;

        if (!selected) {
          yes.classList.add("is-invalid");
          no.classList.add("is-invalid");
          yes.classList.remove("is-valid");
          no.classList.remove("is-valid");
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

  {
    id: "ssn_number",
    required: true,
    condition: () => document.getElementById("ssn_issued_yes")?.checked,
    validate: v => {
        const digits = v.replace(/\D/g, "");
        return digits.length === 9;
    },
    message: "Please enter a valid Social Security Number."
  },

  {
    id: "ssn_new_yes",
    required: true,
    validate: () => {
        const yes = document.getElementById("ssn_new_yes");
        const no  = document.getElementById("ssn_new_no");

        const selected = yes.checked || no.checked;

        if (!selected) {
          yes.classList.add("is-invalid");
          no.classList.add("is-invalid");
          yes.classList.remove("is-valid");
          no.classList.remove("is-valid");
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

  {
    id: "consent_disclosure_yes",
    required: true,
    condition: () => document.getElementById("ssn_new_yes")?.checked,
    validate: () => {
        const yes = document.getElementById("consent_disclosure_yes");
        const no  = document.getElementById("consent_disclosure_no");

        const selected = yes.checked || no.checked;
        const valid = yes.checked; // must be Yes

        if (!selected || !valid) {
          yes.classList.add("is-invalid");
          no.classList.add("is-invalid");
          yes.classList.remove("is-valid");
          no.classList.remove("is-valid");
        } else {
          yes.classList.remove("is-invalid");
          no.classList.remove("is-invalid");
          yes.classList.add("is-valid");
          no.classList.add("is-valid");
        }

        return selected && valid;
    },
    message: 'If you want the SSA to issue you a Social Security card, you must select "Yes" for Consent for Disclosure.'
  },











    
]
