// processing-info-field-map.js

const fields = [
   // === 1. Location where applied ===
   {
      id: "visa_location",
      label: "Location where you applied for an immigrant visa or adjustment of status",
      validate: (v) => v.trim() !== "",
      message: "Please enter the location where you applied."
   },

   // === 2. USCIS office / visa issuance ===
   {
      id: "uscis_office",
      label: "Location where your immigrant visa was issued or USCIS office where granted adjustment of status",
      validate: (v) => v.trim() !== "",
      message: "Please enter the visa issuance or USCIS office location."
   },

   // === 3. Entry type radio ===
   {
      id: "entry_type",
      label: "Entry type (immigrant visa or adjustment of status)",
      validate: () => document.querySelector('input[name="entry_type"]:checked'),
      message: "Please select how you entered the United States."
   },

   // === 3.a. Destination (conditional) ===
   {
      id: "destination_us",
      label: "Destination in the United States at time of admission",
      condition: () => document.querySelector('input[name="entry_type"]:checked')?.value === "immigrant",
      validate: (v) => v.trim() !== "",
      message: "Please enter your U.S. destination at time of admission."
   },

   // === 3.a.1 Port of Entry (conditional) ===
   {
      id: "poe_city",
      label: "Port-of-Entry (City or Town and State)",
      condition: () => document.querySelector('input[name="entry_type"]:checked')?.value === "immigrant",
      validate: (v) => v.trim() !== "",
      message: "Please enter your Port-of-Entry city and state."
   },

   // === 4. Removal status ===
   {
      id: "removal_status",
      label: "Exclusion / deportation / removal proceedings",
      validate: () => document.querySelector('input[name="removal_status"]:checked'),
      message: "Please select Yes or No."
   },
   {
      id: "removal_explain_text",
      label: "Removal explanation",
    //   condition: () => document.querySelector('input[name="removal_status"]:checked')?.value === "yes",
      validate: () => true,
      message: ""
   },

   // === 5. Abandonment status ===
   {
      id: "abandon",
      label: "Abandonment of status (Form I-407)",
      validate: () => document.querySelector('input[name="abandon"]:checked'),
      message: "Please select Yes or No."
   },
   {
      id: "abandon_explain_text",
      label: "Abandonment explanation",
    //   condition: () => document.querySelector('input[name="abandon"]:checked')?.value === "yes",
      validate: () => true,
      message: ""
   },

   // === 6. Ethnicity ===
   {
      id: "ethnicity",
      label: "Ethnicity",
      validate: () => document.querySelector('input[name="ethnicity"]:checked'),
      message: "Please select your ethnicity."
   },

   // === 7. Race (checkbox group) ===
   {
      id: "race",
      label: "Race",
      validate: () => Array.from(document.querySelectorAll('input[name="race"]:checked')).length > 0,
      message: "Please select at least one race."
   },

   // === 8. Height (feet + inches) ===
   {
      id: "height_feet",
      label: "Height (feet)",
      validate: (v) => v.trim() !== "",
      message: "Please select feet value for height."
   },
   {
      id: "height_inches",
      label: "Height (inches)",
      validate: (v) => v.trim() !== "",
      message: "Please select inches value for height."
   },

   // === 9. Weight ===
   {
      id: "weight",
      label: "Weight (pounds)",
      validate: (v) => {
         const num = parseInt(v, 10);
         return !isNaN(num) && num > 0 && num <= 999;
      },
      message: "Please enter a valid weight between 1 and 999 pounds."
   },

   // === 10. Eye Color ===
   {
      id: "eye_color",
      label: "Eye Color",
      validate: (v) => v.trim() !== "",
      message: "Please select an eye color."
   },

   // === 11. Hair Color ===
   {
      id: "hair_color",
      label: "Hair Color",
      validate: (v) => v.trim() !== "",
      message: "Please select a hair color."
   },
];
