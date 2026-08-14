import resumeData from "../utils/resumeData";

export const processSteps = [
  {
    n: "01",
    iconName: "chat",
    title: "Discovery",
    desc: "30-min call or interview. No pitch. I listen, ask hard questions, and tell you honestly if I'm the right fit.",
  },
  {
    n: "02",
    iconName: "document",
    title: "Proposal / Onboarding",
    desc: "Written scope and architecture proposal (contract) or structured onboarding plan (full-time). You own the document.",
  },
  {
    n: "03",
    iconName: "execution",
    title: "Execution",
    desc: "Regular async updates. Works across GMT+5 / EU / US overlap. Real, testable progress — not status theater.",
  },
  {
    n: "04",
    iconName: "rocket",
    title: "Handoff / Continuity",
    desc: "Clean code, tests, full documentation. Zero mystery, zero bus factor, zero knowledge lock-in.",
  },
];

export const socialLinks = [
  { label: "LinkedIn", url: resumeData.linkedinUrl, type: "linkedin", color: "#0A66C2", display: "LinkedIn" },
  { label: "GitHub", url: resumeData.githubUrl, type: "github", color: "#E6EDF3", display: "GitHub" },
];
