// Part 1 validation map. IDs match the AcroForm names in fillvisa_i539_acro.pdf.
const mailingUnitIds = ["mailing_apt", "mailing_ste", "mailing_flr"];
const physicalUnitIds = ["physical_apt", "physical_ste", "physical_flr"];
const samePhysicalIds = ["same_physical_yes", "same_physical_no"];
const isChecked = id => document.getElementById(id).checked;
const hasValue = id => document.getElementById(id).value.trim() !== "";
const needsPhysicalAddress = () => isChecked("same_physical_no");
const hasTravelDocument = () => hasValue("passport_number") || hasValue("travel_number");
const isValidZip = value => /^[0-9]{5}(-[0-9]{4})?$/.test(value);

function isValidDate(value) {
   if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(value) || value.startsWith("0000")) return false;
   const date = new Date(`${value}T00:00:00Z`);
   return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function isNotFutureDate(value) {
   if (!isValidDate(value)) return false;
   const today = new Date();
   const localToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
   return value <= localToday;
}

function textField(id, message, options = {}) {
   return { id, pdfField: id, type: "text", required: true, validate: value => value !== "", message, ...options };
}

function optionalField(id, options = {}) {
   return textField(id, "", { required: false, validate: () => true, ...options });
}

function booleanField(id, type = "radio", options = {}) {
   return optionalField(id, { type, ...options });
}

function stateIsValid(id, value) {
   return value !== "" && Array.from(document.getElementById(id).options).some(option => option.value === value);
}

const fields = [
   textField("lastname", "Family name is required."),
   textField("firstname", "Given name is required."),
   optionalField("middlename"),
   optionalField("a_number", {
      validate: value => /^[0-9]{1,9}$/.test(value),
      message: "Enter an A-Number of up to 9 digits, without the A prefix, or leave it blank."
   }),
   optionalField("uscis_number", {
      validate: value => /^[0-9]{12}$/.test(value),
      message: "Enter a 12-digit USCIS Online Account Number, or leave it blank."
   }),
   optionalField("mailing_incare"),
   textField("mailing_street", "Mailing street number and name is required."),
   ...mailingUnitIds.map(id => booleanField(id)),
   textField("mailing_number", "Enter the mailing unit number.", { condition: () => mailingUnitIds.some(isChecked) }),
   textField("mailing_city", "Mailing city or town is required."),
   textField("mailing_state", "Select a mailing state.", { validate: value => stateIsValid("mailing_state", value) }),
   textField("mailing_zip", "Enter a mailing ZIP Code (12345 or 12345-6789).", { validate: isValidZip }),
   booleanField("same_physical_yes", "radio", {
      required: true,
      group: samePhysicalIds,
      feedbackId: "same_physical-feedback",
      validate: () => samePhysicalIds.filter(isChecked).length === 1,
      message: "Select whether your mailing and physical addresses are the same."
   }),
   booleanField("same_physical_no"),
   textField("physical_street", "Physical street number and name is required.", { condition: needsPhysicalAddress }),
   ...physicalUnitIds.map(id => booleanField(id, "radio", { condition: needsPhysicalAddress })),
   textField("physical_number", "Enter the physical address unit number.", {
      condition: () => needsPhysicalAddress() && physicalUnitIds.some(isChecked)
   }),
   textField("physical_city", "Physical city or town is required.", { condition: needsPhysicalAddress }),
   textField("physical_state", "Select a physical address state.", {
      condition: needsPhysicalAddress, validate: value => stateIsValid("physical_state", value)
   }),
   textField("physical_zip", "Enter a physical address ZIP Code (12345 or 12345-6789).", {
      condition: needsPhysicalAddress, validate: isValidZip
   }),
   textField("country_birth", "Country of birth is required."),
   textField("country_nationality", "Country of citizenship or nationality is required."),
   textField("dob", "Enter a valid date of birth that is not in the future.", { type: "date", validate: isNotFutureDate }),
   optionalField("ssn", { validate: value => /^[0-9]{9}$/.test(value), message: "Enter a 9-digit Social Security number, or leave it blank." }),
   textField("arrival_date", "Enter a valid last arrival date, on or after your birth date and not in the future.", {
      type: "date",
      validate: value => isNotFutureDate(value) && (!isValidDate(document.getElementById("dob").value) || value >= document.getElementById("dob").value)
   }),
   textField("i94_number", "Enter the 11-character I-94 record number using letters and digits.", { validate: value => /^[a-z0-9]{11}$/i.test(value) }),
   optionalField("passport_number"),
   optionalField("travel_number"),
   textField("country_issuance", "Enter the country that issued your passport or travel document.", { required: hasTravelDocument }),
   textField("passport_expiry_date", "Enter a valid passport or travel document expiration date.", {
      type: "date", required: hasTravelDocument, validate: isValidDate
   }),
   textField("nonimmigrant_status", "Current nonimmigrant status is required."),
   textField("status_expiry_date", "Enter a valid status expiration date, or select Duration of Status (D/S).", {
      type: "date", condition: () => !isChecked("granted_duration_status"), validate: isValidDate
   }),
   booleanField("granted_duration_status", "checkbox")
];
