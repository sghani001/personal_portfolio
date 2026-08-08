# Missing & Updates — Portfolio QA Punch List
**Prepared for:** Editor/developer (build follow-up to the Portfolio Redesign Brief)
**Purpose:** The current build is functional but doesn't match the brief yet — this file lists concrete bugs, missing sections, and content gaps to fix, in priority order.

---

## 1. CRITICAL — Layout Bugs (fix first)

- [ ] **Stat cards overlap in dark mode.** The `6 Live SaaS Products` and `4 Published Rails Gems` cards are visually overlapping/clipping into each other (visible in the dark-theme hero screenshot). This is a grid/flex sizing bug, not a design choice — the 2x2 stat grid needs fixed-height cards with proper gap spacing so this can't happen at any viewport width.
- [ ] **Text overflow / clipping in Rails Proficiency cards.** The "Stripe, Paddle, Chargebee" card cuts off mid-sentence at the bottom of the viewport in the screenshot — card heights aren't auto-expanding to fit content. Cards need `min-height: auto` with proper padding, not a fixed clipped height.
- [ ] **Inconsistent card heights across the Rails Proficiency grid.** The 4 cards (Architecture & Scale / Bi-directional CRM / Payments / Auth & Security) should be equal height in each row — currently they visibly don't match, which reads as unpolished.

---

## 2. CRITICAL — Theme/Design System Not Matching the Brief

The current build doesn't yet follow the copper/ink system from the redesign brief consistently — this is most of why it "doesn't make a good impression" right now:

- [ ] **Blue icon on the "Architecture & Scale" card breaks the one-accent rule.** Every other Rails Proficiency card icon is copper/orange; this one is blue. Fix to copper/amber (`#D97B3F` dark / `#B85C24` light) — mixing in blue undoes the entire point of moving away from the generic blue-tech look.
- [ ] **No visual elevation/depth.** Cards are flat rectangles with a thin border and no shadow — on a dark background this makes everything look like unstyled boxes rather than "raised" UI. Add a subtle shadow (e.g. `0 4px 16px rgba(0,0,0,0.25)` in dark mode, softer in light mode) and a slightly lighter surface color than the page background (already specified in the brief: `#211D1A` surface vs `#161311` background — confirm this is actually being applied; right now cards and background look like the same near-black tone).
- [ ] **Light-mode "Open to:" box is an unstyled gray, disconnected from the palette.** Should use the warm off-white surface (`#FFFFFF` card on `#FBF8F5` background) with a copper-tinted border, not flat gray (`#e5e5e5`-looking default).
- [ ] **Corner radius and spacing are inconsistent** between the hero stat cards (sharper corners) and the Rails Proficiency cards (rounder corners) — pick one radius value (recommend 12–14px) and apply it everywhere: cards, buttons, badges, the "Open to" box.
- [ ] **Overall dark-mode contrast is muddy.** Background, card surface, and border colors are all reading as very close to the same dark gray/brown in the screenshot — there isn't enough separation between page background → card → border → text for the hierarchy to be legible at a glance. Push the surface color noticeably lighter than the background per the brief's hex values, and confirm text colors are exactly `#F3EFEA` (primary) / `#A69C92` (secondary), not a generic gray.
- [ ] **"Hire Me" button and accent usage should be reviewed for consistency** — confirm CTA buttons, links, active nav states, and stat numbers are all using the *same* copper hex value, not slightly different oranges (there appears to be a lighter/more saturated orange on some elements vs. others in the screenshots).

---

## 3. MISSING — Skills Section

There is currently **no dedicated Skills section** on the site (no "Skills" item in the nav — currently: Rails, Work, Gems, Projects, Experience, About). This was specified in the brief (Section 7) as a grouped, secondary-to-case-studies section. Add it back:

