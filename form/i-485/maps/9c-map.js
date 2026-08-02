// security-acts-map.js

const fields = [

    // 42a
    { id: "engage_espionage_yes", label: "42a. Espionage or sabotage", validate: () => document.getElementById("engage_espionage_yes").checked || document.getElementById("engage_espionage_no").checked, message: "Please select Yes or No." },
    { id: "engage_espionage_no",  label: "42a. Espionage or sabotage", validate: () => document.getElementById("engage_espionage_yes").checked || document.getElementById("engage_espionage_no").checked, message: "" },
    { id: "engage_espionage_details", label: "42a. Explanation", validate: () => true, message: "" },

    // 42b
    { id: "engage_export_yes", label: "42b. Export law violations", validate: () => document.getElementById("engage_export_yes").checked || document.getElementById("engage_export_no").checked, message: "Please select Yes or No." },
    { id: "engage_export_no",  label: "42b. Export law violations", validate: () => document.getElementById("engage_export_yes").checked || document.getElementById("engage_export_no").checked, message: "" },
    { id: "engage_export_details", label: "42b. Explanation", validate: () => true, message: "" },

    // 42c
    { id: "engage_opposing_yes", label: "42c. Opposing or overthrowing U.S. Government", validate: () => document.getElementById("engage_opposing_yes").checked || document.getElementById("engage_opposing_no").checked, message: "Please select Yes or No." },
    { id: "engage_opposing_no",  label: "42c. Opposing or overthrowing U.S. Government", validate: () => document.getElementById("engage_opposing_yes").checked || document.getElementById("engage_opposing_no").checked, message: "" },
    { id: "engage_opposing_details", label: "42c. Explanation", validate: () => true, message: "" },

    // 42d
    { id: "engage_unlawful_yes", label: "42d. Any other unlawful activity", validate: () => document.getElementById("engage_unlawful_yes").checked || document.getElementById("engage_unlawful_no").checked, message: "Please select Yes or No." },
    { id: "engage_unlawful_no",  label: "42d. Any other unlawful activity", validate: () => document.getElementById("engage_unlawful_yes").checked || document.getElementById("engage_unlawful_no").checked, message: "" },
    { id: "engage_unlawful_details", label: "42d. Explanation", validate: () => true, message: "" },

    // 43a
    { id: "received_weapon_yes", label: "43a. Received weapons or military training", validate: () => document.getElementById("received_weapon_yes").checked || document.getElementById("received_weapon_no").checked, message: "Please select Yes or No." },
    { id: "received_weapon_no",  label: "43a. Received weapons or military training", validate: () => document.getElementById("received_weapon_yes").checked || document.getElementById("received_weapon_no").checked, message: "" },
    { id: "received_weapon_details", label: "43a. Explanation", validate: () => true, message: "" },

    // 43b
    { id: "commit_kidnap_yes", label: "43b. Committed kidnapping, assassination, or hijacking", validate: () => document.getElementById("commit_kidnap_yes").checked || document.getElementById("commit_kidnap_no").checked, message: "Please select Yes or No." },
    { id: "commit_kidnap_no",  label: "43b. Committed kidnapping, assassination, or hijacking", validate: () => document.getElementById("commit_kidnap_yes").checked || document.getElementById("commit_kidnap_no").checked, message: "" },
    { id: "commit_kidnap_details", label: "43b. Explanation", validate: () => true, message: "" },

    // 43c
    { id: "used_weapon_yes", label: "43c. Used a weapon or explosive to endanger safety", validate: () => document.getElementById("used_weapon_yes").checked || document.getElementById("used_weapon_no").checked, message: "Please select Yes or No." },
    { id: "used_weapon_no",  label: "43c. Used a weapon or explosive to endanger safety", validate: () => document.getElementById("used_weapon_yes").checked || document.getElementById("used_weapon_no").checked, message: "" },
    { id: "used_weapon_details", label: "43c. Explanation", validate: () => true, message: "" },

    // 43d
    { id: "used_weapon_threat_yes", label: "43d. Threatened or planned activities in 43b–43c", validate: () => document.getElementById("used_weapon_threat_yes").checked || document.getElementById("used_weapon_threat_no").checked, message: "Please select Yes or No." },
    { id: "used_weapon_threat_no",  label: "43d. Threatened or planned activities in 43b–43c", validate: () => document.getElementById("used_weapon_threat_yes").checked || document.getElementById("used_weapon_threat_no").checked, message: "" },
    { id: "used_weapon_threat_details", label: "43d. Explanation", validate: () => true, message: "" },

    // 43e
    { id: "used_weapon_incited_yes", label: "43e. Incited activities in 43b–43c", validate: () => document.getElementById("used_weapon_incited_yes").checked || document.getElementById("used_weapon_incited_no").checked, message: "Please select Yes or No." },
    { id: "used_weapon_incited_no",  label: "43e. Incited activities in 43b–43c", validate: () => document.getElementById("used_weapon_incited_yes").checked || document.getElementById("used_weapon_incited_no").checked, message: "" },
    { id: "used_weapon_incited_details", label: "43e. Explanation", validate: () => true, message: "" },

    // 43f
    { id: "used_weapon_participated_yes", label: "43f. Participated in group doing activities in 43b–43e", validate: () => document.getElementById("used_weapon_participated_yes").checked || document.getElementById("used_weapon_participated_no").checked, message: "Please select Yes or No." },
    { id: "used_weapon_participated_no",  label: "43f. Participated in group doing activities in 43b–43e", validate: () => document.getElementById("used_weapon_participated_yes").checked || document.getElementById("used_weapon_participated_no").checked, message: "" },
    { id: "used_weapon_participated_details", label: "43f. Explanation", validate: () => true, message: "" },

    // 43g
    { id: "used_weapon_recruited_yes", label: "43g. Recruited or solicited money for group doing 43b–43e", validate: () => document.getElementById("used_weapon_recruited_yes").checked || document.getElementById("used_weapon_recruited_no").checked, message: "Please select Yes or No." },
    { id: "used_weapon_recruited_no",  label: "43g. Recruited or solicited money for group doing 43b–43e", validate: () => document.getElementById("used_weapon_recruited_yes").checked || document.getElementById("used_weapon_recruited_no").checked, message: "" },
    { id: "used_weapon_recruited_details", label: "43g. Explanation", validate: () => true, message: "" },

    // 43h
    { id: "used_weapon_provided_yes", label: "43h. Provided support for activities in 43b–43e", validate: () => document.getElementById("used_weapon_provided_yes").checked || document.getElementById("used_weapon_provided_no").checked, message: "Please select Yes or No." },
    { id: "used_weapon_provided_no",  label: "43h. Provided support for activities in 43b–43e", validate: () => document.getElementById("used_weapon_provided_yes").checked || document.getElementById("used_weapon_provided_no").checked, message: "" },
    { id: "used_weapon_provided_details", label: "43h. Explanation", validate: () => true, message: "" },

    // 43i
    { id: "used_weapon_provided_group_yes", label: "43i. Provided support for individual or group doing 43b–43e", validate: () => document.getElementById("used_weapon_provided_group_yes").checked || document.getElementById("used_weapon_provided_group_no").checked, message: "Please select Yes or No." },
    { id: "used_weapon_provided_group_no",  label: "43i. Provided support for individual or group doing 43b–43e", validate: () => document.getElementById("used_weapon_provided_group_yes").checked || document.getElementById("used_weapon_provided_group_no").checked, message: "" },
    { id: "used_weapon_provided_group_details", label: "43i. Explanation", validate: () => true, message: "" },

    // 44
    { id: "used_weapon_engage_yes", label: "44. Intend to engage in activities in 43b–43e", validate: () => document.getElementById("used_weapon_engage_yes").checked || document.getElementById("used_weapon_engage_no").checked, message: "Please select Yes or No." },
    { id: "used_weapon_engage_no",  label: "44. Intend to engage in activities in 43b–43e", validate: () => document.getElementById("used_weapon_engage_yes").checked || document.getElementById("used_weapon_engage_no").checked, message: "" },
    { id: "used_weapon_engage_details", label: "44. Explanation", validate: () => true, message: "" },

    // 45
    { id: "used_weapon_endanger_yes", label: "45. Intend to endanger welfare or security of the U.S.", validate: () => document.getElementById("used_weapon_endanger_yes").checked || document.getElementById("used_weapon_endanger_no").checked, message: "Please select Yes or No." },
    { id: "used_weapon_endanger_no",  label: "45. Intend to endanger welfare or security of the U.S.", validate: () => document.getElementById("used_weapon_endanger_yes").checked || document.getElementById("used_weapon_endanger_no").checked, message: "" },
    { id: "used_weapon_endanger_details", label: "45. Explanation", validate: () => true, message: "" },

    // 46
    { id: "used_weapon_spouse_yes", label: "46. Spouse or child of individual who did 43b–43i", validate: () => document.getElementById("used_weapon_spouse_yes").checked || document.getElementById("used_weapon_spouse_no").checked, message: "Please select Yes or No." },
    { id: "used_weapon_spouse_no",  label: "46. Spouse or child of individual who did 43b–43i", validate: () => document.getElementById("used_weapon_spouse_yes").checked || document.getElementById("used_weapon_spouse_no").checked, message: "" },
    { id: "used_weapon_spouse_details", label: "46. Explanation", validate: () => true, message: "" },

    // 47
    { id: "sold_weapon_yes", label: "47. Sold or transported weapons to be used against another person", validate: () => document.getElementById("sold_weapon_yes").checked || document.getElementById("sold_weapon_no").checked, message: "Please select Yes or No." },
    { id: "sold_weapon_no",  label: "47. Sold or transported weapons to be used against another person", validate: () => document.getElementById("sold_weapon_yes").checked || document.getElementById("sold_weapon_no").checked, message: "" },
    { id: "sold_weapon_details", label: "47. Explanation", validate: () => true, message: "" },

    // 48
    { id: "worked_jail_yes", label: "48. Worked or served in a detention or prison facility", validate: () => document.getElementById("worked_jail_yes").checked || document.getElementById("worked_jail_no").checked, message: "Please select Yes or No." },
    { id: "worked_jail_no",  label: "48. Worked or served in a detention or prison facility", validate: () => document.getElementById("worked_jail_yes").checked || document.getElementById("worked_jail_no").checked, message: "" },
    { id: "worked_jail_details", label: "48. Explanation", validate: () => true, message: "" },

    // 49
    { id: "member_weapon_yes", label: "49. Member of group that used weapons against persons", validate: () => document.getElementById("member_weapon_yes").checked || document.getElementById("member_weapon_no").checked, message: "Please select Yes or No." },
    { id: "member_weapon_no",  label: "49. Member of group that used weapons against persons", validate: () => document.getElementById("member_weapon_yes").checked || document.getElementById("member_weapon_no").checked, message: "" },
    { id: "member_weapon_details", label: "49. Explanation", validate: () => true, message: "" },

    // 50
    { id: "served_police_yes", label: "50. Served in military or police unit", validate: () => document.getElementById("served_police_yes").checked || document.getElementById("served_police_no").checked, message: "Please select Yes or No." },
    { id: "served_police_no",  label: "50. Served in military or police unit", validate: () => document.getElementById("served_police_yes").checked || document.getElementById("served_police_no").checked, message: "" },
    { id: "served_police_details", label: "50. Explanation", validate: () => true, message: "" },

    // 51
    { id: "served_paramilitary_yes", label: "51. Served in armed or paramilitary group", validate: () => document.getElementById("served_paramilitary_yes").checked || document.getElementById("served_paramilitary_no").checked, message: "Please select Yes or No." },
    { id: "served_paramilitary_no",  label: "51. Served in armed or paramilitary group", validate: () => document.getElementById("served_paramilitary_yes").checked || document.getElementById("served_paramilitary_no").checked, message: "" },
    { id: "served_paramilitary_details", label: "51. Explanation", validate: () => true, message: "" },

    // 52
    { id: "communist_party_yes", label: "52. Member of Communist Party or totalitarian party", validate: () => document.getElementById("communist_party_yes").checked || document.getElementById("communist_party_no").checked, message: "Please select Yes or No." },
    { id: "communist_party_no",  label: "52. Member of Communist Party or totalitarian party", validate: () => document.getElementById("communist_party_yes").checked || document.getElementById("communist_party_no").checked, message: "" },
    { id: "communist_party_details", label: "52. Explanation", validate: () => true, message: "" },

    // 53a
    { id: "torture_yes", label: "53a. Torture", validate: () => document.getElementById("torture_yes").checked || document.getElementById("torture_no").checked, message: "Please select Yes or No." },
    { id: "torture_no",  label: "53a. Torture", validate: () => document.getElementById("torture_yes").checked || document.getElementById("torture_no").checked, message: "" },
    { id: "torture_details", label: "53a. Explanation", validate: () => true, message: "" },

    // 53b
    { id: "genocide_yes", label: "53b. Genocide", validate: () => document.getElementById("genocide_yes").checked || document.getElementById("genocide_no").checked, message: "Please select Yes or No." },
    { id: "genocide_no",  label: "53b. Genocide", validate: () => document.getElementById("genocide_yes").checked || document.getElementById("genocide_no").checked, message: "" },
    { id: "genocide_details", label: "53b. Explanation", validate: () => true, message: "" },

    // 53c
    { id: "killing_yes", label: "53c. Killing or trying to kill any person", validate: () => document.getElementById("killing_yes").checked || document.getElementById("killing_no").checked, message: "Please select Yes or No." },
    { id: "killing_no",  label: "53c. Killing or trying to kill any person", validate: () => document.getElementById("killing_yes").checked || document.getElementById("killing_no").checked, message: "" },
    { id: "killing_details", label: "53c. Explanation", validate: () => true, message: "" },

    // 53d
    { id: "injure_yes", label: "53d. Intentionally and severely injuring any person", validate: () => document.getElementById("injure_yes").checked || document.getElementById("injure_no").checked, message: "Please select Yes or No." },
    { id: "injure_no",  label: "53d. Intentionally and severely injuring any person", validate: () => document.getElementById("injure_yes").checked || document.getElementById("injure_no").checked, message: "" },
    { id: "injure_details", label: "53d. Explanation", validate: () => true, message: "" },

    // 54
    { id: "recruited_under15_yes", label: "54. Recruited persons under 15 for armed force", validate: () => document.getElementById("recruited_under15_yes").checked || document.getElementById("recruited_under15_no").checked, message: "Please select Yes or No." },
    { id: "recruited_under15_no",  label: "54. Recruited persons under 15 for armed force", validate: () => document.getElementById("recruited_under15_yes").checked || document.getElementById("recruited_under15_no").checked, message: "" },
    { id: "recruited_under15_details", label: "54. Explanation", validate: () => true, message: "" },

    // 55
    { id: "used_under15_yes", label: "55. Used persons under 15 in hostilities or combat", validate: () => document.getElementById("used_under15_yes").checked || document.getElementById("used_under15_no").checked, message: "Please select Yes or No." },
    { id: "used_under15_no",  label: "55. Used persons under 15 in hostilities or combat", validate: () => document.getElementById("used_under15_yes").checked || document.getElementById("used_under15_no").checked, message: "" },
    { id: "used_under15_details", label: "55. Explanation", validate: () => true, message: "" },

];
