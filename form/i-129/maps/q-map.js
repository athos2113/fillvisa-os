/* Q-1 Classification Supplement, supplied page 31. */
(function(){
'use strict';
const {f,name,date}=I129Base.helpers;
const full=(d,p)=>[d[p+'_firstname'],d[p+'_middlename'],d[p+'_lastname']].filter(Boolean).join(' ');
const phone=v=>/^[+()\d .-]+$/.test(v)&&v.replace(/\D/g,'').length>=7&&v.replace(/\D/g,'').length<=15;
I129Base.maps.q=[
 f('q_petitioner','1. Name of petitioner',{prefill:read=>{const d=read('i129-petitioner');return d.petitioner_type==='organization'?d.petitioner_company:full(d,'petitioner');}}),
 f('q_beneficiary','2. Name of beneficiary',{prefill:read=>full(read('i129-beneficiary'),'beneficiary')}),
 f('q_section1','Section 1. Q-1 International Cultural Exchange',{type:'heading'}),
 f('q_certification',"I hereby certify that the participant(s) in the international cultural exchange program:\n\na. Is at least 18 years of age,\n\nb. Is qualified to perform the service or labor or receive the type of training stated in the petition,\n\nc. Has the ability to communicate effectively about the cultural attributes of his or her country of nationality to the American public, and\n\nd. Has resided and been physically present outside the United States for the immediate prior year. (Applies only if the participant was previously admitted as a Q-1.)\n\nI also certify that I will offer the alien(s) the same wages and working conditions comparable to those accorded local domestic workers similarly employed.",{type:'note'}),
 f('q_name_heading','1. Name of petitioner',{type:'heading'}),
 ...name('q_signatory').map(x=>({...x,prefill:read=>read('i129-declaration')[x.id.replace('q_signatory','signatory')]||read('i129-petitioner')[x.id.replace('q_signatory','petitioner')]||''})),
 f('q_sign','2. Signature of petitioner',{type:'signature',required:false}),
 date('q_sign_date','Date of signature',{required:false,past:true,requiredWhen:d=>!!d.q_sign}),
 f('q_contact_heading',"3. Petitioner's contact information",{type:'heading'}),
 f('q_telephone','Daytime telephone number',{type:'tel',validate:phone,message:'Enter a telephone number containing 7–15 digits.',prefill:read=>read('i129-petitioner').petitioner_telephone||''}),
 f('q_email','Email address (if any)',{type:'email',required:false,prefill:read=>read('i129-petitioner').petitioner_email||''})
];
})();
