// Syed Ghani — Portfolio data (from resume)
// LinkedIn: https://www.linkedin.com/in/syed-m-ghani-357ba4234

export const resumeData = {
  name: "Syed Ghani",
  title: "Software Engineer",
  tagline: "Ruby on Rails · React.js · Full-stack",
  email: "2020cs669@student.uet.edu.pk",
  emailPersonal: "syedghani001@gmail.com",
  location: "Lahore, Pakistan",
  phone: "+92 309 0204019",
  portfolioUrl: "https://sghani001.github.io/portfolio/",
  leetcodeUrl: "https://leetcode.com/syedghani/",

  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/syed-m-ghani-357ba4234", icon: "linkedin" },
    { name: "GitHub", url: "https://github.com/sghani001", icon: "github" },
    { name: "Email", url: "mailto:syedghani001@gmail.com", icon: "email" },
  ],

  summary:
    "Computer Science graduate and Software Engineer with experience architecting and building production web applications using Ruby on Rails and React.js. Passionate about clean code, performance optimization, and solving real-world challenges. Delivered full-stack features and scalable microservices for K–12 ed-tech, college recruiting, and AI platforms, impacting thousands of active users.",

  aboutExtra:
    "I focus on designing clean REST APIs, writing maintainable test-driven code, and shipping features end-to-end. I thrive in agile environments where performance and user impact are the top priorities. LeetCode profile and GitHub portfolio linked below.",

  experience: [
    {
      company: "Blackstack Software Solutions",
      companyUrl: "https://www.linkedin.com/company/blackstack-software-solutions/posts/?feedView=all",
      location: "Lahore, Pakistan",
      roles: [
        { title: "Software Engineer", duration: "Dec 2024 — Present" },
        { title: "Associate Software Engineer", duration: "Aug 2024 — Dec 2024" },
      ],
      projects: [
        {
          name: "CinnaLab",
          url: "https://cinnalab.io/",
          description:
            "Sole developer for the AI-powered Partner Relationship Management (PRM) product. Delivered partner onboarding, deal registration, dashboards, and e-learning flows. Integrated HubSpot (CRM sync, lead/deal management), Moodle (training/certifications), and Documenso (e-signatures and document workflows).",
          image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=380&fit=crop",
          tech: ["React.js", "Ruby on Rails", "HubSpot API", "Moodle"],
          problem: "Managing partner onboarding and deal registrations manually was leading to 45% drop-offs and data fragmentation across sales CRMs and LMS platforms.",
          solution: "Architected a unified AI-powered PRM that synchronizes directly with HubSpot, Moodle, and Documenso. It centralizes deal registration safely and scales to thousands of partners.",
          metrics: [
            "Reduced onboarding process time by over 40%",
            "Automated 100% of e-signature workflows via Documenso API",
            "Eliminated manual data entry between LMS and CRM"
          ],
          engineering: [
            "Designed resilient webhook integrations for real-time two-way syncing",
            "Clean REST API structure with strict param validation",
            "Complex background job processing using Sidekiq/Redis",
            "Secure token-based authentication via JWT"
          ],
        },
        {
          name: "Intercollegiate",
          url: "https://intercollegiate.co/",
          description:
            "Full-stack development on the leading job board for college athletics. Search, filters (sport, division, conference, salary, job level), and listing flows serving 2,500+ active posts for DI/DII/DIII recruiters and job seekers.",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=380&fit=crop",
          tech: ["Rails", "PostgreSQL", "JavaScript"],
          problem: "College athletic recruiting lacked a centralized, high-performance portal with robust and scalable filtering by hyper-specific athletic criteria like Division and Conference.",
          solution: "Built a highly optimized job board from the ground up featuring advanced, instantaneous active filtering and scalable data modeling to support thousands of active DI/DII/DIII posts.",
          metrics: [
            "Serves over 2,500+ active job posts simultaneously",
            "Achieved sub-200ms query times on 6-parameter dynamic searches",
            "High daily active user volume from university recruiters"
          ],
          engineering: [
            "Custom PostgreSQL indexing strategies for multi-column filtering",
            "Optimized ActiveRecord query crafting extending base scope",
            "MVC architecture maximizing reusable form objects and presenters"
          ]
        },
        {
          name: "Bullseye",
          url: "https://bullseye.education/",
          description:
            "Built and maintained features for the K–12 instructional support platform: customizable walkthroughs and coaching workflows, in-the-moment feedback capture (web/mobile), and analytics for principals and district leaders.",
          image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=380&fit=crop",
        },
        {
          name: "Docyt",
          url: "https://docyt.com/",
          description:
            "Microservices-based AI bookkeeping platform. Designed and built the Stripe payment microservice (subscriptions, billing, webhooks) and integrated it with the core Docyt platform for accounting and hospitality product lines.",
          image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=380&fit=crop",
        },
      ],
    },
    {
      role: "Research and Development Intern",
      company: "Al-Khawarizmi Institute of Computer Science (KICS), UET Lahore",
      companyUrl: "https://www.linkedin.com/company/kics/posts/?feedView=all",
      location: "Lahore, Pakistan",
      duration: "Jul 2023 — Oct 2023",
      points: [
        "Conducted research and technical development within a leading CS research institute, optimizing legacy codebases for faster execution.",
        "Collaborated with cross-functional teams to quickly prototype and deliver technical proofs-of-concept on tight schedules."
      ],
    },
    {
      role: "Web Development Intern",
      company: "Apex Space",
      companyUrl: "https://www.linkedin.com/company/apexspace/posts/?feedView=all",
      location: "Lahore, Pakistan",
      duration: "Jun 2023 — Aug 2023",
      points: [
        "Developed and maintained responsive web applications, improving client-facing UI/UX and reducing page load times by ~15%.",
        "Adopted agile workflows and active code reviews to ensure clean, maintainable engineering standards across student projects."
      ],
    },
  ],

  education: [
    {
      degree: "Bachelor of Science, Computer Science",
      institution: "University of Engineering and Technology (UET), Lahore",
      duration: "2020 — 2024",
      gpa: "3.1",
    },
  ],

  skills: {
    core: ["Ruby on Rails", "React.js", "JavaScript (ES6+)", "REST APIs", "PostgreSQL", "MySQL", "Redis"],
    integrations: ["Stripe", "HubSpot", "Moodle", "Documenso", "Git", "Linux"],
    frontend: ["TailwindCSS", "Vite", "React Query", "React Router", "Redux"],
    also: ["Python", "Node.js", "Microservices", "Third-party API design"],
  },

  companies: [
    { name: "Blackstack", url: null },
    { name: "UET Lahore", url: "https://uet.edu.pk" },
    { name: "KICS", url: null },
    { name: "Apex Space", url: null },
  ],

  journey: [
    {
      year: "2020",
      title: "Started Computer Science",
      description: "Started studying at UET Lahore, building strong fundamentals in software engineering and computer architecture.",
    },
    {
      year: "2023",
      title: "Internships & Research",
      description: "Worked as a Web Development Intern at Apex Space and an R&D Intern at KICS, optimizing legacy code and exploring frontend technologies.",
    },
    {
      year: "Aug 2024",
      title: "Associate Software Engineer",
      description: "Graduated and began my professional career at Blackstack Software Solutions. Architected multi-tenant platforms and built scalable core components.",
    },
    {
      year: "Dec 2024",
      title: "Promoted to Software Engineer",
      description: "Recognized for ownership and rapid execution. Leading end-to-end development of AI products and robust third-party API integrations like HubSpot and Documenso.",
    },
  ],

  testimonials: [
    {
      quote: "Ghani has proven himself to be a phenomenal asset to the company, taking full ownership of his responsibilities and going above and beyond to support his team. His dedication and punctuality truly make a difference in our office.",
      author: "Blackstack Software Solutions",
      title: "Performance Bonus & Appreciation 2025",
      url: "https://www.linkedin.com/posts/blackstack-software-solutions_workculture-employeeappreciation-employeecelebration-activity-7396172400092053504-Ci2f"
    },
    {
      quote: "Your dedication, respect towards your seniors, and support for your juniors truly sets you apart. You’ve been a great team member, bringing positive energy that reflects beautifully in our workplace culture. A true technical wizard.",
      author: "Blackstack Software Solutions",
      title: "1st Work Anniversary Spotlight",
      url: "https://www.linkedin.com/posts/blackstack-software-solutions_workanniversary-milestone-firstworkanniversary-activity-7356977157857849344-X7fF"
    }
  ],

  projects: [
    {
      name: "FYP (Final Year Project)",
      description: "Final Year Project at UET Lahore — full-stack capstone with exam management, roles, and reporting (Rails, PostgreSQL).",
      url: "https://github.com/sghani001/Online_Exam_System",
      tech: ["Rails", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=380&fit=crop",
    },
    {
      name: "Online Exam System",
      description: "Full-stack exam creation, admin approval, student taking, and teacher grading (Rails).",
      url: "https://github.com/sghani001/Online_Exam_System",
      tech: ["Rails", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=380&fit=crop",
    },
    {
      name: "WhatsApp Analyzer",
      description: "Python tool for group/direct chat analytics and insights.",
      url: "https://github.com/sghani001/Whatsapp_Analyzer",
      tech: ["Python"],
      image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=600&h=380&fit=crop",
    },
    {
      name: "Olympics Analysis",
      description: "Data analysis and visualization on Olympics datasets.",
      url: "https://github.com/sghani001/Olympics",
      tech: ["Python", "Data visualization"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=380&fit=crop",
    },
  ],

  engineeringPractices: [
    "MVC architecture & RESTful API design",
    "Test-Driven Development (RSpec, Jest)",
    "Git version control & strict code reviews",
    "PostgreSQL query optimization & caching",
    "Clean Code & SOLID principles",
    "Microservices extraction & scaling",
  ],

  technicalHighlights: [
    { title: "Authentication", desc: "Implemented secure stateful token-based authentication (JWT) and Devise with role-based access control." },
    { title: "Performance", desc: "Optimized complex PostgreSQL search queries to achieve sub-200ms load times on 6-parameter dynamic filters." },
    { title: "Integrations", desc: "Designed resilient two-way webhook syncing architectures for HubSpot, Documenso, and Stripe." },
    { title: "Architecture", desc: "Extracted monolithic billing logic into standalone, highly scalable microservices." }
  ],
};

export default resumeData;
