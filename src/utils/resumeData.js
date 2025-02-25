import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AlternateEmailTwoToneIcon from "@mui/icons-material/AlternateEmailTwoTone";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CodeIcon from '@mui/icons-material/Code';
import PestControlIcon from '@mui/icons-material/PestControl';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import { WebOutlined } from "@mui/icons-material";
import BuildIcon from '@mui/icons-material/Build';
import PsychologyIcon from '@mui/icons-material/Psychology';

const getIcon = (icon) => {
  switch (icon) {
    case "email":
      return <AlternateEmailTwoToneIcon />;
    case "linkedin":
      return <LinkedInIcon />;
    case "github":
      return <GitHubIcon />;
    default:
      return null;
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: "Syed Ghani",
  title: "Full Stack ROR Developer",
  birthday: "5th September 1999",
  job: "Associate Software Engineer",
  email: "syedghani001@gmail.com",
  address: "Shahadara, Lahore",
  phone: "+923090204019",

  socials: {
    Email: {
      link: "mailto:syedghani001@gmail.com",
      text: "syedghani001@gmail.com",
      icon: getIcon("email"),
    },
    LinkedIn: {
      link: "https://pk.linkedin.com/in/syed-m-ghani-357ba4234",
      text: "Syed M Ghani",
      icon: getIcon("linkedin"),
    },
    Github: {
      link: "https://github.com/sghani001",
      text: "sghani001",
      icon: getIcon("github"),
    },
  },

  aboutMe:
    "A dedicated and results-driven Associate Software Engineer with hands-on experience in full-stack web development, currently pursuing a Bachelor's in Computer Science.\n\n" +
    "I have gained valuable experience working on U.S based projects using technologies like Ruby on Rails, HTML, CSS, JavaScript, and Python. My work includes developing new features, debugging, and optimizing web applications to enhance user experiences.\n\n" +
    "Skilled in both front-end and back-end development, I have a strong passion for building scalable, efficient, and user-friendly applications. I thrive in collaborative, team-oriented environments, where I contribute to brainstorming sessions, problem-solving, and delivering quality solutions.\n\n" +
    "With a focus on clean code and effective communication, I consistently work with cross-functional teams to meet project goals and deadlines. Eager to apply my technical expertise, enthusiasm, and team collaboration skills to impactful projects, I am excited to contribute to dynamic teams and solve real-world challenges.",

  workHistory: [
    {
      position: "Associate Software Engineer",
      company: "Blackstack Software Solutions, Lahore, Pakistan",
      duration: "Aug 2024 - Present",
      responsibilities: [
        "Debugged and resolved application issues to enhance functionality and performance.\n",
        "Implemented new features based on client requirements to improve user experience.\n",
        "Utilized Git and GitHub for version control and team collaboration on code projects.\n",
        "Assisted in code reviews to ensure adherence to best practices and coding standards.\n",
        "Collaborated with cross-functional teams to deliver high-quality software solutions.\n",
        "Wrote unit tests to ensure code quality and reduce bugs.\n",
      ],
    },
    {
      position: "Research and Development Intern",
      company: "Al-Khawarizmi Institute of Computer Science (KICS), UET Lahore",
      duration: "Jul 2023 - Oct 2023",
      responsibilities: [
        "Assisted in the development and testing of new algorithms for data processing.\n",
        "Prepared technical reports and documentation on research findings.\n",
      ],
    },
    {
      position: "Web Development Intern",
      company: "Apex Space, Lahore, Pakistan",
      duration: "Jun 2023 - Aug 2023",
      responsibilities: [
        "Gained foundational knowledge in web development, focusing on front-end technologies such as HTML, CSS, and JavaScript.\n",
        "Developed a strong understanding of building responsive, user-friendly interfaces and creating dynamic web pages.\n",
        "Gained experience in version control using GitHub for collaborative development and code management.\n",
      ],
    },
  ],

  educationHistory: [
    {
      degree: "Bachelor’s degree in Computer Science",
      institution: "University of Engineering and Technology, Lahore",
      duration: "Oct 2020 - May 2024",
    },
    {
      degree: "Intermediate FSc Pre-Engineering",
      institution: "Government Islamia College Civil Lines",
      duration: "Feb 2017 - June 2019",
    },
  ],

  skills: [
    {
      title: "Front-End",
      icon: <CodeIcon/>,
      description: [
        "HTML",
        " CSS",
        "JavaScript",
        "ReactJs"
      ]
    },
    {
      title: "Back-End",
      icon: <SettingsOutlinedIcon/>,
      description: [
        "Ruby",
        "Ruby on Rails",
        "C",
        "C++"
      ]
    },
    {
      title: "Development Tools",
      icon: <BuildIcon/>,
      description: [
        "Git",
        "GitHub"
      ]
    },
    {
      title: "Soft Skills",
      icon: <PsychologyIcon/>,
      description: [
        "Communication Skills",
        "Team Work"
      ]
    }
  ],

  myServices: [
    {
      service: "Full-stack Web Development",
      icon: <WebOutlined/>,
      description: "Developing scalable web applications with Ruby on Rails, ensuring responsive and user-friendly designs."
    },
    {
      service: "Backend Development",
      icon: <SettingsOutlinedIcon/>,
      description: "Building robust and efficient backend systems using Rails, including API development and database management."
    },
    {
      service: "Frontend Development & UI Design",
      icon: <CodeIcon/>,
      description: "Creating intuitive UI using modern frameworks, ensuring cross-browser compatibility."
    },
    {
      service: "Debugging & Optimization",
      icon: <PestControlIcon/>,
      description: "Fixing performance issues and optimizing applications for efficiency."
    },
    {
      service: "Version Control & Collaboration",
      icon: <GitHubIcon/>,
      description: "Managing code repositories with Git/GitHub for seamless teamwork."
    },
    {
      service: "Code Reviews & Quality Assurance",
      icon: <MobileFriendlyIcon/>,
      description: "Conducting reviews and writing unit tests to ensure clean, maintainable code."
    }
  ],
};