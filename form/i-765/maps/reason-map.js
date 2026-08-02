// === I-765 Reason for Applying (Validation Config) ===
const fields = [
    {
        id: "reason_apply",
        required: true,
        validate: () => {
            const selected = document.querySelector('input[name="reason_apply"]:checked');
            return !!selected;
        },
        message: "Please select one reason for applying."
    }
];