/* I-751 Part 9: PDF pages 8–9. */
(function(root){
'use strict';
const {f,heading,date,states}=root.I751Base.helpers;
const us=d=>['us','usa','united states','united states of america','u.s.','u.s.a.'].includes(String(d.interpreter_country||'').trim().toLowerCase());
root.I751Base.maps['interpreter-info']=[
 f('interpreter_note','Provide the following information about the interpreter.',{type:'note',pdf:null}),
 f('has_interpreter','Was an interpreter used to complete this petition?',{type:'radio',required:true,pdf:null,options:[['yes','Yes'],['no','No']],prefill:read=>{const p=read('i751-petitioner-info'),s=read('i751-spouse-info');return p.petitioner_statement==='interpreter'||(s.complete_spouse_part==='yes'&&s.spouse_statement==='interpreter')?'yes':'';}}),
 ...[
 heading('interpreter_name_heading','Interpreter’s Full Name'),
 f('interpreter_lastname','1.a. Interpreter’s Family Name (Last Name)',{required:true}),
 f('interpreter_firstname','1.b. Interpreter’s Given Name (First Name)',{required:true}),
 f('interpreter_business','2. Interpreter’s Business or Organization Name (if any)'),
 heading('interpreter_address_heading','Interpreter’s Mailing Address'),
 f('interpreter_street','3.a. Street Number and Name',{required:true}),
 f('interpreter_unit','3.b. Unit Type (if any)',{type:'radio',pdf:null,options:[['apt','Apt.'],['ste','Ste.'],['flr','Flr.'],['none','None']],pdfCheckboxes:{apt:'interpreter_apt',ste:'interpreter_ste',flr:'interpreter_flr'}}),
 f('interpreter_number','Unit Number',{required:true,condition:d=>['apt','ste','flr'].includes(d.interpreter_unit)}),
 f('interpreter_city','3.c. City or Town',{required:true}),
 f('interpreter_state','3.d. State',{type:'select',placeholder:'Select',options:states,requiredWhen:us}),
 f('interpreter_zip','3.e. ZIP Code',{requiredWhen:us,maxLength:10,validate:v=>/^\d{5}(-\d{4})?$/.test(v),message:'Enter a 5-digit ZIP code or ZIP+4.'}),
 f('interpreter_province','3.f. Province (if applicable)'),
 f('interpreter_postal','3.g. Postal Code (if applicable)'),
 f('interpreter_country','3.h. Country',{required:true}),
 heading('interpreter_contact_heading','Interpreter’s Contact Information'),
 f('interpreter_telephone','4. Interpreter’s Daytime Telephone Number',{type:'tel',required:true,validate:v=>/^[+()\d\s.\-]+$/.test(v)&&v.replace(/\D/g,'').length>=7&&v.replace(/\D/g,'').length<=15,message:'Enter a telephone number with 7–15 digits.'}),
 f('interpreter_email','5. Interpreter’s Email Address (if any)',{type:'email',validate:v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),message:'Enter a valid email address.'}),
 heading('interpreter_certification_heading','Interpreter’s Certification'),
 f('interpreter_language','I certify that I am fluent in English and the following language, which is the same language provided in Part 7, Item 1.b.',{required:true,prefill:read=>read('i751-petitioner-info').petitioner_interpreter_language||''}),
 f('interpreter_certification_read','I have read to this petitioner every question and instruction on this petition, as well as the answer to every question, in the language provided in Part 7, Item Number 1.b.; and\n\nI have read the Acknowledgement of Appointment at USCIS Application Support Center to the petitioner in the same language provided in Part 7, Item Number 1.b.',{type:'note',pdf:null}),
 f('interpreter_certification_understanding','The petitioner has informed me that he or she understands every instruction and question on the petition, as well as the answer to every question, and the petitioner verified the accuracy of every answer; and\n\nThe petitioner has also informed me that he or she understands the ASC Acknowledgement and that by appearing for a USCIS ASC biometrics services appointment and providing his or her fingerprints, photograph, and/or signature, he or she is re-affirming that the contents of this petition and all supporting documentation are complete, true, and correct.',{type:'note',pdf:null}),
 heading('interpreter_signature_heading','Interpreter’s Signature'),
 f('interpreter_sign','6.a. Interpreter’s Signature',{type:'signature'}),
 date('interpreter_sign_date','6.b. Date of Signature',{requiredWhen:d=>!!d.interpreter_sign})
 ].map(field=>{const condition=field.condition;return {...field,condition:d=>d.has_interpreter==='yes'&&(!condition||condition(d))};})
];
})(typeof window==='undefined'?globalThis:window);
