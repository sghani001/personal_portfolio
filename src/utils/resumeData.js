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
    "Software Engineer with 1 year 7 months of experience building production web applications in Ruby on Rails and React.js. Delivered full-stack features and microservices for K–12 ed-tech, college athletics recruiting, AI-powered PRM, and AI bookkeeping platforms. Strong in third-party integrations (Stripe, HubSpot, Moodle, Documenso), API design, and end-to-end ownership. B.Sc. Computer Science, UET Lahore.",

  aboutExtra:
    "I focus on clean APIs, maintainable code, and shipping features end-to-end. References and portfolio work available on request; LeetCode profile linked in Contact.",

  experience: [
    {
      role: "Software Engineer",
      company: "Blackstack Software Solutions",
      location: "Lahore, Pakistan",
      duration: "Aug 2024 — Present",
      durationShort: "1 yr 7 mo",
      projects: [
        {
          name: "CinnaLab",
          url: "https://cinnalab.io/",
          description:
            "Sole developer for the AI-powered Partner Relationship Management (PRM) product. Delivered partner onboarding, deal registration, dashboards, and e-learning flows. Integrated HubSpot (CRM sync, lead/deal management), Moodle (training/certifications), and Documenso (e-signatures and document workflows).",
          image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=380&fit=crop",
        },
        {
          name: "Intercollegiate",
          url: "https://intercollegiate.co/",
          description:
            "Full-stack development on the leading job board for college athletics. Search, filters (sport, division, conference, salary, job level), and listing flows serving 2,500+ active posts for DI/DII/DIII recruiters and job seekers.",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=380&fit=crop",
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
        // {
        //   name: "Monthend / Controllr",
        //   url: "https://fly.controllr.app/",
        //   description:
        //     "Controllr SaaS: authentication (email and Google), user flows, and product features supporting month-end and control workflows.",
        //   image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=380&fit=crop",
        // },
      ],
    },
    {
      role: "Research and Development Intern",
      company: "Al-Khawarizmi Institute of Computer Science (KICS), UET Lahore",
      location: "Lahore",
      duration: "Jul 2023 — Oct 2023",
      durationShort: null,
      points: ["Research and technical development in a leading CS research institute at UET Lahore."],
    },
    {
      role: "Web Development Intern",
      company: "Apex Space",
      location: "Lahore",
      duration: "Jun 2023 — Aug 2023",
      durationShort: null,
      points: ["Web development and engineering support for client projects."],
    },
  ],

  education: [
    {
      degree: "Bachelor of Science, Computer Science",
      institution: "University of Engineering and Technology (UET), Lahore",
      duration: "2020 — 2024",
      gpa: "3.3",
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
};

export default resumeData;
