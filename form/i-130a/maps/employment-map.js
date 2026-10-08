/* Part 2 begins on supplied PDF page 2. */
(function(){
'use strict';
const {f,eq,heading,date,yn,address}=I130ABase.helpers;
const employed=d=>String(d.employer_1_name||'').trim().toLowerCase()!=='unemployed';
const second=eq('has_employer_2','yes');
I130ABase.maps.employment=[
 f('employment_note','Provide your employment history for the last five years, inside or outside the United States. List your current employment first. If currently unemployed, enter Unemployed as the name of Employer 1. Use the additional-history box for extra entries.',{type:'note'}),
 heading('employer_1_heading','Employer 1 (current employment)'),
 f('employer_1_name','1. Name of employer/company (enter Unemployed if currently unemployed)'),
 ...address('employer_1','2. Employer 1 address',employed),
 f('employer_1_occupation','3. Your occupation',{condition:employed}),
 date('employer_1_from','4.a. Date from'),
 f('employer_1_to','4.b. Date to',{readonly:true,derive:()=>'PRESENT'}),
 yn('has_employer_2','Do you have another employer to report for the last five years?'),
 f('employer_2_name','5. Name of employer/company',{condition:second}),
 ...address('employer_2','6. Employer 2 address',second),
 f('employer_2_occupation','7. Your occupation',{condition:second}),
 date('employer_2_from','8.a. Date from',{condition:second}),
 date('employer_2_to','8.b. Date to',{condition:second,after:'employer_2_from'}),
 f('employment_history_extra','Additional employment history for the last five years (if needed)',{type:'textarea',required:false,reference:'Part 2, Employment History'})
];
})();
