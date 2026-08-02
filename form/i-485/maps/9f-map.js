// general-eligibility-9f-map.js

const fields = [

    // 74
    { id: "deported_usa_yes", label: "Question 74", validate: () => document.getElementById("deported_usa_yes").checked || document.getElementById("deported_usa_no").checked, message: "Please select Yes or No." },
    { id: "deported_usa_no",  label: "Question 74", validate: () => document.getElementById("deported_usa_yes").checked || document.getElementById("deported_usa_no").checked, message: "" },

    // 75
    { id: "entered_usa_yes", label: "Question 75", validate: () => document.getElementById("entered_usa_yes").checked || document.getElementById("entered_usa_no").checked, message: "Please select Yes or No." },
    { id: "entered_usa_no",  label: "Question 75", validate: () => document.getElementById("entered_usa_yes").checked || document.getElementById("entered_usa_no").checked, message: "" },

    // 76
    { id: "unlawful_present_yes", label: "Question 76", validate: () => document.getElementById("unlawful_present_yes").checked || document.getElementById("unlawful_present_no").checked, message: "Please select Yes or No." },
    { id: "unlawful_present_no",  label: "Question 76", validate: () => document.getElementById("unlawful_present_yes").checked || document.getElementById("unlawful_present_no").checked, message: "" },
    { id: "unlawful_present_details", label: "Question 76 Explanation", validate: () => true, message: "" },

    // 77
    { id: "severe_traffick_yes", label: "Question 77", validate: () => document.getElementById("severe_traffick_yes").checked || document.getElementById("severe_traffick_no").checked, message: "Please select Yes or No." },
    { id: "severe_traffick_no",  label: "Question 77", validate: () => document.getElementById("severe_traffick_yes").checked || document.getElementById("severe_traffick_no").checked, message: "" },

    // 78.a
    { id: "present_oneyear_yes", label: "Question 78.a", validate: () => document.getElementById("present_oneyear_yes").checked || document.getElementById("present_oneyear_no").checked, message: "Please select Yes or No." },
    { id: "present_oneyear_no",  label: "Question 78.a", validate: () => document.getElementById("present_oneyear_yes").checked || document.getElementById("present_oneyear_no").checked, message: "" },

    // 78.b
    { id: "removed_usa_yes", label: "Question 78.b", validate: () => document.getElementById("removed_usa_yes").checked || document.getElementById("removed_usa_no").checked, message: "Please select Yes or No." },
    { id: "removed_usa_no",  label: "Question 78.b", validate: () => document.getElementById("removed_usa_yes").checked || document.getElementById("removed_usa_no").checked, message: "" },

];
