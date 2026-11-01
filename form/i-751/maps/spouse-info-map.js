/* I-751 Part 8: PDF pages 7–8. */
(function(root){
'use strict';
const {f,heading,date}=root.I751Base.helpers;
const interpreter=d=>d.spouse_statement==='interpreter';
const preparer=d=>d.spouse_used_preparer==='yes';
const phone=(id,label,required=false)=>f(id,label,{type:'tel',required,validate:v=>/^[+()\d\s.\-]+$/.test(v)&&v.replace(/\D/g,'').length>=7&&v.replace(/\D/g,'').length<=15,message:'Enter a telephone number with 7–15 digits; spaces, parentheses, +, hyphens and periods are allowed.'});
root.I751Base.maps['spouse-info']=[
 f('spouse_intro_note','Provide the following information about the spouse or individual listed in Part 4. Read the information on penalties in the Penalties section of the Form I-751 Instructions before completing this part.',{type:'note',pdf:null}),
 f('complete_spouse_part','Are you completing Part 8 for the spouse or individual listed in Part 4?',{type:'radio',required:true,pdf:null,options:[['yes','Yes'],['no','No']]}),
 f('spouse_applicability_note','Part 8 applies if applicable. If you selected Part 3, Box 1.a., your spouse must also read and sign the petition in Part 8. If filing based on being battered or subjected to extreme cruelty, the spouse’s or Part 4 individual’s signature is not required.',{type:'note',pdf:null}),
 ...[
 heading('spouse_statement_heading','Spouse’s or Individual’s Statement'),
 f('spouse_statement','1. Select either Item 1.a. or Item 1.b.',{type:'radio',required:true,pdf:null,options:[
 ['english','1.a. I can read and understand English, and have read and understand every question and instruction on this petition, as well as the petitioner’s answer to every question. I have read and understand the Acknowledgement of Appointment at USCIS Application Support Center.'],
 ['interpreter','1.b. The interpreter named in Part 9 has read to me every question and instruction on this petition, as well as the petitioner’s answer to every question, in a language in which I am fluent. I understand every question and instruction on this petition as translated to me by my interpreter, and have provided complete, true, and correct responses in the language indicated above. The interpreter named in Part 9 has also read the Acknowledgement of Appointment at USCIS Application Support Center to me, in the language in which I am fluent, and I understand this ASC Acknowledgement as read to me by my interpreter.']
 ],pdfCheckboxes:{english:'spouse_statement_english',interpreter:'spouse_statement_interpreter'}}),
 f('spouse_interpreter_language','1.b. Language in which the interpreter read the petition to you',{required:true,condition:interpreter}),
 f('spouse_used_preparer','2. Preparer assistance (if applicable)',{type:'checkboxes',options:[['yes','I have requested the services of and consented to a preparer preparing this petition for me.']],pdf:null,pdfCheckboxes:{yes:'spouse_used_preparer'}}),
 f('spouse_preparer_name','2. Name of the preparer',{required:true,condition:preparer}),
 f('spouse_preparer_attorney','2. Is this preparer an attorney or accredited representative?',{type:'radio',required:true,condition:preparer,pdf:null,options:[['yes','Yes'],['no','No']],pdfCheckboxes:{yes:'spouse_preparer_is_attorney',no:'spouse_preparer_not_attorney'}}),
 f('spouse_preparer_note','This person who assisted me in preparing my petition has reviewed the Acknowledgement of Appointment at USCIS Application Support Center with me, and I understand the ASC Acknowledgement.',{type:'note',pdf:null,condition:preparer}),
 heading('spouse_contact_heading','Spouse’s or Individual’s Contact Information'),
 phone('spouse_telephone','3. Spouse’s or Individual’s Daytime Telephone Number',true),
 phone('spouse_mobile','4. Spouse’s or Individual’s Mobile Telephone Number (if any)'),
 f('spouse_email','5. Spouse’s or Individual’s Email Address (if any)',{type:'email',validate:v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),message:'Enter a valid email address.'}),
 heading('spouse_asc_heading','Acknowledgement of Appointment at USCIS Application Support Center'),
 f('spouse_asc_name','Your full name for the acknowledgment',{required:true,prefill:read=>{const d=read('i751-spouse-details');return [d.spouse_firstname,d.spouse_middlename,d.spouse_lastname].filter(Boolean).join(' ');}}),
 f('spouse_asc_intro','I understand that the purpose of a USCIS ASC appointment is for me to provide fingerprints, photograph, and/or signature and to re-affirm that all of the information in my petition is complete, true, and correct and was provided by me. I understand that I will sign my name to the following declaration which USCIS will display to me at the time I provide my fingerprints, photograph, and/or signature during my ASC appointment.',{type:'note',pdf:null}),
 f('spouse_asc_declaration','By signing here, I declare under penalty of perjury that I have reviewed and understand my application, petition, or request as identified by the receipt number displayed on the screen above, and all supporting documents, applications, petitions, or requests filed with my application, petition, or request that I (or my attorney or accredited representative) filed with USCIS, and that all of the information in these materials is complete, true, and correct.',{type:'note',pdf:null}),
 f('spouse_asc_confirmation','I also understand that when I sign my name, provide my fingerprints, and am photographed at the USCIS ASC, I will be re-affirming that I willingly submit this petition; I have reviewed the contents of this petition; all of the information in my petition and all supporting documents submitted with my petition were provided by me and are complete, true, and correct; and if I was assisted in completing this petition, the person assisting me also reviewed this Acknowledgement of Appointment at USCIS Application Support Center with me.',{type:'note',pdf:null}),
 heading('spouse_certification_heading','Spouse’s or Individual’s Certification'),
 f('spouse_certification_documents','Copies of any documents I have submitted are exact photocopies of unaltered, original documents, and I understand that USCIS may require that I submit original documents to USCIS at a later date. Furthermore, I authorize the release of any information from any and all of my records that USCIS may need to determine my eligibility for the immigration benefit that I seek.',{type:'note',pdf:null}),
 f('spouse_certification_release','I furthermore authorize release of information contained in this petition, in supporting documents, and in my USCIS records to other entities and persons where necessary for the administration and enforcement of U.S. immigration laws.',{type:'note',pdf:null}),
 f('spouse_certification_truth','I certify under penalty of perjury, that the information in my petition, my responses to each question, and any document submitted with my petition were provided by me and are complete, true, and correct.',{type:'note',pdf:null}),
 heading('spouse_signature_heading','Spouse’s or Individual’s Signature'),
 f('spouse_sign','6.a. Spouse’s or Individual’s Signature',{type:'signature'}),
 date('spouse_sign_date','6.b. Date of Signature',{requiredWhen:d=>!!d.spouse_sign}),
 f('spouse_completion_note','NOTE TO ALL SPOUSES OR INDIVIDUALS: If you do not completely fill out this petition or fail to submit required documents listed in the Instructions, USCIS may deny your petition.',{type:'note',pdf:null})
 ].map(field=>{const condition=field.condition;return {...field,condition:d=>d.complete_spouse_part==='yes'&&(!condition||condition(d))};})
];
})(typeof window==='undefined'?globalThis:window);
