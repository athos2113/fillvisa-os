// === Field Validation Config ===
const fields = [
    {
        id: "applicant_last_name",
        required: true,
        validate: v => v !== "",
        message: "Applicant/Petitioner Last Name is required."
    },
    {
        id: "applicant_first_name",
        required: true,
        validate: v => v !== "",
        message: "Applicant/Petitioner First Name is required."
    },
    {
        id: "applicant_middle_name",
        required: false,
        validate: v => true,
        message: ""
    },
    {
        id: "email_address",
        required: true,
        validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        message: "A valid Email Address is required."
    },
    {
        id: "mobile_number",
        required: true,
        validate: v => /^[0-9]{7,}$/.test(v),
        message: "A valid Mobile Phone Number (at least 7 digits) is required."
    }
];
