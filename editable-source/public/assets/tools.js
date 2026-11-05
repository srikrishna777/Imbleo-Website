// "05 / Tools": a flat disc of app icons. The icons sit together while the section
// is in view and disperse outward as it scrolls away. Only one CSS variable is
// written per frame; the icons move with transforms.
export function init(section) {
  const disc = section.querySelector('[data-disc]');
  if (!disc) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  new IntersectionObserver(([e]) => disc.classList.toggle('playing', e.isIntersecting), {rootMargin: '80px'}).observe(disc);
  if (reduced) { disc.style.setProperty('--spread', '0'); return; }
  let ticking = false, last = -1;
  const update = () => {
    ticking = false;
    const r = disc.getBoundingClientRect(), vh = innerHeight;
    if (r.bottom < -200 || r.top > vh + 200) return;
    const off = (r.top + r.height / 2 - vh / 2) / vh;
    // Arriving from below: gather in. Scrolling past: disperse and move out.
    const spread = off < 0 ? Math.min(1, Math.max(0, -off - 0.04) * 1.35) : Math.min(1, Math.max(0, off - 0.12) * 1.2);
    if (Math.abs(spread - last) < 0.004) return;
    last = spread;
    disc.style.setProperty('--spread', spread.toFixed(3));
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, {passive: true});
  addEventListener('resize', update);
  update();
}
