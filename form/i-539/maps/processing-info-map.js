// Part 3 IDs/pdfField values preserve the supplied PDF names, including "seperate".
const alreadyGrantedIds = ["already_granted_yes", "already_granted_no"];
const separatePetitionIds = ["seperate_petition_i539", "seperate_petition_no", "seperate_petition_yes"];
const formTypeIds = ["form_type_i539", "form_type_i129"];
const isChecked = id => document.getElementById(id).checked;
// Both affirmative answers in item 3 count as Yes.
const needsPetitionDetails = () => isChecked("already_granted_yes") ||
   isChecked("seperate_petition_i539") || isChecked("seperate_petition_yes");

function isValidDate(value) {
   if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(value) || value.startsWith("0000")) return false;
   const date = new Date(`${value}T00:00:00Z`);
   return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function radioGroup(ids, feedbackId, message, condition) {
   return ids.map((id, index) => ({
      id, pdfField: id, type: "radio", required: index === 0,
      ...(condition ? { condition } : {}),
      ...(index === 0 ? { group: ids, feedbackId } : {}),
      validate: () => index !== 0 || ids.filter(isChecked).length === 1,
      message: index === 0 ? message : ""
   }));
}

const fields = [
   {
      id: "extend_date", pdfField: "extend_date", type: "date", required: true,
      validate: isValidDate, message: "Enter a valid requested extension date."
   },
   ...radioGroup(alreadyGrantedIds, "already_granted-feedback",
      "Select whether this application is based on an extension or change of status already granted to your spouse, child, or parent."),
   ...radioGroup(separatePetitionIds, "seperate_petition-feedback",
      "Select whether this application is based on a separate petition or application."),
   ...radioGroup(formTypeIds, "form_type-feedback", "Select the related form type.", needsPetitionDetails),
   {
      id: "uscis_receipt_number", pdfField: "uscis_receipt_number", type: "text", required: true,
      condition: needsPetitionDetails,
      validate: value => value.length > 0 && value.length <= 13,
      message: "Enter the USCIS receipt number using no more than 13 characters."
   },
   ...["beneficiary_firstname", "beneficiary_lastname"].map(id => ({
      id, pdfField: id, type: "text", required: false, validate: () => true, message: ""
   })),
   {
      id: "date_filed", pdfField: "date_filed", type: "date", required: false,
      validate: isValidDate, message: "Enter a valid filing date, or leave it blank."
   }
];
