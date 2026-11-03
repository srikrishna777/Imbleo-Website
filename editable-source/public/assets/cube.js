// "05 / Tools": tool tiles fly in from every direction and assemble into one cube as
// the section scrolls into view. Drag to turn it. Hovering a tool in the list lifts its
// tiles. Performance: the 54 tiles are only restyled while they are assembling or a
// tool is highlighted; the idle sway is a CSS animation on a wrapper, and the loop
// stops completely when nothing is moving.
import {icon} from './icons.js';

const TOOLS = [['pipeline', 'CRM'], ['wallet', 'Finance'], ['briefcase', 'Projects'], ['headset', 'Service'], ['chart', 'Analytics'], ['link', 'Automation'], ['sparkles', 'AI'], ['file', 'Docs'], ['users', 'People']];
const FACES = [
  {rot: '', tone: 'f-blue', labels: true},
  {rot: 'rotateY(90deg)', tone: 'f-green', shift: 3},
  {rot: 'rotateX(90deg)', tone: 'f-white', shift: 6},
  {rot: 'rotateY(180deg)', tone: 'f-navy', shift: 1},
  {rot: 'rotateY(-90deg)', tone: 'f-mint', shift: 4},
  {rot: 'rotateX(-90deg)', tone: 'f-peri', shift: 7}
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
  const frag = document.createDocumentFragment();
  FACES.forEach(f => {
    for (let k = 0; k < 9; k++) {
      const tool = (k + (f.shift || 0)) % 9;
      const el = document.createElement('span');
      el.className = `tile ${f.tone}`;
      el.dataset.tool = tool;
      el.innerHTML = `${icon(TOOLS[tool][0])}${f.labels ? `<small>${TOOLS[tool][1]}</small>` : ''}`;
      frag.append(el);
      const ang = R() * Math.PI * 2, dist = 260 + R() * 260;
      tiles.push({el, face: f, k, tool, scatter: [Math.cos(ang) * dist, Math.sin(ang) * dist * 0.75 - 40, (R() - 0.5) * 500], spin: [(R() - 0.5) * 540, (R() - 0.5) * 540, (R() - 0.5) * 360], delay: R() * 0.35});
    }
  });
  cube.append(frag);

  let size = 64, gap = 4, half = 100;
  const measure = () => { size = parseFloat(getComputedStyle(stage).getPropertyValue('--tile')) || 64; gap = Math.max(3, size * 0.07); half = (size * 3 + gap * 2) / 2; };
  let assemble = reduced ? 1 : 0, shown = assemble, rx = -24, ry = -34, vx = 0, vy = 0, drag = null, hot = -1, visible = false, raf = 0, scrollTurn = 0;
  let tilesDirty = true, cubeDirty = true, lastShown = -1, lastHot = -2;

  function renderTiles() {
    const settled = shown >= 0.999;
    tiles.forEach(t => {
      const p = ease(clamp((shown - t.delay * 0.7) / 0.65)), s = 1 - p;
      const u = ((t.k % 3) - 1) * (size + gap), v = (Math.floor(t.k / 3) - 1) * (size + gap);
      const lift = t.tool === hot ? 16 : 0;
      t.el.style.transform = (s > 0.0005 ? `translate3d(${t.scatter[0] * s}px,${t.scatter[1] * s}px,${t.scatter[2] * s}px) rotateX(${t.spin[0] * s}deg) rotateY(${t.spin[1] * s}deg) rotateZ(${t.spin[2] * s}deg) ` : '') + `${t.face.rot} translateZ(${half + lift}px) translate3d(${u}px,${v}px,0)`;
      t.el.style.opacity = settled ? '' : String(0.25 + 0.75 * clamp(p * 1.6));
      t.el.classList.toggle('hot', t.tool === hot);
    });
    stage.classList.toggle('assembled', shown > 0.9);
    lastShown = shown; lastHot = hot; tilesDirty = false;
  }
  function renderCube() { cube.style.transform = `rotateX(${rx}deg) rotateY(${ry + scrollTurn}deg)`; cubeDirty = false; }

  function measureScroll() {
    const r = stage.getBoundingClientRect(), vh = innerHeight;
    const a = reduced ? 1 : clamp((vh * 0.98 - r.top) / (vh * 0.62));
    const turn = reduced ? 0 : clamp((vh * 0.5 - r.top) / vh, -1, 1) * 24;
    if (a !== assemble) assemble = a;
    if (Math.abs(turn - scrollTurn) > 0.05) { scrollTurn = turn; cubeDirty = true; }
    kick();
  }
  function loop() {
    raf = 0;
    if (Math.abs(assemble - shown) > 0.001) { shown += (assemble - shown) * 0.12; if (Math.abs(assemble - shown) < 0.001) shown = assemble; }
    if (shown !== lastShown || hot !== lastHot || tilesDirty) renderTiles();
    if (!drag && (Math.abs(vx) > 0.01 || Math.abs(vy) > 0.01 || Math.abs(rx + 24) > 0.05)) { rx += vx; ry += vy; vx *= 0.92; vy *= 0.92; rx += (-24 - rx) * 0.04; cubeDirty = true; }
    if (cubeDirty) renderCube();
    const busy = drag || Math.abs(assemble - shown) > 0.001 || Math.abs(vx) > 0.01 || Math.abs(vy) > 0.01 || Math.abs(rx + 24) > 0.05;
    if (visible && busy) raf = requestAnimationFrame(loop);
  }
  function kick() { if (visible && !raf) raf = requestAnimationFrame(loop); }

  stage.addEventListener('pointerdown', e => { if (e.button !== 0) return; drag = {x: e.clientX, y: e.clientY}; stage.setPointerCapture(e.pointerId); stage.classList.add('dragging'); kick(); });
  stage.addEventListener('pointermove', e => { if (!drag) return; const dx = e.clientX - drag.x, dy = e.clientY - drag.y; drag = {x: e.clientX, y: e.clientY}; vy = dx * 0.35; vx = -dy * 0.35; ry += vy; rx = clamp(rx + vx, -80, 80); cubeDirty = true; kick(); });
  const end = () => { drag = null; stage.classList.remove('dragging'); kick(); };
  stage.addEventListener('pointerup', end); stage.addEventListener('pointercancel', end);
  list.forEach(li => {
    const on = () => { hot = +li.dataset.tool; list.forEach(x => x.classList.toggle('active', x === li)); stage.classList.add('focused'); kick(); };
    const off = () => { hot = -1; li.classList.remove('active'); stage.classList.remove('focused'); kick(); };
    li.addEventListener('pointerenter', on); li.addEventListener('pointerleave', off); li.addEventListener('focus', on); li.addEventListener('blur', off);
  });
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; stage.classList.toggle('playing', visible); kick(); }, {rootMargin: '120px'}).observe(stage);
  let ticking = false;
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; measureScroll(); }); } }, {passive: true});
  addEventListener('resize', () => { measure(); tilesDirty = true; kick(); });
  measure(); measureScroll(); shown = reduced ? 1 : assemble; renderTiles(); renderCube();
}
