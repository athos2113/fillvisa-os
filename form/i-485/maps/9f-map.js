// general-eligibility-9f-map.js

const fields = [

    // 72
    { id: "deported_usa_yes", label: "Question 72", validate: () => document.getElementById("deported_usa_yes").checked || document.getElementById("deported_usa_no").checked, message: "Please select Yes or No." },
    { id: "deported_usa_no",  label: "Question 72", validate: () => document.getElementById("deported_usa_yes").checked || document.getElementById("deported_usa_no").checked, message: "" },

    // 73
    { id: "entered_usa_yes", label: "Question 73", validate: () => document.getElementById("entered_usa_yes").checked || document.getElementById("entered_usa_no").checked, message: "Please select Yes or No." },
    { id: "entered_usa_no",  label: "Question 73", validate: () => document.getElementById("entered_usa_yes").checked || document.getElementById("entered_usa_no").checked, message: "" },

    // 74
    { id: "unlawful_present_yes", label: "Question 74", validate: () => document.getElementById("unlawful_present_yes").checked || document.getElementById("unlawful_present_no").checked, message: "Please select Yes or No." },
    { id: "unlawful_present_no",  label: "Question 74", validate: () => document.getElementById("unlawful_present_yes").checked || document.getElementById("unlawful_present_no").checked, message: "" },
    { id: "unlawful_present_details", label: "Question 74 Explanation", validate: () => true, message: "" },

    // 75
    { id: "severe_traffick_yes", label: "Question 75", validate: () => document.getElementById("severe_traffick_yes").checked || document.getElementById("severe_traffick_no").checked, message: "Please select Yes or No." },
    { id: "severe_traffick_no",  label: "Question 75", validate: () => document.getElementById("severe_traffick_yes").checked || document.getElementById("severe_traffick_no").checked, message: "" },

    // 76.a
    { id: "present_oneyear_yes", label: "Question 76.a", validate: () => document.getElementById("present_oneyear_yes").checked || document.getElementById("present_oneyear_no").checked, message: "Please select Yes or No." },
    { id: "present_oneyear_no",  label: "Question 76.a", validate: () => document.getElementById("present_oneyear_yes").checked || document.getElementById("present_oneyear_no").checked, message: "" },

    // 76.b
    { id: "removed_usa_yes", label: "Question 76.b", validate: () => document.getElementById("removed_usa_yes").checked || document.getElementById("removed_usa_no").checked, message: "Please select Yes or No." },
    { id: "removed_usa_no",  label: "Question 76.b", validate: () => document.getElementById("removed_usa_yes").checked || document.getElementById("removed_usa_no").checked, message: "" },

];
