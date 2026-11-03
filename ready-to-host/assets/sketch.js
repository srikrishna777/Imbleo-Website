// "01 / The way we think": a hand-drawn sketch that starts jumbled and organises
// itself as you scroll. People, papers and tangled lines are drawn on a canvas with
// pencil-like double strokes, cross-hatching and a gentle "line boil", then pulled
// into one connected loop around a shared picture of the business.

const INK = '#11163f', PAPER = '#ffffff', BLUE = '#1e2c9b', GREEN = '#47b824', GREEN_D = '#2f8a12', PERI = '#8f97ea', GRAPHITE = '#5d6288';
const W = 600, H = 440;
const HAND = "600 17px Caveat, 'Segoe Print', 'Comic Sans MS', cursive";

const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
function rng(seed) { let s = Math.abs(Math.floor(seed)) % 2147483647 || 7; return () => (s = (s * 16807) % 2147483647) / 2147483647; }

function wobble(cx, cy, r, seed, ry = 1.06) {
  const R = rng(seed); const n = 28, start = R() * 6.28; let d = '';
  for (let i = 0; i <= n; i++) {
    const a = start + (i / n) * Math.PI * 2 * 1.1;
    const rr = r * (1 + (R() - 0.5) * 0.08) + (i > n * 0.92 ? 1.4 : 0);
    d += (i ? 'L' : 'M') + (cx + Math.cos(a) * rr).toFixed(1) + ' ' + (cy + Math.sin(a) * rr * ry).toFixed(1);
  }
  return d;
}

