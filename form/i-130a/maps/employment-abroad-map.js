(function(){
'use strict';
const {f,eq,date,yn,address}=I130ABase.helpers;
const needed=eq('foreign_employment_history','not_listed');
I130ABase.maps['employment-abroad']=[
 f('foreign_employment_note','Provide your last occupation outside the United States if not shown in Part 2. If you never worked outside the United States, provide that information in Part 7.',{type:'note'}),
 f('foreign_employment_history','Employment outside the United States',{type:'radio',options:[['not_listed','I worked outside the United States and my last occupation is not listed in Part 2'],['listed','My last occupation outside the United States is already listed in Part 2'],['never','I have never worked outside the United States']]}),
 f('foreign_employment_explanation','Information for Part 7',{type:'textarea',condition:eq('foreign_employment_history','never'),prefill:()=> 'I have never worked outside the United States.',reference:'Part 3, Employment Outside the United States'}),
 f('foreign_employer_name','1. Name of employer/company',{condition:needed}),
 ...address('foreign_employer','2. Employer address',needed),
 f('foreign_employer_occupation','3. Your occupation',{condition:needed}),
 date('foreign_employer_from','4.a. Date from',{condition:needed}),
 date('foreign_employer_to','4.b. Date to',{condition:needed,after:'foreign_employer_from'})
];
})();
