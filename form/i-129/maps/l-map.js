/* L Classification Supplement, supplied pages 24–27. */
(function(){
'use strict';
const {f,yn,eq,and,address,date}=I129Base.helpers;
const individual=(d,s)=>['L-1A','L-1B'].includes(s.classification);
const blanket=(d,s)=>s.classification==='L-BLANKET';
const specialized=(d,s)=>s.classification==='L-1B';
const offsite=and(specialized,eq('l_offsite','yes'));
const heading=(id,label,condition)=>f(id,label,{type:'heading',condition});
const note=(id,label,condition)=>f(id,label,{type:'note',condition});
const text=(id,label,condition,reference,required=true)=>f(id,label,{type:'textarea',condition,reference,required});
const count=(id,label,condition,min=0)=>f(id,label,{type:'number',min,max:30,step:1,condition});
const full=(d,p)=>[d[p+'_firstname'],d[p+'_middlename'],d[p+'_lastname']].filter(Boolean).join(' ');
const row=(id,n,condition)=>(d,s)=>condition(d,s)&&Number(d[id])>=n;
const relations=['Parent','Branch','Subsidiary','Affiliate','Joint Venture'];
I129Base.maps.l=[
 f('l_petitioner','1. Name of petitioner',{prefill:read=>{const d=read('i129-petitioner');return d.petitioner_type==='organization'?d.petitioner_company:full(d,'petitioner');}}),
 f('l_beneficiary','2. Name of beneficiary',{condition:individual,prefill:read=>full(read('i129-beneficiary'),'beneficiary')}),
 f('l_petition_type','3. This petition is',{readonly:true,derive:(d,s)=>s.classification==='L-BLANKET'?'Blanket petition':'Individual petition'}),
 note('l_setup_note','Petition type and classification come from Petition Setup. Change them there to update the questionnaire route.'),
 yn('l_fifty','4.a. Does the petitioner employ 50 or more individuals in the U.S.?'),
 yn('l_majority','4.b. Are more than 50 percent of those employees in H-1B, L-1A or L-1B nonimmigrant status?',{condition:eq('l_fifty','yes')}),
 heading('l_section1','Section 1. Individual petition',individual),
 f('l_classification','1. Classification sought',{readonly:true,condition:individual,derive:(d,s)=>s.classification==='L-1A'?'L-1A manager or executive':'L-1B specialized knowledge'}),
 note('l_history_note',"2. List the beneficiary's and dependent family members' periods physically present in H or L status during the last seven years. Exclude dependent status such as H-4 or L-2. Submit copies of I-94, I-797 or other USCIS documents identifying the stays.",individual),
 count('l_stay_count','Number of prior H/L stay entries',individual),
 ...Array.from({length:30},(_,i)=>{const n=i+1,c=row('l_stay_count',n,individual),p='l_stay_'+n;return [heading(p+'_heading','Prior stay '+n,c),f(p+'_name',"Subject's name",{condition:c}),date(p+'_from','From',{condition:c,past:true}),date(p+'_to','To',{condition:c,past:true,after:p+'_from'})];}).flat(),
 text('l_stays_extra','Additional stay history (if needed)',individual,'L supplement, Section 1, Item 2',false),
 f('l_foreign_employer','3. Name of employer abroad',{condition:individual}),
 ...address('l_foreign_address','4. Address of employer abroad',individual),
 count('l_employment_count','5. Number of employment periods with this employer',individual,1),
 ...Array.from({length:30},(_,i)=>{const n=i+1,c=row('l_employment_count',n,individual),p='l_employment_'+n;return [heading(p+'_heading','Employment period '+n,c),date(p+'_from','From',{condition:c,past:true}),date(p+'_to','To',{condition:c,past:true,after:p+'_from'}),text(p+'_interruptions','Explain interruptions in employment (if any)',c,undefined,false)];}).flat(),
 text('l_employment_extra','Additional employment periods or interruptions (if needed)',individual,'L supplement, Section 1, Item 5',false),
 text('l_foreign_duties',"6. Describe duties abroad for the three years before filing. If the beneficiary is currently in the U.S., describe duties abroad for the three years before admission to the U.S.",individual),
 text('l_us_duties',"7. Describe the beneficiary's proposed duties in the United States",individual),
 text('l_qualifications',"8. Summarize the beneficiary's education and work experience",individual),
 f('l_relationship','9. How is the U.S. company related to the company abroad?',{type:'radio',options:relations.map(v=>[v,v]),condition:individual}),
 count('l_company_count','10. Number of companies with a qualifying relationship',individual,1),
 ...Array.from({length:30},(_,i)=>{const n=i+1,c=row('l_company_count',n,individual),p='l_company_'+n;return [heading(p+'_heading','Qualifying company '+n,c),text(p+'_ownership','Identify the company and describe percentage of stock ownership and managerial control',c),yn(p+'_us','Is this a U.S. company?',{condition:c}),f(p+'_fein','Federal Employer Identification Number (FEIN)',{condition:and(c,eq(p+'_us','yes')),validate:v=>/^\d{9}$/.test(v.replace(/[ -]/g,'')),message:'Enter a nine-digit FEIN (hyphen allowed).'})];}).flat(),
 text('l_companies_extra','Additional qualifying companies: ownership, control and U.S. FEINs (if needed)',individual,'L supplement, Section 1, Item 10',false),
 yn('l_same_relationship',"11. Do the companies currently have the same qualifying relationship as during the beneficiary's one-year employment period with the company abroad?",{condition:individual}),
 text('l_relationship_explanation','Explain how the U.S. company has and will have a qualifying relationship with another foreign entity throughout the requested stay',and(individual,eq('l_same_relationship','no')),'L supplement, Section 1, Item 11'),
 yn('l_new_office','12. Is the beneficiary coming to the U.S. to open a new office?',{condition:individual}),
 text('l_no_new_office','Explain your No answer',and(individual,eq('l_new_office','no')),'L supplement, Section 1, Item 12'),
 yn('l_offsite','13.a. Will the beneficiary be stationed primarily off-site, at the worksite of an employer other than the petitioner or its affiliate, subsidiary or parent?',{condition:specialized}),
 text('l_offsite_supervision',"13.b. Describe how and by whom the beneficiary's work will be controlled and supervised, including how much time each supervisor will spend controlling and supervising the work",offsite),
 text('l_offsite_reason',"13.c. Explain why placement outside the petitioner, subsidiary, affiliate or parent is needed and how the duties at that worksite relate to the beneficiary's specialized knowledge",offsite),
 heading('l_section2','Section 2. Blanket petition',blanket),
 note('l_blanket_note','List all U.S. and foreign parents, branches, subsidiaries and affiliates included in this petition.',blanket),
 count('l_blanket_count','Number of organizations included',blanket,1),
 ...Array.from({length:30},(_,i)=>{const n=i+1,c=row('l_blanket_count',n,blanket),p='l_blanket_'+n;return [heading(p+'_heading','Organization '+n,c),f(p+'_name','Organization name',{condition:c}),...address(p+'_address','Organization address',c),f(p+'_relationship','Relationship',{condition:c})];}).flat(),
 text('l_blanket_extra','Additional organizations: names, complete addresses and relationships (if needed)',blanket,'L supplement, Section 2',false),
 heading('l_section3','Section 3. Additional fees'),
 note('l_fee_note','The supplied PDF states that a petitioner seeking initial L status approval or approval to employ an L worker currently working for another employer must submit an additional $500 Fraud Prevention and Detection fee.\n\nIt also lists a $4,500 Public Law 114-113 fee when both Items 4.a and 4.b are Yes, except for an amended petition that does not seek an extension of the current authorized L-1 stay.\n\nThe PDF states that applicable fees may not be waived, must accompany the petition, and that failure to include required fees results in rejection or denial. It instructs separate checks or money orders for each fee. This text describes the supplied PDF; verify payment requirements for the filing date. This page does not calculate total filing fees.')
];
})();
