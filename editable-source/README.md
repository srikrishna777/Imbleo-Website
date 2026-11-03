# Imbleo website

A static company website for Zoho consulting, forward-deployed engineering, vertical SaaS, and custom software. Design direction draws on the spacious layout and interactive software presentation of reflex.dev, with original Imbleo copy, visuals, and components.

## Run and edit

Requires Node.js and Python 3. No package installation is needed.

```sh
npm run build
npm run check
npm run dev
```

Open http://localhost:4173. Deploy the contents of `dist/` to any static host. Directory index support is required for `/work/` and the case-study routes.

- `src/home.html`: homepage content.
- `src/cases.js`: all 11 supplied case studies and their source qualifications.
- `scripts/build.mjs`: page layouts, case-study rendering, contact address, and canonical site origin.
- `public/assets/site.css`: responsive visual system.
- `public/assets/app.js`: service and workspace tabs, case-study filters, mobile navigation, and enquiry brief.
- `public/business-anatomy/`: the original supplied interactive static export. The build adds a parent-site navigation bar without altering the React application.

The enquiry flow prepares an email draft and offers a downloadable text brief. It does not claim to send or store enquiries. It uses `adiedubus@gmail.com`, the contact supplied in the portfolio source. Change the address in both `scripts/build.mjs` and `public/assets/app.js` when the company's final inbox is ready.

## Content provenance

Case studies originate in `aadi_thi_aa.zip`. They are presented as the team's prior project experience, rather than projects won by the newly established company. Original delivery states and metric notes are retained. Client identities remain anonymised. Mock interfaces use fictional sample content and are labelled illustrative.

Business Anatomy originates in `Imbleo-Business-Anatomy-Website.zip`. Guided and Explore modes, layers, department details, and presenter notes are retained. No remote iframe is required.

The company services describe the intended offering; there are no invented client logos, endorsements, partner badges, or company performance figures. Platform names identify ecosystems and integration capabilities, not formal partnerships.

Rebuild after editing. Fonts have a system fallback if the Google Fonts service is unavailable. No analytics, trackers, application credentials, or backend services are embedded.

## Verification status

Source syntax and static checks cover every local page, route, asset, imported module, anchor, generated-page ARIA reference, and original case-study metric qualification. The first build contains 15 HTML pages, including 11 individual case studies.

Automated browser layout and runtime interaction checks could not run in the build environment: local HTTP serving, remote source publication, and browser access to local file URLs were restricted. Review the site at desktop and mobile widths with `npm run dev` before a public launch. The contact flow prepares drafts; there is no live form backend.
