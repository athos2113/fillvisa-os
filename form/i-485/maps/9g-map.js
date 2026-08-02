// maps/general-eligibility-9h-map.js

const fields = [

    { id:"polygamy_yes", label:"Question 79", validate:()=>document.getElementById("polygamy_yes").checked || document.getElementById("polygamy_no").checked, message:"Please select Yes or No." },
    { id:"polygamy_no", label:"Question 79", validate:()=>document.getElementById("polygamy_yes").checked || document.getElementById("polygamy_no").checked, message:"" },

    { id:"accompany_alien_yes", label:"Question 80", validate:()=>document.getElementById("accompany_alien_yes").checked || document.getElementById("accompany_alien_no").checked, message:"Please select Yes or No." },
    { id:"accompany_alien_no", label:"Question 80", validate:()=>document.getElementById("accompany_alien_yes").checked || document.getElementById("accompany_alien_no").checked, message:"" },

    { id:"assist_detain_yes", label:"Question 81", validate:()=>document.getElementById("assist_detain_yes").checked || document.getElementById("assist_detain_no").checked, message:"Please select Yes or No." },
    { id:"assist_detain_no", label:"Question 81", validate:()=>document.getElementById("assist_detain_yes").checked || document.getElementById("assist_detain_no").checked, message:"" },

    { id:"vote_violation_yes", label:"Question 82", validate:()=>document.getElementById("vote_violation_yes").checked || document.getElementById("vote_violation_no").checked, message:"Please select Yes or No." },
    { id:"vote_violation_no", label:"Question 82", validate:()=>document.getElementById("vote_violation_yes").checked || document.getElementById("vote_violation_no").checked, message:"" },

    { id:"renounce_tax_yes", label:"Question 83", validate:()=>document.getElementById("renounce_tax_yes").checked || document.getElementById("renounce_tax_no").checked, message:"Please select Yes or No." },
    { id:"renounce_tax_no", label:"Question 83", validate:()=>document.getElementById("renounce_tax_yes").checked || document.getElementById("renounce_tax_no").checked, message:"" },

    { id:"exempt_training_yes", label:"Question 84.a", validate:()=>document.getElementById("exempt_training_yes").checked || document.getElementById("exempt_training_no").checked, message:"Please select Yes or No." },
    { id:"exempt_training_no", label:"Question 84.a", validate:()=>document.getElementById("exempt_training_yes").checked || document.getElementById("exempt_training_no").checked, message:"" },

    { id:"relieved_training_yes", label:"Question 84.b", validate:()=>document.getElementById("relieved_training_yes").checked || document.getElementById("relieved_training_no").checked, message:"Please select Yes or No." },
    { id:"relieved_training_no", label:"Question 84.b", validate:()=>document.getElementById("relieved_training_yes").checked || document.getElementById("relieved_training_no").checked, message:"" },

    { id:"desertion_yes", label:"Question 84.c", validate:()=>document.getElementById("desertion_yes").checked || document.getElementById("desertion_no").checked, message:"Please select Yes or No." },
    { id:"desertion_no", label:"Question 84.c", validate:()=>document.getElementById("desertion_yes").checked || document.getElementById("desertion_no").checked, message:"" },

    { id:"evade_training_yes", label:"Question 85", validate:()=>document.getElementById("evade_training_yes").checked || document.getElementById("evade_training_no").checked, message:"Please select Yes or No." },
    { id:"evade_training_no", label:"Question 85", validate:()=>document.getElementById("evade_training_yes").checked || document.getElementById("evade_training_no").checked, message:"" },

    { id:"evade_training_text", label:"Question 86", validate:()=>true, message:"" }

];
