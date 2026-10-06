/* Trade Agreement Supplement, supplied pages 11–12. */
(function(){
'use strict';
const {f,yn,eq,address,name,date}=I129Base.helpers;
const prepared=eq('trade_has_preparer','yes');
const phone=v=>/^[+()\d .-]+$/.test(v)&&v.replace(/\D/g,'').length>=7&&v.replace(/\D/g,'').length<=15;
const tel=(id,label,required=true,extra={})=>f(id,label,{type:'tel',required,validate:phone,message:'Enter a telephone number containing 7–15 digits.',...extra});
const email=(id,extra={})=>f(id,'Email address (if any)',{type:'email',required:false,...extra});
const fullName=(d,prefix)=>[d[prefix+'_firstname'],d[prefix+'_middlename'],d[prefix+'_lastname']].filter(Boolean).join(' ');
const choices={'TN-CA':'canada','TN-MX':'mexico','H-1B1-CL':'chile','H-1B1-SG':'singapore'};
const prefill=(key,id)=>read=>read(key)[id]||'';
I129Base.maps.trade=[
 f('trade_petitioner_name','1. Name of the petitioner',{prefill:read=>{const d=read('i129-petitioner');return d.petitioner_type==='organization'?d.petitioner_company:fullName(d,'petitioner');}}),
 f('trade_beneficiary_name','2. Name of the beneficiary',{prefill:read=>fullName(read('i129-beneficiary'),'beneficiary')}),
 f('trade_employer_type','3. Employer is',{type:'radio',options:[['us','U.S. Employer'],['foreign','Foreign Employer']]}),
 f('trade_foreign_country','4. Name the foreign country',{condition:eq('trade_employer_type','foreign')}),
 f('trade_section1','Section 1. Information about requested extension or change',{type:'heading'}),
 f('trade_status','1. This request for Free Trade status is based on',{type:'radio',options:[['canada','a. Free Trade, Canada (TN1)'],['mexico','b. Free Trade, Mexico (TN2)'],['chile','c. Free Trade, Chile (H-1B1)'],['singapore','d. Free Trade, Singapore (H-1B1)'],['other','e. Free Trade, Other'],['sixth','f. A sixth consecutive request for Free Trade, Chile or Singapore (H-1B1)']],
  validate:(v,d,s)=>v==='other'||v===choices[s.classification]||(v==='sixth'&&['H-1B1-CL','H-1B1-SG'].includes(s.classification)),
  message:'Choose the option matching Petition Setup. The sixth consecutive request option is only for H-1B1 Chile / Singapore.'}),
 f('trade_route_note','Select one option. If the requested classification changes, update Petition Setup so the other supplements remain correct.',{type:'note'}),
 f('trade_section2',"Section 2. Petitioner's declaration, signature, and contact information",{type:'heading'}),
 f('trade_petitioner_declaration',"Copies of any documents submitted are exact photocopies of unaltered, original documents, and I understand that, as the petitioner, I may be required to submit original documents to U.S. Citizenship and Immigration Services (USCIS) at a later date.\n\nI authorize the release of any information from my records, or from the petitioning organization's records that USCIS needs to determine eligibility for the immigration benefit sought. I recognize the authority of USCIS to conduct audits of this petition using publicly available open source information. I also recognize that any supporting evidence submitted in support of this petition may be verified by USCIS through any means determined appropriate by USCIS, including but not limited to, on-site compliance reviews.\n\nI certify, under penalty of perjury, that I have reviewed this petition and that all of the information contained in the petition, including all responses to specific questions, and in the supporting documents, is complete, true, and correct.\n\nI am filing this petition on behalf of an organization and I certify that I am authorized to do so by the organization.",{type:'note'}),
 ...name('trade_signatory').filter(x=>!x.id.endsWith('middlename')).map(x=>({...x,prefill:read=>read('i129-declaration')[x.id.replace('trade_signatory','signatory')]||read('i129-petitioner')[x.id.replace('trade_signatory','petitioner')]||''})),
 f('trade_petitioner_sign','2. Signature of petitioner',{type:'signature',required:false}),
 date('trade_petitioner_sign_date','Date of signature',{required:false,past:true,requiredWhen:d=>!!d.trade_petitioner_sign}),
 tel('trade_petitioner_telephone','3. Daytime telephone number',true,{prefill:prefill('i129-petitioner','petitioner_telephone')}),
 tel('trade_petitioner_mobile','Mobile telephone number (if any)',false,{prefill:prefill('i129-petitioner','petitioner_mobile')}),
 email('trade_petitioner_email',{prefill:prefill('i129-petitioner','petitioner_email')}),
 f('trade_section3','Section 3. Person preparing this supplement, if other than petitioner',{type:'heading'}),
 yn('trade_has_preparer','Did someone other than the petitioner prepare this supplement?',{prefill:prefill('i129-setup','preparer')}),
 ...name('trade_preparer',prepared).filter(x=>!x.id.endsWith('middlename')).map(x=>({...x,prefill:prefill('i129-preparer',x.id.replace('trade_',''))})),
 f('trade_preparer_company',"2. Preparer's business or organization name (if any)",{required:false,condition:prepared,prefill:prefill('i129-preparer','preparer_company')}),
 f('trade_preparer_org_note','If applicable, provide the name of the accredited organization recognized by the Board of Immigration Appeals (BIA).',{type:'note',condition:prepared}),
 ...address('trade_preparer_mailing',"3. Preparer's mailing address",prepared).map(x=>({...x,prefill:prefill('i129-preparer',x.id.replace('trade_',''))})),
 tel('trade_preparer_telephone','4. Daytime telephone number',true,{condition:prepared,prefill:prefill('i129-preparer','preparer_telephone')}),
 tel('trade_preparer_fax','Fax number (if any)',false,{condition:prepared,prefill:prefill('i129-preparer','preparer_fax')}),
 email('trade_preparer_email',{condition:prepared,prefill:prefill('i129-preparer','preparer_email')}),
 f('trade_preparer_declaration',I129Base.maps.preparer.find(x=>x.id==='preparer_declaration').label,{type:'note',condition:prepared}),
 f('trade_preparer_sign','5. Signature of preparer',{type:'signature',required:false,condition:prepared}),
 date('trade_preparer_sign_date','Date of signature',{required:false,past:true,condition:prepared,requiredWhen:d=>!!d.trade_preparer_sign})
];
})();
