/* I-129 routing prototype. Source: supplied 09/09/26 screenshots.
 * This selects questionnaire sections, not PDF pages or filing eligibility.
 * Continuation pages not supplied are represented by supplement placeholders.
 */
(function (root) {
'use strict';
const classifications = {
 'E-1':'E-1 — Treaty trader', 'E-2':'E-2 — Treaty investor', 'E-2-CNMI':'E-2 CNMI investor', 'E-3':'E-3 — Australian specialty occupation',
 'H-1B':'H-1B — Specialty occupation', 'H-1B1-CL':'H-1B1 — Chile', 'H-1B1-SG':'H-1B1 — Singapore', 'H-1B2':'H-1B2 — Defense project', 'H-1B3':'H-1B3 — Fashion model',
 'H-2A':'H-2A — Agricultural worker', 'H-2B':'H-2B — Nonagricultural worker', 'H-3':'H-3 — Trainee', 'H-3-SE':'H-3 — Special education exchange',
 'L-1A':'L-1A — Manager or executive', 'L-1B':'L-1B — Specialized knowledge', 'L-BLANKET':'L — Blanket petition',
 'O-1A':'O-1A — Sciences, education, business or athletics', 'O-1B':'O-1B — Arts, motion picture or television', 'O-2':'O-2 — Accompanying support',
 'P-1-ML':'P-1 — Major league sports', 'P-1':'P-1 — Athlete or athletic/entertainment group', 'P-1S':'P-1S — Support personnel', 'P-2':'P-2 — Reciprocal exchange', 'P-2S':'P-2S — Support personnel', 'P-3':'P-3 — Culturally unique program', 'P-3S':'P-3S — Support personnel', 'Q-1':'Q-1 — Cultural exchange', 'R-1':'R-1 — Religious worker'
};
const parts = {
 setup:['Petition setup','Part 2 · routing choices'],
 petitioner:['Petitioner information','Part 1 · pages 1–2'],
 beneficiary:['Beneficiary information','Part 3 · pages 2–3'],
 attachment:['Additional beneficiaries','Attachment-1 · pages 37–38'],
 processing:['Processing information','Part 4 · pages 3–4'],
 employment:['Employment and employer','Part 5 · pages 5–6'],
 e:['E classification supplement','Pages 9–10'],
 trade:['Trade Agreement supplement','Pages 11–12'],
 h:['H classification — shared information','Pages 13–14'],
 h1:['H classification — Section 1','Pages 14–15 · H-1B / H-1B1'],
 h2:['H classification — Section 2','Pages 15–19 · H-2A / H-2B'],
 h3:['H classification — Section 3','Page 20 · H-3'],
 hdata:['H-1B / H-1B1 data and fee supplement','Pages 21–23'],
 l:['L classification supplement','Pages 24–27'],
 op:['O and P classifications supplement','Pages 28–30'],
 q:['Q-1 classification supplement','Page 31'],
 r:['R-1 classification supplement','Pages 32–36'],
 export:['Export control certification','Part 6 · page 6'],
 declaration:['Petitioner declaration','Part 7 · pages 6–7'],
 preparer:['Preparer information','Part 8 · page 7'],
 additional:['Additional information','Part 9 · page 8'],
 review:['Review selected sections','Review saved answers'],
 download:['Preview and download','Selected petition and supplements']
};
const isH1 = c => ['H-1B','H-1B2','H-1B3','H-1B1-CL','H-1B1-SG'].includes(c);
const isH2 = c => ['H-2A','H-2B'].includes(c);
const isTrade = c => ['TN-CA','TN-MX','H-1B1-CL','H-1B1-SG'].includes(c);
classifications['TN-CA']='TN — Canada'; classifications['TN-MX']='TN — Mexico';
function route(s) {
 const c=s.classification;
 if (!classifications[c]) return ['setup'];
 const a=['setup','petitioner'];
 if(c!=='L-BLANKET') {
  a.push('beneficiary');
  if(s.beneficiaryType!=='unnamed' && s.multiple==='yes') a.push('attachment');
 }
 a.push('processing','employment');
 if(['E-1','E-2','E-2-CNMI'].includes(c)) a.push('e');
 if(isTrade(c)) a.push('trade');
 if(c.startsWith('H-')) {
  a.push('h');
  if(isH1(c)) a.push('h1','hdata');
  else if(isH2(c)) a.push('h2');
  else a.push('h3');
 }
 if(c.startsWith('L-')) a.push('l');
 if(c.startsWith('O-')||c.startsWith('P-')) a.push('op');
 if(c==='Q-1') a.push('q');
 if(c==='R-1') a.push('r');
 if(isH1(c)||c.startsWith('L-')||c==='O-1A') a.push('export');
 a.push('declaration');
 if(s.preparer==='yes') a.push('preparer');
 if(s.additional==='yes'||s.hasExplanations) a.push('additional');
 a.push('review','download');
 return a;
}
function blocks(id,s) {
 const c=s.classification;
 const common={
 petitioner:['Petitioner identity: individual or company / organization','Mailing address, contact and tax information'],
 beneficiary:s.beneficiaryType==='unnamed'?['Unnamed H-2 worker count; individual identity blocks are not shown']:['Worker identity and other names','Birth, nationality and identification',...(s.location==='inside'?['Current U.S. status, arrival and residential information']:[])],
 attachment:['Repeatable details for each additional named worker; exclude the worker already entered in Part 3','U.S. status block only for an additional worker currently in the United States'],
 processing:['Notification office / fallback processing and foreign address','Related petitions and dependent applications','Passport and immigration history; explanations feed Part 9',...(s.basis==='new'?['New-petition history branch (Part 4, Item 8)']:[])],
 employment:['Job, employer and intended employment dates','Work locations; third-party / off-site branches','Hours, compensation, business and employee information'],
 e:['Classification and treaty / CNMI information','Section 1: foreign employer, if any','Remaining E supplement sections — continuation-page fields pending'],
 trade:['Section 1: requested trade-agreement extension or change','Section 2: petitioner declaration','Supplement preparer declaration if a different person prepared it'],
 h:['Classification and prior H/L stays',...(['H-1B','H-1B3'].includes(c)?['Registration details when filing an applicable cap petition']:[]),'Applicable shared H questions and ownership explanation'],
 h1:['Section 1: proposed duties and prior experience',...(['H-1B','H-1B1-CL','H-1B1-SG'].includes(c)?['LCA / employment statement for specialty occupation or H-1B1']:[]),...(['H-1B','H-1B2'].includes(c)?['Employer return-transportation statement']:[]),...(c==='H-1B2'?['Defense project manager statement']:[])],
 h2:['Section 2: temporary employment and need','Recruiter details when used','Prohibited fees, violations and employer obligations','Applicable employer / joint-employer certifications — continuation fields pending'],
 h3:['Section 3: training program questions','Explanations for Yes answers; explanation when no employment abroad is intended'],
 hdata:['Section 1: employer and beneficiary / position information','Fee exemption / determination questions','Applicable numerical limitation and other continuation sections — detailed conditions pending'],
 l:c==='L-BLANKET'?['Shared L petition information','Section 2: blanket petition organizations and relationships','Applicable additional-fee section']:['Shared L petition information','Section 1: individual petition — '+classifications[c],'Foreign employment and company relationship; applicable new-office / off-site branches','Applicable additional-fee section'],
 op:['Section 1: classification, event and duties',...(['O-2','P-1S','P-2S','P-3S'].includes(c)?['Support-personnel experience with the O-1 / P principal']:[]),'Ownership explanation when applicable','Consultation and petitioner statement — continuation-page fields pending'],
 q:['Section 1: cultural-exchange certifications','Prior Q-1 admission condition within the certification','Petitioner declaration and contact details'],
 r:['Section 1: employer attestation','Prior R-status stays when applicable','Remaining employment and organizational attestations — continuation-page fields pending'],
 export:['One of the two technology-release certifications; no answer preselected'],
 declaration:['Authorized signatory, declaration, signature and contact information'],
 preparer:['Preparer identity, address, contact details and declaration'],
 additional:['Explanations and overflow, identified by page, part and item number']
 };
 return common[id]||[];
}
const api={classifications,parts,route,blocks};
if(typeof module!=='undefined'&&module.exports) module.exports=api;
root.I129Flow=api;
})(typeof window==='undefined'?globalThis:window);
