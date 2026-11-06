# Imbleo website

A static company website for business systems, forward-deployed engineering, vertical SaaS, and custom software. The design draws on the spacious layout and animated product presentation of reflex.dev, with original Imbleo copy, visuals, and components.

Brand palette: Dark blue `#1e2c9b`, Vibrant green `#47b824`, Pure white `#ffffff` (tokens at the top of `public/assets/site.css`).

Logo: the original artwork is `public/assets/logo.jpeg` (also used as the social-sharing image). The header, footer and favicon use an SVG rebuild of the same mark and wordmark (`brandMark` in `scripts/build.mjs`) so it stays sharp at every size and can turn white on the blue footer.

## Run and edit

Requires Node.js and Python 3. No package installation is needed.

```sh
npm run build
npm run check
npm run dev
```

Open http://localhost:4173. Deploy the contents of `dist/` to any static host. Directory index support is required for `/work/`, `/services/`, `/business-anatomy/` and the case-study routes.

- `src/home.html`: homepage sections and copy. The hero story (six people and the hand-offs Imbleo makes between them), the case-study carousel with its cloud of further cases and the Tools disc are generated in `scripts/build.mjs` (`heroOrch`, `carousel`, `disc`). The IMBLEO word cycle sits directly under the hero.
- `src/services.js`: the homepage "One path" steps, the tool categories, and all `/services/` content.
- `src/anatomy.js`: the Business Anatomy scroll story (chapters, end card) and its hand-drawn illustration (same pencil style as the homepage sketch), also used on the homepage.
- `src/cases.js`: all 11 case studies and their source qualifications. The first six appear in the homepage carousel; the rest float above "See more".
- `src/logos.js`: platform brand marks vendored from Simple Icons (CC0). The Tools disc inlines the ones it uses; the Services platform chips share the cached sprite `assets/logos.svg` written by the build. Brands without a Simple Icons mark get a tinted initial.
- `scripts/build.mjs`: page layouts, header and footer, case-study rendering (each case has its own animated illustration, see `ART` and `artInner`), contact address, and canonical site origin.
- `public/assets/site.css`: responsive visual system and all animation styles.
- `public/assets/app.js`: services explorer, the case-study carousel, mobile navigation, enquiry brief; loads the motion modules below.
- `public/assets/motion.js`: scroll reveals, word-by-word headings, the hero story steps, the scroll-driven "How we partner" sequence, the drawn delivery path.
- `public/assets/wordcycle.js`: the IMBLEO word cycle (Intelligence, Meets, Business, Listen, Engineer, Own), one word at a time in the same spot. Reusable on any `[data-word-cycle]` element with `.wc-word` children; timings via `data-in`, `data-hold`, `data-out` and `data-rise`.
- `public/assets/sketch.js`: the hand-drawn "01 / The way we think" animation (canvas; jumbled people and paperwork organise as you scroll).
- `public/assets/tools.js`: the "05 / Tools" disc (Imbleo's service symbols inside, real platform logos around them; gathers in view, disperses as you scroll past).
- `public/assets/story.js`: chapter control for the Business Anatomy scroll story.

All motion respects `prefers-reduced-motion`: the page then shows the finished, organised state without animation (the IMBLEO word cycle keeps its fades but drops the movement).

Type and spacing: body text is 16px and small labels start at about 11.5px; sections use 76px vertical padding on desktop (64px tablet, 52px phone).

Performance: looping animations use only `transform` and `opacity`, pause when off screen (including SVG motion), and scroll handlers are throttled to one update per frame. The sketch canvas redraws at full rate only while you scroll and replays three cached frames when idle; the Tools disc updates one CSS variable per frame. Homepage sections below the fold use `content-visibility: auto` with measured height estimates.

## Homepage rules

- No mention of Zoho anywhere on the homepage. `npm run check` fails if the word appears in `dist/index.html`. Platform names live on `/services/` and in the case studies.
- There is no logo strip under the hero; the IMBLEO word cycle takes that place.
- The blue card is the footer on every page. The separate "Let's make it work" call to action was removed.
- Navigation is Our work, Services and Contact us (plus the Let's talk button). No em or en dashes in visible text.
- Case studies do not show delivery-status labels or tool tags on cards, in the carousel or on the case pages. Each case page still states in plain words whether the work was delivered, partly delivered, a design or a prototype.

The enquiry flow prepares an email draft and offers a downloadable text brief. It does not claim to send or store enquiries. It uses `talktous@imbleo.com`. To change the address, edit both `scripts/build.mjs` and `public/assets/app.js`.

## Content provenance

Case studies originate in `aadi_thi_aa.zip`. They are presented as the team's prior project experience, rather than projects won by the newly established company. Original delivery states and metric notes are retained. Client identities remain anonymised. Mock interfaces use fictional sample content and are labelled illustrative.

The Services page adapts the reference portfolio's services content into Imbleo's voice. The Business Anatomy page is a scroll story about an illustrative business (Brightwater Kitchens) and replaces the earlier interactive export, keeping its idea: one customer, and every team, process and system behind her experience.

The company services describe the intended offering; there are no invented client logos, endorsements, partner badges, or company performance figures. Platform names and logos identify ecosystems and integration capabilities, not formal partnerships; the marks belong to their owners.

Rebuild after editing. Fonts (DM Sans and Caveat for the hand-drawn notes) have a system fallback if the Google Fonts service is unavailable. No analytics, trackers, application credentials, or backend services are embedded.

## Verification

`npm run check` covers every local page, route, asset, imported module (including dynamic imports), anchor, ARIA reference, original case-study metric qualification, and the Zoho-free homepage rule. The build produces 16 HTML pages, including 11 individual case studies.

Browser checks for this version (Chromium via Playwright): desktop and phone layouts, no horizontal scrolling at 360 to 1280 px, the hero story steps, the IMBLEO word order, timing and centring, scroll-driven states of the sketch, the How we partner cards (all three steps within about 300 px of scroll), the Tools disc and the story, the case-study carousel and cloud, explorer tabs and flip tiles, platform logos, the contact dialog, and reduced-motion mode. Review on real phones before a public launch. The contact flow prepares drafts; there is no live form backend.
