// maps/general-eligibility-9e-map.js

const fields = [

    // 67
    { id: "refuse_attend_yes", label: "Question 67", validate: () => document.getElementById("refuse_attend_yes").checked || document.getElementById("refuse_attend_no").checked, message: "Please select Yes or No." },
    { id: "refuse_attend_no",  label: "Question 67", validate: () => document.getElementById("refuse_attend_yes").checked || document.getElementById("refuse_attend_no").checked, message: "" },

    // 68
    { id: "fraud_document_yes", label: "Question 68", validate: () => document.getElementById("fraud_document_yes").checked || document.getElementById("fraud_document_no").checked, message: "Please select Yes or No." },
    { id: "fraud_document_no",  label: "Question 68", validate: () => document.getElementById("fraud_document_yes").checked || document.getElementById("fraud_document_no").checked, message: "" },

    // 69
    { id: "lied_visa_yes", label: "Question 69", validate: () => document.getElementById("lied_visa_yes").checked || document.getElementById("lied_visa_no").checked, message: "Please select Yes or No." },
    { id: "lied_visa_no",  label: "Question 69", validate: () => document.getElementById("lied_visa_yes").checked || document.getElementById("lied_visa_no").checked, message: "" },

    // 70
    { id: "false_claim_yes", label: "Question 70", validate: () => document.getElementById("false_claim_yes").checked || document.getElementById("false_claim_no").checked, message: "Please select Yes or No." },
    { id: "false_claim_no",  label: "Question 70", validate: () => document.getElementById("false_claim_yes").checked || document.getElementById("false_claim_no").checked, message: "" },

    // 71
    { id: "stowaway_yes", label: "Question 71", validate: () => document.getElementById("stowaway_yes").checked || document.getElementById("stowaway_no").checked, message: "Please select Yes or No." },
    { id: "stowaway_no",  label: "Question 71", validate: () => document.getElementById("stowaway_yes").checked || document.getElementById("stowaway_no").checked, message: "" },

    // 72
    { id: "aid_alien_yes", label: "Question 72", validate: () => document.getElementById("aid_alien_yes").checked || document.getElementById("aid_alien_no").checked, message: "Please select Yes or No." },
    { id: "aid_alien_no",  label: "Question 72", validate: () => document.getElementById("aid_alien_yes").checked || document.getElementById("aid_alien_no").checked, message: "" },

    // 73
    { id: "penalty_yes", label: "Question 73", validate: () => document.getElementById("penalty_yes").checked || document.getElementById("penalty_no").checked, message: "Please select Yes or No." },
    { id: "penalty_no",  label: "Question 73", validate: () => document.getElementById("penalty_yes").checked || document.getElementById("penalty_no").checked, message: "" },

];
