// Content for the /services/ page and the homepage "One path" section.
// Adapted from the reference portfolio (aadi_thi_aa / src/content/services.js and site.js),
// rewritten in Imbleo's voice. The homepage must not mention Zoho: keep platform names
// to the services page only (see `platforms` below).

export const path = {
  phases: [
    {name: 'Discover', steps: [
      {n: '01', title: 'Understand', body: 'Stakeholders, systems and real examples of the work.'},
      {n: '02', title: 'Map & Measure', body: 'Delays, hand-offs and a baseline to improve on.'}
    ]},
    {name: 'Design & Build', steps: [
      {n: '03', title: 'Design', body: 'Workflow, data, integrations and success measures.'},
      {n: '04', title: 'Build & Connect', body: 'Configure, extend and connect what is in scope.'}
    ]},
    {name: 'Launch & Improve', steps: [
      {n: '05', title: 'Test & Enable', body: 'End-to-end testing, user acceptance, training.'},
      {n: '06', title: 'Launch', body: 'Rollout, documentation, handover, next priorities.'}
    ]}
  ],
  guides: ['Reviewable increments', 'Scope, risks and decisions visible', 'Key workflows documented', 'Success criteria agreed upfront']
};

// Tool categories for the homepage cube (generic on purpose: no brand names).
export const tools = [
  {key: 'crm', icon: 'pipeline', name: 'CRM & sales'},
  {key: 'finance', icon: 'wallet', name: 'Finance & accounting'},
  {key: 'projects', icon: 'briefcase', name: 'Projects & jobs'},
  {key: 'service', icon: 'headset', name: 'Service desk'},
  {key: 'analytics', icon: 'chart', name: 'Analytics & reporting'},
  {key: 'automation', icon: 'link', name: 'Integration & automation'},
  {key: 'ai', icon: 'sparkles', name: 'AI assistants'},
  {key: 'documents', icon: 'file', name: 'Documents & e-sign'},
  {key: 'people', icon: 'users', name: 'People & HR'}
];

