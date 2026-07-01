// Syed Ghani — portfolio & resume content (single source of truth)

const resumeData = {
  name: "Syed Ghani",
  title: "Software Engineer",
  titles: [
    "Software Engineer",
    "Ruby on Rails Developer",
    "React.js Developer",
    "Full Stack Engineer",
    "API Specialist",
    "Problem Solver"
  ],
  tagline: "Full-Stack Engineer · Ruby on Rails & React",
  headline:
    "I design and ship production SaaS products — from schema design and REST APIs to polished React interfaces and third-party integrations.",
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
    "Software engineer focused on Ruby on Rails and React. I design and ship end-to-end features for SaaS products — REST APIs, data modeling, background jobs, and accessible front ends — in agile teams where reliability and pace both matter. Recent work spans AI-enabled PRM, college recruiting marketplaces, K–12 coaching platforms, and fintech-style billing services.",

  aboutExtra:
    "I care about clear boundaries between domains, tests that earn their keep (RSpec / Jest), and integrations that survive real traffic. Comfortable owning a slice of the stack from migration to deploy.",

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
    integrations: ["Stripe", "HubSpot", "Moodle", "Documenso", "Git", "Linux", "Docker (basics)"],
    frontend: ["Tailwind CSS", "Vite", "React Query", "React Router", "Redux"],
    also: ["Python", "Node.js", "Microservices", "Third-party API design", "RSpec", "Jest"],
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
      image: "https://images.unsplash.com/photo-1581092334490-2f9c7e8e1e9c?w=600&h=380&fit=crop",
    },
    {
      name: "rails-persona",
      description:
        "Model-level behavioral analytics engine for Rails. Tracks user actions, analyzes onboarding friction, and handles heavy payloads using bulk database inserts and Sidekiq background jobs natively with zero external dependencies.",
      url: "https://github.com/sghani001/rails-persona",
      tech: ["Ruby", "Rails Engine", "Sidekiq", "Analytics"],
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=380&fit=crop",
    },
    {
      name: "rails-tenantify",
      description:
        "Lightweight multi-tenancy infrastructure for SaaS applications. Automates sub-domain/request-based routing, secure database isolation scoping, and streamlined tenant onboarding workflows without the bloat of heavy legacy packages.",
      url: "https://github.com/sghani001/rails-tenantify",
      tech: ["Ruby on Rails", "SaaS Architecture", "Multi-tenancy"],
      image: "https://images.unsplash.com/photo-1508830524289-0adcbe822b40?w=600&h=380&fit=crop",
    },
    {
      name: "rails-css_unused",
      description:
        "Performance-focused static analysis tool. Scans views, templates, and view components to locate and strip dead, unused CSS classes blocking your asset pipeline payload — ideal for refactoring large legacy codebases.",
      url: "https://github.com/sghani001/rails-css_unused",
      tech: ["Ruby", "Static Analysis", "Asset Pipeline"],
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=380&fit=crop",
    },
  ],

  engineeringPractices: [
    "REST API design with explicit contracts and validation",
    "Automated tests where they protect regressions (RSpec, Jest)",
    "Git workflows with meaningful review and small diffs",
    "PostgreSQL tuning: indexes, scopes, and explain-driven fixes",
    "SOLID-friendly Rails objects — not god models",
    "Operational thinking for jobs, queues, and integrations",
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
  metrics: [
    { value: "6", label: "SaaS products shipped", detail: "Ruby on Rails + React" },
    { value: "3.8k+", label: "Gem downloads", detail: "Open-source Rails engines" },
    { value: "15+", label: "Third-party integrations", detail: "Stripe, HubSpot, Moodle, Documenso" },
    { value: "$800+", label: "Monthly cloud cost savings", detail: "Performance & architecture wins" },
  ],
};

export default resumeData;
