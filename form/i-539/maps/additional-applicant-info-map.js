// Part 4: PDF field names verified against fillvisa_i539_acro.pdf.
// Explanation text is saved for Part 8; it has no same-named AcroForm field.
const questions = [
   {
      "id": "applicant_immigrant",
      "item": "3",
      "page": "3",
      "label": "Are you an applicant for an immigrant visa?"
   },
   {
      "id": "immigrant_petition",
      "item": "4",
      "page": "3",
      "label": "Has an immigrant petition EVER been filed for you?"
   },
   {
      "id": "filed_i485",
      "item": "5",
      "page": "3",
      "label": "Have you EVER filed Form I-485, Application to Register Permanent Residence or Adjust Status?"
   },
   {
      "id": "convicted",
      "item": "6",
      "page": "4",
      "label": "Have you been arrested or convicted of any criminal offense since last entering the United States?"
   },
   {
      "id": "genocide",
      "item": "7.a",
      "page": "4",
      "label": "Acts involving torture or genocide?"
   },
   {
      "id": "killing",
      "item": "7.b",
      "page": "4",
      "label": "Killing any person?"
   },
   {
      "id": "injuring",
      "item": "7.c",
      "page": "4",
      "label": "Intentionally and severely injuring any person?"
   },
   {
      "id": "sexual",
      "item": "7.d",
      "page": "4",
      "label": "Engaging in any kind of sexual contact or relations with any person who did not consent or was unable to consent, or was being forced or threatened?"
   },
   {
      "id": "religious",
      "item": "7.e",
      "page": "4",
      "label": "Limiting or denying any person's ability to exercise religious beliefs?"
   },
   {
      "id": "military",
      "item": "8.a",
      "page": "4",
      "label": "Served in, been a member of, assisted, or participated in any military unit, paramilitary unit, police unit, self-defense unit, vigilante unit, rebel group, guerrilla group, militia, insurgent organization, or any other armed group?"
   },
   {
      "id": "jail",
      "item": "8.b",
      "page": "4",
      "label": "Worked, volunteered, or otherwise served in any prison, jail, prison camp, detention facility, labor camp, or any other situation that involved detaining persons?"
   },
   {
      "id": "weapon",
      "item": "9",
      "page": "4",
      "label": "Have you EVER been a member of, assisted, or participated in any group, unit, or organization of any kind in which you or other persons used or threatened to use any type of weapon against any person or threatened to do so?"
   },
   {
      "id": "transport",
      "item": "10",
      "page": "4",
      "label": "Have you EVER sold, provided, or transported weapons, or assisted any person in selling, providing, or transporting weapons, which, you knew or believed would be used against another person?"
   },
   {
      "id": "training",
      "item": "11",
      "page": "4",
      "label": "Have you EVER received any weapons training, paramilitary training, or other military-type training?"
   },
   {
      "id": "violated",
      "item": "12",
      "page": "4",
      "label": "Have you EVER violated the terms of the nonimmigrant status you now hold?"
   },
   {
      "id": "removal",
      "item": "13",
      "page": "4",
      "label": "Are you now in removal proceedings?"
   },
   {
      "id": "employed",
      "item": "14",
      "page": "4",
      "label": "Have you EVER been employed in the United States since last admitted or granted an extension or change of status?"
   },
   {
      "id": "j1",
      "item": "15",
      "page": "4",
      "label": "Are you currently or have you EVER been a J-1 exchange visitor or a J-2 dependent of a J-1 exchange visitor?"
   }
];
const unitIds = ["applicant_physical_apt", "applicant_physical_ste", "applicant_physical_flr"];
const passportIds = ["applicant_passport", "applicant_passport_country", "applicant_passport_expiration_date"];
const addressIds = ["applicant_physical_street", "applicant_physical_number", "applicant_physical_city", "applicant_physical_province", "applicant_physical_postal", "applicant_physical_country"];
const isChecked = id => document.getElementById(id).checked;
const isStarted = id => {
   const element = document.getElementById(id);
   return element.value.trim() !== "" || element.validity.badInput;
};
const passportStarted = () => passportIds.some(isStarted);
const addressRequired = () => passportStarted() || addressIds.some(isStarted) || unitIds.some(isChecked);
const needsDetails = id => isChecked(`${id}_yes`) || (id === "employed" && isChecked("employed_no"));

function isValidDate(value) {
   if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(value) || value.startsWith("0000")) return false;
   const date = new Date(`${value}T00:00:00Z`);
   return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function textField(id, message = "", options = {}) {
   return { id, pdfField: id, type: "text", required: false, validate: value => value !== "", message, ...options };
}

function radioGroup(ids, feedbackId, message, required = true) {
   return ids.map((id, index) => ({
      id, pdfField: id, type: "radio", required: required && index === 0,
      ...(index === 0 ? { group: ids, feedbackId } : {}),
      validate: () => index !== 0 || (required ? ids.filter(isChecked).length === 1 : ids.filter(isChecked).length <= 1),
      message: index === 0 ? message : ""
   }));
}

const fields = [
   textField("applicant_passport", "Enter the current passport number, or leave all current passport fields blank if unchanged.", { required: passportStarted }),
   textField("applicant_passport_country", "Enter the country that issued the current passport.", { required: passportStarted }),
   textField("applicant_passport_expiration_date", "Enter a valid current passport expiration date.", { type: "date", required: passportStarted, validate: isValidDate }),
   textField("applicant_physical_street", "Enter the street number and name for the physical address abroad.", { required: addressRequired }),
   ...radioGroup(unitIds, "applicant_physical_unit-feedback", "Select no more than one unit type.", false),
   textField("applicant_physical_number", "Enter the unit number, or clear the unit selection.", { required: true, condition: () => unitIds.some(isChecked) }),
   textField("applicant_physical_city", "Enter the city or town for the physical address abroad.", { required: addressRequired }),
   textField("applicant_physical_province"),
   textField("applicant_physical_postal"),
   textField("applicant_physical_country", "Enter the country for the physical address abroad.", { required: addressRequired }),
   ...questions.flatMap(question => [
      ...radioGroup([`${question.id}_yes`, `${question.id}_no`], `${question.id}-feedback`, `Item ${question.item}: Select Yes or No.`),
      textField(`${question.id}_details`, "", {
         pdfField: null, type: "textarea", required: false, validate: () => true,
         condition: () => needsDetails(question.id),
         additionalInfo: { part: "4", page: question.page, item: question.item },
         label: `${question.item}. ${question.label}`
      })
   ])
];
