function isWholeNumber(value) {
   return /^\d+$/.test(value.trim());
}

function isNonNegativeWholeNumber(value) {
   return isWholeNumber(value) && parseInt(value, 10) >= 0;
}

function getHouseholdNumberValue(id) {
   const value = document.getElementById(id)?.value.trim();
   if (value === "") return 0;
   return parseInt(value, 10) || 0;
}

function getExpectedHouseholdTotal() {
   return [
      "household_total_immigrants",
      "household_currently_married",
      "household_children",
      "household_anyother",
      "household_lawful",
      "household_residence"
   ].reduce((sum, id) => sum + getHouseholdNumberValue(id), 1);
}

const fields = [
   {
      id: "household_total_immigrants",
      required: true,
      validate: isNonNegativeWholeNumber,
      message: "Enter a whole number of 0 or more for total immigrants."
   },
   {
      id: "household_yourself",
      required: true,
      validate: value => value.trim() === "1",
      message: "Yourself must be counted as 1."
   },
   {
      id: "household_currently_married",
      required: true,
      validate: isNonNegativeWholeNumber,
      message: "Enter a whole number of 0 or more for spouse."
   },
   {
      id: "household_children",
      required: true,
      validate: isNonNegativeWholeNumber,
      message: "Enter a whole number of 0 or more for dependent children."
   },
   {
      id: "household_anyother",
      required: true,
      validate: isNonNegativeWholeNumber,
      message: "Enter a whole number of 0 or more for other dependents."
   },
   {
      id: "household_lawful",
      required: true,
      validate: isNonNegativeWholeNumber,
      message: "Enter a whole number of 0 or more for previously sponsored lawful permanent residents."
   },
   {
      id: "household_residence",
      required: true,
      validate: isNonNegativeWholeNumber,
      message: "Enter a whole number of 0 or more for household members combining income."
   },
   {
      id: "household_total_size",
      required: true,
      validate: value => isWholeNumber(value) && parseInt(value, 10) === getExpectedHouseholdTotal(),
      message: "Household size must equal the total of Item Numbers 1 through 7."
   }
];
