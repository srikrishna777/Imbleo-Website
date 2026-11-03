// Business Anatomy: a 2D scroll story and its illustration.
// The story follows one customer through an illustrative business. It replaces the
// earlier interactive export with the same idea (one customer, every team, process and
// system behind her experience) told as a scroll-driven 2D story.
// anatomyArt() returns an SVG string used on /business-anatomy/ (mode 'story')
// and on the homepage feature (mode 'home').

export const story = {
  business: 'Brightwater Kitchens',
  where: 'An illustrative kitchen renovation business',
  customer: 'Leah',
  chapters: [
    {kicker: 'Above the surface', title: 'Leah sees one business.', body: 'She saw an ad, visited a showroom, signed a quote and got a new kitchen. Most customers only ever see the outside of your business.'},
    {kicker: 'The customer journey', title: 'Six moments. One story.', body: 'An ad. A showroom chat. A signed quote. Install day. An invoice. A friend she refers. Follow Leah from her first click to the neighbour she sends your way.'},
    {kicker: 'Peel back the first layer', title: 'One kitchen. Six teams making it happen.', body: 'Tom in marketing, Nadia in sales, Raj in operations, Sam rostering the crews, Grace in finance and Ola in customer care. Leah never meets most of them.'},
    {kicker: 'The handovers', title: 'The work is only as good as the handover.', body: 'Follow the joins between teams, not just the tasks inside them. A dashed line is a person carrying context by email, phone or memory.'},
    {kicker: 'The layer underneath', title: 'The technology sits underneath the work.', body: 'An inbox, a spreadsheet, a CRM nobody fully trusts, a job board, the accounting system and a phone line. Each one useful. None of them talking.'},
    {kicker: 'Where the thread breaks', title: 'The gaps are where the business does work twice.', body: 'Waiting. Chasing. Re-typing. Relying on somebody’s memory. These scenarios are illustrative, but most teams recognise at least one.', list: ['The ad source is lost in the inbox', 'Measurements are re-typed for the job', 'The variation never reaches the invoice', 'Leah explains her kitchen again']},
    {kicker: 'Look closer · Sales → Operations', title: 'A signed quote should not wait for a conversation.', body: 'Nadia has the measurements, the photos and the agreed design. Raj still has to rebuild them from emails before he can book Ben’s crew.'},
    {kicker: 'Fix one handover', title: 'The signature creates the job.', body: 'When Leah signs, the job is created with the measurements, photos and design attached, and Raj is notified. Same people. Less carrying.'},
    {kicker: 'Back to the business', title: 'The same business. Fewer gaps to carry.', body: 'Close the loudest gap first, then improve each handover one at a time. Ownership stays clear the whole way.'},
    {kicker: 'Monday, 8:00am', title: 'One screen. Nobody had to prepare it.', body: 'Better visibility comes from recording the work properly in the first place. The numbers arrive because people simply did their jobs.'}
  ],
  end: {
    kicker: 'The end of the thread',
    title: 'The apps aren’t the point. The thread is.',
    body: 'Pick one customer you delivered for last month. Can you follow the whole thread, from first enquiry to the friend they referred, without opening another system or ringing a colleague?'
  }
};

const C = {blue: '#1e2c9b', navy: '#0b1046', green: '#47b824', greenDeep: '#2f8a12', peri: '#8f97ea', mint: '#bfeaa9', tint: '#f4f6ff', soil: '#eef0fb', line: '#d5daf3', coral: '#f0643c', white: '#fff', ink: '#11163f'};
const skins = ['#f2c9a5', '#c98d64', '#8d5a3b', '#f5d4bb', '#a8714c', '#e3b18c', '#6f432a'];
const hairs = ['#1d1b2e', '#5a3825', '#2b2b3a', '#b9773d', '#3a2418', '#1d1b2e', '#7a4b2a'];