- Add a **Skills** nav item (placement: after Gems/Projects, before Experience)
- Structure as grouped categories, matching `resumeData.skills` exactly:
  - **Backend** — Rails 5/6/7, REST APIs, ActiveRecord, PostgreSQL, MySQL, Redis, Sidekiq, ActiveJob, OAuth 2.0, multi-tenant architecture, Hotwire, Stimulus.js, ActionCable
  - **Frontend** — React.js, JS ES6+, MUI, Tailwind, React Query, Redux Toolkit, React Router v6, Vite
  - **Rails Gems (ecosystem)** — Devise, Pundit, Kaminari, ActiveAdmin, ActiveStorage, bcrypt, jsonapi-serializer, FactoryBot, RSpec
  - **Payments** — Stripe, Paddle, Chargebee
  - **Integrations** — HubSpot, Salesforce, QuickBooks Online, Moodle LMS, Documenso
  - **Testing & DevOps** — RSpec, Jest, FactoryBot, GitHub Actions CI/CD, AWS (IAM/VPC/EC2/RDS/S3/CloudWatch), Docker, Heroku, Linux
  - **Currently Learning** — Django, deeper AWS (Lambda, ECR), containerized deployments (style this visually distinct — e.g. outlined/dashed pills — so it reads as "growing," not core competency)
- Keep this visually secondary to case studies and Rails Proficiency (smaller cards, tag/pill style, not full cards) — per the brief, skills lists persuade least, but completeness matters for recruiter keyword-scanning, so it still needs to exist and be complete.

---

## 4. MISSING — Real/Dynamic Gem Download Count

The hero currently shows a **static `5.9k+`** figure. Per Section 8 of the brief, this should be a real, ideally live-updating number:

- [ ] **Minimum fix:** confirm `5,993` (the actual combined total from `resumeData.openSource.combinedDownloads`) is the number being displayed, not a rounded placeholder that could drift out of date — `5.9k+` is fine as a *display format* of a real number, but confirm it's computed from real data, not hardcoded text.
- [ ] **Better fix:** wire up a small fetch to the RubyGems API for each of the 4 gems and sum the live `downloads` count at build/page-load time, so the number updates automatically as gems get more downloads (RubyGems exposes this at `https://rubygems.org/api/v1/gems/{gem_name}.json` — no auth required, `downloads` field in the response). This was flagged in the brief as an optional but high-value differentiator — a live counter is a small proof-of-backend-skill flourish that most portfolios don't bother with.
- [ ] Apply the same real/dynamic sourcing to each individual gem card in the Gems section — show that specific gem's live download count next to its version, not just the combined total in the hero.

---

## 5. OTHER LIKELY GAPS — Please Confirm Status of Each

Cross-checking against the full brief and `resumeData.js`, please confirm these are actually built (screenshots only show hero + top of Rails Proficiency, so unclear if these exist further down the page):

- [ ] **Compact "Additional Projects" cards** — Docyt, Bullseye Education, Online Exam System, Urdu Signify (Section 4 of the brief specifies these as smaller cards separate from the 3 featured case studies)
- [ ] **All 4 gem cards** with individual GitHub + RubyGems links, version numbers, and one-line descriptions (not just the combined stat in the hero)
- [ ] **"How I Work" process section** (discovery → scoping → async updates → handoff) — this was flagged in the brief as one of the highest-converting sections and is easy to accidentally skip
- [ ] **Testimonials section** — both the Muhammad Ali Subhani recommendation and the two Blackstack appreciation posts from `resumeData.testimonials`
- [ ] **About section** with headshot and the explicit "Lahore + remote, GMT+5, EU/US overlap" line
- [ ] **Contact form with the hiring-type dropdown** (On-site/Hybrid Lahore / Remote Full-Time / Remote Contract) specified in Section 4.9 of the brief
- [ ] **Two separate resume download buttons** (Full-Stack version + Remote-Focused version) rather than one generic download
- [ ] **OpenGraph image** using the copper/ink palette for link previews (LinkedIn/WhatsApp sharing) — easy to forget, worth checking now before this gets shared anywhere
- [ ] **Light/dark toggle persistence** — confirm it saves to localStorage and respects system preference on first load, not just toggling in-session

---

## 6. Suggested Priority Order for the Editor

1. Fix the card overlap bug and text-overflow bug (Section 1) — these are broken UI, not style opinions
2. Fix the blue icon and card elevation/contrast issues (Section 2) — this is most of what's making the current build "not look good"
3. Add the missing Skills section (Section 3)
4. Wire up real/dynamic gem download counts (Section 4)
5. Confirm and fill any remaining gaps from Section 5

---

*Hand this alongside the original Portfolio Redesign Brief and the current `resumeData.js` — all content referenced above already exists in that data file and just needs to be rendered.*