/* ---------------------------------------------------------------- the cast */
// Local coordinates: feet at (0,0), head centre at (0,-92). Each figure has a paper
// silhouette (fills), a shirt region (hatched) and pencil strokes.
const BODY = {
  torso: 'M-18 -74 Q-25 -72 -25 -61 L-22 -33 L22 -33 L25 -61 Q25 -72 18 -74 Q0 -68 -18 -74 Z',
  legs: 'M-20 -33 L-17 -2 L-6 -2 L-2 -24 L2 -24 L6 -2 L17 -2 L20 -33 Z',
  feet: 'M-17 -2 L-24 1 L-5 1 M5 1 L24 1 L17 -2',
  neck: 'M-3.5 -80 L-3.5 -74 M3.5 -80 L3.5 -74',
  collar: 'M-7 -73 L0 -65 L7 -73',
  face: 'M-4.6 -94 l.6 .8 M4.4 -94 l.6 .8 M-4 -86.5 Q0 -83.5 4 -86.5'
};
const HAIR = {
  short: 'M-12.5 -93 C-14 -108 13 -110 12.5 -93 M-11 -101 Q-4 -106 4 -101 M-2 -104 Q5 -108 10 -100',
  long: 'M-12 -95 C-13 -110 13 -110 12 -95 M-12 -96 C-17 -85 -16 -75 -12 -68 M12 -96 C17 -85 16 -75 12 -68 M-9 -103 Q0 -108 9 -103',
  bun: 'M-12.5 -94 C-13 -108 13 -108 12.5 -94 M-4 -108 a5 5 0 1 0 8 0 a5 5 0 0 0 -8 0 M-9 -102 Q0 -106 9 -102',
  curly: 'M-13 -92 q-3 -6 2 -9 q-1 -6 5 -7 q3 -5 8 -2 q6 -2 7 4 q5 2 3 8 q2 4 -1 7',
  hat: 'M-15 -96 C-15 -113 15 -113 15 -96 Z M-19 -96 L19 -96 M0 -112 L0 -104',
  headset: 'M-13 -93 C-14 -109 13 -110 13 -93 M-10 -104 Q0 -109 10 -104 M-15 -97 C-15 -115 15 -115 15 -97 M-17 -98 L-12 -98 L-12 -88 L-17 -88 Z M12 -98 L17 -98 L17 -88 L12 -88 Z M-15 -88 Q-15 -80 -6 -82'
};
const POSES = {
  phone: {arms: 'M-22 -70 Q-31 -55 -27 -38 M22 -70 Q31 -80 17 -91', props: 'M10 -100 L19 -98 L16 -82 L7 -84 Z', propFill: 'M10 -100 L19 -98 L16 -82 L7 -84 Z', hands: [[-27, -36], [15, -91]]},
  tablet: {arms: 'M-22 -70 Q-29 -56 -13 -52 M22 -70 Q29 -56 13 -52', props: 'M-16 -62 L16 -62 L16 -42 L-16 -42 Z M-11 -56 L9 -56 M-11 -50 L4 -50', propFill: 'M-16 -62 L16 -62 L16 -42 L-16 -42 Z', hands: [[-13, -52], [13, -52]]},
  clipboard: {arms: 'M-22 -70 Q-33 -57 -27 -46 M22 -70 Q32 -62 27 -52', props: 'M-38 -60 L-22 -60 L-22 -34 L-38 -34 Z M-33 -62 L-27 -62 M-35 -54 L-25 -54 M-35 -48 L-27 -48 M-35 -42 L-26 -42 M28 -52 L34 -66', propFill: 'M-38 -60 L-22 -60 L-22 -34 L-38 -34 Z', hands: [[-27, -46], [27, -52]]},
  toolbox: {arms: 'M22 -70 Q29 -52 27 -37 M-22 -70 Q-35 -58 -21 -50', props: 'M16 -36 L42 -36 L42 -20 L16 -20 Z M23 -36 Q29 -44 35 -36 M16 -30 L42 -30', propFill: 'M16 -36 L42 -36 L42 -20 L16 -20 Z', hands: [[27, -37]]},
  laptop: {arms: 'M-22 -70 Q-27 -54 -17 -48 M22 -70 Q27 -54 17 -48', props: 'M-20 -47 L20 -47 M-17 -47 L-13 -67 L15 -67 L19 -47 M-8 -60 L8 -60 M-8 -55 L4 -55', propFill: 'M-20 -47 L-17 -47 L-13 -67 L15 -67 L19 -47 L20 -47 L20 -45 L-20 -45 Z', hands: [[-17, -48], [17, -48]]},
  wave: {arms: 'M-22 -70 Q-30 -56 -26 -40 M22 -70 Q35 -80 32 -98', props: 'M29 -101 l2 -6 M33 -101 l3 -5 M36 -98 l4 -3', propFill: '', hands: [[-26, -38], [32, -100]]}
};
const CAST = [
  {name: 'customer', hair: 'long', pose: 'phone', shirt: GREEN},
  {name: 'sales', hair: 'short', pose: 'tablet', shirt: BLUE},
  {name: 'operations', hair: 'bun', pose: 'clipboard', shirt: PERI},
  {name: 'the crew', hair: 'hat', pose: 'toolbox', shirt: GREEN_D},
  {name: 'finance', hair: 'curly', pose: 'laptop', shirt: BLUE, glasses: true},
  {name: 'support', hair: 'headset', pose: 'wave', shirt: GREEN}
];
const SPOTS = [[100, 168], [300, 168], [500, 168], [500, 390], [300, 390], [100, 390]];
const MESS = [[430, 300, 0.55], [170, 340, -0.42], [315, 150, 0.28], [80, 175, -0.62], [520, 125, 0.7], [270, 420, -0.3]];