// A flat 2D person, centred on x, standing on y (feet) when full=true, else a bust whose shoulders sit on y.
function person(x, y, s, o = {}) {
  const skin = skins[o.skin ?? 0], hair = hairs[o.skin ?? 0], shirt = o.shirt || C.blue;
  const hy = o.full ? y - 62 * s : y - 30 * s;
  const head = `<circle cx="${x}" cy="${hy}" r="${8.5 * s}" fill="${skin}"/>`;
  let hairShape = '';
  const r = 8.5 * s;
  if (o.hair === 'long') hairShape = `<path d="M${x - r - 1} ${hy + r * 1.3} Q${x - r - 3} ${hy - r * 1.3} ${x} ${hy - r - 1.5} Q${x + r + 3} ${hy - r * 1.3} ${x + r + 1} ${hy + r * 1.3} L${x + r - 2} ${hy} Q${x} ${hy - r * 0.5} ${x - r + 2} ${hy} Z" fill="${hair}"/>`;
  else if (o.hair === 'bun') hairShape = `<circle cx="${x}" cy="${hy - r - 2.5 * s}" r="${3.6 * s}" fill="${hair}"/><path d="M${x - r} ${hy - 1} Q${x} ${hy - r * 2} ${x + r} ${hy - 1} Q${x} ${hy - r * 0.6} ${x - r} ${hy - 1} Z" fill="${hair}"/>`;
  else if (o.hair === 'hat') hairShape = `<path d="M${x - r - 2} ${hy - 2} Q${x} ${hy - r * 2.2} ${x + r + 2} ${hy - 2} Z" fill="${C.green}"/><rect x="${x - r - 4}" y="${hy - 3}" width="${2 * r + 8}" height="${2.6 * s}" rx="1.3" fill="${C.greenDeep}"/>`;
  else if (o.hair === 'curly') hairShape = `<g fill="${hair}"><circle cx="${x - r * 0.6}" cy="${hy - r * 0.7}" r="${r * 0.55}"/><circle cx="${x}" cy="${hy - r * 0.95}" r="${r * 0.6}"/><circle cx="${x + r * 0.6}" cy="${hy - r * 0.7}" r="${r * 0.55}"/><circle cx="${x - r * 0.95}" cy="${hy - r * 0.1}" r="${r * 0.4}"/><circle cx="${x + r * 0.95}" cy="${hy - r * 0.1}" r="${r * 0.4}"/></g>`;
  else hairShape = `<path d="M${x - r - 0.5} ${hy + 1} Q${x - r} ${hy - r * 1.35} ${x + 1} ${hy - r - 1} Q${x + r + 1.5} ${hy - r} ${x + r + 0.5} ${hy + 1} Q${x + 2} ${hy - r * 0.55} ${x - r - 0.5} ${hy + 1} Z" fill="${hair}"/>`;
  const sy = hy + r + 2 * s;
  const torso = `<path d="M${x - 15 * s} ${sy + 24 * s} Q${x - 15.5 * s} ${sy + 3 * s} ${x} ${sy + 1 * s} Q${x + 15.5 * s} ${sy + 3 * s} ${x + 15 * s} ${sy + 24 * s} Z" fill="${shirt}"/><rect x="${x - 3 * s}" y="${hy + r - 2}" width="${6 * s}" height="${4 * s}" fill="${skin}"/>`;
  const legs = o.full ? `<rect x="${x - 10 * s}" y="${sy + 23 * s}" width="${8.5 * s}" height="${y - (sy + 23 * s)}" rx="${2 * s}" fill="${C.navy}"/><rect x="${x + 1.5 * s}" y="${sy + 23 * s}" width="${8.5 * s}" height="${y - (sy + 23 * s)}" rx="${2 * s}" fill="${C.navy}"/><rect x="${x - 12 * s}" y="${y - 3 * s}" width="${11 * s}" height="${3.5 * s}" rx="${1.5 * s}" fill="${C.ink}"/><rect x="${x + 1 * s}" y="${y - 3 * s}" width="${11 * s}" height="${3.5 * s}" rx="${1.5 * s}" fill="${C.ink}"/>` : '';
  const face = `<circle cx="${x - 3 * s}" cy="${hy + 0.5}" r="${0.9 * s}" fill="${C.ink}"/><circle cx="${x + 3 * s}" cy="${hy + 0.5}" r="${0.9 * s}" fill="${C.ink}"/><path d="M${x - 2.6 * s} ${hy + 3.6 * s} Q${x} ${hy + 5.4 * s} ${x + 2.6 * s} ${hy + 3.6 * s}" stroke="${C.ink}" stroke-width="${0.8 * s}" fill="none" stroke-linecap="round"/>`;
  return `<g class="person">${legs}${torso}${head}${hairShape}${face}</g>`;
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
  {key: 'marketing', name: 'Marketing', who: 'Tom', role: 'Campaigns & enquiries', chip: '14 new enquiries', color: C.peri, col: 0, row: 0, p: {skin: 0, hair: 'short', shirt: C.peri}},
  {key: 'sales', name: 'Sales', who: 'Nadia', role: 'Design & quotes', chip: '6 quotes out', color: C.blue, col: 1, row: 0, p: {skin: 2, hair: 'long', shirt: C.blue}},
  {key: 'operations', name: 'Operations', who: 'Raj', role: 'Jobs & scheduling', chip: '9 jobs this week', color: C.green, col: 2, row: 0, p: {skin: 4, hair: 'short', shirt: C.greenDeep}},
  {key: 'service', name: 'Customer care', who: 'Ola', role: 'Calls & follow-ups', chip: '3 callbacks', color: C.peri, col: 0, row: 1, p: {skin: 6, hair: 'curly', shirt: '#6a74e0'}},
  {key: 'finance', name: 'Finance', who: 'Grace', role: 'Invoices & margin', chip: '5 invoices due', color: C.navy, col: 1, row: 1, p: {skin: 3, hair: 'bun', shirt: C.navy}},
  {key: 'people', name: 'People', who: 'Sam', role: 'Crews & rosters', chip: '3 crews ready', color: C.greenDeep, col: 2, row: 1, p: {skin: 1, hair: 'hat', shirt: '#2f8a12'}}
];
const CX = [45, 335, 625], CY = [246, 380], CW = 230, CH = 100;

