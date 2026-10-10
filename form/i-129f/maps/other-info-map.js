(function(){
'use strict';
const {f,heading,yn,eq}=I129FBase.helpers;
I129FBase.maps['other-info']=[
 heading('criminal_heading','Criminal Information'),
 f('criminal_note','These criminal information questions must be answered even if your records were sealed, cleared, or otherwise changed, or if anyone, including a judge, law enforcement officer, or attorney, told you that you no longer have a record. If you need extra space, use the additional-information box for Part 8.',{type:'note'}),
 yn('protection_order','1. Have you EVER been subject to a temporary or permanent protection or restraining order (either civil or criminal)?'),
 f('arrest_note','Have you EVER been arrested or convicted of any of the following crimes?',{type:'note'}),
 yn('domestic_violence_crime','2.a. Domestic violence, sexual assault, child abuse, child neglect, dating violence, elder abuse, stalking, or an attempt to commit any of these crimes?'),
 f('domestic_definition_note','See Part 3, Other Information, Items 1–3.c of the instructions for the full definition of domestic violence.',{type:'note'}),
 yn('specified_violent_crime','2.b. Homicide, murder, manslaughter, rape, abusive sexual contact, sexual exploitation, incest, torture, trafficking, peonage, holding hostage, involuntary servitude, slave trade, kidnapping, abduction, unlawful criminal restraint, false imprisonment, or an attempt to commit any of these crimes?'),
 yn('substance_arrests','2.c. Three or more arrests or convictions, not from a single act, for crimes relating to a controlled substance or alcohol?'),
 f('criminal_records_note','If you were arrested or convicted of any specified crimes, submit certified copies of all court and police records showing the charges and disposition for every arrest or conviction. You must do so even if records were sealed, expunged, or otherwise cleared, and regardless of whether anyone told you that you no longer have a criminal record.',{type:'note'}),
 f('abuse_circumstances','3. If you provided conviction information in Items 2.a–2.c and were being battered or subjected to extreme cruelty at the time, select all that apply.',{type:'checkboxes',required:false,options:[['self_defense','3.a. I was acting in self-defense.'],['protection_order','3.b. I violated a protection order issued for my own protection.'],['no_serious_injury','3.c. I committed, was arrested for, was convicted of, or pled guilty to a crime that did not result in serious bodily injury and there was a connection between the crime and my having been battered or subjected to extreme cruelty.']],condition:d=>['domestic_violence_crime','specified_violent_crime','substance_arrests'].some(id=>d[id]==='yes')}),
 yn('other_arrests','4.a. Have you ever been arrested, cited, charged, indicted, convicted, fined, or imprisoned for breaking or violating any law or ordinance in any country, excluding traffic violations (unless a traffic violation was alcohol- or drug-related or involved a fine of $500 or more)?'),
 f('other_arrests_note','Provide information about each arrest, citation, charge, indictment, conviction, fine, or imprisonment. If you were the subject of an order of protection or restraining order and believe you are the victim, explain those circumstances and provide evidence to support your claims. Include dates and outcomes.',{type:'note',condition:eq('other_arrests','yes')}),
 f('other_arrests_explanation','4.b. Explanation, dates, and outcomes',{type:'textarea',condition:eq('other_arrests','yes'),reference:'Part 3, Item 4.b'}),
 f('criminal_information_extra','Additional criminal information (if needed)',{type:'textarea',required:false,reference:'Part 3, Items 1–4.b'}),
 heading('waiver_heading','Multiple Filer Waiver Request Information'),
 f('waiver_note','Refer to Part 3, Types of Waivers, in the Specific Instructions section of the form instructions for an explanation of filing waivers.',{type:'note'}),
 f('multiple_filer_waiver','5. Indicate which waiver you are requesting',{type:'radio',options:[['general','5.a. Multiple filer, no permanent restraining orders or convictions for a specified offense (General Waiver)'],['extraordinary','5.b. Multiple filer, prior permanent restraining orders or criminal conviction for specified offense (Extraordinary Circumstances Waiver)'],['mandatory','5.c. Multiple filer, prior permanent restraining order or criminal convictions for specified offense resulting from domestic violence (Mandatory Waiver)'],['na','5.d. Not applicable, beneficiary is my spouse or I am not a multiple filer']]})
];
})();
