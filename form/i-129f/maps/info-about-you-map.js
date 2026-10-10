/* Part 1, supplied PDF pages 1–4. */
(function(root){
'use strict';
const f=(id,label,extra={})=>({id,label,type:'text',required:true,...extra});
const yesno=[['yes','Yes'],['no','No']];
const eq=(id,value)=>d=>d[id]===value;
const us=v=>['us','usa','united states','united states of america','u.s.','u.s.a.'].includes(String(v||'').trim().toLowerCase());
const states='AL:Alabama|AK:Alaska|AZ:Arizona|AR:Arkansas|CA:California|CO:Colorado|CT:Connecticut|DE:Delaware|DC:District of Columbia|FL:Florida|GA:Georgia|HI:Hawaii|ID:Idaho|IL:Illinois|IN:Indiana|IA:Iowa|KS:Kansas|KY:Kentucky|LA:Louisiana|ME:Maine|MD:Maryland|MA:Massachusetts|MI:Michigan|MN:Minnesota|MS:Mississippi|MO:Missouri|MT:Montana|NE:Nebraska|NV:Nevada|NH:New Hampshire|NJ:New Jersey|NM:New Mexico|NY:New York|NC:North Carolina|ND:North Dakota|OH:Ohio|OK:Oklahoma|OR:Oregon|PA:Pennsylvania|RI:Rhode Island|SC:South Carolina|SD:South Dakota|TN:Tennessee|TX:Texas|UT:Utah|VT:Vermont|VA:Virginia|WA:Washington|WV:West Virginia|WI:Wisconsin|WY:Wyoming'.split('|').map(x=>x.split(':'));
const heading=(id,label,condition)=>f(id,label,{type:'heading',condition});
const date=(id,label,extra={})=>f(id,label,{type:'date',past:true,...extra});
const yn=(id,label)=>f(id,label,{type:'radio',options:yesno});
function address(p,label,c=()=>true,foreign=false){
 return [heading(p+'_heading',label,c),f(p+'_street','Street number and name',{condition:c}),
 f(p+'_unit','Unit type (if any)',{type:'select',options:[['apt','Apt.'],['ste','Ste.'],['flr','Flr.']],required:false,condition:c}),
 f(p+'_number','Unit number',{condition:d=>c(d)&&!!d[p+'_unit']}),
 f(p+'_city','City or town',{condition:c}),
 ...(!foreign?[f(p+'_state','State',{type:'select',options:states,placeholder:'Select',condition:c,required:false,requiredWhen:d=>us(d[p+'_country'])}),
 f(p+'_zip','ZIP code',{condition:c,required:false,requiredWhen:d=>us(d[p+'_country']),validate:v=>/^\d{5}(-\d{4})?$/.test(v),message:'Enter a 5-digit ZIP or ZIP+4.'})]:[]),
 f(p+'_province','Province (if any)',{condition:c,required:false}),
 f(p+'_postal','Postal code (if any)',{condition:c,required:false}),
 f(p+'_country','Country',{condition:c,...(foreign?{validate:v=>!us(v),message:'Enter a country outside the United States.'}:{})})];
}
const other=eq('has_other_names','yes');
const physicalDifferent=eq('mailing_same_physical','no'),secondAddress=eq('has_physical_2','yes'),secondEmployer=eq('has_employer_2','yes');
function numberedAddress(prefix,label,item,condition){
 const letters={street:'a',unit:'b',number:'b',city:'c',state:'d',zip:'e',province:'f',postal:'g',country:'h'};
 return address(prefix,label,condition).map(field=>field.type==='heading'?field:{...field,label:item+'.'+letters[field.id.slice(prefix.length+1)]+'. '+field.label});
}
const maps={'info-about-you':[
 heading('identity_heading','Part 1. Information About You'),
 f('a_number','1. Alien Registration Number (A-Number, if any)',{required:false,maxLength:9,validate:v=>/^\d{7,9}$/.test(v),message:'Enter 7–9 digits without the A- prefix.'}),
 f('uscis_number','2. USCIS Online Account Number (if any)',{required:false,maxLength:12,validate:v=>/^\d{12}$/.test(v),message:'Enter 12 digits.'}),
 f('ssn','3. U.S. Social Security Number (if any)',{required:false,maxLength:9,validate:v=>/^\d{9}$/.test(v),message:'Enter 9 digits without hyphens.'}),
 f('classification','4. Classification requested for your beneficiary',{type:'radio',options:[['k1','4.a. Fiancé(e) (K-1 visa)'],['k3','4.b. Spouse (K-3 visa)']]}),
 f('filed_i130','5. If you are filing to classify your spouse as a K-3, have you filed Form I-130?',{type:'radio',options:yesno,condition:eq('classification','k3')}),
 heading('name_heading','Your Full Name'),
 f('lastname','6.a. Family name (last name)'),
 f('firstname','6.b. Given name (first name)'),
 f('middlename','6.c. Middle name (if any)',{required:false}),
 heading('other_heading','Other Names Used'),
 f('other_note','Provide all other names you have ever used, including aliases, maiden names, and nicknames. Additional names will be included in Part 8 of the PDF.',{type:'note'}),
 yn('has_other_names','Have you ever used any other names?'),
 f('other_lastname','7.a. Family name (last name)',{condition:other,required:false}),
 f('other_firstname','7.b. Given name (first name)',{condition:other,required:false}),
 f('other_middlename','7.c. Middle name (if any)',{condition:other,required:false}),
 f('other_names_extra','Additional other names (if needed)',{type:'textarea',condition:other,required:false,reference:'Part 1, Items 7.a–7.c'}),
 heading('mailing_heading','Your Mailing Address'),
 f('mailing_care_of','8.a. In care of name (if any)',{required:false}),
 ...address('mailing','Mailing address').filter(f=>f.type!=='heading').map(f=>({...f,label:({street:'8.b. ',unit:'8.c. ',number:'8.c. ',city:'8.d. ',state:'8.e. ',zip:'8.f. ',province:'8.g. ',postal:'8.h. ',country:'8.i. '}[f.id.slice(8)]||'')+f.label})),
 yn('mailing_same_physical','8.j. Is your current mailing address the same as your physical address?'),
 heading('address_history_heading','Your Address History'),
 f('address_history_note','Provide your physical addresses for the last five years, whether inside or outside the United States. Provide your current address first if it is different from your mailing address. Use the additional-history box for any further addresses and dates; these will be included in Part 8.',{type:'note'}),
 ...numberedAddress('physical_1','Physical Address 1 (current address)',9,physicalDifferent),
 date('physical_1_from','10.a. Date from (when you began living at your current physical address)'),
 f('physical_1_to','10.b. Date to',{readonly:true,derive:()=>'PRESENT'}),
 yn('has_physical_2','Did you live at another physical address during the last five years?'),
 ...numberedAddress('physical_2','Physical Address 2',11,secondAddress),
 date('physical_2_from','12.a. Date from',{condition:secondAddress}),
 date('physical_2_to','12.b. Date to',{condition:secondAddress,after:'physical_2_from'}),
 f('address_history_extra','Additional physical addresses and dates for the last five years (if needed)',{type:'textarea',required:false,reference:'Part 1, Items 9–12'}),
 heading('employment_history_heading','Your Employment History'),
 f('employment_history_note','Provide your employment history for the last five years, whether inside or outside the United States. Provide your current employment first. Use the additional-history box for further employers and dates; these will be included in Part 8.',{type:'note'}),
 yn('has_employer_1','Have you had any employment during the last five years?'),
 f('employer_1_name','13. Full name of employer',{condition:eq('has_employer_1','yes')}),
 ...numberedAddress('employer_1','Employer 1 address',14,eq('has_employer_1','yes')),
 f('employer_1_occupation','15. Your occupation (specify)',{condition:eq('has_employer_1','yes')}),
 date('employer_1_from','16.a. Employment start date',{condition:eq('has_employer_1','yes')}),
 f('employer_1_current','Do you currently work for this employer?',{type:'radio',options:yesno,condition:eq('has_employer_1','yes')}),
 date('employer_1_to','16.b. Employment end date',{condition:d=>d.has_employer_1==='yes'&&d.employer_1_current==='no',after:'employer_1_from'}),
 f('employer_1_present_note','Employment end date: PRESENT.',{type:'note',condition:d=>d.has_employer_1==='yes'&&d.employer_1_current==='yes'}),
 f('has_employer_2','Do you have another employer to report for the last five years?',{type:'radio',options:yesno,condition:eq('has_employer_1','yes')}),
 ...[f('employer_2_name','17. Full name of employer',{condition:secondEmployer}),
 ...numberedAddress('employer_2','Employer 2 address',18,secondEmployer),
 f('employer_2_occupation','19. Your occupation (specify)',{condition:secondEmployer})].map(field=>({...field,condition:d=>d.has_employer_1==='yes'&&(!field.condition||field.condition(d))})),
 date('employer_2_from','20.a. Employment start date',{condition:d=>d.has_employer_1==='yes'&&secondEmployer(d)}),
 date('employer_2_to','20.b. Employment end date',{condition:d=>d.has_employer_1==='yes'&&secondEmployer(d),after:'employer_2_from'}),
 f('employment_history_extra','Additional employment history or explanation of no employment during the last five years',{type:'textarea',required:false,requiredWhen:d=>d.has_employer_1==='no',reference:'Part 1, Items 13–20'}),
 heading('personal_heading','Other Information'),
 f('sex','21. Sex',{type:'radio',options:[['male','Male'],['female','Female']]}),
 date('dob','22. Date of birth'),
 f('marital_status','23. Marital status',{type:'radio',options:[['single','Single'],['married','Married'],['divorced','Divorced'],['widowed','Widowed']]}),
 f('birth_city','24. City/town/village of birth'),
 f('birth_province','25. Province or state of birth'),
 f('birth_country','26. Country of birth'),
 heading('parents_heading','Information About Your Parents'),
 ...[1,2].flatMap(n=>{
  const prefix='parent_'+n,start=n===1?27:32;
  return [heading(prefix+'_heading',"Parent "+n+"'s Information"),
   f(prefix+'_lastname',start+'.a. Family name (last name)'),
   f(prefix+'_firstname',start+'.b. Given name (first name)'),
   f(prefix+'_middlename',start+'.c. Middle name (if any)',{required:false}),
   date(prefix+'_dob',(start+1)+'. Date of birth'),
   f(prefix+'_sex',(start+2)+'. Sex',{type:'radio',options:[['male','Male'],['female','Female']]}),
   f(prefix+'_birth_country',(start+3)+'. Country of birth'),
   f(prefix+'_residence_city',(start+4)+'.a. City/town/village of residence'),
   f(prefix+'_residence_country',(start+4)+'.b. Country of residence')];
 }),
 yn('previously_married','37. Have you ever been previously married?'),
 f('previous_marriage_note','Provide the names of each prior spouse and the date each marriage ended. Use the additional-history box for further prior marriages; these will be included in Part 8.',{type:'note',condition:eq('previously_married','yes')}),
 heading('previous_spouse_heading','Name of Previous Spouse',eq('previously_married','yes')),
 f('previous_spouse_lastname','38.a. Family name (last name)',{condition:eq('previously_married','yes')}),
 f('previous_spouse_firstname','38.b. Given name (first name)',{condition:eq('previously_married','yes')}),
 f('previous_spouse_middlename','38.c. Middle name (if any)',{required:false,condition:eq('previously_married','yes')}),
 date('previous_marriage_ended','39. Date marriage ended',{condition:eq('previously_married','yes')}),
 f('previous_marriages_extra','Additional previous spouses and dates each marriage ended (if needed)',{type:'textarea',required:false,condition:eq('previously_married','yes'),reference:'Part 1, Items 38–39'}),
 heading('citizenship_heading','Your Citizenship Information'),
 f('citizenship_through','40. You are a U.S. citizen through (select one)',{type:'radio',options:[['birth','40.a. Birth in the United States'],['naturalization','40.b. Naturalization'],['parents','40.c. U.S. citizen parents']]}),
 yn('has_citizenship_certificate','41. Have you obtained a Certificate of Naturalization or a Certificate of Citizenship in your own name?'),
 f('citizenship_certificate_number','42.a. Certificate number',{condition:eq('has_citizenship_certificate','yes')}),
 f('citizenship_certificate_place','42.b. Place of issuance',{condition:eq('has_citizenship_certificate','yes')}),
 date('citizenship_certificate_date','42.c. Date of issuance',{condition:eq('has_citizenship_certificate','yes')}),
 heading('additional_heading','Additional Information'),
 yn('filed_previous_i129f','43. Have you ever filed Form I-129F for any other beneficiary?'),
 f('previous_beneficiary_anumber','44. Previous beneficiary A-Number (if any)',{condition:eq('filed_previous_i129f','yes'),required:false,maxLength:9,validate:v=>/^\d{7,9}$/.test(v),message:'Enter 7–9 digits without the A- prefix.'}),
 f('previous_beneficiary_lastname','45.a. Family name (last name)',{condition:eq('filed_previous_i129f','yes')}),
 f('previous_beneficiary_firstname','45.b. Given name (first name)',{condition:eq('filed_previous_i129f','yes')}),
 f('previous_beneficiary_middlename','45.c. Middle name (if any)',{condition:eq('filed_previous_i129f','yes'),required:false}),
 date('previous_i129f_filed','46. Date of filing',{condition:eq('filed_previous_i129f','yes')}),
 f('previous_i129f_action','47. What action did USCIS take on Form I-129F (for example, approved, denied, revoked)?',{condition:eq('filed_previous_i129f','yes')}),
 f('previous_i129f_extra','Additional previous beneficiaries, filing dates, and USCIS actions (if needed)',{type:'textarea',required:false,condition:eq('filed_previous_i129f','yes'),reference:'Part 1, Items 44–47'}),
 yn('has_children_under18','48. Do you have any children under 18 years of age?'),
 f('child_1_age','49.a. Age',{type:'number',min:0,max:17,step:1,condition:eq('has_children_under18','yes')}),
 f('child_2_age','49.b. Age (if you have a second child under 18)',{type:'number',min:0,max:17,step:1,required:false,condition:eq('has_children_under18','yes')}),
 f('children_ages_extra','Ages of additional children under 18 (if needed)',{type:'textarea',required:false,condition:eq('has_children_under18','yes'),reference:'Part 1, Items 49.a–49.b'}),
 heading('residences_heading','Residences Since Your 18th Birthday'),
 f('residences_note','Provide all U.S. states and foreign countries in which you have resided since your 18th birthday. Use the additional-residences box if more space is needed.',{type:'note'}),
 heading('residence_1_heading','Residence 1'),
 f('residence_1_state','50.a. State',{type:'select',options:states,placeholder:'Select',required:false,requiredWhen:d=>us(d.residence_1_country)}),
 f('residence_1_country','50.b. Country'),
 yn('has_residence_2','Have you resided in another U.S. state or foreign country since your 18th birthday?'),
 heading('residence_2_heading','Residence 2',eq('has_residence_2','yes')),
 f('residence_2_state','51.a. State',{type:'select',options:states,placeholder:'Select',required:false,condition:eq('has_residence_2','yes'),requiredWhen:d=>us(d.residence_2_country)}),
 f('residence_2_country','51.b. Country',{condition:eq('has_residence_2','yes')}),
 f('residences_extra','Additional U.S. states and foreign countries of residence since age 18 (if needed)',{type:'textarea',required:false,condition:eq('has_residence_2','yes'),reference:'Part 1, Items 50–51'})
]};
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

root.I129FBase={maps,active,values,error,helpers:{f,eq,heading,date,yn,address}};
if(typeof module!=='undefined'&&module.exports)module.exports=root.I129FBase;
})(typeof window==='undefined'?globalThis:window);