// Hand-offs between departments. `gap` marks the illustrative breaks of chapter 6.
const threads = [
  {id: 't1', d: 'M275 296 C300 280 312 280 335 296', gap: 'source lost', gx: 305, gy: 284},
  {id: 't2', d: 'M565 296 C590 280 602 280 625 296', gap: 're-typed', gx: 595, gy: 284},
  {id: 't3', d: 'M740 380 C746 368 746 358 740 346', gap: ''},
  {id: 't4', d: 'M652 346 C640 372 572 360 548 380', gap: 'not invoiced', gx: 600, gy: 362},
  {id: 't5', d: 'M335 430 C312 446 300 446 275 430', gap: ''},
  {id: 't6', d: 'M242 380 C262 356 340 372 362 346', gap: 'asks again', gx: 300, gy: 362}
];

function chamber(d, index) {
  const x = CX[d.col], y = CY[d.row];
  return `<g class="chamber ch-${d.key}" data-dept="${d.key}" style="--ci:${index}">
    <rect x="${x}" y="${y}" width="${CW}" height="${CH}" rx="18" fill="#fff" stroke="${C.line}" stroke-width="1.5"/>
    <rect x="${x + 14}" y="${y - 9}" width="${d.name.length * 7 + 22}" height="19" rx="9.5" fill="${d.color}"/>
    <text x="${x + 25}" y="${y + 4.5}" class="anat-tab">${d.name}</text>
    ${person(x + 46, y + 74, 1.25, d.p)}
    <rect x="${x + 14}" y="${y + 74}" width="66" height="7" rx="3" fill="${C.line}"/>
    <path d="M${x + 33} ${y + 74} l3 -13 h22 l3 13 Z" fill="${C.navy}" opacity=".92"/>
    <text x="${x + 96}" y="${y + 42}" class="anat-name">${d.who}</text>
    <text x="${x + 96}" y="${y + 59}" class="anat-role">${d.role}</text>
    <g class="anat-chip"><rect x="${x + 94}" y="${y + 67}" width="${d.chip.length * 5.6 + 16}" height="18" rx="9" fill="${C.tint}"/><text x="${x + 102}" y="${y + 79.5}">${d.chip}</text></g>
  </g>`;
}

