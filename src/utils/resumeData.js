// Syed Ghani — portfolio single source of truth (v3 — from updates.md)
// Photo: /syed_ghani.jpg (real headshot in public/)

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
  linkedinUrl: "https://www.linkedin.com/in/syedmghani/",
  githubUrl: "https://github.com/sghani001",
  rubygemsProfile: "https://rubygems.org/profiles/devsyedghani",
  photo: "/syed_ghani.jpg",

  availability: {
    status: "Available immediately",
    modes: [
      "Full-time — on-site / hybrid (Lahore)",
      "Full-time — remote (global)",
      "Contract — remote (global)",
    ],
    note: "Currently interviewing. Open to Lahore-based product studios/agencies and remote-first teams worldwide.",
  },

  credibilityStrip: [
    "6 SaaS Products Shipped",
    "Sole Engineer on a Production PRM",
    "4 Published Rails Gems",
    "Gem Downloads (live from RubyGems)",
  ],

  summary:
    "Full-stack engineer focused on Ruby on Rails and React who has shipped and owned a production SaaS platform end-to-end — not just contributed to one. As sole engineer on CinnaLab PRM, built the entire system from zero to production in 8 months: multi-tenant React/Rails architecture, bi-directional HubSpot/Salesforce CRM sync, a zero-data-loss Paddle-to-Chargebee billing migration, and a Devise + Pundit RBAC system with ActionCable-powered real-time notifications — running with zero critical incidents since launch. Across 6 SaaS products in AI/PRM, fintech, ed-tech, and college athletics, the pattern repeats: given ambiguous scope, ships working production systems, not prototypes — entirely async where needed, with 100% on-time sprint delivery. Also maintains 4 open-source Rails gems with {GEM_DOWNLOADS} combined downloads. Following a company-wide downsizing at Blackstack (May 2026, not performance-related), has used the interim to deepen Docker, AWS, and background-job expertise, and to learn Django.",

  aboutExtra:
    "I care about clear boundaries between domains, tests that earn their keep (RSpec / Jest), and integrations that survive real traffic. Comfortable owning a slice of the stack from migration to deploy — or the whole thing, solo, from architecture to launch.",

  // ── Rails Proficiency pillars ─────────────────────────────────────────────
  railsProficiency: [
    {
      icon: "architecture",
      title: "Architecture & Scale",
      points: [
        "Multi-tenant Rails architecture with dynamic subdomain routing (CinnaLab)",
        "Row-level tenancy patterns — also shipped as the rails-tenantify gem",
        "Background job systems with Sidekiq/Redis: retries, idempotency, and dead-letter-queue handling",
        "ActionCable/WebSockets for real-time notifications, replacing polling entirely",
      ],
    },
    {
      icon: "integrations",
      title: "Data & Integrations",
      points: [
        "Bi-directional CRM sync (HubSpot + Salesforce) with conflict resolution and idempotent Sidekiq jobs",
        "QuickBooks Online multi-entity sync pipeline (Controllr/Monthend)",
        "PostgreSQL query and index optimization — cut faceted search response time 40% on a 2,500+ listing dataset",
      ],
    },
    {
      icon: "payments",
      title: "Payments & Billing",
      points: [
        "Stripe, Paddle, and Chargebee integrations across three different products",
        "Full Paddle → Chargebee subscription billing migration with zero data loss and zero customer disputes",
        "Stripe subscription microservice built from scratch with idempotent webhooks and PCI-aligned handling (Docyt)",
      ],
    },
    {
      icon: "auth",
      title: "Auth & Security",
      points: [
        "Devise + Pundit RBAC systems run in production with zero critical incidents and zero auth issues",
        "Google OAuth 2.0 flows with careful callback and token-refresh handling",
        "Built rails-guarddog — a static security scanner for SQLi, XSS, secrets exposure, and mass assignment",
      ],
    },
  ],
  railsClosingLine: "Rails isn't a framework I use — it's the one I build tooling for.",

  // ── Experience ────────────────────────────────────────────────────────────
  experience: [
    {
      company: "Blackstack Software Solutions",
      companyUrl: "https://www.linkedin.com/company/blackstack-software-solutions/posts/?feedView=all",
      location: "Lahore, Pakistan · Remote-friendly",
      roles: [
        { title: "Software Engineer",          duration: "Dec 2024 — May 2026" },
        { title: "Associate Software Engineer", duration: "Aug 2024 — Dec 2024" },
      ],
      employmentNote: "Role ended in a company-wide downsizing (May 2026); not performance-related.",
      summary:
        "Product-focused consultancy shipping Rails + React for US-facing SaaS clients. Sole or primary engineer across CinnaLab PRM, Intercollegiate, Controllr/Monthend, Docyt, and Bullseye Education.",
      projects: [
        {
          name: "CinnaLab",
          url: "https://cinnalab.io/",
          flagship: true,
          role: "Sole Engineer",
          description:
            "AI-assisted Partner Relationship Management platform: partner onboarding, deal registration, lead scoring, e-learning, training, and e-signatures with two-way CRM and LMS sync.",
          image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop&q=80",
          tech: ["React.js", "Material UI", "Ruby on Rails", "Sidekiq", "Redis", "ActionCable", "Devise", "Pundit", "HubSpot API", "Salesforce API", "Paddle", "Chargebee", "Moodle", "Documenso"],
          problem: "Partner programs lived across HubSpot, Salesforce, Moodle, and scattered documents — high drop-off, duplicate data, fragile manual handoffs between sales and enablement, and a subscription billing system that needed to move providers without losing a single record.",
          metrics: [
            "Shipped an entire PRM platform to production in 8 months as the sole engineer",
            "Zero critical incidents and zero auth issues in production since launch",
            "Zero data loss and zero customer disputes across the full Paddle → Chargebee billing cutover",
            "Eliminated manual data entry between CinnaLab and two major CRMs via bi-directional sync",
            "Removed recurring third-party licensing costs by self-hosting Documenso and Moodle from source",
          ],
        },
        {
          name: "Monthend / Controllr",
          url: "https://fly.controllr.app/",
          description:
            "SaaS for month-end close and financial controls — real-time ingestion, QuickBooks sync, and workflows for finance teams handling GAAP-compliant job-costing.",
          image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop&q=80",
          tech: ["Ruby on Rails", "React.js", "OAuth", "PostgreSQL", "Devise", "Turbo Streams"],
          metrics: [
            "Eliminated manual reconciliation lag in month-end close",
            "Zero reconciliation errors across multi-entity account syncing in production",
            "Delivered OAuth and email auth end-to-end with careful session hygiene",
          ],
        },
        {
          name: "Intercollegiate",
          url: "https://intercollegiate.co/",
          description:
            "National job board for college athletics — 2,500+ active listings with faceted search, geolocation filtering, and an ActiveAdmin recruiter dashboard.",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&q=80",
          tech: ["Ruby on Rails", "PostgreSQL", "JavaScript", "ActiveAdmin", "Turbo Frames/Streams", "Sidekiq"],
          metrics: [
            "Cut search response time by 40% across 2,500+ listings",
            "Tuned multi-parameter search into sub-200ms paths on representative workloads",
            "Delivered 100% on-time against sprint scope, coordinated entirely via async written communication",
          ],
        },
        {
          name: "Docyt",
          url: "https://docyt.com/",
          description:
            "AI-assisted bookkeeping — a dedicated Stripe-facing microservice for payments and subscriptions, integrated with the core accounting product.",
          image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=500&fit=crop&q=80",
          tech: ["Ruby on Rails", "Stripe", "Microservices", "Webhooks"],
          metrics: [
            "Reduced billing support escalations post-launch",
            "Production-ready Stripe flows for hospitality and accounting lines",
          ],
        },
        {
          name: "Bullseye Education",
          url: "https://bullseye.education/",
          description:
            "K–12 instructional coaching platform: walkthroughs, in-the-moment feedback, and analytics for school leaders across multiple districts.",
          image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=500&fit=crop&q=80",
          tech: ["Ruby on Rails", "React.js", "PostgreSQL"],
          metrics: [
            "Shipped features used live in multiple districts during the school year",
            "Gave leadership same-day visibility into coaching outcomes",
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

  // ── Education ─────────────────────────────────────────────────────────────
  education: [
    {
      degree: "B.S. Computer Science",
      institution: "University of Engineering and Technology (UET), Lahore",
      duration: "2020 — 2024",
      coursework: ["Data Structures & Algorithms", "Database Systems", "Software Engineering", "Web Technologies", "Operating Systems", "Computer Networks"],
      fyp: {
        name: "Urdu Signify",
        description: "GAN-powered Urdu-to-Pakistan Sign Language video animation system (Python, GANs, NLP) — solo end-to-end delivery on a novel deep-learning problem.",
      },
    },
  ],

  // ── Skills — with detail arrays for expandable pills ─────────────────────
  skills: {
    backend: [
      { name: "Ruby on Rails 6/7/8" },
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
      { name: "FactoryBot" },
      { name: "GitHub Actions CI/CD" },
      { name: "AWS", detail: ["IAM", "VPC", "EC2", "RDS", "S3", "CloudWatch"] },
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
      { name: "Microservices" },
      { name: "Third-party API design" },
      { name: "Agile/Scrum" },
    ],
  },

  // ── Open source gems ──────────────────────────────────────────────────────
  openSource: {
    combinedDownloads: 5993,
    rubygemsProfile: "https://rubygems.org/profiles/devsyedghani",
    gems: [
      {
        name: "rails-guarddog",
        version: "v0.1.14",
        badge: "Security",
        tagline: "Catches security problems in your Rails code before they reach production.",
        description: "Detects SQL injection, XSS, secrets exposure, unsafe redirects, and mass assignment. Configurable severity, CI/CD-ready.",
        github: "https://github.com/sghani001/rails-guarddog",
        rubygems: "https://rubygems.org/gems/rails-guarddog",
        tech: ["Ruby", "Rails", "Static Analysis", "Security"],
      },
      {
        name: "rails-tenantify",
        version: "v0.1.2",
        badge: "Architecture",
        tagline: "Row-level multi-tenancy for Rails 7+ — one gem, not a refactor.",
        description: "Model/controller scoping, ActiveJob/Sidekiq context propagation, bulk-write protection. Maintained alternative to acts_as_tenant.",
        github: "https://github.com/sghani001/rails-tenantify",
        rubygems: "https://rubygems.org/gems/rails-tenantify",
        tech: ["Ruby", "Rails 7", "Multi-tenancy", "Sidekiq"],
      },
      {
        name: "rails-persona",
        version: "v0.2.7",
        badge: "Analytics",
        tagline: "Know how your users actually behave — without writing custom SQL.",
        description: "Define trackable actions with a clean DSL, then query frequency, recency, inactivity, and full activity logs — all stored in your own database.",
        github: "https://github.com/sghani001/rails-persona",
        rubygems: "https://rubygems.org/gems/rails-persona",
        tech: ["Ruby", "Rails", "DSL", "Analytics"],
      },
      {
        name: "rails-css_unused",
        version: "v0.2.1",
        badge: "Tooling",
        tagline: "Find CSS selectors nobody is using across your whole Rails view layer.",
        description: "Scans ERB/HAML/Slim/ViewComponent/Stimulus templates for unused selectors. BEM support, CI exit codes, zero runtime overhead.",
        github: "https://github.com/sghani001/rails-css_unused",
        rubygems: "https://rubygems.org/gems/rails-css_unused",
        tech: ["Ruby", "Rails", "CSS", "ERB", "HAML", "Stimulus"],
      },
    ],
  },

  // ── Testimonials (3 total) ────────────────────────────────────────────────
  testimonials: [
    {
      quote: "One of the most proactive and technically skilled engineers I've managed. As a Full-Stack Engineer, Ghani took full ownership of critical products, including building complex backend architectures and modern frontend interfaces from scratch. His ability to handle background job processing, API integrations, and database optimization made him an invaluable asset to our engineering workflows. Beyond his core technical execution, his passion for open-source development and clean code consistently raised the standard for our team. A high-impact, reliable developer who learns fast and ships quality software.",
      author: "Muhammad Ali Subhani",
      title: "Software Engineer @ ForeFastSolutions · ex-Blackstack · Syed's mentor and manager — LinkedIn recommendation, Aug 2026",
      url: "https://www.linkedin.com/in/alisubhani/",
      type: "profile",
    },
    {
      quote: "It was a pleasure working with Ghani. He is a great team member with excellent problem-solving and communication skills. He is always friendly, approachable, and supportive of his colleagues. Ghani consistently demonstrates a positive attitude and a strong willingness to help the team whenever needed. His dedication, teamwork, and professionalism make him a valuable asset to the organization. I truly enjoyed working with him and wish him continued success in his future endeavors.",
      author: "Muhammad Abdullah Faran",
      title: "Software Engineer | ROR | MERN | Typescript — LinkedIn recommendation, Aug 2026",
      url: "https://www.linkedin.com/in/muhammad-abdullah-faran-28b4951b1/",
      type: "profile",
    },
    {
      quote: "I had the opportunity to work with Ghani on multiple projects, and my experience working with him has been excellent. He is a highly professional and dependable person who consistently takes ownership of his work and delivers on time.\n\n What I particularly appreciate about Ghani is his ability to think outside the box and come up with creative and practical solutions to challenges. He is committed to delivering quality work while maintaining a professional and collaborative attitude throughout the project. \n\n I would highly recommend Ghani to anyone looking for a dedicated, professional, and innovative person to work with. It has been a great experience working alongside him.",
      author: "Muhammad Faizan",
      title: "Software Engineer | Turning Ideas into Web, Mobile & AI Apps with MERN, Next.js, Nest.js, React Native | JavaScript • Python • System Design",
      url: "https://www.linkedin.com/in/muhammad-faizan-b18379241/",
      type: "profile",
    },
    {
      quote: "I had the pleasure of working with Syed Ghani, and I highly recommend him as a skilled and versatile Full-Stack Developer. He has strong expertise in both front-end and back-end development, along with solid experience in middleware and API integration. He is a problem-solver, a quick learner, and consistently delivers clean, reliable, and scalable solutions. His technical skills, professionalism, and collaborative approach make him a valuable addition to any development team.",
      author: "Kashif Ali",
      title: "Software Engineer | Ruby on Rails | MERN",
      url: "https://www.linkedin.com/in/kashif-ali-9173b7302/",
      type: "profile"
    },
    {
      quote: "I had the opportunity to work with Syed M Ghani and found him to be a highly professional, responsible, and dedicated individual. He consistently demonstrated strong communication skills, a positive attitude, and a willingness to support others whenever needed.\n\n He is someone who takes ownership of his responsibilities and maintains a professional approach even when dealing with challenging situations. His commitment, reliability, and ability to work effectively with others make him a valuable asset to any organization. \n\nI would gladly recommend him to anyone looking for a dependable and professional team member. I wish him continued success in his career.",
      author: "Fazeel Ashraf Nadeem",
      title: "QuickBooks Certified Accountant | Financial Reporting | Bank Reconciliation | Helping Small Businesses Manage Accurate Books",
      url: "https://www.linkedin.com/in/fazeel-ashraf-nadeem-091b7912b/",
      type: "profile",
    },
    {
      quote: "I had the pleasure of working with Ghani and have always appreciated his dedication and approach to development. He is a skilled Ruby on Rails developer with a strong understanding of backend development and a good problem-solving mindset. Beyond his technical skills, Ghani is a reliable and supportive teammate who is easy to work with. I would definitely recommend him to any team looking for a talented and motivated Ruby on Rails developer.",
      author: "Rabiya Nadeem",
      title: "Software Engineer | MERN Stack & React Native — LinkedIn recommendation, Aug 2026",
      url: "https://www.linkedin.com/in/rabiya-nadeem22/",
      type: "profile",
    },
    {
      quote: "Ghani has proven himself to be a phenomenal asset to the company, taking full ownership of his responsibilities and going above and beyond to support his team. His dedication and punctuality truly make a difference in our office.",
      author: "Blackstack Software Solutions",
      title: "Performance bonus & appreciation — 2025",
      url: "https://www.linkedin.com/posts/blackstack-software-solutions_workculture-employeeappreciation-employeecelebration-activity-7396172400092053504-Ci2f",
      type: "post",
    },
    {
      quote: "Your dedication, respect towards your seniors, and support for your juniors truly sets you apart. You've been a great team member, bringing positive energy that reflects beautifully in our workplace culture. A true technical wizard.",
      author: "Blackstack Software Solutions",
      title: "First work anniversary spotlight",
      url: "https://www.linkedin.com/posts/blackstack-software-solutions_workanniversary-milestone-firstworkanniversary-activity-7356977157857849344-X7fF",
      type: "post",
    },
    {
      quote: "I had the pleasure of working with Ghani and truly appreciated his dedication and commitment towards his work. Beyond his strong technical skills, he is approachable, responsible, and genuinely easy to work with. He takes ownership of his responsibilities, communicates well with the team and can always be relied upon to get the job done. \n \n I would highly recommend Ghani to any engineering team looking for a responsible, punctual, and reliable professional. It was a great experience working alongside him and I’m confident he will be a valuable addition to any team.",
      author: "Eisha Qamar",
      title: "Software Engineer | LGU’24 | BSSE | MERN | JavaScript | Web development — LinkedIn recommendation, Aug 2026",
      url: "https://www.linkedin.com/in/eishaqamar/",
      type: "profile",
    },
  ],

  // ── Personal projects ─────────────────────────────────────────────────────
  projects: [
    {
      name: "Urdu Signify (FYP)",
      badge: "Final Year Project",
      description: "GAN + NLP pipeline that converts Urdu text into Pakistan Sign Language animations — a web demo interface built on top of a deep-learning backend. One of the few Urdu→PSL translation systems with an interactive web UI.",
      url: "https://github.com/sghani001",
      tech: ["Python", "GAN", "NLP", "Flask", "React.js"],
      image: "https://images.unsplash.com/photo-1589254065909-b7086229d08c?w=700&h=440&fit=crop&q=80",
    },
    {
      name: "Online Exam System",
      description: "Multi-role exam platform (admin / teacher / student) with role-based navigation, protected route guards, and full exam lifecycle: create → approve → sit → grade.",
      url: "https://github.com/sghani001/Online_Exam_System",
      tech: ["Ruby on Rails", "React.js", "Devise", "Pundit", "PostgreSQL", "RSpec"],
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=700&h=440&fit=crop&q=80",
    },
    {
      name: "WhatsApp Analyzer",
      description: "Python utilities to parse exported WhatsApp chat logs and surface group / DM insights — message frequency, most active users, time-of-day patterns.",
      url: "https://github.com/sghani001/Whatsapp_Analyzer",
      tech: ["Python", "Pandas", "Matplotlib"],
      image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=700&h=440&fit=crop&q=80",
    },
  ],

  // ── Engineering practices ─────────────────────────────────────────────────
  engineeringPractices: [
    "REST API design with explicit contracts and validation",
    "Automated tests where they protect regressions (RSpec, Jest)",
    "Git workflows with meaningful review and small diffs",
    "PostgreSQL tuning: indexes, scopes, and explain-driven fixes",
    "SOLID-friendly Rails objects — not god models",
    "Operational thinking for jobs, queues, and integrations",
    "Async-first communication: specs, PRs, and written handover docs",
  ],

  resumeDownloads: [
    { label: "Download Resume (Full-Stack)", file: "/Syed_Ghani.pdf" },
    { label: "Download Resume (Remote-Focused)", file: "/Syed_Ghani_Remote.pdf" },
  ],
};

export default resumeData;
