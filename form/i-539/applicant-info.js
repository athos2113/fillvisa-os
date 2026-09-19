const formKey = "i539-5";
const validPrefix = "i539Valid-";
const validKey = `${validPrefix}5`;
const applicantForm = document.getElementById("i539Form");
let submitted = false;
const touched = new Set();
let signatureBuffer = "";
let signatureRevision = 0;

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
      if (field.type === "signature") return [field.id, signatureBuffer];
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
   fields.forEach(field => {
      if (field.type !== "signature") document.getElementById(field.id).required = !!field.required;
   });
}

function fieldError(field) {
   if (field.type === "signature") return "";
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
   if (!field || field.type === "signature") return "";
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

function saveFormToLocalStorage(validated = null) {
   try {
      const serialized = JSON.stringify(getFormData());
      const changed = localStorage.getItem(formKey) !== serialized;
      // Duplicate input/change events must not undo a successful submission.
      if (!changed && validated === null) return true;
      // Invalidate before writing responses so a failed write never leaves stale approval.
      localStorage.setItem(validKey, "false");
      if (changed) localStorage.setItem(formKey, serialized);
      if (validated === true) localStorage.setItem(validKey, "true");
      updateNavigationStatus();
      if (changed) showAutosaveToast();
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
            if (field.type === "signature") {
               signatureBuffer = typeof saved[field.id] === "string" && saved[field.id].startsWith("data:image/png;base64,") ? saved[field.id] : "";
               return;
            }
            if (isBoolean(field)) element.checked = saved[field.id] === true;
            else element.value = typeof saved[field.id] === "string" ? saved[field.id] : "";
         });
      }
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
window.addEventListener("storage", event => {
   if (event.key === null || event.key.startsWith(validPrefix)) updateNavigationStatus();
});

const preview = document.getElementById("alertPreview");
const full = document.getElementById("alertFull");
const toggle = document.getElementById("toggleAlertText");
toggle.addEventListener("click", event => {
   event.preventDefault();
   const expand = full.classList.contains("d-none");
   full.classList.toggle("d-none", !expand);
   preview.classList.toggle("d-none", expand);
   toggle.textContent = expand ? "Read less" : "Read more";
   toggle.setAttribute("aria-expanded", String(expand));
});

const canvas = document.getElementById('signatureApplicant');
const ctx = canvas.getContext('2d');

let drawing = false;
let strokeChanged = false;
let prevX = 0,
    prevY = 0;

// Convert event (mouse or touch) to canvas coordinates
function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;

    if (e.touches && e.touches.length > 0) {
        return {
            x: (e.touches[0].clientX - rect.left) * scaleX,
            y: (e.touches[0].clientY - rect.top)  * scaleY
        };
    } else {
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top)  * scaleY
        };
    }
}


// Start drawing
function startDrawing(e) {
    signatureRevision++; // Prevent a late saved-image load from overwriting new strokes.
    drawing = true;
    strokeChanged = false;
    const pos = getPos(e);
    prevX = pos.x;
    prevY = pos.y;
}

// Draw
function draw(e) {
    if (!drawing) return;

    e.preventDefault(); // Prevent scrolling on touch draw

    const pos = getPos(e);

    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    strokeChanged = true;

    prevX = pos.x;
    prevY = pos.y;
}

// Stop drawing
function stopDrawing() {
    if (!drawing) return;
    drawing = false;
    if (!strokeChanged) return;
    strokeChanged = false;
    saveSignature();
}

// Mouse events
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);

// Touch events
canvas.addEventListener("touchstart", startDrawing);
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("touchend", stopDrawing);
canvas.addEventListener("touchcancel", stopDrawing);

function saveSignature() {
   signatureBuffer = canvas.toDataURL("image/png");
   saveFormToLocalStorage();
}

document.getElementById("clearBtn").addEventListener("click", () => {
   const hadSignature = signatureBuffer !== "" || strokeChanged;
   signatureRevision++;
   drawing = false;
   strokeChanged = false;
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   signatureBuffer = "";
   if (hadSignature) saveFormToLocalStorage();
});

loadFormFromLocalStorage();
if (signatureBuffer) {
   const revision = signatureRevision;
   const savedImage = new Image();
   savedImage.onload = () => {
      // A late image load must not undo a new stroke or an explicit Clear.
      if (revision !== signatureRevision) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(savedImage, 0, 0, canvas.width, canvas.height);
   };
   savedImage.src = signatureBuffer;
}

