// processing-info-field-map.js

const fields = [
   // === 1. Ethnicity ===
   {
      id: "ethnicity",
      label: "Ethnicity",
      validate: () => document.querySelector('input[name="ethnicity"]:checked'),
      message: "Please select your ethnicity."
   },

   // === 2. Race (checkbox group) ===
   {
      id: "race",
      label: "Race",
      validate: () => Array.from(document.querySelectorAll('input[name="race"]:checked')).length > 0,
      message: "Please select at least one race."
   },

   // === 3. Height (feet + inches) ===
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

   // === 4. Weight ===
   {
      id: "weight",
      label: "Weight (pounds)",
      validate: (v) => {
         const num = parseInt(v, 10);
         return !isNaN(num) && num > 0 && num <= 999;
      },
      message: "Please enter a valid weight between 1 and 999 pounds."
   },

   // === 5. Eye Color ===
   {
      id: "eye_color",
      label: "Eye Color",
      validate: (v) => v.trim() !== "",
      message: "Please select an eye color."
   },

   // === 6. Hair Color ===
   {
      id: "hair_color",
      label: "Hair Color",
      validate: (v) => v.trim() !== "",
      message: "Please select a hair color."
   },
];
