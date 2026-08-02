
const fields = [
  // --- Status ---
  {
    id: "status",
    required: true,
    validate: () => {
      const selected = document.querySelector('input[name="status"]:checked');
      return !!selected;
    },
    message: "Please select your current status."
  },

  // --- Section A: Reason for Application ---
  {
    id: "reason_a",
    required: true,
    validate: () => {
      const status = document.querySelector('input[name="status"]:checked')?.value;
      // Section A only applies if status is LPR or Commuter
      if (!["lpr", "commuter"].includes(status)) return true;

      const selected = document.querySelector('input[name="reason_a"]:checked');
      return !!selected;
    },
    message: "Please select your reason for application (Section A)."
  },

  // --- Section B: Reason for Application ---
  {
    id: "reason_b",
    required: true,
    validate: () => {
      const status = document.querySelector('input[name="status"]:checked')?.value;
      // Section B only applies if status is Conditional
      if (status !== "conditional") return true;

      const selected = document.querySelector('input[name="reason_b"]:checked');
      return !!selected;
    },
    message: "Please select your reason for application (Section B)."
  },

  // --- Port-of-Entry City (Only if reason_2h1_a selected) ---
  {
    id: "reason_2h1_a_city",
    required: false,
    validate: () => {
      const selectedReason = document.querySelector('input[name="reason_a"]:checked')?.value;
      const input = document.getElementById("reason_2h1_a_city");
      if (selectedReason !== "2h1_a") return true; // not required otherwise
      return input?.value.trim() !== "";
    },
    message: "Please enter your Port-of-Entry city and state."
  }
];