// Syed Ghani — portfolio & resume content (single source of truth)
// Updated to align with the Portfolio Redesign Brief:
// - dual positioning (Lahore/local + remote/global)
// - full Rails proficiency showcase content
// - all 4 open-source gems as first-class data (previously missing)
// - reconciled experience details across both resume versions (full-stack + remote-focused)

const resumeData = {
  name: "Syed Ghani",
  title: "Full-Stack Software Engineer",
  titles: [
    "Full-Stack Software Engineer",
    "Ruby on Rails Developer",
    "React.js Developer",
    "API & Integrations Specialist",
    "Problem Solver",
  ],
  tagline: "Rails · React · Production SaaS, owned end-to-end",
  headline:
    "Full-stack engineer building and owning production Ruby on Rails + React SaaS systems — from schema and background jobs to polished UI. Open to on-site/hybrid roles in Lahore and remote roles globally.",

  email: "syedghani001@gmail.com",
  emailAcademic: "2020cs669@student.uet.edu.pk",
  location: "Lahore, Pakistan",
  timezone: "GMT+5 · 4–5 hr overlap with EU · available for US East morning standups",
  phone: "+92 309 020 4019",
  portfolioUrl: "https://syedghani.is-a.dev",
  leetcodeUrl: "https://leetcode.com/syedghani/",
  rubygemsProfile: "https://rubygems.org/profiles/devsyedghani",

  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/syed-m-ghani-357ba4234", icon: "linkedin" },
    { name: "GitHub", url: "https://github.com/sghani001", icon: "github" },
    { name: "Email", url: "mailto:syedghani001@gmail.com", icon: "email" },
  ],

  // Drives the "Open to:" line in the hero per the redesign brief — lets both a
  // local recruiter and a remote hiring manager self-qualify instantly.
  availability: {
    status: "Available immediately",
    modes: [
      "Full-time — on-site / hybrid (Lahore)",
      "Full-time — remote (global)",
      "Contract — remote (global)",
    ],
    note: "Currently interviewing. Open to Lahore-based product studios/agencies and remote-first teams worldwide.",
  },

  heroBullets: [
    "Rails APIs, PostgreSQL, and background work with Sidekiq / Redis",
    "React SPAs: auth flows, dashboards, and integration-heavy UIs",
    "Third-party systems: Stripe, Paddle, Chargebee, HubSpot, Salesforce, Moodle, Documenso, QuickBooks",
    "AWS (IAM, VPC, EC2, RDS, S3, CloudWatch) and Docker for deployment",
  ],

  summary:
    "Full-stack engineer focused on Ruby on Rails and React who has shipped and owned a production SaaS platform end-to-end — not just contributed to one. As sole engineer on CinnaLab PRM, built the entire system from zero to production in 8 months: multi-tenant React/Rails architecture, bi-directional HubSpot/Salesforce CRM sync, a zero-data-loss Paddle-to-Chargebee billing migration, and a Devise + Pundit RBAC system with ActionCable-powered real-time notifications — running with zero critical incidents since launch. Across 6 SaaS products in AI/PRM, fintech, ed-tech, and college athletics, the pattern repeats: given ambiguous scope, ships working production systems, not prototypes — entirely async where needed, with 100% on-time sprint delivery. Also maintains 4 open-source Rails gems with 5,993 combined downloads. Following a company-wide downsizing at Blackstack (May 2026, not performance-related), has used the interim to deepen Docker, AWS, and background-job expertise, and to learn Django.",

  aboutExtra:
    "I care about clear boundaries between domains, tests that earn their keep (RSpec / Jest), and integrations that survive real traffic. Comfortable owning a slice of the stack from migration to deploy — or the whole thing, solo, from architecture to launch.",

  // New section supporting the "Rails Proficiency Showcase" block in the redesign brief.
  // Keep this concrete and outcome-first, not a tag cloud.
  railsProficiency: [
    {
      title: "Architecture & scale",
      points: [
        "Multi-tenant Rails architecture with dynamic subdomain routing (CinnaLab)",
        "Row-level tenancy patterns — also shipped as the rails-tenantify gem",
        "Background job systems with Sidekiq/Redis: retries, idempotency, and dead-letter-queue handling",
        "ActionCable/WebSockets for real-time notifications, replacing polling entirely",
      ],
    },
    {
      title: "Data & integrations",
      points: [
        "Bi-directional CRM sync (HubSpot + Salesforce) with conflict resolution and idempotent Sidekiq jobs",
        "QuickBooks Online multi-entity sync pipeline (Controllr/Monthend)",
        "PostgreSQL query and index optimization — cut faceted search response time 40% on a 2,500+ listing dataset",
      ],
    },
    {
      title: "Payments & billing infra",
      points: [
        "Stripe, Paddle, and Chargebee integrations across three different products",
        "Full Paddle → Chargebee subscription billing migration with zero data loss and zero customer disputes",
        "Stripe subscription microservice built from scratch with idempotent webhooks and PCI-aligned handling (Docyt)",
      ],
    },
    {
      title: "Auth & security",
      points: [
        "Devise + Pundit RBAC systems run in production with zero critical incidents and zero auth issues",
        "Google OAuth 2.0 flows with careful callback and token-refresh handling",
        "Built rails-guarddog — a static security scanner for SQLi, XSS, secrets exposure, and mass assignment — as direct proof of thinking about this beyond just using it",
      ],
    },
  ],

  experience: [
    {
      company: "Blackstack Software Solutions",
      companyUrl: "https://www.linkedin.com/company/blackstack-software-solutions/posts/?feedView=all",
      location: "Lahore, Pakistan · Remote-friendly",
      roles: [{ title: "Software Engineer", duration: "Aug 2024 — May 2026" }],
      employmentNote:
        "Role ended in a company-wide downsizing (May 2026); not performance-related.",
      journeyNote:
        "Started as Associate Software Engineer (Aug 2024), promoted to Software Engineer (Dec 2024) after owning delivery on integrations-heavy products.",
      projects: [
        {
          name: "CinnaLab",
          url: "https://cinnalab.io/",
          flagship: true,
          role: "Sole Engineer",
          description:
            "AI-assisted Partner Relationship Management platform: partner onboarding, deal registration, lead scoring, e-learning, training, and e-signatures with two-way CRM and LMS sync.",
          image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=380&fit=crop",
          tech: [
            "React.js",
            "Material UI",
            "Ruby on Rails",
            "Sidekiq",
            "Redis",
            "ActionCable",
            "Devise",
            "Pundit",
            "HubSpot API",
            "Salesforce API",
            "Paddle",
            "Chargebee",
            "Moodle",
            "Documenso",
          ],
          problem:
            "Partner programs lived across HubSpot, Salesforce, Moodle, and scattered documents — high drop-off, duplicate data, fragile manual handoffs between sales and enablement, and a subscription billing system that needed to move providers without losing a single record.",
          solution:
            "Built CinnaLab as the operational hub as sole engineer, end-to-end: guided onboarding, deal registration, lead scoring, and training paths with two-way sync to HubSpot and Salesforce, Documenso for agreements, self-hosted Moodle for e-learning, a Devise + Pundit RBAC system, and ActionCable-powered real-time notifications. Also executed a full Paddle-to-Chargebee billing migration.",
          metrics: [
            "Shipped an entire PRM platform to production in 8 months as the sole engineer",
            "Zero critical incidents and zero auth issues in production since launch",
            "Zero data loss and zero customer disputes across the full Paddle → Chargebee billing cutover",
            "Eliminated manual data entry between CinnaLab and two major CRMs via bi-directional sync",
            "Removed recurring third-party licensing costs by self-hosting Documenso and Moodle from source",
          ],
          engineering: [
            "Multi-tenant subdomain architecture with per-company theming and branded portals",
            "Webhook-driven CRM sync with retries, idempotent Sidekiq jobs, and retry/DLQ handling",
            "Devise + Pundit RBAC across 3 roles (partner, admin, manager), paired with JWT-aware session checks",
            "ActionCable/WebSocket notification system replacing polling entirely",
            "Full Paddle → Chargebee cutover: subscriptions, billing cycles, and webhook verification",
            "Self-hosted Documenso and Moodle in production with SSO and secure Rails iframe embedding",
            "Strict API contracts and validation at Rails boundaries",
          ],
        },
        {
          name: "Intercollegiate",
          url: "https://intercollegiate.co/",
          description:
            "National job board for college athletics — search, filters, and listings at scale for DI / DII / DIII programs and candidates. 2,500+ active listings.",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=380&fit=crop",
          tech: ["Ruby on Rails", "PostgreSQL", "JavaScript", "ActiveAdmin", "Turbo Frames/Streams", "Sidekiq"],
          problem:
            "Recruiters and candidates needed fast, trustworthy search across sport, division, conference, compensation, and role level without painful load times, plus better tools for profile visibility and engagement.",
          solution:
            "Redesigned multi-dimensional faceted search with PostgreSQL indexing and scoped ActiveRecord patterns, and shipped profile claiming, view analytics, saved searches, and an ActiveAdmin recruiter dashboard with real-time filtering.",
          metrics: [
            "Cut search response time by 40% across 2,500+ listings",
            "Tuned multi-parameter search into sub-200ms paths on representative workloads",
            "Delivered 100% on-time against sprint scope, coordinated entirely via written communication with a remote product owner",
          ],
          engineering: [
            "PostgreSQL indexing and scoped ActiveRecord patterns for heavy filter combinations",
            "Geolocation radius filtering alongside faceted search",
            "Profile claiming, 'who viewed' analytics, related-job recommendations, saved searches with Sidekiq email alerts",
            "ActiveAdmin dashboard with Turbo Frames/Streams real-time filtering",
            "N+1 query hotspot passes and performance tuning on hot query paths",
          ],
        },
        {
          name: "Monthend / Controllr",
          url: "https://fly.controllr.app/",
          description:
            "SaaS for month-end close and financial controls — real-time ingestion, QuickBooks sync, and workflows for finance teams handling GAAP-compliant job-costing.",
          image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&h=380&fit=crop",
          tech: ["Ruby on Rails", "React.js", "OAuth", "PostgreSQL", "Devise", "Turbo Streams"],
          problem:
            "Finance teams lacked a single place to run close tasks with clear ownership and audit-friendly history, and needed reconciliation across multiple entities without manual lag.",
          solution:
            "Built a real-time ingestion pipeline from emails, receipts, and construction platforms with automated GAAP job-costing, a bi-directional QuickBooks Online sync, and email + Google OAuth authentication with live, no-refresh UI updates.",
          metrics: [
            "Eliminated manual reconciliation lag in month-end close",
            "Zero reconciliation errors across multi-entity account syncing in production",
            "Delivered OAuth and email auth end-to-end with careful session hygiene",
          ],
          engineering: [
            "Devise + Google OAuth 2.0 with careful callback and token-refresh handling",
            "Bi-directional QuickBooks Online (QBO) sync pipeline across multiple entities",
            "Live, no-refresh CRUD updates across six core modules using React.js + Turbo Streams",
            "Multi-step React onboarding with shared form-state patterns",
          ],
        },
        {
          name: "Docyt",
          url: "https://docyt.com/",
          description:
            "AI-assisted bookkeeping — a dedicated Stripe-facing microservice for payments and subscriptions, integrated with the core accounting product.",
          image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=380&fit=crop",
          tech: ["Ruby on Rails", "Stripe", "Microservices", "Webhooks"],
          problem:
            "Subscription and invoicing logic needed to live in a dedicated service with reliable Stripe webhooks, PCI-aligned handling, and clear reconciliation for hospitality and SMB clients.",
          solution:
            "Designed and built the Stripe-facing microservice from scratch: plans, billing cycles, idempotent webhooks, failure recovery, and handoff to core Docyt services.",
          metrics: [
            "Reduced billing support escalations post-launch",
            "Production-ready Stripe flows for hospitality and accounting lines",
          ],
          engineering: [
            "Service extraction from monolith billing paths",
            "Idempotent webhook processing and defensive error handling",
            "REST contracts between the payment service and platform core",
          ],
        },
        {
          name: "Bullseye Education",
          url: "https://bullseye.education/",
          description:
            "K–12 instructional coaching platform: walkthroughs, in-the-moment feedback, and analytics for school leaders across multiple districts.",
          image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=380&fit=crop",
          tech: ["Ruby on Rails", "React.js", "PostgreSQL"],
          problem:
            "Districts needed consistent coaching workflows and visibility into classroom support instead of one-off spreadsheets or ad hoc tools.",
          solution:
            "Built real-time feedback capture forms, customisable teacher walkthrough views, and a principal/district analytics dashboard, deployed mobile-responsively across multiple school districts.",
          metrics: [
            "Shipped features used live in multiple districts during the school year",
            "Gave leadership same-day visibility into coaching outcomes",
          ],
          engineering: [
            "Feature work spanning Rails services and React client components",
            "Role-aware permissions and views for staff vs. district leaders",
          ],
        },
      ],
    },
    {
      role: "Research & Development Intern",
      company: "Al-Khawarizmi Institute of Computer Science (KICS), UET Lahore",
      companyUrl: "https://www.linkedin.com/company/kics/posts/?feedView=all",
      location: "Lahore, Pakistan",
      duration: "Sep 2023 — Nov 2023",
      points: [
        "Applied research support at KICS, contributing to ongoing R&D initiatives within the institute.",
        "Optimized legacy research code paths and prototyped ideas on short research cycles with faculty-led teams.",
      ],
    },
    {
      role: "Web Development Intern",
      company: "Apex Space",
      companyUrl: "https://www.linkedin.com/company/apexspace/posts/?feedView=all",
      location: "Lahore, Pakistan",
      duration: "Jun 2023 — Aug 2023",
      points: [
        "Developed full-stack features for client web applications; code reviews, daily standups, bug fixes, production deployment support.",
        "Built and refined responsive client sites; practiced agile rituals, reviews, and documentation on student-led deliveries.",
      ],
    },
  ],

  education: [
    {
      degree: "B.S. Computer Science",
      institution: "University of Engineering and Technology (UET), Lahore",
      duration: "2020 — 2024",
      coursework: [
        "Data Structures & Algorithms",
        "Database Systems",
        "Software Engineering",
        "Web Technologies",
        "Operating Systems",
        "Computer Networks",
      ],
      fyp: {
        name: "Urdu Signify",
        description: "GAN-powered Urdu-to-Pakistan Sign Language video animation system (Python, GANs, NLP) — solo end-to-end delivery on a novel deep-learning problem.",
      },
    },
  ],

  // Every skill is { name, detail? }. `detail` is an array of specific sub-items —
  // render skills as clickable/expandable pills (accordion, popover, or tooltip on click)
  // that reveal `detail` when present. Skills with no `detail` array just render as a plain
  // pill with no expand affordance. This directly fixes "clicking AWS shows nothing" —
  // AWS now carries its own service list, and so does every other compound skill.
  skills: {
    backend: [
      { name: "Ruby on Rails 5/6/7" },
      { name: "REST API design" },
      { name: "ActiveRecord" },
      { name: "PostgreSQL" },
      { name: "MySQL" },
      { name: "Redis" },
      { name: "Sidekiq", detail: ["Background job processing", "Retry queues", "Dead-letter-queue (DLQ) handling"] },
      { name: "ActiveJob" },
      { name: "OAuth 2.0" },
      { name: "Multi-tenant architecture", detail: ["Row-level tenancy", "Dynamic subdomain routing", "Per-tenant scoping (model + controller)"] },
      { name: "Service objects" },
      { name: "Hotwire", detail: ["Turbo Drive", "Turbo Frames", "Turbo Streams"] },
      { name: "Stimulus.js" },
      { name: "ActionCable", detail: ["WebSockets", "Rails channels", "Real-time notifications (no polling)"] },
    ],
    frontend: [
      { name: "React.js" },
      { name: "JavaScript (ES6+)" },
      { name: "Material UI (MUI)", detail: ["Component library", "Theme overrides", "Per-client dynamic theming"] },
      { name: "Tailwind CSS" },
      { name: "React Query", detail: ["Server state", "Caching", "Background refetch", "Mutations"] },
      { name: "Redux Toolkit", detail: ["Global state", "Slices"] },
      { name: "React Router v6", detail: ["Nested routes", "Protected route guards"] },
      { name: "Vite" },
      { name: "Responsive / mobile-first UI" },
    ],
    railsGems: [
      { name: "Devise" },
      { name: "Pundit", detail: ["Role-based access control (RBAC)"] },
      { name: "Kaminari" },
      { name: "ActiveAdmin" },
      { name: "ActiveStorage" },
      { name: "bcrypt" },
      { name: "jsonapi-serializer" },
      { name: "FactoryBot" },
      { name: "RSpec" },
    ],
    payments: [
      { name: "Stripe", detail: ["Subscription plans", "Idempotent webhooks", "PCI-aligned handling"] },
      { name: "Paddle", detail: ["Subscription billing", "Webhook verification"] },
      { name: "Chargebee", detail: ["Subscriptions", "Billing cycles", "Full Paddle→Chargebee platform migration"] },
    ],
    integrations: [
      { name: "HubSpot CRM", detail: ["Bi-directional sync", "Conflict resolution", "Idempotent Sidekiq jobs"] },
      { name: "Salesforce", detail: ["Bi-directional sync", "Conflict resolution"] },
      { name: "QuickBooks Online", detail: ["Multi-entity bi-directional sync", "GAAP job-costing"] },
      { name: "Moodle LMS", detail: ["SSO", "Iframe embedding", "Self-hosted deployment"] },
      { name: "Documenso", detail: ["E-signatures", "Self-hosted deployment"] },
    ],
    testingAndDevOps: [
      { name: "RSpec" },
      { name: "Jest" },
      { name: "FactoryBot" },
      { name: "GitHub Actions CI/CD" },
      {
        name: "AWS",
        detail: ["IAM", "VPC", "EC2", "RDS", "S3", "CloudWatch"],
      },
      { name: "Docker" },
      { name: "Heroku" },
      { name: "Linux" },
      { name: "Zero-downtime migrations" },
      { name: "N+1 query optimization" },
    ],
    currentlyLearning: [
      { name: "Django" },
      { name: "Deeper AWS", detail: ["Lambda", "ECR"] },
      { name: "Containerized deployments" },
    ],
    also: [
      { name: "Python" },
      { name: "Node.js" },
      { name: "Microservices" },
      { name: "Third-party API design" },
      { name: "Agile/Scrum" },
    ],
  },

  // Dedicated, first-class open-source section — previously missing from this data file.
  // Each gem gets its own card per the redesign brief; don't bury these as a footnote.
  openSource: {
    combinedDownloads: 5993,
    rubygemsProfile: "https://rubygems.org/profiles/devsyedghani",
    gems: [
      {
        name: "rails-guarddog",
        version: "v0.1.8",
        tagline: "Static security scanner for Rails",
        description:
          "Detects SQL injection, XSS, secrets exposure, unsafe redirects, and mass assignment. Configurable severity, CI/CD-ready.",
        github: "https://github.com/sghani001/rails-guarddog",
        rubygems: "https://rubygems.org/gems/rails-guarddog",
      },
      {
        name: "rails-tenantify",
        version: "v0.1.2",
        tagline: "Row-level multi-tenancy for Rails 7+",
        description:
          "Model/controller scoping, ActiveJob/Sidekiq context propagation, bulk-write protection. Maintained alternative to acts_as_tenant.",
        github: "https://github.com/sghani001/rails-tenantify",
        rubygems: "https://rubygems.org/gems/rails-tenantify",
      },
      {
        name: "rails-persona",
        version: "v0.2.7",
        tagline: "Activity-tracking DSL for behavioural analytics",
        description:
          "Define trackable actions with a clean DSL, then query frequency, recency, inactivity, and full activity logs — all stored in the app's own database.",
        github: "https://github.com/sghani001/rails-persona",
        rubygems: "https://rubygems.org/gems/rails-persona",
      },
      {
        name: "rails-css_unused",
        version: "v0.2.1",
        tagline: "CSS optimizer for Rails view layers",
        description:
          "Scans ERB/HAML/Slim/ViewComponent/Stimulus templates for unused selectors. BEM support, CI exit codes, zero runtime overhead.",
        github: "https://github.com/sghani001/rails-css_unused",
        rubygems: "https://rubygems.org/gems/rails-css_unused",
      },
    ],
  },

  journey: [
    {
      year: "2020",
      title: "Computer Science @ UET",
      description: "Foundations in software engineering, systems, and algorithms; early full-stack coursework and projects.",
    },
    {
      year: "2023",
      title: "Internships",
      description: "Web intern at Apex Space; R&D intern at KICS — shipping under guidance and learning how research maps to code.",
    },
    {
      year: "Aug 2024",
      title: "Associate Software Engineer — Blackstack",
      description: "Joined a product-focused consultancy shipping Rails and React for US-facing SaaS customers.",
    },
    {
      year: "Dec 2024",
      title: "Promoted to Software Engineer",
      description: "Promotion after owning delivery on integrations-heavy products (PRM, payments, recruiting).",
    },
    {
      year: "May 2026",
      title: "Role ended — company-wide downsizing",
      description: "Blackstack downsized company-wide; not performance-related. Since then: deepening AWS, Docker, and background-job expertise, learning Django, and open to Lahore or remote roles.",
    },
  ],

  testimonials: [
    {
      quote:
        "One of the most proactive and technically skilled engineers I've managed. As a Full-Stack Engineer, Ghani took full ownership of critical products, including building complex backend architectures and modern frontend interfaces from scratch. His ability to handle background job processing, API integrations, and database optimization made him an invaluable asset to our engineering workflows. Beyond his core technical execution, his passion for open-source development and clean code consistently raised the standard for our team. A high-impact, reliable developer who learns fast and ships quality software.",
      author: "Muhammad Ali Subhani",
      title: "Software Engineer @ ForeFastSolutions · ex-Blackstack · Syed's mentor and manager — LinkedIn recommendation, Aug 2026",
      url: null,
    },
    {
      quote:
        "Ghani has proven himself to be a phenomenal asset to the company, taking full ownership of his responsibilities and going above and beyond to support his team. His dedication and punctuality truly make a difference in our office.",
      author: "Blackstack Software Solutions",
      title: "Performance bonus & appreciation — 2025",
      url: "https://www.linkedin.com/posts/blackstack-software-solutions_workculture-employeeappreciation-employeecelebration-activity-7396172400092053504-Ci2f",
    },
    {
      quote:
        "Your dedication, respect towards your seniors, and support for your juniors truly sets you apart. You've been a great team member, bringing positive energy that reflects beautifully in our workplace culture. A true technical wizard.",
      author: "Blackstack Software Solutions",
      title: "First work anniversary spotlight",
      url: "https://www.linkedin.com/posts/blackstack-software-solutions_workanniversary-milestone-firstworkanniversary-activity-7356977157857849344-X7fF",
    },
  ],

  // Personal/independent projects, separate from client work and separate from the gems above.
  projects: [
    {
      name: "Online Exam System",
      description:
        "Multi-role exam platform (admin / teacher / student) with role-based navigation, protected route guards, and full exam lifecycle: create → approve → sit → grade.",
      url: "https://github.com/sghani001/Online_Exam_System",
      tech: ["Ruby on Rails", "React.js", "Devise", "Pundit", "PostgreSQL", "RSpec"],
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=380&fit=crop",
    },
    {
      name: "WhatsApp Analyzer",
      description: "Python utilities to parse chats and surface group / direct-message insights.",
      url: "https://github.com/sghani001/Whatsapp_Analyzer",
      tech: ["Python", "Pandas"],
      image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=600&h=380&fit=crop",
    },
    {
      name: "Olympics Analysis",
      description: "Exploratory analysis and charts on historical Olympics data.",
      url: "https://github.com/sghani001/Olympics",
      tech: ["Python", "Data visualization"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=380&fit=crop",
    },
  ],

  engineeringPractices: [
    "REST API design with explicit contracts and validation",
    "Automated tests where they protect regressions (RSpec, Jest)",
    "Git workflows with meaningful review and small diffs",
    "PostgreSQL tuning: indexes, scopes, and explain-driven fixes",
    "SOLID-friendly Rails objects — not god models",
    "Operational thinking for jobs, queues, and integrations",
    "Async-first communication: specs, PRs, and written handover docs across remote-managed products",
  ],

  technicalHighlights: [
    {
      title: "Auth & access",
      desc: "Devise + Pundit RBAC, Google OAuth, JWT-aware session flows, and role-aware UI patterns.",
    },
    {
      title: "Performance",
      desc: "Search and listing endpoints tuned for multi-filter workloads on PostgreSQL — 40% faster on a 2,500+ listing dataset.",
    },
    {
      title: "Integrations",
      desc: "Stripe, Paddle, Chargebee, HubSpot, Salesforce, QuickBooks, Moodle, Documenso — webhooks, retries, and idempotent handlers.",
    },
    {
      title: "Architecture",
      desc: "Multi-tenant subdomain routing, service extraction from monolith billing paths, and a full Paddle→Chargebee migration with zero data loss.",
    },
  ],

  // For the "Download Resume" buttons in the Contact section per the redesign brief —
  // point these at the actual hosted PDF paths once uploaded to the new site.
  resumeDownloads: [
    { label: "Download Resume (Full-Stack)", file: "/resume/Syed_Ghani_FullStack.pdf" },
    { label: "Download Resume (Remote-Focused)", file: "/resume/Syed_Ghani_Remote.pdf" },
  ],
};

export default resumeData;