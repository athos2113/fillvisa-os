const fields = [

   // ============================
   // 1. Main Yes/No radio
   // ============================
   {
      id: "accommodation",
      label: "Accommodation request",
      validate: () => document.querySelector('input[name="accommodation"]:checked'),
      message: "Please select Yes or No."
   },

   // ==========================================
   // Checkbox group is required ONLY if “Yes”
   // ==========================================
   {
      id: "accommodation_type",
      label: "Accommodation type selection",
      condition: () => document.querySelector('input[name="accommodation"]:checked')?.value === "yes",
      validate: () =>
         Array.from(document.querySelectorAll('input[name="accommodation_type"]:checked')).length > 0,
      message: "Please select at least one accommodation type."
   },

   // ==========================================
   // Textareas NOT required — only validate if visible
   // ==========================================
   {
      id: "acc_1a_text",
      label: "Accommodation 1.a explanation",
      condition: () => document.getElementById("acc_1a")?.checked,
      validate: () => true,   // always valid
      message: ""
   },
   {
      id: "acc_1b_text",
      label: "Accommodation 1.b explanation",
      condition: () => document.getElementById("acc_1b")?.checked,
      validate: () => true,
      message: ""
   },
   {
      id: "acc_1c_text",
      label: "Accommodation 1.c explanation",
      condition: () => document.getElementById("acc_1c")?.checked,
      validate: () => true,
      message: ""
   }

];