function cloud(x, y, s, cls) {
  return `<g class="cloud ${cls}"><g transform="translate(${x} ${y}) scale(${s})"><path d="M0 22a14 14 0 0 1 14-14 18 18 0 0 1 33-4 13 13 0 0 1 22 9 11 11 0 0 1 2 22H5A12 12 0 0 1 0 22Z" fill="#fff"/></g></g>`;
}

export function anatomyArt({mode = 'story', prefix = 'an'} = {}) {
  const P = prefix;
  const pins = [[64, 'Sees an ad'], [182, 'Showroom'], [300, 'Signs quote'], [430, 'Install day'], [540, 'Invoice'], [826, 'Refers a friend']];
  const tools = [['inbox', 'Inbox'], ['sheet', 'Spreadsheet'], ['crm', 'CRM'], ['board', 'Job board'], ['accounts', 'Accounts'], ['phone', 'Phone line']];
  const isHome = mode === 'home';
  return `<svg class="anat anat-${mode}" viewBox="0 0 900 640"${isHome ? ' preserveAspectRatio="xMidYMid slice"' : ''} role="img" aria-label="An illustrated cross-section of a business: the customer and showroom above the surface, six teams connected by hand-offs below it, and the tools underneath.">
  <defs>
    <pattern id="${P}-dots" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.1" fill="#cdd3f0"/></pattern>
    <pattern id="${P}-dots-dark" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.1" fill="#232b78"/></pattern>
    ${threads.map(t => `<path id="${P}-${t.id}" d="${t.d}"/>`).join('')}
  </defs>
  <g class="anat-scene">
    <rect width="900" height="214" fill="${C.tint}"/><text x="22" y="30" class="anat-layer">ABOVE THE SURFACE · WHAT THE CUSTOMER SEES</text>
    <circle class="anat-sun" cx="836" cy="58" r="20" fill="#d6f2c9"/>
    ${cloud(470, 30, 1, 'c1')}${cloud(690, 70, .75, 'c2')}${cloud(372, 52, .62, 'c3')}
    <g class="showroom">
      <rect x="70" y="98" width="230" height="104" rx="4" fill="#fff" stroke="${C.blue}" stroke-width="2"/>
      <rect x="60" y="80" width="250" height="24" rx="5" fill="${C.blue}"/>
      <text x="185" y="96" class="anat-sign" text-anchor="middle">BRIGHTWATER KITCHENS</text>
      <path d="M76 104h218v9${Array.from({length: 11}, (_, i) => ` a10 6 0 0 1 -19.8 0`).join('')}Z" fill="${C.green}"/>
      <rect x="88" y="126" width="124" height="62" rx="3" fill="#eef1ff" stroke="#c9cff0"/>
      <g fill="#fff" stroke="#b9c1ec"><rect x="98" y="134" width="28" height="18" rx="2"/><rect x="132" y="134" width="28" height="18" rx="2"/><rect x="166" y="134" width="36" height="18" rx="2"/></g>
      <rect x="96" y="166" width="108" height="5" rx="2" fill="${C.green}"/><rect x="100" y="171" width="100" height="14" fill="#fff" stroke="#b9c1ec"/>
      <rect x="226" y="128" width="54" height="74" rx="3" fill="${C.navy}"/><circle cx="270" cy="168" r="2.5" fill="${C.green}"/>
    </g>
    <g class="van"><path d="M372 160h62l18 16v20h-80Z" fill="${C.blue}"/><path d="M436 164h8l12 12h-20Z" fill="#cfd6ff"/><text x="400" y="185" class="anat-van" text-anchor="middle">BW</text><circle cx="388" cy="198" r="7" fill="${C.ink}"/><circle cx="388" cy="198" r="2.6" fill="#c5cbf0"/><circle cx="436" cy="198" r="7" fill="${C.ink}"/><circle cx="436" cy="198" r="2.6" fill="#c5cbf0"/></g>
    <g class="house"><path d="M606 126 685 72l79 54Z" fill="${C.blue}"/><rect x="620" y="124" width="130" height="78" fill="#fff" stroke="${C.blue}" stroke-width="2"/><rect x="636" y="140" width="30" height="24" rx="2" fill="#eef1ff" stroke="#c9cff0"/><rect x="704" y="140" width="30" height="24" rx="2" fill="#eef1ff" stroke="#c9cff0"/><rect x="672" y="160" width="26" height="42" rx="2" fill="${C.green}"/></g>
    <g class="house small"><path d="M790 150 832 120l42 30Z" fill="${C.green}"/><rect x="798" y="148" width="68" height="54" fill="#fff" stroke="${C.greenDeep}" stroke-width="1.5"/><rect x="822" y="172" width="18" height="30" fill="${C.blue}"/></g>
    <g class="leah">${person(580, 202, 1.55, {full: true, skin: 5, hair: 'long', shirt: C.green})}</g>
    <g class="leah-bubble"><g transform="translate(-36 -46)"><path d="M496 92h120a10 10 0 0 1 10 10v22a10 10 0 0 1-10 10h-26l-8 10-3-10h-83a10 10 0 0 1-10-10v-22a10 10 0 0 1 10-10Z" fill="#fff" stroke="${C.line}"/><text x="556" y="117" text-anchor="middle" class="anat-bubble">I just want a new kitchen.</text></g></g>
    <path class="journey-line" d="M40 186H880" stroke="${C.blue}" stroke-width="1.6" stroke-dasharray="2 7" stroke-linecap="round"/>
    <g class="journey">${pins.map(([x, t], i) => `<g class="pin pin-${i + 1}" style="--i:${i}"><circle cx="${x}" cy="186" r="11" /><text x="${x}" y="190" text-anchor="middle">${i + 1}</text><g class="pin-label"><rect x="${x - t.length * 2.9 - 7}" y="150" width="${t.length * 5.8 + 14}" height="17" rx="8.5"/><text x="${x}" y="162" text-anchor="middle">${t}</text></g></g>`).join('')}</g>
    <circle class="journey-dot" r="5" fill="${C.green}"><animateMotion dur="7s" repeatCount="indefinite" path="M40 186H880"/></circle>
    <path d="M0 200 Q40 194 80 200 T160 200 T240 200 T320 200 T400 200 T480 200 T560 200 T640 200 T720 200 T800 200 T880 200 T960 200 V216 H0Z" fill="${C.green}"/>
    
    <rect y="214" width="900" height="290" fill="${C.soil}"/>
    <text x="22" y="230" class="anat-layer under">UNDER THE SURFACE · THE PEOPLE AND THE HAND-OFFS</text>
    <g class="threads">${threads.map(t => `<g class="thread th-${t.id}${t.gap ? ' has-gap' : ''}"><path class="thread-line" d="${t.d}"/>${t.gap ? `<g class="gap-mark" transform="translate(${t.gx} ${t.gy})"><g class="gap-in"><circle r="10"/><path d="M-4 -4 4 4M4 -4-4 4"/><text y="-15" text-anchor="middle">${t.gap}</text></g></g>` : ''}<circle class="pulse" r="4.5"><animateMotion dur="${2.2 + (t.id.charCodeAt(1) % 3) * .4}s" repeatCount="indefinite"><mpath href="#${P}-${t.id}"/></animateMotion></circle></g>`).join('')}</g>
    <g class="chambers">${depts.map((d, i) => chamber(d, i)).join('')}</g>
    <g class="closer">
      <g class="closer-papers" transform="translate(500 236)"><rect x="0" y="0" width="34" height="26" rx="3" fill="#fff" stroke="${C.blue}" transform="rotate(-8)"/><rect x="5" y="3" width="34" height="26" rx="3" fill="#fff" stroke="${C.blue}"/><path d="M11 11h20M11 17h14M11 23h18" stroke="${C.peri}" stroke-width="2"/></g>
      <text x="520" y="230" class="anat-note" text-anchor="middle">photos · measurements · design</text>
      <g class="closer-mail"><rect x="583" y="262" width="26" height="18" rx="2" fill="#fff" stroke="${C.coral}" stroke-width="1.6"/><path d="M584 263l12 9 12-9" fill="none" stroke="${C.coral}" stroke-width="1.6"/><text x="596" y="256" class="anat-note warn" text-anchor="middle">waiting for a call…</text></g>
      <g class="closer-retype"><path d="M700 196h104a8 8 0 0 1 8 8v14a8 8 0 0 1-8 8h-84l-8 9-2-9h-10a8 8 0 0 1-8-8v-14a8 8 0 0 1 8-8Z" fill="#fff" stroke="${C.coral}"/><text x="752" y="215" class="anat-note warn" text-anchor="middle">re-typing it all…</text></g>
      <g class="fix-pack"><rect x="-15" y="-11" width="30" height="22" rx="4" fill="${C.green}"/><path d="M-8 0l5 5 10-10" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><animateMotion dur="2.4s" repeatCount="indefinite"><mpath href="#${P}-t2"/></animateMotion></g>
      <g class="fix-note"><path d="M652 194h148a8 8 0 0 1 8 8v16a8 8 0 0 1-8 8h-92l-8 9-2-9h-46a8 8 0 0 1-8-8v-16a8 8 0 0 1 8-8Z" fill="${C.green}"/><text x="726" y="214" class="anat-note ok" text-anchor="middle">Job ready, nothing re-typed</text></g>
    </g>
    <g class="cover cover-people"><rect y="216" width="900" height="288" fill="#e4e8f8"/><rect y="216" width="900" height="288" fill="url(#${P}-dots)"/><text x="450" y="352" text-anchor="middle" class="cover-text">What happens under here?</text><path d="M434 372l16 14 16-14" fill="none" stroke="#9aa1cf" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></g>
    <rect y="504" width="900" height="136" fill="${C.navy}"/>
    <text x="22" y="528" class="anat-layer tech">THE TECHNOLOGY UNDERNEATH</text>
    <g class="tools">${tools.map(([k, t], i) => {const x = 30 + i * 143; return `<g class="tool tool-${k}" style="--i:${i}"><path class="tool-plug" d="M${x + 60} 546V510" /><rect x="${x}" y="546" width="120" height="66" rx="14"/><path d="${icons[k]}" transform="translate(${x + 14} ${560}) scale(1.05)" class="tool-icon"/><text x="${x + 44}" y="584">${t}</text></g>`;}).join('')}</g>
    <g class="cover cover-tech"><rect y="505" width="900" height="135" fill="#141b5e"/><text x="450" y="580" text-anchor="middle" class="cover-text dark">…and under here?</text></g>
    <g class="dashboard">
      <rect x="230" y="128" width="440" height="300" rx="22" fill="#fff" stroke="${C.line}" stroke-width="1.5"/>
      <rect x="230" y="128" width="440" height="50" rx="22" fill="${C.blue}"/><rect x="230" y="156" width="440" height="22" fill="${C.blue}"/>
      <text x="256" y="159" class="dash-title">Monday 8:00 · Brightwater</text><text x="644" y="159" class="dash-tag" text-anchor="end">ILLUSTRATIVE</text>
      ${[['Enquiries', '14', 'every source known'], ['Jobs this week', '9', 'all job packs complete'], ['Variations to invoice', '0', 'nothing waiting'], ['Callbacks today', '3', 'history attached']].map(([a, n, b], i) => {const x = 254 + (i % 2) * 206, y = 196 + Math.floor(i / 2) * 94; return `<g class="dash-tile"><rect x="${x}" y="${y}" width="190" height="80" rx="14" fill="${C.tint}"/><text x="${x + 16}" y="${y + 24}" class="dash-k">${a}</text><text x="${x + 16}" y="${y + 56}" class="dash-n">${n}</text><text x="${x + 56}" y="${y + 55}" class="dash-b">${b}</text></g>`;}).join('')}
      <g class="dash-bars">${[30, 46, 38, 58, 50, 72, 64].map((h, i) => `<rect x="${262 + i * 12}" y="${416 - h * .22}" width="7" height="${h * .22}" rx="2" fill="${i === 6 ? C.green : C.peri}"/>`).join('')}</g>
    </g>
  </g>
</svg>`;
}
