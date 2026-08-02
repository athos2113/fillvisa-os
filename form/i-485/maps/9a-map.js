// affiliations-map.js

// ── Helpers ──────────────────────────────────────────────────────────────────

function isOrgYes() {
    const el = document.getElementById("org_yes");
    return el && el.checked;
}


// ── Fields ───────────────────────────────────────────────────────────────────

const fields = [

    // =========================================================================
    // Item 1 — Org membership (required: one must be selected)
    // =========================================================================
    {
        id: "org_yes",
        label: "Organization membership",
        validate: () =>
            document.getElementById("org_yes").checked ||
            document.getElementById("org_no").checked,
        message: "Please select Yes or No."
    },
    {
        id: "org_no",
        label: "Organization membership",
        validate: () =>
            document.getElementById("org_yes").checked ||
            document.getElementById("org_no").checked,
        message: ""
    },


    // =========================================================================
    // Organization 1 (required only if org_yes)
    // =========================================================================
    {
        id: "orgone_name",
        label: "Organization 1 – Name",
        condition: () => isOrgYes(),
        validate: v => v.trim() !== "",
        message: "Name of Organization is required."
    },
    {
        id: "orgone_city",
        label: "Organization 1 – City or Town",
        condition: () => isOrgYes(),
        validate: v => v.trim() !== "",
        message: "City or Town is required."
    },
    {
        id: "orgone_state",
        label: "Organization 1 – State or Province",
        condition: () => isOrgYes(),
        validate: v => v.trim() !== "",
        message: "State or Province is required."
    },
    {
        id: "orgone_country",
        label: "Organization 1 – Country",
        condition: () => isOrgYes(),
        validate: v => v.trim() !== "",
        message: "Country is required."
    },
    {
        id: "orgone_nature_org",
        label: "Organization 1 – Nature of Organization",
        condition: () => isOrgYes(),
        validate: v => v.trim() !== "",
        message: "Nature of Organization is required."
    },
    {
        id: "orgone_nature_involvement",
        label: "Organization 1 – Nature of Involvement",
        condition: () => isOrgYes(),
        validate: v => v.trim() !== "",
        message: "Nature of Involvement is required."
    },
    {
        id: "orgone_fromdate",
        label: "Organization 1 – From Date",
        condition: () => isOrgYes(),
        validate: v => v !== "",
        message: "Start date of membership is required."
    },
    {
        id: "orgone_todate",
        label: "Organization 1 – To Date",
        validate: () => true,
        message: ""
    },


    // =========================================================================
    // Organization 2 (optional)
    // =========================================================================
    {
        id: "orgtwo_name",
        label: "Organization 2 – Name",
        validate: () => true,
        message: ""
    },
    {
        id: "orgtwo_city",
        label: "Organization 2 – City or Town",
        validate: () => true,
        message: ""
    },
    {
        id: "orgtwo_state",
        label: "Organization 2 – State or Province",
        validate: () => true,
        message: ""
    },
    {
        id: "orgtwo_country",
        label: "Organization 2 – Country",
        validate: () => true,
        message: ""
    },
    {
        id: "orgtwo_org_nature",
        label: "Organization 2 – Nature of Organization",
        validate: () => true,
        message: ""
    },
    {
        id: "orgtwo_org_involvement",
        label: "Organization 2 – Nature of Involvement",
        validate: () => true,
        message: ""
    },
    {
        id: "orgtwo_fromdate",
        label: "Organization 2 – From Date",
        validate: () => true,
        message: ""
    },
    {
        id: "orgtwo_todate",
        label: "Organization 2 – To Date",
        validate: () => true,
        message: ""
    },


    // =========================================================================
    // Items 10–21 — both _yes and _no share same validate(); only _yes has message
    // =========================================================================

    // 10
    {
        id: "denied_admission_yes",
        label: "10. Denied admission to the United States",
        validate: () =>
            document.getElementById("denied_admission_yes").checked ||
            document.getElementById("denied_admission_no").checked,
        message: "Please select Yes or No."
    },
    {
        id: "denied_admission_no",
        label: "10. Denied admission to the United States",
        validate: () =>
            document.getElementById("denied_admission_yes").checked ||
            document.getElementById("denied_admission_no").checked,
        message: ""
    },
    {
        id: "denied_admission_details",
        label: "10. Denied admission – Explanation",
        validate: () => true,
        message: ""
    },

    // 11
    {
        id: "denied_visa_yes",
        label: "11. Denied a visa to the United States",
        validate: () =>
            document.getElementById("denied_visa_yes").checked ||
            document.getElementById("denied_visa_no").checked,
        message: "Please select Yes or No."
    },
    {
        id: "denied_visa_no",
        label: "11. Denied a visa to the United States",
        validate: () =>
            document.getElementById("denied_visa_yes").checked ||
            document.getElementById("denied_visa_no").checked,
        message: ""
    },
    {
        id: "denied_visa_details",
        label: "11. Denied visa – Explanation",
        validate: () => true,
        message: ""
    },

    // 12
    {
        id: "work_noauthorization_yes",
        label: "12. Worked in the United States without authorization",
        validate: () =>
            document.getElementById("work_noauthorization_yes").checked ||
            document.getElementById("work_noauthorization_no").checked,
        message: "Please select Yes or No."
    },
    {
        id: "work_noauthorization_no",
        label: "12. Worked in the United States without authorization",
        validate: () =>
            document.getElementById("work_noauthorization_yes").checked ||
            document.getElementById("work_noauthorization_no").checked,
        message: ""
    },
    {
        id: "work_noauthorization_details",
        label: "12. Worked without authorization – Explanation",
        validate: () => true,
        message: ""
    },

    // 13
    {
        id: "violated_nonimmigrant_yes",
        label: "13. Violated nonimmigrant status",
        validate: () =>
            document.getElementById("violated_nonimmigrant_yes").checked ||
            document.getElementById("violated_nonimmigrant_no").checked,
        message: "Please select Yes or No."
    },
    {
        id: "violated_nonimmigrant_no",
        label: "13. Violated nonimmigrant status",
        validate: () =>
            document.getElementById("violated_nonimmigrant_yes").checked ||
            document.getElementById("violated_nonimmigrant_no").checked,
        message: ""
    },
    {
        id: "violated_nonimmigrant_details",
        label: "13. Violated nonimmigrant status – Explanation",
        validate: () => true,
        message: ""
    },

    // 14
    {
        id: "expedited_removal_yes",
        label: "14. Removal or deportation proceedings",
        validate: () =>
            document.getElementById("expedited_removal_yes").checked ||
            document.getElementById("expedited_removal_no").checked,
        message: "Please select Yes or No."
    },
    {
        id: "expedited_removal_no",
        label: "14. Removal or deportation proceedings",
        validate: () =>
            document.getElementById("expedited_removal_yes").checked ||
            document.getElementById("expedited_removal_no").checked,
        message: ""
    },
    {
        id: "expedited_removal_details",
        label: "14. Removal proceedings – Explanation",
        validate: () => true,
        message: ""
    },

    // 15
    {
        id: "finalorder_yes",
        label: "15. Final order of exclusion, deportation, or removal",
        validate: () =>
            document.getElementById("finalorder_yes").checked ||
            document.getElementById("finalorder_no").checked,
        message: "Please select Yes or No."
    },
    {
        id: "finalorder_no",
        label: "15. Final order of exclusion, deportation, or removal",
        validate: () =>
            document.getElementById("finalorder_yes").checked ||
            document.getElementById("finalorder_no").checked,
        message: ""
    },
    {
        id: "finalorder_details",
        label: "15. Final order – Explanation",
        validate: () => true,
        message: ""
    },

    // 16
    {
        id: "prior_finalorder_yes",
        label: "16. Prior final order reinstated",
        validate: () =>
            document.getElementById("prior_finalorder_yes").checked ||
            document.getElementById("prior_finalorder_no").checked,
        message: "Please select Yes or No."
    },
    {
        id: "prior_finalorder_no",
        label: "16. Prior final order reinstated",
        validate: () =>
            document.getElementById("prior_finalorder_yes").checked ||
            document.getElementById("prior_finalorder_no").checked,
        message: ""
    },
    {
        id: "prior_finalorder_details",
        label: "16. Prior final order reinstated – Explanation",
        validate: () => true,
        message: ""
    },

    // 17
    {
        id: "voluntary_departure_yes",
        label: "17. Voluntary departure failure",
        validate: () =>
            document.getElementById("voluntary_departure_yes").checked ||
            document.getElementById("voluntary_departure_no").checked,
        message: "Please select Yes or No."
    },
    {
        id: "voluntary_departure_no",
        label: "17. Voluntary departure failure",
        validate: () =>
            document.getElementById("voluntary_departure_yes").checked ||
            document.getElementById("voluntary_departure_no").checked,
        message: ""
    },
    {
        id: "voluntary_departure_details",
        label: "17. Voluntary departure failure – Explanation",
        validate: () => true,
        message: ""
    },

    // 18
    {
        id: "relief_yes",
        label: "18. Applied for relief from removal",
        validate: () =>
            document.getElementById("relief_yes").checked ||
            document.getElementById("relief_no").checked,
        message: "Please select Yes or No."
    },
    {
        id: "relief_no",
        label: "18. Applied for relief from removal",
        validate: () =>
            document.getElementById("relief_yes").checked ||
            document.getElementById("relief_no").checked,
        message: ""
    },
    {
        id: "relief_details",
        label: "18. Applied for relief – Explanation",
        validate: () => true,
        message: ""
    },

    // 19
    {
        id: "j_nonimmigrant_yes",
        label: "19. J nonimmigrant exchange visitor",
        validate: () =>
            document.getElementById("j_nonimmigrant_yes").checked ||
            document.getElementById("j_nonimmigrant_no").checked,
        message: "Please select Yes or No."
    },
    {
        id: "j_nonimmigrant_no",
        label: "19. J nonimmigrant exchange visitor",
        validate: () =>
            document.getElementById("j_nonimmigrant_yes").checked ||
            document.getElementById("j_nonimmigrant_no").checked,
        message: ""
    },
    {
        id: "j_nonimmigrant_details",
        label: "19. J nonimmigrant – Explanation",
        validate: () => true,
        message: ""
    },

    // 20
    {
        id: "foreign_residence_yes",
        label: "20. Complied with foreign residence requirement",
        validate: () =>
            document.getElementById("foreign_residence_yes").checked ||
            document.getElementById("foreign_residence_no").checked,
        message: "Please select Yes or No."
    },
    {
        id: "foreign_residence_no",
        label: "20. Complied with foreign residence requirement",
        validate: () =>
            document.getElementById("foreign_residence_yes").checked ||
            document.getElementById("foreign_residence_no").checked,
        message: ""
    },
    {
        id: "foreign_residence_details",
        label: "20. Foreign residence requirement – Explanation",
        validate: () => true,
        message: ""
    },

    // 21
    {
        id: "grant_waiver_yes",
        label: "21. Granted waiver",
        validate: () =>
            document.getElementById("grant_waiver_yes").checked ||
            document.getElementById("grant_waiver_no").checked,
        message: "Please select Yes or No."
    },
    {
        id: "grant_waiver_no",
        label: "21. Granted waiver",
        validate: () =>
            document.getElementById("grant_waiver_yes").checked ||
            document.getElementById("grant_waiver_no").checked,
        message: ""
    },
    {
        id: "grant_waiver_details",
        label: "21. Granted waiver – Explanation",
        validate: () => true,
        message: ""
    },

];
