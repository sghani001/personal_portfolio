// Syed Ghani — portfolio & resume content (single source of truth)

import tenantifyImage from "../assets/images/tenantify.png";
import personaImage from "../assets/images/persona.png";
import guarddogImage from "../assets/images/guarddog.png";
import cssUnusedImage from "../assets/images/css_unsed.png";

const resumeData = {
  name: "Syed Ghani",
  title: "Full-Stack Engineer",
  identity: "Full-Stack Engineer — Rails, React, Payments & Multi-Tenant SaaS",
  availability: "Available immediately",
  philosophy:
    "I build for the parts of a product that can't fail quietly — auth, billing, and data isolation.",
  titles: [
    "Full-Stack Engineer",
    "Ruby on Rails Developer",
    "React.js Developer",
    "Payments & Billing Engineer",
    "Multi-Tenant SaaS Engineer",
    "Problem Solver",
  ],
  tagline: "Full-Stack Engineer — Rails, React, Payments & Multi-Tenant SaaS",
  headline:
    "Building production SaaS that handles real money and real data.",
  subHeadline:
    "I build for the parts of a product that can't fail quietly — auth, billing, and data isolation.",
  email: "2020cs669@student.uet.edu.pk",
  emailPersonal: "syedghani001@gmail.com",
  location: "Lahore, Pakistan",
  phone: "+92 309 0204019",
  portfolioUrl: "https://sghani001.github.io/personal_portfolio/",
  leetcodeUrl: "https://leetcode.com/syedghani/",

  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/syed-m-ghani-357ba4234", icon: "linkedin" },
    { name: "GitHub", url: "https://github.com/sghani001", icon: "github" },
    { name: "Email", url: "mailto:syedghani001@gmail.com", icon: "email" },
  ],

  heroBullets: [
    "Rails APIs, PostgreSQL, and background work with Sidekiq / Redis",
    "React SPAs: auth flows, dashboards, and integration-heavy UIs",
    "Third-party systems: Stripe, HubSpot, Moodle, Documenso, webhooks",
  ],

  summary:
    "Software engineer focused on Ruby on Rails and React. I design and ship end-to-end features for SaaS products — REST APIs, data modeling, background jobs, and accessible front ends — in agile teams where reliability and pace both matter. Recent work spans AI-enabled PRM, college recruiting marketplaces, K–12 coaching platforms, fintech-style billing services, and AWS-hosted deployments with ongoing learning in deployment and workflow automation services.",

  aboutExtra:
    "I care about clear boundaries between domains, tests that earn their keep (RSpec / Jest), and integrations that survive real traffic. Comfortable owning a slice of the stack from migration to deploy, with AWS-hosted deployment patterns and continued learning in deployment and workflow automation services.",

  experience: [
    {
      company: "Blackstack Software Solutions",
      companyUrl: "https://www.linkedin.com/company/blackstack-software-solutions/posts/?feedView=all",
      location: "Lahore, Pakistan · Remote-friendly",
      roles: [
        { title: "Software Engineer", duration: "Aug 2025 — May 2026" },
        { title: "Associate Software Engineer", duration: "Aug 2024 — Aug 2025" },
      ],
      projects: [
        {
          name: "CinnaLab",
          url: "https://cinnalab.io/",
          description:
            "AI-assisted Partner Relationship Management: partner onboarding, deal registration, training, and e-signatures with CRM and LMS sync.",
          image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=380&fit=crop",
          tech: ["React.js", "Ruby on Rails", "HubSpot API", "Moodle", "Documenso", "Redis", "Sidekiq"],
          problem:
            "Partner programs lived across HubSpot, Moodle, and documents — high drop-off, duplicate data, and fragile manual handoffs between sales and enablement.",
          solution:
            "Built CinnaLab as the operational hub: guided onboarding, deal registration, and training paths with two-way sync to HubSpot and Moodle plus Documenso for agreements.",
          metrics: [
            "Cut onboarding cycle time materially through guided flows and automation",
            "Standardized e-signature and document paths via Documenso",
            "Reduced manual re-entry between CRM and LMS via resilient webhooks",
          ],
          engineering: [
            "Webhook-driven sync with retries, idempotency-minded handlers, and clear audit trails",
            "JWT-based session model alongside secure server-side checks",
            "Sidekiq queues for imports, exports, and long-running partner operations",
            "Strict API contracts and validation at Rails boundaries",
          ],
        },
        {
          name: "Intercollegiate",
          url: "https://intercollegiate.co/",
          description:
            "National job board for college athletics — search, filters, and listings at scale for DI / DII / DIII programs and candidates.",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=380&fit=crop",
          tech: ["Ruby on Rails", "PostgreSQL", "JavaScript", "Performance tuning"],
          problem:
            "Recruiters and candidates needed fast, trustworthy search across sport, division, conference, compensation, and role level without painful load times.",
          solution:
            "Implemented indexed, composable querying and a Rails-centric architecture that keeps filters snappy as listing volume grows.",
          metrics: [
            "2,500+ concurrent listings with responsive filter UX",
            "Tuned multi-parameter search into sub-200ms paths on representative workloads",
            "Served steady daily traffic from athletic departments and applicants",
          ],
          engineering: [
            "PostgreSQL indexing and scoped ActiveRecord patterns for heavy filter combinations",
            "Presenter-style view layer to keep complex search readable",
            "Performance passes on N+1 hotspots and hot query paths",
          ],
        },
        {
          name: "Bullseye",
          url: "https://bullseye.education/",
          description:
            "K–12 instructional coaching: walkthroughs, in-the-moment feedback (web / mobile signals), and analytics for school leaders.",
          image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=380&fit=crop",
          tech: ["Ruby on Rails", "React.js", "PostgreSQL"],
          problem:
            "Districts needed consistent coaching workflows and visibility into classroom support — not one-off spreadsheets or ad hoc tools.",
          solution:
            "Contributed features across coaching workflows, feedback capture, and reporting surfaces used by principals and district leads.",
          metrics: [
            "Shipped iterative improvements alongside product and instructional design",
            "Hardened flows used in live districts during the school year",
          ],
          engineering: [
            "Feature work spanning Rails services and React client components",
            "Collaboration on permissions and role-aware views for staff vs leaders",
          ],
        },
        {
          name: "Docyt",
          url: "https://docyt.com/",
          description:
            "AI-assisted bookkeeping — microservices for payments and subscriptions integrated with the core accounting product.",
          image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=380&fit=crop",
          tech: ["Ruby on Rails", "Stripe", "Microservices", "Webhooks"],
          problem:
            "Subscription and invoicing logic needed to live in a dedicated service with reliable Stripe webhooks and clear reconciliation.",
          solution:
            "Designed and implemented the Stripe-facing microservice: plans, billing cycles, webhooks, and handoff to core Docyt services.",
          metrics: [
            "Production-ready Stripe flows for hospitality and accounting lines",
            "Webhook handling with operational logging for finance teams",
          ],
          engineering: [
            "Service extraction from monolith billing paths",
            "Idempotent webhook processing and defensive error handling",
            "REST contracts between payment service and platform core",
          ],
        },
        {
          name: "Monthend / Controllr",
          url: "https://fly.controllr.app/",
          description:
            "SaaS for month-end close and controls — auth, onboarding, and workflows for finance teams.",
          image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&h=380&fit=crop",
          tech: ["Ruby on Rails", "React.js", "OAuth", "PostgreSQL", "Devise"],
          problem:
            "Finance teams lacked a single place to run close tasks with clear ownership and audit-friendly history.",
          solution:
            "Built authentication (email + Google OAuth), onboarding, and product surfaces that support recurring close and control tasks.",
          metrics: [
            "Delivered OAuth and email auth end-to-end with session hygiene",
            "Reduced friction in first-run setup for new orgs",
          ],
          engineering: [
            "Devise + Google OAuth 2.0 with careful callback and token refresh handling",
            "Multi-step React onboarding with shared form state patterns",
            "REST collaboration on control and checklist endpoints",
          ],
        },
      ],
    },
    {
      role: "Research & Development Intern",
      company: "Al-Khawarizmi Institute of Computer Science (KICS), UET Lahore",
      companyUrl: "https://www.linkedin.com/company/kics/posts/?feedView=all",
      location: "Lahore, Pakistan",
      duration: "Jul 2023 — Oct 2023",
      points: [
        "Optimized legacy research code paths and prototyped ideas on short research cycles.",
        "Worked with faculty-led teams to turn requirements into runnable experiments.",
      ],
    },
    {
      role: "Web Development Intern",
      company: "Apex Space",
      companyUrl: "https://www.linkedin.com/company/apexspace/posts/?feedView=all",
      location: "Lahore, Pakistan",
      duration: "Jun 2023 — Aug 2023",
      points: [
        "Built and refined responsive client sites; improved perceived performance on key pages.",
        "Practiced agile rituals, reviews, and documentation on student-led deliveries.",
      ],
    },
  ],

  education: [
    {
      degree: "B.S. Computer Science",
      institution: "University of Engineering and Technology (UET), Lahore",
      duration: "2020 — 2024",
      gpa: "3.1",
    },
  ],

  skills: {
    core: [
      "Ruby on Rails",
      "React.js",
      "JavaScript (ES6+)",
      "REST APIs",
      "PostgreSQL",
      "MySQL",
      "Redis",
      "Sidekiq",
    ],
    integrations: ["Stripe", "HubSpot", "Moodle", "Documenso", "Git", "Linux", "Docker (basics)", "AWS"],
    frontend: ["Tailwind CSS", "Vite", "React Query", "React Router", "Redux"],
    also: ["Python", "Microservices", "Third-party API design", "RSpec"],
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
      title: "Software Engineer",
      description: "Promotion after owning delivery on integrations-heavy products (PRM, payments, recruiting).",
    },
  ],

  testimonials: [
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

  projects: [
    {
      name: "Online Exam System",
      description:
        "Capstone-style Rails app: exam authoring, approvals, student attempts, grading, and reporting (PostgreSQL).",
      url: "https://github.com/sghani001/Online_Exam_System",
      tech: ["Rails", "PostgreSQL", "RSpec"],
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=380&fit=crop",
    },
    {
      name: "rails-guarddog",
      description:
        "Production-grade security scanner for Rails apps. Detects vulnerabilities Brakeman misses: AI/LLM injection, DoS/ReDoS patterns, supply chain typosquatting, IDOR gaps, and more. 12 comprehensive security checkers with CWE/OWASP mappings.",
      url: "https://github.com/sghani001/rails-guarddog",
      tech: ["Ruby", "Security", "AST Analysis", "Brakeman", "CWE", "OWASP"],
      image: guarddogImage,
    },
    {
      name: "rails-persona",
      description:
        "Model-level behavioral analytics engine for Rails. Tracks user actions, analyzes onboarding friction, and handles heavy payloads using bulk database inserts and Sidekiq background jobs natively with zero external dependencies.",
      url: "https://github.com/sghani001/rails-persona",
      tech: ["Ruby", "Rails Engine", "Sidekiq", "Analytics"],
      image: personaImage,
    },
    {
      name: "rails-tenantify",
      description:
        "Lightweight multi-tenancy infrastructure for SaaS applications. Automates sub-domain/request-based routing, secure database isolation scoping, and streamlined tenant onboarding workflows without the bloat of heavy legacy packages.",
      url: "https://github.com/sghani001/rails-tenantify",
      tech: ["Ruby on Rails", "SaaS Architecture", "Multi-tenancy"],
      image: tenantifyImage,
    },
    {
      name: "rails-css_unused",
      description:
        "Performance-focused static analysis tool. Scans views, templates, and view components to locate and strip dead, unused CSS classes blocking your asset pipeline payload — ideal for refactoring large legacy codebases.",
      url: "https://github.com/sghani001/rails-css_unused",
      tech: ["Ruby", "Static Analysis", "Asset Pipeline"],
      image: cssUnusedImage,
    },
  ],

  engineeringPractices: [
    "REST API design with explicit contracts and validation",
    "Automated tests where they protect regressions (RSpec, Jest)",
    "Git workflows with meaningful review and small diffs",
    "PostgreSQL tuning: indexes, scopes, and explain-driven fixes",
    "SOLID-friendly Rails objects — not god models",
    "Operational thinking for jobs, queues, integrations, and AWS-backed deployment workflows",
  ],

  technicalHighlights: [
    {
      title: "Auth & access",
      desc: "JWT-aware flows, Devise, Google OAuth, and role-aware UI patterns.",
    },
    {
      title: "Performance",
      desc: "Search and listing endpoints tuned for multi-filter workloads on PostgreSQL.",
    },
    {
      title: "Integrations",
      desc: "Stripe, HubSpot, Moodle, Documenso — webhooks, retries, and idempotent handlers.",
    },
    {
      title: "Architecture",
      desc: "Extracted billing into a focused service with clear boundaries to the monolith.",
    },
  ],
  cachedStats: {
    github: {
      public_repos: 24,
      followers: 16,
      following: 25,
      avatar_url: "https://avatars.githubusercontent.com/sghani001",
    },
    leetcode: {
      solvedProblem: 35,
      easySolved: 18,
      mediumSolved: 12,
      hardSolved: 5,
      totalEasy: 946,
      totalMedium: 2061,
      totalHard: 936,
      acceptanceRate: "74.6",
      beatsPercentage: "50.2",
      ranking: 3174284,
    }
  },
  telemetry: [
    { key: "gem-downloads", value: "3,809", label: "gem downloads" },
    { key: "saas-products", value: "6", label: "saas products" },
    { key: "critical-incidents", value: "0", label: "critical incidents" },
    { key: "infra-savings", value: "$800+/mo", label: "infra savings" },
  ],

  metrics: [
    { value: "0", label: "Critical billing incidents", detail: "Production reliability" },
    { value: "40%", label: "Query performance gain", detail: "Intercollegiate search" },
    { value: "90%", label: "Manual form work eliminated", detail: "Cross-domain bookmarking" },
    { value: "3,809", label: "Gem downloads", detail: "4 published Ruby gems" },
    { value: "6", label: "SaaS products shipped", detail: "Sole or core engineer" },
    { value: "$800+", label: "Monthly infra savings", detail: "Architecture & tuning" },
  ],

  selectedWork: [
    {
      id: "01",
      name: "CinnaLab PRM",
      subtitle: "AI-Powered Partner Relationship Management",
      status: "Production",
      tags: ["Multi-tenant", "CRM Sync", "Billing Migration", "Sole Engineer"],
      url: "https://cinnalab.io/",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=380&fit=crop",
      tech: ["React.js", "Ruby on Rails", "HubSpot", "Moodle", "Documenso", "Sidekiq", "Redis"],
      role: "Sole engineer — architecture, delivery, and ops end-to-end",
      deployContext: "Multi-tenant PRM with CRM/LMS sync and billing migration paths",
      problem:
        "Partner programs lived across HubSpot, Moodle, and documents — high drop-off, duplicate data, and fragile manual handoffs between sales and enablement.",
      solution:
        "Built CinnaLab as the operational hub: guided onboarding, deal registration, and training paths with two-way sync to HubSpot and Moodle plus Documenso for agreements.",
      result: [
        "Cut onboarding cycle time through guided flows and automation",
        "Zero critical billing incidents during Chargebee migration",
        "Reduced manual re-entry between CRM and LMS via resilient webhooks",
      ],
      metrics: [
        "Cut onboarding cycle time materially through guided flows and automation",
        "Standardized e-signature and document paths via Documenso",
        "Reduced manual re-entry between CRM and LMS via resilient webhooks",
      ],
      engineering: [
        "Webhook-driven sync with retries, idempotency-minded handlers, and clear audit trails",
        "JWT-based session model alongside secure server-side checks",
        "Sidekiq queues for imports, exports, and long-running partner operations",
      ],
    },
    {
      id: "02",
      name: "Intercollegiate Athletics Job Board",
      subtitle: "National recruiting marketplace",
      status: "Production",
      tags: ["2,500+ Listings", "Faceted Search", "40% Query Speedup"],
      url: "https://intercollegiate.co/",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=380&fit=crop",
      tech: ["Ruby on Rails", "PostgreSQL", "JavaScript"],
      role: "Core backend engineer — search architecture and performance",
      deployContext: "2,500+ concurrent listings serving DI/DII/DIII programs daily",
      problem:
        "Recruiters and candidates needed fast, trustworthy search across sport, division, conference, compensation, and role level without painful load times.",
      solution:
        "Implemented indexed, composable querying and a Rails-centric architecture that keeps filters snappy as listing volume grows.",
      result: [
        "40% query performance improvement on multi-filter search paths",
        "2,500+ concurrent listings with responsive filter UX",
        "Sub-200ms paths on representative workloads",
      ],
      metrics: [
        "2,500+ concurrent listings with responsive filter UX",
        "40% query performance improvement on hot search paths",
        "Served steady daily traffic from athletic departments and applicants",
      ],
      engineering: [
        "PostgreSQL indexing and scoped ActiveRecord patterns for heavy filter combinations",
        "Presenter-style view layer to keep complex search readable",
        "Performance passes on N+1 hotspots and hot query paths",
      ],
    },
    {
      id: "03",
      name: "Controllr / Monthend",
      subtitle: "Finance SaaS — month-end close & controls",
      status: "Production",
      tags: ["QBO Sync", "GAAP Job-Costing", "Real-Time Ingestion"],
      url: "https://fly.controllr.app/",
      image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&h=380&fit=crop",
      tech: ["Ruby on Rails", "React.js", "QuickBooks Online", "PostgreSQL", "Devise"],
      role: "Full-stack engineer — auth, onboarding, and finance workflows",
      deployContext: "Production finance SaaS with OAuth and QBO integration paths",
      problem:
        "Finance teams lacked a single place to run close tasks with clear ownership, QBO sync, and audit-friendly history.",
      solution:
        "Built authentication (email + Google OAuth), onboarding, and product surfaces that support recurring close, job-costing, and control tasks with QBO sync.",
      result: [
        "Delivered OAuth and email auth end-to-end with session hygiene",
        "Real-time ingestion paths for finance data",
        "Reduced friction in first-run setup for new orgs",
      ],
      metrics: [
        "Delivered OAuth and email auth end-to-end with session hygiene",
        "Reduced friction in first-run setup for new orgs",
      ],
      engineering: [
        "Devise + Google OAuth 2.0 with careful callback and token refresh handling",
        "Multi-step React onboarding with shared form state patterns",
        "REST collaboration on control and checklist endpoints",
      ],
    },
    {
      id: "04",
      name: "Cross-Domain Form Bookmark",
      subtitle: "Persistent form state across sessions",
      status: "Production",
      tags: ["90% Reduction", "Manual Form-Filling", "Cross-Domain"],
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=380&fit=crop",
      tech: ["Ruby on Rails", "React.js", "PostgreSQL", "Redis"],
      role: "Feature owner — design through production deploy",
      deployContext: "Shipped across multi-step onboarding flows in production SaaS",
      problem:
        "Users repeatedly filled the same fields across long, multi-step forms — causing drop-off and support load when sessions expired or users switched devices.",
      solution:
        "Built a cross-domain bookmark layer that persists partial form state securely, restores on return, and syncs across related product surfaces.",
      result: [
        "90% reduction in manual re-entry for returning users",
        "Lower abandonment on multi-step onboarding flows",
        "Encrypted, scoped storage with tenant-aware isolation",
      ],
      metrics: [
        "90% reduction in manual form-filling for returning users",
        "Lower abandonment on multi-step onboarding flows",
      ],
      engineering: [
        "Scoped Redis + PostgreSQL persistence with TTL and encryption at rest",
        "React hooks for seamless restore without breaking validation",
        "Tenant-aware isolation for multi-tenant SaaS contexts",
      ],
    },
    {
      id: "05",
      name: "Docyt Stripe Microservice",
      subtitle: "PCI-aligned payments service",
      status: "Production",
      tags: ["PCI-Aligned", "Idempotent Webhooks", "Microservices"],
      url: "https://docyt.com/",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=380&fit=crop",
      tech: ["Ruby on Rails", "Stripe", "Webhooks", "Microservices"],
      role: "Service owner — Stripe integration and webhook pipeline",
      deployContext: "Extracted billing microservice in production accounting platform",
      problem:
        "Subscription and invoicing logic needed to live in a dedicated service with reliable Stripe webhooks and clear reconciliation.",
      solution:
        "Designed and implemented the Stripe-facing microservice: plans, billing cycles, idempotent webhooks, and handoff to core Docyt services.",
      result: [
        "Production-ready Stripe flows for hospitality and accounting lines",
        "Zero duplicate charges under webhook retry storms",
        "Operational logging for finance teams",
      ],
      metrics: [
        "Production-ready Stripe flows for hospitality and accounting lines",
        "Webhook handling with operational logging for finance teams",
      ],
      engineering: [
        "Service extraction from monolith billing paths",
        "Idempotent webhook processing and defensive error handling",
        "REST contracts between payment service and platform core",
      ],
    },
  ],

  architecture: {
    groups: [
      {
        id: "backend",
        label: "Backend Core",
        color: "#c0392b",
        nodes: [
          { id: "rails", label: "Ruby on Rails", role: "Primary application framework across all shipped SaaS products.", deploy: "API boundaries, service objects, and domain-driven models with strict validation." },
          { id: "activerecord", label: "ActiveRecord", role: "Data layer for multi-tenant scoping, migrations, and complex query paths.", deploy: "Indexed scopes and explain-driven tuning on hot listing and billing queries." },
          { id: "sidekiq", label: "Sidekiq", role: "Powers webhook processing, CRM sync jobs, and billing retry/DLQ handling across every product shipped.", deploy: "Idempotent job design prevents duplicate CRM writes under retry storms." },
          { id: "activejob", label: "ActiveJob", role: "Unified job interface for async imports, exports, and notification pipelines.", deploy: "Queue segregation by priority — billing retries never block user-facing jobs." },
        ],
      },
      {
        id: "frontend",
        label: "Frontend",
        color: "#61dafb",
        nodes: [
          { id: "react", label: "React.js", role: "SPA dashboards, auth flows, and integration-heavy UIs for PRM and finance products.", deploy: "Component-driven architecture with shared form state and role-aware views." },
          { id: "redux", label: "Redux Toolkit", role: "Predictable state for complex multi-step onboarding and admin surfaces.", deploy: "Slice-per-domain pattern keeps billing and auth state isolated." },
          { id: "react-query", label: "React Query", role: "Server-state caching for listing search, dashboards, and live metrics.", deploy: "Stale-while-revalidate on filter-heavy search endpoints." },
          { id: "tailwind", label: "TailwindCSS", role: "Utility-first styling for rapid UI iteration on product surfaces.", deploy: "Design tokens aligned with multi-tenant white-label theming." },
          { id: "mui", label: "Material UI", role: "Accessible component library for admin dashboards and data tables.", deploy: "Themed overrides for consistent ops-console aesthetic." },
        ],
      },
      {
        id: "databases",
        label: "Databases",
        color: "#336791",
        nodes: [
          { id: "postgresql", label: "PostgreSQL", role: "Primary datastore for multi-tenant SaaS — listings, billing, and audit trails.", deploy: "Composite indexes on faceted search; row-level tenant scoping." },
          { id: "mysql", label: "MySQL", role: "Legacy datastore support on select client deployments.", deploy: "Migration-safe schema changes with zero-downtime patterns." },
          { id: "redis", label: "Redis", role: "Cache, session store, Sidekiq backend, and form-bookmark persistence.", deploy: "TTL-scoped keys with tenant-aware namespacing." },
        ],
      },
      {
        id: "payments",
        label: "Payments",
        color: "#635bff",
        nodes: [
          { id: "stripe", label: "Stripe", role: "Subscription billing, invoicing, and webhook-driven reconciliation.", deploy: "Idempotent webhook handlers with DLQ for failed events." },
          { id: "paddle", label: "Paddle", role: "Alternative payment provider for international billing paths.", deploy: "Provider-agnostic billing abstraction layer." },
          { id: "chargebee", label: "Chargebee", role: "Subscription management and billing migration target for PRM product.", deploy: "Zero-incident migration with parallel-run validation period." },
        ],
      },
      {
        id: "integrations",
        label: "Integrations",
        color: "#ff7a59",
        nodes: [
          { id: "hubspot", label: "HubSpot", role: "Two-way CRM sync for partner onboarding, deals, and enablement.", deploy: "Webhook + polling hybrid with retry and dedup keys." },
          { id: "salesforce", label: "Salesforce", role: "Enterprise CRM integration for deal registration flows.", deploy: "Bulk API for initial migration; REST for ongoing sync." },
          { id: "qbo", label: "QuickBooks Online", role: "Finance data sync for month-end close and job-costing.", deploy: "OAuth token refresh with encrypted credential storage." },
          { id: "moodle", label: "Moodle", role: "LMS integration for partner training paths and completion tracking.", deploy: "Course enrollment sync with progress webhooks." },
          { id: "documenso", label: "Documenso", role: "E-signature and document workflow for partner agreements.", deploy: "Signed webhook verification and status polling fallback." },
        ],
      },
      {
        id: "devops",
        label: "DevOps",
        color: "#ff9900",
        nodes: [
          { id: "docker", label: "Docker", role: "Containerized dev and staging environments.", deploy: "Multi-stage builds for Rails + Sidekiq worker images." },
          { id: "github-actions", label: "GitHub Actions", role: "CI/CD pipelines — test, lint, and deploy gates.", deploy: "RSpec + Brakeman + guarddog in PR checks." },
          { id: "aws", label: "AWS", role: "Production infra — IAM, VPC, EC2, RDS, S3, CloudWatch.", deploy: "$800+/mo savings through right-sizing and query tuning." },
          { id: "heroku", label: "Heroku", role: "Rapid deploy target for client MVPs and staging.", deploy: "Review apps for integration testing against sandbox APIs." },
        ],
      },
      {
        id: "security",
        label: "Security & Testing",
        color: "#10b981",
        nodes: [
          { id: "devise", label: "Devise", role: "Authentication backbone — email, OAuth, and session management.", deploy: "Google OAuth 2.0 with secure callback handling." },
          { id: "pundit", label: "Pundit", role: "Authorization policies for role-aware, tenant-scoped access.", deploy: "Policy objects per resource — no authorization in controllers." },
          { id: "rspec", label: "RSpec", role: "Test suite for models, services, and integration paths.", deploy: "FactoryBot fixtures for multi-tenant test isolation." },
          { id: "guarddog", label: "rails-guarddog", role: "Custom security scanner — 12 checkers beyond Brakeman coverage.", deploy: "CI exit codes block merges on critical findings." },
        ],
      },
    ],
  },

  openSourceGems: [
    {
      name: "rails-guarddog",
      rubygemsName: "rails-guarddog",
      githubUrl: "https://github.com/sghani001/rails-guarddog",
      description: "Production-grade security scanner for Rails apps. Detects vulnerabilities Brakeman misses.",
      snippet: "Guarddog.scan!(app_root: Rails.root)\n# => exits 1 on critical findings",
      image: guarddogImage,
      tech: ["Ruby", "AST Analysis", "CWE", "OWASP"],
    },
    {
      name: "rails-persona",
      rubygemsName: "rails-persona",
      githubUrl: "https://github.com/sghani001/rails-persona",
      description: "Model-level behavioral analytics engine. Tracks user actions and onboarding friction with zero external deps.",
      snippet: "Persona.track(user, :onboarding_step, metadata: { step: 3 })",
      image: personaImage,
      tech: ["Ruby", "Rails Engine", "Sidekiq"],
    },
    {
      name: "rails-tenantify",
      rubygemsName: "rails-tenantify",
      githubUrl: "https://github.com/sghani001/rails-tenantify",
      description: "Lightweight multi-tenancy infrastructure. Sub-domain routing, DB isolation, and tenant onboarding.",
      snippet: "Tenantify.scope(current_tenant) { User.all }",
      image: tenantifyImage,
      tech: ["Ruby on Rails", "Multi-tenancy", "SaaS"],
    },
    {
      name: "rails-css_unused",
      rubygemsName: "rails-css_unused",
      githubUrl: "https://github.com/sghani001/rails-css_unused",
      description: "Static analysis tool that finds and strips dead CSS classes blocking your asset pipeline.",
      snippet: "CssUnused.scan!(views_path: 'app/views')",
      image: cssUnusedImage,
      tech: ["Ruby", "Static Analysis", "Asset Pipeline"],
    },
  ],

  leadership: [
    {
      title: "Sole Engineer — CinnaLab PRM",
      desc: "Architecture, delivery, and ops ownership end-to-end on a multi-tenant PRM with CRM sync, billing migration, and LMS integration.",
    },
    {
      title: "Cross-team vendor coordination",
      desc: "Direct integration work with HubSpot, Salesforce, and Chargebee — translating vendor API constraints into reliable production pipelines.",
    },
    {
      title: "Open-source maintainer",
      desc: "Triaging issues, versioning, and publishing 4 public Ruby gems with 3,809+ combined downloads on RubyGems.org.",
    },
  ],

  techArsenal: {
    Languages: ["Ruby", "JavaScript (ES6+)", "Python", "SQL", "HTML/CSS"],
    Frameworks: ["Ruby on Rails", "React.js", "Redux Toolkit", "React Query", "ActiveJob", "Sidekiq"],
    Databases: ["PostgreSQL", "MySQL", "Redis"],
    Payments: ["Stripe", "Paddle", "Chargebee"],
    Integrations: ["HubSpot", "Salesforce", "QuickBooks Online", "Moodle", "Documenso"],
    DevOps: ["Docker", "GitHub Actions", "AWS (IAM, VPC, EC2, RDS, S3, CloudWatch)", "Heroku", "Linux"],
    "Testing & Security": ["RSpec", "FactoryBot", "Jest", "Devise", "Pundit", "rails-guarddog", "Brakeman"],
  },
};

export default resumeData;