export const servicesPage = {
  hero: {
    title: ['Ten ways to make', 'the business run better.'],
    lede: 'Most engagements combine several of these. We can start with discovery or an audit, own the design and build, deliver one focused integration, or bring AI into a specific workflow.',
    jump: [
      {id: 'explorer', label: 'What we do'},
      {id: 'deliver', label: 'How we deliver'},
      {id: 'ai', label: 'Practical AI'},
      {id: 'migration', label: 'Data migration'},
      {id: 'platforms', label: 'Platforms'}
    ]
  },
  explorer: {
    items: [
      {short: 'Discovery', icon: 'discover', title: 'Process discovery & design', line: 'See how work really happens before changing any software.', bullets: ['Stakeholder interviews and current-state process maps', 'A register of delays, duplicate entry and risk', 'Future-state workflow with owners and decision points', 'Requirements, priorities and measurable success criteria', 'A phased roadmap: quick wins first, bigger moves later'], deliverables: ['Discovery summary', 'Current and future-state maps', 'Process-owner map', 'Pain-point register', 'Success metrics', 'Roadmap']},
      {short: 'Architecture', icon: 'architecture', title: 'Systems architecture & audits', line: 'Decide what belongs where, and find the hidden risk.', bullets: ['CRM and application architecture review', 'Workflow, permission, licence and integration health checks', 'Keep, replace or integrate recommendations', 'Prioritised findings, risks and a phased plan'], deliverables: ['Solution design', 'Data model', 'Field dictionary', 'Permissions plan', 'Integration map', 'Decision log']},
      {short: 'CRM & RevOps', icon: 'funnel', title: 'CRM & revenue operations', line: 'One lifecycle from first enquiry to invoice and support.', bullets: ['Lead capture, qualification, assignment and nurture', 'Pipelines, stages and ownership rules', 'Approvals, follow-ups and duplicate controls', 'Clean sales-to-delivery and sales-to-finance hand-offs', 'Pipeline, forecast and revenue reporting'], deliverables: ['Lifecycle map', 'Pipeline and stage design', 'Approval rules', 'Hand-off definitions', 'Revenue dashboards']},
      {short: 'Implementation', icon: 'implement', title: 'Platform implementation', line: 'Configure the platform around the agreed process.', bullets: ['Modules, fields, layouts, templates and permissions', 'Pipelines, workflows and scheduled processes', 'Apps designed to work as one system, not islands', 'Rescuing a CRM that has become hard to maintain'], deliverables: ['Configured environment', 'Automation register', 'Sandbox or prototype', 'Sprint demos', 'Build notes']},
      {short: 'Integration', icon: 'integrate', title: 'Integration & automation', line: 'Enter it once, send it to the right place, never fail silently.', bullets: ['Native connectors between CRM, finance, projects and service', 'Integration platforms chosen by fit, not habit', 'API and webhook connections with least-privilege access', 'Validation, deduplication, alerts and retries', 'A map that explains what runs, when, and what happens if it fails'], deliverables: ['System-to-system map', 'Field mapping', 'Access approach', 'Error handling', 'Test evidence', 'Monitoring plan']},
      {short: 'Data migration', icon: 'migrate', title: 'Data migration & quality', line: 'A rehearsed, reconciled move. Never a one-off import.', bullets: ['Source inventory, field mapping and data ownership', 'Cleansing, deduplication and standardisation', 'Trial loads, reconciliation and cutover planning', 'Post-migration checks and a documented exception list'], deliverables: ['Source inventory', 'Mapping workbook', 'Cleansing rules', 'Trial-load reconciliation', 'Cutover plan', 'Exception list']},
      {short: 'Reporting', icon: 'report', title: 'Analytics & reporting', line: 'Reports that answer a question someone actually asks.', bullets: ['Operational reports and management dashboards', 'KPI definitions, scorecards and workload views', 'Data combined across sources where feasible', 'Scheduled reports instead of weekly spreadsheet assembly'], deliverables: ['KPI definitions', 'Dashboards', 'Scheduled reports', 'Data source map']},
      {short: 'AI in operations', icon: 'ai-ops', title: 'AI in operations', line: 'AI inside a real workflow, with context and controls.', bullets: ['Assistants and agents where they genuinely fit', 'Approved connections to business data, including MCP', 'Research, classification, summaries and drafting', 'Meeting notes to tasks, plain-language questions, ticket triage', 'Evaluation, approvals, logging and fallbacks'], deliverables: ['Use-case brief', 'Task allocation', 'Approved data sources', 'Evaluation results', 'Guardrails', 'Pilot plan']},
      {short: 'Custom apps', icon: 'custom-app', title: 'Custom apps & prototypes', line: 'The lightest extension that does the job.', bullets: ['Custom functions for rules, checks and documents', 'Low-code apps for inspections, job sheets and approvals', 'Rapid prototypes to test an idea with real users first', 'Full custom builds when the right tool does not exist yet'], deliverables: ['Requirements', 'Working prototype', 'App or function', 'Build notes', 'Handover']},
      {short: 'Adoption', icon: 'adopt', title: 'Adoption & improvement', line: 'Live is not finished. People need to use it well.', bullets: ['Role-based training, short walkthroughs and quick guides', 'User acceptance testing and go-live checks', 'Hypercare, health checks and an improvement backlog', 'Adoption and data-quality reviews'], deliverables: ['UAT checklist', 'Training material', 'Admin guide', 'Runbook', 'Ownership map', 'Improvement backlog']}
    ],
    principles: ['Standard first, custom where it earns its place', 'Think downstream', 'Short, reviewable increments', 'Document as we go', 'Measure the result']
  },
  deliver: {
    title: 'A sequence of validated decisions.',
    lede: 'Each stage ends with something you can review and sign off.',
    stages: [
      {name: 'Understand', line: 'People, real processes, tools, data and pain points.', proof: 'Discovery summary'},
      {name: 'Design', line: 'Future process, records, permissions, integrations, reporting.', proof: 'Approved solution design'},
      {name: 'Build', line: 'Configure the platform, in a sandbox where it helps.', proof: 'Working increments'},
      {name: 'Connect', line: 'Link retained tools through connectors, flows or APIs.', proof: 'Integration map and tests'},
      {name: 'Automate', line: 'Approvals, assignments, reminders, documents, schedules.', proof: 'Automation register'},
      {name: 'Test', line: 'End-to-end scenarios with real records and exceptions.', proof: 'UAT sign-off'},
      {name: 'Launch & improve', line: 'Roll out, support, monitor, then prioritise what is next.', proof: 'Runbook and backlog'}
    ],
    governance: ['Weekly status and decisions', 'Regular demos of working software', 'A named owner for every decision', 'Shared board, risks and decision log', 'New requests weighed before they join scope'],
    done: 'Done means it supports the agreed process, passes the agreed tests, is usable, is secured, is documented, and you can measure the outcome.'
  },
  ai: {
    title: 'AI is not a coat of paint.',
    lede: 'We map how the work really happens, re-engineer it, then decide which steps need rules, AI or a person.',
    principle: 'Not “where can we add an agent?” but “which outcome needs to improve, and what is the simplest safe way to improve it?”',
    buckets: [
      {key: 'remove', name: 'Remove', q: 'Does this step need to exist?', body: 'Drop duplicate entry, extra approvals and needless hand-offs.'},
      {key: 'code', name: 'Code', q: 'Is the rule predictable?', body: 'Ordinary automation for fixed if/then logic.'},
      {key: 'agent', name: 'Agent', q: 'Does it need judgement?', body: 'AI for messy inputs, ambiguity and interpretation.'},
      {key: 'human', name: 'Human', q: 'Is the decision consequential?', body: 'People approve money, commitments and anything irreversible.'}
    ],
    guardrails: ['Least privilege', 'Human approval', 'Data boundaries', 'Audit trail', 'Resilience', 'Right model', 'Fallback', 'Change control']
  },
  migration: {
    title: 'Moving data is not the same as migrating a system.',
    lede: 'Understand what each record means, rehearse the move, and reconcile before anyone switches over.',
    steps: [
      {t: 'Inventory', o: 'Source list and access plan'},
      {t: 'Scope', o: 'What moves, what is archived'},
      {t: 'Map', o: 'Field and relationship map'},
      {t: 'Clean', o: 'Cleansing rules and exceptions'},
      {t: 'Trial load', o: 'Load log and reconciliation'},
      {t: 'Fix & repeat', o: 'Checks passed'},
      {t: 'Cutover', o: 'Final delta and sign-off'},
      {t: 'Post-check', o: 'Audit and exceptions closed'}
    ],
    loopNote: 'Rehearse until it reconciles'
  },
  platforms: {
    title: 'Your stack, connected.',
    lede: 'The tools are the means, not the product. The stack follows the requirement, and we design around what already works.',
    groups: [
      {name: 'Business suites & CRM', icon: 'pipeline', apps: ['Zoho One', 'Zoho CRM', 'Salesforce', 'HubSpot', 'Microsoft Dynamics 365', 'Pipedrive', 'Freshsales', 'monday CRM', 'Odoo']},
      {name: 'Finance & payments', icon: 'wallet', apps: ['Xero', 'QuickBooks', 'MYOB', 'Zoho Books', 'NetSuite', 'Sage', 'Stripe', 'PayPal', 'GoCardless']},
      {name: 'Integration & automation', icon: 'link', apps: ['Zoho Flow', 'Make', 'Zapier', 'n8n', 'Power Automate', 'Workato', 'REST APIs & webhooks']},
      {name: 'Analytics & reporting', icon: 'chart', apps: ['Power BI', 'Zoho Analytics', 'Looker Studio', 'Tableau', 'Metabase', 'Google Sheets', 'Excel']},
      {name: 'Service & projects', icon: 'headset', apps: ['Zoho Desk', 'Zendesk', 'Freshdesk', 'Intercom', 'Jira', 'Asana', 'monday.com', 'ClickUp']},
      {name: 'Work & collaboration', icon: 'users', apps: ['Microsoft 365', 'Google Workspace', 'Slack', 'Microsoft Teams', 'Notion', 'Zoom']},
      {name: 'Commerce & operations', icon: 'cart', apps: ['Shopify', 'WooCommerce', 'Cin7', 'Unleashed', 'ServiceM8', 'simPRO']},
      {name: 'Documents & e-signature', icon: 'pen', apps: ['DocuSign', 'Zoho Sign', 'Adobe Acrobat Sign', 'PandaDoc', 'SharePoint', 'Google Drive']},
      {name: 'Low-code & custom', icon: 'code', apps: ['Zoho Creator', 'Zoho Catalyst', 'Power Apps', 'Retool', 'Web apps & portals', 'Internal tools']},
      {name: 'Data & storage', icon: 'database', apps: ['PostgreSQL', 'SQL Server', 'MySQL', 'BigQuery', 'Snowflake', 'Airtable']},
      {name: 'Marketing', icon: 'megaphone', apps: ['Mailchimp', 'HubSpot Marketing', 'Zoho Campaigns', 'ActiveCampaign', 'Klaviyo', 'Google Ads']},
      {name: 'AI', icon: 'sparkles', apps: ['Claude', 'ChatGPT', 'Gemini', 'Microsoft Copilot', 'Zia & Zia Agents', 'MCP connections']}
    ]
  },
  engage: {
    title: 'Start where you are.',
    lede: 'If the problem is unclear, a short discovery or a five-day proof of concept is the better first step. If it is well understood, go straight to delivery.',
    items: [
      {t: 'Discovery & design', when: 'The symptoms are clear, the solution is not.', gets: 'Process maps, requirements, target architecture, roadmap'},
      {t: 'System audit', when: 'A system exists but is unreliable or underused.', gets: 'Findings, risks, quick wins, prioritised plan'},
      {t: 'Fixed-scope build', when: 'Requirements and acceptance criteria are clear.', gets: 'A defined feature set against agreed milestones'},
      {t: 'Phased programme', when: 'Several teams need to change without a big bang.', gets: 'Delivery waves with review gates'},
      {t: 'Integration sprint', when: 'One hand-off keeps causing manual work.', gets: 'One tested, documented flow with error handling'},
      {t: 'AI pilot', when: 'You want AI but are not sure where it pays off.', gets: 'Baseline, use case, prototype, recommendation'},
      {t: 'Advisory review', when: 'You need a second opinion on a platform or design.', gets: 'Decision support and a practical path'},
      {t: 'Ongoing support', when: 'A system is live and needs an owner.', gets: 'Health checks, triage, planned improvements'}
    ],
    commercial: 'Fixed fee by phase, time and materials for exploratory work, or a monthly retainer. Fees are confirmed once scope, access and data condition are understood.'
  },
  faq: {
    title: 'Straight answers.',
    items: [
      {q: 'Do you only work with one platform?', a: 'No. We design around your whole stack. The right answer might be a business suite such as Zoho One, a connection to the CRM or accounting system you already have, a mixed stack, or a focused custom build.'},
      {q: 'Can you help if our current CRM is messy?', a: 'Yes. An audit shows what is wrong with the data model, pipelines, permissions, automation and reports, and gives you a prioritised plan. The platform does not always need replacing.'},
      {q: 'Do we need AI for automation?', a: 'No. Predictable rules are usually better handled by ordinary automation. AI helps when a task needs interpretation or handles a lot of variation. High-impact decisions keep human control.'},
      {q: 'Will AI be allowed to change records automatically?', a: 'That is a design decision based on risk. Some low-risk, reversible actions can be automated after testing. Financial, contractual or customer-facing actions usually need explicit approval. Permissions, logs and fallbacks are defined before anything goes live.'},
      {q: 'How do we know if the project succeeded?', a: 'We agree a baseline and a few process measures up front: cycle time, manual hours, errors, data completeness, reporting time or adoption. Results are reviewed against that baseline, in context.'},
      {q: 'How quickly can we start?', a: 'Usually with a five-day proof of concept. A clear quote and sign-off follow within about three days, and the project kicks off within a week of sign-off.'}
    ]
  }
};
