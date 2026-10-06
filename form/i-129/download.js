/* Download shell. Pages 1–8 filling is provided by fill-pdf.js.
 * Future integration: window.fillForm(packet) must return Uint8Array/ArrayBuffer.
 * packet.sections contains every active selected schema, with inactive values removed.
 * Page numbers below are one-based source PDF pages, not output indexes.
 */
(function(root){
'use strict';
const sourcePages={setup:[1,2],petitioner:[1,2],beneficiary:[2,3],processing:[3,4],employment:[5,6],export:[6],declaration:[6,7],preparer:[7],e:[9,10],trade:[11,12],h:[13,14],h1:[14,15],h2:[15,16,17,18,19],h3:[20],hdata:[21,22,23],l:[24,25,26,27],op:[28,29,30],q:[31],r:[32,33,34,35,36],attachment:[37,38]};
function collect(setup,read,valid,B,Flow,explanations){
 const selected=Flow.route(setup).filter(id=>!['review','download','additional'].includes(id));
 const sections={},issues=[];
 if(!Flow.classifications[setup.classification])issues.push({page:'setup',message:'Choose a classification.'});
 for(const id of selected){
  const schema=B.maps[id],fields=typeof schema==='function'?schema(setup):schema;
  const data=read('i129-'+id);
  if(id==='setup')sections[id]={...setup};
  else if(!fields){issues.push({page:id,message:'This section has no field map.'});continue;}
  else {
   const activeData={...data};
   fields.forEach(f=>{if(f.derive&&B.active(f,activeData,setup))activeData[f.id]=f.derive(activeData,setup);});
   sections[id]=B.values(fields,activeData,setup);
   if(fields.some(f=>B.error(f,sections[id][f.id]||'',sections[id],setup)))issues.push({page:id,message:'Required answers or validation need attention.'});
  }
  if(!valid(id)&&!issues.some(x=>x.page===id))issues.push({page:id,message:'Validate this section before generating a PDF.'});
 }
 const pages=new Set([1,2,3,4,5,6,7]);
 selected.forEach(id=>(sourcePages[id]||[]).forEach(p=>pages.add(p)));
 if(explanations.length)pages.add(8);
 return {classification:setup.classification,selectedSections:selected,sections,additionalInformation:explanations,sourcePages:[...pages].sort((a,b)=>a-b),additionalBeneficiaryCount:setup.multiple==='yes'&&setup.beneficiaryType!=='unnamed'?Math.max(0,Number(setup.worker_count||1)-1):0,issues};
}
function render(container,setup){
 const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text)n.textContent=text;if(cls)n.className=cls;return n;};
 let bytes=null,url=null,busy=false;
 const revoke=()=>{bytes=null;if(url)URL.revokeObjectURL(url);url=null;};
 const read=key=>{const raw=JSON.parse(localStorage.getItem(key)||'{}');if(!raw||typeof raw!=='object'||Array.isArray(raw))throw Error('Saved form data could not be read.');return raw;};
 const getPacket=()=>{const current=read('i129-setup');return collect(current,read,id=>localStorage.getItem('i129Valid-'+id)==='true',I129Base,I129Flow,I129Forms.explanations(current));};
 container.append(el('p','PDF preview includes pages 1–8, plus the selected E supplement (9–10) or Trade Agreement supplement (11–12). H Classification pages 13–20 are now included as applicable; H-1B/H-1B1 data and fee pages 21–23 are included when selected. L supplement pages 24–27 and O/P pages 28–30 and Q-1 page 31 and R-1 pages 32–36 are included as applicable. Attachment-1 is filled for each additional named beneficiary, with extra copies added when needed. Review all output before filing.','alert alert-warning'));
 const status=el('p',null,'alert alert-info');status.setAttribute('role','status');container.append(status);
 const list=el('ul');container.append(list);
 const preview=el('button','Preview PDF','btn btn-primary');preview.type='button';container.append(preview);
 const panel=el('section',null,'mt-4');panel.hidden=true;
 panel.append(el('h2','PDF preview','h4'));
 const frame=el('iframe');frame.title='Filled I-129 PDF preview';frame.style.cssText='width:100%;height:720px;border:1px solid #dee2e6';
 const open=el('a','Open preview in a new tab','btn btn-outline-secondary me-2');open.target='_blank';open.rel='noopener';
 const download=el('button','Download PDF','btn btn-primary');download.type='button';download.disabled=true;
 panel.append(frame,open,download);container.append(panel);
 function refresh(){
  revoke();frame.removeAttribute('src');open.removeAttribute('href');panel.hidden=true;download.disabled=true;list.replaceChildren();
  try{
   const packet=getPacket();
   packet.selectedSections.forEach(id=>{const li=el('li');const link=el('a',I129Flow.parts[id][0]);link.href=id+'.html';li.append(link);const issue=packet.issues.find(x=>x.page===id);li.append(document.createTextNode(issue?' — '+issue.message:' — Validated'));list.append(li);});
   const implemented=typeof root.fillForm==='function';
   preview.disabled=busy||packet.issues.length>0||!implemented;
   status.textContent=!implemented?'PDF generation is not connected yet. Your selected sections are listed below; preview and download will become available when PDF filling is implemented.':packet.issues.length?'Complete and validate the listed sections before previewing.':'Ready to preview the base petition and selected E or Trade Agreement supplement. H Classification pages are supported; H data/fee, L, O/P, Q-1 and R-1 supplement pages are supported; Attachment-1 is supported for additional named beneficiaries.';
  }catch(e){preview.disabled=true;status.textContent='Unable to read saved answers. Return to the questionnaire and check browser storage.';}
 }
 preview.addEventListener('click',async()=>{
  if(busy)return;
  try{
   const packet=getPacket();if(packet.issues.length||typeof root.fillForm!=='function'){refresh();return;}
   busy=true;preview.disabled=true;preview.textContent='Preparing preview…';
   revoke();panel.hidden=true;download.disabled=true;
   const result=await root.fillForm(packet);
   if(!(result instanceof Uint8Array)&&!(result instanceof ArrayBuffer))throw Error('PDF generation did not return PDF bytes.');
   // Refuse a stale preview if answers were edited in another tab while filling.
   if(JSON.stringify(getPacket())!==JSON.stringify(packet))throw Error('Answers changed. Generate a fresh preview.');
   bytes=result;url=URL.createObjectURL(new Blob([bytes],{type:'application/pdf'}));frame.src=url;open.href=url;panel.hidden=false;download.disabled=false;status.textContent='Review your preview. E and Trade Agreement pages are included when selected. H Classification pages are included as applicable, including H data/fee pages. L, O/P, Q-1 and R-1 supplement pages are included as applicable; Attachment-1 is included for additional named beneficiaries.';
  }catch(e){revoke();panel.hidden=true;download.disabled=true;status.textContent=e.message||'Unable to prepare the PDF. Try again.';root.catchError?.(e);}
  finally{busy=false;preview.textContent='Preview PDF';preview.disabled=typeof root.fillForm!=='function';}
 });
 download.addEventListener('click',()=>{if(!bytes||!url)return;const a=el('a');a.href=url;a.download='i129-'+read('i129-setup').classification.toLowerCase()+'-preview.pdf';document.body.append(a);a.click();a.remove();root.FillvisaReviewInvite?.show({target:panel});root.catchSuccess?.();});
 window.addEventListener('storage',e=>{if(!e.key||e.key.startsWith('i129-')||e.key.startsWith('i129Valid-'))refresh();});
 window.addEventListener('pagehide',revoke);refresh();
}
const api={collect,render,sourcePages};root.I129Download=api;
if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window==='undefined'?globalThis:window);
