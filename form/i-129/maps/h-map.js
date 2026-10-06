/* H supplement: supplied pages 13–20. H data/fee supplement is separate. */
(function(){
'use strict';
const {f,yn,eq,and,address,name,date}=I129Base.helpers;
const always=()=>true, h2=(d,s)=>['H-2A','H-2B'].includes(s.classification), h2a=(d,s)=>s.classification==='H-2A';
const named=(d,s)=>s.beneficiaryType!=='unnamed';
const heading=(id,label,condition=always)=>f(id,label,{type:'heading',condition});
const note=(id,label,condition=always)=>f(id,label,{type:'note',condition});
const text=(id,label,condition=always,reference)=>f(id,label,{type:'textarea',condition,reference});
const num=(id,label,condition=always,extra={})=>f(id,label,{type:'number',min:0,step:1,condition,...extra});
const signature=(id,label,condition=always)=>[f(id+'_name',label+' — name',{condition}),f(id+'_sign',label+' — signature',{type:'signature',required:false,condition}),date(id+'_date','Date of signature',{required:false,past:true,condition,requiredWhen:d=>!!d[id+'_sign']})];
const full=(d,p)=>[d[p+'_firstname'],d[p+'_middlename'],d[p+'_lastname']].filter(Boolean).join(' ');
const single=(d,s)=>s.beneficiaryType!=='unnamed'&&s.multiple!=='yes'&&Number(s.worker_count||1)===1;
const capType=(d,s)=>['H-1B','H-1B3'].includes(s.classification);
const cap=and(capType,eq('h_cap_petition','yes'));
I129Base.maps.h=[
 f('h_petitioner','1. Name of petitioner',{prefill:read=>{const d=read('i129-petitioner');return d.petitioner_type==='organization'?d.petitioner_company:full(d,'petitioner');}}),
 f('h_beneficiary','2.a. Name of beneficiary',{condition:single,prefill:read=>full(read('i129-beneficiary'),'beneficiary')}),
 num('h_beneficiary_count','2.b. Total number of beneficiaries',(d,s)=>!single(d,s),{min:1,readonly:true,derive:(d,s)=>s.worker_count||''}),
 heading('h_stays_heading','3. Prior periods physically present in H or L status'),
 note('h_stays_note','List the last six years, or the last three years for H-2A/H-2B. Exclude dependent status such as H-4 or L-2. Include copies of I-94, I-797 or other USCIS documents showing these stays.'),
 num('h_stay_count','Number of prior stay entries',always,{max:30}),
 ...Array.from({length:30},(_,i)=>{const n=i+1,c=d=>Number(d.h_stay_count)>=n;return [heading('h_stay_'+n,'Stay '+n,c),f('h_stay_'+n+'_name',"Subject's name",{condition:c}),date('h_stay_'+n+'_from','From',{condition:c,past:true}),date('h_stay_'+n+'_to','To',{condition:c,past:true,after:'h_stay_'+n+'_from'})];}).flat(),
 f('h_stays_extra','Additional stay history (if needed)',{type:'textarea',required:false,reference:'H supplement, Item 3'}),
 f('h_classification','4. Classification sought',{readonly:true,derive:(d,s)=>I129Flow.classifications[s.classification]||s.classification}),
 note('h_classification_note','Change classification in Petition Setup to update the applicable H section.'),
 yn('h_cap_petition','5. Is this an H-1B cap petition (including the U.S. advanced-degree exemption)?',{condition:capType}),
 f('h_confirmation','5.a. Registration selection confirmation number (if applicable)',{condition:cap,required:false}),
 f('h_registration_passport','5.b. Passport / travel document number used at registration',{condition:cap}),f('h_registration_country','Country of issuance',{condition:cap}),date('h_registration_expiry','Expiration date of document used at registration',{condition:cap}),
 yn('h_guam_exemption','6. Is the beneficiary subject to the Guam-CNMI cap exemption under Public Law 110-229?'),
 yn('h_guam_change','7. Are you requesting a change of employer for a beneficiary previously subject to the Guam-CNMI cap exemption?'),
 yn('h_controlling_interest','8.a. Does any beneficiary own more than 50 percent of the petitioner or have majority voting rights?'),text('h_control_explanation','8.b. Explain the controlling interest',eq('h_controlling_interest','yes'))
];
const specialty=(d,s)=>['H-1B','H-1B1-CL','H-1B1-SG'].includes(s.classification);
const transportation=(d,s)=>['H-1B','H-1B2'].includes(s.classification);
const dod=(d,s)=>s.classification==='H-1B2';
I129Base.maps.h1=[
 text('h1_duties','1. Describe the proposed duties'),text('h1_experience',"2. Describe the beneficiary's present occupation and prior work experience"),
 heading('h1_specialty_heading','Statement for H-1B specialty occupations and H-1B1 Chile / Singapore',specialty),
 note('h1_specialty_statement',"By filing this petition, I agree to, and will abide by, the terms of the LCA and the petition for the duration of the beneficiary's authorized period of stay for H-1B or H-1B1 employment.\n\nI further understand that I cannot charge the beneficiary the ACWIA fee, and that any other required reimbursement will be considered an offset against wages and benefits paid relative to the LCA.\n\nI agree to the conditions of H-1B or H-1B1 employment, and agree to fully cooperate with any compliance review, evaluation, verification, or inspection conducted by USCIS. I understand that USCIS's access to the petitioning organization's headquarters, satellite locations, or the location where the beneficiary works or will work, including third-party worksites, is necessary for the purpose of determining compliance with H-1B requirements. I understand that USCIS's inability to verify facts, including due to the failure or refusal of the petitioner or third party to cooperate in an inspection or other compliance review, may result in denial or revocation of the approval of this petition or any H-1B petition for H-1B workers performing services at the location or locations that are a subject of inspection or compliance review, including third-party worksites.",specialty),
 ...signature('h1_petitioner','Petitioner',specialty),
 heading('h1_transport_heading','Statement for H-1B specialty occupations and U.S. Department of Defense projects',transportation),
 note('h1_transport_statement','As an authorized official of the employer, I certify that the employer will be liable for the reasonable costs of return transportation of the beneficiary abroad if the beneficiary is dismissed from employment by the employer before the end of the period of authorized stay.',transportation),
 ...signature('h1_employer','Authorized official of employer',transportation),
 heading('h1_dod_heading','Statement for U.S. Department of Defense projects only',dod),
 note('h1_dod_statement','I certify that the beneficiary will be working on a cooperative research and development project or a co-production project under a reciprocal government-to-government agreement administered by the U.S. Department of Defense.',dod),...signature('h1_dod','DOD project manager',dod)
];
const recruiter=eq('h2_recruiter','yes'),fees=eq('h2_fees','yes'),priorFees=eq('h2_prior_fees','yes');
const joint=(d,s)=>h2a(d,s)&&d.h2_joint==='yes';
I129Base.maps.h2=[
 f('h2_employment','1. Employment is',{type:'radio',options:['Seasonal','Peak load','Intermittent','One-time occurrence'].map(v=>[v,v])}),
 f('h2_need','2. Temporary need is',{type:'radio',options:['Unpredictable','Periodic','Recurrent annually'].map(v=>[v,v])}),
 text('h2_need_explanation',"3. Explain the temporary need for the workers' services"),
 yn('h2_prior_admission','4. Have any named beneficiaries previously been admitted in H-2A/H-2B status?',{condition:named}),text('h2_prior_explanation','Explain the previous H-2 admissions',and(named,eq('h2_prior_admission','yes')),'H supplement, Section 2, Item 4'),
 yn('h2_restart','5. Are you requesting a restart of the three-year maximum stay for any named beneficiary after an uninterrupted absence of at least 60 days?',{condition:named}),
 text('h2_absence_details','Describe the periods of absence and affected beneficiaries',and(named,eq('h2_restart','yes')),'H supplement, Section 2, Item 5'),
 note('h2_restart_evidence','Document the last three years of stays in Item 3 on the shared H page and submit evidence of each entry and exit.',and(named,eq('h2_restart','yes'))),
 yn('h2_recruiter','6. Did you or do you plan to use an agent, facilitator, staff, recruiter or similar employment service to locate or recruit workers?'),
 note('h2_recruiter_scope','List all persons and entities used for recruitment, regardless of a direct or indirect contractual relationship, whether inside or outside the United States, or whether a governmental or quasi-governmental entity.',recruiter),
 ...name('h2_recruiter_person',recruiter),f('h2_recruiter_organization','7. Recruiting organization or similar employment service (if applicable)',{required:false,condition:recruiter}),...address('h2_recruiter_address','Recruiter / agent / facilitator address',recruiter),
 f('h2_recruiters_extra','Additional recruiters: names, organizations and complete addresses (if any)',{type:'textarea',required:false,condition:recruiter,reference:'H supplement, Section 2, Item 7'}),
 heading('h2_fees_heading','Prohibited H-2A and H-2B fees'),
 note('h2_fees_note',"Items 8–13 cover job placement fees; fees or penalties for breach of contract; and other direct or indirect fees, penalties or compensation related to H-2 employment, including wage deductions. Answers cover anyone associated with employment or recruitment, including joint employers and any person or entity to which you can be considered a successor in interest. Petitioners (including their employees), employers, joint employers, agents, attorneys, facilitators, recruiters and similar employment services may receive reimbursement from the beneficiary for costs primarily for the worker's benefit, such as government-required passport fees. An employer may reimburse worker-incurred fees or expenses where specifically permitted by, and made in compliance with, statute or regulations."),
 yn('h2_fees','8. Have any requested workers paid, or agreed to pay later, prohibited employment-related fees to you or an associated employer, employee, agent, attorney, facilitator, recruiter or employment service?'),
 text('h2_fee_details','9. List the types and amounts of fees paid or to be paid',fees),
 yn('h2_reimbursed','10. Were the workers or their designees reimbursed and any agreement to pay terminated?',{condition:fees}),
 note('h2_reimbursement_evidence','Submit evidence of full reimbursement to each affected beneficiary or designee and termination of any agreement to pay.',and(fees,eq('h2_reimbursed','yes'))),
 yn('h2_fee_exception','11. Are you requesting an exception to mandatory denial or revocation for prohibited fees?',{condition:fees}),note('h2_exception_evidence','Submit evidence supporting the requested exception as described in the instructions.',and(fees,eq('h2_fee_exception','yes'))),
 yn('h2_prior_fees','12. Within the last four years, was an H-2A/H-2B petition denied or revoked due to employment-related fees, or withdrawn after a USCIS notice of intent to deny or revoke on that basis?'),note('h2_prior_fee_evidence','Submit the USCIS denial, revocation or acknowledgment of withdrawal.',priorFees),
 yn('h2_prior_reimbursed','13. Were workers or their designees reimbursed and agreements to pay terminated?',{condition:priorFees}),note('h2_prior_reimbursement_evidence','Submit evidence of full reimbursement and termination of agreements to pay.',and(priorFees,eq('h2_prior_reimbursed','yes'))),
 heading('h2_violations_heading','Other violations'),
 note('h2_violations_scope','Items 14–19 include determinations against the petitioner, any person or entity to which the petitioner is a successor in interest, and any individual acting on its behalf. Items 15, 17 and 19 also include any employee whom an H-2A or H-2B worker would reasonably believe is acting on your behalf. See the form instructions for how USCIS will use these responses when adjudicating the H-2 petition. A final USCIS decision means no pending administrative appeal, or that the time for a timely administrative appeal has passed.'),
 ...[
 [14,'Are you currently subject to debarment by the U.S. Department of Labor or, if applicable, the Governor of Guam?','final notice of debarment or administrative determinations'],
 [15,'Within the last three years, has an approved temporary labor certification been revoked by the U.S. Department of Labor or Guam Department of Labor, or have you been subject to any administrative sanction or remedy, including debarment, concluding in an assessment of civil monetary penalties?','final administrative determinations'],
 [16,'Within the last three years, have you been subject to a final USCIS denial or revocation of a prior H-2A/H-2B petition including a finding of fraud or willful misrepresentation of a material fact?','final USCIS decisions'],
 [17,'Within the last three years, has a final USCIS revocation found that a beneficiary was not employed in the petitioned capacity; statements in a petition or labor certification were untrue or inaccurate; you violated petition terms; or you violated INA 101(a)(15)(H) or paragraph (h) of 8 CFR 214.2?','final USCIS decisions'],
 [18,'Within the last three years, have you been subject to a final determination of violations under INA 274(a), 8 U.S.C. 1324(a), Bringing in and Harboring Certain Aliens, Criminal Penalties?','final determinations of violations'],
 [19,'Within the last three years, have you been subject to a final administrative or judicial determination, other than Items 14–18, finding a violation of applicable employment-related laws or regulations, including health and safety laws or regulations?','final administrative or judicial determinations']
 ].flatMap(([n,label,evidence])=>[yn('h2_violation_'+n,n+'. '+label),note('h2_evidence_'+n,'Submit a complete copy of the '+evidence+'.',eq('h2_violation_'+n,'yes'))]),
 heading('h2_obligations','Petitioner and employer obligations'),
 yn('h2_access','20. Do the H-2A/H-2B petitioner and each employer consent to Government access to all sites where labor is being or will be performed, and all housing sites for H-2A workers, to determine compliance with H-2A/H-2B requirements; and agree to USCIS interviews of employees and others with pertinent information, which may take place without the employer or its representatives and, if feasible, at a neutral location agreed to by the employee and USCIS?'),
 note('h2_access_note','Inability to verify facts, including failure or refusal to cooperate with inspection or compliance review, may result in denial or revocation.'),
 yn('h2_notify','21. Does the petitioner agree to notify DHS within two workdays, beginning on the date and in the manner specified in a Federal Register notice, of the events described below?'),
 note('h2_notify_note','Notify for failure to report within five workdays of the petition employment start date (or, for H-2A, the later petitioner-established start date); completion more than 30 days early; absence for five consecutive workdays without employer consent; or termination before completion. See USCIS H-2A/H-2B guidance for the notification method. This is a petitioner obligation, not evidence of worker wrongdoing. USCIS does not treat the notification alone as conclusive evidence of status. Workday is the period between commencing and ceasing principal activities on a day.'),
 yn('h2_retain','22. Does the petitioner agree to retain notification evidence for one year and make it available for DHS inspection?'),
 yn('h2_damages','23. Does the petitioner agree to pay $10 in liquidated damages for each instance where it cannot demonstrate compliance with notification requirements?',{condition:h2a}),
 heading('h2_part_a','Part A. Petitioner'),note('h2_part_a_text','By filing this petition, I agree to the conditions of H-2A/H-2B employment, to fully cooperate with USCIS compliance reviews, evaluations, verifications and inspections, and to the notification requirements. For H-2A petitioners, I also agree to the liquidated damages requirements defined in 8 CFR 214.2(h)(5)(vi)(B)(3).'),...signature('h2_petitioner','Petitioner'),
 yn('h2_agent','Is the petitioner acting as the employer’s agent?'),heading('h2_part_b','Part B. Employer who is not the petitioner',eq('h2_agent','yes')),note('h2_part_b_text','I certify that I have authorized the party filing this petition to act as my agent. I assume full responsibility for all representations made by this agent on my behalf and agree to the conditions of H-2A/H-2B eligibility and to fully cooperate with USCIS compliance reviews, evaluations, verifications and inspections.',eq('h2_agent','yes')),...signature('h2_employer','Employer',eq('h2_agent','yes')),
 yn('h2_joint','Are there joint employers?',{condition:h2a}),num('h2_joint_count','Number of joint employers',joint,{min:1,max:20}),
 ...Array.from({length:20},(_,i)=>{
 const p='h2_joint_'+(i+1),c=(d,s)=>joint(d,s)&&Number(d.h2_joint_count)>i;
 return [heading(p+'_heading','Part C. Joint employer '+(i+1),c),
 f(p+'_type','24. Joint employer type',{type:'radio',options:[['individual','Individual'],['organization','Company or organization']],condition:c}),
 ...name(p,and(c,eq(p+'_type','individual'))),f(p+'_company','Joint employer company or organization name',{condition:and(c,eq(p+'_type','organization'))}),
 f(p+'_care','In care of name (if any)',{condition:c,required:false}),...address(p+'_mailing','Mailing address of joint employer',c),
 ...['telephone','mobile'].map(k=>f(p+'_'+k,k==='telephone'?'Daytime telephone number':'Mobile telephone number (if any)',{type:'tel',required:k==='telephone',condition:c,validate:v=>/^[+()\d .-]+$/.test(v)&&v.replace(/\D/g,'').length>=7&&v.replace(/\D/g,'').length<=15})),f(p+'_email','Email address (if any)',{type:'email',required:false,condition:c}),
 ...['ein','itin','ssn'].map(k=>f(p+'_'+k,'25. '+k.toUpperCase()+' (if applicable)',{condition:c,required:false,...(k==='ein'?{validate:v=>/^\d{9}$/.test(v.replace(/[ -]/g,'')),message:'Enter nine digits (spaces or hyphens allowed).'}:{maxLength:9,validate:v=>/^\d{9}$/.test(v),message:'Enter exactly nine digits without spaces or hyphens.'})})),
 f(p+'_business','26. Type of business activities',{condition:c}),f(p+'_year','Year established',{condition:c,maxLength:4,validate:v=>/^\d{4}$/.test(v)&&Number(v)>0&&Number(v)<=new Date().getFullYear(),message:'Enter a four-digit year no later than this year.'}),num(p+'_employees','Current employees in the U.S.',c),
 f(p+'_gross','Gross annual income ($)',{type:'number',min:0,step:'0.01',condition:c}),f(p+'_net','Net annual income ($)',{type:'number',step:'0.01',condition:c}),
 note(p+'_certification','I agree to the conditions of H-2A eligibility employment and to fully cooperate with any USCIS compliance review, evaluation, verification or inspection.',c),
 ...name(p+'_signatory',c).filter(x=>!x.id.endsWith('middlename')),f(p+'_title','27. Title of authorized signatory',{condition:c}),f(p+'_sign','28. Signature of authorized signatory',{type:'signature',required:false,condition:c}),date(p+'_date','Date of signature',{required:false,past:true,condition:c,requiredWhen:d=>!!d[p+'_sign']})];
 }).flat(),
 note('h2_joint_limit','This prototype supports up to 20 separate joint-employer entries. Each entry represents a separate Part C.',joint)
];
I129Base.maps.h2.find(f=>f.id==='h2_recruiters_extra').required=false;
I129Base.maps.h3=[
 note('h3_note','Provide a full explanation for each Yes answer.'),
 ...[
 ['available',"1. Is the training, or similar training, available in the beneficiary's country?"],
 ['career','2. Will the training benefit the beneficiary in pursuing a career abroad?'],
 ['productive','3. Does the training involve productive employment incidental to the training?'],
 ['skills','4. Does the beneficiary already have skills related to the training?'],
 ['shortage','5. Is this training an effort to overcome a labor shortage?'],
 ['abroad','6. Do you intend to employ the beneficiary abroad at the end of this training?']
 ].flatMap(([id,label],i)=>[yn('h3_'+id,label),text('h3_'+id+'_explanation',id==='productive'?'Explain the productive employment incidental to training, including the amount of compensation and employment versus classroom training':'Explain your Yes answer',eq('h3_'+id,'yes'),'H supplement, Section 3, Item '+(i+1))]),
 text('h3_no_abroad','7. Explain why you wish to incur the training cost and your expected return if you do not intend to employ the beneficiary abroad',eq('h3_abroad','no'))
];
})();
