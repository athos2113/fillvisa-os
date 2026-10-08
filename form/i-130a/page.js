/* Fixed section navigation; no classification workflow. */
'use strict';
const I130APages={parts:{
 'info-about-you':['Part 1: Information About You'],
 employment:['Part 2: Employment'],
 'employment-abroad':['Part 3: Employment Outside the U.S.'],
 'beneficiary-info':['Part 4: Statement and Signature'],
 'interpreter-info':['Part 5: Interpreter'],
 'preparer-info':['Part 6: Preparer'],
 download:['Preview and Download']
},route(){return Object.keys(this.parts);}};
const current=document.body.dataset.page;
function updateNavigation(){
 const nav=document.getElementById('sectionNav');nav.replaceChildren();
 for(const [id,[label]] of Object.entries(I130APages.parts)){
  const link=document.createElement('a');link.href=id+'.html';link.className='list-group-item list-group-item-action'+(id===current?' active':'');
  let valid=false;try{valid=localStorage.getItem('i130aValid-'+id)==='true';}catch(e){}
  link.textContent=label+(valid?' ✅':'');if(id===current)link.setAttribute('aria-current','step');nav.append(link);
 }
}
document.getElementById('stepLabel').textContent=I130APages.parts[current][0];
document.getElementById('routeLabel').textContent='Supplemental Information for Spouse Beneficiary';
if(current!=='download')I130AForms.render(current,document.getElementById('content'),{});
window.addEventListener('i130a-validation-changed',updateNavigation);
window.addEventListener('storage',updateNavigation);
updateNavigation();
