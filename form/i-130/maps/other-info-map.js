const previousPetitionIds = ["previous_petition_yes", "previous_petition_no"];

const otherRelative1DataIds = [
   "other_relative_1_lastname",
   "other_relative_1_firstname",
   "other_relative_1_middlename",
   "other_relative_1_relationship"
];

const otherRelative2DataIds = [
   "other_relative_2_lastname",
   "other_relative_2_firstname",
   "other_relative_2_middlename",
   "other_relative_2_relationship"
];

function isChecked(id) {
   return !!document.getElementById(id)?.checked;
}

function hasValue(id) {
   return (document.getElementById(id)?.value.trim() || "") !== "";
}

function setGroupState(ids, isValid) {
   ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;

      el.classList.toggle("is-valid", isValid);
      el.classList.toggle("is-invalid", !isValid);
   });
}

function validateRadioGroup(ids) {
   const isValid = ids.some(isChecked);
   setGroupState(ids, isValid);
   return isValid;
}

function isPreviousPetitionYes() {
   return isChecked("previous_petition_yes");
}

function hasOtherRelative1Data() {
   return isPreviousPetitionYes() && otherRelative1DataIds.some(hasValue);
}

function hasOtherRelative2Data() {
   return isPreviousPetitionYes() && otherRelative2DataIds.some(hasValue);
}

function isNotFutureDate(value) {
   if (!value) return false;

   const parsed = new Date(`${value}T00:00:00`);
   if (Number.isNaN(parsed.getTime())) return false;

   const today = new Date();
   today.setHours(0, 0, 0, 0);
   return parsed <= today;
}

const fields = [
   {
      id: "previous_petition_yes",
      required: true,
      validate: () => validateRadioGroup(previousPetitionIds),
      message: "Select whether you have ever previously filed a petition for this beneficiary or any other alien."
   },
   {
      id: "previous_petition_no",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "other_lastname",
      required: true,
      condition: isPreviousPetitionYes,
      validate: value => value.trim() !== "",
      message: "Family name is required when you previously filed a petition."
   },
   {
      id: "other_firstname",
      required: true,
      condition: isPreviousPetitionYes,
      validate: value => value.trim() !== "",
      message: "Given name is required when you previously filed a petition."
   },
   {
      id: "other_middlename",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "other_city",
      required: true,
      condition: isPreviousPetitionYes,
      validate: value => value.trim() !== "",
      message: "City or town is required when you previously filed a petition."
   },
   {
      id: "other_state",
      required: true,
      condition: isPreviousPetitionYes,
      validate: value => value.trim() !== "",
      message: "State is required when you previously filed a petition."
   },
   {
      id: "other_date_filed",
      required: true,
      condition: isPreviousPetitionYes,
      validate: isNotFutureDate,
      message: "Enter a valid date filed."
   },
   {
      id: "other_result",
      required: true,
      condition: isPreviousPetitionYes,
      validate: value => value.trim() !== "",
      message: "Result is required when you previously filed a petition."
   },
   {
      id: "other_relative_1_lastname",
      required: true,
      condition: hasOtherRelative1Data,
      validate: value => value.trim() !== "",
      message: "Relative 1 family name is required when Relative 1 is provided."
   },
   {
      id: "other_relative_1_firstname",
      required: true,
      condition: hasOtherRelative1Data,
      validate: value => value.trim() !== "",
      message: "Relative 1 given name is required when Relative 1 is provided."
   },
   {
      id: "other_relative_1_middlename",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "other_relative_1_relationship",
      required: true,
      condition: hasOtherRelative1Data,
      validate: value => value.trim() !== "",
      message: "Relative 1 relationship is required when Relative 1 is provided."
   },
   {
      id: "other_relative_2_lastname",
      required: true,
      condition: hasOtherRelative2Data,
      validate: value => value.trim() !== "",
      message: "Relative 2 family name is required when Relative 2 is provided."
   },
   {
      id: "other_relative_2_firstname",
      required: true,
      condition: hasOtherRelative2Data,
      validate: value => value.trim() !== "",
      message: "Relative 2 given name is required when Relative 2 is provided."
   },
   {
      id: "other_relative_2_middlename",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "other_relative_2_relationship",
      required: true,
      condition: hasOtherRelative2Data,
      validate: value => value.trim() !== "",
      message: "Relative 2 relationship is required when Relative 2 is provided."
   }
];
