// Business Anatomy: a 2D scroll story and its illustration.
// The story follows one customer through an illustrative business. It replaces the
// earlier interactive export with the same idea (one customer, every team, process and
// system behind her experience) told as a scroll-driven 2D story.
// anatomyArt() returns an SVG string used on /business-anatomy/ (mode 'story')
// and on the homepage feature (mode 'home').

export const story = {
  business: 'Corbel Building Supply',
  where: 'An illustrative construction products and technical supply business',
  customer: 'Leah',
  role: 'a site manager for a building firm',
  chapters: [
    {kicker: 'Above the surface', title: 'Leah sees one supplier.', body: 'She downloaded a spec sheet, asked a technical question, approved a quote and took a delivery on site. Most customers only ever see the outside of your business.'},
    {kicker: 'The customer journey', title: 'Six moments. One order.', body: 'A spec sheet. A technical question. A quote. A site delivery. An invoice. A repeat order. Follow Leah from her first download to the next project she brings you.'},
    {kicker: 'Peel back the first layer', title: 'One order. Six teams making it happen.', body: 'Tom in trade sales, Nadia on the technical desk, Raj in the warehouse, Sam running deliveries, Grace in accounts and Ola in customer care. Leah never meets most of them.'},
    {kicker: 'The handovers', title: 'The work is only as good as the handover.', body: 'Follow the joins between teams, not just the tasks inside them. A dashed line is a person carrying context by email, phone or memory.'},
    {kicker: 'The layer underneath', title: 'The technology sits underneath the work.', body: 'An inbox, a spreadsheet, a CRM nobody fully trusts, a stock list, the accounting system and a phone line. Each one useful. None of them talking.'},
    {kicker: 'Where the thread breaks', title: 'The gaps are where the business does work twice.', body: 'Waiting. Chasing. Re-typing. Relying on somebody’s memory. These scenarios are illustrative, but most teams recognise at least one.', list: ['The spec request is lost in the inbox', 'Quantities are re-typed for the warehouse', 'The site extra never reaches the invoice', 'Leah explains her project again']},
    {kicker: 'Look closer · Technical → Warehouse', title: 'An approved quote should not wait for a conversation.', body: 'Nadia has the specs, the quantities and the site details. Raj still has to rebuild them from emails before Sam’s truck can be loaded.'},
    {kicker: 'Fix one handover', title: 'The approval creates the order.', body: 'When Leah approves the quote, the order is created with the specs, quantities and delivery address attached, and Raj is notified. Same people. Less carrying.'},
    {kicker: 'Back to the business', title: 'The same business. Fewer gaps to carry.', body: 'Close the loudest gap first, then improve each handover one at a time. Ownership stays clear the whole way.'},
    {kicker: 'Monday, 8:00am', title: 'One screen. Nobody had to prepare it.', body: 'Better visibility comes from recording the work properly in the first place. The numbers arrive because people simply did their jobs.'}
  ],
  end: {
    kicker: 'The end of the thread',
    title: 'The apps aren’t the point. The thread is.',
    body: 'Pick one customer you supplied last month. Can you follow the whole thread, from their first spec request to their next order, without opening another system or ringing a colleague?'
  }
};


// ---------------------------------------------------------------------------
// The illustration, drawn in the same hand-drawn pencil style as the homepage
// sketch: paper fills, double ink strokes, cross-hatching, Caveat handwriting.
// Layout and class names are shared with the scroll story (chapter states in CSS).
// ---------------------------------------------------------------------------
const C = {blue: '#1e2c9b', navy: '#0b1046', green: '#47b824', greenDeep: '#2f8a12', peri: '#8f97ea', ink: '#11163f', graphite: '#5d6288', coral: '#e2552f', paper: '#ffffff'};

