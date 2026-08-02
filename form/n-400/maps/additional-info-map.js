const fields = [

  /* =====================================================
     1. Claimed U.S. Citizen
     ===================================================== */
  {
    id: "claim_citizen_yes",
    validate: () =>
      claim_citizen_yes.checked || claim_citizen_no.checked,
    message:
      "Please answer whether you have ever claimed to be a U.S. citizen by selecting Yes or No."
  },
  {
    id: "claim_citizen_no",
    validate: () =>
      claim_citizen_yes.checked || claim_citizen_no.checked,
    message:
      "Please answer whether you have ever claimed to be a U.S. citizen by selecting Yes or No."
  },
  {
    id: "claim_citizen_details",
    validate: () => true,
    message: "Please provide an explanation for your answer."
  },

  /* =====================================================
     2. Registered to Vote
     ===================================================== */
  {
    id: "registered_vote_yes",
    validate: () =>
      registered_vote_yes.checked || registered_vote_no.checked,
    message:
      "Please answer whether you have ever registered to vote or voted in a U.S. election."
  },
  {
    id: "registered_vote_no",
    validate: () =>
      registered_vote_yes.checked || registered_vote_no.checked,
    message:
      "Please answer whether you have ever registered to vote or voted in a U.S. election."
  },
  {
    id: "registered_vote_details",
    condition: () => registered_vote_yes.checked,
    validate: () => true,
    message: "Please provide an explanation for your answer."
  },

  /* =====================================================
     3. Owe Overdue Taxes
     ===================================================== */
  {
    id: "owe_taxes_yes",
    validate: () =>
      owe_taxes_yes.checked || owe_taxes_no.checked,
    message:
      "Please answer whether you currently owe any overdue Federal, state, or local taxes."
  },
  {
    id: "owe_taxes_no",
    validate: () =>
      owe_taxes_yes.checked || owe_taxes_no.checked,
    message:
      "Please answer whether you currently owe any overdue Federal, state, or local taxes."
  },
  {
    id: "owe_taxes_details",
    condition: () => owe_taxes_yes.checked,
    validate: () => true,
    message: "Please provide an explanation for your answer."
  },

  /* =====================================================
     4. Nonresident Alien
     ===================================================== */
  {
    id: "nonresident_yes",
    validate: () =>
      nonresident_yes.checked || nonresident_no.checked,
    message:
      "Please answer whether you have ever considered yourself a nonresident alien for tax purposes."
  },
  {
    id: "nonresident_no",
    validate: () =>
      nonresident_yes.checked || nonresident_no.checked,
    message:
      "Please answer whether you have ever considered yourself a nonresident alien for tax purposes."
  },
  {
    id: "nonresident_details",
    condition: () => nonresident_yes.checked,
    validate: () => true,
    message: "Please provide an explanation for your answer."
  },

  /* =====================================================
     5.a Communist / Totalitarian
     ===================================================== */
  {
    id: "communist_yes",
    validate: () =>
      communist_yes.checked || communist_no.checked,
    message:
      "Please answer whether you have ever been associated with a Communist or totalitarian party."
  },
  {
    id: "communist_no",
    validate: () =>
      communist_yes.checked || communist_no.checked,
    message:
      "Please answer whether you have ever been associated with a Communist or totalitarian party."
  },
  {
    id: "communist_details",
    condition: () => communist_yes.checked,
    validate: () => true,
    message: "Please provide an explanation for your answer."
  },

  /* =====================================================
     5.b Group / Sabotage
     ===================================================== */
  {
    id: "group_yes",
    validate: () =>
      group_yes.checked || group_no.checked,
    message:
      "Please answer whether you have ever been associated with a group advocating violence, overthrow of government, or sabotage."
  },
  {
    id: "group_no",
    validate: () =>
      group_yes.checked || group_no.checked,
    message:
      "Please answer whether you have ever been associated with a group advocating violence, overthrow of government, or sabotage."
  },
  {
    id: "group_details",
    condition: () => group_yes.checked,
    validate: () => true,
    message: "Please provide an explanation for your answer."
  },
  // --- 6 ---
  { id: "weapon_group_yes", validate: () => weapon_group_yes.checked || weapon_group_no.checked,
    message: "Please answer whether you have ever been associated with a group that used weapons or explosives." },
  { id: "weapon_group_no",  validate: () => weapon_group_yes.checked || weapon_group_no.checked,
    message: "Please answer whether you have ever been associated with a group that used weapons or explosives." },
  { id: "weapon_group_details", condition: () => weapon_group_yes.checked, validate: () => true, message: "" },


  { id: "kidnap_group_yes", validate: () => kidnap_group_yes.checked || kidnap_group_no.checked,
    message: "Please answer whether you have ever participated in kidnapping, assassination, hijacking, or sabotage." },
  { id: "kidnap_group_no",  validate: () => kidnap_group_yes.checked || kidnap_group_no.checked,
    message: "Please answer whether you have ever participated in kidnapping, assassination, hijacking, or sabotage." },
  { id: "kidnap_group_details", condition: () => kidnap_group_yes.checked, validate: () => true, message: "" },


  { id: "incite_group_yes", validate: () => incite_group_yes.checked || incite_group_no.checked,
    message: "Please answer whether you have ever threatened, planned, or encouraged violent acts." },
  { id: "incite_group_no",  validate: () => incite_group_yes.checked || incite_group_no.checked,
    message: "Please answer whether you have ever threatened, planned, or encouraged violent acts." },
  { id: "incite_group_details", condition: () => incite_group_yes.checked, validate: () => true, message: "" },


  // --- 7 ---
  { id: "torture_yes", validate: () => torture_yes.checked || torture_no.checked,
    message: "Please answer whether you have ever been involved in torture." },
  { id: "torture_no",  validate: () => torture_yes.checked || torture_no.checked,
    message: "Please answer whether you have ever been involved in torture." },
  { id: "torture_details", condition: () => torture_yes.checked, validate: () => true, message: "" },


  { id: "genocide_yes", validate: () => genocide_yes.checked || genocide_no.checked,
    message: "Please answer whether you have ever been involved in genocide." },
  { id: "genocide_no",  validate: () => genocide_yes.checked || genocide_no.checked,
    message: "Please answer whether you have ever been involved in genocide." },
  { id: "genocide_details", condition: () => genocide_yes.checked, validate: () => true, message: "" },


  { id: "killing_yes", validate: () => killing_yes.checked || killing_no.checked,
    message: "Please answer whether you have ever killed or attempted to kill another person." },
  { id: "killing_no",  validate: () => killing_yes.checked || killing_no.checked,
    message: "Please answer whether you have ever killed or attempted to kill another person." },
  { id: "killing_details", condition: () => killing_yes.checked, validate: () => true, message: "" },


  { id: "injure_yes", validate: () => injure_yes.checked || injure_no.checked,
    message: "Please answer whether you have ever intentionally and severely injured someone." },
  { id: "injure_no",  validate: () => injure_yes.checked || injure_no.checked,
    message: "Please answer whether you have ever intentionally and severely injured someone." },
  { id: "injure_details", condition: () => injure_yes.checked, validate: () => true, message: "" },


  { id: "sexual_yes", validate: () => sexual_yes.checked || sexual_no.checked,
    message: "Please answer whether you have ever engaged in non-consensual sexual activity." },
  { id: "sexual_no",  validate: () => sexual_yes.checked || sexual_no.checked,
    message: "Please answer whether you have ever engaged in non-consensual sexual activity." },
  { id: "sexual_details", condition: () => sexual_yes.checked, validate: () => true, message: "" },


  { id: "religion_yes", validate: () => religion_yes.checked || religion_no.checked,
    message: "Please answer whether you have ever prevented someone from practicing their religion." },
  { id: "religion_no",  validate: () => religion_yes.checked || religion_no.checked,
    message: "Please answer whether you have ever prevented someone from practicing their religion." },
  { id: "religion_details", condition: () => religion_yes.checked, validate: () => true, message: "" },


  { id: "harm_group_yes", validate: () => harm_group_yes.checked || harm_group_no.checked,
    message: "Please answer whether you have ever harmed someone due to race, religion, or political opinion." },
  { id: "harm_group_no",  validate: () => harm_group_yes.checked || harm_group_no.checked,
    message: "Please answer whether you have ever harmed someone due to race, religion, or political opinion." },
  { id: "harm_group_details", condition: () => harm_group_yes.checked, validate: () => true, message: "" },


  // --- 8 ---
  { id: "military_yes", validate: () => military_yes.checked || military_no.checked,
    message: "Please answer whether you have ever served in a military or police unit." },
  { id: "military_no",  validate: () => military_yes.checked || military_no.checked,
    message: "Please answer whether you have ever served in a military or police unit." },
  { id: "military_details", condition: () => military_yes.checked, validate: () => true, message: "" },


  { id: "armed_group_yes", validate: () => armed_group_yes.checked || armed_group_no.checked,
    message: "Please answer whether you have ever participated in an armed group." },
  { id: "armed_group_no",  validate: () => armed_group_yes.checked || armed_group_no.checked,
    message: "Please answer whether you have ever participated in an armed group." },
  { id: "armed_group_details", condition: () => armed_group_yes.checked, validate: () => true, message: "" },


  // 9
  { id: "jail_yes", validate: () => jail_yes.checked || jail_no.checked,
    message: "Please answer Question 9 about working or serving in a place where people were detained." },
  { id: "jail_no",  validate: () => jail_yes.checked || jail_no.checked,
    message: "Please answer Question 9 about working or serving in a place where people were detained." },
  { id: "jail_details", condition: () => jail_yes.checked, validate: () => true, message: "" },


  // 10.a
  { id: "weapon_yes", validate: () => weapon_yes.checked || weapon_no.checked,
    message: "Please answer Item 10.a. about being part of a group that used or threatened to use weapons." },
  { id: "weapon_no",  validate: () => weapon_yes.checked || weapon_no.checked,
    message: "Please answer Item 10.a. about being part of a group that used or threatened to use weapons." },
  { id: "weapon_details", condition: () => weapon_yes.checked, validate: () => true, message: "" },

  // 10.b (only required if 10.a Yes)
  { id: "weapon_person_yes",
    condition: () => weapon_yes.checked,
    validate: () => weapon_person_yes.checked || weapon_person_no.checked,
    message: "Please answer Item 10.b. because you answered Yes to Item 10.a." },
  { id: "weapon_person_no",
    condition: () => weapon_yes.checked,
    validate: () => weapon_person_yes.checked || weapon_person_no.checked,
    message: "Please answer Item 10.b. because you answered Yes to Item 10.a." },
  { id: "weapon_person_details", condition: () => weapon_person_yes.checked, validate: () => true, message: "" },

  // 10.c (only required if 10.a Yes)
  { id: "weapon_threaten_yes",
    condition: () => weapon_yes.checked,
    validate: () => weapon_threaten_yes.checked || weapon_threaten_no.checked,
    message: "Please answer Item 10.c. because you answered Yes to Item 10.a." },
  { id: "weapon_threaten_no",
    condition: () => weapon_yes.checked,
    validate: () => weapon_threaten_yes.checked || weapon_threaten_no.checked,
    message: "Please answer Item 10.c. because you answered Yes to Item 10.a." },
  { id: "weapon_threaten_details", condition: () => weapon_threaten_yes.checked, validate: () => true, message: "" },

  // 11
  { id: "sold_yes", validate: () => sold_yes.checked || sold_no.checked,
    message: "Please answer Question 11 about selling, providing, or transporting weapons." },
  { id: "sold_no",  validate: () => sold_yes.checked || sold_no.checked,
    message: "Please answer Question 11 about selling, providing, or transporting weapons." },
  { id: "sold_details", condition: () => sold_yes.checked, validate: () => true, message: "" },

  // 12
  { id: "training_yes", validate: () => training_yes.checked || training_no.checked,
    message: "Please answer Question 12 about receiving weapons or military-type training." },
  { id: "training_no",  validate: () => training_yes.checked || training_no.checked,
    message: "Please answer Question 12 about receiving weapons or military-type training." },
  { id: "training_details", condition: () => training_yes.checked, validate: () => true, message: "" },

  // 13
  { id: "enlist_yes", validate: () => enlist_yes.checked || enlist_no.checked,
    message: "Please answer Question 13 about recruiting or using a person under 15 years of age in an armed group." },
  { id: "enlist_no",  validate: () => enlist_yes.checked || enlist_no.checked,
    message: "Please answer Question 13 about recruiting or using a person under 15 years of age in an armed group." },
  { id: "enlist_details", condition: () => enlist_yes.checked, validate: () => true, message: "" },

  // 14
  { id: "hostilities_yes", validate: () => hostilities_yes.checked || hostilities_no.checked,
    message: "Please answer Question 14 about using a person under 15 years of age to take part in hostilities." },
  { id: "hostilities_no",  validate: () => hostilities_yes.checked || hostilities_no.checked,
    message: "Please answer Question 14 about using a person under 15 years of age to take part in hostilities." },
  { id: "hostilities_details", condition: () => hostilities_yes.checked, validate: () => true, message: "" },

  // ================= 15.a =================
  {
    id: "arrested_yes",
    validate: () => arrested_yes.checked || arrested_no.checked,
    message:
      "Please answer Question 15.a about committing a crime or offense for which you were not arrested."
  },
  {
    id: "arrested_no",
    validate: () => arrested_yes.checked || arrested_no.checked,
    message:
      "Please answer Question 15.a about committing a crime or offense for which you were not arrested."
  },

   // ================= 15.b =================
  {
    id: "crime_yes",
    validate: () => crime_yes.checked || crime_no.checked,
    message:
      "Please answer Question 15.b about being arrested, cited, detained, or charged with a crime or offense."
  },
  {
    id: "crime_no",
    validate: () => crime_yes.checked || crime_no.checked,
    message:
      "Please answer Question 15.b about being arrested, cited, detained, or charged with a crime or offense."
  },
  // ================= CRIME ROW 1 (REQUIRED IF 15.a OR 15.b = YES) =================
  {
    id: "crime_name_1",
    condition: () => arrested_yes.checked || crime_yes.checked,
    validate: v => v.trim() !== "",
    message:
      "Please provide the name or description of the crime or offense."
  },
  {
    id: "crime_date_1",
    condition: () => arrested_yes.checked || crime_yes.checked,
    validate: v => v !== "",
    message:
      "Please provide the date of the crime or offense."
  },
  {
    id: "crime_place_1",
    condition: () => arrested_yes.checked || crime_yes.checked,
    validate: v => v.trim() !== "",
    message:
      "Please provide the place where the crime or offense occurred."
  },

  // ================= CRIME ROW 2 (ONLY IF FILLED) =================
  {
    id: "crime_name_2",
    condition: () =>
      crime_name_2.value ||
      crime_date_2.value ||
      crime_place_2.value,
    validate: v => v.trim() !== "",
    message:
      "Please complete all required fields for the second crime or offense."
  },
  {
    id: "crime_date_2",
    condition: () =>
      crime_name_2.value ||
      crime_date_2.value ||
      crime_place_2.value,
    validate: v => v !== "",
    message:
      "Please provide the date for the second crime or offense."
  },
  {
    id: "crime_place_2",
    condition: () =>
      crime_name_2.value ||
      crime_date_2.value ||
      crime_place_2.value,
    validate: v => v.trim() !== "",
    message:
      "Please provide the place for the second crime or offense."
  },

  // ================= CRIME ROW 3 =================
  {
    id: "crime_name_3",
    condition: () =>
      crime_name_3?.value ||
      crime_date_3?.value ||
      crime_place_3?.value,
    validate: v => v.trim() !== "",
    message:
      "Please complete all required fields for this crime or offense."
  },
  {
    id: "crime_date_3",
    condition: () =>
      crime_name_3?.value ||
      crime_date_3?.value ||
      crime_place_3?.value,
    validate: v => v !== "",
    message:
      "Please provide the date for this crime or offense."
  },
  {
    id: "crime_place_3",
    condition: () =>
      crime_name_3?.value ||
      crime_date_3?.value ||
      crime_place_3?.value,
    validate: v => v.trim() !== "",
    message:
      "Please provide the place for this crime or offense."
  },

  // ================= CRIME ROW 4 =================
  {
    id: "crime_name_4",
    condition: () =>
      crime_name_4?.value ||
      crime_date_4?.value ||
      crime_place_4?.value,
    validate: v => v.trim() !== "",
    message:
      "Please complete all required fields for this crime or offense."
  },
  {
    id: "crime_date_4",
    condition: () =>
      crime_name_4?.value ||
      crime_date_4?.value ||
      crime_place_4?.value,
    validate: v => v !== "",
    message:
      "Please provide the date for this crime or offense."
  },
  {
    id: "crime_place_4",
    condition: () =>
      crime_name_4?.value ||
      crime_date_4?.value ||
      crime_place_4?.value,
    validate: v => v.trim() !== "",
    message:
      "Please provide the place for this crime or offense."
  },

  // ================= CRIME ROW 5 =================
  {
    id: "crime_name_5",
    condition: () =>
      crime_name_5?.value ||
      crime_date_5?.value ||
      crime_place_5?.value,
    validate: v => v.trim() !== "",
    message:
      "Please complete all required fields for this crime or offense."
  },
  {
    id: "crime_date_5",
    condition: () =>
      crime_name_5?.value ||
      crime_date_5?.value ||
      crime_place_5?.value,
    validate: v => v !== "",
    message:
      "Please provide the date for this crime or offense."
  },
  {
    id: "crime_place_5",
    condition: () =>
      crime_name_5?.value ||
      crime_date_5?.value ||
      crime_place_5?.value,
    validate: v => v.trim() !== "",
    message:
      "Please provide the place for this crime or offense."
  },

  // ================= ADDITIONAL INFORMATION (OPTIONAL) =================
  {
    id: "crime_additional_info",
    validate: () => true,
    message: ""
  },

    // 16
  { id: "probation_yes", validate: () => probation_yes.checked || probation_no.checked,
    message: "Please answer Question 16" },
  { id: "probation_no",  validate: () => probation_yes.checked || probation_no.checked,
    message: "Please answer Question 16" },


  // 17.a
  { id: "prostitute_yes", validate: () => prostitute_yes.checked || prostitute_no.checked,
    message: "Please answer Question 17.a" },
  { id: "prostitute_no",  validate: () => prostitute_yes.checked || prostitute_no.checked,
    message: "Please answer Question 17.a" },
  { id: "prostitute_details", condition: () => hostilities_yes.checked, validate: () => true, message: "" },


  // 17.b
  { id: "drug_yes", validate: () => drug_yes.checked || drug_no.checked,
    message: "Please answer Question 17.b" },
  { id: "drug_no",  validate: () => drug_yes.checked || drug_no.checked,
    message: "Please answer Question 17.b" },
  { id: "drug_details", condition: () => drug_yes.checked, validate: () => true, message: "" },

  // 17.c
  { id: "multiple_married_yes", validate: () => multiple_married_yes.checked || multiple_married_no.checked,
    message: "Please answer Question 17.c" },
  { id: "multiple_married_no",  validate: () => multiple_married_yes.checked || multiple_married_no.checked,
    message: "Please answer Question 17.c" },
  { id: "multiple_married_details", condition: () => multiple_married_yes.checked, validate: () => true, message: "" },


  // 17.d
  { id: "married_immigration_yes", validate: () => married_immigration_yes.checked || married_immigration_no.checked,
    message: "Please answer Question 17.d" },
  { id: "married_immigration_no",  validate: () => married_immigration_yes.checked || married_immigration_no.checked,
    message: "Please answer Question 17.d" },
  { id: "married_immigration_details", condition: () => married_immigration_yes.checked, validate: () => true, message: "" },


  // 17.e
  { id: "illegal_entry_yes", validate: () => illegal_entry_yes.checked || illegal_entry_no.checked,
    message: "Please answer Question 17.e" },
  { id: "illegal_entry_no",  validate: () => illegal_entry_yes.checked || illegal_entry_no.checked,
    message: "Please answer Question 17.e" },
  { id: "illegal_entry_details", condition: () => illegal_entry_yes.checked, validate: () => true, message: "" },


  // 17.f
  { id: "illegal_gambling_yes", validate: () => illegal_gambling_yes.checked || illegal_gambling_no.checked,
    message: "Please answer Question 17.f" },
  { id: "illegal_gambling_no",  validate: () => illegal_gambling_yes.checked || illegal_gambling_no.checked,
    message: "Please answer Question 17.f" },
  { id: "illegal_gambling_details", condition: () => illegal_gambling_yes.checked, validate: () => true, message: "" },


  // 17.g
  { id: "fail_alimony_yes", validate: () => fail_alimony_yes.checked || fail_alimony_no.checked,
    message: "Please answer Question 17.g" },
  { id: "fail_alimony_no",  validate: () => fail_alimony_yes.checked || fail_alimony_no.checked,
    message: "Please answer Question 17.g" },
  { id: "fail_alimony_details", condition: () => fail_alimony_yes.checked, validate: () => true, message: "" },


  // 17.h
  { id: "misrepresention_yes", validate: () => misrepresention_yes.checked || misrepresention_no.checked,
    message: "Please answer Question 17.h" },
  { id: "misrepresention_no",  validate: () => misrepresention_yes.checked || misrepresention_no.checked,
    message: "Please answer Question 17.h" },
  { id: "misrepresention_details", condition: () => misrepresention_yes.checked, validate: () => true, message: "" },


  // 18
  { id: "false_info_yes", validate: () => false_info_yes.checked || false_info_no.checked,
    message: "Please answer Question 18" },
  { id: "false_info_no",  validate: () => false_info_yes.checked || false_info_no.checked,
    message: "Please answer Question 18" },
  { id: "false_info_details", condition: () => false_info_yes.checked, validate: () => true, message: "" },


  // 19
  { id: "lied_entry_yes", validate: () => lied_entry_yes.checked || lied_entry_no.checked,
    message: "Please answer Question 19" },
  { id: "lied_entry_no",  validate: () => lied_entry_yes.checked || lied_entry_no.checked,
    message: "Please answer Question 19" },
  { id: "lied_entry_details", condition: () => lied_entry_yes.checked, validate: () => true, message: "" },


  // 20
  { id: "removal_yes", validate: () => removal_yes.checked || removal_no.checked,
    message: "Please answer Question 20" },
  { id: "removal_no",  validate: () => removal_yes.checked || removal_no.checked,
    message: "Please answer Question 20" },
  { id: "removal_details", condition: () => removal_yes.checked, validate: () => true, message: "" },



  // 21
  { id: "deported_yes", validate: () => deported_yes.checked || deported_no.checked,
    message: "Please answer Question 21" },
  { id: "deported_no",  validate: () => deported_yes.checked || deported_no.checked,
    message: "Please answer Question 21" },
  { id: "deported_details", condition: () => deported_yes.checked, validate: () => true, message: "" },


  // ================= 22.a =================
  {
    id: "male_18_yes",
    validate: () => male_18_yes.checked || male_18_no.checked,
    message:
      "Please answer Item 22.a about whether you lived in the United States between your 18th and 26th birthdays."
  },
  {
    id: "male_18_no",
    validate: () => male_18_yes.checked || male_18_no.checked,
    message:
      "Please answer Item 22.a about whether you lived in the United States between your 18th and 26th birthdays."
  },

  // ================= 22.b (only if 22.a = YES) =================
  {
    id: "selective_service_yes",
    condition: () => male_18_yes.checked,
    validate: () =>
      selective_service_yes.checked || selective_service_no.checked,
    message:
      "Please answer Item 22.b about whether you registered for the Selective Service."
  },
  {
    id: "selective_service_no",
    condition: () => male_18_yes.checked,
    validate: () =>
      selective_service_yes.checked || selective_service_no.checked,
    message:
      "Please answer Item 22.b about whether you registered for the Selective Service."
  },

  // ================= 22.c DETAILS (only if 22.b = YES) =================
  {
    id: "selective_service_date",
    condition: () =>
      male_18_yes.checked && selective_service_yes.checked,
    validate: v => v !== "",
    message:
      "Please provide the date you registered for the Selective Service."
  },
  {
    id: "selective_service_number",
    condition: () =>
      male_18_yes.checked && selective_service_yes.checked,
    validate: v => v.trim() !== "",
    message:
      "Please provide your Selective Service number."
  },

  // 23
  { id: "avoid_draft_yes", validate: () => avoid_draft_yes.checked || avoid_draft_no.checked,
    message: "Please answer Question 23" },
  { id: "avoid_draft_no",  validate: () => avoid_draft_yes.checked || avoid_draft_no.checked,
    message: "Please answer Question 23" },
  { id: "avoid_draft_details", condition: () => avoid_draft_yes.checked, validate: () => true, message: "" },


  // 24
  { id: "exemption_military_yes", validate: () => exemption_military_yes.checked || exemption_military_no.checked,
    message: "Please answer Question 24" },
  { id: "exemption_military_no",  validate: () => exemption_military_yes.checked || exemption_military_no.checked,
    message: "Please answer Question 24" },
  { id: "exemption_military_details", condition: () => exemption_military_yes.checked, validate: () => true, message: "" },


   // ================= ITEM 25 =================
  { id: "served_army_yes", validate: () => served_army_yes.checked || served_army_no.checked,
    message: "Please answer Question 25" },
  { id: "served_army_no",  validate: () => served_army_yes.checked || served_army_no.checked,
    message: "Please answer Question 25" },
  { id: "served_army_details", condition: () => served_army_yes.checked, validate: () => true, message: "" },


   // ================= ITEM 26.a =================
  { id: "member_armed_yes", condition: () => served_army_yes.checked,
    validate: () => member_armed_yes.checked || member_armed_no.checked,
    message: "Please answer Question 26.a" },
  { id: "member_armed_no",  condition: () => served_army_yes.checked,
    validate: () => member_armed_yes.checked || member_armed_no.checked,
    message: "Please answer Question 26.a" },


   // ================= ITEM 26.b =================
  { id: "deploy_yes", condition: () => member_armed_yes.checked,
    validate: () => deploy_yes.checked || deploy_no.checked,
    message: "Please answer Question 26.b" },
  { id: "deploy_no",  condition: () => member_armed_yes.checked,
    validate: () => deploy_yes.checked || deploy_no.checked,
    message: "Please answer Question 26.b" },


   // ================= ITEM 26.c =================
  { id: "station_yes", condition: () => member_armed_yes.checked,
    validate: () => station_yes.checked || station_no.checked,
    message: "Please answer Question 26.c" },
  { id: "station_no",  condition: () => member_armed_yes.checked,
    validate: () => station_yes.checked || station_no.checked,
    message: "Please answer Question 26.c" },


   // ================= ITEM 26.d =================
  { id: "former_military_yes", condition: () => member_armed_no.checked,
    validate: () => former_military_yes.checked || former_military_no.checked,
    message: "Please answer Question 26.d" },
  { id: "former_military_no",  condition: () => member_armed_no.checked,
    validate: () => former_military_yes.checked || former_military_no.checked,
    message: "Please answer Question 26.d" },


   // ================= ITEM 27 =================
  { id: "discharged_yes", condition: () => served_army_yes.checked,
    validate: () => discharged_yes.checked || discharged_no.checked,
    message: "Please answer Question 27" },
  { id: "discharged_no",  condition: () => served_army_yes.checked,
    validate: () => discharged_yes.checked || discharged_no.checked,
    message: "Please answer Question 27" },
  { id: "discharged_details", condition: () => discharged_yes.checked, validate: () => true, message: "" },


   // ================= ITEM 28 =================
  { id: "discharged_alien_yes", condition: () => served_army_yes.checked,
    validate: () => discharged_alien_yes.checked || discharged_alien_no.checked,
    message: "Please answer Question 28" },
  { id: "discharged_alien_no",  condition: () => served_army_yes.checked,
    validate: () => discharged_alien_yes.checked || discharged_alien_no.checked,
    message: "Please answer Question 28" },
  { id: "discharged_alien_details", condition: () => discharged_alien_yes.checked, validate: () => true, message: "" },


   // ================= ITEM 29 =================
  { id: "deserted_yes", condition: () => served_army_yes.checked,
    validate: () => deserted_yes.checked || deserted_no.checked,
    message: "Please answer Question 29" },
  { id: "deserted_no",  condition: () => served_army_yes.checked,
    validate: () => deserted_yes.checked || deserted_no.checked,
    message: "Please answer Question 29" },
  { id: "deserted_details", condition: () => deserted_yes.checked, validate: () => true, message: "" },


   // ================= ITEM 30.a =================
  { id: "nobility_yes",
    validate: () => nobility_yes.checked || nobility_no.checked,
    message: "Please answer Question 30.a" },
  { id: "nobility_no",
    validate: () => nobility_yes.checked || nobility_no.checked,
    message: "Please answer Question 30.a" },
  { id: "nobility_details", condition: () => nobility_yes.checked, validate: () => true, message: "" },


   // ================= ITEM 30.b =================
  { id: "nobility_giveup_yes", condition: () => nobility_yes.checked,
    validate: () => nobility_giveup_yes.checked || nobility_giveup_no.checked,
    message: "Please answer Question 30.b" },
  { id: "nobility_giveup_no", condition: () => nobility_yes.checked,
    validate: () => nobility_giveup_yes.checked || nobility_giveup_no.checked,
    message: "Please answer Question 30.b" },
  { id: "nobility_titles", condition: () => nobility_giveup_yes.checked, validate: () => true, message: "" },


   // ================= ITEM 31 =================
  { id: "support_constitution_yes",
    validate: () => support_constitution_yes.checked || support_constitution_no.checked,
    message: "Please answer Question 31" },
  { id: "support_constitution_no",
    validate: () => support_constitution_yes.checked || support_constitution_no.checked,
    message: "Please answer Question 31" },


   // ================= ITEM 32 =================
  { id: "oath_yes",
    validate: () => oath_yes.checked || oath_no.checked,
    message: "Please answer Question 32" },
  { id: "oath_no",
    validate: () => oath_yes.checked || oath_no.checked,
    message: "Please answer Question 32" },


   // ================= ITEM 33 =================
  { id: "unable_oath_yes",
    validate: () => unable_oath_yes.checked || unable_oath_no.checked,
    message: "Please answer Question 33" },
  { id: "unable_oath_no",
    validate: () => unable_oath_yes.checked || unable_oath_no.checked,
    message: "Please answer Question 33" },


   // ================= ITEM 34 =================
  { id: "take_oath_yes", condition: () => unable_oath_no.checked,
    validate: () => take_oath_yes.checked || take_oath_no.checked,
    message: "Please answer Question 34" },
  { id: "take_oath_no", condition: () => unable_oath_no.checked,
    validate: () => take_oath_yes.checked || take_oath_no.checked,
    message: "Please answer Question 34" },


   // ================= ITEM 35 =================
  { id: "beararms_yes", condition: () => unable_oath_no.checked,
    validate: () => beararms_yes.checked || beararms_no.checked,
    message: "Please answer Question 35" },
  { id: "beararms_no", condition: () => unable_oath_no.checked,
    validate: () => beararms_yes.checked || beararms_no.checked,
    message: "Please answer Question 35" },


   // ================= ITEM 36 =================
  { id: "noncombat_yes", condition: () => unable_oath_no.checked,
    validate: () => noncombat_yes.checked || noncombat_no.checked,
    message: "Please answer Question 36" },
  { id: "noncombat_no", condition: () => unable_oath_no.checked,
    validate: () => noncombat_yes.checked || noncombat_no.checked,
    message: "Please answer Question 36" },

  
   // ================= ITEM 37 =================
  { id: "nonmilitary_work_yes", condition: () => unable_oath_no.checked,
    validate: () => nonmilitary_work_yes.checked || nonmilitary_work_no.checked,
    message: "Please answer Question 37" },
  { id: "nonmilitary_work_no", condition: () => unable_oath_no.checked,
    validate: () => nonmilitary_work_yes.checked || nonmilitary_work_no.checked,
    message: "Please answer Question 37" },




];
