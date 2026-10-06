/* Base petition field/validation map, transcribed from supplied Parts 1-8.
 * IDs follow the existing snake_case form convention. Conditions control display,
 * validation and serialization together; inactive answers never enter active data.
 */
(function(root){
'use strict';
const yesno=[['yes','Yes'],['no','No']];
const f=(id,label,extra={})=>({id,label,type:'text',required:true,...extra});
const yn=(id,label,extra={})=>f(id,label,{type:'radio',options:yesno,...extra});
const eq=(id,v)=>(d)=>d[id]===v;
const and=(a,b)=>(d,s)=>a(d,s)&&b(d,s);
const optional={required:false};
const digits=n=>v=>new RegExp('^\\d{'+n+'}$').test(v.replace(/[ -]/g,''));
const phone=v=>/^[+()\d .-]+$/.test(v)&&v.replace(/\D/g,'').length>=7&&v.replace(/\D/g,'').length<=15;
const states='AL:Alabama|AK:Alaska|AZ:Arizona|AR:Arkansas|CA:California|CO:Colorado|CT:Connecticut|DC:District of Columbia|DE:Delaware|FL:Florida|GA:Georgia|HI:Hawaii|ID:Idaho|IL:Illinois|IN:Indiana|IA:Iowa|KS:Kansas|KY:Kentucky|LA:Louisiana|ME:Maine|MD:Maryland|MA:Massachusetts|MI:Michigan|MN:Minnesota|MS:Mississippi|MO:Missouri|MT:Montana|NE:Nebraska|NV:Nevada|NH:New Hampshire|NJ:New Jersey|NM:New Mexico|NY:New York|NC:North Carolina|ND:North Dakota|OH:Ohio|OK:Oklahoma|OR:Oregon|PA:Pennsylvania|RI:Rhode Island|SC:South Carolina|SD:South Dakota|TN:Tennessee|TX:Texas|UT:Utah|VT:Vermont|VA:Virginia|WA:Washington|WV:West Virginia|WI:Wisconsin|WY:Wyoming'.split('|').map(x=>x.split(':'));
const us=v=>['united states','united states of america','us','usa','u.s.','u.s.a.'].includes(String(v||'').trim().toLowerCase());
function address(prefix,label,condition=()=>true,domestic=false){
 const isUS=domestic?()=>true:d=>us(d[prefix+'_country']);
 return [f(prefix+'_heading',label,{type:'heading',condition}),
 ...(!domestic?[f(prefix+'_country','Country',{condition})]:[]),
 f(prefix+'_street','Street number and name',{condition}),
 f(prefix+'_unit','Unit type',{type:'select',options:[['apt','Apt.'],['ste','Ste.'],['flr','Flr.']],required:false,condition}),
 f(prefix+'_number','Unit number',{condition:and(condition,d=>!!d[prefix+'_unit'])}),
 f(prefix+'_city','City or town',{condition}),
 f(prefix+'_state','State',{type:'select',options:states,placeholder:'Select',condition,required:false,requiredWhen:isUS}),
 f(prefix+'_zip','ZIP code',{condition,required:false,requiredWhen:isUS,validate:v=>/^\d{5}(-\d{4})?$/.test(v),message:'Enter a 5-digit ZIP or ZIP+4.'}),
 f(prefix+'_province','Province',{required:false,condition:and(condition,(d,s)=>!isUS(d,s))}),
 f(prefix+'_postal','Postal code',{required:false,condition:and(condition,(d,s)=>!isUS(d,s))})];
}
const name=(prefix,condition=()=>true)=>[f(prefix+'_lastname','Family name (last name)',{condition}),f(prefix+'_firstname','Given name (first name)',{condition}),f(prefix+'_middlename','Middle name (if any)',{required:false,condition})];
const explain=(id,label,condition,reference)=>f(id,label,{type:'textarea',condition,reference});
const tel=(id,label,required=true)=>f(id,label,{type:'tel',required,validate:phone,message:'Enter a telephone number containing 7-15 digits.'});
const email=(id)=>f(id,'Email address (if any)',{type:'email',required:false});
const count=(id,label,condition)=>f(id,label,{type:'number',min:1,step:1,condition});
const date=(id,label,extra={})=>f(id,label,{type:'date',...extra});
const individual=eq('petitioner_type','individual');
const organization=eq('petitioner_type','organization');
const named=(d,s)=>s.beneficiaryType!=='unnamed';
const inside=(d,s)=>named(d,s)&&s.location==='inside';
const newPetition=(d,s)=>s.basis==='new';
const maps={
 petitioner:[
 f('petitioner_type','Who is filing this petition?',{type:'radio',options:[['individual','Individual'],['organization','Company or organization']]}),
 ...name('petitioner',individual),f('petitioner_company','Company or organization name',{condition:organization}),
 f('mailing_in_care','In care of name (if any)',optional),...address('mailing','3. Mailing address'),
 f('contact_heading','4. Contact information',{type:'heading'}),tel('petitioner_telephone','Daytime telephone number'),tel('petitioner_mobile','Mobile telephone number (if any)',false),email('petitioner_email'),
 f('petitioner_fein','5. Federal Employer Identification Number (FEIN)',{required:false,validate:digits(9),message:'Enter 9 digits (hyphens are allowed).'}),
 yn('petitioner_nonprofit','6. Are you a nonprofit organized as tax exempt or a governmental research organization?'),
 f('petitioner_itin','7. Individual IRS Tax Number',{required:false,maxLength:9,validate:v=>/^\d{9}$/.test(v),message:'Enter exactly 9 digits without spaces or hyphens.'}),
 f('petitioner_ssn','8. U.S. Social Security Number (if any)',{required:false,maxLength:9,validate:v=>/^\d{9}$/.test(v),message:'Enter exactly 9 digits without spaces or hyphens.'})
 ],
 beneficiary:[
 f('beneficiary_mode','Beneficiary type is selected in Petition Setup.',{type:'note'}),
 yn('entertainment_group','Is this petition for an entertainment group?'),
 f('entertainment_group_name','2. Entertainment group name',{condition:eq('entertainment_group','yes')}),
 ...name('beneficiary',named),
 yn('beneficiary_other_names','Has the worker used any other names?',{condition:named}),
 ...[1,2,3].flatMap(n=>name('other_'+n,and(named,eq('beneficiary_other_names','yes'))).map(x=>({...x,label:'Other name '+n+': '+x.label,required:n===1&&x.required}))),
 f('beneficiary_other_names_extra','Additional names (if needed)',{type:'textarea',required:false,condition:and(named,eq('beneficiary_other_names','yes')),reference:'Part 3, Item 4'}),
 date('beneficiary_dob','5. Date of birth',{condition:named,past:true}),
 f('beneficiary_sex','Sex',{type:'radio',options:[['male','Male'],['female','Female']],condition:named}),
 f('beneficiary_ssn','U.S. Social Security Number (if any)',{required:false,condition:named,maxLength:9,validate:v=>/^\d{9}$/.test(v),message:'Enter exactly 9 digits without spaces or hyphens.'}),
 f('beneficiary_anumber','A-Number (if any; digits after A-)',{required:false,condition:named,maxLength:9,validate:v=>/^\d{7,9}$/.test(v),message:'Enter 7–9 digits after A-.'}),
 f('beneficiary_birth_country','Country of birth',{condition:named}),f('beneficiary_birth_province','Province of birth',{required:false,condition:named}),f('beneficiary_citizenship','Country of citizenship or nationality',{condition:named}),
 date('beneficiary_arrival','6. Date of last arrival',{condition:inside,past:true}),
 f('beneficiary_i94','I-94 arrival-departure record number',{condition:inside,required:false,maxLength:11,validate:v=>/^[A-Za-z0-9]{11}$/.test(v),message:'Enter the 11-character I-94 number.'}),
 f('beneficiary_passport','Passport or travel document number',{condition:inside,required:false}),
 date('beneficiary_passport_issued','Passport / travel document date issued',{condition:inside,required:false,past:true}),
 date('beneficiary_passport_expires','Passport / travel document expiration',{condition:inside,required:false,after:'beneficiary_passport_issued'}),
 f('beneficiary_passport_country','Passport / travel document country of issuance',{condition:inside,required:false}),
 f('beneficiary_status','Current nonimmigrant status',{condition:inside}),
 yn('beneficiary_ds','Is your admission for duration of status (D/S)?',{condition:inside}),
 date('beneficiary_status_expires','Date status expires',{condition:and(inside,eq('beneficiary_ds','no'))}),
 f('beneficiary_sevis','SEVIS number (if any)',{required:false,condition:inside}),f('beneficiary_ead','EAD number (if any)',{required:false,condition:inside}),
 yn('beneficiary_us_address','Do you have a current U.S. residential address?',{condition:named}),
 ...address('beneficiary_address','7. Current residential U.S. address - no P.O. box',and(named,eq('beneficiary_us_address','yes')),true)
 ],
 processing:[
 f('processing_note','Provide a notification office if a beneficiary is abroad or a requested extension / change of status cannot be granted.',{type:'note'}),
 yn('notification_needed','Do you need to designate an office, including for fallback visa / admission processing?',{validate:(v,d,s)=>!(s.location==='outside'||s.action==='notify')||v==='yes',message:'Designate a notification office for this visa / admission route.'}),
 f('notification_type','1.a. Type of office',{type:'radio',options:[['consulate','Consulate'],['preflight','Pre-flight inspection'],['port','Port of Entry']],condition:eq('notification_needed','yes')}),
 f('notification_city','1.b. Office city',{condition:eq('notification_needed','yes')}),f('notification_country','1.c. U.S. state or foreign country',{condition:eq('notification_needed','yes')}),
 ...address('beneficiary_foreign','1.d. Beneficiary foreign address',eq('notification_needed','yes')).filter(x=>x.id!=='beneficiary_foreign_zip'),
 yn('valid_passport','2. Does each person in this petition have a valid passport?'),explain('passport_explanation','Explain why a valid passport is not held',eq('valid_passport','no'),'Part 4, Item 2'),
 yn('other_petitions','3. Are you filing other petitions with this one?'),count('other_petitions_count','How many other petitions?',eq('other_petitions','yes')),
 yn('i94_applications','4. Are you filing replacement / initial I-94 applications with this petition?'),
 f('i94_application_note','If CBP issued an electronic I-94 on admission at an air or sea port, the beneficiary may be able to obtain it at cbp.gov/i94 instead of filing an application for a replacement or initial I-94.',{type:'note'}),count('i94_applications_count','How many I-94 applications?',eq('i94_applications','yes')),
 yn('dependent_applications','5. Are you filing applications for dependents?'),count('dependent_applications_count','How many dependent applications?',eq('dependent_applications','yes')),
 yn('removal_proceedings','6. Is any beneficiary in removal proceedings?'),explain('removal_names','List the beneficiaries in removal proceedings',eq('removal_proceedings','yes'),'Part 4, Item 6'),
 yn('immigrant_petitions','7. Have you ever filed an immigrant petition for any beneficiary in this petition?'),count('immigrant_petitions_count','How many immigrant petitions?',eq('immigrant_petitions','yes')),
 f('new_petition','8. Did you indicate a new petition in Part 2?',{readonly:true,derive:(d,s)=>s.basis==='new'?'yes':'no'}),
 f('new_petition_note','This answer follows the basis selected in Petition Setup. Change the basis there if needed.',{type:'note'}),
 yn('classification_granted','8.a. Has any beneficiary been given the requested classification within the last seven years?',{condition:newPetition}),explain('classification_granted_explanation','Explain the previous grant',and(newPetition,eq('classification_granted','yes')),'Part 4, Item 8.a'),
 yn('classification_denied','8.b. Has any beneficiary been denied the requested classification within the last seven years?',{condition:newPetition}),explain('classification_denied_explanation','Explain the previous denial',and(newPetition,eq('classification_denied','yes')),'Part 4, Item 8.b'),
 yn('previous_nonimmigrant_petition','9. Have you previously filed a nonimmigrant petition for this beneficiary?'),explain('previous_petition_explanation','Explain the previous nonimmigrant petition',eq('previous_nonimmigrant_petition','yes'),'Part 4, Item 9'),
 yn('group_under_year','10. Has any beneficiary been with the entertainment group for less than one year?',{condition:(d,s)=>s.entertainmentGroup==='yes'}),explain('group_explanation','Explain the group membership history',(d,s)=>s.entertainmentGroup==='yes'&&d.group_under_year==='yes','Part 4, Item 10'),
 yn('prior_j_status','11.a. Has any beneficiary ever been a J-1 exchange visitor or J-2 dependent?'),
 explain('prior_j_dates','11.b. Give the dates the beneficiary maintained J-1 / J-2 status',eq('prior_j_status','yes')),
 f('j_evidence','Provide evidence of J status, such as DS-2019, IAP-66, or the passport J visa stamp, with the petition.',{type:'note',condition:eq('prior_j_status','yes')})
 ],
 employment:[f('job_title','1. Job title'),f('lca_eta_number','2. LCA or ETA case number (if applicable)',optional),
 yn('different_work_address','Are any work addresses different from the petitioner mailing address?'),
 ...[1,2].flatMap(n=>[
 ...(n===2?[yn('second_work_address','Is there a second additional work address?',{condition:eq('different_work_address','yes')})]:[]),
 ...address('work_'+n,'3. Work address '+n,n===1?eq('different_work_address','yes'):and(eq('different_work_address','yes'),eq('second_work_address','yes')),true),
 yn('work_'+n+'_third_party','Is work address '+n+' a third-party location?',{condition:n===1?eq('different_work_address','yes'):and(eq('different_work_address','yes'),eq('second_work_address','yes'))}),
 f('work_'+n+'_organization','Third-party organization name',{condition:d=>d.different_work_address==='yes'&&(n===1||d.second_work_address==='yes')&&d['work_'+n+'_third_party']==='yes'})]),
 f('work_addresses_extra','Additional work addresses (if needed)',{type:'textarea',required:false,condition:and(eq('different_work_address','yes'),eq('second_work_address','yes')),reference:'Part 5, Item 3'}),
 yn('itinerary','4. Did you include an itinerary?'),yn('offsite','5. Will beneficiaries work off-site at another company or organization?'),yn('cnmi','6. Will beneficiaries work exclusively in the CNMI?'),yn('fulltime','7. Is this a full-time position?'),
 f('weekly_hours','8. Hours per week',{type:'number',min:0.01,max:168,step:'any',condition:eq('fulltime','no')}),
 f('wages','9. Wages ($)',{type:'number',min:0,step:'0.01'}),f('wage_period','Wage period',{type:'select',options:['hour','week','month','year'].map(x=>[x,x])}),
 f('other_compensation','10. Other compensation (explain)',{type:'textarea',required:false}),
 date('employment_from','11. Intended employment start'),date('employment_to','Intended employment end',{after:'employment_from'}),
 f('business_type','12. Type of business'),f('business_established','13. Year established',{maxLength:4,validate:v=>/^\d{4}$/.test(v)&&Number(v)>0&&Number(v)<=new Date().getFullYear(),message:'Enter a four-digit year no later than this year.'}),
 f('employee_count','14. Current employees in the U.S.',{type:'number',min:0,step:1}),yn('small_employer','15. Do you employ 25 or fewer full-time-equivalent employees in the U.S., including all affiliates and subsidiaries?'),
 f('gross_income','16. Gross annual income ($)',{type:'number',min:0,step:'0.01'}),f('net_income','17. Net annual income ($)',{type:'number',step:'0.01'})],
 export:[f('export_note','Select one certification only. With respect to the technology or technical data the petitioner will release or otherwise provide access to the beneficiary, the petitioner certifies that it has reviewed the Export Administration Regulations (EAR) and the International Traffic in Arms Regulations (ITAR) and has determined that:',{type:'note'}),
 f('export_certification','Certification regarding release of controlled technology or technical data',{type:'radio',options:[['not_required','A license is not required from either the U.S. Department of Commerce or the U.S. Department of State to release such technology or technical data to the foreign person.'],['required','A license is required from the U.S. Department of Commerce and/or the U.S. Department of State to release such technology or technical data to the beneficiary and the petitioner will prevent access to the controlled technology or technical data by the beneficiary until and unless the petitioner has received the required license or other authorization to release it to the beneficiary.']]})],
 declaration:[
 f('declaration_text',"Copies of any documents submitted are exact photocopies of unaltered, original documents, and I understand that, as the petitioner, I may be required to submit original documents to U.S. Citizenship and Immigration Services (USCIS) at a later date.\n\nI authorize the release of any information from my records, or from the petitioning organization's records that USCIS needs to determine eligibility for the immigration benefit sought. I recognize the authority of USCIS to conduct audits of this petition using publicly available open source information. I also recognize that any supporting evidence submitted in support of this petition may be verified by USCIS through any means determined appropriate by USCIS, including but not limited to, on-site compliance reviews.\n\nIf filing this petition on behalf of an organization, I certify that I am authorized to do so by the organization.\n\nI certify, under penalty of perjury, that I have reviewed this petition and that all of the information contained in the petition, including all responses to specific questions, and in the supporting documents, is complete, true, and correct.",{type:'note'}),
 ...name('signatory').filter(x=>!x.id.endsWith('middlename')),f('signatory_title','Title'),f('petitioner_sign','Signature of authorized signatory',{type:'signature',required:false}),date('petitioner_sign_date','Date of signature',{required:false,past:true,requiredWhen:d=>!!d.petitioner_sign}),tel('signatory_telephone','Daytime telephone number'),email('signatory_email'),f('declaration_completion_note','If you do not fully complete this form or fail to submit the required documents listed in the instructions, a final decision on your petition may be delayed or the petition may be denied.',{type:'note'})],
 preparer:[...name('preparer').filter(x=>!x.id.endsWith('middlename')),f('preparer_company','Business or organization name (if any)',optional),f('preparer_company_note','If applicable, provide the name of your accredited organization recognized by the Board of Immigration Appeals (BIA).',{type:'note'}),...address('preparer_mailing','3. Preparer mailing address'),tel('preparer_telephone','4. Daytime telephone number'),tel('preparer_fax','Fax number (if any)',false),email('preparer_email'),
 f('preparer_declaration','By my signature, I certify, swear, or affirm, under penalty of perjury, that I prepared this petition on behalf of, at the request of, and with the express consent of the petitioner or authorized signatory. The petitioner has reviewed this completed petition as prepared by me and informed me that all of the information in the form and in the supporting documents, is complete, true, and correct.',{type:'note'}),f('preparer_sign','Signature of preparer',{type:'signature',required:false}),date('preparer_sign_date','Date of signature',{required:false,past:true,requiredWhen:d=>!!d.preparer_sign})]
};
function active(field,data,setup){return !field.condition||field.condition(data,setup);}
function values(fields,data,setup){return Object.fromEntries(fields.filter(f=>!['heading','note'].includes(f.type)&&active(f,data,setup)).map(f=>[f.id,String(data[f.id]||'')]));}
function error(field,value,data,setup){
 if(!active(field,data,setup)||['heading','note'].includes(field.type))return '';
 if(!String(value||'').trim())return (field.required||(field.requiredWhen&&field.requiredWhen(data,setup)))?'This field is required.':'';
 if(field.maxLength&&String(value).length>field.maxLength)return 'Enter no more than '+field.maxLength+' characters.';
 if(field.options&&!(field.type==='checkboxes'?value.split(',').every(selected=>field.options.some(([v])=>v===selected)):field.options.some(([v])=>v===value)))return 'Select a valid option.';
 if(field.validate&&!field.validate(value,data,setup))return field.message||'Enter a valid value.';
 if(field.type==='number'){
  const n=Number(value);
  if(!Number.isFinite(n)||(field.min!==undefined&&n<field.min)||(field.max!==undefined&&n>field.max)||(field.step===1&&!Number.isInteger(n)))return 'Enter a valid number within the allowed range.';
 }
 if(field.type==='date'){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(value)||!Number.isFinite(Date.parse(value)))return 'Enter a valid date.';
  const today=new Date();const local=[today.getFullYear(),String(today.getMonth()+1).padStart(2,'0'),String(today.getDate()).padStart(2,'0')].join('-');
  if(field.past&&value>local)return 'This date cannot be in the future.';
  if(field.after&&data[field.after]&&value<data[field.after])return 'The end / expiration date must not precede the start / issue date.';
 }
 return '';
}
root.I129Base={maps,active,values,error,helpers:{f,yn,eq,and,address,name,date}};
if(typeof module!=='undefined'&&module.exports)module.exports=root.I129Base;
})(typeof window==='undefined'?globalThis:window);
