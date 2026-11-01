/* I-751 Part 2: PDF page 2. */
(function(root){
'use strict';
const {f}=root.I751Base.helpers;
const choices=(id,label,options,multiple=false)=>f(id,label,{type:multiple?'checkboxes':'radio',required:true,options,pdf:null,pdfCheckboxes:Object.fromEntries(options.map(([value])=>[value,id+'_'+value]))});
root.I751Base.maps['biographic-info']=[
 choices('ethnicity','1. Ethnicity (select only one)',[['hispanic','Hispanic or Latino'],['not_hispanic','Not Hispanic or Latino']]),
 choices('race','2. Race (select all applicable)',[['white','White'],['asian','Asian'],['black','Black or African American'],['american_indian','American Indian or Alaska Native'],['pacific_islander','Native Hawaiian or Other Pacific Islander']],true),
 f('height_feet','3. Height — Feet',{type:'select',required:true,options:Array.from({length:9},(_,i)=>[String(i),String(i)])}),
 f('height_inches','3. Height — Inches',{type:'select',required:true,options:Array.from({length:12},(_,i)=>[String(i),String(i)])}),
 f('weight_pounds','4. Weight — Pounds',{type:'number',required:true,min:1,max:999,step:1,pdf:null,pdfDigits:['weight_pounds_1','weight_pounds_2','weight_pounds_3']}),
 choices('eye_color','5. Eye Color (select only one)',[['black','Black'],['blue','Blue'],['brown','Brown'],['gray','Gray'],['green','Green'],['hazel','Hazel'],['maroon','Maroon'],['pink','Pink'],['unknown','Unknown/Other']]),
 choices('hair_color','6. Hair Color (select only one)',[['bald','Bald (No hair)'],['black','Black'],['blond','Blond'],['brown','Brown'],['gray','Gray'],['red','Red'],['sandy','Sandy'],['white','White'],['unknown','Unknown/Other']])
];
})(typeof window==='undefined'?globalThis:window);
