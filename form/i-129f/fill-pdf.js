/* Parts 1–7 PDF mapping and editable Part 8 continuation pages. */
(function(root){
'use strict';
const parts=['info-about-you','beneficiary-info','other-info','bio-info','petitioner-info','interpreter-info','preparer-info'];
const aliases={mailing_number:'mailing_numberFlr',employer_1_city:'employer_1_cityCity or Town_4'};
const controls=new Set(['has_interpreter','has_preparer','has_other_names','has_physical_2','has_employer_1','has_employer_2','employer_1_current','physical_1_to','has_residence_2','beneficiary_has_other_names','beneficiary_mailing_same_physical','beneficiary_physical_1_to','beneficiary_has_physical_2','beneficiary_has_employment','beneficiary_employer_1_current','beneficiary_has_employer_2','beneficiary_currently_in_us']);
const slots=Array.from({length:5},(_,i)=>['pgno','ptno','itno','description'].map(k=>'additional_info_'+k+'_'+(i+1)));
const identity=['additional_lastname','additional_firstname','additional_middlename','additional_info_anumber'];
const scriptFonts=[['Arabic',/\p{Script=Arabic}/u],['Hebrew',/\p{Script=Hebrew}/u],['Devanagari',/\p{Script=Devanagari}/u],['Bengali',/\p{Script=Bengali}/u],['Thai',/\p{Script=Thai}/u],['Tamil',/\p{Script=Tamil}/u],['Telugu',/\p{Script=Telugu}/u],['Gujarati',/\p{Script=Gujarati}/u],['Gurmukhi',/\p{Script=Gurmukhi}/u],['Kannada',/\p{Script=Kannada}/u],['Malayalam',/\p{Script=Malayalam}/u],['Sinhala',/\p{Script=Sinhala}/u],['Khmer',/\p{Script=Khmer}/u],['Myanmar',/\p{Script=Myanmar}/u],['Lao',/\p{Script=Lao}/u],['Armenian',/\p{Script=Armenian}/u],['Georgian',/\p{Script=Georgian}/u],['CJKsc',/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u]];
const clean=v=>String(v??'').replace(/\r\n?/g,'\n').replace(/\t/g,'    ');
function pageFor(part,item){
 const n=parseInt(item,10);
 if(part===3)return n<=2&&item!=='2.b'&&item!=='2.c'?8:9;
 if(part===4)return 9;
 return part===1?(n<=8?1:n<=19?2:n<=41?3:4):(n<=10?4:n<=19?5:n<=38?6:n<=50?7:8);
}
async function build(source,sections,options={}){
 const P=root.PDFLib,doc=await P.PDFDocument.load(source),form=doc.getForm();
 doc.registerFontkit(options.fontkit||root.fontkit);
 const latin=await doc.embedFont(P.StandardFonts.Helvetica),fonts=new Map(),usedFonts=new Map(),extras=[];
 const fields=new Map(form.getFields().map(f=>[f.getName(),f]));
 // Repair the two weight widgets that are checkboxes in the source template.
 for(const id of ['weight_1','weight_2']){
  const old=fields.get(id);if(!old||old instanceof P.PDFTextField)continue;
  const widget=old.acroField.getWidgets()[0],r=widget.getRectangle();
  const page=doc.getPages().find(p=>p.ref.toString()===widget.P()?.toString()||p.node.Annots()?.asArray().some(ref=>doc.context.lookup(ref)===widget.dict));
  if(!page)throw Error('PDF weight widget has no page: '+id);
  old.uncheck();old.updateAppearances();form.removeField(old);const replacement=form.createTextField(id);replacement.setMaxLength(1);
  replacement.addToPage(page,{x:r.x,y:r.y,width:r.width,height:r.height,borderWidth:0.5,borderColor:P.rgb(0,0,0),font:latin});fields.set(id,replacement);
 }
 const get=id=>{const f=fields.get(id)||fields.get(aliases[id]);if(!f)throw Error('PDF field missing: '+id);return f;};
 const pageOf=f=>{
  const widget=f.acroField.getWidgets()[0];
  const index=doc.getPages().findIndex(p=>p.ref.toString()===widget.P()?.toString()||p.node.Annots()?.asArray().some(ref=>doc.context.lookup(ref)===widget.dict));
  if(index<0)throw Error('PDF widget has no page: '+f.getName());return String(index+1);
 };
 async function fontFor(text){
  try{latin.encodeText(text.replace(/\n/g,''));return latin;}catch(e){}
  const names=['NotoSans-Regular.ttf',...scriptFonts.filter(([,re])=>re.test(text)).map(([s])=>'NotoSans'+s+'-Regular.'+(s==='CJKsc'?'otf':'ttf'))];
  for(const name of names){
   if(!fonts.has(name)){
    const bytes=options.loadFont?await options.loadFont(name):await (async()=>{const r=await fetch('fonts/'+name);if(!r.ok)throw Error('Could not load Unicode font: '+name);return r.arrayBuffer();})();
    const font=await doc.embedFont(bytes,{subset:!name.endsWith('.otf')});fonts.set(name,{font,chars:new Set(font.getCharacterSet())});
   }
   const {font,chars}=fonts.get(name);
   if([...text].every(c=>c==='\n'||chars.has(c.codePointAt(0))))return font;
  }
  throw Error('No bundled font supports all characters in this answer. Please contact support; your saved answer has not been changed.');
 }
 async function put(id,value,size=10){const f=get(id),text=clean(value),font=await fontFor(text);f.setText(text);if(!f.acroField.getDefaultAppearance())f.acroField.setDefaultAppearance('/Helv 10 Tf 0 g');f.setFontSize(size);usedFonts.set(f.getName(),font);return f;}
 function wrap(text,font,width){
  const result=[];
  for(const paragraph of text.split('\n')){
   let line='';
   const chars=typeof Intl.Segmenter==='function'?[...new Intl.Segmenter(undefined,{granularity:'grapheme'}).segment(paragraph)].map(x=>x.segment):[...paragraph];
   for(const ch of chars){if(line&&font.widthOfTextAtSize(line+ch,10)>width){const space=line.lastIndexOf(' ');if(space>0){result.push(line.slice(0,space));line=line.slice(space+1);}else{result.push(line);line='';}}line+=ch;}result.push(line);
  }
  return result;
 }
 for(const [index,page] of parts.entries()){
  const part=index+1,data=sections[page]||{};
  for(const field of root.I129FBase.maps[page]){
   if(['heading','note'].includes(field.type)||controls.has(field.id))continue;
   let value=root.I129FBase.active(field,data,{})?clean(data[field.id]):'';
   if(field.id==='employer_1_to'&&data.has_employer_1==='yes'&&data.employer_1_current==='yes')value='PRESENT';
   if(field.id==='beneficiary_employer_1_to'&&data.beneficiary_has_employment==='yes'&&data.beneficiary_employer_1_current==='yes')value='PRESENT';
   if(field.type==='signature'){
    const signatureField=await put(field.id,'');
    if(value){
     if(!/^data:image\/png;base64,/.test(value))throw Error('Invalid saved signature: '+field.label);
     signatureField.setImage(await doc.embedPng(value));usedFonts.delete(field.id);
    }continue;
   }
   if(field.id==='weight'){
    if(value&&!/^[1-9]\d{0,2}$/.test(value))throw Error('Weight must be a whole number from 1 to 999 pounds.');
    const digits=value.padStart(3,' ');
    for(let i=0;i<3;i++){const box=await put('weight_'+(i+1),digits[i].trim());box.setAlignment(P.TextAlignment.Center);}continue;
   }
   if(field.type==='textarea'&&!['beneficiary_meeting_explanation','other_arrests_explanation'].includes(field.id)){
    if(value){const item=field.reference.match(/Items? (.+)$/)?.[1]?.replace(/–/g,'-');if(!item)throw Error('Missing continuation reference: '+field.id);extras.push({page:String(pageFor(part,item)),part:String(part),item,value:field.label+'\n'+value});}continue;
   }
   if(field.id.endsWith('_unit')||['radio','checkboxes'].includes(field.type)){
    const prefix=field.id.endsWith('_unit')?field.id.slice(0,-5):field.id;
    for(const [option] of field.options){const f=get(prefix+'_'+option);if(value.split(',').includes(option))f.check();else f.uncheck();f.updateAppearances();}continue;
   }
   if(field.type==='date'&&value&&value!=='PRESENT'){
    if(!/^\d{4}-\d{2}-\d{2}$/.test(value))throw Error('Invalid date: '+field.label);
    value=value.slice(5,7)+'/'+value.slice(8,10)+'/'+value.slice(0,4);
   }
   const f=get(field.id),r=f.acroField.getWidgets()[0].getRectangle(),font=await fontFor(value);
   const item=field.id==='interpreter_language'?'6':field.label.match(/^(\d+(?:\.[a-z])?)/)?.[1];
   const multiline=field.type==='textarea';if(multiline){f.enableMultiline();f.disableScrolling();}
   const overflow=multiline?wrap(value,font,r.width-10).length>Math.floor((r.height-12)/(font.heightAtSize(10)*1.2)):value.includes('\n')||font.widthOfTextAtSize(value,10)>r.width-6;
   if(value&&overflow&&!f.isCombed()){
    if(!item)throw Error('Missing item reference: '+field.id);
    extras.push({page:pageOf(f),part:String(part),item,value:field.label+'\n'+value});value='See Part 8';
   }
   await put(field.id,value);
 }
 }
 let template=null,copy=0;
 const part8Page=Number(pageOf(get(identity[0])))-1;
 async function initialize(suffix){
  for(const id of [...identity,...slots.flat()])await put(id+suffix,'');
  const data=sections['info-about-you']||{};
  for(const [i,key] of ['lastname','firstname','middlename','a_number'].entries()){
   const f=await put(identity[i]+suffix,data[key]);if(!f.isCombed())f.setFontSize(0);
  }
 }
 await initialize('');
 async function addContinuation(){
  if(!template)template=await P.PDFDocument.load(source);
  const [page]=await doc.copyPages(template,[part8Page]);doc.addPage(page);copy++;
  const suffix='_continuation_'+copy,registered=new Set(),annots=page.node.Annots();
  for(const widgetRef of annots.asArray()){
   const widget=doc.context.lookup(widgetRef),fieldRef=widget.get(P.PDFName.of('Parent'))||widgetRef,dict=doc.context.lookup(fieldRef),name=dict.get(P.PDFName.of('T'))?.decodeText();
   if(!name)continue;widget.set(P.PDFName.of('P'),page.ref);
   if(registered.has(fieldRef.toString()))continue;registered.add(fieldRef.toString());
   dict.set(P.PDFName.of('T'),P.PDFHexString.fromText(name+suffix));form.acroForm.addField(fieldRef);
  }
  for(const f of form.getFields())fields.set(f.getName(),f);
  await initialize(suffix);
 }
 let slot=0;
 for(const extra of extras){
  const font=await fontFor(extra.value);
  // All five source rectangles share a width; retain one line queue to avoid losing characters at page boundaries.
  const width=Math.min(...slots.map(s=>get(s[3]).acroField.getWidgets()[0].getRectangle().width))-10;
  const lines=wrap(extra.value,font,width);
  while(lines.length){
   if(slot&&slot%5===0)await addContinuation();
   const suffix=copy?'_continuation_'+copy:'',names=slots[slot%5].map(n=>n+suffix),f=get(names[3]),r=f.acroField.getWidgets()[0].getRectangle();
   const capacity=Math.max(1,Math.floor((r.height-12)/(font.heightAtSize(10)*1.2)));
   for(const [i,value] of [extra.page,extra.part,extra.item].entries()){const ref=await put(names[i],value);ref.setAlignment(P.TextAlignment.Center);}
   f.enableMultiline();f.disableScrolling();await put(names[3],lines.splice(0,capacity).join('\n'));slot++;
  }
 }
 for(const [name,font] of usedFonts)get(name).updateAppearances(font);
 // Full CFF OpenType fonts must identify the embedded stream as OpenType.
 for(const [name,{font}] of fonts){
  if(!name.endsWith('.otf'))continue;
  await font.embed();
  const dictionary=doc.context.lookup(font.ref),descendants=dictionary.lookup(P.PDFName.of('DescendantFonts'));
  const descendant=doc.context.lookup(descendants.get(0));
  const descriptor=descendant.lookup(P.PDFName.of('FontDescriptor'));
  const file3=P.PDFName.of('FontFile3'),file2=P.PDFName.of('FontFile2');
  if(!descriptor.get(file3)){
   descriptor.set(file3,descriptor.get(file2));descriptor.delete(file2);
   descendant.set(P.PDFName.of('Subtype'),P.PDFName.of('CIDFontType0'));
   descendant.delete(P.PDFName.of('CIDToGIDMap'));
  }
  const stream=descriptor.lookup(file3);
  stream.dict.set(P.PDFName.of('Subtype'),P.PDFName.of('OpenType'));
 }
 return doc.save({updateFieldAppearances:false});
}
root.I129FPdf={build};
})(typeof window==='undefined'?globalThis:window);
