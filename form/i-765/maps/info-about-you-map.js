const fields = [

    // =========================
    // Full Legal Name
    // =========================

    {
        id: "family_name",
        required: true,
        validate: (value) => value.trim().length > 0,
        message: "Please enter your family name (last name)."
    },

    {
        id: "given_name",
        required: true,
        validate: (value) => value.trim().length > 0,
        message: "Please enter your given name (first name)."
    },

    {
        id: "middle_name",
        required: false,
        validate: () => true,
        message: ""
    },



    // =========================
    // Other Names Used
    // Entire section optional
    // =========================

    {
        id: "othername_familyname_1",
        required: false,
        validate: () => true,
        message: ""
    },

    {
        id: "othername_givenname_1",
        required: false,
        validate: () => true,
        message: ""
    },

    {
        id: "othername_middlename_1",
        required: false,
        validate: () => true,
        message: ""
    },



    {
        id: "othername_familyname_2",
        required: false,
        validate: () => true,
        message: ""
    },

    {
        id: "othername_givenname_2",
        required: false,
        validate: () => true,
        message: ""
    },

    {
        id: "othername_middlename_2",
        required: false,
        validate: () => true,
        message: ""
    },



    {
        id: "othername_familyname_3",
        required: false,
        validate: () => true,
        message: ""
    },

    {
        id: "othername_givenname_3",
        required: false,
        validate: () => true,
        message: ""
    },

    {
        id: "othername_middlename_3",
        required: false,
        validate: () => true,
        message: ""
    },



    {
        id: "othername_additional_info",
        required: false,
        validate: () => true,
        message: ""
    },



    // =========================
    // Mailing Address
    // =========================

    {
        id: "incare_of_name",
        required: false,
        validate: () => true,
        message: ""
    },

    {
        id: "mailing_street",
        required: true,
        validate: (value) => value.trim().length > 0,
        message: "Please enter your street number and name."
    },

    {
        id: "mailing_number",
        required: false,
        validate: () => true,
        message: ""
    },

    {
        id: "mailing_city",
        required: true,
        validate: (value) => value.trim().length > 0,
        message: "Please enter your city or town."
    },

    {
        id: "mailing_state",
        required: false,
        validate: () => true,
        message: ""
    },

    {
        id: "mailing_zip",
        required: false,
        validate: () => true,
        message: ""
    },



   // =========================
    // Physical same as mailing
    // =========================

    {
        id: "physical_mailing_same",
        type: "radio-group",

        validate: () => {
            return (
                document.getElementById("physical_mailing_same_yes").checked ||
                document.getElementById("physical_mailing_same_no").checked
            );
        },

        radioIds: [
            "physical_mailing_same_yes",
            "physical_mailing_same_no"
        ],

        message: "Please select whether your physical and mailing address are the same."
    },


    // =========================
    // Physical Address
    // Required only if user selected "No"
    // =========================

    {
        id: "physical_street",
        required: false,
        condition: () =>
            document.getElementById("physical_mailing_same_no")?.checked,

        validate: (value) => value.trim().length > 0,

        message: "Please enter your physical street number and name."
    },

    {
        id: "physical_number",
        required: false,
        validate: () => true,
        message: ""
    },

    {
        id: "physical_city",
        required: false,

        condition: () =>
            document.getElementById("physical_mailing_same_no")?.checked,

        validate: (value) => value.trim().length > 0,

        message: "Please enter your physical city or town."
    },

    {
        id: "physical_state",
        required: false,
        validate: () => true,
        message: ""
    },

    {
        id: "physical_zip",
        required: false,
        validate: () => true,
        message: ""
    },



    // =========================
    // Other Information
    // =========================

    {
        id: "a_number",
        required: false,
        validate: () => true,
        message: ""
    },

    {
        id: "uscis_online",
        required: false,
        validate: () => true,
        message: ""
    },



    // =========================
    // Sex (Required)
    // =========================

    {
        id: "sex",
        type: "radio-group",

        validate: () => {
            return (
                document.getElementById("sex_male").checked ||
                document.getElementById("sex_female").checked
            );
        },

        radioIds: [
            "sex_male",
            "sex_female"
        ],

        message: "Please select your sex."
    },



    // =========================
    // Marital Status (Required)
    // =========================

    {
        id: "marital_status",
        type: "radio-group",

        validate: () => {
            return (
                document.getElementById("maritialstatus_single").checked ||
                document.getElementById("maritialstatus_married").checked ||
                document.getElementById("maritialstatus_divorced").checked ||
                document.getElementById("maritialstatus_widowed").checked
            );
        },

        radioIds: [
            "maritialstatus_single",
            "maritialstatus_married",
            "maritialstatus_divorced",
            "maritialstatus_widowed"
        ],

        message: "Please select your marital status."
    },



    // =========================
    // Filed I-765 (Required)
    // =========================

    {
        id: "filed_i765",
        type: "radio-group",

        validate: () => {
            return (
                document.getElementById("filed_i765_yes").checked ||
                document.getElementById("filed_i765_no").checked
            );
        },

        radioIds: [
            "filed_i765_yes",
            "filed_i765_no"
        ],

        message: "Please select whether you previously filed Form I-765."
    },



    {
        id: "social_security",
        required: false,
        validate: () => true,
        message: ""
    },



    // =========================
    // Citizenship / Nationality
    // =========================

    {
        id: "citizen_country_1",
        required: true,

        validate: (value) => value.trim().length > 0,

        message: "Please enter your country of citizenship or nationality."
    },

    {
        id: "citizen_country_2",
        required: false,
        validate: () => true,
        message: ""
    },

    {
        id: "citizen_country_additional_info",
        required: false,
        validate: () => true,
        message: ""
    },



    // =========================
    // Place of Birth
    // =========================

    {
        id: "city_of_birth",
        required: true,

        validate: (value) => value.trim().length > 0,

        message: "Please enter your city/town/village of birth."
    },

    {
        id: "state_of_birth",
        required: false,
        validate: () => true,
        message: ""
    },

    {
        id: "country_of_birth",
        required: true,

        validate: (value) => value.trim().length > 0,

        message: "Please enter your country of birth."
    },

    {
        id: "dob",
        required: true,

        validate: (value) => value.trim().length > 0,

        message: "Please enter your date of birth."
    },



    // =========================
    // Last Arrival Information
    // All Optional
    // =========================

    {
        id: "last_arrival_i94",
        required: false,
        validate: () => true,
        message: ""
    },

    {
        id: "last_arrival_passport",
        required: false,
        validate: () => true,
        message: ""
    },

    {
        id: "last_arrival_travel_document_number",
        required: false,
        validate: () => true,
        message: ""
    },

    {
        id: "last_arrival_travel_document_country",
        required: false,
        validate: () => true,
        message: ""
    },

    {
        id: "last_arrival_expiration_date",
        required: false,
        validate: () => true,
        message: ""
    },

    {
        id: "last_arrival_arrival_date",
        required: false,
        validate: () => true,
        message: ""
    },

    {
        id: "last_arrival_place",
        required: false,
        validate: () => true,
        message: ""
    },

    {
        id: "last_arrival_immigration_status",
        required: false,
        validate: () => true,
        message: ""
    },

    {
        id: "current_immigration_status",
        required: false,
        validate: () => true,
        message: ""
    },

    {
        id: "sevis_number",
        required: false,
        validate: () => true,
        message: ""
    },



    // =========================
    // Eligibility Category
    // All Optional
    // =========================

    {
        id: "eligibility_category_one",
        required: false,
        validate: () => true,
        message: ""
    },

    {
        id: "eligibility_category_two",
        required: false,
        validate: () => true,
        message: ""
    },

    {
        id: "eligibility_category_three",
        required: false,
        validate: () => true,
        message: ""
    },



    // =========================
    // STEM OPT
    // All Optional
    // =========================

    {
        id: "opt_degree",
        required: false,
        validate: () => true,
        message: ""
    },

    {
        id: "everify_employer",
        required: false,
        validate: () => true,
        message: ""
    },

    {
        id: "everify_company_id",
        required: false,
        validate: () => true,
        message: ""
    },



    // =========================
    // (c)(26)
    // Optional
    // =========================

    {
        id: "i797_receipt_number",
        required: false,
        validate: () => true,
        message: ""
    },



    // =========================
    // Arrested
    // Optional
    // =========================

    {
        id: "arrested",
        type: "radio-group",

        validate: () => true,

        radioIds: [
            "arrested_yes",
            "arrested_no"
        ],

        message: ""
    },



    // =========================
    // (c)(35) / (c)(36)
    // Optional
    // =========================

    {
        id: "i797_number",
        required: false,
        validate: () => true,
        message: ""
    },



    // =========================
    // Crime Record
    // Optional
    // =========================

    {
        id: "crime_record",
        type: "radio-group",

        validate: () => true,

        radioIds: [
            "crime_yes",
            "crime_no"
        ],

        message: ""
    }

];