// Run with Node 20+ and playwright available on NODE_PATH. Uses installed Chrome.
const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const server = http.createServer((req,res) => {
  const file = path.resolve(root, '.' + decodeURIComponent(req.url.split('?')[0]));
  if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  fs.readFile(file,(error,data)=> {
    if(error) return res.writeHead(404).end();
    res.setHeader('Content-Type', file.endsWith('.js')?'text/javascript':file.endsWith('.html')?'text/html':file.endsWith('.css')?'text/css':'application/octet-stream');
    res.end(data);
  });
});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const origin=`http://127.0.0.1:${server.address().port}`;
 const browser=await chromium.launch({channel:'chrome',headless:true});
 try {
  const page=await browser.newPage();
  await page.route('**/*',route=> {
   if (route.request().url().includes('unpkg.com/pdf-lib@')) return route.fulfill({path:require.resolve('pdf-lib/dist/pdf-lib.min.js'),contentType:'text/javascript'});
   return route.request().url().startsWith(origin)?route.continue():route.abort();
  });
  page.on('console', message=>{if(message.type()==='error' && !message.text().includes('Failed to load resource')) console.error(message.text());});
  const errors=[]; page.on('pageerror',e=>errors.push(e.stack));
  page.on('dialog',d=>d.dismiss());
  async function open(name,section,saved) {
   await page.goto(origin+'/form/i-485/'+name+'.html');
   await page.evaluate(({section,saved})=>{ localStorage.clear(); if(saved){localStorage.setItem('i485-'+section,JSON.stringify(saved));localStorage.setItem('i485Valid-'+section,'true');}}, {section,saved});
   await page.reload();
  }
  async function change(id,value=true) {
   await page.evaluate(({id,value})=>{const el=document.getElementById(id); if(el.type==='radio'||el.type==='checkbox')el.checked=value;else el.value=value;el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));},{id,value});
  }
  async function state(id) {return page.locator('#'+id).evaluate(el=>({disabled:el.disabled,checked:el.checked,value:el.value}));}
  const cases=[['9a','j_nonimmigrant','foreign_residence'],['9b','spouse_traffick_illegal','spouse_traffick_known_five'],['9b','served_foreign','served_foreign_violation'],['9b','spouse_traffick','spouse_traffick_known'],['9f','unlawful_present','severe_traffick']];
  for(const [section,parent,child] of cases) {
   await open('general-eligibility-'+section,section,{[parent+'_no']:true,[child+'_yes']:true,[child+'_details']:'stale'});
   assert.equal((await state(child+'_yes')).disabled,true);
   assert.equal((await state(child+'_yes')).checked,false);
   assert.equal(await page.evaluate(id=>validateFieldById(id),child+'_no'),'');
   assert.equal(await page.evaluate(s=>localStorage.getItem('i485Valid-'+s),section),'false');
   assert.equal(await page.evaluate(({s,id})=>JSON.parse(localStorage.getItem('i485-'+s))[id],{s:section,id:child+'_yes'}),false);
   await change(parent+'_yes');
   assert.equal((await state(child+'_yes')).disabled,false);
   assert.notEqual(await page.evaluate(id=>validateFieldById(id),child+'_yes'),'');
   await change(child+'_yes');
   // A target listener sees cleanup before the existing autosave handlers serialize.
   await page.evaluate(({parent,child})=>document.getElementById(parent+'_no').addEventListener('change',()=>{
    window.observedDependent=document.getElementById(child+'_yes').checked;
   }),{parent,child});
   await change(parent+'_no');
   assert.equal(await page.evaluate(()=>window.observedDependent),false);
   assert.equal((await state(child+'_yes')).checked,false);
  }
  await open('general-eligibility-9a','9a');
  await change('j_nonimmigrant_yes');await change('foreign_residence_no');
  assert.equal((await state('grant_waiver_no')).disabled,false);
  await change('grant_waiver_yes');await change('foreign_residence_yes');
  assert.equal((await state('grant_waiver_yes')).checked,false);
  assert.equal((await state('grant_waiver_no')).disabled,true);
  await change('foreign_residence_no');await change('grant_waiver_yes');await change('j_nonimmigrant_no');
  assert.equal((await state('grant_waiver_no')).disabled,true);
  // All unconditional Part 9A questions answered No must validate and remain blank downstream.
  await page.evaluate(()=>{document.querySelectorAll('input[type=radio][id$="_no"]').forEach(el=>{if(!el.disabled){el.checked=true;el.dispatchEvent(new Event('change',{bubbles:true}));}});submitForm();});
  assert.equal(await page.evaluate(()=>localStorage.getItem('i485Valid-9a')),'true');
  await open('general-eligibility-9g','9g',{evade_training_no:true,evade_training_text:'stale'});
  assert.equal((await state('evade_training_text')).value,'');
  await change('evade_training_yes');assert.equal((await state('evade_training_text')).disabled,false);
  await open('marital-history','6',{marital_status:'single',maritialstatus_marriage_number:'0',currentspouse_lastname:'stale',priorspouse_lastname:'stale'});
  assert.equal((await state('currentspouse_lastname')).value,'');
  assert.equal((await state('priorspouse_lastname')).value,'');
  await change('maritialstatus_seperated');await change('maritialstatus_marriage_number','1');
  assert.equal((await state('currentspouse_lastname')).disabled,false);
  assert.notEqual(await page.evaluate(()=>validateFieldById('currentspouse_lastname')),'');
  assert.equal((await state('priorspouse_lastname')).disabled,true);
  await change('maritialstatus_marriage_number','2');await change('priorspouse_ended_other');
  assert.equal((await state('priorspouse_ended_other_explain')).disabled,false);
  await change('priorspouse_ended_divorced');assert.equal((await state('priorspouse_ended_other_explain')).disabled,true);
  await change('maritialstatus_divorced');await change('maritialstatus_marriage_number','1');
  assert.equal((await state('priorspouse_lastname')).disabled,false);
  assert.equal((await state('currentspouse_lastname')).disabled,true);
  await open('children-info','7',{number_children:'0',childone_lastname:'stale',childtwo_firstname:'stale'});
  assert.equal((await state('childone_lastname')).value,'');
  await change('number_children','1');assert.equal((await state('childone_lastname')).disabled,false);assert.equal((await state('childtwo_lastname')).disabled,true);
  assert.notEqual(await page.evaluate(()=>validateFieldById('childone_lastname')),'');
  await change('number_children','2');assert.equal((await state('childtwo_lastname')).disabled,false);
  for(const [name,section,prefix] of [['preparer-info','12','preparer'],['interpreter-info','11','interpreter']]) {
   await open(name,section);await page.evaluate(()=>submitForm());assert.equal(await page.evaluate(s=>localStorage.getItem('i485Valid-'+s),section),'true');assert.equal(await page.evaluate(id=>validateFieldById(id),prefix+'_lastname'),'');
   await change(prefix+'_email','test@example.com');assert.notEqual(await page.evaluate(id=>validateFieldById(id),prefix+'_lastname'),'');
   assert.equal((await state(prefix+'_lastname')).disabled,false);
   await page.evaluate(()=>submitForm());assert.equal(await page.evaluate(s=>localStorage.getItem('i485Valid-'+s),section),'false');
   await change(prefix+'_email','');
   await page.evaluate(()=>{signatureBuffer='signature-data';});
   assert.notEqual(await page.evaluate(id=>validateFieldById(id),prefix+'_lastname'),'');
  }
  await open('general-eligibility-9d','9d',{exempt_nope:true,ssi_needy_yes:true,benefit_receive_1:'stale'});
  await change('exempt_refugee');
  assert.equal((await state('benefit_receive_1')).value,'');assert.equal((await state('benefit_receive_1')).disabled,true);
  await change('exempt_nope');assert.equal((await state('benefit_receive_1')).disabled,true);
  await change('ssi_needy_yes');assert.equal((await state('benefit_receive_1')).disabled,false);
  await open('application-type','2');await change('familybased_spouse');
  assert.equal((await state('adjustment_ina_yes')).disabled,false);
  await change('adjustment_ina_yes');await change('familybased_spouse',false);await change('asylum_status');
  assert.equal((await state('adjustment_ina_yes')).disabled,true);assert.equal((await state('adjustment_ina_yes')).checked,false);
  await open('info-about-you','1',{mailing_address_yes:true,mailing_street:'stale',other_dob_no:true,other_dob_1:'2000-01-01'});
  assert.equal((await state('mailing_street')).value,'');assert.equal((await state('other_dob_1')).value,'');
  await change('mailing_address_no');assert.equal((await state('mailing_street')).disabled,false);
  await open('additional-info','4',{permanent_resident_no:true,permanent_resident_city:'stale'});
  assert.equal((await state('permanent_resident_city')).value,'');
  assert.equal(await page.evaluate(()=>validateFieldById('employer_additional_info')),'');
  // Check the actual PDF generator consumes the normalized saved answers.
  await open('general-eligibility-9a','9a',{j_nonimmigrant_no:true,foreign_residence_yes:true,grant_waiver_yes:true,grant_waiver_details:'stale'});
  await page.goto(origin+'/form/i-485/download.html');
  const pdfAnswers=await page.evaluate(async()=>{
   await fillForm();
   if (!i485PreviewPdfBytes) throw new Error('PDF generation did not produce preview bytes');
   const pdf=await PDFLib.PDFDocument.load(i485PreviewPdfBytes);
   return ['foreign_residence_yes','foreign_residence_no','grant_waiver_yes','grant_waiver_no'].map(id=>pdf.getForm().getCheckBox(id).isChecked());
  });
  assert.deepEqual(pdfAnswers,[false,false,false,false]);
  // Additional organizations appear after Items 2–9 and are optional.
  await open('general-eligibility-9a','9a');
  assert.equal(await page.locator('#additional_organizations').isVisible(),false);
  await change('org_yes');
  assert.equal(await page.locator('#additional_organizations').isVisible(),true);
  assert.equal(await page.evaluate(()=>validateFieldById('additional_organizations')),'');
  assert.equal(await page.evaluate(()=>Boolean(document.getElementById('orgtwo_todate').compareDocumentPosition(document.getElementById('additional_organizations')) & Node.DOCUMENT_POSITION_FOLLOWING)),true);
  const organizationText='Third organization: Community Club, London, UK. Volunteer member, 2018-2020.';
  await change('additional_organizations',organizationText);
  await page.waitForFunction(text=>JSON.parse(localStorage.getItem('i485-9a')).additional_organizations===text,organizationText);
  await page.reload();
  assert.equal(await page.locator('#additional_organizations').isVisible(),true);
  assert.equal((await state('additional_organizations')).value,organizationText);
  await page.goto(origin+'/form/i-485/download.html');
  const additionalEntry=await page.evaluate(async()=>{
   await fillForm();
   const pdf=await PDFLib.PDFDocument.load(i485PreviewPdfBytes);
   return ['pgno','ptno','itno','description'].map(key=>pdf.getForm().getTextField('additional_info_'+key+'_1').getText());
  });
  assert.deepEqual(additionalEntry,['13','9','2-9',organizationText]);
  await page.goto(origin+'/form/i-485/general-eligibility-9a.html');
  await change('org_no');
  assert.equal(await page.locator('#additional_organizations').isVisible(),false);
  assert.equal((await state('additional_organizations')).value,'');
  assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('i485-9a')).additional_organizations),'');
  await page.goto(origin+'/form/i-485/download.html');
  assert.equal(await page.evaluate(async()=>{
   await fillForm();
   const pdf=await PDFLib.PDFDocument.load(i485PreviewPdfBytes);
   return pdf.getForm().getTextField('additional_info_description_1').getText() || '';
  }),'');
  // Third-party widgets may fail offline; application errors must not be hidden.
  const appErrors=errors.filter(e=>!e.includes('Swiper')&&!e.includes('intlTelInput')&&!e.includes('scrollCue'));
  assert.deepEqual(appErrors,[]);
  console.log('PASS: I-485 conditional browser regressions, restoration, persistence, validation and nested transitions');
 } finally {await browser.close();server.close();}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});

