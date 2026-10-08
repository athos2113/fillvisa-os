/* Parts 1–6 and reusable Part 7 continuation support. */
(function(root){
'use strict';
const slots=Array.from({length:5},(_,i)=>['pgno','ptno','itno','description'].map(k=>'additional_info_'+k+'_'+(i+1)));
const identity=['additional_lastname','additional_firstname','additional_middlename','additional_info_anumber'];
const controls=new Set(['has_attorney','has_physical_2','has_foreign_address','has_employer_2','physical_1_to','employer_1_to','foreign_employment_history','different_interpreter','different_preparer']);
const parts=[['info-about-you',1],['employment',2],['employment-abroad',3],['beneficiary-info',4],['interpreter-info',5],['preparer-info',6]];
function reference(id,part,field){
 const sub={street:'a',unit:'b',number:'b',city:'c',state:'d',zip:'e',province:'f',postal:'g',country:'h'};
 if(part>=3){
  const address=id.match(/^(foreign_employer|interpreter|preparer)_(street|unit|number|city|state|zip|province|postal|country)$/);
  const special={beneficiary_interpreter_language:'1.b',beneficiary_preparer_name:'2',interpreter_language:'Certification'};
  return {page:part<=4?'3':part===5?'4':/^(preparer_(telephone|mobile|email|sign|sign_date))$/.test(id)?'5':'4',part:String(part),item:address?(part===3?'2.':'3.')+sub[address[2]]:special[id]||field.label.match(/^([\d]+(?:\.[a-z])?)/)?.[1]||'1'};
 }
 let m=id.match(/^(physical_[12]|foreign_address|employer_[12])_(.+)$/);
 if(m){
  const [,prefix,key]=m,employer=prefix.startsWith('employer');
  const page=employer?(prefix==='employer_2'&&['occupation','from','to'].includes(key)?'3':'2'):(prefix==='foreign_address'&&['from','to'].includes(key)?'2':'1');
  const base={physical_1:4,physical_2:6,foreign_address:8,employer_1:2,employer_2:6}[prefix];
  let item;
  if(key==='name')item=prefix==='employer_1'?'1':'5';
  else if(key==='occupation')item=prefix==='employer_1'?'3':'7';
  else if(['from','to'].includes(key))item=String(base+(employer?2:1))+'.'+(key==='from'?'a':'b');
  else item=base+'.'+(prefix==='foreign_address'?{province:'d',postal:'e',country:'f'}[key]||sub[key]:sub[key]);
  return {page,part:String(part),item};
 }
 return {page:id.startsWith('parent_')?'2':'1',part:String(part),item:field.label.match(/^([\d]+(?:\.[a-z])?)/)?.[1]||'Attorney'};
}
async function build(source,sections){
 const {PDFDocument,StandardFonts,PDFName,PDFHexString}=root.PDFLib;
 const doc=await PDFDocument.load(source),form=doc.getForm();
 const font=await doc.embedFont(StandardFonts.Helvetica),extras=[];
 const clean=value=>String(value||'').replace(/\r\n?/g,'\n');
 function put(id,value,size=10){
  const f=form.getTextField(id);f.setText(clean(value));f.setFontSize(size);return f;
 }
 // Wrap by actual font metrics, splitting long words as well as ordinary prose.
 function wrap(value,width){
  const lines=[];
  for(const paragraph of clean(value).split('\n')){
   let line='';
   for(const char of paragraph){
    if(font.widthOfTextAtSize(line+char,10)>width){lines.push(line);line='';}
    line+=char;
   }
   lines.push(line);
  }
  return lines;
 }
 const data1=sections['info-about-you']||{};
 for(const [pageId,part] of parts){
  const data=sections[pageId]||{};
  for(const field of root.I130ABase.maps[pageId]){
   if(['heading','note'].includes(field.type)||controls.has(field.id))continue;
   const value=root.I130ABase.active(field,data,{})?clean(data[field.id]):'';
   if(field.type==='textarea'){
    if(value)extras.push({page:String(part),part:String(part),item:part===1?'4-7':part===2?'1-8':'1',value:field.label+'\n'+value});
    continue;
   }
   if(field.type==='signature'){
    const signatureField=put(field.id,'');
    if(value){
     if(!/^data:image\/png;base64,/.test(value))throw Error('Invalid saved signature: '+field.label);
     signatureField.setImage(await doc.embedPng(value));
    }
    continue;
   }
   if(field.id.endsWith('_unit')||['radio','checkboxes'].includes(field.type)){
    const prefix=field.id.endsWith('_unit')?field.id.slice(0,-5):field.id;
    for(const [option] of field.options){
     const f=form.getCheckBox(prefix+'_'+option);
     if(value.split(',').includes(option))f.check();else f.uncheck();
     f.updateAppearances();
    }
    continue;
   }
   let text=value;
   if(field.type==='date'&&value){
    if(!/^\d{4}-\d{2}-\d{2}$/.test(value))throw Error('Invalid date: '+field.label);
    text=value.slice(5,7)+'/'+value.slice(8,10)+'/'+value.slice(0,4);
   }
   const pdfField=form.getTextField(field.id),rect=pdfField.acroField.getWidgets()[0].getRectangle();
   // Keep ordinary values readable; preserve the full answer in Part 7 if too long.
   const width=font.widthOfTextAtSize(text,10),max=pdfField.getMaxLength();
   if(text&&(width>rect.width-6||(max&&text.length>max))&&!pdfField.isCombed()){
    extras.push({...reference(field.id,part,field),value:field.label+'\n'+text});
    text='See Part 7';
   }
   put(field.id,text);
  }
 }
 let template=null,copy=0;
 const continuationNames=[...identity,...slots.flat()];
 function initialize(suffix){
  for(const name of continuationNames)put(name+suffix,'');
  [data1.lastname,data1.firstname,data1.middlename,data1.a_number].forEach((v,i)=>{
   const f=put(identity[i]+suffix,v);
   if(!f.isCombed())f.setFontSize(0);
  });
 }
 initialize('');
 async function addPage(){
  if(!template)template=await PDFDocument.load(source);
  const [page]=await doc.copyPages(template,[5]);doc.addPage(page);copy++;
  const suffix='_continuation_'+copy,registered=new Set(),annots=page.node.Annots();
  for(let i=0;i<annots.size();i++){
   const widgetRef=annots.get(i),widget=doc.context.lookup(widgetRef);
   const fieldRef=widget.get(PDFName.of('Parent'))||widgetRef,dict=doc.context.lookup(fieldRef);
   const name=dict.get(PDFName.of('T'))?.decodeText();if(!name)continue;
   widget.set(PDFName.of('P'),page.ref);
   if(registered.has(fieldRef.toString()))continue;
   registered.add(fieldRef.toString());
   dict.set(PDFName.of('T'),PDFHexString.fromText(name+suffix));
   form.acroForm.addField(fieldRef);
  }
  initialize(suffix);
 }
 let slot=0;
 for(const extra of extras){
  let remaining=extra.value;
  while(remaining){
   if(slot&&slot%5===0)await addPage();
   const suffix=copy?'_continuation_'+copy:'',names=slots[slot%5].map(n=>n+suffix);
   const f=form.getTextField(names[3]),rect=f.acroField.getWidgets()[0].getRectangle();
   const lines=wrap(remaining,rect.width-10),capacity=Math.floor((rect.height-12)/12);
   const chunk=lines.splice(0,capacity).join('\n');remaining=lines.join('\n');
   put(names[0],extra.page);put(names[1],extra.part);put(names[2],extra.item);
   f.enableMultiline();f.disableScrolling();put(names[3],chunk);slot++;
  }
 }
 form.updateFieldAppearances(font);
 return doc.save();
}
root.I130APdf={build};
})(typeof window!=='undefined'?window:globalThis);
