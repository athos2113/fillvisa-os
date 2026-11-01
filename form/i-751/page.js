/* Fixed section navigation; no classification workflow. */
'use strict';
const I751Pages={parts:{"info-about-you": ["Part 1: Information About You (Conditional Resident)"], "biographic-info": ["Part 2: Biographic Information"], "basis-for-petition": ["Part 3: Basis for Petition"], "spouse-details": ["Part 4: Information About the U.S Citizen or Lawful Permanent Resident Spouse"], "children-info": ["Part 5: Information About Your Children"], "accommodations": ["Part 6: Accommodations for Individuals With Disabilities and/or Impairments"], "petitioner-info": ["Part 7: Petitioner's Information"], "spouse-info": ["Part 8: Spouse's Information"], "interpreter-info": ["Part 9: Interpreter's Information"], "preparer-info": ["Part 10: Preparer's Information"], "download": ["Preview and Download"]},route(){return Object.keys(this.parts);}};
const current=document.body.dataset.page;
function updateNavigation(){
 const nav=document.getElementById('sectionNav');nav.replaceChildren();
 const mobile=document.getElementById('mobileSectionNav');mobile.replaceChildren();
 for(const [id,[label]] of Object.entries(I751Pages.parts)){
  const link=document.createElement('a');link.href=id+'.html';link.className='list-group-item list-group-item-action'+(id===current?' active':'');
  let valid=false;try{valid=localStorage.getItem('i751Valid-'+id)==='true';}catch(e){}
  link.textContent=label+(valid?' ✅':'');if(id===current)link.setAttribute('aria-current','step');nav.append(link);
  const option=new Option(link.textContent,id+'.html');option.selected=id===current;mobile.append(option);
 }
}
document.getElementById('stepLabel').textContent=I751Pages.parts[current][0];
document.getElementById('routeLabel').textContent='Petition to Remove Conditions on Residence';
if(current!=='download')I751Forms.render(current,document.getElementById('content'),{});
window.addEventListener('i751-validation-changed',updateNavigation);
window.addEventListener('storage',updateNavigation);
updateNavigation();

document.getElementById('mobileSectionNav').addEventListener('change',e=>{window.location.href=e.target.value;});
