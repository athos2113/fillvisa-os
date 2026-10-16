/* Shared I-485 applicability. Load after the page map and handlers.
 * Validation conditions and control applicability are deliberately separate:
 * optional rows/preparer/interpreter fields must remain editable when blank.
 */
(() => {
    "use strict";
    const section = document.currentScript.dataset.section;
    const byId = id => document.getElementById(id);
    const checked = id => !!byId(id)?.checked;
    const controls = () => [...document.querySelectorAll("input[id], select[id], textarea[id]")];
    const rules = new Map();

    function depend(selector, condition) {
        document.querySelectorAll(selector).forEach(el => {
            if (!rules.has(el)) rules.set(el, []);
            rules.get(el).push(condition);
        });
    }
    function block(id, condition) {
        depend(`#${id} input, #${id} select, #${id} textarea`, condition);
    }
    function prefix(name, condition) {
        controls().filter(el => el.id.startsWith(name)).forEach(el => depend(`#${el.id}`, condition));
    }

    // Map prerequisites for the follow-up questions, including both radio choices.
    if (["9a", "9b", "9f", "9g"].includes(section)) {
        fields.filter(f => f.condition).forEach(f => depend(`#${f.id}`, f.condition));
    }
    if (section === "9a") block("org_block", () => checked("org_yes"));

    if (section === "1") {
        [["otherDobBlock", "other_dob_yes"], ["aNumberBlock", "a_number_yes"],
            ["otherANumberBlock", "other_a_number_yes"], ["mailing_address_block", "mailing_address_no"],
            ["prior_address_block", "residing_address_no"], ["ssnNumberWrapper", "ssn_issued_yes"],
            ["consentDisclosureWrapper", "ssn_new_yes"]].forEach(([id, parent]) => block(id, () => checked(parent)));
        ["usa_arrival_inspected_admitted", "usa_arrival_inspected_paroled", "usa_arrival_other"]
            .forEach(id => depend(`#${id}_detail`, () => checked(id)));
    }
    if (section === "2") {
        const category = name => part2Groups.find(g => g.name === name).ids.some(checked);
        depend("#adjustment_ina_yes, #adjustment_ina_no", () =>
            category("family") || category("employment") || category("special_immigrant") || checked("additionaloption_diversity"));
        prefix("principal_", () => checked("i485_derivative"));
        prefix("employment_i140_", () => category("employment"));
        block("employment_i140_nested", () => category("employment") && checked("employment_i140_yes"));
        depend("#asylum_date", () => checked("asylum_status"));
        depend("#refugee_date", () => checked("refugee_status"));
        depend("#additionaloption_diversity_rank", () => checked("additionaloption_diversity"));
        depend("#additionaloption_other_text", () => checked("additionaloption_other"));
    }
    if (section === "4") {
        ["city", "country", "decision", "decision_date"].forEach(name =>
            depend(`#permanent_resident_${name}`, () => checked("permanent_resident_yes")));
    }
    if (section === "6") {
        const current = () => checked("maritialstatus_married") || checked("maritialstatus_seperated");
        const prior = () => Number(byId("maritialstatus_marriage_number").value) > (current() ? 1 : 0);
        prefix("currentspouse_", current);
        prefix("priorspouse_", prior);
        depend("#priorspouse_ended_other_explain", () => checked("priorspouse_ended_other"));
        // The spouse's armed-forces question explicitly offers N/A; keep that choice available.
    }
    if (section === "7") {
        prefix("childone_", () => Number(byId("number_children").value) >= 1);
        prefix("childtwo_", () => Number(byId("number_children").value) >= 2);
    }
    if (section === "9d") {
        block("public_charge_followup_block", () => checked("exempt_nope"));
        block("item_64_block", () => checked("exempt_nope") && checked("ssi_needy_yes"));
        depend("#school_less_diploma_text", () => checked("exempt_nope") && checked("school_less_diploma"));
        // Do not disable empty optional benefit rows based on isBenefitRowActive():
        // it is a validation requirement, not a prerequisite for entering data.
    }

    // Match the existing explanation controls. Keep Part 9A explanations editable
    // for either answer: its wording also permits explanations for an unsure No.
    if (/^9/.test(section)) {
        controls().filter(el => el.id.endsWith("_details")).forEach(el => {
            const base = el.id.slice(0, -8);
            if (byId(`${base}_yes`)) depend(`#${el.id}`, () =>
                checked(`${base}_yes`) || (section === "9a" && checked(`${base}_no`)));
        });
    }

    // Apply the AND of all prerequisites once. A later rule must never re-enable
    // a child whose outer section is inapplicable. Add missing radio map entries.
    rules.forEach((conditions, el) => {
        let config = fields.find(f => f.id === el.id);
        if (!config && el.type === "radio" && el.name) {
            const peer = fields.find(f => byId(f.id)?.name === el.name && byId(f.id)?.type === "radio");
            if (peer) {
                config = { ...peer, id: el.id };
                fields.push(config);
            }
        }
        if (config) {
            const previous = config.condition;
            config.condition = () => (!previous || previous()) && conditions.every(test => test());
        }
    });

    function clearFeedback(el) {
        el.classList.remove("is-valid", "is-invalid");
        el.removeAttribute("aria-invalid");
        el.setCustomValidity("");
        const group = el.closest(".mb-4, .mb-3, .col-md-6, .col-12") || el.parentElement;
        // Avoid removing another, still-applicable question's feedback.
        if (group && [...group.querySelectorAll("input, select, textarea")].every(control => control.disabled)) {
            group.classList.remove("is-valid", "is-invalid");
            group.querySelectorAll(".is-valid, .is-invalid").forEach(node => node.classList.remove("is-valid", "is-invalid"));
            group.querySelectorAll(".valid-feedback, .invalid-feedback").forEach(node => { node.style.display = "none"; });
        }
    }

    function synchronize() {
        // Iterate to a fixed point: clearing a parent answer can deactivate a child
        // even if its rule appeared earlier in the map.
        let changed;
        do {
            changed = false;
            rules.forEach((conditions, el) => {
                el.disabled = !conditions.every(test => test());
                if (el.disabled) {
                    if (el.type === "radio" || el.type === "checkbox") {
                        changed = el.checked || changed;
                        el.checked = false;
                    } else {
                        changed = el.value !== "" || changed;
                        el.value = "";
                    }
                    clearFeedback(el);
                }
            });
        } while (changed);
        if (/^9/.test(section)) {
            controls().filter(el => el.id.endsWith("_details")).forEach(el => {
                byId(`${el.id}_block`)?.classList.toggle("d-none", el.disabled);
            });
        }
    }

    // The existing serializers also feed autosave and, through localStorage, PDF
    // generation. Normalize before every serialization, including direct saves.
    const serialize = window.getFormData;
    window.getFormData = function () {
        synchronize();
        return serialize();
    };
    const save = window.saveFormToLocalStorage;
    window.saveFormToLocalStorage = function () {
        synchronize();
        const before = localStorage.getItem(`i485-${section}`);
        const result = save();
        if (localStorage.getItem(`i485-${section}`) !== before) {
            localStorage.setItem(`i485Valid-${section}`, "false");
            window.updateSidebarStatus?.();
            window.updateMobileNavStatus?.();
        }
        return result;
    };
    ["input", "change"].forEach(event => {
        document.addEventListener(event, synchronize, true); // before target autosave listeners
        document.addEventListener(event, synchronize); // after existing visibility handlers
    });
    ["shown.bs.collapse", "hidden.bs.collapse"].forEach(event =>
        document.addEventListener(event, () => window.saveFormToLocalStorage()));
    window.addEventListener("DOMContentLoaded", () => {
        synchronize(); // registered after the existing saved-data restoration
        if (localStorage.getItem(`i485-${section}`) !== null) window.saveFormToLocalStorage();
    });
    const submit = window.submitForm;
    window.submitForm = function () {
        window.saveFormToLocalStorage();
        return submit(); // only successful validation sets completion back to true
    };
})();
