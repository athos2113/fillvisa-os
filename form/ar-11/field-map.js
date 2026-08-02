// === AR-11 Field Validation Config ===
const fields = [
    // --- Information About You ---
    {
        id: "family_name",
        required: true,
        validate: v => v !== "",
        message: "Family Name (Last Name) is required."
    },
    {
        id: "given_name",
        required: true,
        validate: v => v !== "",
        message: "Given Name (First Name) is required."
    },
    {
        id: "middle_name",
        required: false,
        validate: v => true,
        message: ""
    },
    {
        id: "dob",
        required: true,
        validate: v => /^\d{4}-\d{2}-\d{2}$/.test(v),
        message: "Please enter your date of birth (YYYY-MM-DD)."
    },
    {
        id: "a_number",
        required: false,
        validate: v => v === "" || /^\d{1,9}$/.test(v),
        message: "A-Number must contain up to 9 digits (or leave blank)."
    },

    // --- Present Physical Address ---
    {
        id: "present_street",
        required: true,
        validate: v => v !== "",
        message: "Street Number and Name is required."
    },
    {
        id: "present_number",
        required: false,
        validate: v => true,
        message: ""
    },
    {
        id: "present_city",
        required: true,
        validate: v => v !== "",
        message: "City or Town is required."
    },
    {
        id: "present_state",
        required: true,
        validate: v => v !== "",
        message: "Please select your state."
    },
    {
        id: "present_zip",
        required: true,
        validate: v => /^\d{5}(-\d{4})?$/.test(v),
        message: "Please enter a valid ZIP Code (##### or #####-####)."
    },

    // --- Previous Physical Address (optional section) ---
    {
        id: "previous_street",
        required: false,
        validate: v => true,
        message: ""
    },
    {
        id: "previous_number",
        required: false,
        validate: v => true,
        message: ""
    },
    {
        id: "previous_city",
        required: false,
        validate: v => true,
        message: ""
    },
    {
        id: "previous_state",
        required: false,
        validate: v => true,
        message: ""
    },
    {
        id: "previous_zip",
        required: false,
        validate: v => v === "" || /^\d{5}(-\d{4})?$/.test(v),
        message: "Please enter a valid previous ZIP Code."
    },

    // --- Mailing Address (optional) ---
    {
        id: "mailing_street",
        required: false,
        validate: v => true,
        message: ""
    },
    {
        id: "mailing_number",
        required: false,
        validate: v => true,
        message: ""
    },
    {
        id: "mailing_city",
        required: false,
        validate: v => true,
        message: ""
    },
    {
        id: "mailing_state",
        required: false,
        validate: v => true,
        message: ""
    },
    {
        id: "mailing_zip",
        required: false,
        validate: v => v === "" || /^\d{5}(-\d{4})?$/.test(v),
        message: "Please enter a valid mailing ZIP Code."
    },
    {
        id: "signature_client",
        required: false,
        validate: v => true,
        message: "Signature missing"
    }

];
