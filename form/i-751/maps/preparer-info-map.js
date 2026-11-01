/* I-751 Part 10: PDF pages 9–10. */
(function(root){
'use strict';
const {f,heading,date,states}=root.I751Base.helpers;
const us=d=>['us','usa','united states','united states of america','u.s.','u.s.a.'].includes(String(d.preparer_country||'').trim().toLowerCase());
root.I751Base.maps['preparer-info']=[
 f('preparer_note','Provide the following information about the person preparing this petition, if other than the petitioner.',{type:'note',pdf:null}),
 f('has_preparer','Did someone other than the petitioner prepare this petition?',{type:'radio',required:true,pdf:null,options:[['yes','Yes'],['no','No']],prefill:read=>{const p=read('i751-petitioner-info'),s=read('i751-spouse-info');return p.petitioner_used_preparer==='yes'||(s.complete_spouse_part==='yes'&&s.spouse_used_preparer==='yes')?'yes':'';}}),
 ...[
 heading('preparer_name_heading','Preparer’s Full Name'),
 f('preparer_lastname','1.a. Preparer’s Family Name (Last Name)',{required:true}),
 f('preparer_firstname','1.b. Preparer’s Given Name (First Name)',{required:true}),
 f('preparer_business','2. Preparer’s Business or Organization Name (if any)'),
 heading('preparer_address_heading','Preparer’s Mailing Address'),
 f('preparer_street','3.a. Street Number and Name',{required:true}),
 f('preparer_unit','3.b. Unit Type (if any)',{type:'radio',pdf:null,options:[['apt','Apt.'],['ste','Ste.'],['flr','Flr.'],['none','None']],pdfCheckboxes:{apt:'preparer_apt',ste:'preparer_ste',flr:'preparer_flr'}}),
 f('preparer_number','Unit Number',{required:true,condition:d=>['apt','ste','flr'].includes(d.preparer_unit)}),
 f('preparer_city','3.c. City or Town',{required:true}),
 f('preparer_state','3.d. State',{type:'select',placeholder:'Select',options:states,requiredWhen:us}),
 f('preparer_zip','3.e. ZIP Code',{requiredWhen:us,maxLength:10,validate:v=>/^\d{5}(-\d{4})?$/.test(v),message:'Enter a 5-digit ZIP code or ZIP+4.'}),
 f('preparer_province','3.f. Province (if applicable)'),
 f('preparer_postal','3.g. Postal Code (if applicable)'),
 f('preparer_country','3.h. Country',{required:true}),
 heading('preparer_contact_heading','Preparer’s Contact Information'),
 f('preparer_telephone','4. Preparer’s Daytime Telephone Number',{type:'tel',required:true,validate:v=>/^[+()\d\s.\-]+$/.test(v)&&v.replace(/\D/g,'').length>=7&&v.replace(/\D/g,'').length<=15,message:'Enter a telephone number with 7–15 digits.'}),
 f('preparer_fax','5. Preparer’s Fax Number (if any)',{type:'tel',validate:v=>/^[+()\d\s.\-]+$/.test(v)&&v.replace(/\D/g,'').length>=7&&v.replace(/\D/g,'').length<=15,message:'Enter a fax number with 7–15 digits.'}),
 f('preparer_email','6. Preparer’s Email Address (if any)',{type:'email',validate:v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),message:'Enter a valid email address.'}),
 heading('preparer_statement_heading','Preparer’s Statement'),
 f('preparer_statement','7. Select the applicable statement',{type:'radio',required:true,pdf:null,options:[['not_attorney','7.a. I am not an attorney or accredited representative but have prepared this petition on behalf of the petitioner and with the petitioner’s consent.'],['attorney','7.b. I am an attorney or accredited representative and my representation of the petitioner in this case extends or does not extend beyond preparation of this petition, as indicated below.']],pdfCheckboxes:{not_attorney:'preparer_statement_not_attorney',attorney:'preparer_statement_attorney'}}),
 f('preparer_representation','7.b. My representation of the petitioner in this case:',{type:'radio',required:true,pdf:null,condition:d=>d.preparer_statement==='attorney',options:[['extends','Extends beyond preparation of this petition.'],['not_extends','Does not extend beyond preparation of this petition.']],pdfCheckboxes:{extends:'preparer_representation_extends',not_extends:'preparer_representation_not_extends'}}),
 f('preparer_g28_note','If you are an attorney or accredited representative whose representation extends beyond preparation of this petition, you must submit a completed Form G-28, Notice of Entry of Appearance as Attorney or Accredited Representative, with this petition.',{type:'note',pdf:null,condition:d=>d.preparer_statement==='attorney'}),
 heading('preparer_certification_heading','Preparer’s Certification'),
 f('preparer_certification','By my signature, I certify, swear, or affirm, under penalty of perjury, that I prepared this petition on behalf of, at the request of, and with the express consent of the petitioner. I completed this petition based only on responses the petitioner provided to me. After completing the petition, I reviewed it and all of the petitioner’s responses with the petitioner, who agreed with every answer on the petition. If the petitioner supplied additional information concerning a question on the petition, I recorded it on the petition. I have also read the Acknowledgement of Appointment at USCIS Application Support Center to the petitioner and the petitioner has informed me that he or she understands the ASC Acknowledgement.',{type:'note',pdf:null}),
 heading('preparer_signature_heading','Preparer’s Signature'),
 f('preparer_sign','8.a. Preparer’s Signature',{type:'signature'}),
 date('preparer_sign_date','8.b. Date of Signature',{requiredWhen:d=>!!d.preparer_sign})
 ].map(field=>{const condition=field.condition;return {...field,condition:d=>d.has_preparer==='yes'&&(!condition||condition(d))};})
];
})(typeof window==='undefined'?globalThis:window);
