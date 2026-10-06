/* Base petition and E, Trade Agreement, H, H data and L supplements. Never represents a filing-ready petition. */
(function(root){
'use strict';
const base=['petitioner','beneficiary','processing','employment','export','declaration','preparer'];
const symbols={'H-1B1-CL':'H-1B1','H-1B1-SG':'H-1B1','TN-CA':'TN','TN-MX':'TN','P-1-ML':'P-1','L-BLANKET':'L-1','H-3-SE':'H-3','E-2-CNMI':'E-2'};
const date=v=>/^\d{4}-\d{2}-\d{2}$/.test(v)?v.slice(5,7)+'/'+v.slice(8)+'/'+v.slice(0,4):v;
async function fillForm(packet,source,internal=false){
 const {PDFDocument,StandardFonts}=root.PDFLib;
 if(!source){const response=await fetch('fillvisa_i129_acro.pdf');if(!response.ok)throw Error('Unable to load the I-129 PDF template.');source=await response.arrayBuffer();}
 const doc=await PDFDocument.load(source),form=doc.getForm(),font=await doc.embedFont(StandardFonts.Helvetica);
 const includeE=['E-1','E-2','E-2-CNMI'].includes(packet.sections.setup.classification)&&packet.selectedSections.includes('e');
 const includeTrade=['TN-CA','TN-MX','H-1B1-CL','H-1B1-SG'].includes(packet.sections.setup.classification)&&packet.selectedSections.includes('trade');
 const hSections=['h','h1','h2','h3'].filter(id=>packet.selectedSections.includes(id)&&packet.sections.setup.classification.startsWith('H-'));
 const includeHdata=['H-1B','H-1B2','H-1B3','H-1B1-CL','H-1B1-SG'].includes(packet.sections.setup.classification)&&packet.selectedSections.includes('hdata');
 const includeL=['L-1A','L-1B','L-BLANKET'].includes(packet.sections.setup.classification)&&packet.selectedSections.includes('l');
 const opSymbols={'O-1A':'o1a','O-1B':'o1b','O-2':'o2','P-1-ML':'p1_ml','P-1':'p1','P-1S':'p1s','P-2':'p2','P-2S':'p2s','P-3':'p3','P-3S':'p3s'};
 const includeOp=Object.hasOwn(opSymbols,packet.sections.setup.classification)&&packet.selectedSections.includes('op');
 const totalWorkers=Number(packet.sections.setup.worker_count);
 const attachmentCount=packet.selectedSections.includes('attachment')&&packet.sections.setup.multiple==='yes'&&packet.sections.setup.beneficiaryType!=='unnamed'&&Number.isSafeInteger(totalWorkers)&&totalWorkers>1?totalWorkers-1:0;
 const includeR=packet.sections.setup.classification==='R-1'&&packet.selectedSections.includes('r');
 const includeQ=packet.sections.setup.classification==='Q-1'&&packet.selectedSections.includes('q');
 const lBlanket=packet.sections.setup.classification==='L-BLANKET';
 const hPages=hSections.length?[12,13,...(hSections.includes('h1')?[14]:[]),...(hSections.includes('h2')?[14,15,16,17,...(packet.sections.setup.classification==='H-2A'&&packet.sections.h2?.h2_joint==='yes'?[18]:[])]:[]),...(hSections.includes('h3')?[19]:[])]:[];
 const keptIndexes=new Set([0,1,2,3,4,5,6,7,...(includeE?[8,9]:[]),...(includeTrade?[10,11]:[]),...hPages,...(includeHdata?[20,21,22]:[]),...(includeL?(lBlanket?[23,26]:[23,24,25,26]):[]),...(includeOp?[27,28,29]:[]),...(includeQ?[30]:[]),...(includeR?[31,32,33,34,35]:[]),...(attachmentCount?[36]:[]),...(attachmentCount>1?[37]:[])]);
 const originalPages=doc.getPages();
 // Build missing widget appearances before pdf-lib removes unselected fields.
 form.updateFieldAppearances(font);
 // Remove unrelated template fields before removing supplement pages.
 for(const field of form.getFields()){
  const widgets=field.acroField.getWidgets();
  if(widgets.length&&widgets.every(w=>!keptIndexes.has(originalPages.findIndex(p=>p.ref===w.P()))))form.removeField(field);
 }
 for(let i=originalPages.length-1;i>=0;i--)if(!keptIndexes.has(i))doc.removePage(i);
 // Duplicate the first attachment layout, recreating independent editable fields.
 if(attachmentCount>2){
  const template=await PDFDocument.load(source);
  const specs=template.getForm().getFields().filter(f=>f.getName().startsWith('attachment_1_')).map(f=>({name:f.getName(),checkbox:!!f.check,rect:f.acroField.getWidgets()[0].getRectangle()}));
  for(let n=3;n<=attachmentCount;n++){
   const [page]=await doc.copyPages(template,[36]);page.node.delete(root.PDFLib.PDFName.of('Annots'));doc.addPage(page);
   for(const spec of specs){
    const id=spec.name.replace('attachment_1_','attachment_'+n+'_'),field=spec.checkbox?form.createCheckBox(id):form.createTextField(id);
    field.addToPage(page,{...spec.rect,borderWidth:0,...(!spec.checkbox?{font}: {})});
   }
  }
 }
 const fields=new Map(form.getFields().map(f=>[f.getName(),f]));
 if(!fields.has('h2_employment_peak_load')&&fields.has('h2_employment_peak_loadb Peak load'))fields.set('h2_employment_peak_load',fields.get('h2_employment_peak_loadb Peak load'));
 if(includeQ){
  const required=['q_petitioner','q_beneficiary','q_signatory_lastname','q_signatory_firstname','q_signatory_middlename','q_sign','q_sign_date','q_telephone','q_email'];
  const missing=required.filter(id=>!fields.get(id)?.setText);
  if(missing.length)throw Error('Q-1 PDF template page 31 needs separate text fields: '+missing.join(', '));
 }
 const generatedExtras=[];
 for(const f of fields.values()){if(f.setText)f.setText('');else if(f.uncheck)f.uncheck();}
 function text(id,value){if(value===undefined||value==='')return;const f=fields.get(id);if(!f||!f.setText)throw Error('Missing PDF text field: '+id);f.setText(String(value));if(['other_compensation','prior_j_dates','e_foreign_product','e_foreign_position','e_employee_explanation'].includes(id))f.enableMultiline();f.setFontSize(9);}
 function check(id){const f=fields.get(id);if(!f||!f.check)throw Error('Missing PDF checkbox: '+id);f.check();f.defaultUpdateAppearances();}
 const values={},signatures=[];
 for(const section of [...base,...(includeE?['e']:[]),...(includeTrade?['trade']:[]),...hSections,...(includeHdata?['hdata']:[]),...(includeL?['l']:[]),...(includeOp?['op']:[]),...(includeQ?['q']:[]),...(includeR?['r']:[]),...(attachmentCount?['attachment']:[])]){
  if(!packet.selectedSections.includes(section))continue;
  const map=root.I129Base.maps[section],schema=typeof map==='function'?map(packet.sections.setup):map,data=packet.sections[section]||{};
  for(const f of schema){
   if(!root.I129Base.active(f,data,packet.sections.setup)||['heading','note'].includes(f.type))continue;
   const v=data[f.id];if(!v)continue;
   if(f.type==='signature'){if(fields.has(f.id))signatures.push([f.id,v]);continue;}
   if(f.reference)continue;
   // L fields are mapped below so combined cells and overflow share one path.
   if(section==='l')continue;
   if(section==='attachment'&&/_(inside|other_names|ds)$/.test(f.id))continue;
   if(section==='attachment'&&!fields.has(f.id)&&f.type!=='radio'&&!f.id.endsWith('_unit'))throw Error('Missing PDF attachment field: '+f.id);
   if(section==='r'){
    if(['r_affiliated','r_stay_count','r_position_count'].includes(f.id))continue;
    const stay=f.id.match(/^r_stay_(\d+)_/),position=f.id.match(/^r_position_(\d+)_/);
    if((stay&&Number(stay[1])>7)||(position&&Number(position[1])>6))continue;
    if(f.type==='textarea'){
     const field=fields.get(f.id);if(!field?.setText)throw Error('Missing PDF text field: '+f.id);
     const r=field.acroField.getWidgets()[0].getRectangle(),lines=wrap(v,Math.max(1,r.width-6));
     field.enableMultiline();
     if(lines.length>Math.max(1,Math.floor((r.height-6)/11))){
      const item=position?'3':f.id.match(/^r_attest_(\d+)_explanation$/)?.[1]||({r_relationship:'4',r_duties:'5.b',r_qualifications:'5.c',r_compensation:'5.d',r_work_locations:'5.e'})[f.id];
      text(f.id,'See Part 9.');
      generatedExtras.push({reference:'R supplement, Section 1, Item '+item,value:f.label+': '+v});
     }else text(f.id,lines.join('\n'));
     continue;
    }
   }
   if(section==='op'){
    if(['op_classification','op_o1b_field'].includes(f.id))continue;
    if(f.type==='textarea'){
     const field=fields.get(f.id);if(!field||!field.setText)throw Error('Missing PDF text field: '+f.id);
     const r=field.acroField.getWidgets()[0].getRectangle(),lines=wrap(v,Math.max(1,r.width-6));
     field.enableMultiline();
     if(lines.length>Math.max(1,Math.floor((r.height-6)/11))){
      text(f.id,'See Part 9.');
      const item={op_event:'4',op_duties:'5',op_prior_experience:'6',op_ownership_explanation:'7.b'}[f.id];
      generatedExtras.push({reference:'O/P supplement, Section 1, Item '+item,value:v});
     }else text(f.id,lines.join('\n'));
     continue;
    }
   }
   if(f.type==='checkboxes'){for(const choice of v.split(','))check(f.id+'_'+choice);continue;}
   if(section==='hdata'&&f.id==='hd_supervision'){
    const r=fields.get(f.id).acroField.getWidgets()[0].getRectangle();
    if(v.includes('\n')||font.widthOfTextAtSize(v,9)>r.width-6){text(f.id,'See Part 9: H data supplement, Section 1, Item 11.');generatedExtras.push({reference:'H data supplement, Section 1, Item 11',value:v});continue;}
   }
   if(f.type==='radio'||f.id.endsWith('_unit')){
    const id=f.id.endsWith('_unit')?f.id.slice(0,-5)+'_'+v:f.id+'_'+(['e_company_relationship','h2_employment','h2_need'].includes(f.id)?v.toLowerCase().replace(/[ -]/g,'_'):v);
    if(section==='attachment'||fields.has(id))check(id);continue;
   }
   if(f.type==='textarea'&&fields.has(f.id))fields.get(f.id).enableMultiline();
   if(fields.has(f.id)){values[f.id]=f.type==='date'?date(v):v;text(f.id,values[f.id]);}
  }
 }
 if(includeR){
  const d=packet.sections.r||{};
  if(d.r_prior_stay==='yes')for(let n=8;n<=Number(d.r_stay_count||0);n++)generatedExtras.push({reference:'R supplement, Section 1, Item 2',value:[d['r_stay_'+n+'_name'],date(d['r_stay_'+n+'_from']||''),date(d['r_stay_'+n+'_to']||'')].join(' | ')});
  for(let n=7;n<=Number(d.r_position_count||0);n++)generatedExtras.push({reference:'R supplement, Section 1, Item 3',value:[d['r_position_'+n+'_title'],d['r_position_'+n+'_responsibilities']].filter(Boolean).join(': ')});
 }
 if(includeOp)check('op_classification_'+opSymbols[packet.sections.setup.classification]);
 if(includeE){
  const e=packet.sections.e||{};
  check('e_classification_'+({'E-1':'e1','E-2':'e2','E-2-CNMI':'e2_cnmi'})[packet.sections.setup.classification]);
  if(e.e_employee_basis==='manager')text('e_employee_explanation','Number of employees supervised: '+e.e_supervised_count);
  else if(e.e_employee_basis==='special')text('e_employee_explanation',e.e_essential_qualifications);
  if(packet.sections.setup.classification!=='E-1')text('e_investment_total',root.I129Base.maps.e.find(f=>f.id==='e_investment_total').derive(e));
 }
 if(hSections.length){
  check('h_classification_'+({'H-1B':'h1b','H-1B1-CL':'h1b1','H-1B1-SG':'h1b1','H-1B2':'h1b2','H-1B3':'h1b3','H-2A':'h2a','H-2B':'h2b','H-3':'h3','H-3-SE':'h3_se'})[packet.sections.setup.classification]);
  const h=packet.sections.h||{};
  for(let n=7;n<=Number(h.h_stay_count||0);n++)generatedExtras.push({reference:'H supplement, Item 3',value:[h['h_stay_'+n+'_name'],date(h['h_stay_'+n+'_from']||''),date(h['h_stay_'+n+'_to']||'')].join(' | ')});
  const d=packet.sections.h2||{};
  if(hSections.includes('h2')&&d.h2_recruiter==='yes'&&d.h2_recruiter_address_country)generatedExtras.push({reference:'H supplement, Section 2, Item 7',value:'Recruiter address: '+['street','unit','number','city','state','zip','province','postal','country'].map(k=>d['h2_recruiter_address_'+k]).filter(Boolean).join(', ')});
 }
 if(includeL){
  const d=packet.sections.l||{},setup=packet.sections.setup;
  const active=new Set(root.I129Base.maps.l.filter(f=>root.I129Base.active(f,d,setup)).map(f=>f.id));
  const get=id=>active.has(id)?d[id]||'':'';
  const ref=item=>'L supplement, Section 1, Item '+item;
  // Fit complete answers or put a continuation pointer in the original cell.
  function cell(id,value,reference){
   if(!value)return;
   const field=fields.get(id);if(!field||!field.setText)throw Error('Missing PDF text field: '+id);
   const r=field.acroField.getWidgets()[0].getRectangle();
   const lines=wrap(value,Math.max(1,r.width-6));
   const capacity=Math.max(1,Math.floor((r.height-6)/11));
   field.enableMultiline();
   if(lines.length>capacity){
    text(id,'See Part 9.');
    const label=root.I129Base.maps.l.find(f=>f.id===id)?.label||id.replace(/_/g,' ');
    generatedExtras.push({reference,value:label+': '+value});
   }else text(id,lines.join('\n'));
  }
  for(const id of ['l_petitioner','l_beneficiary','l_foreign_employer'])text(id,get(id));
  check('l_petition_type_'+(lBlanket?'blanket':'individual'));
  for(const id of ['l_fifty','l_majority','l_same_relationship','l_new_office','l_offsite'])if(get(id))check(id+'_'+get(id));
  if(!lBlanket){
   check('l_classification_'+(setup.classification==='L-1A'?'l1a':'l1b'));
   if(get('l_relationship'))check('l_relationship_'+get('l_relationship').toLowerCase().replace(/ /g,'_'));
   for(const k of ['street','number','city','state','zip','province','postal','country'])text('l_foreign_address_'+k,get('l_foreign_address_'+k));
   if(get('l_foreign_address_unit'))check('l_foreign_address_'+get('l_foreign_address_unit'));
   for(let n=1;n<=Number(d.l_stay_count||0);n++){
    const p='l_stay_'+n;
    if(n<=7){cell(p+'_name',get(p+'_name'),ref('2'));text(p+'_from',date(get(p+'_from')));text(p+'_to',date(get(p+'_to')));}
    else generatedExtras.push({reference:ref('2'),value:[get(p+'_name'),date(get(p+'_from')),date(get(p+'_to'))].join(' | ')});
   }
   for(let n=1;n<=Number(d.l_employment_count||0);n++){
    const p='l_employment_'+n;
    if(n<=6){text(p+'_from',date(get(p+'_from')));text(p+'_to',date(get(p+'_to')));cell(p+'_interruptions',get(p+'_interruptions'),ref('5'));}
    else generatedExtras.push({reference:ref('5'),value:[date(get(p+'_from')),date(get(p+'_to')),get(p+'_interruptions')].filter(Boolean).join(' | ')});
   }
   for(const [id,item] of [['l_foreign_duties','6'],['l_us_duties','7'],['l_qualifications','8'],['l_offsite_supervision','13.b'],['l_offsite_reason','13.c']])cell(id,get(id),ref(item));
   for(let n=1;n<=Number(d.l_company_count||0);n++){
    const p='l_company_'+n;
    if(n<=5){cell(p+'_ownership',get(p+'_ownership'),ref('10'));text(p+'_fein',get(p+'_fein'));}
    else generatedExtras.push({reference:ref('10'),value:[get(p+'_ownership'),get(p+'_fein')?'FEIN: '+get(p+'_fein'):''].filter(Boolean).join(' | ')});
   }
  }else{
   for(let n=1;n<=Number(d.l_blanket_count||0);n++){
    const p='l_blanket_'+n, a=p+'_address';
    const address=[get(p+'_name'),[get(a+'_street'),get(a+'_unit'),get(a+'_number')].filter(Boolean).join(' '),['city','state','zip','province','postal','country'].map(k=>get(a+'_'+k)).filter(Boolean).join(', ')].filter(Boolean).join(', ');
    if(n<=8){cell(p+'_name_address',address,'L supplement, Section 2');cell(p+'_relationship',get(p+'_relationship'),'L supplement, Section 2');}
    else generatedExtras.push({reference:'L supplement, Section 2',value:address+'\nRelationship: '+get(p+'_relationship')});
   }
  }
 }
 for(let n=1;n<=attachmentCount;n++){
  const d=packet.sections.attachment||{},p='attachment_'+n;
  if(d[p+'_inside']==='yes'&&d[p+'_ds']==='yes')text(p+'_status_expires','D/S');
 }
 const setup=packet.sections.setup;
 text('classification',symbols[setup.classification]||setup.classification);
 for(const key of ['basis','action','beneficiaryType'])if(setup[key]&&!(setup.classification==='L-BLANKET'&&key!=='basis'))check(key+'_'+setup[key].replace(/-/g,'_'));
 if(setup.classification!=='L-BLANKET'){text('petition_receipt',setup.petition_receipt);text('worker_count',setup.worker_count);}
 check('new_petition_'+(setup.basis==='new'?'yes':'no'));
 if(packet.sections.beneficiary?.beneficiary_ds==='yes')text('beneficiary_status_expires','D/S');
 for(const [id,png] of signatures){
  if(!/^data:image\/png;base64,/.test(png))throw Error('Invalid saved signature: '+id);
  const field=form.getTextField(id),image=await doc.embedPng(png);
  for(const widget of field.acroField.getWidgets()){
   const page=doc.getPages().find(p=>p.ref===widget.P());if(!page)throw Error('Signature page not found.');
   const r=widget.getRectangle(),scale=Math.min((r.width-4)/image.width,(r.height-4)/image.height);
   page.drawImage(image,{x:r.x+(r.width-image.width*scale)/2,y:r.y+(r.height-image.height*scale)/2,width:image.width*scale,height:image.height*scale});
  }
 }
 // Wrap by measured width, including unbroken long words; never discard overflow.
 function wrap(value,width){const lines=[];for(const paragraph of String(value).split(/\r?\n/)){let line='';for(const ch of paragraph){if(font.widthOfTextAtSize(line+ch,9)>width){lines.push(line);line='';}line+=ch;}lines.push(line);}return lines;}
 let slot=0,continuationCount=0,part9Template=null;
 const part9Names=['additional_info_anumber',...Array.from({length:3},(_,i)=>['pgno','ptno','itno','description'].map(k=>'additional_info_'+k+'_'+(i+1))).flat()];
 async function addPart9(){
  if(!part9Template)part9Template=await PDFDocument.load(source);
  const [page]=await doc.copyPages(part9Template,[7]);
  doc.insertPage(8+continuationCount,page);continuationCount++;
  const suffix='_copy_'+continuationCount;
  // Register the copied widgets themselves, retaining comb flags, borders,
  // backgrounds and appearance resources from the original AcroForm fields.
  const {PDFName,PDFHexString}=root.PDFLib,registered=new Set();
  const annots=page.node.Annots();
  for(let i=0;i<annots.size();i++){
   const widgetRef=annots.get(i),widget=doc.context.lookup(widgetRef);
   const fieldRef=widget.get(PDFName.of('Parent'))||widgetRef;
   const fieldDict=doc.context.lookup(fieldRef);
   const originalName=fieldDict.get(PDFName.of('T'))?.decodeText();
   if(!originalName)continue;
   widget.set(PDFName.of('P'),page.ref);
   if(registered.has(fieldRef.toString()))continue;
   registered.add(fieldRef.toString());
   fieldDict.set(PDFName.of('T'),PDFHexString.fromText(originalName+suffix));
   form.acroForm.addField(fieldRef);
  }
  for(const id of part9Names){
   const field=form.getTextField(id+suffix);
   field.setText('');
   fields.set(id+suffix,field);
  }
  text('additional_info_anumber'+suffix,packet.sections.beneficiary?.beneficiary_anumber);
 }

 const extras=[...(packet.additionalInformation||[]),...generatedExtras].filter(e=>/^Part [345],/.test(e.reference)||(includeE&&e.reference==='E supplement, Section 2, Item 3')||(hSections.length&&e.reference.startsWith('H supplement,'))||(includeHdata&&e.reference==='H data supplement, Section 1, Item 11')||(includeL&&e.reference.startsWith('L supplement,'))||(includeOp&&e.reference.startsWith('O/P supplement,'))||(includeR&&e.reference.startsWith('R supplement,'))||(attachmentCount&&/^Attachment-1, additional beneficiary (\d+), Other names$/.test(e.reference)&&Number(e.reference.match(/beneficiary (\d+)/)[1])<=attachmentCount&&packet.sections.attachment?.['attachment_'+e.reference.match(/beneficiary (\d+)/)[1]+'_other_names']==='yes'));
 const pageFor={'3':'3','4':'4','5':'5'};
 for(const entry of extras){
  const attachmentMatch=entry.reference.match(/^Attachment-1, additional beneficiary (\d+), Other names$/);
  const rMatch=entry.reference.match(/^R supplement, Section (\d+), Item (.+)$/);
  const opMatch=entry.reference.match(/^O\/P supplement, Section (\d+), Item (.+)$/);
  const lMatch=entry.reference.match(/^L supplement, Section (\d+)(?:, Item (.+))?$/);
  const isHdata=entry.reference==='H data supplement, Section 1, Item 11';
  const isE=entry.reference==='E supplement, Section 2, Item 3';
  const hMatch=entry.reference.match(/^H supplement, (?:Section (\d+), )?Item (.+)$/);
  const match=attachmentMatch?['','Attachment-1','Other names']:rMatch?rMatch:opMatch?opMatch:lMatch?['',lMatch[1],lMatch[2]||'-']:isHdata?['','1','11']:hMatch?['',hMatch[1]||'H',hMatch[2]]:isE?['','2','3']:entry.reference.match(/^Part (\d+), Item (.+)$/);if(!match)throw Error('Unmapped additional-information reference: '+entry.reference);
  const pageNumber=attachmentMatch?(attachmentMatch[1]==='2'?'38':'37'):rMatch?(rMatch[2]==='2'?'32':rMatch[2]==='5.e'?'34':parseFloat(rMatch[2])<=5?'33':Number(rMatch[2])<=9?'34':'35'):opMatch?(parseFloat(opMatch[2])<=6?'28':'29'):lMatch?(lMatch[1]==='2'?'27':Number(lMatch[2])<=4?'24':Number(lMatch[2])<=9?'25':'26'):isHdata?'21':hMatch?(hMatch[1]==='3'?'20':hMatch[1]==='2'?(Number(hMatch[2])<=7?'15':'16'):'13'):isE?'10':pageFor[match[1]];
  const lines=wrap((attachmentMatch?entry.reference+' — ':rMatch?entry.reference+' — ':opMatch?entry.reference+' — ':lMatch?entry.reference+' — ':isHdata?entry.reference+' — ':hMatch?entry.reference+' — ':isE?'E supplement, Section 2 — ':'')+entry.value,460);
  while(lines.length){
   const chunk=lines.splice(0,8).join('\n');slot++;
   const index=(slot-1)%3+1,copy=Math.floor((slot-1)/3);
   if(copy>continuationCount)await addPart9();
   const suffix=copy?'_copy_'+copy:'';
   text('additional_info_pgno_'+index+suffix,pageNumber);
   text('additional_info_ptno_'+index+suffix,match[1]);
   text('additional_info_itno_'+index+suffix,match[2]);
   form.getTextField('additional_info_description_'+index+suffix).enableMultiline();
   text('additional_info_description_'+index+suffix,chunk);
  }
 }
 text('additional_info_anumber',packet.sections.beneficiary?.beneficiary_anumber);
 form.updateFieldAppearances(font);
 // Additional Part C copies are flattened to prevent duplicate AcroForm names.
 if(!internal&&hSections.includes('h2')&&setup.classification==='H-2A'&&packet.sections.h2?.h2_joint==='yes'){
  for(let n=2;n<=Number(packet.sections.h2.h2_joint_count||0);n++){
   const clone=JSON.parse(JSON.stringify(packet));
   for(const k of Object.keys(clone.sections.h2))if(k.startsWith('h2_joint_1_'))delete clone.sections.h2[k];
   for(const [k,v] of Object.entries(packet.sections.h2))if(k.startsWith('h2_joint_'+n+'_'))clone.sections.h2[k.replace('h2_joint_'+n+'_','h2_joint_1_')]=v;
   clone.sections.h2.h2_joint_count='1';clone.additionalInformation=[];
   const repeated=await PDFDocument.load(await fillForm(clone,source,true));
   const extraPart9=repeated.getForm().getFields().filter(f=>/^additional_info_anumber_copy_/.test(f.getName())).length;
   repeated.getForm().flatten();
   const order=[...keptIndexes].sort((a,b)=>a-b);
   const copied=await doc.copyPages(repeated,[order.indexOf(17)+extraPart9,order.indexOf(18)+extraPart9]);
   copied.forEach(page=>doc.addPage(page));
  }
 }
 return doc.save();
}
root.fillForm=fillForm;
if(typeof module!=='undefined'&&module.exports)module.exports={fillForm,date,symbols};
})(typeof window==='undefined'?globalThis:window);
