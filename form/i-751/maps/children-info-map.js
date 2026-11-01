/* I-751 Part 5: PDF pages 3–5. Additional children are collected for PDF Part 11. */
(function(root){
'use strict';
const {f,heading,date,yn,states}=root.I751Base.helpers;
const childVisible=(n,d)=>d.has_children==='yes'&&Array.from({length:n-1},(_,i)=>i+2).every(i=>d['has_child_'+i]==='yes');
const us=v=>['us','usa','united states','united states of america','u.s.','u.s.a.'].includes(String(v||'').trim().toLowerCase());
function physicalAddress(n,item){
 const p='child_'+n+'_physical';
 return [
 heading(p+'_heading','Child '+n+' — Physical Address'),
 f(p+'_street',item+'.a. Street Number and Name',{required:true}),
 f(p+'_unit',item+'.b. Unit Type (if any)',{type:'radio',pdf:null,options:[['apt','Apt.'],['ste','Ste.'],['flr','Flr.'],['none','None']],pdfCheckboxes:{apt:p+'_apt',ste:p+'_ste',flr:p+'_flr'}}),
 f(p+'_number','Unit Number',{required:true,condition:d=>['apt','ste','flr'].includes(d[p+'_unit'])}),
 f(p+'_city',item+'.c. City or Town',{required:true}),
 f(p+'_state',item+'.d. State',{type:'select',placeholder:'Select',options:states,requiredWhen:d=>us(d[p+'_country'])}),
 f(p+'_zip',item+'.e. ZIP Code',{requiredWhen:d=>us(d[p+'_country']),maxLength:10,validate:v=>/^\d{5}(-\d{4})?$/.test(v),message:'Enter a 5-digit ZIP code or ZIP+4.'}),
 f(p+'_province',item+'.f. Province (if applicable)'),
 f(p+'_postal',item+'.g. Postal Code (if applicable)'),
 f(p+'_country',item+'.h. Country',{required:true})
 ];
}
function child(n){
 const p='child_'+n,start=1+(n-1)*6;
 const fields=[
 heading(p+'_heading','Child '+n),
 f(p+'_lastname',start+'.a. Family Name (Last Name)',{required:true}),
 f(p+'_firstname',start+'.b. Given Name (First Name)',{required:true}),
 f(p+'_middlename',start+'.c. Middle Name (if any)'),
 date(p+'_dob',(start+1)+'. Date of Birth',{required:true}),
 f(p+'_a_number',(start+2)+'. A-Number (if any)',{maxLength:9,validate:v=>/^\d{7,9}$/.test(v),message:'Enter 7–9 digits, without the A- prefix.'}),
 yn(p+'_living_with_you',(start+3)+'. Is this child living with you?'),
 yn(p+'_applying_with_you',(start+4)+'. Is this child applying with you?'),
 ...physicalAddress(n,start+5)
 ];
 return fields.map(field=>{const condition=field.condition;return {...field,condition:d=>childVisible(n,d)&&(!condition||condition(d))};});
}
root.I751Base.maps['children-info']=[
 f('children_note','Provide information on all of your children.',{type:'note',pdf:null}),
 f('has_children','Do you have any children?',{type:'radio',required:true,pdf:null,options:[['yes','Yes'],['no','No']]}),
 ...[1,2,3,4,5].flatMap(n=>[
 ...(n>1?[f('has_child_'+n,'Do you have a '+({2:'second',3:'third',4:'fourth',5:'fifth'}[n])+' child to list?',{type:'radio',required:true,pdf:null,options:[['yes','Yes'],['no','No']],condition:d=>childVisible(n-1,d)})]:[]),
 ...child(n)
 ]),
 f('has_more_children','Do you have more than five children?',{type:'radio',required:true,pdf:null,options:[['yes','Yes'],['no','No']],condition:d=>childVisible(5,d)}),
 f('children_extra','Additional children: provide each child’s full name, date of birth, A-Number (if any), whether they live with you, whether they are applying with you, and their physical address.',{type:'textarea',required:true,pdf:null,reference:'Part 5, Items 25–30',pdfPage:5,pdfPart:5,pdfItem:'25–30',condition:d=>childVisible(5,d)&&d.has_more_children==='yes'})
];
})(typeof window==='undefined'?globalThis:window);
