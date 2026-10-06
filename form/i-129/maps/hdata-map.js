/* Supplied H-1B/H-1B1 data and fee supplement, pages 21–23.
 * Fee text describes this PDF; this module does not calculate total filing fees.
 */
(function(){
'use strict';
const {f,yn,eq,and,address,date}=I129Base.helpers;
const h1b1=(d,s)=>['H-1B1-CL','H-1B1-SG'].includes(s.classification);
const h1b=(d,s)=>!h1b1(d,s);
const heading=(id,label)=>f(id,label,{type:'heading'});
const note=(id,label,condition)=>f(id,label,{type:'note',condition});
const allNo=d=>Array.from({length:8},(_,i)=>d['hd_fee_'+(i+1)]).every(v=>v==='no');
const exempt=d=>Array.from({length:8},(_,i)=>d['hd_fee_'+(i+1)]).includes('yes');
const cap=d=>['bachelor','masters'].includes(d.hd_cap_type);
const masters=eq('hd_cap_type','masters');
const full=(d,p)=>[d[p+'_firstname'],d[p+'_middlename'],d[p+'_lastname']].filter(Boolean).join(' ');
I129Base.maps.hdata=[
 f('hd_petitioner','1. Name of petitioner',{prefill:read=>{const d=read('i129-petitioner');return d.petitioner_type==='organization'?d.petitioner_company:full(d,'petitioner');}}),
 f('hd_beneficiary','2. Name of beneficiary',{prefill:read=>full(read('i129-beneficiary'),'beneficiary')}),
 heading('hd_section1','Section 1. General information'),
 yn('hd_dependent','1.a. Is the petitioner an H-1B dependent employer?'),
 yn('hd_willful','1.b. Has the petitioner ever been found to be a willful violator?'),
 yn('hd_attestation_exempt','1.c. Is the beneficiary an H-1B nonimmigrant exempt from Department of Labor attestation requirements?'),
 yn('hd_salary_exempt','1.c.1. Is it because annual pay is at least $60,000?',{condition:eq('hd_attestation_exempt','yes')}),
 yn('hd_degree_exempt',"1.c.2. Or is it because the beneficiary has a master's degree or higher in a specialty related to the employment?",{condition:eq('hd_attestation_exempt','yes')}),
 yn('hd_fifty','1.d. Does the petitioner employ 50 or more individuals in the United States?'),
 yn('hd_majority','1.d.1. Are more than 50 percent of those employees in H-1B, L-1A or L-1B status?',{condition:eq('hd_fifty','yes')}),
 f('hd_education',"2. Beneficiary's highest level of education",{type:'radio',options:[['none','a. No diploma'],['high_school','b. High school graduate diploma or equivalent (GED)'],['some_college','c. Some college credit, less than one year'],['college','d. One or more years of college, no degree'],['associate',"e. Associate's degree"],['bachelor',"f. Bachelor's degree"],['masters',"g. Master's degree"],['professional','h. Professional degree (MD, DDS, DVM, LLB, JD)'],['doctorate','i. Doctorate degree (PhD, EdD)']]}),
 f('hd_major','3. Major / primary field of study (enter N/A if not applicable)'),
 f('hd_annual_pay','4. Rate of pay per year ($)',{type:'number',min:0,step:'0.01'}),
 f('hd_soc_prefix','5. SOC code — first two digits',{maxLength:2,validate:v=>/^\d{2}$/.test(v),message:'Enter exactly two digits.',prefill:read=>{const v=read('i129-hdata').hd_soc||'';return /^\d{2}-?\d{4}$/.test(v)?v.replace('-','').slice(0,2):'';}}),
 f('hd_soc_suffix','SOC code — last four digits',{maxLength:4,validate:v=>/^\d{4}$/.test(v),message:'Enter exactly four digits.',prefill:read=>{const v=read('i129-hdata').hd_soc||'';return /^\d{2}-?\d{4}$/.test(v)?v.replace('-','').slice(2):'';}}),
 f('hd_naics','6. NAICS code',{maxLength:6,validate:v=>/^\d{6}$/.test(v),message:'Enter a six-digit NAICS code.'}),
 f('hd_required_education','7. What level of education is required for the position?'),
 f('hd_qualifying_fields','8. What fields of study would qualify someone for this position?'),
 f('hd_experience_years','9. Years of experience required to qualify',{type:'number',min:0,step:'any'}),
 f('hd_special_skills','10. What special skills are required? (enter None if none)'),
 f('hd_supervision','11. How many people will the beneficiary supervise and what are their position titles? (enter None if none)',{type:'textarea'}),
 heading('hd_section2','Section 2. Fee exemption and/or determination'),
 note('hd_fee_intro','Answer all eight questions so USCIS can determine whether the additional ACWIA fee applies.'),
 ...[
 'Are you an institution of higher education as defined in section 101(a) of the Higher Education Act of 1965, 20 U.S.C. 1001(a)?',
 'Are you a nonprofit organization or entity related to or affiliated with an institution of higher education, as defined in 8 CFR 214.2(h)(19)(iii)(B)?',
 'Are you a nonprofit research organization or governmental research organization, as defined in 8 CFR 214.2(h)(19)(iii)(C)?',
 'Is this the second or subsequent extension-of-stay request this petitioner has filed for this beneficiary?',
 'Is this an amended petition without any request for extension of stay?',
 'Are you filing to correct a USCIS error?',
 'Is the petitioner a primary or secondary education institution?',
 'Is the petitioner a nonprofit entity engaged in established curriculum-related clinical training of students registered at such an institution?'
 ].map((label,i)=>yn('hd_fee_'+(i+1),(i+1)+'. '+label)),
 note('hd_fee_exempt_note','The supplied form states that a Yes to any of Items 1–8 exempts the petition from the ACWIA fee. Item 9 does not apply.',exempt),
 yn('hd_small_employer','9. Do you currently employ 25 or fewer full-time-equivalent employees in the U.S., including all affiliates and subsidiaries?',{condition:allNo}),
 note('hd_acwia_note','For all-No answers to Items 1–8, the supplied form lists an additional ACWIA fee of $750 when Item 9 is Yes, or $1,500 when No. This is not a calculation of total filing fees.',allNo),
 note('hd_other_fee_note','The supplied form also describes a $500 Fraud Prevention and Detection fee for initial H-1B approval or a change of employer, and a $4,000 Public Law 114-113 fee when Section 1, Items 1.d and 1.d.1 are both Yes, except for an amendment without an extension. These two fees do not apply to H-1B1. Where applicable, they may not be waived. The supplied form instructs that required fees accompany the petition, that failure to submit them results in rejection or denial, and that each fee be paid by a separate check or money order. Verify the filing-date payment requirements separately.'),
 heading('hd_section3','Section 3. Numerical limitation information'),
 f('hd_cap_type','1. Type of petition (select one)',{type:'radio',options:[['bachelor',"a. Cap H-1B Bachelor's Degree"],['masters',"b. Cap H-1B U.S. Master's Degree or Higher"],['h1b1','c. Cap H-1B1 Chile / Singapore'],['exempt','d. Cap Exempt']],
 validate:(v,d,s)=>h1b1(d,s)?['h1b1','exempt'].includes(v):v!=='h1b1',message:'Choose a cap type consistent with the classification in Petition Setup.'}),
 f('hd_wage_level','2. Wage level (follow the form instructions)',{type:'radio',condition:cap,options:[['IV','Wage Level IV'],['III','Wage Level III'],['II','Wage Level II'],['I','Wage Level I']]}),
 f('hd_us_institution','3.a. Name of the U.S. institution of higher education',{condition:masters}),
 date('hd_degree_awarded','3.b. Date degree awarded',{condition:masters,past:true}),
 f('hd_us_degree','3.c. Type of United States degree',{condition:masters}),
 ...address('hd_institution_address','3.d. Address of the U.S. institution of higher education',masters,true),
 f('hd_cap_reasons','4. Reason(s) for exemption from the H-1B numerical limitation (select all that apply)',{type:'checkboxes',condition:eq('hd_cap_type','exempt'),options:[
 ['a','a. Institution of higher education under section 101(a) of the Higher Education Act, 20 U.S.C. 1001(a).'],
 ['b','b. Nonprofit entity related to or affiliated with an institution of higher education under 8 CFR 214.2(h)(8)(iii)(F)(2).'],
 ['c','c. Nonprofit research organization or governmental research organization under 8 CFR 214.2(h)(8)(iii)(F)(3).'],
 ['d','d. Beneficiary employed at a qualifying cap-exempt institution, organization or entity under 8 CFR 214.2(h)(8)(iii)(F)(4).'],
 ['e','e. Beneficiary currently employed at a cap-exempt institution, organization or entity; petitioner seeks concurrent H-1B employment.'],
 ['f','f. J-1 nonimmigrant physician with a waiver under section 214(l) of the Act.'],
 ['g','g. Beneficiary previously counted against the cap: remaining six-year admission, an extension beyond six years under AC21 sections 104(c) or 106(a), or an amendment of a petition in that period or extension.'],
 ['h','h. Employer subject to the Guam-CNMI cap exemption under Public Law 110-229.']]}),
 f('hd_section4','Section 4. Off-site assignment of H-1B beneficiaries',{type:'heading',condition:h1b}),
 yn('hd_offsite','1. Will the beneficiary work at an off-site location for all or part of the requested H-1B period?',{condition:h1b}),
 yn('hd_offsite_compliance','2. Will off-site placement comply with statutory and regulatory H-1B requirements?',{condition:and(h1b,eq('hd_offsite','yes'))}),
 yn('hd_offsite_wage','3. Will the beneficiary receive the higher of the prevailing or actual wage at every off-site location?',{condition:and(h1b,eq('hd_offsite','yes'))})
];
})();
