/* E-1/E-2 supplement, supplied pages 9–10. */
(function(){
'use strict';
const {f,yn,eq,address,name,date}=I129Base.helpers;
const foreign=eq('e_foreign_employer','yes');
const trader=(d,s)=>s.classification==='E-1';
const investor=(d,s)=>['E-2','E-2-CNMI'].includes(s.classification);
const money=(id,label,extra={})=>f(id,label,{type:'number',step:'0.01',...extra});
const number=(id,label,extra={})=>f(id,label,{type:'number',min:0,step:1,...extra});
const investments=['cash','equipment','other','inventory','premises'];
I129Base.maps.e=[
 f('e_petitioner_name','1. Name of the petitioner',{prefill:read=>{const p=read('i129-petitioner');return p.petitioner_type==='organization'?p.petitioner_company:[p.petitioner_firstname,p.petitioner_middlename,p.petitioner_lastname].filter(Boolean).join(' ');}}),
 ...name('e_beneficiary').map(field=>({...field,prefill:read=>read('i129-beneficiary')[field.id.replace('e_beneficiary','beneficiary')]})),
 f('e_classification','3. Classification sought',{readonly:true,derive:(d,s)=>({'E-1':'E-1 Treaty Trader','E-2':'E-2 Treaty Investor','E-2-CNMI':'E-2 CNMI Investor'})[s.classification]||''}),
 f('e_classification_note','To change classification, return to Petition Setup.',{type:'note'}),
 f('e_treaty_country','4. Country signatory to the treaty with the United States',{condition:(d,s)=>s.classification!=='E-2-CNMI'}),
 yn('e_substantive_advice','5. Are you seeking USCIS advice on whether changes in the terms or conditions of E status for one or more employees are substantive?'),
 f('e_section1','Section 1. Employer outside the United States (if any)',{type:'heading'}),
 yn('e_foreign_employer','Is there an employer outside the United States?'),
 f('e_foreign_name','1. Foreign employer name',{condition:foreign}),
 number('e_foreign_employees','2. Total number of employees',{condition:foreign}),
 ...address('e_foreign_address','3. Foreign employer address',foreign),
 f('e_foreign_product','4. Principal product, merchandise or service',{type:'textarea',condition:foreign}),
 f('e_foreign_position','5. Employee position: title, duties and number of years employed',{type:'textarea',condition:foreign}),
 f('e_section2','Section 2. Additional information about the U.S. employer',{type:'heading'}),
 f('e_company_relationship','1. How is the U.S. company related to the company abroad?',{type:'radio',options:['Parent','Branch','Subsidiary','Affiliate','Joint Venture'].map(v=>[v,v]),condition:foreign}),
 f('e_established_place','2.a. Place of incorporation or establishment in the United States'),
 date('e_established_date','2.b. Date of incorporation or establishment',{past:true}),
 f('e_owners_heading','3. Nationality of ownership (individual or corporate)',{type:'heading'}),
 f('e_owner_count','Number of owners to enter',{type:'select',options:Array.from({length:7},(_,i)=>[String(i+1),String(i+1)])}),
 ...Array.from({length:7},(_,i)=>{
  const n=i+1;const condition=d=>Number(d.e_owner_count)>=n;
  return [f('e_owner_'+n+'_heading','Owner '+n,{type:'heading',condition}),
   f('e_owner_'+n+'_name','Owner '+n+': name (first / middle / last or corporate name)',{condition}),
   f('e_owner_'+n+'_nationality','Owner '+n+': nationality',{condition}),
   f('e_owner_'+n+'_status','Owner '+n+': immigration status (enter N/A if not applicable)',{condition}),
   f('e_owner_'+n+'_percent','Owner '+n+': percent of ownership',{type:'number',min:0,max:100,step:'any',condition,
    validate:(v,d)=>Array.from({length:Number(d.e_owner_count)||0},(_,j)=>Number(d['e_owner_'+(j+1)+'_percent'])||0).reduce((a,b)=>a+b,0)<=100.000001,
    message:'The combined ownership percentages cannot exceed 100%.'})];
 }).flat(),
 f('e_owners_extra','Additional owners or ownership explanation (if needed)',{type:'textarea',required:false,reference:'E supplement, Section 2, Item 3'}),
 money('e_assets','4. Assets ($)',{min:0}),money('e_net_worth','5. Net worth ($)'),money('e_net_income','6. Net annual income ($)'),
 f('e_staff_heading','7. Staff in the United States',{type:'heading'}),
 number('e_treaty_managers','7.a. Executive / managerial employees who are treaty-country nationals in E, L or H status'),
 number('e_special_staff','7.b. Employees with special qualifications in E, L or H status'),
 number('e_total_managers','7.c. Total executive / managerial employees in the United States'),
 number('e_special_positions','7.d. Total U.S. positions requiring special qualifications'),
 f('e_employee_basis','8. Is the employee qualifying as an executive / manager or based on special qualifications?',{type:'select',options:[['manager','Executive or manager'],['special','Special qualifications'],['neither','Not applicable — principal trader / investor']]}),
 number('e_supervised_count','Total number of employees the worker will supervise',{condition:eq('e_employee_basis','manager')}),
 f('e_essential_qualifications','Explain why the special qualifications are essential to successful or efficient operation of the treaty enterprise',{type:'textarea',condition:eq('e_employee_basis','special')}),
 f('e_section3','Section 3. E-1 Treaty Trader',{type:'heading',condition:trader}),
 money('e_annual_trade','1. Total annual gross trade / business of the U.S. company ($)',{min:0,condition:trader}),
 f('e_trade_year','2. For year ending (YYYY)',{condition:trader,maxLength:4,validate:v=>/^\d{4}$/.test(v)&&Number(v)>0,message:'Enter a four-digit year.'}),
 f('e_trade_percent','3. Percent of total gross trade between the U.S. and treaty trader country',{type:'number',min:0,max:100,step:'any',condition:trader}),
 f('e_section4','Section 4. E-2 Treaty Investor — total investment',{type:'heading',condition:investor}),
 ...investments.map(k=>money('e_investment_'+k,k[0].toUpperCase()+k.slice(1)+' ($)',{min:0,condition:investor})),
 money('e_investment_total','Total investment ($)',{min:0,readonly:true,condition:investor,derive:d=>investments.every(k=>d['e_investment_'+k]!==''&&d['e_investment_'+k]!==undefined)?(investments.reduce((sum,k)=>sum+Math.round(Number(d['e_investment_'+k])*100),0)/100).toFixed(2):''})
];
})();
