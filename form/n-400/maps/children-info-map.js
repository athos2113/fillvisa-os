function isChildRowActive(row) {
  return [
    `child_name_${row}`,
    `child_dob_${row}`,
    `child_residence_${row}`,
    `child_relationship_${row}`
  ].some(id => {
    const el = document.getElementById(id);
    return el && el.value.trim() !== "";
  });
}

function isSupportAnswered(row) {
  return (
    document.getElementById(`child_support_yes_${row}`).checked ||
    document.getElementById(`child_support_no_${row}`).checked
  );
}

function hasChildren() {
  const val = document.getElementById("number_children").value.trim();
  return val !== "" && !isNaN(val) && parseInt(val) > 0;
}



const fields = [

  // =========================
  // 1. Number of children
  // =========================
  {
    id: "number_children",
    label: "Total number of children under 18",
    validate: v => v.trim() !== "" && !isNaN(v),
    message: "Please enter the total number of children under 18."
  },

  // =========================
  // CHILD ROW 1 (conditional on hasChildren)
  // =========================
  {
    id: "child_name_1",
    label: "Child name",
    condition: () => hasChildren(),
    validate: v => v.trim() !== "",
    message: "Please enter the child's name."
  },
  {
    id: "child_dob_1",
    label: "Child date of birth",
    condition: () => hasChildren(),
    validate: v => v !== "",
    message: "Please enter the child's date of birth."
  },
  {
    id: "child_residence_1",
    label: "Child residence",
    condition: () => hasChildren(),
    validate: v => v !== "",
    message: "Please select where the child resides."
  },
  {
    id: "child_relationship_1",
    label: "Child relationship",
    condition: () => hasChildren(),
    validate: v => v !== "",
    message: "Please select the relationship."
  },
  {
    id: "child_support_1",
    label: "Providing support",
    condition: () => hasChildren(),
    validate: () => isSupportAnswered(1),
    message: "Please select Yes or No."
  },

  // =========================
  // CHILD ROW 2 (conditional)
  // =========================
  {
    id: "child_name_2",
    label: "Child name",
    condition: () => hasChildren() && isChildRowActive(2),
    validate: v => v.trim() !== "",
    message: "Please enter the child's name."
  },
  {
    id: "child_dob_2",
    label: "Child date of birth",
    condition: () => hasChildren() && isChildRowActive(2),
    validate: v => v !== "",
    message: "Please enter the child's date of birth."
  },
  {
    id: "child_residence_2",
    label: "Child residence",
    condition: () => hasChildren() && isChildRowActive(2),
    validate: v => v !== "",
    message: "Please select where the child resides."
  },
  {
    id: "child_relationship_2",
    label: "Child relationship",
    condition: () => hasChildren() && isChildRowActive(2),
    validate: v => v !== "",
    message: "Please select the relationship."
  },
  {
    id: "child_support_2",
    label: "Providing support",
    condition: () => hasChildren() && isChildRowActive(2),
    validate: () => isSupportAnswered(2),
    message: "Please select Yes or No."
  },

  // =========================
  // CHILD ROW 3 (conditional)
  // =========================
  {
    id: "child_name_3",
    label: "Child name",
    condition: () => hasChildren() && isChildRowActive(3),
    validate: v => v.trim() !== "",
    message: "Please enter the child's name."
  },
  {
    id: "child_dob_3",
    label: "Child date of birth",
    condition: () => hasChildren() && isChildRowActive(3),
    validate: v => v !== "",
    message: "Please enter the child's date of birth."
  },
  {
    id: "child_residence_3",
    label: "Child residence",
    condition: () => hasChildren() && isChildRowActive(3),
    validate: v => v !== "",
    message: "Please select where the child resides."
  },
  {
    id: "child_relationship_3",
    label: "Child relationship",
    condition: () => hasChildren() && isChildRowActive(3),
    validate: v => v !== "",
    message: "Please select the relationship."
  },
  {
    id: "child_support_3",
    label: "Providing support",
    condition: () => hasChildren() && isChildRowActive(3),
    validate: () => isSupportAnswered(3),
    message: "Please select Yes or No."
  },

  // =========================
  // Additional info (optional)
  // =========================
  {
    id: "children_additional_info",
    label: "Additional information",
    validate: () => true,
    message: ""
  }
];