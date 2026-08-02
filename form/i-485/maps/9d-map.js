// maps/general-eligibility-9d-map.js

function isPublicChargeExemptSelected() {
    return [
        "exempt_vawa",
        "exempt_juvenile",
        "exempt_afghani",
        "exempt_asylee",
        "exempt_refugee",
        "exempt_victim",
        "exempt_other_ina",
        "exempt_traffick_victim",
        "exempt_other_ina_l",
        "exempt_cuban",
        "exempt_cuban_battered",
        "exempt_haitian",
        "exempt_haitian_battered",
        "exempt_cuban_haitian",
        "exempt_lautenberg",
        "exempt_vietnam",
        "exempt_residence",
        "exempt_amerasian",
        "exempt_polish",
        "exempt_nicaraguan",
        "exempt_indian",
        "exempt_7611",
        "exempt_syrian",
        "exempt_armed",
        "exempt_nope"
    ].some(id => {
        const el = document.getElementById(id);
        return el && el.checked;
    });
}

function isHouseholdIncomeAnswered() {
    return [
        "household_income_one",
        "household_income_two",
        "household_income_third",
        "household_income_four",
        "household_income_five"
    ].some(id => document.getElementById(id).checked);
}

function isHouseholdAssetAnswered() {
    return [
        "household_asset_one",
        "household_asset_two",
        "household_asset_three",
        "household_asset_four",
        "household_asset_five"
    ].some(id => document.getElementById(id).checked);
}

function isHouseholdLiabilityAnswered() {
    return [
        "household_liability_one",
        "household_liability_two",
        "household_liability_three",
        "household_liability_four",
        "household_liability_five"
    ].some(id => document.getElementById(id).checked);
}

function isSchoolLevelAnswered() {
    return [
        "school_less_diploma",
        "school_diploma",
        "school_associate",
        "school_bachelor",
        "school_master",
        "school_professional",
        "school_doctorate"
    ].some(id => document.getElementById(id).checked);
}


function isBenefitRowActive(row) {
    return [
        `benefit_receive_${row}`,
        `benefit_start_${row}`,
        `benefit_end_${row}`,
        `benefit_dollar_${row}`
    ].some(id => {
        const el = document.getElementById(id);
        return el && el.value.trim() !== "";
    });
}

function isBenefitAnswered(row) {
    return (
        document.getElementById(`benefit_exempt_yes_${row}`).checked ||
        document.getElementById(`benefit_exempt_no_${row}`).checked
    );
}

function isLongtermRowActive(row) {
    return [
        `longterm_name_${row}`,
        `longterm_fromdate_${row}`,
        `longterm_todate_${row}`,
        `longterm_reason_${row}`
    ].some(id => {
        const el = document.getElementById(id);
        return el && el.value.trim() !== "";
    });
}

function isLongtermAnswered(row) {
    return (
        document.getElementById(`longterm_exempt_yes_${row}`).checked ||
        document.getElementById(`longterm_exempt_no_${row}`).checked
    );
}