function rng(seed) { let s = Math.abs(Math.floor(seed)) % 2147483647 || 7; return () => (s = (s * 16807) % 2147483647) / 2147483647; }
const f1 = n => Math.round(n * 10) / 10;
function wobble(cx, cy, r, seed, ry = 1) {
  const R = rng(seed); const n = 24, start = R() * 6.28; let d = '';
  for (let i = 0; i <= n; i++) {
    const a = start + (i / n) * Math.PI * 2 * 1.08;
    const rr = r * (1 + (R() - 0.5) * 0.07) + (i > n * 0.92 ? r * 0.08 : 0);
    d += (i ? 'L' : 'M') + f1(cx + Math.cos(a) * rr) + ' ' + f1(cy + Math.sin(a) * rr * ry);
  }
  return d;
}
// A hand-drawn rounded box: wobbly edges and a small overshoot where the pencil closes.
function box(x, y, w, h, seed, r = 12) {
  const R = rng(seed); const j = () => f1((R() - 0.5) * 2.4);
  return `M${x + r + j()} ${y + j()}L${x + w - r + j()} ${y + j()}Q${x + w} ${y} ${x + w + j()} ${y + r + j()}L${x + w + j()} ${y + h - r + j()}Q${x + w} ${y + h} ${x + w - r + j()} ${y + h + j()}L${x + r + j()} ${y + h + j()}Q${x} ${y + h} ${x + j()} ${y + h - r + j()}L${x + j()} ${y + r + j()}Q${x} ${y} ${x + r + 6} ${y - 1.5}`;
}
const ink = (d, w = '') => `<path class="ink${w}" d="${d}"/><path class="ink2" d="${d}" transform="translate(.9 -.7)"/>`;
const fill = (d, pat, op = 1) => `<path d="${d}" fill="url(#${pat})"${op < 1 ? ` opacity="${op}"` : ''}/>`;
const paper = d => `<path class="paper" d="${d}"/>`;
const rectPath = (x, y, w, h, r = 12) => `M${x + r} ${y}H${x + w - r}Q${x + w} ${y} ${x + w} ${y + r}V${y + h - r}Q${x + w} ${y + h} ${x + w - r} ${y + h}H${x + r}Q${x} ${y + h} ${x} ${y + h - r}V${y + r}Q${x} ${y} ${x + r} ${y}Z`;
const hand = (x, y, t, cls = '', anchor = 'start', size = '') => `<text x="${x}" y="${y}" class="hand${cls ? ' ' + cls : ''}" text-anchor="${anchor}"${size ? ` font-size="${size}"` : ''}>${t}</text>`;
// Handwriting on a scrap of paper, so lines behind it never cut through the letters.
const label = (x, y, t, cls = '', size = 17, anchor = 'start') => {
  const w = t.length * size * 0.42 + 14, h = size + 6, lx = anchor === 'middle' ? x - w / 2 : x - 7;
  return `<g class="hand-label ${cls}"><rect x="${f1(lx)}" y="${f1(y - size + 1)}" width="${f1(w)}" height="${h}" rx="6" class="paper"/>${hand(x, y, t, cls, anchor, size)}</g>`;
};

