(function(){
'use strict';
const {f,eq,heading,date,yn}=I129FBase.helpers;
const used=eq('has_petitioner','yes');
const phone=v=>/^[+()\d .-]+$/.test(v)&&v.replace(/\D/g,'').length>=7&&v.replace(/\D/g,'').length<=15;
I129FBase.maps['petitioner-info']=[
heading('petitioner_contact_heading',"Petitioner's Contact Information"),
f('petitioner_telephone','1. Daytime telephone number',{type:'tel',validate:phone,message:'Enter a telephone number containing 7–15 digits.'}),
f('petitioner_mobile','2. Mobile telephone number (if any)',{type:'tel',required:false,validate:phone,message:'Enter a telephone number containing 7–15 digits.'}),
f('petitioner_email','3. Email address (if any)',{type:'email',required:false}),
heading('petitioner_certification_heading',"Petitioner's Certification and Signature"),
f('petitioner_certification',"I certify, under penalty of perjury, that I provided or authorized all of the responses and information contained in and submitted with my petition, I read and understand or, if interpreted to me in a language in which I am fluent by the interpreter listed in Part 6, understood, all of the responses and information contained in, and submitted with, my petition, and that all of the responses and the information are complete, true, and correct. Furthermore, I authorize the release of any information from any and all of my records that USCIS may need to determine my eligibility for an immigration request and to other entities and persons where necessary for the administration and enforcement of U.S. immigration law.",{type:'note'}),
f('petitioner_sign','4. Petitioner signature',{type:'signature',required:false}),
date('petitioner_sign_date','Date of signature',{required:false,requiredWhen:d=>!!d.petitioner_sign})
];
})();