/* ------------------------------------------------------------- the paperwork */
const PROPS = [
  {k: 'envelope', mess: [210, 70, -0.5]}, {k: 'sticky', mess: [470, 210, 0.4]}, {k: 'sheet', mess: [60, 300, 0.3]},
  {k: 'invoice', mess: [380, 400, -0.25]}, {k: 'sticky', mess: [150, 230, -0.7]}, {k: 'calendar', mess: [560, 330, 0.2]},
  {k: 'envelope', mess: [350, 240, 0.8]}, {k: 'sheet', mess: [250, 290, -0.15]}, {k: 'sticky', mess: [560, 60, -0.3]}
];
const PROP_PATHS = {
  envelope: {fill: 'M-17 -11 L17 -11 L17 11 L-17 11 Z', line: 'M-17 -11 L17 -11 L17 11 L-17 11 Z M-17 -11 L0 3 L17 -11'},
  sticky: {fill: 'M-12 -12 L12 -12 L12 6 L6 12 L-12 12 Z', line: 'M-12 -12 L12 -12 L12 6 L6 12 L-12 12 Z M6 12 L6 6 L12 6 M-8 -6 L7 -6 M-8 -1 L4 -1', tint: GREEN},
  sheet: {fill: 'M-22 -16 L22 -16 L22 16 L-22 16 Z', line: 'M-22 -16 L22 -16 L22 16 L-22 16 Z M-22 -8 L22 -8 M-22 0 L22 0 M-22 8 L22 8 M-8 -16 L-8 16 M7 -16 L7 16'},
  invoice: {fill: 'M-14 -18 L14 -18 L14 18 L-14 18 Z', line: 'M-14 -18 L14 -18 L14 18 L-14 18 Z M-9 -10 L9 -10 M-9 -4 L5 -4 M-9 2 L9 2 M2 9 L9 9 M-7 12 Q-3 6 -7 8 Q-11 10 -6 14'},
  calendar: {fill: 'M-15 -12 L15 -12 L15 14 L-15 14 Z', line: 'M-15 -12 L15 -12 L15 14 L-15 14 Z M-15 -4 L15 -4 M-8 -16 L-8 -9 M8 -16 L8 -9 M-9 3 l1 0 M-1 3 l1 0 M7 3 l1 0 M-9 9 l1 0 M-1 9 l1 0', tint: BLUE}
};
const MUTTER = [
  {t: 'who has the latest?', x: 300, y: 48, r: -0.1}, {t: 'where’s that email??', x: 95, y: 252, r: 0.1},
  {t: 'did anyone tell finance?', x: 420, y: 430, r: -0.05}, {t: 'call me back…', x: 215, y: 196, r: -0.18}, {t: 'which version?', x: 505, y: 268, r: 0.14}
];
const QUESTIONS = [[250, 120, -0.2, 34], [545, 190, 0.25, 28], [140, 420, 0.1, 30], [395, 330, -0.15, 40], [40, 80, 0.2, 26]];

/* Loop connectors between the stations (organised state). */
const LINKS = [
  {a: [140, 112], c: [199, 90], b: [258, 112], label: 'enquiry', lx: 199, ly: 84},
  {a: [340, 112], c: [399, 90], b: [458, 112], label: 'signed scope', lx: 399, ly: 84},
  {a: [552, 150], c: [586, 228], b: [552, 300], label: 'job pack', lx: 585, ly: 232, rot: 1.57},
  {a: [458, 336], c: [400, 356], b: [342, 336], label: 'work done', lx: 400, ly: 370},
  {a: [258, 336], c: [200, 356], b: [142, 336], label: 'paid', lx: 200, ly: 370},
  {a: [48, 300], c: [14, 228], b: [48, 150], label: 'follow-up', lx: 16, ly: 232, rot: -1.57}
];
const NPTS = 46;
function quadPoint(a, c, b, t) { const u = 1 - t; return [u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]]; }

