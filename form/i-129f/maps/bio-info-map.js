(function(){
'use strict';
const {f}=I129FBase.helpers;
I129FBase.maps['bio-info']=[
 f('ethnicity','1. Ethnicity (select one)',{type:'radio',options:[['hispanic','Hispanic or Latino'],['not_hispanic','Not Hispanic or Latino']]}),
 f('race','2. Race (select all applicable)',{type:'checkboxes',options:[['white','White'],['asian','Asian'],['black','Black or African American'],['native','American Indian or Alaska Native'],['pacific','Native Hawaiian or Other Pacific Islander']]}),
 f('height_feet','3. Height — feet',{type:'number',min:1,max:9,step:1}),
 f('height_inches','3. Height — inches',{type:'number',min:0,max:11,step:1}),
 f('weight','4. Weight — pounds',{type:'number',min:1,max:999,step:1}),
 f('eye_color','5. Eye color (select one)',{type:'radio',options:[['Black','Black'],['Blue','Blue'],['Brown','Brown'],['Gray','Gray'],['Green','Green'],['Hazel','Hazel'],['Maroon','Maroon'],['Pink','Pink'],['Other','Unknown/Other']]}),
 f('hair_color','6. Hair color (select one)',{type:'radio',options:[['Bald','Bald (No hair)'],['Black','Black'],['Blond','Blond'],['Brown','Brown'],['Gray','Gray'],['Red','Red'],['Sandy','Sandy'],['White','White'],['Unknown','Unknown/Other']]})
];
})();
