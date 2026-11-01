/* I-751 Part 4, PDF page 3. */
(function(root){
'use strict';
const {f,heading,date,states}=root.I751Base.helpers;
const us=d=>['us','usa','united states','united states of america','u.s.','u.s.a.'].includes(String(d.spouse_physical_country||'').trim().toLowerCase());
root.I751Base.maps['spouse-details']=[
 f('spouse_details_note','Provide information about your U.S. citizen or lawful permanent resident spouse. If filing as a child separately, provide information about the U.S. citizen or lawful permanent resident stepparent through whom you gained conditional residence.',{type:'note',pdf:null}),
 f('spouse_relationship','1. Relationship',{type:'radio',required:true,pdf:null,options:[['spouse','1.a. Spouse or Former Spouse'],['parent_spouse','1.b. Parent’s Spouse or Former Spouse']],pdfCheckboxes:{spouse:'spouse_relationship_spouse',parent_spouse:'spouse_relationship_parent_spouse'}}),
 heading('spouse_identity_heading','Other Information'),
 f('spouse_lastname','2.a. Family Name (Last Name)',{required:true}),
 f('spouse_firstname','2.b. Given Name (First Name)',{required:true}),
 f('spouse_middlename','2.c. Middle Name (if any)'),
 date('spouse_dob','3. Date of Birth',{required:true}),
 f('spouse_ssn','4. U.S. Social Security Number (if any)',{maxLength:9,validate:v=>/^\d{9}$/.test(v),message:'Enter 9 digits, without hyphens.'}),
 f('spouse_a_number','5. A-Number (if any)',{maxLength:9,validate:v=>/^\d{7,9}$/.test(v),message:'Enter 7–9 digits, without the A- prefix.'}),
 heading('spouse_address_heading','Physical Address'),
 f('spouse_physical_street','6.a. Street Number and Name',{required:true}),
 f('spouse_physical_unit','6.b. Unit Type (if any)',{type:'radio',pdf:null,options:[['apt','Apt.'],['ste','Ste.'],['flr','Flr.'],['none','None']],pdfCheckboxes:{apt:'spouse_physical_apt',ste:'spouse_physical_ste',flr:'spouse_physical_flr'}}),
 f('spouse_physical_number','Unit Number',{required:true,condition:d=>['apt','ste','flr'].includes(d.spouse_physical_unit)}),
 f('spouse_physical_city','6.c. City or Town',{required:true}),
 f('spouse_physical_state','6.d. State',{type:'select',placeholder:'Select',options:states,requiredWhen:us}),
 f('spouse_physical_zip','6.e. ZIP Code',{requiredWhen:us,maxLength:10,validate:v=>/^\d{5}(-\d{4})?$/.test(v),message:'Enter a 5-digit ZIP code or ZIP+4.'}),
 f('spouse_physical_province','6.f. Province (if applicable)'),
 f('spouse_physical_postal','6.g. Postal Code (if applicable)'),
 f('spouse_physical_country','6.h. Country',{required:true})
];
})(typeof window==='undefined'?globalThis:window);
