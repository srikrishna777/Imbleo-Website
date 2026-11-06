// Site-wide 2D motion: scroll reveals, word-by-word headings, drawn lines,
// counters, the scroll-driven "How we partner" sequence and the path runner.
// Everything degrades to a static page when reduced motion is requested.
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>[...root.querySelectorAll(s)];
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;

function splitWords(el){
  let n=0;
  const walk=node=>{[...node.childNodes].forEach(child=>{
    if(child.nodeType===3){
      const parts=child.textContent.split(/(\s+)/);const frag=document.createDocumentFragment();
      parts.forEach(p=>{if(!p)return;if(/^\s+$/.test(p)){frag.append(document.createTextNode(p));return}
        const w=document.createElement('span');w.className='w';const i=document.createElement('span');i.className='wi';i.style.setProperty('--w',n++);i.textContent=p;w.append(i);frag.append(w)});
      child.replaceWith(frag);
    }else if(child.nodeType===1&&child.tagName!=='BR'&&!child.classList.contains('w'))walk(child);
  })};
  walk(el);el.classList.add('is-split');el.style.setProperty('--words',n);
}
// Once a heading has risen into place, stop masking it so no letter, descender or
// full stop is ever clipped.
function settleSplit(el){const n=+el.style.getPropertyValue('--words')||0;setTimeout(()=>el.classList.add('split-done'),1000+n*42+150);}

function countUp(el){
  const target=parseFloat(el.dataset.count);if(!isFinite(target)||reduced)return;
  const fmt=v=>Math.round(v).toLocaleString('en-US');const t0=performance.now(),dur=1100;
  const tick=now=>{const p=Math.min(1,(now-t0)/dur);el.textContent=fmt(target*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(tick)};
  requestAnimationFrame(tick);
}

// How we partner: the three cards advance with the scroll (draft, signed, live) and
// step back again when scrolling up.
function partner(board){
  const steps=['s1','s2','s3'];
  if(reduced){board.classList.add(...steps);return}
  let ticking=false,counted=false;
  const update=()=>{ticking=false;const r=board.getBoundingClientRect(),vh=innerHeight;
    if(r.bottom<-300||r.top>vh+300)return;
    const cards=$$('.pcard',board),stacked=cards.length>2&&cards[2].getBoundingClientRect().top-cards[0].getBoundingClientRect().top>40;
    if(stacked)steps.forEach((s,i)=>board.classList.toggle(s,cards[i].getBoundingClientRect().top<vh*0.8));
    else{const p=(vh*0.94-r.top)/(vh*0.5);steps.forEach((s,i)=>board.classList.toggle(s,p>=0.06+i*0.2));}
    if(!counted&&board.classList.contains('s2')){counted=true;$$('[data-count]',board).forEach(countUp)}};
  addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update)}},{passive:true});update();
}

function pathRunner(section){
  const path=$('.path-wave-line',section),runner=$('.path-runner',section),wave=$('.path-wave',section);
  if(!path||!runner||!wave)return;
  const steps=$$('.step',section),len=path.getTotalLength();let ticking=false,box={w:0,h:0,top:0},last=-1;
  const measure=()=>{box={w:wave.clientWidth,h:wave.clientHeight,top:wave.offsetTop}};
  // One layout read per frame, then compositor-only writes (transform, dash offset).
  const update=()=>{ticking=false;const r=section.getBoundingClientRect(),vh=innerHeight;
    if(r.bottom<-200||r.top>vh+200)return;
    const p=Math.min(1,Math.max(0,(vh*0.85-r.top)/(r.height*0.9)));
    if(Math.abs(p-last)<0.001)return;last=p;
    const pt=path.getPointAtLength(len*p);
    runner.style.transform='translate3d('+(pt.x/1200*box.w).toFixed(1)+'px,'+(box.top+pt.y/60*box.h).toFixed(1)+'px,0)';
    path.style.strokeDashoffset=(1-p).toFixed(4);
    steps.forEach((s,i)=>s.classList.toggle('lit',p>=(i+0.4)/6));};
  addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update)}},{passive:true});
  addEventListener('resize',()=>{measure();last=-1;update()});measure();update();
}

// Hero: step one enquiry through the business. Each step lights a person, the line to
// them and Imbleo's hand-off; the last step holds, then the story starts again.
function heroFlow(el){
  const n=$$('.pc',el).length,parts=[...Array(n)].map((_,i)=>$$(`[data-i="${i}"]`,el));
  const set=step=>parts.forEach((ps,i)=>ps.forEach(p=>{p.classList.toggle('active',i===step);p.classList.toggle('done',i<step);p.classList.toggle('on',i===Math.min(step,n-1))}));
  if(reduced){set(n);return}
  let step=0;set(0);
  const tick=()=>{if(el.classList.contains('playing')&&!document.hidden){step=step>=n?0:step+1;set(step)}setTimeout(tick,step>=n?2800:2100)};
  setTimeout(tick,2100);
}

export function init(){
  window.__imbleoMotion=true;document.documentElement.classList.add('motion-ready');
  $$('[data-split]').forEach(splitWords);
  const revealTargets=$$('[data-reveal],[data-split],[data-flow],[data-stages],.anatomy-feature,.case-art,.orch');
  $$('[data-partner]').forEach(partner);
  $$('[data-hflow]').forEach(heroFlow);
  if(reduced||!('IntersectionObserver' in window)){revealTargets.forEach(el=>{el.classList.add('in');if(el.matches('[data-split]'))el.classList.add('split-done')});$$('[data-path]').forEach(el=>el.closest('section')&&pathRunner(el.closest('section')));return}
  const once=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;const el=e.target;el.classList.add('in');once.unobserve(el);
    if(el.matches('[data-split]'))settleSplit(el);
    $$('[data-count]',el).forEach(c=>{if(!el.closest('[data-partner]'))countUp(c)});
  }),{threshold:0.12,rootMargin:'0px 0px -6% 0px'});
  revealTargets.forEach(el=>once.observe(el));
  // Looping 2D animations (CSS and SVG SMIL motion) only run while on screen.
  const live=new IntersectionObserver(entries=>entries.forEach(e=>{const el=e.target;el.classList.toggle('playing',e.isIntersecting);
    [el,...$$('svg',el)].forEach(s=>{if(s.pauseAnimations&&s.querySelector&&s.querySelector('animateMotion'))e.isIntersecting?s.unpauseAnimations():s.pauseAnimations()});}),{rootMargin:'60px'});
  $$('.case-art,.anat,.partner-board,.orch,.case-cloud').forEach(el=>live.observe(el));
  $$('[data-path]').forEach(el=>pathRunner(el.closest('section')));
}
