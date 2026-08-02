function isOutsideRowActive(row) {
  return (
    document.getElementById(`outside_leftdate_${row}`).value ||
    document.getElementById(`outside_country_${row}`).value
  );
}

function hasTraveled() {
  return (
    document.getElementById("outside_leftdate_1").value !== "" ||
    document.getElementById("outside_country_1").value.trim() !== ""
  );
}

const fields = [
  // ===== ROW 1 (conditional on hasTraveled) =====
  {
    id: "outside_leftdate_1",
    label: "Date you left the United States",
    condition: () => hasTraveled(),
    validate: v => v !== "",
    message: "Please enter the date you left the United States."
  },
  {
    id: "outside_returndate_1",
    label: "Date you returned to the United States",
    condition: () => hasTraveled(),
    validate: v => v !== "",
    message: "Please enter the date you returned to the United States."
  },
  {
    id: "outside_country_1",
    label: "Countries traveled",
    condition: () => hasTraveled(),
    validate: v => v.trim() !== "",
    message: "Please enter the countries you traveled to."
  },

  // ===== ROW 2 =====
  {
    id: "outside_leftdate_2",
    condition: () => hasTraveled() && isOutsideRowActive(2),
    validate: v => v !== "",
    message: "Please enter the date you left the United States."
  },
  {
    id: "outside_returndate_2",
    condition: () => hasTraveled() && isOutsideRowActive(2),
    validate: v => v !== "",
    message: "Please enter the date you returned to the United States."
  },
  {
    id: "outside_country_2",
    condition: () => hasTraveled() && isOutsideRowActive(2),
    validate: v => v.trim() !== "",
    message: "Please enter the countries you traveled to."
  },

  // ===== ROW 3 =====
  {
    id: "outside_leftdate_3",
    condition: () => hasTraveled() && isOutsideRowActive(3),
    validate: v => v !== "",
    message: "Please enter the date you left the United States."
  },
  {
    id: "outside_returndate_3",
    condition: () => hasTraveled() && isOutsideRowActive(3),
    validate: v => v !== "",
    message: "Please enter the date you returned to the United States."
  },
  {
    id: "outside_country_3",
    condition: () => hasTraveled() && isOutsideRowActive(3),
    validate: v => v.trim() !== "",
    message: "Please enter the countries you traveled to."
  },

  // ===== ROW 4 =====
  {
    id: "outside_leftdate_4",
    condition: () => hasTraveled() && isOutsideRowActive(4),
    validate: v => v !== "",
    message: "Please enter the date you left the United States."
  },
  {
    id: "outside_returndate_4",
    condition: () => hasTraveled() && isOutsideRowActive(4),
    validate: v => v !== "",
    message: "Please enter the date you returned to the United States."
  },
  {
    id: "outside_country_4",
    condition: () => hasTraveled() && isOutsideRowActive(4),
    validate: v => v.trim() !== "",
    message: "Please enter the countries you traveled to."
  },

  // ===== ROW 5 =====
  {
    id: "outside_leftdate_5",
    condition: () => hasTraveled() && isOutsideRowActive(5),
    validate: v => v !== "",
    message: "Please enter the date you left the United States."
  },
  {
    id: "outside_returndate_5",
    condition: () => hasTraveled() && isOutsideRowActive(5),
    validate: v => v !== "",
    message: "Please enter the date you returned to the United States."
  },
  {
    id: "outside_country_5",
    condition: () => hasTraveled() && isOutsideRowActive(5),
    validate: v => v.trim() !== "",
    message: "Please enter the countries you traveled to."
  },

  // ===== ROW 6 =====
  {
    id: "outside_leftdate_6",
    condition: () => hasTraveled() && isOutsideRowActive(6),
    validate: v => v !== "",
    message: "Please enter the date you left the United States."
  },
  {
    id: "outside_returndate_6",
    condition: () => hasTraveled() && isOutsideRowActive(6),
    validate: v => v !== "",
    message: "Please enter the date you returned to the United States."
  },
  {
    id: "outside_country_6",
    condition: () => hasTraveled() && isOutsideRowActive(6),
    validate: v => v.trim() !== "",
    message: "Please enter the countries you traveled to."
  },

  // ===== Additional info (optional) =====
  {
    id: "outside_additional_info",
    validate: () => true,
    message: ""
  }
];