const formKey = "i539-4";
const validPrefix = "i539Valid-";
const validKey = `${validPrefix}4`;
const applicantForm = document.getElementById("i539Form");
let submitted = false;
let employmentAnswer = null;
const touched = new Set();

// === 1. Setup Autosave Toast ===
const autosaveToast = document.createElement("div");
autosaveToast.id = "autosave-toast";
autosaveToast.style.cssText =
   "display:none; position:fixed; bottom:30px; right:30px; background:#d1e7dd; color:#0f5132; padding:12px 20px; border-radius:6px; box-shadow:0 2px 8px rgba(0,0,0,0.15); z-index:1000;";
autosaveToast.innerText = "\u2705 Autosaved";
autosaveToast.setAttribute("role", "status");
autosaveToast.setAttribute("aria-live", "polite");
document.body.appendChild(autosaveToast);
let autosaveToastTimer;

function showAutosaveToast() {
   clearTimeout(autosaveToastTimer);
   autosaveToast.style.display = "block";
   autosaveToastTimer = setTimeout(() => {
      autosaveToast.style.display = "none";
   }, 1500);
}

function isBoolean(field) {
   return field.type === "radio" || field.type === "checkbox";
}

function getFormData() {
   return Object.fromEntries(fields.map(field => {
      const element = document.getElementById(field.id);
      return [field.id, isBoolean(field) ? element.checked : element.value];
   }));
}

function clearField(element) {
   if (element.type === "radio" || element.type === "checkbox") element.checked = false;
   else element.value = "";
   element.classList.remove("is-valid", "is-invalid");
   element.removeAttribute("aria-invalid");
   touched.delete(element.id);
}

function toggleConditionalSections() {
   const unitNumber = document.getElementById("applicant_physical_number");
   unitNumber.disabled = !unitIds.some(isChecked);
   if (unitNumber.disabled) clearField(unitNumber);

   questions.forEach(question => {
      const show = needsDetails(question.id);
      const details = document.getElementById(`${question.id}_details`);
      document.getElementById(`${question.id}_details_block`).classList.toggle("d-none", !show);
      details.disabled = !show;
      if (!show) clearField(details);
   });
   const employedYes = isChecked("employed_yes");
   document.getElementById("employed_details_label").textContent = employedYes
      ? "Optional: Explain your employment" : "Optional: Explain how you support yourself";
   document.getElementById("employed_details-help").textContent = employedYes
      ? "Describe all periods of employment, including employer names and addresses, weekly income, and whether USCIS specifically authorized the employment."
      : "Describe how you support yourself, including the source, amount, and basis of any income. Include documentary evidence with your application.";

   fields.forEach(field => {
      const element = document.getElementById(field.id);
      const required = typeof field.required === "function" ? field.required() : field.required;
      element.required = !!required && !element.disabled && (!field.condition || field.condition());
   });
}

function fieldError(field) {
   const element = document.getElementById(field.id);
   if (element.disabled || (field.condition && !field.condition())) return "";
   const value = isBoolean(field) ? element.checked : element.value.trim();
   const required = typeof field.required === "function" ? field.required() : field.required;
   if (!isBoolean(field) && value === "" && !required && !element.validity.badInput) return "";
   return field.validate(value) ? "" : field.message;
}

function validateFieldById(id) {
   // Resolve any radio in a group to its single shared validation rule.
   const groupField = fields.find(field => field.group?.includes(id));
   if (groupField) id = groupField.id;
   const field = fields.find(item => item.id === id);
   if (!field) return "";
   const error = fieldError(field);
   const targets = field.group || [field.id];
   targets.forEach(target => {
      const element = document.getElementById(target);
      const active = !element.disabled && (!field.condition || field.condition());
      element.classList.toggle("is-invalid", active && !!error);
      element.classList.toggle("is-valid", active && !error && (!isBoolean(field) || !!field.group));
      element.setAttribute("aria-invalid", String(active && !!error));
   });
   const feedback = document.getElementById(field.feedbackId || `${id}-feedback`);
   if (feedback) {
      feedback.textContent = error;
      if (field.group) feedback.classList.toggle("d-block", !!error);
   }
   return error;
}

