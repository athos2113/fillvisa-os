/* O and P Classifications Supplement, supplied pages 28–30. */
(function(){
'use strict';
const {f,yn,eq,and,address,name,date}=I129Base.helpers;
const single=(d,s)=>s.multiple!=='yes'&&Number(s.worker_count||1)===1;
const support=(d,s)=>['O-2','P-1S','P-2S','P-3S'].includes(s.classification);
const o1b=(d,s)=>s.classification==='O-1B';
const notSubmitted=eq('op_consultation','no');
const extraordinary=and(notSubmitted,(d,s)=>s.classification==='O-1A'||(o1b(d,s)&&d.op_o1b_field==='arts'));
const screen=and(notSubmitted,and(o1b,eq('op_o1b_field','screen')));
const o2p=and(notSubmitted,(d,s)=>s.classification==='O-2'||String(s.classification||'').startsWith('P-'));
const text=(id,label,condition,reference)=>f(id,label,{type:'textarea',condition,reference});
const full=(d,p)=>[d[p+'_firstname'],d[p+'_middlename'],d[p+'_lastname']].filter(Boolean).join(' ');
const phone=v=>/^[+()\d .-]+$/.test(v)&&v.replace(/\D/g,'').length>=7&&v.replace(/\D/g,'').length<=15;
const tel=(id,label,condition)=>f(id,label,{type:'tel',condition,validate:phone,message:'Enter a telephone number containing 7–15 digits.'});
const classifications={
 'O-1A':'O-1A — Extraordinary ability in sciences, education, business or athletics (excluding arts, motion pictures and television)',
 'O-1B':'O-1B — Extraordinary ability in the arts or extraordinary achievement in motion pictures or television',
 'O-2':'O-2 — Accompanying worker assisting in the performance of the O-1',
 'P-1-ML':'P-1 — Major League Sports',
 'P-1':'P-1 — Athlete or athletic/entertainment group (including minor league sports not affiliated with Major League Sports)',
 'P-1S':'P-1S — Essential support personnel for P-1',
 'P-2':'P-2 — Artist or entertainer for reciprocal exchange program',
 'P-2S':'P-2S — Essential support personnel for P-2',
 'P-3':'P-3 — Artist/entertainer performing, teaching or coaching in a culturally unique program',
 'P-3S':'P-3S — Essential support personnel for P-3'
};
const organization=(p,item,title,label,c)=>[
 f(p+'_heading',title,{type:'heading',condition:c}),
 f(p+'_name',item+'.a. '+label,{condition:c}),
 ...address(p+'_address',item+'.b. Address',c,true),
 date(p+'_sent',item+'.c. Date sent',{condition:c,past:true}),
 tel(p+'_telephone',item+'.d. Daytime telephone number',c)
];
I129Base.maps.op=[
 f('op_section1','Section 1. O or P classification',{type:'heading'}),
 f('op_petitioner','1. Name of petitioner',{prefill:read=>{const d=read('i129-petitioner');return d.petitioner_type==='organization'?d.petitioner_company:full(d,'petitioner');}}),
 f('op_beneficiary','2.a. Name of beneficiary',{condition:single,prefill:read=>full(read('i129-beneficiary'),'beneficiary')}),
 f('op_beneficiary_count','2.b. Total number of beneficiaries',{type:'number',min:1,step:1,readonly:true,condition:(d,s)=>!single(d,s),derive:(d,s)=>s.worker_count||''}),
 f('op_classification','3. Classification sought',{readonly:true,derive:(d,s)=>classifications[s.classification]||''}),
 f('op_classification_note','Classification and beneficiary count come from Petition Setup. Update them there if they change.',{type:'note'}),
 f('op_o1b_field','O-1B field',{type:'radio',condition:o1b,options:[['arts','Arts'],['screen','Motion pictures or television']]}),
 text('op_event','4. Explain the nature of the event'),
 text('op_duties','5. Describe the duties to be performed'),
 text('op_prior_experience',"6. List dates of the beneficiary's prior work experience under the O-1 or P principal",support),
 yn('op_ownership','7.a. Does any beneficiary have an ownership interest in the petitioning organization?'),
 text('op_ownership_explanation','7.b. Explain the ownership interest',eq('op_ownership','yes')),
 yn('op_labor_exists','8. Does an appropriate labor organization exist for the petition?'),
 text('op_labor_explanation','Explain why an appropriate labor organization does not exist',eq('op_labor_exists','no'),'O/P supplement, Section 1, Item 8'),
 f('op_consultation','9. Is the required consultation or written advisory opinion being submitted with this petition?',{type:'radio',options:[['yes','Yes'],['no','No — copy of request attached'],['na','N/A']]}),
 f('op_consultation_note','Provide information about the organization(s) to which you sent a duplicate of the petition, and attach a copy of the request.',{type:'note',condition:notSubmitted}),
 ...organization('op_peer','10','O-1 extraordinary ability','Name of recognized peer / peer group or labor organization',extraordinary),
 ...organization('op_screen_labor','11','O-1 extraordinary achievement in motion pictures or television','Name of labor organization',screen),
 ...organization('op_management','12','Motion pictures or television — management organization','Name of management organization',screen),
 ...organization('op_labor','13','O-2 or P worker','Name of labor organization',o2p),
 f('op_section2','Section 2. Statement by the petitioner',{type:'heading'}),
 f('op_statement','I certify that I, the petitioner, and the employer whose offer of employment formed the basis of status (if different from the petitioner) will be jointly and severally liable for the reasonable costs of return transportation of the beneficiary abroad if the beneficiary is dismissed from employment by the employer before the end of the period of authorized stay.',{type:'note'}),
 f('op_signatory_heading','1. Name of petitioner',{type:'heading'}),
 ...name('op_signatory').map(x=>({...x,prefill:read=>read('i129-declaration')[x.id.replace('op_signatory','signatory')]||read('i129-petitioner')[x.id.replace('op_signatory','petitioner')]||''})),
 f('op_sign','2. Signature of petitioner',{type:'signature',required:false}),
 date('op_sign_date','Date of signature',{required:false,past:true,requiredWhen:d=>!!d.op_sign}),
 {...tel('op_telephone','3. Daytime telephone number'),prefill:read=>read('i129-petitioner').petitioner_telephone||''},
 f('op_email','Email address (if any)',{type:'email',required:false,prefill:read=>read('i129-petitioner').petitioner_email||''})
];
})();
