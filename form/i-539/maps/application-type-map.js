// Part 2: each ID/pdfField matches the supplied I-539 PDF field name.
const applyingIds = ["applying_reinstatement", "applying_extension", "applying_change_status"];
const peopleIds = ["applying_number_people_only", "applying_number_people_family"];
const isChecked = id => document.getElementById(id).checked;
const needsStatusChange = () => isChecked("applying_change_status");
const hasPeopleSelection = () => peopleIds.some(isChecked);

function isValidDate(value) {
   if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(value) || value.startsWith("0000")) return false;
   const date = new Date(`${value}T00:00:00Z`);
   return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function radioGroup(ids, feedbackId, message) {
   return ids.map((id, index) => ({
      id, pdfField: id, type: "radio", required: index === 0,
      ...(index === 0 ? { group: ids, feedbackId } : {}),
      validate: () => index !== 0 || ids.filter(isChecked).length === 1,
      message: index === 0 ? message : ""
   }));
}

const fields = [
   ...radioGroup(applyingIds, "applying-feedback", "Select one application type."),
   {
      id: "status_changed_to", pdfField: "status_changed_to", type: "text", required: true,
      condition: needsStatusChange, validate: value => value !== "",
      message: "Enter the status or employer/information medium you are requesting."
   },
   {
      id: "status_changed_date", pdfField: "status_changed_date", type: "date", required: true,
      condition: needsStatusChange, validate: isValidDate,
      message: "Enter a valid requested effective date."
   },
   ...radioGroup(peopleIds, "applying_number_people-feedback", "Select who is included in this application."),
   {
      id: "total_people", pdfField: "total_people", type: "number", required: true,
      condition: hasPeopleSelection,
      validate: value => /^[1-9][0-9]*$/.test(value) && Number.isSafeInteger(Number(value)) &&
         (isChecked("applying_number_people_only") ? value === "1" : Number(value) >= 2),
      message: "Enter a whole number of at least 2 for a family application, including yourself."
   },
   {
      id: "name_school", pdfField: "name_school", type: "text", required: false,
      validate: () => true, message: ""
   },
   {
      id: "sevis", pdfField: "sevis", type: "text", required: false,
      validate: value => /^N[0-9]{10}$/.test(value),
      message: "Enter a SEVIS ID starting with N followed by 10 digits, or leave it blank if not applicable."
   }
];