function updateNavigationStatus() {
   document.querySelectorAll("[data-page]").forEach(element => {
      const label = element.textContent.replace(/ \u2705$/, "");
      const valid = localStorage.getItem(`${validPrefix}${element.dataset.page}`) === "true";
      element.textContent = label + (valid ? " \u2705" : "");
   });
}

function saveFormToLocalStorage(validated = false) {
   try {
      // Invalidate before writing responses so a failed write never leaves stale approval.
      localStorage.setItem(validKey, "false");
      localStorage.setItem(formKey, JSON.stringify(getFormData()));
      if (validated) localStorage.setItem(validKey, "true");
      updateNavigationStatus();
      showAutosaveToast();
      return true;
   } catch (error) {
      autosaveToast.style.display = "none";
      alert("Your browser could not save these changes. Allow browser storage and try again before leaving this page.");
      return false;
   }
}

function handleFieldChange(event) {
   const id = event.target.id;
   if (!fields.some(field => field.id === id)) return;
   if (id === "employed_yes" || id === "employed_no") {
      const answer = isChecked("employed_yes") ? "yes" : "no";
      if (employmentAnswer !== null && employmentAnswer !== answer) {
         clearField(document.getElementById("employed_details"));
      }
      employmentAnswer = answer;
   }
   touched.add(id);
   toggleConditionalSections();
   // Recheck dependent fields already touched, as well as the changed field.
   fields.forEach(field => {
      if (submitted || touched.has(field.id)) validateFieldById(field.id);
   });
   saveFormToLocalStorage();
}

function submitForm(event) {
   if (event) event.preventDefault();
   submitted = true;
   toggleConditionalSections();
   const errors = [...new Set(fields.map(field => validateFieldById(field.id)).filter(Boolean))];
   if (!saveFormToLocalStorage(errors.length === 0)) return;
   if (errors.length) {
      alert("Please fix the following issues:\n\n" + errors.join("\n"));
      applicantForm.querySelector(".is-invalid")?.focus();
   } else {
      alert("\u2705 Form validated successfully.");
   }
}

function loadFormFromLocalStorage() {
   try {
      const raw = localStorage.getItem(formKey);
      const saved = raw === null ? null : JSON.parse(raw);
      if (saved !== null && (typeof saved !== "object" || Array.isArray(saved))) throw new Error("Invalid saved data");
      if (saved) {
         fields.forEach(field => {
            const element = document.getElementById(field.id);
            if (isBoolean(field)) element.checked = saved[field.id] === true;
            else element.value = typeof saved[field.id] === "string" ? saved[field.id] : "";
         });
      }
      employmentAnswer = isChecked("employed_yes") ? "yes" : (isChecked("employed_no") ? "no" : null);
      toggleConditionalSections();
      if (saved) {
         const normalized = JSON.stringify(getFormData());
         const changed = normalized !== JSON.stringify(saved);
         if (changed || fields.some(field => fieldError(field))) localStorage.setItem(validKey, "false");
         if (changed) localStorage.setItem(formKey, normalized);
      } else if (localStorage.getItem(validKey) === "true") {
         localStorage.setItem(validKey, "false");
      }
      updateNavigationStatus();
   } catch (error) {
      toggleConditionalSections();
      alert("Saved responses could not be loaded. Check browser storage before editing; the saved record has not been cleared.");
   }
}

applicantForm.addEventListener("input", handleFieldChange);
applicantForm.addEventListener("change", handleFieldChange);
applicantForm.addEventListener("submit", submitForm);
document.getElementById("clearPhysicalUnit").addEventListener("click", () => {
   unitIds.forEach(id => clearField(document.getElementById(id)));
   toggleConditionalSections();
   fields.forEach(field => {
      if (submitted || touched.has(field.id)) validateFieldById(field.id);
   });
   saveFormToLocalStorage();
});
window.addEventListener("storage", event => {
   if (event.key === null || event.key.startsWith(validPrefix)) updateNavigationStatus();
});
loadFormFromLocalStorage();
