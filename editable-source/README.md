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

- `src/home.html`: homepage sections and copy.
- `src/services.js`: the homepage "One path" steps, the tool categories, and all `/services/` content.
- `src/anatomy.js`: the Business Anatomy scroll story (chapters, end card) and its 2D illustration, also used on the homepage.
- `src/cases.js`: all 11 case studies and their source qualifications.
- `scripts/build.mjs`: page layouts, header and footer, case-study rendering, contact address, and canonical site origin.
- `public/assets/site.css`: responsive visual system and all animation styles.
- `public/assets/app.js`: tabs, the case-study dropdown, mobile navigation, enquiry brief; loads the motion modules below.
- `public/assets/motion.js`: scroll reveals, word-by-word headings, the "How we partner" sequence, the drawn delivery path.
- `public/assets/sketch.js`: the hand-drawn "01 / The way we think" animation (canvas; jumbled people and paperwork organise as you scroll).
- `public/assets/cube.js`: the "05 / The tools we connect" cube (tiles assemble on scroll; drag to turn).
- `public/assets/story.js`: chapter control for the Business Anatomy scroll story.

All motion respects `prefers-reduced-motion`: the page then shows the finished, organised state without animation.

Performance: looping animations use only `transform` and `opacity`, pause when off screen (including the SVG's own motion), and scroll handlers are throttled to one update per frame. The sketch canvas redraws at full rate only while you scroll and replays three cached frames when idle; the cube restyles its tiles only while they assemble. Homepage sections below the fold use `content-visibility: auto` with measured height estimates.

## Homepage rules

- No mention of Zoho anywhere on the homepage. `npm run check` fails if the word appears in `dist/index.html`. Platform names live on `/services/` and in the case studies.
- Logos in the strip under the hero are placeholders that blink out and pop back in. Replace the `logoWall` markup in `scripts/build.mjs` when real client logos are approved (use only logos you have permission to show).
- The blue "Let's make it work" card is the footer on every page, so pages do not repeat a separate closing call to action.
- Case studies do not show delivery-status labels or tool tags on cards, in the dropdown or on the case pages. Each case page still states in plain words whether the work was delivered, partly delivered, a design or a prototype.

The enquiry flow prepares an email draft and offers a downloadable text brief. It does not claim to send or store enquiries. It uses `adiedubus@gmail.com`, the contact supplied in the portfolio source. Change the address in both `scripts/build.mjs` and `public/assets/app.js` when the company's final inbox is ready.

## Content provenance

Case studies originate in `aadi_thi_aa.zip`. They are presented as the team's prior project experience, rather than projects won by the newly established company. Original delivery states and metric notes are retained. Client identities remain anonymised. Mock interfaces use fictional sample content and are labelled illustrative.

The Services page adapts the reference portfolio's services content into Imbleo's voice. The Business Anatomy page is a scroll story about an illustrative business (Brightwater Kitchens) and replaces the earlier interactive export, keeping its idea: one customer, and every team, process and system behind her experience.

The company services describe the intended offering; there are no invented client logos, endorsements, partner badges, or company performance figures. Platform names identify ecosystems and integration capabilities, not formal partnerships.

Rebuild after editing. Fonts (DM Sans and Caveat for the hand-drawn notes) have a system fallback if the Google Fonts service is unavailable. No analytics, trackers, application credentials, or backend services are embedded.

## Verification

`npm run check` covers every local page, route, asset, imported module (including dynamic imports), anchor, ARIA reference, original case-study metric qualification, and the Zoho-free homepage rule. The build produces 16 HTML pages, including 11 individual case studies.

Browser checks for this version (Chromium via Playwright): desktop and phone layouts, no horizontal scrolling at 360 to 1280 px, scroll-driven states of the sketch, cube and story, the case-study dropdown (mouse and keyboard), tabs, the contact dialog, and reduced-motion mode. Review on real phones before a public launch. The contact flow prepares drafts; there is no live form backend.
