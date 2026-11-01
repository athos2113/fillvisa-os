/* Schema-driven I-751 export. The source template is never modified. */
(function(root){
'use strict';
async function buildPdf(source,sections){
 const {PDFDocument,StandardFonts,PDFName,PDFHexString}=root.PDFLib;
 const doc=await PDFDocument.load(source),form=doc.getForm();
 const font=await doc.embedFont(StandardFonts.Helvetica);
 const fields=new Map(form.getFields().map(f=>[f.getName(),f]));
 const extras=[];
 function textField(id){const f=fields.get(id);if(!f||typeof f.setText!=='function')throw Error('Missing PDF text field: '+id);return f;}
 function rectangle(f){return f.acroField.getWidgets()[0].getRectangle();}
 function printable(value,id){
  const text=String(value??'').replace(/\r\n?/g,'\n').replace(/\t/g,'    ');
  try{font.encodeText(text.replace(/\n/g,''));}catch(e){throw Error('The PDF font cannot display a character in '+id+'. Please review that answer.');}
  return text;
 }
 function text(id,value){
  const f=textField(id),v=printable(value,id);f.setText(v);
  if(!v)return;
  const r=rectangle(f);
  let size=Math.min(10,Math.max(6,r.height-4));
  if(f.isCombed())size=Math.min(size,(r.width/f.getMaxLength()-2)/Math.max(...Array.from(v,c=>font.widthOfTextAtSize(c,1))));
  else size=Math.min(size,(r.width-2)/Math.max(font.widthOfTextAtSize(v,1),1));
  if(size<6)throw Error('Answer is too long for PDF field '+id+'. Please shorten it before previewing.');
  f.setFontSize(size);
 }
 function check(id,on){const f=fields.get(id);if(!f||typeof f.check!=='function')throw Error('Missing PDF checkbox: '+id);on?f.check():f.uncheck();for(const widget of f.acroField.getWidgets())widget.getOrCreateBorderStyle().setWidth(1);f.updateAppearances();}
 function wrap(value,width){
  const lines=[];
  for(const paragraph of value.split('\n')){
   let line='';
   for(const character of paragraph){
    if(font.widthOfTextAtSize(line+character,9)>width&&line){
     const split=line.lastIndexOf(' ');
     if(split>0){lines.push(line.slice(0,split+1));line=line.slice(split+1);}
     else {lines.push(line);line='';}
    }
    line+=character;
   }
   lines.push(line);
  }
  return lines;
 }
 function multiline(id,value){
  const f=textField(id),r=rectangle(f),lines=wrap(printable(value,id),r.width-12);
  const capacity=Math.max(1,Math.floor((r.height-12)/12));
  f.enableMultiline();f.setFontSize(9);f.setText(lines.slice(0,capacity).join('\n'));
  return lines.slice(capacity).join('\n');
 }
 for(const [section,schema] of Object.entries(root.I751Base.maps)){
  const data=sections[section]||{},definitions=typeof schema==='function'?schema({}):schema;
  for(const field of definitions){
   if(['heading','note'].includes(field.type))continue;
   const active=root.I751Base.active(field,data,{});
   let value=active?String(data[field.id]??'').trim():'';
   if(field.pdfCheckboxes){
    const selected=field.type==='checkboxes'?value.split(','):[value];
    for(const [option,id] of Object.entries(field.pdfCheckboxes))check(id,active&&selected.includes(option));
   }
   if(field.pdfDigits){
    if(value&&!/^\d{1,3}$/.test(value))throw Error('Invalid weight in pounds.');
    const digits=value.padStart(field.pdfDigits.length,' ');
    field.pdfDigits.forEach((id,index)=>text(id,digits[index].trim()));
   }
   if(field.reference&&value)extras.push({page:field.pdfPage,part:field.pdfPart,item:field.pdfItem,value});
   if(!field.pdf)continue;
   if(field.type==='signature'){
    const f=textField(field.pdf);f.setText('');
    if(value){
     if(!/^data:image\/png;base64,/.test(value))throw Error('Invalid saved signature: '+field.id);
     const image=await doc.embedPng(value);
     f.enableReadOnly();
     f.setImage(image);
    }
   }else if(field.type==='date'){
    if(value){if(!/^\d{4}-\d{2}-\d{2}$/.test(value)||!Number.isFinite(Date.parse(value))||new Date(value).toISOString().slice(0,10)!==value)throw Error('Invalid date: '+field.id);const [y,m,d]=value.split('-');value=m+'/'+d+'/'+y;}
    text(field.pdf,value);
   }else if(field.type==='textarea'){
    const remainder=multiline(field.pdf,value);
    if(remainder){
     const item={accommodation_hearing_details:'4.a',accommodation_vision_details:'4.b',accommodation_other_details:'4.c'}[field.id];
     if(!item)throw Error('Missing overflow reference for '+field.id);
     // Keep the full explanation together in Part 11 and point to it here.
     multiline(field.pdf,'See Part 11, Additional Information.');
     extras.push({page:5,part:6,item,value});
    }
   }else if(field.type==='checkboxes')check(field.pdf,active&&value.split(',').includes('yes'));
   else text(field.pdf,value);
  }
 }
 const identity=sections['info-about-you']||{};
 const additionalNames=['additional_lastname','additional_firstname','additional_middlename','additional_a_number',...Array.from({length:5},(_,i)=>['page','part','item','text'].map(k=>'additional_'+(i+1)+'_'+k)).flat()];
 function initializeAdditional(suffix){
  for(const name of additionalNames)text(name+suffix,'');
  for(const [target,key] of [['lastname','lastname'],['firstname','firstname'],['middlename','middlename'],['a_number','a_number']])text('additional_'+target+suffix,identity[key]||'');
 }
 initializeAdditional('');
 let slot=0,copies=0,template;
 async function addContinuation(){
  template=template||await PDFDocument.load(source);
  const [page]=await doc.copyPages(template,[10]);doc.addPage(page);copies++;
  const suffix='_copy_'+copies,registered=new Set(),annots=page.node.Annots();
  for(let i=0;i<annots.size();i++){
   const ref=annots.get(i),widget=doc.context.lookup(ref),parent=widget.get(PDFName.of('Parent'))||ref;
   const dict=doc.context.lookup(parent),name=dict.get(PDFName.of('T'))?.decodeText();
   if(!name)throw Error('Unnamed widget on Part 11 template.');
   widget.set(PDFName.of('P'),page.ref);
   if(registered.has(parent.toString()))continue;
   registered.add(parent.toString());dict.set(PDFName.of('T'),PDFHexString.fromText(name+suffix));form.acroForm.addField(parent);
  }
  for(const f of form.getFields())fields.set(f.getName(),f);
  initializeAdditional(suffix);
 }
 for(const entry of extras){
  if(!entry.page||!entry.part||!entry.item)throw Error('Additional information is missing its page/part/item reference.');
  let remaining=printable(entry.value,'Part '+entry.part+', Item '+entry.item);
  while(remaining){
   const index=slot%5+1,copy=Math.floor(slot/5);
   if(copy>copies)await addContinuation();
   const suffix=copy?'_copy_'+copy:'',prefix='additional_'+index+'_';
   text(prefix+'page'+suffix,entry.page);text(prefix+'part'+suffix,entry.part);text(prefix+'item'+suffix,entry.item);
   remaining=multiline(prefix+'text'+suffix,remaining);slot++;
  }
 }
 // Retain the official printed page numbers (continuations repeat Page 11).
 // OCR footer widgets are empty overlays in this template, not page content.
 for(const f of form.getFields())if(/^Page \d+ of \d+/.test(f.getName()))text(f.getName(),'');
 form.updateFieldAppearances(font);
 return doc.save();
}
root.I751Pdf={buildPdf};
})(typeof window==='undefined'?globalThis:window);