export function init(section) {
  const canvas = section.querySelector('.sketch-canvas');
  if (!canvas || !canvas.getContext) return;
  const mainCtx = canvas.getContext('2d');
  let ctx = mainCtx;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pin = section.querySelector('.think-pin');
  const steps = [...section.querySelectorAll('[data-think-step]')];

  // Pre-build paths.
  const P = s => new Path2D(s);
  const cast = CAST.map((c, i) => {
    const pose = POSES[c.pose];
    return {
      ...c, i,
      head: P(wobble(0, -92, 12.5, 11 + i * 7)),
      headFill: P(wobble(0, -92, 12.5, 11 + i * 7)),
      torso: P(BODY.torso), legs: P(BODY.legs),
      strokes: P([BODY.feet, BODY.neck, BODY.collar, BODY.face, HAIR[c.hair], pose.arms].join(' ')),
      hands: P(pose.hands.map(([x, y]) => wobble(x, y, 3.2, 90 + i * 13 + x, 1)).join(' ')),
      prop: pose.props ? P(pose.props) : null,
      propFill: pose.propFill ? P(pose.propFill) : null,
      glasses: c.glasses ? P(wobble(-5, -93, 4.2, 300 + i, 1) + ' ' + wobble(5, -93, 4.2, 310 + i, 1) + ' M-1 -93 L1 -93') : null,
      delay: [0.02, 0.1, 0.16, 0.22, 0.12, 0.27][i]
    };
  });
  cast.forEach(c => { const body = new Path2D(); [c.legs, c.torso, c.head, c.strokes].forEach(q => body.addPath(q)); c.body = body; });
  const props = PROPS.map((p, i) => ({...p, i, fill: P(PROP_PATHS[p.k].fill), line: P(PROP_PATHS[p.k].line), tint: PROP_PATHS[p.k].tint, delay: 0.08 + i * 0.035}));
  const doc = {fill: P('M-62 -34 L62 -34 L62 34 L-62 34 Z'), line: P('M-62 -34 L62 -34 L62 34 L-62 34 Z M-62 -21 L62 -21 M-54 -28 L-30 -28 M-48 -9 L4 -9 M-48 4 L-6 4 M-48 17 L0 17 M18 22 L18 6 M28 22 L28 -2 M38 22 L38 10 M48 22 L48 -10 M14 24 L54 24'), checks: P('M-57 -10 l3 3 l5 -6 M-57 3 l3 3 l5 -6 M-57 16 l3 3 l5 -6'), band: P('M-62 -34 L62 -34 L62 -21 L-62 -21 Z')};
  const R0 = rng(4242);
  const links = LINKS.map((L, i) => {
    const order = Array.from({length: NPTS}, (_, k) => quadPoint(L.a, L.c, L.b, k / (NPTS - 1)));
    const cx = 80 + R0() * 440, cy = 70 + R0() * 300, rad = 26 + R0() * 40, turns = 2.2 + R0() * 1.6, ph = R0() * 6.28, sq = 0.5 + R0() * 0.6;
    const mess = Array.from({length: NPTS}, (_, k) => {const t = k / (NPTS - 1); const a = ph + t * Math.PI * 2 * turns; const r = rad * (0.45 + 0.55 * Math.sin(t * 5.3 + ph)) + 6; return [cx + Math.cos(a) * r + (t - 0.5) * 70, cy + Math.sin(a) * r * sq];});
    return {...L, i, order, mess, delay: 0.3 + i * 0.05};
  });

  let dpr = 1, scale = 1, ox = 0, oy = 0, progress = reduced ? 1 : 0, shown = reduced ? 1 : 0, visible = false, raf = 0, t0 = performance.now();
  function resize() {
    const r = canvas.getBoundingClientRect(); dpr = Math.min(devicePixelRatio || 1, 1.5, Math.sqrt(720000 / Math.max(1, r.width * r.height)));
    canvas.width = Math.max(1, Math.round(r.width * dpr)); canvas.height = Math.max(1, Math.round(r.height * dpr));
    scale = Math.min(r.width / W, r.height / H); ox = (r.width - W * scale) / 2; oy = (r.height - H * scale) / 2; framesFor = -1; draw(performance.now());
  }

  function stroke(path, R, jit, w = 1.45, alpha = 0.88, color = INK) {
    ctx.strokeStyle = color;
    for (let k = 0; k < 2; k++) {
      ctx.save(); ctx.translate((R() - 0.5) * jit, (R() - 0.5) * jit); ctx.rotate((R() - 0.5) * jit * 0.006);
      ctx.globalAlpha = alpha * (k ? 0.5 : 1); ctx.lineWidth = k ? w * 0.75 : w; ctx.stroke(path); ctx.restore();
    }
  }
  // Cross-hatching comes from small pre-drawn stripe tiles, so a frame is a few fills
  // rather than hundreds of clipped strokes.
  const patterns = new Map(), K = 3;
  function stripes(color, gap) {
    const key = color + gap; if (patterns.has(key)) return patterns.get(key);
    const s = Math.round(gap * K), c = document.createElement('canvas'); c.width = c.height = s;
    const g = c.getContext('2d'); g.strokeStyle = color; g.lineWidth = 1.05 * K; g.lineCap = 'square'; g.beginPath();
    for (const o of [-s, 0, s]) { g.moveTo(0, o); g.lineTo(s, o + s); }
    g.stroke();
    const pattern = ctx.createPattern(c, 'repeat'); if (pattern.setTransform) pattern.setTransform(new DOMMatrix().scale(1 / K));
    patterns.set(key, pattern); return pattern;
  }
  function hatch(path, color, alpha, R, jit, gap = 4.2) {
    ctx.save(); ctx.globalAlpha = alpha; ctx.fillStyle = stripes(color, gap); ctx.fill(path); ctx.restore();
  }
  function fillPaper(path) { ctx.fillStyle = PAPER; ctx.globalAlpha = 1; ctx.fill(path); }
  const fonts = {};
  function hand(text, x, y, rot, alpha, color = INK, size = 17) {
    if (alpha <= 0.01) return; ctx.save(); ctx.translate(x, y); if (rot) ctx.rotate(rot); ctx.globalAlpha = alpha; ctx.fillStyle = color;
    ctx.font = fonts[size] || (fonts[size] = HAND.replace('17px', size + 'px')); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, 0); ctx.restore();
  }
  function smoothLine(pts) { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length - 1; i++) { const mx = (pts[i][0] + pts[i + 1][0]) / 2, my = (pts[i][1] + pts[i + 1][1]) / 2; ctx.quadraticCurveTo(pts[i][0], pts[i][1], mx, my); } const l = pts[pts.length - 1]; ctx.lineTo(l[0], l[1]); }

  function draw(now, withDots = true) {
    const time = (now - t0) / 1000;
    const p = shown, m = 1 - p;
    const boil = reduced ? 0 : Math.floor(time * 8);
    const jit = 0.55 + m * 1.6;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(dpr * scale, 0, 0, dpr * scale, dpr * ox, dpr * oy);
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';

    // Grumbles and question marks fade as things settle.
    MUTTER.forEach((q, i) => hand(q.t, q.x + Math.sin(time * 0.9 + i) * 3 * m, q.y, q.r, clamp(1 - p / 0.38) * 0.75, GRAPHITE, 17));
    QUESTIONS.forEach(([x, y, r, s], i) => hand('?', x + Math.sin(time + i) * 4 * m, y + Math.cos(time * 0.8 + i) * 4 * m, r + Math.sin(time * 1.3 + i) * 0.08 * m, clamp(1 - p / 0.3) * 0.65, i % 2 ? BLUE : GRAPHITE, s));

    // Marker wash behind each station once organised.
    const wash = clamp((p - 0.62) / 0.3);
    if (wash > 0) SPOTS.forEach(([x, y], i) => {
      const R = rng(700 + i * 31 + boil); ctx.save(); ctx.translate(x, y - 56); ctx.globalAlpha = 0.13 * wash; ctx.fillStyle = i % 2 ? BLUE : GREEN;
      ctx.beginPath(); ctx.ellipse((R() - 0.5) * 1.5, (R() - 0.5) * 1.5, 50, 64, (i % 3 - 1) * 0.08, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    });

    // The shared picture in the middle draws itself in.
    const dp = clamp((p - 0.55) / 0.35);
    if (dp > 0) {
      const R = rng(900 + boil); ctx.save(); ctx.translate(300, 240); ctx.scale(0.7 + 0.22 * ease(dp), 0.7 + 0.22 * ease(dp)); ctx.rotate((1 - dp) * 0.2);
      ctx.globalAlpha = dp; fillPaper(doc.fill); hatch(doc.band, BLUE, 0.55 * dp, R, 0.8, 3);
      stroke(doc.line, R, jit, 1.4, 0.9 * dp); stroke(doc.checks, R, jit, 1.8, dp, GREEN_D);
      ctx.restore();
      hand('← one shared picture', 432, 238, -0.04, clamp((p - 0.8) / 0.15), GREEN_D, 18);
    }

    // Connectors: tangles that straighten into one loop.
    links.forEach((L, i) => {
      const lp = ease(clamp((p - L.delay * 0.6) / 0.62));
      const R = rng(1000 + i * 17 + boil);
      const pts = L.order.map((o, k) => { const ms = L.mess[k]; const wob = (1 - lp) * 2.5; return [lerp(ms[0], o[0], lp) + (R() - 0.5) * wob, lerp(ms[1], o[1], lp) + (R() - 0.5) * wob]; });
      const color = lp > 0.85 ? (i % 2 ? BLUE : GREEN_D) : GRAPHITE;
      ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 1.3 + lp * 0.5; ctx.globalAlpha = 0.55 + lp * 0.35; smoothLine(pts); ctx.stroke();
      ctx.globalAlpha *= 0.45; ctx.translate(0.8, -0.6); smoothLine(pts); ctx.stroke(); ctx.restore();
      if (lp > 0.88) {
        const a = clamp((lp - 0.88) / 0.12); const e = pts[pts.length - 1], q = pts[pts.length - 4]; const ang = Math.atan2(e[1] - q[1], e[0] - q[0]);
        const head = new Path2D(`M${e[0] - Math.cos(ang - 0.45) * 10} ${e[1] - Math.sin(ang - 0.45) * 10} L${e[0]} ${e[1]} L${e[0] - Math.cos(ang + 0.45) * 10} ${e[1] - Math.sin(ang + 0.45) * 10}`);
        stroke(head, R, 0.6, 1.7, a, color);
        hand(L.label, L.lx, L.ly, L.rot || 0, a * 0.95, color, 15);
      }
      // Work flowing round the loop.
      if (withDots && p > 0.9 && !reduced) {
        const a = clamp((p - 0.9) / 0.08); const k = Math.floor(((time * 0.42 + i / 6) % 1) * (NPTS - 1)); const d = pts[k];
        ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = GREEN; ctx.beginPath(); ctx.arc(d[0], d[1], 3.6, 0, 7); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 0.9; ctx.stroke(); ctx.restore();
      }
    });

    // Papers fly in and are absorbed into the shared picture.
    props.forEach((pr, i) => {
      const pp = ease(clamp((p - pr.delay) / 0.55));
      if (pp >= 0.995) return;
      const [mx, my, mr] = pr.mess; const fx = 300 + ((i % 3) - 1) * 26, fy = 244 + (Math.floor(i / 3) - 1) * 14;
      const x = lerp(mx + Math.sin(time * 0.8 + i * 2) * 7 * m, fx, pp), y = lerp(my + Math.cos(time * 0.7 + i) * 6 * m, fy, pp);
      const rot = lerp(mr + Math.sin(time * 0.6 + i) * 0.12 * m, 0, pp), sc = lerp(1, 0.3, pp);
      const R = rng(2000 + i * 23 + boil);
      ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc); ctx.globalAlpha = 1 - pp * pp;
      fillPaper(pr.fill); if (pr.tint) hatch(pr.fill, pr.tint, 0.35, R, 1.2, 3.5); stroke(pr.line, R, jit, 1.3, 0.85 * (1 - pp * pp));
      ctx.restore();
    });

    // The people: scattered and restless, then in their places.
    const order = cast.map((c, i) => ({c, pp: ease(clamp((p - c.delay) / 0.6))})).sort((a, b) => a.pp - b.pp);
    order.forEach(({c, pp}) => {
      const i = c.i; const [mx, my, mr] = MESS[i]; const [sx, sy] = SPOTS[i];
      const x = lerp(mx + Math.sin(time * 0.9 + i * 1.7) * 6 * m, sx, pp), y = lerp(my + Math.cos(time * 0.75 + i) * 5 * m, sy, pp);
      const rot = lerp(mr + Math.sin(time * 0.6 + i) * 0.06 * m, Math.sin(time * 1.1 + i) * 0.012, pp), sc = lerp(0.92, 1, pp);
      const R = rng(3000 + i * 29 + boil);
      ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc);
      fillPaper(c.legs); fillPaper(c.torso); fillPaper(c.headFill);
      hatch(c.torso, pp > 0.5 ? c.shirt : GRAPHITE, 0.25 + 0.4 * pp, R, 1.2);
      hatch(c.legs, INK, 0.18 + 0.1 * pp, R, 1, 5.5);
      stroke(c.body, R, jit);
      fillPaper(c.hands); stroke(c.hands, R, jit, 1.2);
      if (c.propFill) { fillPaper(c.propFill); hatch(c.propFill, pp > 0.5 ? c.shirt : GRAPHITE, 0.2 + 0.25 * pp, R, 1, 3.2); }
      if (c.prop) stroke(c.prop, R, jit, 1.35);
      if (c.glasses) stroke(c.glasses, R, jit, 1.1);
      ctx.restore();
      const la = clamp((pp - 0.55) / 0.35);
      if (la > 0) {
        hand(c.name, sx, sy + 22, 0, la, INK, 19);
        const Ru = rng(4000 + i * 3 + boil); const w = c.name.length * 4.2 + 8;
        ctx.save(); ctx.globalAlpha = la * 0.7; ctx.strokeStyle = i % 2 ? BLUE : GREEN; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(sx - w + (Ru() - 0.5) * 2, sy + 33); ctx.quadraticCurveTo(sx, sy + 35 + (Ru() - 0.5) * 2, sx + w, sy + 32); ctx.stroke(); ctx.restore();
      }
    });
    ctx.globalAlpha = 1;
  }

  let pinned = false;
  const checkPinned = () => { pinned = !!pin && getComputedStyle(pin).position === 'sticky'; };
  // Moving dots on the finished loop, drawn over a cached idle frame.
  function drawDots(now) {
    const time = (now - t0) / 1000, a = clamp((shown - 0.9) / 0.08);
    ctx.setTransform(dpr * scale, 0, 0, dpr * scale, dpr * ox, dpr * oy);
    links.forEach((L, i) => {
      const k = Math.floor(((time * 0.42 + i / 6) % 1) * (NPTS - 1)), d = L.order[k];
      ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = GREEN; ctx.beginPath(); ctx.arc(d[0], d[1], 3.6, 0, 7); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 0.9; ctx.stroke(); ctx.restore();
    });
  }
  // Idle: replay three pre-rendered "boil" frames instead of redrawing the whole sketch.
  const frames = [null, null, null]; let framesFor = -1;
  function blitIdle(now) {
    if (framesFor !== shown) { frames.fill(null); framesFor = shown; }
    const f = Math.floor((now - t0) / 120) % 3;
    if (!frames[f]) {
      const c = document.createElement('canvas'); c.width = canvas.width; c.height = canvas.height;
      ctx = c.getContext('2d'); draw(t0 + 1000 + f * 370, false); ctx = mainCtx; frames[f] = c;
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.drawImage(frames[f], 0, 0);
    if (shown > 0.9 && !reduced) drawDots(now);
  }
  function measure() {
    const vh = innerHeight; let p;
    if (pinned) { const r = section.getBoundingClientRect(); const span = Math.max(1, r.height - vh); p = clamp((-r.top / span - 0.06) / 0.74); }
    else { const r = canvas.getBoundingClientRect(); p = clamp((vh * 0.92 - r.top) / (vh * 0.8)); }
    return p;
  }
  let lastVar = -1, ticking = false;
  function update() {
    ticking = false;
    progress = reduced ? 1 : measure();
    if (Math.abs(progress - lastVar) > 0.004 || progress === 0 || progress === 1) {
      lastVar = progress; section.style.setProperty('--think', progress.toFixed(3));
      steps.forEach((s, i) => s.classList.toggle('is-lit', i === 0 ? progress < 0.55 : progress >= 0.45));
    }
    if (visible && !raf) raf = requestAnimationFrame(loop);
  }
  // Full frame rate only while the drawing is catching up with the scroll; otherwise
  // the pencil "boil" ticks at about 10 fps, like hand-drawn animation.
  let lastDraw = 0;
  function loop(now) {
    raf = 0;
    if (!visible || reduced) return;
    // Time-based easing: catches up in about half a second whatever the frame rate.
    const dt = Math.min(100, now - (loop.prev || now)); loop.prev = now;
    const moving = Math.abs(progress - shown) > 0.002;
    if (moving) { shown += (progress - shown) * (1 - Math.exp(-dt / 110)); if (Math.abs(progress - shown) <= 0.002) shown = progress; }
    else if (shown !== progress) shown = progress;
    if (moving) { if (now - lastDraw > 32) { draw(now); lastDraw = now; } }
    else if (now - lastDraw > 110) { blitIdle(now); lastDraw = now; }
    raf = requestAnimationFrame(loop);
  }
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(loop); });
  io.observe(canvas);
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, {passive: true});
  addEventListener('resize', checkPinned);
  new ResizeObserver(resize).observe(canvas);
  checkPinned(); update(); resize();
  if (reduced) { shown = 1; draw(performance.now()); }
  if (document.fonts) document.fonts.load(HAND).then(() => { framesFor = -1; draw(performance.now()); }).catch(() => {});
}
