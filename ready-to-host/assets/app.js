import {icon} from './icons.js';
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>[...root.querySelectorAll(s)];
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;

function setupTabs(selector,attribute,select){const buttons=$$(selector);buttons.forEach((b,i)=>{b.addEventListener('click',()=>select(b.dataset[attribute]));b.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(i+1)%buttons.length;if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(i-1+buttons.length)%buttons.length;if(event.key==='Home')next=0;if(event.key==='End')next=buttons.length-1;if(next!==undefined){event.preventDefault();select(buttons[next].dataset[attribute],true)}})});}

/* Services explorer: ten services as vertical tabs. Panels share one grid cell, so the
   card keeps the same size whichever service is selected. */
function selectExplore(index,focus=false){index=+index;$$('[data-explore-tab]').forEach(b=>{const on=+b.dataset.exploreTab===index;b.setAttribute('aria-selected',String(on));b.tabIndex=on?0:-1;if(on&&focus)b.focus()});$$('.explorer-panel').forEach((p,j)=>{const on=j===index;p.hidden=!on;if(on){p.classList.remove('enter');void p.offsetWidth;p.classList.add('enter')}});}
if($('[data-explore-tab]')){
 setupTabs('[data-explore-tab]','exploreTab',selectExplore);
 $$('[data-explore-jump]').forEach(t=>t.addEventListener('click',()=>{selectExplore(t.dataset.exploreJump);$('#explorer').scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'})}));
 try{const pre=sessionStorage.getItem('imbleo-explore');if(pre!==null){selectExplore(pre);sessionStorage.removeItem('imbleo-explore')}}catch{}
}
// Footer service links remember which service to open on /services/.
$$('[data-explore-link]').forEach(a=>a.addEventListener('click',()=>{if($('[data-explore-tab]'))selectExplore(a.dataset.exploreLink);else try{sessionStorage.setItem('imbleo-explore',a.dataset.exploreLink)}catch{}}));

/* Homepage case-study carousel. */
const carousel=$('[data-carousel]');
if(carousel){const track=$('.car-track',carousel),prev=$('.prev',carousel),next=$('.next',carousel);
 const step=()=>{const card=$('.case-card',track);return card?card.getBoundingClientRect().width+parseFloat(getComputedStyle(track).columnGap||0):track.clientWidth};
 const sync=()=>{prev.disabled=track.scrollLeft<=4;next.disabled=track.scrollLeft+track.clientWidth>=track.scrollWidth-4};
 prev.addEventListener('click',()=>track.scrollBy({left:-step(),behavior:reduced?'auto':'smooth'}));
 next.addEventListener('click',()=>track.scrollBy({left:step(),behavior:reduced?'auto':'smooth'}));
 track.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();next.click()}if(e.key==='ArrowLeft'){e.preventDefault();prev.click()}});
 let t;track.addEventListener('scroll',()=>{cancelAnimationFrame(t);t=requestAnimationFrame(sync)},{passive:true});addEventListener('resize',sync);sync();
}

/* Navigation. */
const menu=$('.mobile-menu'),menuToggle=$('.mobile-menu-toggle');function closeMenu(){if(menu){menu.hidden=true;menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Open navigation');menuToggle.innerHTML=icon('menu')}}menuToggle?.addEventListener('click',()=>{const open=menu.hidden;menu.hidden=!open;menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');menuToggle.innerHTML=icon(open?'close':'menu')});$$('.mobile-menu a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});

/* Contact brief. */
const dialog=$('#contact-dialog'),form=$('#project-form');let brief='',subject='';
document.addEventListener('click',event=>{const trigger=event.target.closest('[data-contact]');if(!trigger)return;closeMenu();const selection=trigger.dataset.contactService;if(selection&&form)form.elements.service.value=selection;dialog.showModal()});
$('.dialog-close')?.addEventListener('click',()=>dialog.close());dialog?.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
form?.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);subject=`Imbleo project enquiry: ${data.get('service')}`;brief=`Hello Imbleo,\n\nI’d like to discuss a project.\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nArea: ${data.get('service')}\n\nThe business problem:\n${data.get('message')}\n\nBest,\n${data.get('name')}`;$('#email-brief').href=`mailto:adiedubus@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(brief)}`;form.hidden=true;$('#brief-ready').hidden=false;$('#email-brief').focus()});
$('#edit-brief')?.addEventListener('click',()=>{form.hidden=false;$('#brief-ready').hidden=true;form.elements.name.focus()});
$('#download-brief')?.addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([`To: adiedubus@gmail.com\nSubject: ${subject}\n\n${brief}`],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='Imbleo-Project-Brief.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),5000);toast('Project brief downloaded.')});
function toast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),4000)}

/* 2D motion, loaded per page. */
import('./motion.js').then(m=>m.init());
const think=$('[data-think]');if(think)import('./sketch.js').then(m=>m.init(think));
const tools=$('[data-tools]');if(tools)import('./tools.js').then(m=>m.init(tools));
const storyEl=$('[data-story]');if(storyEl)import('./story.js').then(m=>m.init(storyEl));
