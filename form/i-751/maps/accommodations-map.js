/* I-751 Part 6: PDF page 5. */
(function(root){
'use strict';
const {f,yn}=root.I751Base.helpers;
const requested=d=>['accommodation_you','accommodation_spouse','accommodation_children'].some(id=>d[id]==='yes');
const selected=(d,value)=>requested(d)&&String(d.accommodation_types||'').split(',').includes(value);
root.I751Base.maps.accommodations=[
 f('accommodation_note','Read the information in the Form I-751 Instructions before completing this part.',{type:'note',pdf:null}),
 yn('accommodation_you','1. Are you requesting an accommodation because of your disabilities and/or impairments?'),
 yn('accommodation_spouse','2. Are you requesting an accommodation because of your spouse’s disabilities and/or impairments?'),
 yn('accommodation_children','3. Are you requesting an accommodation because of your included children’s disabilities and/or impairments?'),
 f('accommodation_details_note','Select all applicable accommodations and provide information on the disabilities and/or impairments for each person. Identify the person or people in each description.',{type:'note',pdf:null,condition:requested}),
 f('accommodation_types','4. Requested accommodations (select all applicable)',{type:'checkboxes',required:false,pdf:null,condition:requested,options:[['hearing','4.a. I am deaf or hard of hearing.'],['vision','4.b. I am blind or have low vision.'],['other','4.c. I have another type of disability and/or impairment.']],pdfCheckboxes:{hearing:'accommodation_hearing',vision:'accommodation_vision',other:'accommodation_other'}}),
 f('accommodation_hearing_details','4.a. Describe the requested accommodation for each person. If requesting a sign-language interpreter, indicate which language (for example, American Sign Language).',{type:'textarea',required:false,condition:d=>selected(d,'hearing')}),
 f('accommodation_vision_details','4.b. Describe the requested accommodation for each person who is blind or has low vision.',{type:'textarea',required:false,condition:d=>selected(d,'vision')}),
 f('accommodation_other_details','4.c. Describe the nature of the disability and/or impairment and the accommodation requested for each person.',{type:'textarea',required:false,condition:d=>selected(d,'other')})
];
})(typeof window==='undefined'?globalThis:window);
