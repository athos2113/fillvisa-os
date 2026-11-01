/* I-751 Part 3, PDF page 3. */
(function(root){
'use strict';
const {f}=root.I751Base.helpers;
root.I751Base.maps['basis-for-petition']=[
 f('filing_type','How are you filing this petition?',{type:'radio',required:true,pdf:null,options:[['joint','Joint Filing'],['waiver','Waiver or Individual Filing Request']]}),
 f('joint_note','My conditional residence is based on my marriage or my parent’s marriage to a U.S. citizen or lawful permanent resident, and I am filing this joint petition together with:',{type:'note',pdf:null,condition:d=>d.filing_type==='joint'}),
 f('joint_filing','Joint Filing (select only one)',{type:'radio',required:true,pdf:null,condition:d=>d.filing_type==='joint',options:[['spouse','1.a. My spouse.'],['parent_spouse','1.b. My parent’s spouse because I am unable to be included in a joint petition filed by my parent and my parent’s spouse.']],pdfCheckboxes:{spouse:'joint_filing_spouse',parent_spouse:'joint_filing_parent_spouse'}}),
 f('waiver_note','My conditional residence is based on my marriage or my parent’s marriage to a U.S. citizen or lawful permanent resident. I am unable to file a joint petition with my spouse or my parent’s spouse, because:',{type:'note',pdf:null,condition:d=>d.filing_type==='waiver'}),
 f('waiver_basis','Waiver or Individual Filing Request (select all applicable)',{type:'checkboxes',required:true,pdf:null,condition:d=>d.filing_type==='waiver',options:[
 ['deceased','1.c. My spouse is deceased.'],
 ['divorce','1.d. My marriage was entered in good faith, but the marriage was terminated through divorce or annulment.'],
 ['spouse_abuse','1.e. I entered the marriage in good faith, and, during the marriage, I was battered, or was the subject of extreme cruelty, by my U.S. citizen or lawful permanent resident spouse.'],
 ['parent_spouse_abuse','1.f. My parent entered the marriage in good faith, and, during the marriage, I was battered, or was subjected to extreme cruelty, by my parent’s U.S. citizen or lawful permanent resident spouse or by my conditional resident parent.'],
 ['hardship','1.g. The termination of my status and removal from the United States would result in an extreme hardship.']
 ],pdfCheckboxes:{deceased:'waiver_deceased',divorce:'waiver_divorce',spouse_abuse:'waiver_spouse_abuse',parent_spouse_abuse:'waiver_parent_spouse_abuse',hardship:'waiver_hardship'}})
];
})(typeof window==='undefined'?globalThis:window);
