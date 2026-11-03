// Site-wide 2D motion: scroll reveals, word-by-word headings, drawn lines,
// counters, the "How we partner" sequence and the homepage path runner.
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
  walk(el);el.classList.add('is-split');
}

function countUp(el){
  const target=parseFloat(el.dataset.count);if(!isFinite(target)||reduced)return;
  const fmt=v=>Math.round(v).toLocaleString('en-US');const t0=performance.now(),dur=1100;
  const tick=now=>{const p=Math.min(1,(now-t0)/dur);el.textContent=fmt(target*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(tick)};
  requestAnimationFrame(tick);
}

function partner(board){
  // A short story across the three cards: draft → signed → live.
  const steps=['s1','s2','s3'];
  if(reduced){board.classList.add(...steps);return}
  steps.forEach((s,i)=>setTimeout(()=>{board.classList.add(s);if(s==='s2')$$('[data-count]',board).forEach(countUp)},300+i*1700));
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

export function init(){
  window.__imbleoMotion=true;document.documentElement.classList.add('motion-ready');
  $$('[data-split]').forEach(splitWords);
  const revealTargets=$$('[data-reveal],[data-split],[data-flow],[data-stages],[data-partner],.anatomy-feature,.case-art,.logo-strip');
  if(reduced||!('IntersectionObserver' in window)){revealTargets.forEach(el=>el.classList.add('in'));$$('[data-partner]').forEach(partner);$$('[data-path]').forEach(el=>el.closest('section')&&pathRunner(el.closest('section')));return}
  const once=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;const el=e.target;el.classList.add('in');once.unobserve(el);
    if(el.matches('[data-partner]'))partner(el);
    $$('[data-count]',el).forEach(c=>{if(!el.matches('[data-partner]'))countUp(c)});
  }),{threshold:0.12,rootMargin:'0px 0px -6% 0px'});
  revealTargets.forEach(el=>once.observe(el));
  // Looping 2D animations (CSS and the SVG's own SMIL motion) only run on screen.
  const live=new IntersectionObserver(entries=>entries.forEach(e=>{const el=e.target;el.classList.toggle('playing',e.isIntersecting);
    if(el.matches('svg.anat')&&el.pauseAnimations)e.isIntersecting?el.unpauseAnimations():el.pauseAnimations();}),{rootMargin:'60px'});
  $$('.case-art,.anat,.partner-board,.logo-wall,.workspace-stage').forEach(el=>live.observe(el));
  $$('[data-path]').forEach(el=>pathRunner(el.closest('section')));
}