// --- the cast, shared with the homepage sketch (feet at 0,0; head at 0,-92)
const BODY = {
  torso: 'M-18 -74 Q-25 -72 -25 -61 L-22 -33 L22 -33 L25 -61 Q25 -72 18 -74 Q0 -68 -18 -74 Z',
  legs: 'M-20 -33 L-17 -2 L-6 -2 L-2 -24 L2 -24 L6 -2 L17 -2 L20 -33 Z',
  rest: 'M-17 -2 L-24 1 L-5 1 M5 1 L24 1 L17 -2 M-3.5 -80 L-3.5 -74 M3.5 -80 L3.5 -74 M-7 -73 L0 -65 L7 -73 M-4.6 -94 l.6 .8 M4.4 -94 l.6 .8 M-4 -86.5 Q0 -83.5 4 -86.5'
};
const HAIR = {
  short: 'M-12.5 -93 C-14 -108 13 -110 12.5 -93 M-11 -101 Q-4 -106 4 -101 M-2 -104 Q5 -108 10 -100',
  long: 'M-12 -95 C-13 -110 13 -110 12 -95 M-12 -96 C-17 -85 -16 -75 -12 -68 M12 -96 C17 -85 16 -75 12 -68 M-9 -103 Q0 -108 9 -103',
  bun: 'M-12.5 -94 C-13 -108 13 -108 12.5 -94 M-4 -108 a5 5 0 1 0 8 0 a5 5 0 0 0 -8 0 M-9 -102 Q0 -106 9 -102',
  curly: 'M-13 -92 q-3 -6 2 -9 q-1 -6 5 -7 q3 -5 8 -2 q6 -2 7 4 q5 2 3 8 q2 4 -1 7',
  hat: 'M-15 -96 C-15 -113 15 -113 15 -96 Z M-19 -96 L19 -96 M0 -112 L0 -104',
  headset: 'M-13 -93 C-14 -109 13 -110 13 -93 M-15 -97 C-15 -115 15 -115 15 -97 M-17 -98 L-12 -98 L-12 -88 L-17 -88 Z M12 -98 L17 -98 L17 -88 L12 -88 Z M-15 -88 Q-15 -80 -6 -82'
};
const POSES = {
  phone: {arms: 'M-22 -70 Q-31 -55 -27 -38 M22 -70 Q31 -80 17 -91', prop: 'M10 -100 L19 -98 L16 -82 L7 -84 Z', hands: [[-27, -36], [15, -91]]},
  tablet: {arms: 'M-22 -70 Q-29 -56 -13 -52 M22 -70 Q29 -56 13 -52', prop: 'M-16 -62 L16 -62 L16 -42 L-16 -42 Z', hands: [[-13, -52], [13, -52]]},
  clipboard: {arms: 'M-22 -70 Q-33 -57 -27 -46 M22 -70 Q32 -62 27 -52', prop: 'M-38 -60 L-22 -60 L-22 -34 L-38 -34 Z', hands: [[-27, -46], [27, -52]]},
  laptop: {arms: 'M-22 -70 Q-27 -54 -17 -48 M22 -70 Q27 -54 17 -48', prop: 'M-20 -47 L-17 -47 L-13 -67 L15 -67 L19 -47 L20 -47 L20 -45 L-20 -45 Z', hands: [[-17, -48], [17, -48]]},
  wave: {arms: 'M-22 -70 Q-30 -56 -26 -40 M22 -70 Q35 -80 32 -98', prop: '', hands: [[-26, -38], [32, -100]]},
  toolbox: {arms: 'M22 -70 Q29 -52 27 -37 M-22 -70 Q-35 -58 -21 -50', prop: 'M16 -36 L42 -36 L42 -20 L16 -20 Z', hands: [[27, -37]]}
};
function figure(x, y, s, o, seed) {
  const pose = POSES[o.pose], head = wobble(0, -92, 12.5, seed);
  const hands = pose.hands.map(([hx, hy], k) => wobble(hx, hy, 3.2, seed + 7 * k + 3)).join(' ');
  const strokes = [BODY.rest, HAIR[o.hair], pose.arms].join(' ');
  return `<g class="person" transform="translate(${x} ${y}) scale(${s})">${paper(BODY.legs)}${paper(BODY.torso)}${paper(head)}${fill(BODY.torso, o.shirt, 0.85)}${fill(BODY.legs, 'h-ink', 0.35)}${ink(BODY.legs)}${ink(BODY.torso)}${ink(head)}${ink(strokes)}${paper(hands)}${ink(hands)}${pose.prop ? paper(pose.prop) + fill(pose.prop, o.shirt, 0.6) + ink(pose.prop) : ''}${o.glasses ? ink(wobble(-5, -93, 4.2, seed + 40) + ' ' + wobble(5, -93, 4.2, seed + 41) + ' M-1 -93 L1 -93') : ''}</g>`;
}

