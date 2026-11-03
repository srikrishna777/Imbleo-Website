// "05 / The tools we connect": tool tiles fly in from every direction and assemble
// into one cube as the section scrolls into view. Drag to turn it. Hovering a tool in
// the list lifts its tiles.
import {icon} from './icons.js';

const TOOLS = [['pipeline', 'CRM'], ['wallet', 'Finance'], ['briefcase', 'Projects'], ['headset', 'Service'], ['chart', 'Analytics'], ['link', 'Automation'], ['sparkles', 'AI'], ['file', 'Docs'], ['users', 'People']];
const FACES = [
  {rot: '', tone: 'f-blue', icons: true, labels: true},
  {rot: 'rotateY(90deg)', tone: 'f-green', icons: true, shift: 3},
  {rot: 'rotateX(90deg)', tone: 'f-white', icons: true, shift: 6},
  {rot: 'rotateY(180deg)', tone: 'f-navy', icons: true, shift: 1},
  {rot: 'rotateY(-90deg)', tone: 'f-mint', icons: true, shift: 4},
  {rot: 'rotateX(-90deg)', tone: 'f-peri', icons: true, shift: 7}
];
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const ease = t => 1 - Math.pow(1 - t, 3);
function rng(seed) { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647; }

export function init(stage) {
  const cube = stage.querySelector('.cube');
  const list = [...document.querySelectorAll('.tool-list [data-tool]')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const R = rng(97);
  const tiles = [];
  FACES.forEach((f, fi) => {
    for (let k = 0; k < 9; k++) {
      const tool = (k + (f.shift || 0)) % 9;
      const el = document.createElement('span');
      el.className = `tile ${f.tone}`;
      el.dataset.tool = tool;
      el.innerHTML = f.icons ? `${icon(TOOLS[tool][0])}${f.labels ? `<small>${TOOLS[tool][1]}</small>` : ''}` : '';
      cube.append(el);
      const ang = R() * Math.PI * 2, dist = 260 + R() * 260;
      tiles.push({el, face: f, k, tool, scatter: [Math.cos(ang) * dist, Math.sin(ang) * dist * 0.75 - 40, (R() - 0.5) * 500], spin: [(R() - 0.5) * 540, (R() - 0.5) * 540, (R() - 0.5) * 360], delay: R() * 0.35});
    }
  });

  let size = 0, gap = 0, half = 0;
  function measure() {
    size = parseFloat(getComputedStyle(stage).getPropertyValue('--tile')) || 64; gap = Math.max(3, size * 0.07); half = (size * 3 + gap * 2) / 2;
  }
  let swayT = 0, assemble = reduced ? 1 : 0, shown = assemble, rx = -24, ry = -36, vx = 0, vy = 0, drag = null, hot = -1, visible = false, raf = 0, auto = 0, scrollTurn = 0;

  function render() {
    tiles.forEach(t => {
      const p = ease(clamp((shown - t.delay * 0.7) / 0.65)), s = 1 - p;
      const u = ((t.k % 3) - 1) * (size + gap), v = (Math.floor(t.k / 3) - 1) * (size + gap);
      const lift = t.tool === hot ? 16 : 0;
      t.el.style.transform = `translate3d(${t.scatter[0] * s}px,${t.scatter[1] * s}px,${t.scatter[2] * s}px) rotateX(${t.spin[0] * s}deg) rotateY(${t.spin[1] * s}deg) rotateZ(${t.spin[2] * s}deg) ${t.face.rot} translateZ(${half + lift}px) translate3d(${u}px,${v}px,0)`;
      t.el.style.opacity = String(0.25 + 0.75 * clamp(p * 1.6));
      t.el.classList.toggle('hot', t.tool === hot);
    });
    cube.style.transform = `rotateX(${rx}deg) rotateY(${ry + auto + scrollTurn}deg)`;
    stage.style.setProperty('--assembled', shown.toFixed(3));
  }
  function measureScroll() {
    const r = stage.getBoundingClientRect(), vh = innerHeight;
    assemble = reduced ? 1 : clamp((vh * 0.98 - r.top) / (vh * 0.62));
    scrollTurn = reduced ? 0 : clamp((vh * 0.5 - r.top) / vh, -1, 1) * 24;
  }
  function loop() {
    raf = 0;
    shown += (assemble - shown) * 0.12; if (Math.abs(assemble - shown) < 0.001) shown = assemble;
    if (!drag) { rx += vx; ry += vy; vx *= 0.92; vy *= 0.92; rx += (-24 - rx) * 0.02; if (!reduced && hot < 0) { swayT += 1 / 60; auto = Math.sin(swayT * 0.45) * 18; } }
    render();
    if (visible) raf = requestAnimationFrame(loop);
  }
  stage.addEventListener('pointerdown', e => { if (e.button !== 0) return; drag = {x: e.clientX, y: e.clientY}; stage.setPointerCapture(e.pointerId); stage.classList.add('dragging'); });
  stage.addEventListener('pointermove', e => { if (!drag) return; const dx = e.clientX - drag.x, dy = e.clientY - drag.y; drag = {x: e.clientX, y: e.clientY}; vy = dx * 0.35; vx = -dy * 0.35; ry += vy; rx = clamp(rx + vx, -80, 80); if (reduced) render(); });
  const end = () => { drag = null; stage.classList.remove('dragging'); };
  stage.addEventListener('pointerup', end); stage.addEventListener('pointercancel', end);
  list.forEach(li => {
    const on = () => { hot = +li.dataset.tool; list.forEach(x => x.classList.toggle('active', x === li)); if (reduced) render(); };
    const off = () => { hot = -1; li.classList.remove('active'); if (reduced) render(); };
    li.addEventListener('pointerenter', on); li.addEventListener('pointerleave', off); li.addEventListener('focus', on); li.addEventListener('blur', off);
  });
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(loop); }, {rootMargin: '120px'}).observe(stage);
  addEventListener('scroll', measureScroll, {passive: true});
  addEventListener('resize', () => { measure(); render(); });
  measure(); measureScroll(); shown = reduced ? 1 : assemble; render();
}
