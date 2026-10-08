/* Part 1, supplied PDF pages 1–2. */
(function(root){
'use strict';
const f=(id,label,extra={})=>({id,label,type:'text',required:true,...extra});
const yesno=[['yes','Yes'],['no','No']];
const eq=(id,value)=>d=>d[id]===value;
const us=v=>['us','usa','united states','united states of america','u.s.','u.s.a.'].includes(String(v||'').trim().toLowerCase());
const states='AL:Alabama|AK:Alaska|AZ:Arizona|AR:Arkansas|CA:California|CO:Colorado|CT:Connecticut|DC:District of Columbia|DE:Delaware|FL:Florida|GA:Georgia|HI:Hawaii|ID:Idaho|IL:Illinois|IN:Indiana|IA:Iowa|KS:Kansas|KY:Kentucky|LA:Louisiana|ME:Maine|MD:Maryland|MA:Massachusetts|MI:Michigan|MN:Minnesota|MS:Mississippi|MO:Missouri|MT:Montana|NE:Nebraska|NV:Nevada|NH:New Hampshire|NJ:New Jersey|NM:New Mexico|NY:New York|NC:North Carolina|ND:North Dakota|OH:Ohio|OK:Oklahoma|OR:Oregon|PA:Pennsylvania|RI:Rhode Island|SC:South Carolina|SD:South Dakota|TN:Tennessee|TX:Texas|UT:Utah|VT:Vermont|VA:Virginia|WA:Washington|WV:West Virginia|WI:Wisconsin|WY:Wyoming'.split('|').map(x=>x.split(':'));
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
const attorney=eq('has_attorney','yes'),second=eq('has_physical_2','yes'),abroad=eq('has_foreign_address','yes');
const maps={'info-about-you':[
 f('intro','Enter information about the spouse beneficiary. Provide physical address history for the last five years, starting with your current address. Additional history can be entered below for Part 7.',{type:'note'}),
 yn('has_attorney','Is an attorney or accredited representative completing the attorney block?'),
 heading('attorney_heading','Attorney or accredited representative',attorney),
 f('g28_attached','Form G-28 is attached',{type:'checkboxes',options:[['yes','Form G-28 is attached']],required:false,condition:attorney}),
 f('attorney_volag','Volag number (if any)',{required:false,condition:attorney}),
 f('attorney_bar','Attorney State Bar number (if applicable)',{required:false,condition:attorney}),
 f('attorney_uscis','Attorney or representative USCIS Online Account Number (if any)',{required:false,condition:attorney,maxLength:12,validate:v=>/^\d{12}$/.test(v),message:'Enter 12 digits.'}),
 heading('identity_heading','Part 1. Information About You (Spouse Beneficiary)'),
 f('a_number','1. A-Number (digits after A-, if any)',{required:false,maxLength:9,validate:v=>/^\d{7,9}$/.test(v),message:'Enter 7–9 digits.'}),
 f('uscis_number','2. USCIS Online Account Number (if any)',{required:false,maxLength:12,validate:v=>/^\d{12}$/.test(v),message:'Enter 12 digits.'}),
 f('lastname','3.a. Family name (last name)'),f('firstname','3.b. Given name (first name)'),f('middlename','3.c. Middle name (if any)',{required:false}),
 ...address('physical_1','4. Physical Address 1 (current address)'),
 date('physical_1_from','5.a. Date from'),
 f('physical_1_to','5.b. Date to',{readonly:true,derive:()=>'PRESENT'}),
 yn('has_physical_2','Did you live at another physical address during the last five years?'),
 ...address('physical_2','6. Physical Address 2',second),
 date('physical_2_from','7.a. Date from',{condition:second}),
 date('physical_2_to','7.b. Date to',{condition:second,after:'physical_2_from'}),
 f('address_history_extra','Additional physical address history (if needed)',{type:'textarea',required:false,reference:'Part 1, Items 4–7',label:'Additional physical addresses and dates for the last five years (if needed)'}),
 yn('has_foreign_address','Have you lived at an address outside the United States for more than one year?'),
 f('foreign_note','Provide your last physical address outside the United States where you lived for more than one year, even if you listed it above.',{type:'note',condition:abroad}),
 ...address('foreign_address','8. Last Physical Address Outside the United States',abroad,true),
 date('foreign_address_from','9.a. Date from',{condition:abroad}),
 date('foreign_address_to','9.b. Date to',{condition:abroad,after:'foreign_address_from'}),
 ...[1,2].flatMap(n=>{
  const p='parent_'+n,start=n===1?10:17;
  return [heading(p+'_heading','Information About Parent '+n),
   f(p+'_lastname',start+'.a. Family name (maiden name)'),
   f(p+'_firstname',start+'.b. Given name (first name)'),
   f(p+'_middlename',start+'.c. Middle name (if any)',{required:false}),
   date(p+'_dob',(start+1)+'. Date of birth'),
   f(p+'_sex',(start+2)+'. Sex',{type:'radio',options:[['male','Male'],['female','Female']]}),
   f(p+'_birth_city',(start+3)+'. City/town/village of birth'),
   f(p+'_birth_country',(start+4)+'. Country of birth'),
   f(p+'_residence_city',(start+5)+'. City/town/village of residence'),
   f(p+'_residence_country',(start+6)+'. Country of residence')];
 })
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

root.I130ABase={maps,active,values,error,helpers:{f,eq,heading,date,yn,address}};
if(typeof module!=='undefined'&&module.exports)module.exports=root.I130ABase;
})(typeof window==='undefined'?globalThis:window);
