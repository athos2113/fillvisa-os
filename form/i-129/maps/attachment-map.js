/* Attachment-1: one entry per additional named beneficiary. */
(function(){
'use strict';
const {f,yn,eq,and,name,address,date}=I129Base.helpers;
I129Base.maps.attachment=setup=>{
 const total=Number(setup.worker_count),count=setup.multiple==='yes'&&setup.beneficiaryType!=='unnamed'&&Number.isSafeInteger(total)&&total>1?total-1:0;
 return [f('attachment_note','Complete one entry for each additional beneficiary. Do not repeat the beneficiary already named in Part 3. The number of entries follows the total worker count in Petition Setup.',{type:'note'}),
 ...Array.from({length:count},(_,i)=>{
 const p='attachment_'+(i+1),inside=eq(p+'_inside','yes'),other=eq(p+'_other_names','yes');
 return [f(p+'_heading','Additional beneficiary '+(i+1)+' (person '+(i+2)+' of '+total+')',{type:'heading'}),
 ...name(p),date(p+'_dob','Date of birth',{past:true}),
 f(p+'_sex','Sex',{type:'radio',options:[['male','Male'],['female','Female']]}),
 f(p+'_ssn','U.S. Social Security Number (if any)',{required:false,maxLength:9,validate:v=>/^\d{9}$/.test(v),message:'Enter a nine-digit Social Security Number.'}),
 f(p+'_anumber','A-Number (if any; digits after A-)',{required:false,maxLength:9,validate:v=>/^\d{7,9}$/.test(v),message:'Enter 7–9 digits after A-.'}),
 yn(p+'_other_names','Has this person used other names, including aliases, maiden names or names from previous marriages?'),
 ...name(p+'_other',other),
 f(p+'_other_extra','Additional other names (if needed)',{type:'textarea',required:false,condition:other,reference:'Attachment-1, additional beneficiary '+(i+1)+', Other names'}),
 ...address(p+'_us_address','Address in the United States where this person intends to live',()=>true,true),
 ...address(p+'_foreign_address','Foreign address'),
 f(p+'_birth_country','Country of birth'),f(p+'_citizenship','Country of citizenship or nationality'),
 yn(p+'_inside','Is this person currently in the United States?'),
 date(p+'_arrival','Date of last arrival',{condition:inside,past:true}),
 f(p+'_i94','I-94 arrival-departure record number',{condition:inside,required:false,maxLength:11,validate:v=>/^[A-Za-z0-9]{11}$/.test(v),message:'Enter the 11-character I-94 number.'}),
 f(p+'_passport','Passport or travel document number',{condition:inside,required:false}),
 date(p+'_passport_issued','Passport or travel document date issued',{condition:inside,required:false,past:true}),
 date(p+'_passport_expires','Passport or travel document expiration',{condition:inside,required:false,after:p+'_passport_issued'}),
 f(p+'_passport_country','Country of issuance for passport or travel document',{condition:inside,required:false}),
 f(p+'_status','Current nonimmigrant status',{condition:inside}),
 yn(p+'_ds','Is this admission for duration of status (D/S)?',{condition:inside}),
 date(p+'_status_expires','Date status expires',{condition:and(inside,eq(p+'_ds','no'))}),
 f(p+'_sevis','SEVIS number (if any)',{condition:inside,required:false}),
 f(p+'_ead','Employment Authorization Document (EAD) number (if any)',{condition:inside,required:false})];
 }).flat()];
};
})();
