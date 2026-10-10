/* Fixed section navigation; no classification workflow. */
'use strict';
const I129FPages={parts:{
 'info-about-you':['Part 1: Information About You'],
 'beneficiary-info':['Part 2: Information About Beneficiary'],
 'other-info':['Part 3: Other Information'],
 'bio-info':['Part 4: Biographic Information'],
 'petitioner-info':["Part 5: Petitioner's Information"],
 'interpreter-info':["Part 6: Interpreter's Information"],
 'preparer-info':["Part 7: Preparer's Information"],
 download:['Preview and Download']
},route(){return Object.keys(this.parts);}};
const current=document.body.dataset.page;
function updateNavigation(){
 const nav=document.getElementById('sectionNav');nav.replaceChildren();
 for(const [id,[label]] of Object.entries(I129FPages.parts)){
  const link=document.createElement('a');link.href=id+'.html';link.className='list-group-item list-group-item-action'+(id===current?' active':'');
  let valid=false;try{valid=localStorage.getItem('i129fValid-'+id)==='true';}catch(e){}
  link.textContent=label+(valid?' ✅':'');if(id===current)link.setAttribute('aria-current','step');nav.append(link);
 }
}
document.getElementById('stepLabel').textContent=I129FPages.parts[current][0];
document.getElementById('routeLabel').textContent='Petition for Alien Fiancé(e)';
if(current!=='download')I129FForms.render(current,document.getElementById('content'),{});
window.addEventListener('i129f-validation-changed',updateNavigation);
window.addEventListener('storage',updateNavigation);
updateNavigation();
