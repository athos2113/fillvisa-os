// eligibility-info-field-map.js

const fields = [

   // === 1. Eligibility reason (group validation anchored to a real field) ===
   {
      id: "eligibility_general", // anchor to a real DOM element
      label: "Basis of eligibility for naturalization",
      validate: () => {
         const selected = [
            "eligibility_general",
            "eligibility_spouse",
            "eligibility_vawa",
            "eligibility_spouse_outside",
            "eligibility_military",
            "eligibility_honorable",
            "eligibility_other"
         ].filter(id => document.getElementById(id)?.checked);

         return selected.length === 1;
      },
      message: "Please select exactly one reason for eligibility."
   },

   // === 2. Spouse outside U.S. – USCIS field office (conditional) ===
   {
      id: "eligibility_spouse_outside_office",
      label: "USCIS field office for naturalization interview",
      condition: () => document.getElementById("eligibility_spouse_outside")?.checked,
      validate: (v) => v.trim() !== "",
      message: "Please enter the USCIS field office for your naturalization interview."
   },

   // === 3. Other eligibility reason (conditional) ===
   {
      id: "eligibility_other_text",
      label: "Other eligibility reason",
      condition: () => document.getElementById("eligibility_other")?.checked,
      validate: (v) => v.trim() !== "",
      message: "Please explain your reason for eligibility."
   }

];
