(function(){
'use strict';
const {f,eq,heading,yn,address,date}=I130ABase.helpers;
const used=eq('different_preparer','yes');
const attorney=d=>used(d)&&d.preparer_statement==='attorney';
const phone=v=>/^[+()\d .-]+$/.test(v)&&v.replace(/\D/g,'').length>=7&&v.replace(/\D/g,'').length<=15;
I130ABase.maps['preparer-info']=[
 f('preparer_note','Provide information about the preparer you used to complete Form I-130A if he or she is different from the preparer used to complete the Form I-130 filed on your behalf.',{type:'note'}),
 yn('different_preparer','Did someone other than you prepare Form I-130A who is different from the preparer for Form I-130?'),
 heading('preparer_name_heading',"Preparer's Full Name",used),
 f('preparer_lastname','1.a. Family name (last name)',{condition:used}),
 f('preparer_firstname','1.b. Given name (first name)',{condition:used}),
 f('preparer_business','2. Business or organization name (if any)',{required:false,condition:used}),
 ...address('preparer',"3. Preparer's Mailing Address",used),
 heading('preparer_contact_heading',"Preparer's Contact Information",used),
 f('preparer_telephone','4. Daytime telephone number',{type:'tel',condition:used,validate:phone,message:'Enter a telephone number containing 7–15 digits.'}),
 f('preparer_mobile','5. Mobile telephone number (if any)',{type:'tel',condition:used,required:false,validate:phone,message:'Enter a telephone number containing 7–15 digits.'}),
 f('preparer_email','6. Email address (if any)',{type:'email',condition:used,required:false}),
 heading('preparer_statement_heading',"Preparer's Statement",used),
 f('preparer_statement','7. Select your statement',{type:'radio',condition:used,options:[['not_attorney','7.a. I am not an attorney or accredited representative but have prepared this form on behalf of the spouse beneficiary and with the spouse beneficiary’s consent.'],['attorney','7.b. I am an attorney or accredited representative.']]}),
 f('preparer_representation','My representation of the spouse beneficiary in this case',{type:'radio',condition:attorney,options:[['extends','Extends beyond the preparation of this form'],['does_not_extend','Does not extend beyond the preparation of this form']]}),
 f('preparer_attorney_note','If you are an attorney or accredited representative whose representation extends beyond preparation of this form, you may be obliged to submit a completed Form G-28, Notice of Entry of Appearance as Attorney or Accredited Representative, with this form.',{type:'note',condition:attorney}),
 heading('preparer_certification_heading',"Preparer's Certification",used),
 f('preparer_certification','By my signature, I certify, under penalty of perjury, that I prepared this form at the request of the spouse beneficiary. The spouse beneficiary then reviewed this completed form and informed me that he or she understands all of the information contained in, and submitted with, his or her form, including the Spouse Beneficiary’s Certification, and that all of this information is complete, true, and correct. I completed this form based only on information that the spouse beneficiary provided to me or authorized me to obtain or use.',{type:'note',condition:used}),
 heading('preparer_signature_heading',"Preparer's Signature",used),
 f('preparer_sign','8.a. Preparer signature',{type:'signature',required:false,condition:used}),
 date('preparer_sign_date','8.b. Date of signature',{required:false,condition:used,requiredWhen:d=>!!d.preparer_sign})
];
})();
