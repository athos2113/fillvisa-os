/* Shared controller for the skeleton pages. No field-completion claims. */
'use strict';
const {classifications,parts,route,blocks}=I129Flow;
const key='i129-setup';
let state={};
const notice=document.getElementById('storageNotice');
function storageError(){ notice.hidden=false; }
try { const saved=JSON.parse(localStorage.getItem(key)||'{}'); if(saved&&typeof saved==='object'&&!Array.isArray(saved)) state=saved; } catch(e){storageError();}
state.hasExplanations=I129Forms.explanations(state).length>0;
const page=document.body.dataset.page;
const content=document.getElementById('content');
const nav=document.getElementById('sectionNav');
const eligibleMultiple=['H-2A','H-2B','H-3','H-3-SE','O-2','P-1-ML','P-1','P-1S','P-2','P-2S','P-3','P-3S','Q-1'];
function element(tag,text,cls){const el=document.createElement(tag); if(text)el.textContent=text; if(cls)el.className=cls; return el;}
function href(id){return id+'.html';}
function persist(){
 try {
  localStorage.setItem(key,JSON.stringify(state));
  // Routing changes invalidate base validation because active fields may change.
  Object.keys(localStorage).filter(k=>k.startsWith('i129Valid-')).forEach(k=>localStorage.removeItem(k));
  window.dispatchEvent(new Event('i129-validation-changed'));
  I129Forms.showAutosaveToast();
  return true;
 } catch(e){I129Forms.hideAutosaveToast();storageError();return false;}
}
function summary(parent){
 const list=element('ol',null,'mb-0');
 route(state).filter(id=>id!=='setup'&&id!=='review').forEach(id=>{
  const li=element('li'); const a=element('a',parts[id][0]);a.href=href(id);li.append(a);list.append(li);
 });parent.append(list);
}
function navigation(){
 const active=route(state);nav.replaceChildren();
 active.forEach(id=>{let validated=false;try{validated=(id==='setup'||!!I129Base.maps[id])&&localStorage.getItem('i129Valid-'+id)==='true';}catch(e){}
 const a=element('a',parts[id][0]+(validated?' \u2705':''),'list-group-item list-group-item-action'+(id===page?' active':''));a.href=href(id);if(validated)a.setAttribute('aria-label',parts[id][0]+' - Validated');if(id===page)a.setAttribute('aria-current','step');nav.append(a);});
 document.getElementById('routeLabel').textContent=classifications[state.classification]||'Choose a classification';
 const index=active.indexOf(page);
 document.getElementById('stepLabel').textContent=index<0?'Section not selected':`Step ${index+1} of ${active.length}`;
 const previous=document.getElementById('previous');const next=document.getElementById('next');
 previous.href=index>0?href(active[index-1]):'index.html';
 previous.textContent=index>0?'Previous':'Introduction';
 next.hidden=page==='setup'||index<0||index===active.length-1;
 if(!next.hidden)next.href=href(active[index+1]);
}
function selectField(form,name,label,options){
 const wrap=element('div',null,'mb-4');wrap.dataset.field=name;
 const lab=element('label',label,'form-label');lab.htmlFor=name;
 const select=element('select',null,'form-select');select.id=name;select.name=name;select.required=true;
 select.append(new Option('Select an option',''));
 options.forEach(([value,text])=>select.append(new Option(text,value)));
 select.value=state[name]||'';
 wrap.append(lab,select);form.append(wrap);
 select.addEventListener('change',()=>{
  state[name]=select.value;
  if(name==='classification') {
   state.action='';document.getElementById('action').value='';
   state.beneficiaryType='named'; document.getElementById('beneficiaryType').value='named';
   state.multiple='no';document.getElementById('multiple').value='no';
  }
  conditional();persist();navigation();preview.replaceChildren();summary(preview);
 });
 return select;
}
let preview;
function conditional(){
 const c=state.classification||'';
 const h2=['H-2A','H-2B'].includes(c);const blanket=c==='L-BLANKET';
 const setVisible=(name,visible)=>{const el=document.getElementById(name);el.closest('[data-field]').hidden=!visible;el.disabled=!visible;};
 setVisible('beneficiaryType',h2);
 if(!h2)state.beneficiaryType='named';
 setVisible('multiple',!blanket&&state.beneficiaryType!=='unnamed'&&eligibleMultiple.includes(c));
 if(blanket||state.beneficiaryType==='unnamed'||!eligibleMultiple.includes(c))state.multiple='no';
 setVisible('location',!blanket);setVisible('action',!blanket);
 setVisible('petition_receipt',!blanket);setVisible('worker_count',!blanket);
 const workers=document.getElementById('worker_count');
 const multipleAllowed=eligibleMultiple.includes(c);
 workers.max=multipleAllowed?'':'1';
 workers.min=state.multiple==='yes'?'2':'1';
 if(!multipleAllowed){workers.value='1';state.worker_count='1';}
 if(multipleAllowed&&state.beneficiaryType!=='unnamed'&&state.multiple==='no')workers.max='1';
 const trade=['TN-CA','TN-MX','H-1B1-CL','H-1B1-SG'].includes(c);
 const action=document.getElementById('action');
 Array.from(action.options).forEach(o=>{
  if(!o.value)return;
  const disabled=(['trade-extend','trade-change'].includes(o.value)&&!trade)
   ||(o.value==='change'&&state.basis!=='new')
   ||(o.value!=='notify'&&state.location==='outside');
  o.disabled=disabled;
 });
 if(action.selectedOptions[0]?.disabled){action.value='';state.action='';}
 document.getElementById('routeWarning').hidden=!(state.action==='notify'&&['E-1','E-2','E-3','TN-CA','TN-MX','H-1B1-CL','H-1B1-SG'].includes(c));
}
function setupFeedback(form){
 const touched=new Set(),items=[];
 form.querySelectorAll('input,select,textarea').forEach(input=>{
  const valid=element('div',null,'valid-feedback'),invalid=element('div',null,'invalid-feedback');
  valid.id=input.id+'_valid';invalid.id=input.id+'_error';
  input.setAttribute('aria-describedby',valid.id+' '+invalid.id);
  input.parentElement.append(valid,invalid);items.push({input,valid,invalid});
 });
 function refresh(all=false){
  items.forEach(({input,valid,invalid})=>{
   const active=!input.disabled&&(all||touched.has(input));
   const bad=active&&!input.validity.valid,good=active&&!bad&&!!input.value.trim();
   input.classList.toggle('is-invalid',bad);input.classList.toggle('is-valid',good);
   input.setAttribute('aria-invalid',String(bad));
   invalid.textContent=bad?input.validationMessage:'';invalid.style.display=bad?'block':'none';
   valid.textContent=good?'Looks good.':'';valid.style.display=good?'block':'none';
   if(input.disabled)touched.delete(input);
  });
 }
 for(const event of ['input','change','focusout'])form.addEventListener(event,e=>{if(items.some(x=>x.input===e.target)){touched.add(e.target);refresh();}});
 form.noValidate=true;
 form.addEventListener('submit',()=>refresh(true));
}
function setup(){
 content.append(element('p','Choose the case details to preview which parts and supplements appear. Base petition fields are available; supplement fields are still being added.','text-body-secondary'));
 const form=element('form');
 content.append(form);
 selectField(form,'classification','Requested classification',Object.entries(classifications));
 selectField(form,'basis','Basis for this petition', [['new','New employment'],['continue','Continuation with the same employer'],['change-employment','Change in previously approved employment'],['concurrent','New concurrent employment'],['change-employer','Change of employer'],['amend','Amended petition']]);
 selectField(form,'location','Where is the beneficiary currently?', [['inside','Inside the United States'],['outside','Outside the United States']]);
 selectField(form,'action','Requested action', [['notify','Notify an office for visa / admission'],['change','Change status and extend stay'],['extend','Extend stay in current status'],['amend','Amend stay without additional time'],['trade-extend','Extend trade-agreement status (TN / H-1B1)'],['trade-change','Change to trade-agreement status (TN / H-1B1)']]);
 const warning=element('p','The PDF notes that a petition is not required for overseas E-1, E-2, E-3, H-1B1 or TN visa beneficiaries. Confirm the appropriate filing route and any Canadian TN petition option before proceeding.','alert alert-warning');warning.id='routeWarning';warning.hidden=true;form.append(warning);
 selectField(form,'beneficiaryType','Type of H-2 beneficiaries', [['named','Named'],['unnamed','Unnamed']]);
 selectField(form,'multiple','Does this petition include additional named workers?', [['no','No'],['yes','Yes - show Attachment-1']]);
 form.append(element('p','Attachment-1 is a section preview. Group eligibility and worker-count limits will be validated when beneficiary fields are added.','small text-body-secondary'));
 selectField(form,'preparer','Did someone other than the petitioner prepare the form?', [['no','No'],['yes','Yes']]);
 selectField(form,'additional','Is additional information or an explanation needed?', [['no','Not currently'],['yes','Yes - include Part 9']]);
 const detailFields=[['petition_receipt','3. Most recent petition / application receipt number (enter None if none exists)','text'],['worker_count','5. Total number of workers included','number']];
 detailFields.forEach(([name,label,type])=>{
  const wrap=element('div',null,'mb-4');wrap.dataset.field=name;
  const lab=element('label',label,'form-label');lab.htmlFor=name;
  const input=element('input',null,'form-control');input.id=name;input.name=name;input.type=type;input.required=true;
  if(type==='number'){input.min='1';input.step='1';}else{input.maxLength=13;input.pattern='([A-Za-z]{3}[0-9]{10}|[Nn][Oo][Nn][Ee])';input.title='Enter three letters followed by ten digits, or None.';}
  input.value=state[name]||'';input.addEventListener('input',()=>{state[name]=input.value;persist();});wrap.append(lab,input);form.append(wrap);
 });
 const panel=element('div',null,'border rounded p-4 mb-4');panel.append(element('h2','Selected sections','h5'));preview=element('div');panel.append(preview);form.append(panel);
 const button=element('button','Save setup and continue','btn btn-primary');button.type='submit';form.append(button);
 form.addEventListener('submit',event=>{
  event.preventDefault(); if(!form.reportValidity()||!persist())return;
  try{localStorage.setItem('i129Valid-setup','true');}catch(e){storageError();return;}
  window.location.href='petitioner.html';
 });
 setupFeedback(form);conditional();summary(preview);
}
if(page==='setup')setup();
else if(!route(state).includes(page)){
 content.append(element('p','This section is not part of your current route. Update Petition Setup to include it.','alert alert-info'));
 const link=element('a','Return to setup','btn btn-primary');link.href='setup.html';content.append(link);
} else if(page==='download') {
 I129Download.render(content,state);
} else if(page==='review') {
 content.append(element('p','Review the saved answers for the selected petition and supplements, then continue to Preview and download.'));
 summary(content);
 I129Forms.review(content,state);
 const link=element('a','Change petition setup','btn btn-outline-primary mt-4');link.href='setup.html';content.append(link);
} else if(I129Base.maps[page]) {
 I129Forms.render(page,content,state);
} else if(page==='additional') {
 const entries=I129Forms.explanations(state);
 content.append(element('p','Explanations are collected beside their related questions. Edit the original answer to change an entry.'));
 entries.forEach(entry=>{const card=element('section',null,'border rounded p-3 mb-3');card.append(element('h2',entry.reference,'h5'),element('p',entry.value));content.append(card);});
 if(!entries.length)content.append(element('p','No related explanations have been entered yet.'));
} else {
 content.append(element('p','Section outline - individual fields will be added next.','text-body-secondary'));
 blocks(page,state).forEach(text=>{
  const card=element('section',null,'border rounded p-4 mb-3');card.append(element('h2',text,'h5 mb-2'),element('p','Field placeholders','small text-body-secondary mb-0'));content.append(card);
 });
 if(page==='additional')content.append(element('p','This page will also be selected automatically when future field answers require explanations.'));
}
window.addEventListener('i129-validation-changed',navigation);
window.addEventListener('storage',e=>{if(!e.key||e.key.startsWith('i129Valid-'))navigation();});
navigation();
