/* Parts 1–9 and their additional information. */
(function(root){
const maps=[{"page":1,"fields":[{"name":"basis_means_tested_benefit","type":"checkbox","part":1,"item":"1A"},{"name":"basis_low_income","type":"checkbox","part":1,"item":"1B"},{"name":"basis_financial_hardship","type":"checkbox","part":1,"item":"1C"},{"name":"requestor_immigration_status","type":"text","part":1,"item":"2"},{"name":"requestor_parent_legal_guardian","type":"checkbox","part":2,"item":"1"},{"name":"requestor_lastname","type":"text","part":2,"item":"2"},{"name":"requestor_firstname","type":"text","part":2,"item":"2"},{"name":"requestor_middlename","type":"text","part":2,"item":"2"},{"name":"requestor_other_1_lastname","type":"text","part":2,"item":"3"},{"name":"requestor_other_1_firstname","type":"text","part":2,"item":"3"},{"name":"requestor_other_1_middlename","type":"text","part":2,"item":"3"},{"name":"requestor_other_2_lastname","type":"text","part":2,"item":"3"},{"name":"requestor_other_2_firstname","type":"text","part":2,"item":"3"},{"name":"requestor_other_2_middlename","type":"text","part":2,"item":"3"},{"name":"requestor_anumber","type":"text","part":2,"item":"4","comb":true,"maxLength":9},{"name":"requestor_uscis_account","type":"text","part":2,"item":"5","comb":true,"maxLength":12}]},{"page":2,"part":2,"fields":[{"name":"requestor_dob","type":"text","item":6,"format":"MM/DD/YYYY"},{"name":"requestor_ssn","type":"text","part":2,"item":7,"comb":true,"maxLength":9},{"name":"requestor_marital_single","type":"checkbox","item":8},{"name":"requestor_marital_married","type":"checkbox","item":8},{"name":"requestor_marital_divorced","type":"checkbox","item":8},{"name":"requestor_marital_widowed","type":"checkbox","item":8},{"name":"requestor_marital_annulled","type":"checkbox","item":8},{"name":"requestor_marital_separated","type":"checkbox","item":8},{"name":"requestor_marital_other","type":"checkbox","item":8},{"name":"requestor_marital_other_explanation","type":"text","item":8,"condition":"requestor_marital_other","multiline":true}]},{"page":2,"part":3,"fields":[{"name":"application_1_fullname","type":"text","row":1},{"name":"application_1_anumber","type":"text","row":1,"comb":true,"maxLength":9},{"name":"application_1_dob","type":"text","row":1,"format":"MM/DD/YYYY"},{"name":"application_1_forms","type":"text","row":1},{"name":"application_2_fullname","type":"text","row":2},{"name":"application_2_anumber","type":"text","row":2,"comb":true,"maxLength":9},{"name":"application_2_dob","type":"text","row":2,"format":"MM/DD/YYYY"},{"name":"application_2_relationship","type":"text","row":2},{"name":"application_2_forms","type":"text","row":2},{"name":"application_3_fullname","type":"text","row":3},{"name":"application_3_anumber","type":"text","row":3,"comb":true,"maxLength":9},{"name":"application_3_dob","type":"text","row":3,"format":"MM/DD/YYYY"},{"name":"application_3_relationship","type":"text","row":3},{"name":"application_3_forms","type":"text","row":3},{"name":"application_4_fullname","type":"text","row":4},{"name":"application_4_anumber","type":"text","row":4,"comb":true,"maxLength":9},{"name":"application_4_dob","type":"text","row":4,"format":"MM/DD/YYYY"},{"name":"application_4_relationship","type":"text","row":4},{"name":"application_4_forms","type":"text","row":4},{"name":"applications_total_forms","type":"text"}]}];

const financialMaps=[{"part":4,"page":2,"fields":[{"name":"benefit_1_fullname","type":"text","row":1,"item":1},{"name":"benefit_1_relationship","type":"text","row":1,"item":1},{"name":"benefit_1_agency","type":"text","row":1,"item":1},{"name":"benefit_1_type","type":"text","row":1,"item":1},{"name":"benefit_1_awarded_date","type":"text","row":1,"format":"MM/DD/YYYY","item":1},{"name":"benefit_1_expires_date","type":"text","row":1,"format":"MM/DD/YYYY","item":1},{"name":"benefit_2_fullname","type":"text","row":2,"item":1},{"name":"benefit_2_relationship","type":"text","row":2,"item":1},{"name":"benefit_2_agency","type":"text","row":2,"item":1},{"name":"benefit_2_type","type":"text","row":2,"item":1},{"name":"benefit_2_awarded_date","type":"text","row":2,"format":"MM/DD/YYYY","item":1},{"name":"benefit_2_expires_date","type":"text","row":2,"format":"MM/DD/YYYY","item":1},{"name":"benefit_3_fullname","type":"text","row":3,"item":1},{"name":"benefit_3_relationship","type":"text","row":3,"item":1},{"name":"benefit_3_agency","type":"text","row":3,"item":1},{"name":"benefit_3_type","type":"text","row":3,"item":1},{"name":"benefit_3_awarded_date","type":"text","row":3,"format":"MM/DD/YYYY","item":1},{"name":"benefit_3_expires_date","type":"text","row":3,"format":"MM/DD/YYYY","item":1},{"name":"benefit_4_fullname","type":"text","row":4,"item":1},{"name":"benefit_4_relationship","type":"text","row":4,"item":1},{"name":"benefit_4_agency","type":"text","row":4,"item":1},{"name":"benefit_4_type","type":"text","row":4,"item":1},{"name":"benefit_4_awarded_date","type":"text","row":4,"format":"MM/DD/YYYY","item":1},{"name":"benefit_4_expires_date","type":"text","row":4,"format":"MM/DD/YYYY","item":1},{"name":"benefit_5_fullname","type":"text","row":5,"item":1},{"name":"benefit_5_relationship","type":"text","row":5,"item":1},{"name":"benefit_5_agency","type":"text","row":5,"item":1},{"name":"benefit_5_type","type":"text","row":5,"item":1},{"name":"benefit_5_awarded_date","type":"text","row":5,"format":"MM/DD/YYYY","item":1},{"name":"benefit_5_expires_date","type":"text","row":5,"format":"MM/DD/YYYY","item":1},{"name":"benefit_6_fullname","type":"text","row":6,"item":1},{"name":"benefit_6_relationship","type":"text","row":6,"item":1},{"name":"benefit_6_agency","type":"text","row":6,"item":1},{"name":"benefit_6_type","type":"text","row":6,"item":1},{"name":"benefit_6_awarded_date","type":"text","row":6,"format":"MM/DD/YYYY","item":1},{"name":"benefit_6_expires_date","type":"text","row":6,"format":"MM/DD/YYYY","item":1},{"name":"benefit_7_fullname","type":"text","row":7,"item":1},{"name":"benefit_7_relationship","type":"text","row":7,"item":1},{"name":"benefit_7_agency","type":"text","row":7,"item":1},{"name":"benefit_7_type","type":"text","row":7,"item":1},{"name":"benefit_7_awarded_date","type":"text","row":7,"format":"MM/DD/YYYY","item":1},{"name":"benefit_7_expires_date","type":"text","row":7,"format":"MM/DD/YYYY","item":1},{"name":"benefit_8_fullname","type":"text","row":8,"item":1},{"name":"benefit_8_relationship","type":"text","row":8,"item":1},{"name":"benefit_8_agency","type":"text","row":8,"item":1},{"name":"benefit_8_type","type":"text","row":8,"item":1},{"name":"benefit_8_awarded_date","type":"text","row":8,"format":"MM/DD/YYYY","item":1},{"name":"benefit_8_expires_date","type":"text","row":8,"format":"MM/DD/YYYY","item":1}]},{"part":5,"page":3,"fields":[{"name":"income_employment_employed","type":"checkbox","item":1},{"name":"income_employment_unemployed","type":"checkbox","item":1},{"name":"income_employment_retired","type":"checkbox","item":1},{"name":"income_employment_other","type":"checkbox","item":1},{"name":"income_employment_other_explanation","type":"text","multiline":true,"overflow":"Part 10; preserve all text","item":1,"condition":"income_employment_other"},{"name":"income_unemployment_benefits_yes","type":"checkbox","item":2,"condition":"income_employment_unemployed"},{"name":"income_unemployment_benefits_no","type":"checkbox","item":2,"condition":"income_employment_unemployed"},{"name":"income_unemployed_date","type":"text","format":"MM/DD/YYYY","item":"2.A","condition":"income_employment_unemployed"},{"name":"income_household_size","type":"text","item":3},{"name":"income_household_earners","type":"text","item":4},{"name":"income_head_of_household","type":"text","item":5},{"name":"income_annual_self","type":"text","item":6},{"name":"income_annual_family","type":"text","item":7},{"name":"income_annual_total","type":"text","item":8},{"name":"income_circumstances_changed_yes","type":"checkbox","item":9},{"name":"income_circumstances_changed_no","type":"checkbox","item":9},{"name":"income_circumstances_explanation","type":"text","multiline":true,"overflow":"Part 10; preserve all text","item":9}]},{"part":6,"page":4,"fields":[{"name":"hardship_explanation","type":"text","multiline":true,"overflow":"Part 10","item":1},{"name":"hardship_asset_1_type","type":"text","item":2},{"name":"hardship_asset_1_value","type":"text","item":2},{"name":"hardship_asset_2_type","type":"text","item":2},{"name":"hardship_asset_2_value","type":"text","item":2},{"name":"hardship_asset_3_type","type":"text","item":2},{"name":"hardship_asset_3_value","type":"text","item":2},{"name":"hardship_assets_total","type":"text","item":2},{"name":"hardship_monthly_expenses","type":"text","item":3},{"name":"hardship_expense_rent_mortgage","type":"checkbox","item":3},{"name":"hardship_expense_food","type":"checkbox","item":3},{"name":"hardship_expense_utilities","type":"checkbox","item":3},{"name":"hardship_expense_care","type":"checkbox","item":3},{"name":"hardship_expense_insurance","type":"checkbox","item":3},{"name":"hardship_expense_loans_credit_cards","type":"checkbox","item":3},{"name":"hardship_expense_car_payment","type":"checkbox","item":3},{"name":"hardship_expense_commuting","type":"checkbox","item":3},{"name":"hardship_expense_medical","type":"checkbox","item":3},{"name":"hardship_expense_school","type":"checkbox","item":3},{"name":"hardship_expense_other","type":"checkbox","item":3},{"name":"hardship_expenses_other_explanation","type":"text","multiline":true,"overflow":"Part 10","item":3,"condition":"hardship_expense_other"}]}];
const signatureMaps=[{"page":5,"part":7,"fields":[{"name":"requestor_statement_english","type":"checkbox","item":"1.A"},{"name":"requestor_statement_interpreter","type":"checkbox","item":"1.B"},{"name":"requestor_interpreter_language","type":"text","item":"1.B","condition":"requestor_statement_interpreter"},{"name":"requestor_used_preparer","type":"checkbox","item":2},{"name":"requestor_preparer_name","type":"text","item":2,"condition":"requestor_used_preparer"},{"name":"requestor_daytime_phone","type":"text","item":3},{"name":"requestor_mobile_phone","type":"text","item":4},{"name":"requestor_email","type":"text","item":5},{"name":"requestor_sign","type":"text","format":"PNG data URL from web canvas; embed image in PDF text field, not a digital-signature field","item":6,"signature":true},{"name":"requestor_sign_date","type":"text","format":"MM/DD/YYYY","item":6}]},{"page":6,"part":8,"fields":[{"name":"interpreter_lastname","type":"text","item":1},{"name":"interpreter_firstname","type":"text","item":1},{"name":"interpreter_business","type":"text","item":2},{"name":"interpreter_street","type":"text","item":3},{"name":"interpreter_apt","type":"checkbox","source":"interpreter_unit_type","checkedWhen":"apt","item":3},{"name":"interpreter_ste","type":"checkbox","source":"interpreter_unit_type","checkedWhen":"ste","item":3},{"name":"interpreter_flr","type":"checkbox","source":"interpreter_unit_type","checkedWhen":"flr","item":3},{"name":"interpreter_number","type":"text","item":3},{"name":"interpreter_city","type":"text","item":3},{"name":"interpreter_state","type":"text","item":3},{"name":"interpreter_zip","type":"text","item":3},{"name":"interpreter_province","type":"text","item":3},{"name":"interpreter_postal","type":"text","item":3},{"name":"interpreter_country","type":"text","item":3},{"name":"interpreter_telephone","type":"text","item":4},{"name":"interpreter_mobile","type":"text","item":5},{"name":"interpreter_email","type":"text","item":6},{"name":"interpreter_language","type":"text","item":"Certification"},{"name":"interpreter_sign","type":"text","format":"Embed saved PNG in this regular PDF text field","item":7,"signature":true},{"name":"interpreter_sign_date","type":"text","format":"MM/DD/YYYY","item":7}]},{"page":7,"part":9,"fields":[{"name":"preparer_lastname","type":"text","item":1},{"name":"preparer_firstname","type":"text","item":1},{"name":"preparer_business","type":"text","item":2},{"name":"preparer_street","type":"text","item":3},{"name":"preparer_apt","type":"checkbox","source":"preparer_unit_type","checkedWhen":"apt","item":3},{"name":"preparer_ste","type":"checkbox","source":"preparer_unit_type","checkedWhen":"ste","item":3},{"name":"preparer_flr","type":"checkbox","source":"preparer_unit_type","checkedWhen":"flr","item":3},{"name":"preparer_number","type":"text","item":3},{"name":"preparer_city","type":"text","item":3},{"name":"preparer_state","type":"text","item":3},{"name":"preparer_zip","type":"text","item":3},{"name":"preparer_province","type":"text","item":3},{"name":"preparer_postal","type":"text","item":3},{"name":"preparer_country","type":"text","item":3},{"name":"preparer_telephone","type":"text","item":4},{"name":"preparer_mobile","type":"text","item":5},{"name":"preparer_email","type":"text","item":6},{"name":"preparer_sign","type":"text","format":"Embed saved PNG in this regular PDF text field","item":8,"signature":true},{"name":"preparer_sign_date","type":"text","format":"MM/DD/YYYY","item":8},{"name":"preparer_not_attorney","type":"checkbox","item":7},{"name":"preparer_attorney","type":"checkbox","item":7},{"name":"preparer_representation_extends","type":"checkbox","item":7,"condition":"preparer_attorney"},{"name":"preparer_representation_not_extends","type":"checkbox","item":7,"condition":"preparer_attorney"}]}];
async function build(source, sections) {
 const {PDFDocument,StandardFonts}=root.PDFLib;
 const doc=await PDFDocument.load(source), form=doc.getForm(), font=await doc.embedFont(StandardFonts.Helvetica);
 const extras=[];
 sections = structuredClone(sections);
 if(sections[7]?.requestor_statement_interpreter!==true)sections[8]={};
 if(sections[7]?.requestor_used_preparer!==true)sections[9]={};
 if(sections[7]?.requestor_statement_interpreter===true){
  const language=String(sections[7].requestor_interpreter_language||'').trim();
  if(!language)throw Error('Enter the interpreter language in Part 7.');
  sections[8] ||= {};
  if(sections[8].interpreter_language && sections[8].interpreter_language.trim().toLowerCase()!==language.toLowerCase())throw Error('Interpreter language must match Part 7.');
  sections[8].interpreter_language=language;
 }
 for (const [part,basis] of [[4,"basis_means_tested_benefit"],[5,"basis_low_income"],[6,"basis_financial_hardship"]]) if(sections[1]?.[basis] !== true) sections[part]={};
 normalizeFinancialFields(doc, form);
 const text=v=>v==null?'':String(v).trim();
 function money(value,nonnegative=false){
  const v=text(value);
  if(!/^-?\d+(?:\.\d{1,2})?$/.test(v)||(nonnegative&&v.startsWith('-')))throw Error('Invalid dollar amount: '+v);
  const [whole,fraction='']=v.replace(/^-/,'').split('.');
  return (BigInt(whole)*100n+BigInt(fraction.padEnd(2,'0')))*(v.startsWith('-')?-1n:1n);
 }
 function dollars(cents){const abs=cents<0n?-cents:cents;return (cents<0n?'-':'')+abs/100n+'.'+String(abs%100n).padStart(2,'0');}
 if(sections[1]?.basis_low_income===true){
  const data=sections[5];
  data.income_annual_total=dollars(money(data.income_annual_self)+money(data.income_annual_family));
 }
 if(sections[1]?.basis_financial_hardship===true){
  const data=sections[6];
  data.hardship_assets_total=dollars([1,2,3].reduce((sum,n)=>sum+money(data['hardship_asset_'+n+'_value']||'0',true),money(data.hardship_assets_additional_value||'0',true)));
 }
 function date(v){if(!v)return '';if(!/^\d{4}-\d{2}-\d{2}$/.test(v))throw Error('Invalid date: '+v);return v.slice(5,7)+'/'+v.slice(8,10)+'/'+v.slice(0,4);}
 function number(v,length,pad=false){v=text(v);if(!v)return '';if(!(pad?/^\d{7,9}$/:new RegExp('^[0-9]{'+length+'}$')).test(v))throw Error('Invalid identification number.');return pad?v.padStart(length,'0'):v;}
 function set(name,value){const f=form.getTextField(name);if(!f.acroField.getDefaultAppearance())f.acroField.setDefaultAppearance('/Helvetica 10 Tf 0 g');f.setText(value);f.setFontSize(f.isCombed()?10:0);return f;}
 for(const map of [...maps,...financialMaps,...signatureMaps])for(const field of map.fields){
  const part=field.part||map.part||1, data=sections[part]||{};
  let value=field.condition&&data[field.condition]!==true?'':data[field.name];
  if(field.source && field.checkedWhen) value = data[field.source] === field.checkedWhen;
  if(field.signature){
   const signatureField=form.getTextField(field.name);signatureField.setText('');
   if(value){
    if(!/^data:image\/png;base64,/.test(value))throw Error('Invalid signature image: '+field.name);
    if(!data[field.name+'_date'])throw Error('Enter the signature date for '+field.name);
    const image=await doc.embedPng(value);
     // A text field's empty value can replace its image appearance in some viewers.
     // Bake every supplied signature into the page instead.
     const widgets=signatureField.acroField.getWidgets().map(widget=>({
      rect:widget.getRectangle(),ref:doc.context.getObjectRef(widget.dict),page:widget.P()
     }));
     signatureField.updateAppearances(font);
     form.removeField(signatureField);
     for(const widget of widgets){
      const page=doc.getPages().find(p=>p.ref.toString()===widget.page?.toString())||doc.getPages()[map.page-1];
      if(widget.ref)page.node.removeAnnot(widget.ref);
      const {x,y,width,height}=widget.rect;
      const scale=Math.min((width-2)/image.width,(height-2)/image.height);
      page.drawImage(image,{x:x+1+(width-2-image.width*scale)/2,y:y+1+(height-2-image.height*scale)/2,width:image.width*scale,height:image.height*scale});
     }
   }
   continue;
  }
  let name=field.name;
  if(name==='requestor_immigration_status'&&!form.getFieldMaybe(name))name='2 What is your current immigrant or nonimmigrant status';
  if(field.type==='checkbox'){const f=form.getCheckBox(name);value===true?f.check():f.uncheck();f.updateAppearances();continue;}
  value=text(value);
  if(value&&(/^(income_annual_|hardship_asset_\d_value$)/.test(field.name)||['hardship_assets_total','hardship_monthly_expenses'].includes(field.name)))value=dollars(money(value,part===6));
  if(field.format==='MM/DD/YYYY')value=date(value);
  if(field.comb)value=number(value,field.maxLength,field.name.endsWith('anumber'));
  const f=form.getTextField(name),rect=f.acroField.getWidgets()[0].getRectangle();
  if (field.multiline && value && rect.height > 35) {
   const lines=wrap(value,rect.width-10), capacity=Math.max(1,Math.floor((rect.height-12)/12));
   const overflow=lines.length>capacity;
   const displayed=lines.splice(0,overflow?Math.max(0,capacity-1):capacity);
   if(overflow){displayed.push('Continued in Part 10');extras.push({page:map.page,part,item:field.item||1,text:field.name+' (continued): '+lines.join('\n')});}
   // Keep the printed writing rules from striking through the generated text.
   doc.getPages()[map.page-1].drawRectangle({x:rect.x+1,y:rect.y+1,width:rect.width-2,height:rect.height-2,color:root.PDFLib.rgb(1,1,1)});
   f.enableMultiline();f.disableScrolling();f.setFontSize(9);f.setText(displayed.join('\n'));continue;
  }
  if(value&&!field.comb&&!field.name.endsWith('_state')&&(font.widthOfTextAtSize(value.replace(/\n/g,' '),9)>rect.width-6||value.includes('\n'))){
   extras.push({page:map.page,part,item:field.item||1,text:field.name+': '+value});
   value='See Part 10';
  }
  set(name,value);
 }
 for(const [part,key,page,item] of [[2,'requestor_other_names_additional',1,3],[3,'applications_additional',2,1],[4,'benefits_additional',2,1],[6,'hardship_assets_additional',4,2]]){
  if(text(sections[part]?.[key]))extras.push({part,page,item,text:text(sections[part][key])});
 }
 function wrap(value,width){
  const lines=[];
  for(const paragraph of value.split('\n')){
   let line='';
   for(const char of paragraph){
    if(font.widthOfTextAtSize(line+char,9)>width){
     const split=line.lastIndexOf(' ');
     if(split>0){lines.push(line.slice(0,split));line=line.slice(split+1);}
     else {lines.push(line);line='';}
    }
    line+=char;
   }
   lines.push(line);
  }return lines;
 }
 if(extras.length){
  const identity=sections[2]||{};
  for(const [pdf,key] of [['additional_lastname','requestor_lastname'],['additional_firstname','requestor_firstname'],['additional_middlename','requestor_middlename']])set(pdf,text(identity[key]));
  set('additional_anumber',number(identity.requestor_anumber,9,true));
  let slot=0,extraPage=null,y=0;
  for(const extra of extras){
   let lines=wrap(extra.text,480);
   while(lines.length){
    if(slot<4){
     const index=slot+1;
     const desc=form.getTextField('additional_description_'+index),rect=desc.acroField.getWidgets()[0].getRectangle();
     const capacity=Math.max(1,Math.floor((rect.height-8)/11));
     set('additional_page_'+index,String(extra.page));
     set('additional_part_'+index,String(extra.part));set('additional_item_'+index,String(extra.item));
     desc.enableMultiline();desc.setFontSize(9);desc.setText(lines.splice(0,capacity).join('\n'));slot++;
    }else{
     if(!extraPage||y<100){extraPage=doc.addPage([612,792]);y=740;
      extraPage.drawText('Form I-912 — Part 10. Additional Information',{x:40,y,size:12,font});y-=25;
      extraPage.drawText([identity.requestor_lastname,identity.requestor_firstname,identity.requestor_middlename].filter(Boolean).join(' ')+'  A-'+number(identity.requestor_anumber,9,true),{x:40,y,size:9,font});y-=25;}
     extraPage.drawText('Page '+extra.page+' / Part '+extra.part+' / Item '+extra.item,{x:40,y,size:9,font});y-=16;
     const chunk=lines.splice(0,Math.max(1,Math.floor((y-55)/12)));
     for(const line of chunk){extraPage.drawText(line,{x:40,y,size:9,font});y-=12;}y-=20;
    }
   }
  }
 }
 form.updateFieldAppearances(font);
 return doc.save();
}
function normalizeFinancialFields(doc, form) {
 const aliases={
  income_employment_other_explanation:'Yes ONo',income_unemployed_date:'1',income_household_size:'2',income_household_earners:'3',
  income_head_of_household:'5 Name of head of household ifnot you',income_annual_self:'Text7',income_annual_family:'undefined_2',
  income_annual_total:'8 Total Adjusted Gross Household Income add the amounts from Item Numbers 6 and 7  I',
  income_circumstances_explanation:'use this space to provide any additional information about your circumstances that you would like USCIS to consider 1',
  hardship_explanation:'member and natural disasters declaration posted to wwwuscisgov 1',hardship_assets_total:'Value US DollarsTotal Value of Assets',
  hardship_monthly_expenses:'Text9',hardship_expenses_other_explanation:'Other 1'
 };
 for(let n=1;n<=3;n++){aliases['hardship_asset_'+n+'_type']='Type of AssetRow'+n;aliases['hardship_asset_'+n+'_value']='Value US DollarsRow'+n;}
 for(const [name,old] of Object.entries(aliases)) {
  if(form.getFieldMaybe(name))continue;
  const field=form.getTextField(old);
  field.acroField.setPartialName(name);
 }
 const groups=[
  ['Check Box5',2,['income_employment_employed','income_employment_unemployed','income_employment_retired','income_employment_other']],
  ['Check Box6',2,['income_unemployment_benefits_yes','income_unemployment_benefits_no']],
  ['Check Box8',2,['income_circumstances_changed_yes','income_circumstances_changed_no']],
  ['Check Box10',3,['rent_mortgage','food','utilities','care','insurance','school','medical','commuting','car_payment','loans_credit_cards','other'].map(key=>'hardship_expense_'+key)]
 ];
 for(const [old,page,names] of groups){
  if(names.every(name=>form.getFieldMaybe(name)))continue;
  const shared=form.getCheckBox(old),rects=shared.acroField.getWidgets().map(w=>w.getRectangle());
  const widgetRefs=shared.acroField.getWidgets().map(w=>doc.context.getObjectRef(w.dict));
  if(rects.length!==names.length)throw Error('Unexpected checkbox layout: '+old);
  form.removeField(shared);
  // pdf-lib removes the field object but can leave its child widget references in Annots.
  for(const ref of widgetRefs)if(ref)doc.getPages()[page].node.removeAnnot(ref);
  names.forEach((name,i)=>{if(!form.getFieldMaybe(name))form.createCheckBox(name).addToPage(doc.getPages()[page],{...rects[i],borderWidth:0.7});});
 }
}
root.I912Pdf={build};
})(typeof window==='undefined'?globalThis:window);

