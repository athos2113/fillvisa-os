(function(){
'use strict';
const {f,eq,heading,date,yn}=I129FBase.helpers;
const used=eq('has_preparer','yes');
const phone=v=>/^[+()\d .-]+$/.test(v)&&v.replace(/\D/g,'').length>=7&&v.replace(/\D/g,'').length<=15;
I129FBase.maps['preparer-info']=[
yn('has_preparer',"Did someone other than you prepare this petition?"),
heading('preparer_name_heading',"Preparer's Full Name",used),
f('preparer_lastname','1. Family name (last name)',{condition:used}),
f('preparer_firstname','1. Given name (first name)',{condition:used}),
f('preparer_business','2. Business or organization name (if any)',{required:false,condition:used}),
heading('preparer_contact_heading',"Preparer's Contact Information",used),
f('preparer_telephone','3. Daytime telephone number',{type:'tel',validate:phone,message:'Enter a telephone number containing 7–15 digits.',condition:used}),
f('preparer_mobile','4. Mobile telephone number (if any)',{type:'tel',required:false,validate:phone,message:'Enter a telephone number containing 7–15 digits.',condition:used}),
f('preparer_email','5. Email address (if any)',{type:'email',required:false,condition:used}),
heading('preparer_certification_heading',"Preparer's Certification and Signature",used),
f('preparer_certification',"By my signature, I certify, under penalty of perjury, that I prepared this petition at the request of the petitioner. The petitioner then reviewed this completed petition and informed me that he or she understands all of the information contained in, and submitted with, his or her petition, including the Petitioner’s Declaration and Certification, and that all of this information is complete, true, and correct. I completed this petition based only on information that the petitioner provided to me or authorized me to obtain or use.",{type:'note',condition:used}),
f('preparer_sign','6. Preparer signature',{type:'signature',required:false,condition:used}),
date('preparer_sign_date','Date of signature',{required:false,requiredWhen:d=>!!d.preparer_sign,condition:used})
];
})();
