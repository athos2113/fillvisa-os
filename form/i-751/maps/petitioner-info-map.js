/* I-751 Part 7: PDF pages 6–7. */
(function(root){
'use strict';
const {f,heading,date}=root.I751Base.helpers;
const interpreter=d=>d.petitioner_statement==='interpreter';
const preparer=d=>d.petitioner_used_preparer==='yes';
const phone=(id,label,required=false)=>f(id,label,{type:'tel',required,validate:v=>/^[+()\d\s.\-]+$/.test(v)&&v.replace(/\D/g,'').length>=7&&v.replace(/\D/g,'').length<=15,message:'Enter a telephone number with 7–15 digits; spaces, parentheses, +, hyphens and periods are allowed.'});
root.I751Base.maps['petitioner-info']=[
 f('petitioner_penalties_note','Read the information on penalties in the Penalties section of the Form I-751 Instructions before completing this part.',{type:'note',pdf:null}),
 f('petitioner_spouse_note','If you selected Box 1.a. in Part 3, your spouse must also read and sign the petition in Part 8. Signature of a conditional resident child under 14 years of age is not required; a parent may sign for a child.',{type:'note',pdf:null}),
 heading('petitioner_statement_heading','Petitioner’s Statement'),
 f('petitioner_statement','1. Select either Item 1.a. or Item 1.b.',{type:'radio',required:true,pdf:null,options:[
 ['english','1.a. I can read and understand English, and have read and understand every question and instruction on this petition, as well as my answer to every question. I have read and understand the Acknowledgement of Appointment at USCIS Application Support Center.'],
 ['interpreter','1.b. The interpreter named in Part 9 has also read to me every question and instruction on this petition, as well as my answer to every question, in a language in which I am fluent. I understand every question and instruction on this petition as translated to me by my interpreter, and have provided complete, true, and correct responses in the language indicated below. The interpreter named in Part 9 has also read the Acknowledgement of Appointment at USCIS Application Support Center to me, in the language in which I am fluent, and I understand this ASC Acknowledgement as read to me by my interpreter.']
 ],pdfCheckboxes:{english:'petitioner_statement_english',interpreter:'petitioner_statement_interpreter'}}),
 f('petitioner_interpreter_language','1.b. Language in which the interpreter read the petition to you',{required:true,condition:interpreter}),
 f('petitioner_used_preparer','2. Preparer assistance (if applicable)',{type:'checkboxes',options:[['yes','I have requested the services of and consented to a preparer preparing this petition for me.']],pdf:null,pdfCheckboxes:{yes:'petitioner_used_preparer'}}),
 f('petitioner_preparer_name','2. Name of the preparer',{required:true,condition:preparer}),
 f('petitioner_preparer_attorney','2. Is this preparer an attorney or accredited representative?',{type:'radio',required:true,condition:preparer,pdf:null,options:[['yes','Yes'],['no','No']],pdfCheckboxes:{yes:'petitioner_preparer_is_attorney',no:'petitioner_preparer_not_attorney'}}),
 f('petitioner_preparer_note','This person who assisted me in preparing my petition has reviewed the Acknowledgement of Appointment at USCIS Application Support Center with me, and I understand the ASC Acknowledgement.',{type:'note',pdf:null,condition:preparer}),
 heading('petitioner_contact_heading','Petitioner’s Contact Information'),
 phone('petitioner_telephone','3. Petitioner’s Daytime Telephone Number',true),
 phone('petitioner_mobile','4. Petitioner’s Mobile Telephone Number (if any)'),
 f('petitioner_email','5. Petitioner’s Email Address (if any)',{type:'email',validate:v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),message:'Enter a valid email address.'}),
 heading('petitioner_asc_heading','Acknowledgement of Appointment at USCIS Application Support Center'),
 f('petitioner_asc_name','Your full name for the acknowledgment',{required:true,prefill:read=>{const d=read('i751-info-about-you');return [d.firstname,d.middlename,d.lastname].filter(Boolean).join(' ');}}),
 f('petitioner_asc_intro','I understand that the purpose of a USCIS ASC appointment is for me to provide fingerprints, photograph, and/or signature and to re-affirm that all of the information in my petition is complete, true, and correct and was provided by me. I understand that I will sign my name to the following declaration which USCIS will display to me at the time I provide my fingerprints, photograph, and/or signature during my ASC appointment.',{type:'note',pdf:null}),
 f('petitioner_asc_declaration','By signing here, I declare under penalty of perjury that I have reviewed and understand my application, petition, or request as identified by the receipt number displayed on the screen above, and all supporting documents, applications, petitions, or requests filed with my application, petition, or request that I (or my attorney or accredited representative) filed with USCIS, and that all of the information in these materials is complete, true, and correct.',{type:'note',pdf:null}),
 f('petitioner_asc_marriage','If conditional residence was based on a marriage, I further certify that the marriage was entered into in accordance with the laws of the place where the marriage took place and was not for the purpose of procuring an immigration benefit.',{type:'note',pdf:null}),
 f('petitioner_asc_confirmation','I also understand that when I sign my name, provide my fingerprints, and am photographed at the USCIS ASC, I will be re-affirming that I willingly submit this petition; I have reviewed the contents of this petition; all of the information in my petition and all supporting documents submitted with my petition were provided by me and are complete, true, and correct; and if I was assisted in completing this petition, the person assisting me also reviewed this Acknowledgement of Appointment at USCIS Application Support Center with me.',{type:'note',pdf:null}),
 heading('petitioner_certification_heading','Petitioner’s Certification'),
 f('petitioner_certification_documents','Copies of any documents I have submitted are exact photocopies of unaltered, original documents, and I understand that USCIS may require that I submit original documents to USCIS at a later date. Furthermore, I authorize the release of any information from any and all of my records that USCIS may need to determine my eligibility for the immigration benefit that I seek.',{type:'note',pdf:null}),
 f('petitioner_certification_release','I furthermore authorize release of information contained in this petition, in supporting documents, and in my USCIS records to other entities and persons where necessary for the administration and enforcement of U.S. immigration laws.',{type:'note',pdf:null}),
 f('petitioner_certification_truth','I certify under penalty of perjury, that the information in my petition, my responses to each question, and any document submitted with my petition were provided by me and are complete, true, and correct.',{type:'note',pdf:null}),
 heading('petitioner_signature_heading','Petitioner’s Signature'),
 f('petitioner_sign','6.a. Petitioner’s Signature',{type:'signature'}),
 date('petitioner_sign_date','6.b. Date of Signature',{requiredWhen:d=>!!d.petitioner_sign}),
 f('petitioner_completion_note','NOTE TO ALL PETITIONERS: If you do not completely fill out this petition or fail to submit required documents listed in the Instructions, USCIS may deny your petition.',{type:'note',pdf:null}),
 f('petitioner_waiver_note','If you are filing based on claims of having been battered or subjected to extreme cruelty waiver or individual filing, you are not required to have the spouse’s or individual listed in Part 4’s signature.',{type:'note',pdf:null})
];
})(typeof window==='undefined'?globalThis:window);
