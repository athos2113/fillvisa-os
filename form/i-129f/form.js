/* Form rendering, conditional validation and local persistence for base parts. */
(function(){
'use strict';
const B=I129FBase;
let autosaveTimer;
function hideAutosaveToast(){
 clearTimeout(autosaveTimer);
 const toast=document.getElementById('autosave-toast');if(toast)toast.style.display='none';
}
function showAutosaveToast(){
 let toast=document.getElementById('autosave-toast');
 if(!toast){
  toast=document.createElement('div');toast.id='autosave-toast';
  toast.style.cssText='display:none; position:fixed; bottom:30px; right:30px; background:#d1e7dd; color:#0f5132; padding:12px 20px; border-radius:6px; box-shadow:0 2px 8px rgba(0,0,0,0.15); z-index:1000;';
  toast.textContent='\u2705 Autosaved';toast.setAttribute('role','status');toast.setAttribute('aria-live','polite');
  document.body.appendChild(toast);
 }
 clearTimeout(autosaveTimer);toast.style.display='block';
 autosaveTimer=setTimeout(hideAutosaveToast,1500);
}
const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text)n.textContent=text;if(cls)n.className=cls;return n;};
function read(key){try{const value=JSON.parse(localStorage.getItem(key)||'{}');return value&&typeof value==='object'&&!Array.isArray(value)?value:{};}catch(e){return {};}}
function render(page,container,setup){
 const schema=B.maps[page];if(!schema)return null;
 const fields=typeof schema==='function'?schema(setup):schema;
 let data=read('i129f-'+page);
 fields.forEach(f=>{if(f.prefill&&!Object.hasOwn(data,f.id))data[f.id]=f.prefill(read)||'';});
 const controls=new Map(),touched=new Set();let attempted=false;
 const form=el('form');form.noValidate=true;form.id='baseForm';
 const status=el('p','Changes save in this browser.','small text-body-secondary');status.setAttribute('role','status');container.append(status,form);
 const errorSummary=el('div',null,'alert alert-danger');errorSummary.hidden=true;errorSummary.setAttribute('role','alert');form.append(errorSummary);
 const showStorageError=()=>{status.textContent='Unable to save. Enable browser storage or free up space before continuing.';status.className='alert alert-danger';};
 function save(){
  data=B.values(fields,data,setup);
  try{
   localStorage.setItem('i129fValid-'+page,'false');
   localStorage.setItem('i129f-'+page,JSON.stringify(data));

   window.dispatchEvent(new Event('i129f-validation-changed'));
   status.textContent='Saved in this browser.';status.className='small text-body-secondary';showAutosaveToast();return true;
  }catch(e){hideAutosaveToast();showStorageError();return false;}
 }
 function check(f){
  const item=controls.get(f.id);if(!item||item.wrap.hidden||!item.inputs.length)return '';
  const value=data[f.id]||'';
  let message=B.error(f,value,data,setup);
  if(!message){const bad=item.inputs.find(i=>!i.validity.valid);if(bad)message=bad.validationMessage;}
  const valid=!message&&!!String(value).trim();
  item.inputs.forEach(i=>{i.classList.toggle('is-valid',valid);i.classList.toggle('is-invalid',!!message);i.setAttribute('aria-invalid',String(!!message));});
  item.feedback.textContent=message;item.feedback.style.display=message?'block':'none';
  item.success.textContent=valid?'Looks good.':'';item.success.style.display=valid?'block':'none';return message;
 }
 function conditions(){
  fields.forEach(f=>{if(f.derive&&B.active(f,data,setup)){data[f.id]=f.derive(data,setup);const control=controls.get(f.id);if(control)control.inputs.forEach(i=>i.value=data[f.id]);}});
  fields.forEach(f=>{
   const item=controls.get(f.id);if(!item)return;
   const visible=B.active(f,data,setup);item.wrap.hidden=!visible;
   item.inputs.forEach(i=>{i.disabled=!visible;i.required=visible&&!!f.required&&f.type!=='signature'&&f.type!=='checkboxes';});
   if(!visible){if(item.reset)item.reset();delete data[f.id];item.inputs.forEach(i=>{if(i.type==='radio'||i.type==='checkbox')i.checked=false;else i.value='';i.classList.remove('is-invalid','is-valid');i.removeAttribute('aria-invalid');});item.feedback.textContent='';item.feedback.style.display='none';if(item.success){item.success.textContent='';item.success.style.display='none';}touched.delete(f.id);}
  });
 }
 fields.forEach(f=>{
  if(f.type==='heading'||f.type==='note'){
   const wrap=el(f.type==='heading'?'h2':'p',f.label,f.type==='heading'?'h4 mt-5 mb-3':'alert alert-light border');
   wrap.style.whiteSpace='pre-line';form.append(wrap);controls.set(f.id,{wrap,inputs:[],feedback:el('div')});return;
  }
  const wrap=el(['radio','checkboxes'].includes(f.type)?'fieldset':'div',null,'mb-4');const caption=el(['radio','checkboxes'].includes(f.type)?'legend':'label',f.label+(f.required?' *':''),'form-label fs-6');
  if(!['radio','checkboxes'].includes(f.type))caption.htmlFor=f.id;
  wrap.append(caption);const inputs=[];let reset=null;const feedback=el('div',null,'invalid-feedback'),success=el('div',null,'valid-feedback');feedback.id=f.id+'_error';success.id=f.id+'_valid';
  function update(value){data[f.id]=value;conditions();save();touched.add(f.id);fields.filter(x=>attempted||touched.has(x.id)).forEach(check);}
  if(['radio','checkboxes'].includes(f.type)){
   f.options.forEach(([value,label])=>{const line=el('div',null,'form-check mb-2');const i=el('input',null,'form-check-input');i.type=f.type==='checkboxes'?'checkbox':'radio';i.id=f.id+'_'+value;i.name=f.id;i.value=value;i.checked=f.type==='checkboxes'?String(data[f.id]||'').split(',').includes(value):data[f.id]===value;const l=el('label',label,'form-check-label');l.htmlFor=i.id;line.append(i,l);wrap.append(line);inputs.push(i);i.addEventListener('change',()=>update(f.type==='checkboxes'?inputs.filter(x=>x.checked).map(x=>x.value).join(','):i.value));});
  }else if(f.type==='signature'){
   const input=el('input');input.type='hidden';input.id=f.id;input.name=f.id;input.value=data[f.id]||'';inputs.push(input);
   const canvas=el('canvas');canvas.width=700;canvas.height=240;canvas.id=f.id+'_canvas';canvas.setAttribute('aria-label',f.label+' drawing area');canvas.className='sign-pad';canvas.style.cssText='width:350px;max-width:100%;height:auto;aspect-ratio:350/120;border:2px dashed #6c757d;background:white;touch-action:none;display:block;margin:0 auto;';
   wrap.append(el('p','Use your finger or mouse to draw your signature. You may leave it blank and sign the PDF on paper or digitally later.','alert alert-primary mb-4'),canvas,input);
   const ctx=canvas.getContext('2d');let drawing=false;let changed=false;let version=0;
   const redraw=new Image();const savedVersion=version;
   redraw.onload=()=>{if(version===savedVersion)ctx.drawImage(redraw,0,0,canvas.width,canvas.height);};
   if(/^data:image\/png;base64,/.test(input.value))redraw.src=input.value;
   const point=e=>{const r=canvas.getBoundingClientRect();return [(e.clientX-r.left)*canvas.width/r.width,(e.clientY-r.top)*canvas.height/r.height];};
   canvas.addEventListener('pointerdown',e=>{e.preventDefault();version++;drawing=true;changed=true;canvas.setPointerCapture(e.pointerId);const [x,y]=point(e);ctx.beginPath();ctx.lineWidth=3;ctx.lineCap='round';ctx.lineJoin='round';ctx.strokeStyle='#000';ctx.moveTo(x,y);ctx.lineTo(x+0.1,y);ctx.stroke();});
   canvas.addEventListener('pointermove',e=>{if(!drawing)return;const [x,y]=point(e);ctx.lineTo(x,y);ctx.stroke();});
   const finish=()=>{if(!drawing)return;drawing=false;if(changed){input.value=canvas.toDataURL('image/png');update(input.value);changed=false;}};
   canvas.addEventListener('pointerup',finish);canvas.addEventListener('pointercancel',finish);canvas.addEventListener('lostpointercapture',finish);
   reset=()=>{version++;drawing=false;ctx.clearRect(0,0,canvas.width,canvas.height);input.value='';};
   const clear=el('button','Clear','btn btn-warning d-block mx-auto mt-4');clear.type='button';clear.addEventListener('click',()=>{version++;drawing=false;ctx.clearRect(0,0,canvas.width,canvas.height);input.value='';update('');});wrap.append(clear);
  }else{
   const i=el(f.type==='textarea'?'textarea':f.type==='select'?'select':'input',null,f.type==='select'?'form-select':'form-control');i.id=f.id;i.name=f.id;
   if(f.type==='select'){i.append(new Option(f.placeholder||'Select an option',''));f.options.forEach(([v,l])=>i.append(new Option(l,v)));}
   else if(f.type==='textarea')i.rows=4;
   else i.type=f.type;
   ['min','max','step','maxLength'].forEach(k=>{if(f[k]!==undefined)i[k]=f[k];});
   i.readOnly=!!f.readonly;i.value=data[f.id]||'';i.addEventListener('input',()=>update(f.type==='checkboxes'?inputs.filter(x=>x.checked).map(x=>x.value).join(','):i.value));i.addEventListener('change',()=>update(f.type==='checkboxes'?inputs.filter(x=>x.checked).map(x=>x.value).join(','):i.value));i.addEventListener('blur',()=>{touched.add(f.id);check(f);});inputs.push(i);wrap.append(i);
  }
  inputs.forEach(i=>i.setAttribute('aria-describedby',feedback.id+' '+success.id));wrap.append(success,feedback);form.append(wrap);controls.set(f.id,{wrap,inputs,feedback,success,reset});
 });
 conditions();
 const submit=el('button',['info-about-you','beneficiary-info','other-info','bio-info','petitioner-info','interpreter-info','preparer-info'].includes(page)?'Validate and continue':'Validate this page','btn btn-primary');submit.type='submit';form.append(submit);
 form.addEventListener('submit',e=>{
  e.preventDefault();attempted=true;conditions();
  const errors=fields.filter(f=>check(f));
  errorSummary.hidden=errors.length===0;
  if(errors.length){errorSummary.textContent='Please correct '+errors.length+' field(s) before continuing.';controls.get(errors[0].id).inputs[0]?.focus();return;}
  if(!save())return;
  try{localStorage.setItem('i129fValid-'+page,'true');window.dispatchEvent(new Event('i129f-validation-changed'));}catch(e){showStorageError();return;}
  status.textContent='Answers validated and saved.';
  const next={'info-about-you':'beneficiary-info','beneficiary-info':'other-info','other-info':'bio-info','bio-info':'petitioner-info','petitioner-info':'interpreter-info','interpreter-info':'preparer-info','preparer-info':'download'}[page];
  if(next)window.location.href=next+'.html';
 });

 return form;
}
function explanations(setup){const result=[];Object.entries(B.maps).forEach(([page,fields])=>{if(!I129FPages.route(setup).includes(page))return;fields=typeof fields==='function'?fields(setup):fields;const data=read('i129f-'+page);fields.forEach(f=>{if(f.reference&&B.active(f,data,setup)&&data[f.id])result.push({reference:f.reference,label:f.label,value:data[f.id]});});});return result;}
function review(container,setup){
 Object.entries(B.maps).forEach(([page,fields])=>{
  if(!I129FPages.route(setup).includes(page))return;
  fields=typeof fields==='function'?fields(setup):fields;
  const section=el('details',null,'border rounded p-3 mb-3');
  let valid=false;try{valid=localStorage.getItem('i129fValid-'+page)==='true';}catch(e){}
  section.append(el('summary',I129FPages.parts[page][0]+' - '+(valid?'Validated':'Needs review'),'fw-semibold'));
  const data=B.values(fields,read('i129f-'+page),setup);const list=el('dl',null,'mt-3');
  fields.filter(f=>Object.hasOwn(data,f.id)&&data[f.id]).forEach(f=>{
   const val=f.type==='signature'?'Signature added':f.type==='checkboxes'?f.options.filter(([v])=>data[f.id].split(',').includes(v)).map(([,label])=>label).join('; '):f.options?(f.options.find(([v])=>v===data[f.id])||['',data[f.id]])[1]:data[f.id];
   list.append(el('dt',f.label),el('dd',val));
  });section.append(list);const edit=el('a','Edit this section');edit.href=page+'.html';section.append(edit);container.append(section);
 });
}
window.I129FForms={render,explanations,review,showAutosaveToast,hideAutosaveToast};
})();
