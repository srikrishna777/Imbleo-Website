# Imbleo website

A static company website for business systems, forward-deployed engineering, vertical SaaS, and custom software. The design draws on the spacious layout and animated product presentation of reflex.dev, with original Imbleo copy, visuals, and components.

Brand palette: Dark blue `#1e2c9b`, Vibrant green `#47b824`, Pure white `#ffffff` (tokens at the top of `public/assets/site.css`).

Logo: the original artwork is `public/assets/logo.jpeg` (also used as the social-sharing image). The header, footer, loader and favicon use an SVG rebuild of the same mark and wordmark (`brandMark` in `scripts/build.mjs`) so it stays sharp at every size and can turn white on the blue footer.

## Run and edit

Requires Node.js and Python 3. No package installation is needed.

```sh
npm run build
npm run check
npm run dev
```

Open http://localhost:4173. Deploy the contents of `dist/` to any static host. Directory index support is required for `/work/`, `/services/`, `/business-anatomy/` and the case-study routes.

- `src/home.html`: homepage sections and copy. The hero story (six people, drawn as the same hand-drawn characters as the Business Anatomy sketch, and the hand-offs Imbleo makes between them), the case-study carousel with the next cases peeking in below it, and the Tools disc are generated in `scripts/build.mjs` (`heroOrch`, `carousel`, `disc`).
- Intro loader: on the first page of a visit (per browser tab) the IMBLEO words play once over a white screen with the logo and a progress line, about 4.5 seconds, then the page appears. Click or any key skips it; it is skipped for reduced motion; CSS removes it after 8 seconds whatever happens. Markup: `loader` in `scripts/build.mjs`; logic at the end of `public/assets/app.js`.
- `src/services.js`: the homepage "One path" steps, the tool categories, and all `/services/` content.
- `src/anatomy.js`: the Business Anatomy scroll story (chapters, end card) and its hand-drawn illustration (same pencil style as the homepage sketch), also used on the homepage. It also exports the hand-drawn portraits used in the hero (`portrait`, `sketchDefs`).
- `src/cases.js`: all 11 case studies and their source qualifications. The first six appear in the homepage carousel; the next three peek in below it, blurred and fading, behind "See more".
- `public/assets/logos/` and `src/logos.js`: original platform logos, one SVG per brand, taken from npm packages (Iconify "logos" in full colour, Simple Icons v16 and v8.15, LobeHub icons; all CC0). `src/logos.js` holds each logo's name and width-to-height ratio. The Tools disc and the Services platform chips use them as images. Brands with no published logo in those packages (individual Zoho product logos, Freshsales, Freshdesk, NetSuite, GoCardless, Workato, Cin7, Unleashed, ServiceM8, simPRO, PandaDoc, Klaviyo) still show a tinted initial or the Zoho logo; drop their SVGs into `public/assets/logos/`, add them to `src/logos.js` and to `BRAND` in `scripts/build.mjs`.
- `scripts/build.mjs`: page layouts, header and footer, case-study rendering (each case has its own animated illustration, see `ART` and `artInner`; architecture and relationship sections become animated system maps, see `sysmap`), contact address, and canonical site origin. Page titles start with "Imbleo |".
- `public/assets/site.css`: responsive visual system and all animation styles.
- `public/assets/app.js`: intro loader, services explorer, the case-study carousel (swipe, mouse drag or arrow keys, with a position bar; no arrow buttons), mobile navigation, enquiry brief; loads the motion modules below.
- `public/assets/motion.js`: scroll reveals, word-by-word headings, the hero story steps, the scroll-driven "How we partner" sequence, the drawn delivery path.
- `public/assets/wordcycle.js`: the IMBLEO word cycle (Intelligence, Meets, Business, Listen, Engineer, Own), one word at a time in the same spot. Used by the intro loader. Reusable on any `[data-word-cycle]` element with `.wc-word` children; timings via `data-in`, `data-hold`, `data-out` and `data-rise`; `data-once` plays it a single time.
- `public/assets/sketch.js`: the hand-drawn "01 / The way we think" animation (canvas; jumbled people and paperwork organise as you scroll).
- `public/assets/tools.js`: the "05 / Tools" disc (Imbleo's service symbols inside, real platform logos around them; gathers in view, disperses as you scroll past).
- `public/assets/story.js`: chapter control for the Business Anatomy scroll story.

All motion respects `prefers-reduced-motion`: the page then shows the finished, organised state without animation, and the intro loader is skipped.

Case pages: architecture and relationship sections are animated system maps (connections draw in, dots move along delivered connections, scoped ones stay dashed; a stacked layout on phones). Flow steps light up in order on a loop, and before/after lists strike out the old way and tick in the new one.

Type and spacing: body text is 17px and small labels start at about 12.5px; text colours were darkened 20% (and light text on blue made whiter) for contrast in 5.0. Sections use 76px vertical padding on desktop (64px tablet, 52px phone).

Performance: looping animations use only `transform` and `opacity`, pause when off screen (including SVG motion), and scroll handlers are throttled to one update per frame. The sketch canvas redraws at full rate only while you scroll and replays three cached frames when idle; the Tools disc updates one CSS variable per frame. Homepage sections below the fold use `content-visibility: auto` with measured height estimates.

## Homepage rules

- No mention of Zoho in the homepage copy. `npm run check` fails if the word appears in the page's text or metadata. Since 5.0 the Tools disc shows the Zoho logo (with Salesforce, Microsoft, Google Workspace, WhatsApp, Meta and DocuSign) at the client's request. Platform names live on `/services/` and in the case studies.
- There is no logo strip under the hero, and the IMBLEO word cycle is the intro loader rather than a section.
- The blue card is the footer on every page. The separate "Let's make it work" call to action was removed.
- Navigation is Our work, Services and Contact us (plus the Let's talk button). No em or en dashes in visible text.
- Case studies do not show delivery-status labels or tool tags on cards, in the carousel or on the case pages. Each case page still states in plain words whether the work was delivered, partly delivered, a design or a prototype.

The enquiry flow prepares an email draft and offers a downloadable text brief. It does not claim to send or store enquiries. It uses `talktous@imbleo.com`. To change the address, edit both `scripts/build.mjs` and `public/assets/app.js`.

## Content provenance

Case studies originate in `aadi_thi_aa.zip`. They are presented as the team's prior project experience, rather than projects won by the newly established company. Original delivery states and metric notes are retained. Client identities remain anonymised. Mock interfaces use fictional sample content and are labelled illustrative.

The Services page adapts the reference portfolio's services content into Imbleo's voice. The Business Anatomy page is a scroll story about an illustrative construction products and technical supply business (Corbel Building Supply, a fictional name) and replaces the earlier interactive export, keeping its idea: one customer (Leah, a site manager), and every team, process and system behind her order.

The company services describe the intended offering; there are no invented client logos, endorsements, partner badges, or company performance figures. Platform names and logos identify ecosystems and integration capabilities, not formal partnerships; the marks belong to their owners.

Rebuild after editing. Fonts (DM Sans and Caveat for the hand-drawn notes) have a system fallback if the Google Fonts service is unavailable. No analytics, trackers, application credentials, or backend services are embedded.

## Verification

`npm run check` covers every local page, route, asset and image, imported module (including dynamic imports), anchor, SVG symbol reference, ARIA reference, original case-study metric qualification, and the Zoho-free homepage copy rule. The build produces 16 HTML pages, including 11 individual case studies.

Browser checks for this version (Chromium via Playwright): desktop and phone layouts, no horizontal scrolling at 360 to 1280 px, the hero story steps, the IMBLEO word order, timing and centring, scroll-driven states of the sketch, the intro loader (order, timing, skip, once per visit, reduced motion), the How we partner cards (all three steps within about 400 px of scroll), the Tools disc and the story, the case-study carousel and the faded preview row, explorer tabs and flip tiles, platform logos, the contact dialog, and reduced-motion mode. Review on real phones before a public launch. The contact flow prepares drafts; there is no live form backend.
