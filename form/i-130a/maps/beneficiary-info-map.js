(function(){
'use strict';
const {f,eq,heading,date}=I130ABase.helpers;
const phone=v=>/^[+()\d .-]+$/.test(v)&&v.replace(/\D/g,'').length>=7&&v.replace(/\D/g,'').length<=15;
I130ABase.maps['beneficiary-info']=[
 f('statement_note','Read the Penalties section of the Form I-130 and Form I-130A Instructions before completing this part. Select Item 1.a or 1.b. If applicable, also select Item 2.',{type:'note'}),
 heading('statement_heading',"Spouse Beneficiary's Statement"),
 f('beneficiary_statement','1. Select your statement',{type:'radio',options:[['english','1.a. I can read and understand English, and I have read and understand every question and instruction on this form and my answer to every question.'],['interpreter','1.b. The interpreter named in Part 5 read to me every question and instruction on this form and my answer to every question in a language in which I am fluent, and I understood everything.']]}),
 f('beneficiary_interpreter_language','Language used by the interpreter',{condition:eq('beneficiary_statement','interpreter')}),
 f('beneficiary_preparer','2. Preparer assistance',{type:'checkboxes',required:false,options:[['yes','At my request, the preparer named in Part 6 prepared this form for me based only upon information I provided or authorized.']]}),
 f('beneficiary_preparer_name','Name of preparer',{condition:eq('beneficiary_preparer','yes')}),
 heading('contact_heading',"Spouse Beneficiary's Contact Information"),
 f('beneficiary_telephone','3. Daytime telephone number',{type:'tel',validate:phone,message:'Enter a telephone number containing 7–15 digits.'}),
 f('beneficiary_mobile','4. Mobile telephone number (if any)',{type:'tel',required:false,validate:phone,message:'Enter a telephone number containing 7–15 digits.'}),
 f('beneficiary_email','5. Email address (if any)',{type:'email',required:false}),
 heading('certification_heading',"Spouse Beneficiary's Certification"),
 f('beneficiary_certification',"Copies of any documents I have submitted are exact photocopies of unaltered, original documents, and I understand that USCIS may require that I submit original documents to USCIS at a later date. Furthermore, I authorize the release of any information from any and all of my records that USCIS may need to determine my eligibility for the immigration benefit that I seek.\n\nI further authorize release of information contained in this form, in supporting documents, and in my USCIS records to other entities and persons where necessary for the administration and enforcement of U.S. immigration laws.\n\nI certify, under penalty of perjury, that I provided or authorized all of the information in this form, I understand all of the information contained in, and submitted with, my form, and that all of this information is complete, true, and correct.",{type:'note'}),
 heading('signature_heading',"Spouse Beneficiary's Signature"),
 f('beneficiary_sign','6.a. Spouse beneficiary signature',{type:'signature',required:false}),
 date('beneficiary_sign_date','6.b. Date of signature',{required:false,requiredWhen:d=>!!d.beneficiary_sign}),
 f('completion_note','If you do not completely fill out this form or fail to submit required documents listed in the Instructions, USCIS may deny the Form I-130 filed on your behalf.',{type:'note'})
];
})();
