const employmentStatusIds = [
   "employment_as",
   "employment_self",
   "employment_retired",
   "employment_unemployed"
];

const recentTaxRadioIds = ["recent_tax_yes", "recent_tax_no"];

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

function validateRadioGroup(ids) {
   const isValid = ids.some(isChecked);
   setGroupState(ids, isValid);
   return isValid;
}

function hasRequiredText(value) {
   return value.trim() !== "";
}

function isValidDateNotFuture(value) {
   if (!value) return false;

   const parsed = new Date(`${value}T00:00:00`);
   if (Number.isNaN(parsed.getTime())) return false;

   const today = new Date();
   today.setHours(0, 0, 0, 0);
   return parsed <= today;
}

function isEmploymentAsSelected() {
   return isChecked("employment_as");
}

function isEmploymentSelfSelected() {
   return isChecked("employment_self");
}

function isEmploymentRetiredSelected() {
   return isChecked("employment_retired");
}

function isEmploymentUnemployedSelected() {
   return isChecked("employment_unemployed");
}

function isRemarkIntendedSelected() {
   return document.getElementById("remark_intended")?.value === "yes";
}

function isEmploymentPersonRowVisible(row) {
   const rowEl = document.getElementById(`employmentPersonRow${row}`);
   return !!rowEl && rowEl.style.display !== "none";
}

function isEmploymentPersonAdditionalVisible() {
   const section = document.getElementById("employmentPersonAdditionalSection");
   return !!section && section.style.display !== "none";
}

function employmentPersonField(row, suffix, label) {
   return {
      id: `employment_person_${row}_${suffix}`,
      required: true,
      isVisible: () => isEmploymentPersonRowVisible(row),
      validate: hasRequiredText,
      message: `Enter ${label} for Person ${row}.`
   };
}

const fields = [
   {
      id: "employment_as",
      required: true,
      validate: () => validateRadioGroup(employmentStatusIds),
      message: "Select your current employment status."
   },
   {
      id: "employment_title",
      required: true,
      isVisible: isEmploymentAsSelected,
      validate: hasRequiredText,
      message: "Enter your employment title."
   },
   {
      id: "employment_employer_1",
      required: true,
      isVisible: isEmploymentAsSelected,
      validate: hasRequiredText,
      message: "Enter the name of Employer 1."
   },
   {
      id: "employment_employer_2",
      required: false,
      isVisible: isEmploymentAsSelected,
      validate: () => true,
      message: ""
   },
   {
      id: "employment_self_occupation",
      required: true,
      isVisible: isEmploymentSelfSelected,
      validate: hasRequiredText,
      message: "Enter your self-employment occupation."
   },
   {
      id: "employment_retired_date",
      required: true,
      isVisible: isEmploymentRetiredSelected,
      validate: isValidDateNotFuture,
      message: "Enter a valid retirement date."
   },
   {
      id: "employment_unemployed_date",
      required: true,
      isVisible: isEmploymentUnemployedSelected,
      validate: isValidDateNotFuture,
      message: "Enter a valid unemployment date."
   },
   {
      id: "employment_income",
      required: true,
      validate: hasRequiredText,
      message: "Enter your current individual annual income."
   }
];

[1, 2, 3, 4].forEach(row => {
   fields.push(
      employmentPersonField(row, "name", "the name"),
      employmentPersonField(row, "relationship", "the relationship"),
      employmentPersonField(row, "income", "the current income")
   );
});

fields.push(
   {
      id: "employment_person_additional",
      required: true,
      isVisible: isEmploymentPersonAdditionalVisible,
      validate: hasRequiredText,
      message: "Enter additional household income information."
   },
   {
      id: "remark_income",
      required: true,
      validate: hasRequiredText,
      message: "Enter your current annual household income."
   },
   {
      id: "remark_completed",
      required: true,
      validate: hasRequiredText,
      message: "Select whether the people listed in Items 8 through 11 have completed Form I-864A."
   },
   {
      id: "remark_intended",
      required: true,
      validate: hasRequiredText,
      message: "Select whether the intending immigrant exception applies."
   },
   {
      id: "remark_intended_dependent",
      required: true,
      isVisible: isRemarkIntendedSelected,
      validate: hasRequiredText,
      message: "Enter the intending immigrant dependent details."
   },
   {
      id: "recent_tax_yes",
      required: true,
      validate: () => validateRadioGroup(recentTaxRadioIds),
      message: "Select whether you filed Federal income tax returns for the three most recent tax years."
   },
   {
      id: "tax_year_recent",
      required: true,
      validate: hasRequiredText,
      message: "Enter the most recent tax year."
   },
   {
      id: "tax_income_recent",
      required: true,
      validate: hasRequiredText,
      message: "Enter the total income for the most recent tax year."
   },
   {
      id: "tax_year_second",
      required: true,
      validate: hasRequiredText,
      message: "Enter the second most recent tax year."
   },
   {
      id: "tax_income_second",
      required: true,
      validate: hasRequiredText,
      message: "Enter the total income for the second most recent tax year."
   },
   {
      id: "tax_year_third",
      required: true,
      validate: hasRequiredText,
      message: "Enter the third most recent tax year."
   },
   {
      id: "tax_income_third",
      required: true,
      validate: hasRequiredText,
      message: "Enter the total income for the third most recent tax year."
   },
   {
      id: "below_irs",
      required: true,
      validate: hasRequiredText,
      message: "Select whether the below-IRS-filing-level statement applies."
   }
);
