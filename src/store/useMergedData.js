import {
  useGetProfileQuery,
  useGetProjectsQuery,
  useGetExperiencesQuery,
  useGetEducationsQuery,
} from "./portfolioApi";
import hardcoded from "../utils/resumeData";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
}

function mergeProfile(apiProfile) {
  if (!apiProfile) return {};
  const p = apiProfile;
  const socials = p.social_links
    ? Object.entries(p.social_links).map(([name, url]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        url,
        icon: name,
      }))
    : hardcoded.socials;

  const titles = p.headline
    ? p.headline.split(/[,]+/).map((s) => s.trim())
    : hardcoded.titles;

  const skills = p.skills && p.skills.length > 0
    ? {
        core: p.skills.filter((s) => s.category === "Backend" || s.category === "Database").map((s) => s.name),
        integrations: p.skills.filter((s) => s.category === "DevOps" || s.category === "Testing").map((s) => s.name),
        frontend: p.skills.filter((s) => s.category === "Frontend").map((s) => s.name),
        also: p.skills
          .filter(
            (s) =>
              s.category === "Tools" ||
              !["Backend", "Database", "DevOps", "Testing", "Frontend"].includes(s.category),
          )
          .map((s) => s.name),
      }
    : hardcoded.skills;

  return {
    name: p.name || hardcoded.name,
    title: p.headline || hardcoded.title,
    titles,
    tagline: p.tagline || hardcoded.tagline,
    headline: p.headline || hardcoded.headline,
    summary: p.bio || hardcoded.summary,
    aboutExtra: p.about_extra || hardcoded.aboutExtra,
    heroBullets: p.hero_bullets || hardcoded.heroBullets,
    leetcodeUrl: p.leetcode_url || hardcoded.leetcodeUrl,
    location: p.location || hardcoded.location,
    phone: p.phone || hardcoded.phone,
    email: p.contact_email || hardcoded.email,
    emailPersonal: p.contact_email || hardcoded.emailPersonal,
    portfolioUrl: p.website || hardcoded.portfolioUrl,
    socials,
    skills,
  };
}

function mergeProjects(apiProjects) {
  if (!apiProjects || apiProjects.length === 0) return hardcoded.projects;
  return apiProjects.map((pr) => ({
    name: pr.title,
    description: pr.description || "",
    url: pr.github_url || pr.url || "#",
    tech: pr.tech_stack || [],
    image: (pr.images && pr.images[0]) || null,
    problem: pr.problem || null,
    solution: pr.solution || null,
    metrics: pr.metrics || [],
    engineering: pr.engineering || [],
  }));
}

function mergeExperiences(apiExperiences) {
  if (!apiExperiences || apiExperiences.length === 0) return hardcoded.experience;
  return apiExperiences.map((exp) => ({
    company: exp.company,
    companyUrl: exp.company_url || null,
    location: exp.location || "",
    roles: exp.roles && exp.roles.length > 0 ? exp.roles : [{ title: exp.role, duration: "" }],
    points: exp.points && exp.points.length > 0 ? exp.points : (exp.description ? [exp.description] : []),
  }));
}

function mergeEducation(apiEducation) {
  if (!apiEducation || apiEducation.length === 0) return hardcoded.education;
  return apiEducation.map((edu) => ({
    degree: edu.degree,
    field: edu.field || "",
    institution: edu.school,
    duration: edu.duration || `${formatDate(edu.start_date)} — ${edu.end_date ? formatDate(edu.end_date) : "Present"}`,
    gpa: edu.gpa || null,
  }));
}

export default function useMergedData() {
  const profile = useGetProfileQuery();
  const projects = useGetProjectsQuery();
  const experiences = useGetExperiencesQuery();
  const education = useGetEducationsQuery();

  const loading =
    profile.isLoading ||
    projects.isLoading ||
    experiences.isLoading ||
    education.isLoading;

  const error = profile.error || projects.error || experiences.error || education.error;

  const merged = {
    ...hardcoded,
    ...mergeProfile(profile.data),
    projects: mergeProjects(projects.data),
    experience: mergeExperiences(experiences.data),
    education: mergeEducation(education.data),
  };

  return { data: merged, loading, error: error ? (error.data?.error || error.status) : null };
}