// Head-and-shoulders portraits of the same hand-drawn cast (used by the homepage hero).
// sketchDefs(P) holds the shared hatch patterns once per page; portrait() references them.
const hatchPattern = (id, color, op, gap = 5.5) => `<pattern id="${id}" patternUnits="userSpaceOnUse" width="${gap}" height="${gap}" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="${gap}" stroke="${color}" stroke-width="1.2" stroke-opacity="${op}"/></pattern>`;
export function sketchDefs(P) {
  return `<svg class="sketch-defs" width="0" height="0" aria-hidden="true" focusable="false"><defs>${hatchPattern(`${P}-h-blue`, C.blue, 0.6, 4)}${hatchPattern(`${P}-h-green`, C.green, 0.75, 4)}${hatchPattern(`${P}-h-peri`, C.peri, 0.8, 4)}${hatchPattern(`${P}-h-ink`, C.ink, 0.55, 4.5)}</defs></svg>`;
}
export function portrait(o, seed, P) {
  return `<svg class="anat anat-portrait" viewBox="-33 -121 66 66" aria-hidden="true" focusable="false"><rect x="-40" y="-130" width="80" height="90" class="portrait-bg"/>${figure(0, 0, 1, o, seed)}</svg>`.replace(/url\(#(h-[\w-]+)\)/g, `url(#${P}-$1)`);
}

const icons = {
  inbox: 'M3 13h5l2 3h4l2-3h5M5 5h14l2 8v6H3v-6l2-8Z',
  sheet: 'M4 4h16v16H4zM4 9h16M4 14h16M10 4v16',
  crm: 'M4 4h16l-6 7v7l-4 2v-9L4 4Z',
  board: 'M4 5h16v14H4zM9 5v14M15 5v14',
  accounts: 'M4 6h16v12H4zM4 10h16M8 15h3',
  phone: 'M7 3h4l1 5-2.5 1.5a11 11 0 0 0 5 5L16 12l5 1v4a2 2 0 0 1-2 2A16 16 0 0 1 5 5a2 2 0 0 1 2-2Z'
};

const depts = [
  {key: 'marketing', name: 'trade sales', who: 'Tom', role: 'enquiries & quotes', chip: '14 new enquiries', tone: 'h-peri', col: 0, row: 0, p: {hair: 'short', pose: 'phone', shirt: 'h-peri'}},
  {key: 'sales', name: 'technical', who: 'Nadia', role: 'specs & compliance', chip: '6 spec checks', tone: 'h-blue', col: 1, row: 0, p: {hair: 'long', pose: 'tablet', shirt: 'h-blue'}},
  {key: 'operations', name: 'warehouse', who: 'Raj', role: 'stock & picking', chip: '9 orders to pick', tone: 'h-green', col: 2, row: 0, p: {hair: 'bun', pose: 'clipboard', shirt: 'h-green'}},
  {key: 'service', name: 'customer care', who: 'Ola', role: 'calls & follow-ups', chip: '3 callbacks', tone: 'h-peri', col: 0, row: 1, p: {hair: 'headset', pose: 'wave', shirt: 'h-peri'}},
  {key: 'finance', name: 'accounts', who: 'Grace', role: 'invoices & credit', chip: '5 accounts due', tone: 'h-blue', col: 1, row: 1, p: {hair: 'curly', pose: 'laptop', shirt: 'h-blue', glasses: true}},
  {key: 'people', name: 'logistics', who: 'Sam', role: 'trucks & drivers', chip: '3 trucks out', tone: 'h-green', col: 2, row: 1, p: {hair: 'hat', pose: 'toolbox', shirt: 'h-green'}}
];
const CX = [45, 335, 625], CY = [262, 394], CW = 230, CH = 100;

// Hand-offs between departments. `gap` marks the illustrative breaks of chapter 6.
const threads = [
  {id: 't1', d: 'M275 312 C300 296 312 296 335 312', gap: 'spec lost', gx: 305, gy: 300},
  {id: 't2', d: 'M565 312 C590 296 602 296 625 312', gap: 're-typed', gx: 595, gy: 300},
  {id: 't3', d: 'M740 394 C746 382 746 372 740 362', gap: ''},
  {id: 't4', d: 'M652 362 C640 386 572 376 548 394', gap: 'not invoiced', gx: 600, gy: 378},
  {id: 't5', d: 'M335 444 C312 460 300 460 275 444', gap: ''},
  {id: 't6', d: 'M242 394 C262 370 340 386 362 362', gap: 'asks again', gx: 300, gy: 378}
];

function chamber(d, index) {
  const x = CX[d.col], y = CY[d.row], seed = 50 + index * 13;
  const tabW = d.name.length * 8.7 + 24;
  return `<g class="chamber ch-${d.key}" data-dept="${d.key}" style="--ci:${index}">
    <path class="paper" d="${rectPath(x, y, CW, CH, 16)}"/>${ink(box(x, y, CW, CH, seed, 16))}
    <path d="${rectPath(x + 12, y - 11, tabW, 21, 10)}" class="paper"/>${fill(rectPath(x + 12, y - 11, tabW, 21, 10), d.tone, 0.75)}${ink(box(x + 12, y - 11, tabW, 21, seed + 5, 10))}
    ${hand(x + 23, y + 5, d.name, 'tab', 'start', 18.5)}
    ${figure(x + 48, y + 93, 0.66, d.p, seed + 9)}
    ${hand(x + 98, y + 40, d.who, 'name', 'start', 21)}
    ${hand(x + 98, y + 62, d.role, 'role', 'start', 18)}
    <g class="anat-chip">${hand(x + 98, y + 85, d.chip, 'chip', 'start', 16.5)}<path class="chip-line" d="M${x + 97} ${y + 90} q${d.chip.length * 3.3} 3 ${d.chip.length * 7} -1"/></g>
  </g>`;
}
function cloud(x, y, s, seed, cls) {
  const d = `M${x} ${y + 22 * s}a${14 * s} ${14 * s} 0 0 1 ${14 * s} ${-14 * s} ${18 * s} ${18 * s} 0 0 1 ${33 * s} ${-4 * s} ${13 * s} ${13 * s} 0 0 1 ${22 * s} ${9 * s} ${11 * s} ${11 * s} 0 0 1 ${2 * s} ${22 * s}H${x + 5 * s}A${12 * s} ${12 * s} 0 0 1 ${x} ${y + 22 * s}Z`;
  return `<g class="cloud ${cls}">${paper(d)}${ink(d, ' soft')}</g>`;
}

export function anatomyArt({mode = 'story', prefix = 'an'} = {}) {
  const P = prefix;
  const pins = [[64, 'spec sheet'], [182, 'tech advice'], [300, 'quote'], [430, 'site delivery'], [540, 'invoice'], [826, 'reorders']];
  const tools = [['inbox', 'inbox'], ['sheet', 'spreadsheet'], ['crm', 'CRM'], ['board', 'stock list'], ['accounts', 'accounts'], ['phone', 'phone line']];
  const isHome = mode === 'home';
  const hatch = (id, color, op, gap = 5.5) => `<pattern id="${id}" patternUnits="userSpaceOnUse" width="${gap}" height="${gap}" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="${gap}" stroke="${color}" stroke-width="1.2" stroke-opacity="${op}"/></pattern>`;
  // Pattern ids are global in a page, so prefix them per illustration.
  const ids = s => s.replace(/url\(#(h-[\w-]+|grid)\)/g, `url(#${P}-$1)`);
  const showroomRoof = rectPath(58, 78, 254, 26, 6);
  const awning = `M76 104h218v9${Array.from({length: 11}, () => ' a10 6 0 0 1 -19.8 0').join('')}Z`;
  const van = 'M372 160h62l18 16v20h-80Z';
  const roof = 'M604 126 685 70l81 56Z', roof2 = 'M788 150 832 118l44 32Z';
  const ground = 'M0 200 Q40 194 80 200 T160 200 T240 200 T320 200 T400 200 T480 200 T560 200 T640 200 T720 200 T800 200 T880 200 T960 200';
  const art = `<svg class="anat anat-${mode}" viewBox="0 0 900 640"${isHome ? ' preserveAspectRatio="xMidYMid slice"' : ''} role="img" aria-label="A hand-drawn cross-section of a building supplies business: the customer, trade counter, delivery truck and building site above the surface, six teams connected by hand-offs below it, and the tools underneath.">
  <defs>
    <pattern id="${P}-grid" patternUnits="userSpaceOnUse" width="26" height="26"><path d="M26 0H0V26" fill="none" stroke="#e9ecf8" stroke-width="1"/></pattern>
    ${hatch(`${P}-h-blue`, C.blue, 0.6)}${hatch(`${P}-h-green`, C.green, 0.75)}${hatch(`${P}-h-peri`, C.peri, 0.8)}${hatch(`${P}-h-ink`, C.ink, 0.55, 6)}${hatch(`${P}-h-navy`, C.navy, 0.75, 4.5)}${hatch(`${P}-h-soft`, C.blue, 0.16, 7)}${hatch(`${P}-h-coral`, C.coral, 0.7, 5)}
    ${threads.map(t => `<path id="${P}-${t.id}" d="${t.d}"/>`).join('')}
  </defs>
  <g class="anat-scene">
    <rect width="900" height="640" fill="#fcfcff"/><rect width="900" height="640" fill="url(#grid)"/>
    ${label(22, 32, 'above the surface: what the customer sees', 'layer', 20)}
    <g class="anat-sun">${paper(wobble(836, 58, 20, 3))}${fill(wobble(836, 58, 20, 3), 'h-green', 0.8)}${ink(wobble(836, 58, 20, 3), ' soft')}</g>
    ${cloud(470, 30, 1, 4, 'c1')}${cloud(690, 72, 0.75, 5, 'c2')}${cloud(372, 50, 0.6, 6, 'c3')}
    <g class="showroom">
      ${paper(rectPath(70, 98, 230, 104, 4))}${ink(box(70, 98, 230, 104, 11, 4))}
      ${paper(showroomRoof)}${fill(showroomRoof, 'h-blue')}${ink(box(58, 78, 254, 26, 12, 6))}
      <rect x="95" y="82" width="180" height="19" rx="5" class="paper"/>${hand(185, 97, 'Corbel Building Supply', 'sign', 'middle', 17.5)}
      ${paper(awning)}${fill(awning, 'h-green')}${ink(awning)}
      ${ink(box(88, 126, 124, 62, 13, 3))}${ink(box(98, 134, 28, 18, 14, 2))}${ink(box(132, 134, 28, 18, 15, 2))}${ink(box(166, 134, 36, 18, 16, 2))}
      ${fill('M96 166h108v6H96Z', 'h-green')}${ink('M96 166h108M100 172v13h100v-13')}
      ${paper(rectPath(226, 128, 54, 74, 3))}${fill(rectPath(226, 128, 54, 74, 3), 'h-navy')}${ink(box(226, 128, 54, 74, 17, 3))}${ink(wobble(270, 168, 2.6, 18))}
    </g>
    <g class="van">${paper(van)}${fill(van, 'h-blue')}${ink(van)}${ink('M436 164h8l12 12h-20Z')}${hand(394, 186, 'CBS', 'sign', 'middle', 15)}${paper(wobble(388, 198, 7, 19))}${fill(wobble(388, 198, 7, 19), 'h-ink')}${ink(wobble(388, 198, 7, 19))}${paper(wobble(436, 198, 7, 20))}${fill(wobble(436, 198, 7, 20), 'h-ink')}${ink(wobble(436, 198, 7, 20))}</g>
    <g class="house">${ink('M612 202V112M758 202V112M612 112H758M612 150H758M612 182H758M612 150 L640 182M758 150 L730 182', ' soft')}${paper(roof)}${fill(roof, 'h-blue')}${ink(roof)}${paper(rectPath(620, 124, 130, 78, 2))}${ink(box(620, 124, 130, 78, 21, 2))}${ink(box(636, 140, 30, 24, 22, 2))}${ink('M651 140v24M636 152h30')}${ink(box(704, 140, 30, 24, 23, 2))}${ink('M719 140v24M704 152h30')}${paper(rectPath(672, 160, 26, 42, 2))}${fill(rectPath(672, 160, 26, 42, 2), 'h-green')}${ink(box(672, 160, 26, 42, 24, 2))}</g>
    <g class="house small">${paper(roof2)}${fill(roof2, 'h-green')}${ink(roof2)}${paper(rectPath(798, 148, 68, 54, 2))}${ink(box(798, 148, 68, 54, 25, 2))}${paper(rectPath(822, 172, 18, 30, 2))}${fill(rectPath(822, 172, 18, 30, 2), 'h-blue')}${ink(box(822, 172, 18, 30, 26, 2))}</g>
    <g class="leah">${figure(578, 199, 0.98, {hair: 'long', pose: 'wave', shirt: 'h-green'}, 31)}</g>
    <g class="leah-bubble">${paper('M460 44h140a10 10 0 0 1 10 10v20a10 10 0 0 1-10 10h-34l-8 12-3-12h-95a10 10 0 0 1-10-10v-20a10 10 0 0 1 10-10Z')}${ink('M460 44h140a10 10 0 0 1 10 10v20a10 10 0 0 1-10 10h-34l-8 12-3-12h-95a10 10 0 0 1-10-10v-20a10 10 0 0 1 10-10Z')}${hand(530, 71, 'On site by Friday?', 'bubble', 'middle', 21)}</g>
    <path class="journey-line" d="M40 186H880"/>
    <g class="journey">${pins.map(([x, t], i) => `<g class="pin pin-${i + 1}" style="--i:${i}">${paper(wobble(x, 186, 11, 60 + i))}${ink(wobble(x, 186, 11, 60 + i))}${hand(x, 192, String(i + 1), 'pin-n', 'middle', 17)}<g class="pin-label">${label(x, 164, t, '', 17, 'middle')}</g></g>`).join('')}</g>
    <circle class="journey-dot" r="5"><animateMotion dur="7s" repeatCount="indefinite" path="M40 186H880"/></circle>
    <path d="${ground}V216H0Z" fill="url(#h-green)"/>${ink(ground)}
    <path class="layer-line" d="M0 216H900"/>
    ${label(22, 240, 'under the surface: the people and the hand-offs', 'layer', 20)}
    <g class="chambers">${depts.map((d, i) => chamber(d, i)).join('')}</g>
    <g class="threads">${threads.map(t => `<g class="thread th-${t.id}${t.gap ? ' has-gap' : ''}"><path class="thread-line" d="${t.d}"/>${t.gap ? `<g class="gap-mark" transform="translate(${t.gx} ${t.gy})"><g class="gap-in">${paper(wobble(0, 0, 10, 70 + t.gx))}${ink(wobble(0, 0, 10, 70 + t.gx), ' red')}${ink('M-4 -4 4 4M4 -4-4 4', ' red')}${label(0, -16, t.gap, 'warn', 17, 'middle')}</g></g>` : ''}<circle class="pulse" r="4.5"><animateMotion dur="${2.2 + (t.id.charCodeAt(1) % 3) * .4}s" repeatCount="indefinite"><mpath href="#${P}-${t.id}"/></animateMotion></circle></g>`).join('')}</g>
    <g class="closer">
      <g class="closer-papers">${paper(rectPath(500, 246, 34, 26, 3))}${ink(box(500, 246, 34, 26, 80, 3))}${paper(rectPath(506, 250, 34, 26, 3))}${ink(box(506, 250, 34, 26, 81, 3))}${ink('M512 258h20M512 264h14M512 270h18')}</g>
      ${label(520, 238, 'specs · quantities · site', 'note', 17, 'middle')}
      <g class="closer-mail">${paper(rectPath(583, 276, 26, 18, 2))}${ink(box(583, 276, 26, 18, 82, 2), ' red')}${ink('M584 277l12 9 12-9', ' red')}${label(595, 268, 'waiting…', 'warn', 17, 'middle')}</g>
      <g class="closer-retype">${paper('M700 196h104a8 8 0 0 1 8 8v14a8 8 0 0 1-8 8h-84l-8 9-2-9h-10a8 8 0 0 1-8-8v-14a8 8 0 0 1 8-8Z')}${ink('M700 196h104a8 8 0 0 1 8 8v14a8 8 0 0 1-8 8h-84l-8 9-2-9h-10a8 8 0 0 1-8-8v-14a8 8 0 0 1 8-8Z', ' red')}${hand(752, 216, 're-typing it all…', 'warn', 'middle', 17.5)}</g>
      <g class="fix-pack">${paper(rectPath(-15, -11, 30, 22, 4))}${fill(rectPath(-15, -11, 30, 22, 4), 'h-green')}${ink(box(-15, -11, 30, 22, 83, 4))}${ink('M-8 0l5 5 10-10')}<animateMotion dur="2.4s" repeatCount="indefinite"><mpath href="#${P}-t2"/></animateMotion></g>
      <g class="fix-note">${paper('M652 194h148a8 8 0 0 1 8 8v16a8 8 0 0 1-8 8h-92l-8 9-2-9h-46a8 8 0 0 1-8-8v-16a8 8 0 0 1 8-8Z')}${fill('M652 194h148a8 8 0 0 1 8 8v16a8 8 0 0 1-8 8h-92l-8 9-2-9h-46a8 8 0 0 1-8-8v-16a8 8 0 0 1 8-8Z', 'h-green', 0.55)}${ink('M652 194h148a8 8 0 0 1 8 8v16a8 8 0 0 1-8 8h-92l-8 9-2-9h-46a8 8 0 0 1-8-8v-16a8 8 0 0 1 8-8Z')}${hand(726, 215, 'order ready, nothing re-typed', 'ok', 'middle', 16.5)}</g>
    </g>
    <g class="cover cover-people"><rect y="217" width="900" height="287" class="paper"/><rect y="217" width="900" height="287" fill="url(#h-soft)"/>${hand(450, 356, 'what happens under here?', 'cover-text', 'middle', 30)}${ink('M432 374q9 9 18 14 9-5 18-14')}</g>
    <path class="layer-line" d="M0 504H900"/>
    <rect y="505" width="900" height="135" fill="url(#h-soft)"/>
    <g class="tools">${tools.map(([k, t], i) => {const x = 22 + i * 144, cy = 580; return `<g class="tool tool-${k}" style="--i:${i}"><path class="tool-plug" d="M${x + 66} 552V508"/>${paper(rectPath(x, 552, 132, 56, 12))}${ink(box(x, 552, 132, 56, 90 + i, 12))}<g transform="translate(${x + 12} ${cy - 11}) scale(.92)">${ink(icons[k])}</g>${hand(x + 40, cy, t, 'tool-name', 'start', 19)}</g>`;}).join('')}</g>
    ${label(22, 531, 'the technology underneath', 'layer', 20)}
    <g class="cover cover-tech"><rect y="506" width="900" height="134" class="paper"/><rect y="506" width="900" height="134" fill="url(#h-navy)" opacity=".35"/>${label(450, 582, '…and under here?', 'cover-text', 26, 'middle')}</g>
    <g class="dashboard">
      ${paper(rectPath(230, 128, 440, 300, 20))}${ink(box(230, 128, 440, 300, 95, 20))}
      ${fill('M232 150a20 20 0 0 1 20-20h396a20 20 0 0 1 20 20v26H232Z', 'h-blue', 0.8)}${ink('M231 177H669')}
      ${label(252, 160, 'Monday 8:00 · Corbel', 'dash-title', 22)}${hand(646, 160, 'illustrative', 'dash-tag', 'end', 14)}
      ${[['enquiries', '14', 'every source known'], ['orders to deliver', '9', 'all packs complete'], ['site extras to invoice', '0', 'nothing waiting'], ['callbacks today', '3', 'history attached']].map(([a, n, b], i) => {const x = 254 + (i % 2) * 206, y = 194 + Math.floor(i / 2) * 96; return `<g class="dash-tile">${paper(rectPath(x, y, 190, 82, 12))}${fill(rectPath(x, y, 190, 82, 12), i % 2 ? 'h-green' : 'h-peri', 0.25)}${ink(box(x, y, 190, 82, 96 + i, 12))}${hand(x + 14, y + 25, a, 'dash-k', 'start', 18)}${hand(x + 14, y + 62, n, 'dash-n', 'start', 38)}${hand(x + 54, y + 60, b, 'dash-b', 'start', 16)}</g>`;}).join('')}
      <g class="dash-bars">${[30, 46, 38, 58, 50, 72, 64].map((h, i) => ink(`M${266 + i * 12} 418v${-f1(h * .22)}`)).join('')}</g>
    </g>
  </g>
</svg>`;
  return ids(art);
}
