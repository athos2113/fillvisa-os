(function(){
'use strict';
const {f,eq,heading,date,yn}=I129FBase.helpers;
const used=eq('has_interpreter','yes');
const phone=v=>/^[+()\d .-]+$/.test(v)&&v.replace(/\D/g,'').length>=7&&v.replace(/\D/g,'').length<=15;
I129FBase.maps['interpreter-info']=[
yn('has_interpreter',"Did an interpreter help you understand this petition?"),
heading('interpreter_name_heading',"Interpreter's Full Name",used),
f('interpreter_lastname','1. Family name (last name)',{condition:used}),
f('interpreter_firstname','1. Given name (first name)',{condition:used}),
f('interpreter_business','2. Business or organization name (if any)',{required:false,condition:used}),
heading('interpreter_contact_heading',"Interpreter's Contact Information",used),
f('interpreter_telephone','3. Daytime telephone number',{type:'tel',validate:phone,message:'Enter a telephone number containing 7–15 digits.',condition:used}),
f('interpreter_mobile','4. Mobile telephone number (if any)',{type:'tel',required:false,validate:phone,message:'Enter a telephone number containing 7–15 digits.',condition:used}),
f('interpreter_email','5. Email address (if any)',{type:'email',required:false,condition:used}),
heading('interpreter_certification_heading',"Interpreter's Certification and Signature",used),
f('interpreter_certification',"I certify, under penalty of perjury, that I am fluent in English and the language entered below, and I have interpreted every question on the petition and Instructions and interpreted the petitioner’s answers to the questions in that language, and the petitioner informed me that he or she understands every instruction, question, and answer on the petition.",{type:'note',condition:used}),
f('interpreter_language','Language in which the interpreter is fluent, in addition to English',{condition:used}),
f('interpreter_sign','6. Interpreter signature',{type:'signature',required:false,condition:used}),
date('interpreter_sign_date','Date of signature',{required:false,requiredWhen:d=>!!d.interpreter_sign,condition:used})
];
})();