const fields = [

    // 56
    { id: "exempt_vawa", label: "Question 56", validate: () => isPublicChargeExemptSelected(), message: "Please select one option." },
    { id: "exempt_juvenile", label: "Question 56", validate: () => isPublicChargeExemptSelected(), message: "" },
    { id: "exempt_afghani", label: "Question 56", validate: () => isPublicChargeExemptSelected(), message: "" },
    { id: "exempt_asylee", label: "Question 56", validate: () => isPublicChargeExemptSelected(), message: "" },
    { id: "exempt_refugee", label: "Question 56", validate: () => isPublicChargeExemptSelected(), message: "" },
    { id: "exempt_victim", label: "Question 56", validate: () => isPublicChargeExemptSelected(), message: "" },
    { id: "exempt_other_ina", label: "Question 56", validate: () => isPublicChargeExemptSelected(), message: "" },
    { id: "exempt_traffick_victim", label: "Question 56", validate: () => isPublicChargeExemptSelected(), message: "" },
    { id: "exempt_other_ina_l", label: "Question 56", validate: () => isPublicChargeExemptSelected(), message: "" },
    { id: "exempt_cuban", label: "Question 56", validate: () => isPublicChargeExemptSelected(), message: "" },
    { id: "exempt_cuban_battered", label: "Question 56", validate: () => isPublicChargeExemptSelected(), message: "" },
    { id: "exempt_haitian", label: "Question 56", validate: () => isPublicChargeExemptSelected(), message: "" },
    { id: "exempt_haitian_battered", label: "Question 56", validate: () => isPublicChargeExemptSelected(), message: "" },
    { id: "exempt_cuban_haitian", label: "Question 56", validate: () => isPublicChargeExemptSelected(), message: "" },
    { id: "exempt_lautenberg", label: "Question 56", validate: () => isPublicChargeExemptSelected(), message: "" },
    { id: "exempt_vietnam", label: "Question 56", validate: () => isPublicChargeExemptSelected(), message: "" },
    { id: "exempt_residence", label: "Question 56", validate: () => isPublicChargeExemptSelected(), message: "" },
    { id: "exempt_amerasian", label: "Question 56", validate: () => isPublicChargeExemptSelected(), message: "" },
    { id: "exempt_polish", label: "Question 56", validate: () => isPublicChargeExemptSelected(), message: "" },
    { id: "exempt_nicaraguan", label: "Question 56", validate: () => isPublicChargeExemptSelected(), message: "" },
    { id: "exempt_indian", label: "Question 56", validate: () => isPublicChargeExemptSelected(), message: "" },
    { id: "exempt_7611", label: "Question 56", validate: () => isPublicChargeExemptSelected(), message: "" },
    { id: "exempt_syrian", label: "Question 56", validate: () => isPublicChargeExemptSelected(), message: "" },
    { id: "exempt_armed", label: "Question 56", validate: () => isPublicChargeExemptSelected(), message: "" },
    { id: "exempt_nope", label: "Question 56", validate: () => isPublicChargeExemptSelected(), message: "" },

    // 57
    {
        id: "household_size",
        label: "Question 57",
        condition: () => document.getElementById("exempt_nope").checked,
        validate: v => v.trim() !== "" && !isNaN(v),
        message: "Please enter your household size."
    },

    // 58
    { id: "household_income_one", label: "Question 58", condition: () => document.getElementById("exempt_nope").checked, validate: () => isHouseholdIncomeAnswered(), message: "Please select one option." },
    { id: "household_income_two", label: "Question 58", condition: () => document.getElementById("exempt_nope").checked, validate: () => isHouseholdIncomeAnswered(), message: "" },
    { id: "household_income_third", label: "Question 58", condition: () => document.getElementById("exempt_nope").checked, validate: () => isHouseholdIncomeAnswered(), message: "" },
    { id: "household_income_four", label: "Question 58", condition: () => document.getElementById("exempt_nope").checked, validate: () => isHouseholdIncomeAnswered(), message: "" },
    { id: "household_income_five", label: "Question 58", condition: () => document.getElementById("exempt_nope").checked, validate: () => isHouseholdIncomeAnswered(), message: "" },

    // 59
    { id: "household_asset_one", label: "Question 59", condition: () => document.getElementById("exempt_nope").checked, validate: () => isHouseholdAssetAnswered(), message: "Please select one option." },
    { id: "household_asset_two", label: "Question 59", condition: () => document.getElementById("exempt_nope").checked, validate: () => isHouseholdAssetAnswered(), message: "" },
    { id: "household_asset_three", label: "Question 59", condition: () => document.getElementById("exempt_nope").checked, validate: () => isHouseholdAssetAnswered(), message: "" },
    { id: "household_asset_four", label: "Question 59", condition: () => document.getElementById("exempt_nope").checked, validate: () => isHouseholdAssetAnswered(), message: "" },
    { id: "household_asset_five", label: "Question 59", condition: () => document.getElementById("exempt_nope").checked, validate: () => isHouseholdAssetAnswered(), message: "" },

    // 60
    { id: "household_liability_one", label: "Question 60", condition: () => document.getElementById("exempt_nope").checked, validate: () => isHouseholdLiabilityAnswered(), message: "Please select one option." },
    { id: "household_liability_two", label: "Question 60", condition: () => document.getElementById("exempt_nope").checked, validate: () => isHouseholdLiabilityAnswered(), message: "" },
    { id: "household_liability_three", label: "Question 60", condition: () => document.getElementById("exempt_nope").checked, validate: () => isHouseholdLiabilityAnswered(), message: "" },
    { id: "household_liability_four", label: "Question 60", condition: () => document.getElementById("exempt_nope").checked, validate: () => isHouseholdLiabilityAnswered(), message: "" },
    { id: "household_liability_five", label: "Question 60", condition: () => document.getElementById("exempt_nope").checked, validate: () => isHouseholdLiabilityAnswered(), message: "" },

    // 61
    { id: "school_less_diploma", label: "Question 61", condition: () => document.getElementById("exempt_nope").checked, validate: () => isSchoolLevelAnswered(), message: "Please select one option." },
    { id: "school_diploma", label: "Question 61", condition: () => document.getElementById("exempt_nope").checked, validate: () => isSchoolLevelAnswered(), message: "" },
    { id: "school_associate", label: "Question 61", condition: () => document.getElementById("exempt_nope").checked, validate: () => isSchoolLevelAnswered(), message: "" },
    { id: "school_bachelor", label: "Question 61", condition: () => document.getElementById("exempt_nope").checked, validate: () => isSchoolLevelAnswered(), message: "" },
    { id: "school_master", label: "Question 61", condition: () => document.getElementById("exempt_nope").checked, validate: () => isSchoolLevelAnswered(), message: "" },
    { id: "school_professional", label: "Question 61", condition: () => document.getElementById("exempt_nope").checked, validate: () => isSchoolLevelAnswered(), message: "" },
    { id: "school_doctorate", label: "Question 61", condition: () => document.getElementById("exempt_nope").checked, validate: () => isSchoolLevelAnswered(), message: "" },
    { id: "school_less_diploma_text", label: "Question 61 Explanation", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("school_less_diploma").checked, validate: () => true, message: "" },

    // 62
    {
        id: "list_certification",
        label: "Question 62",
        condition: () => document.getElementById("exempt_nope").checked,
        validate: () => true,
        message: ""
    },

    // 63
    { id: "ssi_needy_yes", label: "Question 63", condition: () => document.getElementById("exempt_nope").checked, validate: () => document.getElementById("ssi_needy_yes").checked || document.getElementById("ssi_needy_no").checked, message: "Please select Yes or No." },
    { id: "ssi_needy_no",  label: "Question 63", condition: () => document.getElementById("exempt_nope").checked, validate: () => document.getElementById("ssi_needy_yes").checked || document.getElementById("ssi_needy_no").checked, message: "" },

    // 64
    { id: "longterm_yes", label: "Question 64", condition: () => document.getElementById("exempt_nope").checked, validate: () => document.getElementById("longterm_yes").checked || document.getElementById("longterm_no").checked, message: "Please select Yes or No." },
    { id: "longterm_no",  label: "Question 64", condition: () => document.getElementById("exempt_nope").checked, validate: () => document.getElementById("longterm_yes").checked || document.getElementById("longterm_no").checked, message: "" },

    // 65 row 1
    { id: "benefit_receive_1", label: "Question 65 Benefit", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("ssi_needy_yes").checked, validate: v => v.trim() !== "", message: "Please enter the benefit received." },
    { id: "benefit_start_1", label: "Question 65 Start Date", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("ssi_needy_yes").checked, validate: v => v !== "", message: "Please enter the start date." },
    { id: "benefit_end_1", label: "Question 65 End Date", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("ssi_needy_yes").checked, validate: v => v !== "", message: "Please enter the end date." },
    { id: "benefit_dollar_1", label: "Question 65 Dollar Amount", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("ssi_needy_yes").checked, validate: v => v.trim() !== "", message: "Please enter the dollar amount." },
    { id: "benefit_exempt_yes_1", label: "Question 65 Exempt", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("ssi_needy_yes").checked, validate: () => isBenefitAnswered(1), message: "Please select Yes or No." },
    { id: "benefit_exempt_no_1",  label: "Question 65 Exempt", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("ssi_needy_yes").checked, validate: () => isBenefitAnswered(1), message: "" },

    // 65 row 2
    { id: "benefit_receive_2", label: "Question 65 Benefit", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("ssi_needy_yes").checked && isBenefitRowActive(2), validate: v => v.trim() !== "", message: "Please enter the benefit received." },
    { id: "benefit_start_2", label: "Question 65 Start Date", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("ssi_needy_yes").checked && isBenefitRowActive(2), validate: v => v !== "", message: "Please enter the start date." },
    { id: "benefit_end_2", label: "Question 65 End Date", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("ssi_needy_yes").checked && isBenefitRowActive(2), validate: v => v !== "", message: "Please enter the end date." },
    { id: "benefit_dollar_2", label: "Question 65 Dollar Amount", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("ssi_needy_yes").checked && isBenefitRowActive(2), validate: v => v.trim() !== "", message: "Please enter the dollar amount." },
    { id: "benefit_exempt_yes_2", label: "Question 65 Exempt", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("ssi_needy_yes").checked && isBenefitRowActive(2), validate: () => isBenefitAnswered(2), message: "Please select Yes or No." },
    { id: "benefit_exempt_no_2",  label: "Question 65 Exempt", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("ssi_needy_yes").checked && isBenefitRowActive(2), validate: () => isBenefitAnswered(2), message: "" },

    // 65 row 3
    { id: "benefit_receive_3", label: "Question 65 Benefit", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("ssi_needy_yes").checked && isBenefitRowActive(3), validate: v => v.trim() !== "", message: "Please enter the benefit received." },
    { id: "benefit_start_3", label: "Question 65 Start Date", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("ssi_needy_yes").checked && isBenefitRowActive(3), validate: v => v !== "", message: "Please enter the start date." },
    { id: "benefit_end_3", label: "Question 65 End Date", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("ssi_needy_yes").checked && isBenefitRowActive(3), validate: v => v !== "", message: "Please enter the end date." },
    { id: "benefit_dollar_3", label: "Question 65 Dollar Amount", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("ssi_needy_yes").checked && isBenefitRowActive(3), validate: v => v.trim() !== "", message: "Please enter the dollar amount." },
    { id: "benefit_exempt_yes_3", label: "Question 65 Exempt", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("ssi_needy_yes").checked && isBenefitRowActive(3), validate: () => isBenefitAnswered(3), message: "Please select Yes or No." },
    { id: "benefit_exempt_no_3",  label: "Question 65 Exempt", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("ssi_needy_yes").checked && isBenefitRowActive(3), validate: () => isBenefitAnswered(3), message: "" },

    // 65 row 4
    { id: "benefit_receive_4", label: "Question 65 Benefit", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("ssi_needy_yes").checked && isBenefitRowActive(4), validate: v => v.trim() !== "", message: "Please enter the benefit received." },
    { id: "benefit_start_4", label: "Question 65 Start Date", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("ssi_needy_yes").checked && isBenefitRowActive(4), validate: v => v !== "", message: "Please enter the start date." },
    { id: "benefit_end_4", label: "Question 65 End Date", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("ssi_needy_yes").checked && isBenefitRowActive(4), validate: v => v !== "", message: "Please enter the end date." },
    { id: "benefit_dollar_4", label: "Question 65 Dollar Amount", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("ssi_needy_yes").checked && isBenefitRowActive(4), validate: v => v.trim() !== "", message: "Please enter the dollar amount." },
    { id: "benefit_exempt_yes_4", label: "Question 65 Exempt", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("ssi_needy_yes").checked && isBenefitRowActive(4), validate: () => isBenefitAnswered(4), message: "Please select Yes or No." },
    { id: "benefit_exempt_no_4",  label: "Question 65 Exempt", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("ssi_needy_yes").checked && isBenefitRowActive(4), validate: () => isBenefitAnswered(4), message: "" },

    // 66 row 1
    { id: "longterm_name_1", label: "Question 66 Institution", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("longterm_yes").checked, validate: v => v.trim() !== "", message: "Please enter the institution name/city/state." },
    { id: "longterm_fromdate_1", label: "Question 66 Date From", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("longterm_yes").checked, validate: v => v !== "", message: "Please enter the start date." },
    { id: "longterm_todate_1", label: "Question 66 Date To", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("longterm_yes").checked, validate: v => v !== "", message: "Please enter the end date." },
    { id: "longterm_reason_1", label: "Question 66 Reason", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("longterm_yes").checked, validate: v => v.trim() !== "", message: "Please enter the reason." },
    { id: "longterm_exempt_yes_1", label: "Question 66 Exempt", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("longterm_yes").checked, validate: () => isLongtermAnswered(1), message: "Please select Yes or No." },
    { id: "longterm_exempt_no_1",  label: "Question 66 Exempt", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("longterm_yes").checked, validate: () => isLongtermAnswered(1), message: "" },

    // 66 row 2
    { id: "longterm_name_2", label: "Question 66 Institution", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("longterm_yes").checked && isLongtermRowActive(2), validate: v => v.trim() !== "", message: "Please enter the institution name/city/state." },
    { id: "longterm_fromdate_2", label: "Question 66 Date From", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("longterm_yes").checked && isLongtermRowActive(2), validate: v => v !== "", message: "Please enter the start date." },
    { id: "longterm_todate_2", label: "Question 66 Date To", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("longterm_yes").checked && isLongtermRowActive(2), validate: v => v !== "", message: "Please enter the end date." },
    { id: "longterm_reason_2", label: "Question 66 Reason", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("longterm_yes").checked && isLongtermRowActive(2), validate: v => v.trim() !== "", message: "Please enter the reason." },
    { id: "longterm_exempt_yes_2", label: "Question 66 Exempt", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("longterm_yes").checked && isLongtermRowActive(2), validate: () => isLongtermAnswered(2), message: "Please select Yes or No." },
    { id: "longterm_exempt_no_2",  label: "Question 66 Exempt", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("longterm_yes").checked && isLongtermRowActive(2), validate: () => isLongtermAnswered(2), message: "" },

    // 66 row 3
    { id: "longterm_name_3", label: "Question 66 Institution", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("longterm_yes").checked && isLongtermRowActive(3), validate: v => v.trim() !== "", message: "Please enter the institution name/city/state." },
    { id: "longterm_fromdate_3", label: "Question 66 Date From", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("longterm_yes").checked && isLongtermRowActive(3), validate: v => v !== "", message: "Please enter the start date." },
    { id: "longterm_todate_3", label: "Question 66 Date To", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("longterm_yes").checked && isLongtermRowActive(3), validate: v => v !== "", message: "Please enter the end date." },
    { id: "longterm_reason_3", label: "Question 66 Reason", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("longterm_yes").checked && isLongtermRowActive(3), validate: v => v.trim() !== "", message: "Please enter the reason." },
    { id: "longterm_exempt_yes_3", label: "Question 66 Exempt", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("longterm_yes").checked && isLongtermRowActive(3), validate: () => isLongtermAnswered(3), message: "Please select Yes or No." },
    { id: "longterm_exempt_no_3",  label: "Question 66 Exempt", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("longterm_yes").checked && isLongtermRowActive(3), validate: () => isLongtermAnswered(3), message: "" },

    // 66 row 4
    { id: "longterm_name_4", label: "Question 66 Institution", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("longterm_yes").checked && isLongtermRowActive(4), validate: v => v.trim() !== "", message: "Please enter the institution name/city/state." },
    { id: "longterm_fromdate_4", label: "Question 66 Date From", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("longterm_yes").checked && isLongtermRowActive(4), validate: v => v !== "", message: "Please enter the start date." },
    { id: "longterm_todate_4", label: "Question 66 Date To", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("longterm_yes").checked && isLongtermRowActive(4), validate: v => v !== "", message: "Please enter the end date." },
    { id: "longterm_reason_4", label: "Question 66 Reason", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("longterm_yes").checked && isLongtermRowActive(4), validate: v => v.trim() !== "", message: "Please enter the reason." },
    { id: "longterm_exempt_yes_4", label: "Question 66 Exempt", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("longterm_yes").checked && isLongtermRowActive(4), validate: () => isLongtermAnswered(4), message: "Please select Yes or No." },
    { id: "longterm_exempt_no_4",  label: "Question 66 Exempt", condition: () => document.getElementById("exempt_nope").checked && document.getElementById("longterm_yes").checked && isLongtermRowActive(4), validate: () => isLongtermAnswered(4), message: "" },

];