/* I-751 Part 1: PDF pages 1–2. PDF field names are declared beside each control.
 * Unit choices map to PDF checkboxes; state selects map to PDF text fields.
 * Signature rendering is shared with the I-130A pattern in form.js.
 */
(function(root){
'use strict';
const f=(id,label,extra={})=>({id,label,type:'text',required:false,pdf:id,...extra});
const heading=(id,label)=>f(id,label,{type:'heading',pdf:null});
const date=(id,label,extra={})=>f(id,label,{type:'date',past:true,...extra});
const states='AL:Alabama|AK:Alaska|AZ:Arizona|AR:Arkansas|CA:California|CO:Colorado|CT:Connecticut|DE:Delaware|DC:District of Columbia|FL:Florida|GA:Georgia|HI:Hawaii|ID:Idaho|IL:Illinois|IN:Indiana|IA:Iowa|KS:Kansas|KY:Kentucky|LA:Louisiana|ME:Maine|MD:Maryland|MA:Massachusetts|MI:Michigan|MN:Minnesota|MS:Mississippi|MO:Missouri|MT:Montana|NE:Nebraska|NV:Nevada|NH:New Hampshire|NJ:New Jersey|NM:New Mexico|NY:New York|NC:North Carolina|ND:North Dakota|OH:Ohio|OK:Oklahoma|OR:Oregon|PA:Pennsylvania|RI:Rhode Island|SC:South Carolina|SD:South Dakota|TN:Tennessee|TX:Texas|UT:Utah|VT:Vermont|VA:Virginia|WA:Washington|WV:West Virginia|WI:Wisconsin|WY:Wyoming'.split('|').map(x=>x.split(':'));
const yn=(id,label,extra={})=>f(id,label,{type:'radio',required:true,options:[['yes','Yes'],['no','No']],pdf:null,pdfCheckboxes:{yes:id+'_yes',no:id+'_no'},...extra});
function address(prefix,item,label,condition=()=>true){
 return [f(prefix+'_heading',label,{type:'heading',pdf:null,condition}),
 f(prefix+'_careof',item+'.a. In Care Of Name (if any)',{condition}),
 f(prefix+'_street',item+'.b. Street Number and Name',{required:true,condition}),
 f(prefix+'_unit',item+'.c. Unit Type (if any)',{type:'radio',options:[['apt','Apt.'],['ste','Ste.'],['flr','Flr.'],['none','None']],pdf:null,pdfCheckboxes:{apt:prefix+'_apt',ste:prefix+'_ste',flr:prefix+'_flr'},condition}),
 f(prefix+'_number','Unit Number',{required:true,condition:d=>condition(d)&&['apt','ste','flr'].includes(d[prefix+'_unit'])}),
 f(prefix+'_city',item+'.d. City or Town',{required:true,condition}),
 f(prefix+'_state',item+'.e. State',{type:'select',placeholder:'Select',options:states,required:true,condition}),
 f(prefix+'_zip',item+'.f. ZIP Code',{required:true,condition,maxLength:10,validate:v=>/^\d{5}(-\d{4})?$/.test(v),message:'Enter a 5-digit ZIP code or ZIP+4.'})];
}
const explanation=(id,label,item,condition)=>f(id,label,{type:'textarea',required:true,pdf:null,reference:'Part 1, Item '+item,pdfPage:2,pdfPart:1,pdfItem:String(item),condition});
const attorney=d=>d.has_attorney==='yes';
const maps={'info-about-you':[
 f('has_attorney','Is an attorney or accredited representative completing the attorney block?',{type:'radio',options:[['yes','Yes'],['no','No']],required:true,pdf:null}),
 f('attorney_heading','Attorney or accredited representative',{type:'heading',condition:attorney,pdf:null}),
 f('g28_attached','Form G-28',{type:'checkboxes',options:[['yes','Form G-28 is attached']],condition:attorney,pdf:'g28_attached'}),
 f('attorney_bar','Attorney State Bar Number (if applicable)',{condition:attorney}),
 f('attorney_uscis','Attorney or Accredited Representative USCIS Online Account Number (if any)',{condition:attorney,maxLength:12,validate:v=>/^\d{12}$/.test(v),message:'Enter 12 digits.'}),
 heading('identity_heading','Your Full Name'),
 f('lastname','1.a. Family Name (Last Name)',{required:true}),
 f('firstname','1.b. Given Name (First Name)',{required:true}),
 f('middlename','1.c. Middle Name (if any)'),
 heading('other_names_heading','Other Names Used'),
 f('other_names_note','List all other names you have ever used, including aliases, maiden name, and nicknames. Use the additional names box if you need more space.',{type:'note',pdf:null}),
 f('other_1_lastname','2.a. Family Name (Last Name)'),
 f('other_1_firstname','2.b. Given Name (First Name)'),
 f('other_1_middlename','2.c. Middle Name'),
 f('other_2_lastname','3.a. Family Name (Last Name)'),
 f('other_2_firstname','3.b. Given Name (First Name)'),
 f('other_2_middlename','3.c. Middle Name'),
 f('other_names_extra','Additional other names (if needed)',{type:'textarea',pdf:null,reference:'Part 1, Items 2–3',pdfPage:1,pdfPart:1,pdfItem:'2–3'}),
 heading('other_information_heading','Other Information'),
 date('dob','4. Date of Birth',{required:true}),
 f('birth_country','5. Country of Birth',{required:true}),
 f('citizenship_country','6. Country of Citizenship or Nationality (provide all that apply)',{required:true}),
 f('a_number','7. Alien Registration Number (A-Number) (if any)',{maxLength:9,validate:v=>/^\d{7,9}$/.test(v),message:'Enter 7–9 digits, without the A- prefix.'}),
 f('ssn','8. U.S. Social Security Number (if any)',{maxLength:9,validate:v=>/^\d{9}$/.test(v),message:'Enter 9 digits, without hyphens.'}),
 f('uscis_number','9. USCIS Online Account Number (if any)',{maxLength:12,validate:v=>/^\d{12}$/.test(v),message:'Enter 12 digits.'}),
 heading('marital_heading','Marital Status'),
 f('marital_status','10. Marital Status',{type:'radio',required:true,options:[['single','Single'],['married','Married'],['divorced','Divorced'],['widowed','Widowed']],pdf:null,pdfCheckboxes:{single:'marital_status_single',married:'marital_status_married',divorced:'marital_status_divorced',widowed:'marital_status_widowed'}}),
 date('marriage_date','11. Date of Marriage'),
 f('marriage_place','12. Place of Marriage'),
 date('marriage_ended_date','13. If the marriage through which you gained conditional residence has ended, provide the date it ended (date of divorce or date of death)',{after:'marriage_date'}),
 date('resident_expiry_date','14. Conditional Residence Expires On',{past:false,required:true}),
 ...address('mailing','15','Mailing Address'),
 yn('physical_different','16. Is your physical address different from your mailing address?'),
 ...address('physical','17','Physical Address',d=>d.physical_different==='yes'),
 heading('additional_information_heading','Additional Information About You'),
 yn('removal_proceedings','18. Are you in removal, deportation, or rescission proceedings?'),
 yn('paid_other','19. Was a fee paid to anyone other than an attorney in connection with this petition?'),
 yn('criminal_history','20. Have you ever been arrested, detained, charged, indicted, fined, or imprisoned for breaking or violating any law or ordinance (excluding traffic regulations), or committed any crime which you were not arrested for in the United States or abroad?'),
 explanation('criminal_history_extra','Provide a detailed explanation for Item 20.',20,d=>d.criminal_history==='yes'),
 f('criminal_history_note','If you answered Yes to Item 20, refer to the What Initial Evidence Is Required section of the Form I-751 instructions to determine what criminal history documentation to include with your petition.',{type:'note',pdf:null,condition:d=>d.criminal_history==='yes'}),
 yn('different_marriage','21. If you are married, is this a different marriage than the one through which you gained conditional resident status?',{condition:d=>d.marital_status==='married'}),
 yn('other_addresses','22. Have you resided at any other addresses since you became a permanent resident?'),
 explanation('address_history_extra','List all other addresses where you have resided since becoming a permanent resident and the dates you resided at each location.',22,d=>d.other_addresses==='yes'),
 yn('government_abroad','23. Is your spouse or parent’s spouse currently serving with or employed by the U.S. Government and serving outside the United States?')
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
  if(!/^\d{4}-\d{2}-\d{2}$/.test(value)||!Number.isFinite(Date.parse(value))||new Date(value).toISOString().slice(0,10)!==value)return 'Enter a valid date.';
  const today=new Date();const local=[today.getFullYear(),String(today.getMonth()+1).padStart(2,'0'),String(today.getDate()).padStart(2,'0')].join('-');
  if(field.past&&value>local)return 'This date cannot be in the future.';
  if(field.after&&data[field.after]&&value<data[field.after])return 'The end / expiration date must not precede the start / issue date.';
 }
 return '';
}

root.I751Base={maps,active,values,error,helpers:{f,heading,date,yn,states}};
if(typeof module!=='undefined'&&module.exports)module.exports=root.I751Base;
})(typeof window==='undefined'?globalThis:window);
