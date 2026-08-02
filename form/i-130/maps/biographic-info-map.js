const ethnicityIds = ["ethnicity_hispanic", "ethnicity_not_hispanic"];
const raceIds = ["race_white", "race_asian", "race_black", "race_native", "race_pacific"];
const eyeColorIds = [
   "eye_color_Black",
   "eye_color_Blue",
   "eye_color_Brown",
   "eye_color_Gray",
   "eye_color_Green",
   "eye_color_Hazel",
   "eye_color_Maroon",
   "eye_color_Pink",
   "eye_color_Other"
];
const hairColorIds = [
   "hair_color_Bald",
   "hair_color_Black",
   "hair_color_Blond",
   "hair_color_Brown",
   "hair_color_Gray",
   "hair_color_Red",
   "hair_color_Sandy",
   "hair_color_White",
   "hair_color_Unknown"
];

function isChecked(id) {
   return !!document.getElementById(id)?.checked;
}

function setGroupState(ids, isValid) {
   ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;

      el.classList.toggle("is-valid", isValid);
      el.classList.toggle("is-invalid", !isValid);
   });
}

function validateSelectionGroup(ids) {
   const isValid = ids.some(isChecked);
   setGroupState(ids, isValid);
   return isValid;
}

function isWholeNumber(value) {
   return /^[0-9]+$/.test(value.trim());
}

const fields = [
   {
      id: "ethnicity_hispanic",
      required: true,
      validate: () => validateSelectionGroup(ethnicityIds),
      message: "Select your ethnicity."
   },
   {
      id: "ethnicity_not_hispanic",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "race_white",
      required: true,
      validate: () => validateSelectionGroup(raceIds),
      message: "Select at least one race."
   },
   {
      id: "race_asian",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "race_black",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "race_native",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "race_pacific",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "height_feet",
      required: true,
      validate: value => isWholeNumber(value) && Number(value) >= 1 && Number(value) <= 9,
      message: "Enter height feet from 1 to 9."
   },
   {
      id: "height_inches",
      required: true,
      validate: value => isWholeNumber(value) && Number(value) >= 0 && Number(value) <= 11,
      message: "Enter height inches from 0 to 11."
   },
   {
      id: "weight",
      required: true,
      validate: value => isWholeNumber(value) && Number(value) >= 1 && Number(value) <= 999,
      message: "Enter weight in pounds from 1 to 999."
   },
   {
      id: "eye_color_Black",
      required: true,
      validate: () => validateSelectionGroup(eyeColorIds),
      message: "Select your eye color."
   },
   {
      id: "eye_color_Blue",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "eye_color_Brown",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "eye_color_Gray",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "eye_color_Green",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "eye_color_Hazel",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "eye_color_Maroon",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "eye_color_Pink",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "eye_color_Other",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "hair_color_Bald",
      required: true,
      validate: () => validateSelectionGroup(hairColorIds),
      message: "Select your hair color."
   },
   {
      id: "hair_color_Black",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "hair_color_Blond",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "hair_color_Brown",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "hair_color_Gray",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "hair_color_Red",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "hair_color_Sandy",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "hair_color_White",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "hair_color_Unknown",
      required: false,
      validate: () => true,
      message: ""
   }
];
