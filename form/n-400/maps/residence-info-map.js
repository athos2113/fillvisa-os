// residence-info-map.js

function isPhysicalRowActive(row) {
    return [
        `physical_street_${row}`,
        `physical_city_${row}`,
        `physical_province_${row}`,
        `physical_zip_${row}`,
        `physical_country_${row}`,
        `physical_date_residence_from_${row}`,
        `physical_date_residence_to_${row}`
    ].some(id => {
        const el = document.getElementById(id);
        return el && el.value.trim() !== "";
    });
}


const fields = [

   // === 1. Street Address ===
   {
      id: "physical_street",
      label: "Street Number and Name",
      validate: (v) => v.trim() !== "",
      message: "Please enter your street number and name."
   },

   // === 2. City ===
   {
      id: "physical_city",
      label: "City or Town",
      validate: (v) => v.trim() !== "",
      message: "Please enter your city or town."
   },

   // === 3. State ===
   {
      id: "physical_state",
      label: "State",
      validate: (v) => v.trim() !== "",
      message: "Please enter your state."
   },

   // === 4. ZIP Code ===
   {
      id: "physical_zip",
      label: "ZIP Code",
      validate: (v) => v.trim() !== "",
      message: "Please enter your ZIP Code."
   },

   // === 5. Country ===
   {
      id: "physical_country",
      label: "Country",
      validate: (v) => v.trim() !== "",
      message: "Please enter your country."
   },

   // === 6. Dates of Residence (From) ===
   {
      id: "physical_date_residence",
      label: "Date You Began Living at This Address",
      validate: (v) => {
         if (!v) return false;
         const d = new Date(v);
         return !isNaN(d.getTime());
      },
      message: "Please enter the date you began living at this address."
   },

   // === Optional Fields (always valid) ===
   {
      id: "physical_incare_of_name",
      label: "In Care Of Name",
      validate: () => true,
      message: ""
   },
   {
      id: "physical_apt",
      label: "Apartment",
      validate: () => true,
      message: ""
   },
   {
      id: "physical_ste",
      label: "Suite",
      validate: () => true,
      message: ""
   },
   {
      id: "physical_flr",
      label: "Floor",
      validate: () => true,
      message: ""
   },
   {
      id: "physical_number",
      label: "Physical number",
      validate: () => true,
      message: ""
   },
   {
      id: "physical_province",
      label: "Province",
      validate: () => true,
      message: ""
   },
   {
      id: "physical_postal_code",
      label: "Postal Code",
      validate: () => true,
      message: ""
   },
    // ================= ROW 2 =================
    {
        id: "physical_street_2",
        label: "Previous Physical Address – Street",
        condition: () => isPhysicalRowActive(2),
        validate: v => v.trim() !== "",
        message: "Street address is required."
    },
    {
        id: "physical_city_2",
        label: "Previous Physical Address – City",
        condition: () => isPhysicalRowActive(2),
        validate: v => v.trim() !== "",
        message: "City is required."
    },
    {
        id: "physical_province_2",
        label: "Previous Physical Address – State / Province",
        condition: () => isPhysicalRowActive(2),
        validate: v => v.trim() !== "",
        message: "State or Province is required."
    },
    {
        id: "physical_country_2",
        label: "Previous Physical Address – Country",
        condition: () => isPhysicalRowActive(2),
        validate: v => v.trim() !== "",
        message: "Country is required."
    },
    {
        id: "physical_date_residence_from_2",
        label: "Previous Physical Address – From Date",
        condition: () => isPhysicalRowActive(2),
        validate: v => v !== "",
        message: "Start date of residence is required."
    },

    // ================= ROW 3 =================
    {
        id: "physical_street_3",
        label: "Previous Physical Address – Street",
        condition: () => isPhysicalRowActive(3),
        validate: v => v.trim() !== "",
        message: "Street address is required."
    },
    {
        id: "physical_city_3",
        label: "Previous Physical Address – City",
        condition: () => isPhysicalRowActive(3),
        validate: v => v.trim() !== "",
        message: "City is required."
    },
    {
        id: "physical_province_3",
        label: "Previous Physical Address – State / Province",
        condition: () => isPhysicalRowActive(3),
        validate: v => v.trim() !== "",
        message: "State or Province is required."
    },
    {
        id: "physical_country_3",
        label: "Previous Physical Address – Country",
        condition: () => isPhysicalRowActive(3),
        validate: v => v.trim() !== "",
        message: "Country is required."
    },
    {
        id: "physical_date_residence_from_3",
        label: "Previous Physical Address – From Date",
        condition: () => isPhysicalRowActive(3),
        validate: v => v !== "",
        message: "Start date of residence is required."
    },

    // ================= ROW 4 =================
    {
        id: "physical_street_4",
        label: "Previous Physical Address – Street",
        condition: () => isPhysicalRowActive(4),
        validate: v => v.trim() !== "",
        message: "Street address is required."
    },
    {
        id: "physical_city_4",
        label: "Previous Physical Address – City",
        condition: () => isPhysicalRowActive(4),
        validate: v => v.trim() !== "",
        message: "City is required."
    },
    {
        id: "physical_province_4",
        label: "Previous Physical Address – State / Province",
        condition: () => isPhysicalRowActive(4),
        validate: v => v.trim() !== "",
        message: "State or Province is required."
    },
    {
        id: "physical_country_4",
        label: "Previous Physical Address – Country",
        condition: () => isPhysicalRowActive(4),
        validate: v => v.trim() !== "",
        message: "Country is required."
    },
    {
        id: "physical_date_residence_from_4",
        label: "Previous Physical Address – From Date",
        condition: () => isPhysicalRowActive(4),
        validate: v => v !== "",
        message: "Start date of residence is required."
    },
    // ================= Additional Info =================
    {
        id: "physical_additional_info",
        label: "Additional Physical Address Information",
        validate: () => true,
        message: ""
    },
    // === Mailing address decision (required) ===
    {
        id: "mailing_address_yes",
        label: "Mailing address same as physical address",
        validate: () =>
            document.getElementById("mailing_address_yes").checked ||
            document.getElementById("mailing_address_no").checked,
        message: "Please select Yes or No."
    },

    // === Mailing address fields (required only if No) ===
    {
        id: "mailing_street",
        label: "Mailing street",
        condition: () => mailing_address_no.checked,
        validate: v => v.trim() !== "",
        message: "Street address is required."
    },
    {
        id: "mailing_city",
        label: "Mailing city",
        condition: () => mailing_address_no.checked,
        validate: v => v.trim() !== "",
        message: "City is required."
    },
    {
        id: "mailing_state",
        label: "Mailing state",
        condition: () => mailing_address_no.checked,
        validate: v => v.trim() !== "",
        message: "State is required."
    },
    {
        id: "mailing_zip",
        label: "Mailing ZIP",
        condition: () => mailing_address_no.checked,
        validate: v => v.trim() !== "",
        message: "ZIP Code is required."
    },
    {
        id: "mailing_country",
        label: "Mailing country",
        condition: () => mailing_address_no.checked,
        validate: v => v.trim() !== "",
        message: "Country is required."
    },
    // === Optional Fields (always valid) ===
   {
      id: "mailing_incare_of_name",
      label: "Mailing In Care Of Name",
      validate: () => true,
      message: ""
   },
   {
      id: "mailing_apt",
      label: "Apartment",
      validate: () => true,
      message: ""
   },
   {
      id: "mailing_ste",
      label: "Suite",
      validate: () => true,
      message: ""
   },
   {
      id: "mailing_flr",
      label: "Floor",
      validate: () => true,
      message: ""
   },
   {
      id: "mailing_number",
      label: "Mailing number",
      validate: () => true,
      message: ""
   },
   {
      id: "mailing_province",
      label: "Province",
      validate: () => true,
      message: ""
   },
   {
      id: "mailing_postal_code",
      label: "Postal Code",
      validate: () => true,
      message: ""
   }


];
