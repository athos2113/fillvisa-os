/* R-1 Classification Supplement, supplied pages 32–36. */
(function(){
'use strict';
const {f,yn,eq,and,address,date}=I129Base.helpers;
const always=()=>true,prior=eq('r_prior_stay','yes'),affiliated=eq('r_affiliated','yes');
const heading=(id,label,condition)=>f(id,label,{type:'heading',condition});
const note=(id,label,condition)=>f(id,label,{type:'note',condition});
const text=(id,label,condition,reference,required=true)=>f(id,label,{type:'textarea',condition,reference,required});
const count=(id,label,condition,extra={})=>f(id,label,{type:'number',min:0,step:1,condition,...extra});
const full=(d,p)=>[d[p+'_firstname'],d[p+'_middlename'],d[p+'_lastname']].filter(Boolean).join(' ');
const row=(id,n,c=always)=>(d,s)=>c(d,s)&&Number(d[id])>=n;
const phone=v=>/^[+()\d .-]+$/.test(v)&&v.replace(/\D/g,'').length>=7&&v.replace(/\D/g,'').length<=15;
const contact=(p,c=always)=>[
 heading(p+'_contact',"Organization's contact information",c),
 f(p+'_telephone','Daytime telephone number',{type:'tel',condition:c,validate:phone,message:'Enter a telephone number containing 7–15 digits.'}),
 f(p+'_fax','Fax number (if any)',{type:'tel',required:false,condition:c,validate:phone,message:'Enter a fax number containing 7–15 digits.'}),
 f(p+'_email','Email address (if any)',{type:'email',required:false,condition:c})
];
const physical=(p,label,c=always)=>address(p,label+' (do not use a post office or private mail box)',c,true);
const attestations=[
 [6,'The petitioner is a bona fide non-profit religious organization or a bona fide organization affiliated with the religious denomination and is tax-exempt as described in section 501(c)(3) of the Internal Revenue Code of 1986, subsequent amendment, or equivalent sections of prior enactments of the Internal Revenue Code. If affiliated with the religious denomination, complete the Religious Denomination Certification included in this supplement.'],
 [7,'The petitioner is willing and able to provide salaried or non-salaried compensation to the beneficiary. If the beneficiary will be self-supporting, the petitioner must submit documentation establishing that the position is part of an established program for temporary, uncompensated missionary work, which is part of a broader international program of missionary work sponsored by the denomination.'],
 [8,'If the beneficiary worked in the United States in R-1 status during the two years immediately before the petition was filed, the beneficiary received verifiable salaried or non-salaried compensation, or provided uncompensated self-support.'],
 [9,'If the position is not a religious vocation, the beneficiary will not engage in secular employment, and the petitioner will provide salaried or non-salaried compensation. If the position is traditionally uncompensated and not a religious vocation, the beneficiary will not engage in secular employment, and the beneficiary will provide self-support.'],
 [10,'The offered position requires at least 20 hours of work per week. If the offered position at the petitioning organization requires fewer than 20 hours per week, the compensated service for another religious organization and the compensated service at the petitioning organization will total 20 hours per week. If the beneficiary will be self-supporting, the petitioner must submit documentation establishing that the position is part of an established program for temporary, uncompensated missionary work, which is part of a broader international program of missionary work sponsored by the denomination.'],
 [11,"The beneficiary has been a member of the petitioner's denomination for at least two years immediately before Form I-129 was filed and is otherwise qualified to perform the duties of the offered position."],
 [12,'The petitioner will notify USCIS within 14 days if an R-1 worker is working less than the required number of hours or has been released from or has otherwise terminated employment before expiration of a period of authorized R-1 stay.']
];
I129Base.maps.r=[
 f('r_petitioner','1. Name of petitioner',{prefill:read=>{const d=read('i129-petitioner');return d.petitioner_type==='organization'?d.petitioner_company:full(d,'petitioner');}}),
 f('r_beneficiary','2. Name of beneficiary',{prefill:read=>full(read('i129-beneficiary'),'beneficiary')}),
 heading('r_section1','Section 1. R-1 religious worker — Employer attestation'),
 count('r_members',"1.a. Number of members of the petitioner's religious organization"),
 count('r_employees','1.b. Number of employees working at the same location where the beneficiary will be employed'),
 count('r_religious_workers','1.c. Number of workers holding special immigrant or nonimmigrant religious worker status currently employed or employed within the past five years'),
 count('r_petitions','1.d. Number of special immigrant religious worker petitions (I-360) and nonimmigrant religious worker petitions (I-129) filed by the petitioner within the past five years'),
 yn('r_prior_stay',"2. Has the beneficiary or any dependent family member previously been admitted to the U.S. in R visa classification in the last five years?"),
 note('r_stay_note','List only periods during the last five years when the beneficiary or dependent family member was physically present in the United States in R classification. Submit copies of I-94, I-797 or other USCIS documents identifying these periods.',prior),
 count('r_stay_count','Number of prior R-status stay entries',prior,{min:1,max:30}),
 ...Array.from({length:30},(_,i)=>{const n=i+1,p='r_stay_'+n,c=row('r_stay_count',n,prior);return [heading(p+'_heading','Prior stay '+n,c),f(p+'_name',"Beneficiary or dependent family member's name",{condition:c}),date(p+'_from','From',{condition:c,past:true}),date(p+'_to','To',{condition:c,past:true,after:p+'_from'})];}).flat(),
 text('r_stay_extra','Additional R-status stay history (if needed)',prior,'R supplement, Section 1, Item 2',false),
 count('r_position_count','3. Number of employee positions to describe at the same work location',always,{max:30}),
 ...Array.from({length:30},(_,i)=>{const n=i+1,p='r_position_'+n,c=row('r_position_count',n);return [heading(p+'_heading','Employee position '+n,c),f(p+'_title','Position',{condition:c}),text(p+'_responsibilities','Summary of responsibilities for this position',c)];}).flat(),
 text('r_positions_extra','Additional employee positions and responsibilities (if needed)',always,'R supplement, Section 1, Item 3',false),
 text('r_relationship','4. Describe the relationship, if any, between the U.S. religious organization and the organization abroad of which the beneficiary is a member',always,undefined,false),
 heading('r_employment','Prospective employment'),
 f('r_job_title','5.a. Title of position offered'),
 text('r_duties',"5.b. Detailed description of the beneficiary's proposed daily duties"),
 text('r_qualifications',"5.c. Describe the beneficiary's qualifications for the position offered"),
 text('r_compensation','5.d. Describe proposed salaried or non-salaried compensation'),
 note('r_compensation_note','If the beneficiary will be self-supporting, submit documentation establishing that the position is part of an established program for temporary, uncompensated missionary work within a broader international missionary program sponsored by the denomination.'),
 text('r_work_locations','5.e. List the addresses or locations where the beneficiary will work'),
 heading('r_attestations','Petitioner attestations'),
 note('r_attestations_note','Does the petitioner attest to each of the requirements in Items 6–12? Explain each No answer.'),
 // Fill the explanation beneath each attestation first; PDF overflow goes to Part 9.
 ...attestations.flatMap(([n,label])=>[yn('r_attest_'+n,n+'. '+label),text('r_attest_'+n+'_explanation','Explain your No answer to Item '+n,eq('r_attest_'+n,'no'))]),
 yn('r_affiliated','Is the petitioner affiliated with the religious denomination?'),
 heading('r_attestation','Attestation'),
 note('r_attestation_text','I certify, under penalty of perjury, that the contents of this attestation and the evidence submitted with it are true and correct.'),
 f('r_signatory_name','Name of petitioner',{prefill:read=>full(read('i129-declaration'),'signatory')||full(read('i129-petitioner'),'petitioner')}),
 f('r_signatory_title','Title',{prefill:read=>read('i129-declaration').signatory_title||''}),
 f('r_sign','Signature of petitioner',{type:'signature',required:false}),
 date('r_sign_date','Date of signature',{required:false,past:true,requiredWhen:d=>!!d.r_sign}),
 f('r_employer_name','Employer or organization name',{prefill:read=>read('i129-petitioner').petitioner_company||''}),
 ...physical('r_employer_address','Employer or organization address'),
 ...contact('r_employer'),
 heading('r_section2','Section 2. Religious denomination certification',affiliated),
 note('r_certification_intro','I certify, under penalty of perjury, that the employing organization named below is affiliated with the religious denomination named below.',affiliated),
 f('r_cert_employer','Name of employing organization',{condition:affiliated,prefill:read=>read('i129-petitioner').petitioner_company||''}),
 f('r_denomination','Name of religious denomination',{condition:affiliated}),
 note('r_certification_text','The attesting organization within the religious denomination is tax-exempt as described in section 501(c)(3) of the Internal Revenue Code of 1986 (codified at 26 U.S.C. 501(c)(3)), any subsequent amendments, or equivalent sections of prior enactments of the Internal Revenue Code. The contents of this certification are true and correct to the best of my knowledge.',affiliated),
 f('r_representative','Name of authorized representative of attesting organization',{condition:affiliated}),
 f('r_representative_title','Title',{condition:affiliated}),
 f('r_cert_sign','Signature of authorized representative of attesting organization',{type:'signature',required:false,condition:affiliated}),
 date('r_cert_date','Date of signature',{required:false,past:true,condition:affiliated,requiredWhen:d=>!!d.r_cert_sign}),
 f('r_attesting_name','Attesting organization name',{condition:affiliated}),
 ...physical('r_attesting_address','Attesting organization address',affiliated),
 ...contact('r_attesting',affiliated)
];
})();
