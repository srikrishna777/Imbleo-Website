// Business Anatomy scroll story. Each text step sets the chapter on the sticky stage;
// CSS (chapter classes c0…c9) moves the 2D illustration between states.
export function init(section) {
  const stage = section.querySelector('.story-stage');
  const steps = [...section.querySelectorAll('.story-step')];
  if (!stage || !steps.length) return;
  const count = stage.querySelector('.hud-count b'), title = stage.querySelector('.hud-title'), bar = stage.querySelector('.hud-bar i');
  const kickers = steps.map(s => (s.querySelector('.step-k')?.textContent || '').replace(/^\d+\s·\s/, ''));
  let current = -1;
  function set(i) {
    if (i === current) return; current = i;
    stage.dataset.chapter = i;
    for (let n = 0; n < steps.length; n++) stage.classList.toggle('c' + n, n <= i);
    steps.forEach((s, j) => s.classList.toggle('is-active', j === i));
    if (count) count.textContent = String(i + 1).padStart(2, '0');
    if (title) { title.classList.remove('swap'); void title.offsetWidth; title.textContent = kickers[i]; title.classList.add('swap'); }
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) set(steps.indexOf(e.target)); });
  }, {rootMargin: '-45% 0px -45% 0px'});
  steps.forEach(s => io.observe(s));
  let ticking = false;
  const progress = () => { ticking = false; const r = section.getBoundingClientRect(); const p = Math.max(0, Math.min(1, (innerHeight * 0.5 - r.top) / r.height)); if (bar) bar.style.transform = `scaleX(${p})`; };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(progress); } }, {passive: true});
  set(0); progress();
}
