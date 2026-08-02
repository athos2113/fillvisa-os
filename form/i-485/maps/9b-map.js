// criminal-acts-map.js

const fields = [

    // 22
    {
        id: "diversion_program_yes",
        label: "22. Arrested, cited, charged, or diversion program",
        validate: () =>
            document.getElementById("diversion_program_yes").checked ||
            document.getElementById("diversion_program_no").checked,
        message: "Please select Yes or No."
    },
    {
        id: "diversion_program_no",
        label: "22. Arrested, cited, charged, or diversion program",
        validate: () =>
            document.getElementById("diversion_program_yes").checked ||
            document.getElementById("diversion_program_no").checked,
        message: ""
    },
    {
        id: "diversion_program_details",
        label: "22. Explanation",
        validate: () => true,
        message: ""
    },

    // 23
    {
        id: "commit_crime_yes",
        label: "23. Committed a crime of any kind",
        validate: () =>
            document.getElementById("commit_crime_yes").checked ||
            document.getElementById("commit_crime_no").checked,
        message: "Please select Yes or No."
    },
    {
        id: "commit_crime_no",
        label: "23. Committed a crime of any kind",
        validate: () =>
            document.getElementById("commit_crime_yes").checked ||
            document.getElementById("commit_crime_no").checked,
        message: ""
    },
    {
        id: "commit_crime_details",
        label: "23. Explanation",
        validate: () => true,
        message: ""
    },

    // 24
    {
        id: "pled_guilty_yes",
        label: "24. Pled guilty or convicted of a crime",
        validate: () =>
            document.getElementById("pled_guilty_yes").checked ||
            document.getElementById("pled_guilty_no").checked,
        message: "Please select Yes or No."
    },
    {
        id: "pled_guilty_no",
        label: "24. Pled guilty or convicted of a crime",
        validate: () =>
            document.getElementById("pled_guilty_yes").checked ||
            document.getElementById("pled_guilty_no").checked,
        message: ""
    },
    {
        id: "pled_guilty_details",
        label: "24. Explanation",
        validate: () => true,
        message: ""
    },

    // 25
    {
        id: "punish_judge_yes",
        label: "25. Ordered punished by a judge",
        validate: () =>
            document.getElementById("punish_judge_yes").checked ||
            document.getElementById("punish_judge_no").checked,
        message: "Please select Yes or No."
    },
    {
        id: "punish_judge_no",
        label: "25. Ordered punished by a judge",
        validate: () =>
            document.getElementById("punish_judge_yes").checked ||
            document.getElementById("punish_judge_no").checked,
        message: ""
    },
    {
        id: "punish_judge_details",
        label: "25. Explanation",
        validate: () => true,
        message: ""
    },

    // 26
    {
        id: "violated_substance_yes",
        label: "26. Violated controlled substance law",
        validate: () =>
            document.getElementById("violated_substance_yes").checked ||
            document.getElementById("violated_substance_no").checked,
        message: "Please select Yes or No."
    },
    {
        id: "violated_substance_no",
        label: "26. Violated controlled substance law",
        validate: () =>
            document.getElementById("violated_substance_yes").checked ||
            document.getElementById("violated_substance_no").checked,
        message: ""
    },
    {
        id: "violated_substance_details",
        label: "26. Explanation",
        validate: () => true,
        message: ""
    },

    // 27
    {
        id: "traffick_substance_yes",
        label: "27. Trafficked controlled substances",
        validate: () =>
            document.getElementById("traffick_substance_yes").checked ||
            document.getElementById("traffick_substance_no").checked,
        message: "Please select Yes or No."
    },
    {
        id: "traffick_substance_no",
        label: "27. Trafficked controlled substances",
        validate: () =>
            document.getElementById("traffick_substance_yes").checked ||
            document.getElementById("traffick_substance_no").checked,
        message: ""
    },
    {
        id: "traffick_substance_details",
        label: "27. Explanation",
        validate: () => true,
        message: ""
    },

    // 28
    {
        id: "spouse_traffick_illegal_yes",
        label: "28. Spouse/parent illicit substance trafficking benefit",
        validate: () =>
            document.getElementById("spouse_traffick_illegal_yes").checked ||
            document.getElementById("spouse_traffick_illegal_no").checked,
        message: "Please select Yes or No."
    },
    {
        id: "spouse_traffick_illegal_no",
        label: "28. Spouse/parent illicit substance trafficking benefit",
        validate: () =>
            document.getElementById("spouse_traffick_illegal_yes").checked ||
            document.getElementById("spouse_traffick_illegal_no").checked,
        message: ""
    },
    {
        id: "spouse_traffick_illegal_details",
        label: "28. Explanation",
        validate: () => true,
        message: ""
    },

    // 29
    {
        id: "spouse_traffick_known_five_yes",
        label: "29. Knew benefit resulted from spouse/parent trafficking",
        validate: () =>
            document.getElementById("spouse_traffick_known_five_yes").checked ||
            document.getElementById("spouse_traffick_known_five_no").checked,
        message: "Please select Yes or No."
    },
    {
        id: "spouse_traffick_known_five_no",
        label: "29. Knew benefit resulted from spouse/parent trafficking",
        validate: () =>
            document.getElementById("spouse_traffick_known_five_yes").checked ||
            document.getElementById("spouse_traffick_known_five_no").checked,
        message: ""
    },
    {
        id: "spouse_traffick_known_five_details",
        label: "29. Explanation",
        validate: () => true,
        message: ""
    },

    // 30
    {
        id: "prostitution_yes",
        label: "30. Engaged in prostitution",
        validate: () =>
            document.getElementById("prostitution_yes").checked ||
            document.getElementById("prostitution_no").checked,
        message: "Please select Yes or No."
    },
    {
        id: "prostitution_no",
        label: "30. Engaged in prostitution",
        validate: () =>
            document.getElementById("prostitution_yes").checked ||
            document.getElementById("prostitution_no").checked,
        message: ""
    },
    {
        id: "prostitution_details",
        label: "30. Explanation",
        validate: () => true,
        message: ""
    },

    // 31
    {
        id: "import_prostitute_yes",
        label: "31. Procured or imported prostitutes",
        validate: () =>
            document.getElementById("import_prostitute_yes").checked ||
            document.getElementById("import_prostitute_no").checked,
        message: "Please select Yes or No."
    },
    {
        id: "import_prostitute_no",
        label: "31. Procured or imported prostitutes",
        validate: () =>
            document.getElementById("import_prostitute_yes").checked ||
            document.getElementById("import_prostitute_no").checked,
        message: ""
    },
    {
        id: "import_prostitute_details",
        label: "31. Explanation",
        validate: () => true,
        message: ""
    },

    // 32
    {
        id: "money_prostitution_yes",
        label: "32. Received proceeds from prostitution",
        validate: () =>
            document.getElementById("money_prostitution_yes").checked ||
            document.getElementById("money_prostitution_no").checked,
        message: "Please select Yes or No."
    },
    {
        id: "money_prostitution_no",
        label: "32. Received proceeds from prostitution",
        validate: () =>
            document.getElementById("money_prostitution_yes").checked ||
            document.getElementById("money_prostitution_no").checked,
        message: ""
    },
    {
        id: "money_prostitution_details",
        label: "32. Explanation",
        validate: () => true,
        message: ""
    },

    // 33
    {
        id: "illegal_gambling_yes",
        label: "33. Intend to engage in illegal gambling or commercialized vice",
        validate: () =>
            document.getElementById("illegal_gambling_yes").checked ||
            document.getElementById("illegal_gambling_no").checked,
        message: "Please select Yes or No."
    },
    {
        id: "illegal_gambling_no",
        label: "33. Intend to engage in illegal gambling or commercialized vice",
        validate: () =>
            document.getElementById("illegal_gambling_yes").checked ||
            document.getElementById("illegal_gambling_no").checked,
        message: ""
    },
    {
        id: "illegal_gambling_details",
        label: "33. Explanation",
        validate: () => true,
        message: ""
    },

    // 34
    {
        id: "exercised_immunity_yes",
        label: "34. Exercised immunity to avoid prosecution",
        validate: () =>
            document.getElementById("exercised_immunity_yes").checked ||
            document.getElementById("exercised_immunity_no").checked,
        message: "Please select Yes or No."
    },
    {
        id: "exercised_immunity_no",
        label: "34. Exercised immunity to avoid prosecution",
        validate: () =>
            document.getElementById("exercised_immunity_yes").checked ||
            document.getElementById("exercised_immunity_no").checked,
        message: ""
    },
    {
        id: "exercised_immunity_details",
        label: "34. Explanation",
        validate: () => true,
        message: ""
    },

    // 35a
    {
        id: "served_foreign_yes",
        label: "35a. Served as a foreign government official",
        validate: () =>
            document.getElementById("served_foreign_yes").checked ||
            document.getElementById("served_foreign_no").checked,
        message: "Please select Yes or No."
    },
    {
        id: "served_foreign_no",
        label: "35a. Served as a foreign government official",
        validate: () =>
            document.getElementById("served_foreign_yes").checked ||
            document.getElementById("served_foreign_no").checked,
        message: ""
    },
    {
        id: "served_foreign_details",
        label: "35a. Explanation",
        validate: () => true,
        message: ""
    },

    // 35b
    {
        id: "served_foreign_violation_yes",
        label: "35b. Responsible for violations of religious freedoms",
        validate: () =>
            document.getElementById("served_foreign_violation_yes").checked ||
            document.getElementById("served_foreign_violation_no").checked,
        message: "Please select Yes or No."
    },
    {
        id: "served_foreign_violation_no",
        label: "35b. Responsible for violations of religious freedoms",
        validate: () =>
            document.getElementById("served_foreign_violation_yes").checked ||
            document.getElementById("served_foreign_violation_no").checked,
        message: ""
    },
    {
        id: "served_foreign_violation_details",
        label: "35b. Explanation",
        validate: () => true,
        message: ""
    },

    // 36
    {
        id: "induced_force_yes",
        label: "36. Sex trafficking",
        validate: () =>
            document.getElementById("induced_force_yes").checked ||
            document.getElementById("induced_force_no").checked,
        message: "Please select Yes or No."
    },
    {
        id: "induced_force_no",
        label: "36. Sex trafficking",
        validate: () =>
            document.getElementById("induced_force_yes").checked ||
            document.getElementById("induced_force_no").checked,
        message: ""
    },
    {
        id: "induced_force_details",
        label: "36. Explanation",
        validate: () => true,
        message: ""
    },

    // 37
    {
        id: "traffick_servitude_yes",
        label: "37. Trafficked a person into involuntary servitude",
        validate: () =>
            document.getElementById("traffick_servitude_yes").checked ||
            document.getElementById("traffick_servitude_no").checked,
        message: "Please select Yes or No."
    },
    {
        id: "traffick_servitude_no",
        label: "37. Trafficked a person into involuntary servitude",
        validate: () =>
            document.getElementById("traffick_servitude_yes").checked ||
            document.getElementById("traffick_servitude_no").checked,
        message: ""
    },
    {
        id: "traffick_servitude_details",
        label: "37. Explanation",
        validate: () => true,
        message: ""
    },

    // 38
    {
        id: "aided_commercial_yes",
        label: "38. Aided trafficking in persons for commercial sex acts",
        validate: () =>
            document.getElementById("aided_commercial_yes").checked ||
            document.getElementById("aided_commercial_no").checked,
        message: "Please select Yes or No."
    },
    {
        id: "aided_commercial_no",
        label: "38. Aided trafficking in persons for commercial sex acts",
        validate: () =>
            document.getElementById("aided_commercial_yes").checked ||
            document.getElementById("aided_commercial_no").checked,
        message: ""
    },
    {
        id: "aided_commercial_details",
        label: "38. Explanation",
        validate: () => true,
        message: ""
    },

    // 39
    {
        id: "spouse_traffick_yes",
        label: "39. Spouse/parent trafficking in persons benefit",
        validate: () =>
            document.getElementById("spouse_traffick_yes").checked ||
            document.getElementById("spouse_traffick_no").checked,
        message: "Please select Yes or No."
    },
    {
        id: "spouse_traffick_no",
        label: "39. Spouse/parent trafficking in persons benefit",
        validate: () =>
            document.getElementById("spouse_traffick_yes").checked ||
            document.getElementById("spouse_traffick_no").checked,
        message: ""
    },
    {
        id: "spouse_traffick_details",
        label: "39. Explanation",
        validate: () => true,
        message: ""
    },

    // 40
    {
        id: "spouse_traffick_known_yes",
        label: "40. Knew benefit resulted from spouse/parent trafficking in persons",
        validate: () =>
            document.getElementById("spouse_traffick_known_yes").checked ||
            document.getElementById("spouse_traffick_known_no").checked,
        message: "Please select Yes or No."
    },
    {
        id: "spouse_traffick_known_no",
        label: "40. Knew benefit resulted from spouse/parent trafficking in persons",
        validate: () =>
            document.getElementById("spouse_traffick_known_yes").checked ||
            document.getElementById("spouse_traffick_known_no").checked,
        message: ""
    },
    {
        id: "spouse_traffick_known_details",
        label: "40. Explanation",
        validate: () => true,
        message: ""
    },

    // 41
    {
        id: "engage_laundering_yes",
        label: "41. Engaged in money laundering",
        validate: () =>
            document.getElementById("engage_laundering_yes").checked ||
            document.getElementById("engage_laundering_no").checked,
        message: "Please select Yes or No."
    },
    {
        id: "engage_laundering_no",
        label: "41. Engaged in money laundering",
        validate: () =>
            document.getElementById("engage_laundering_yes").checked ||
            document.getElementById("engage_laundering_no").checked,
        message: ""
    },
    {
        id: "engage_laundering_details",
        label: "41. Explanation",
        validate: () => true,
        message: ""
    },

];
