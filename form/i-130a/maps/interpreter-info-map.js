(function(){
'use strict';
const {f,eq,heading,date,yn,address}=I130ABase.helpers;
const used=eq('different_interpreter','yes');
const phone=v=>/^[+()\d .-]+$/.test(v)&&v.replace(/\D/g,'').length>=7&&v.replace(/\D/g,'').length<=15;
I130ABase.maps['interpreter-info']=[
 f('interpreter_note','Provide information about the interpreter you used to complete Form I-130A if he or she is different from the interpreter used to complete the Form I-130 filed on your behalf.',{type:'note'}),
 yn('different_interpreter','Did you use an interpreter for Form I-130A who is different from the interpreter for Form I-130?'),
 heading('interpreter_name_heading',"Interpreter's Full Name",used),
 f('interpreter_lastname','1.a. Family name (last name)',{condition:used}),
 f('interpreter_firstname','1.b. Given name (first name)',{condition:used}),
 f('interpreter_business','2. Business or organization name (if any)',{required:false,condition:used}),
 ...address('interpreter',"3. Interpreter's Mailing Address",used),
 heading('interpreter_contact_heading',"Interpreter's Contact Information",used),
 f('interpreter_telephone','4. Daytime telephone number',{type:'tel',condition:used,validate:phone,message:'Enter a telephone number containing 7–15 digits.'}),
 f('interpreter_mobile','5. Mobile telephone number (if any)',{type:'tel',condition:used,required:false,validate:phone,message:'Enter a telephone number containing 7–15 digits.'}),
 f('interpreter_email','6. Email address (if any)',{type:'email',condition:used,required:false}),
 heading('interpreter_certification_heading',"Interpreter's Certification",used),
 f('interpreter_certification_intro','I certify, under penalty of perjury, that: I am fluent in English and the language entered below.',{type:'note',condition:used}),
 f('interpreter_language','Language used (the same language provided in Part 4, Item 1.b)',{condition:used}),
 f('interpreter_certification','I have read to this spouse beneficiary in the identified language every question and instruction on this form and his or her answer to every question. The spouse beneficiary informed me that he or she understands every instruction, question, and answer on the form, including the Spouse Beneficiary’s Certification, and has verified the accuracy of every answer.',{type:'note',condition:used}),
 heading('interpreter_signature_heading',"Interpreter's Signature",used),
 f('interpreter_sign','7.a. Interpreter signature',{type:'signature',required:false,condition:used}),
 date('interpreter_sign_date','7.b. Date of signature',{required:false,condition:used,requiredWhen:d=>!!d.interpreter_sign})
];
})();
