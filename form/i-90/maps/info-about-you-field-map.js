// === I-90 Field Validation Config ===
const fields = [

    // --- A-Number ---
    {
        id: "a_number",
        required: false,
        validate: v => v === "" || /^\d{1,9}$/.test(v),
        message: "Please enter a valid A-Number (up to 9 digits) or leave blank if not applicable."
    },

    // --- USCIS Online Account Number ---
    {
        id: "uscis_online",
        required: false,
        validate: v => v === "" || /^\d{1,12}$/.test(v), // allow up to 12 digits (USCIS account usually 12)
        message: "Please enter a valid USCIS Online Account Number (up to 12 digits) or leave blank if not applicable."
    },
    // --- Your Full Name ---
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

    // --- Name Change (radio) ---
    {
        id: "name_changed",
        required: true,
        validate: () => {
            const selected = document.querySelector('input[name="name_changed"]:checked');
            return !!selected;
        },
        message: "Please select whether your name has legally changed."
    },

    // --- New Name Fields (only required if name_changed === 'yes') ---
    {
        id: "new_family",
        required: true,
        condition: () => document.querySelector('input[name="name_changed"]:checked')?.value === "yes",
        validate: v => v !== "",
        message: "New Family Name (Last) is required when your name has changed."
    },
    {
        id: "new_given",
        required: true,
        condition: () => document.querySelector('input[name="name_changed"]:checked')?.value === "yes",
        validate: v => v !== "",
        message: "New Given Name (First) is required when your name has changed."
    },
    {
        id: "new_middle",
        required: false,
        condition: () => document.querySelector('input[name="name_changed"]:checked')?.value === "yes",
        validate: v => true,
        message: ""
    },

    // --- Mailing Address ---
    {
        id: "incare_of_name",
        required: false,
        validate: v => true,
        message: ""
    },
    {
        id: "mailing_street",
        required: true,
        validate: v => v !== "",
        message: "Mailing Street Number & Name is required."
    },
    {
        id: "mailing_number",
        required: false,
        validate: v => true,
        message: ""
    },
    {
        id: "mailing_city",
        required: true,
        validate: v => v !== "",
        message: "Mailing City or Town is required."
    },
    {
        id: "mailing_state",
        required: true,
        validate: v => v !== "",
        message: "Mailing State is required."
    },
    {
        id: "mailing_zip",
        required: true,
        validate: v => /^\d{5}(-\d{4})?$/.test(v),
        message: "Please enter a valid ZIP Code (##### or #####-####)."
    },
    {
        id: "mailing_province",
        required: false,
        validate: v => true,
        message: ""
    },
    {
        id: "mailing_postal_code",
        required: false,
        validate: v => true,
        message: ""
    },
    {
        id: "mailing_country",
        required: false,
        validate: v => true,
        message: ""
    },

    // --- Physical / Mailing Address Same (radio) ---
    {
        id: "physical_mailing_same",
        required: true,
        validate: () => {
            const selected = document.querySelector('input[name="physical_mailing_same"]:checked');
            return !!selected;
        },
        message: "Please select whether your physical address is the same as your mailing address."
    },

    // --- Physical Address (only if physical_mailing_same === 'no') ---
    {
        id: "physical_street",
        required: true,
        condition: () => document.querySelector('input[name="physical_mailing_same"]:checked')?.value === "no",
        validate: v => v !== "",
        message: "Physical Street Number & Name is required."
    },
    {
        id: "physical_number",
        required: false,
        condition: () => document.querySelector('input[name="physical_mailing_same"]:checked')?.value === "no",
        validate: v => true,
        message: ""
    },
    {
        id: "physical_city",
        required: true,
        condition: () => document.querySelector('input[name="physical_mailing_same"]:checked')?.value === "no",
        validate: v => v !== "",
        message: "Physical City or Town is required."
    },
    {
        id: "physical_state",
        required: true,
        condition: () => document.querySelector('input[name="physical_mailing_same"]:checked')?.value === "no",
        validate: v => v !== "",
        message: "Physical State is required."
    },
    {
        id: "physical_zip",
        required: true,
        condition: () => document.querySelector('input[name="physical_mailing_same"]:checked')?.value === "no",
        validate: v => /^\d{5}(-\d{4})?$/.test(v),
        message: "Please enter a valid physical ZIP Code."
    },
    {
        id: "physical_province",
        required: false,
        condition: () => document.querySelector('input[name="physical_mailing_same"]:checked')?.value === "no",
        validate: v => true,
        message: ""
    },
    {
        id: "physical_postal_code",
        required: false,
        condition: () => document.querySelector('input[name="physical_mailing_same"]:checked')?.value === "no",
        validate: v => true,
        message: ""
    },
    {
        id: "physical_country",
        required: false,
        condition: () => document.querySelector('input[name="physical_mailing_same"]:checked')?.value === "no",
        validate: v => true,
        message: ""
    },
    // --- Sex ---
    {
        id: "gender",
        required: true,
        validate: v => v !== "",
        message: "Please select your sex."
    },

    // --- Date of Birth (split day / month / year) ---
    {
        id: "dob",
        required: true,
        validate: v => v !== "",
        message: "Please select your birth day."
    },
    // --- Place of Birth ---
    {
        id: "city_of_birth",
        required: true,
        validate: v => v !== "",
        message: "City, town, or village of birth is required."
    },
    {
        id: "country_of_birth",
        required: true,
        validate: v => v !== "",
        message: "Country of birth is required."
    },

    // --- Mother’s Name ---
    {
        id: "mother_name",
        required: true,
        validate: v => v !== "",
        message: "Mother’s given name (first name) is required."
    },

    // --- Father’s Name ---
    {
        id: "father_name",
        required: true,
        validate: v => v !== "",
        message: "Father’s given name (first name) is required."
    },

    // --- Class of Admission ---
    {
        id: "class_admission",
        required: true,
        validate: v => v !== "",
        message: "Class of admission is required."
    },

    // --- Date of Admission (split) ---
    {
        id: "admission",
        required: true,
        validate: v => v !== "",
        message: "Please select your admission date."
    },

    // --- U.S. Social Security Number (optional) ---
    {
        id: "social_security",
        required: false,
        validate: v => v === "" || /^\d{3}-?\d{2}-?\d{4}$/.test(v),
        message: "Please enter a valid 9-digit Social Security Number or leave blank if not applicable."
    }
];
