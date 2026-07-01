import React, { useState, useEffect } from "react";
import GlassNav from "./components/GlassNav";
import Hero from "./components/Hero";
import LeetcodeStats from "./components/LeetcodeStats";
import GitHubCalendar from "./components/GitHubCalendar";
import LinkedInBadge from "./components/LinkedInBadge";
import useMergedData from "./store/useMergedData";
import { useSubmitContactMutation, useGetGemsQuery } from "./store/portfolioApi";
import { useInView } from "./hooks/useInView";
import GitHubBadge from "./components/GitHubBadge";
import LeetCodeBadge from "./components/LeetCodeBadge";
import "./App.css";
import { ExternalLink, Mail, MapPin, Phone, ChevronRight, Quote } from "lucide-react";

function Section({ id, title, children }) {
  const [ref, inView] = useInView();
  return (
    <section
      ref={ref}
      id={id}
      className={`py-16 md:py-24 ${inView ? "animate-fade-up" : ""}`}
    >
      <div className="max-w-content mx-auto px-6">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="font-mono font-medium text-lg text-text-primary">{title}</h2>
          <span className="flex-1 h-px bg-border" />
        </div>
        {children}
      </div>
    </section>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 md:pt-24 p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative bg-bg-secondary border border-border rounded-window w-full max-w-2xl flex flex-col max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border rounded-t-[8px] shrink-0">
          <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-110" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
          <span className="ml-3 font-mono text-xs text-text-muted truncate">{project.name}</span>
        </div>
        <div className="p-5 md:p-6 space-y-4 overflow-y-auto modal-scroll">
          {project.url && (
            <a href={project.url} target="_blank" rel="noreferrer" className="text-accent-primary text-xs font-mono hover:underline inline-flex items-center gap-1">
              View <ExternalLink size={12} />
            </a>
          )}
          <p className="text-text-secondary text-sm leading-relaxed">{project.description}</p>
          {project.problem && (
            <div>
              <h4 className="font-mono font-medium text-text-primary text-xs mb-1.5 uppercase tracking-wider">Problem</h4>
              <p className="text-text-secondary text-sm leading-relaxed">{project.problem}</p>
            </div>
          )}
          {project.solution && (
            <div>
              <h4 className="font-mono font-medium text-text-primary text-xs mb-1.5 uppercase tracking-wider">Solution</h4>
              <p className="text-text-secondary text-sm leading-relaxed">{project.solution}</p>
            </div>
          )}
          {project.tech && (
            <div>
              <h4 className="font-mono font-medium text-text-primary text-xs mb-1.5 uppercase tracking-wider">Tech</h4>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-pill text-[11px] font-mono bg-bg-primary text-text-muted border border-border">{t}</span>
                ))}
              </div>
            </div>
          )}
          {project.metrics && (
            <div>
              <h4 className="font-mono font-medium text-text-primary text-xs mb-1.5 uppercase tracking-wider">Impact</h4>
              <ul className="space-y-1">
                {project.metrics.map((m, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-text-secondary text-sm"><ChevronRight size={13} className="mt-0.5 shrink-0 text-accent-primary" />{m}</li>
                ))}
              </ul>
            </div>
          )}
          {project.engineering && (
            <div>
              <h4 className="font-mono font-medium text-text-primary text-xs mb-1.5 uppercase tracking-wider">Engineering</h4>
              <ul className="space-y-1">
                {project.engineering.map((e, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-text-secondary text-sm"><ChevronRight size={13} className="mt-0.5 shrink-0 text-accent-primary" />{e}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function GemStats() {
  const { data, isLoading, isError } = useGetGemsQuery();
  const gems = Array.isArray(data) ? data : data?.value || [];
  if (isLoading) return <div className="text-text-muted text-sm font-mono">Loading gem stats...</div>;
  if (isError || gems.length === 0) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[10px]">
      {gems.map((gem) => (
        <div key={gem.id} className="bg-bg-secondary border border-border rounded-card p-[14px]">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
            <span className="font-mono text-[11px] text-text-muted lowercase">live</span>
          </div>
          <a
            href={`https://rubygems.org/gems/${gem.name}`}
            target="_blank"
            rel="noreferrer"
            className="font-mono font-medium text-text-primary hover:text-accent-secondary transition-colors"
          >
            {gem.name}
          </a>
          <div className="font-mono font-medium text-xl text-text-primary mt-2">
            {gem.downloads?.toLocaleString()}
          </div>
          <div className="font-mono text-[11px] text-text-muted lowercase mt-1">
            downloads
          </div>
          <div className="flex items-center gap-2 mt-3 text-xs font-mono text-text-muted">
            <span>v{gem.version}</span>
            <span>·</span>
            <span>{new Date(gem.updated_at).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function App() {
  const { data: resumeData } = useMergedData();
  const [submitContact] = useSubmitContactMutation();
  const [formState, setFormState] = useState("idle");
  const [formType, setFormType] = useState("message");
  const [selectedProject, setSelectedProject] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const el = document.querySelector(".fullpage-scroll");
    if (!el) return;
    const onScroll = () => {
      const max = Math.max(1, el.scrollHeight - el.clientHeight);
      setScrollProgress(Math.min(1, Math.max(0, el.scrollTop / max)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let input = "";
    const target = process.env.REACT_APP_ADMIN_TRIGGER_WORD || "admin";
    const handleKeyDown = (e) => {
      if (
        document.activeElement &&
        (document.activeElement.tagName === "INPUT" ||
          document.activeElement.tagName === "TEXTAREA" ||
          document.activeElement.isContentEditable)
      ) {
        return;
      }
      if (e.key && e.key.length === 1) {
        input += e.key.toLowerCase();
        if (input.length > target.length) {
          input = input.substring(input.length - target.length);
        }
        if (input === target) {
          sessionStorage.setItem("admin_gate_passed", "true");
          const hasToken = !!sessionStorage.getItem("admin_token");
          window.location.href = hasToken ? "/admin" : "/admin/login";
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    let taps = 0;
    let timeout;
    const triggerText = process.env.REACT_APP_ADMIN_MOBILE_TRIGGER_TEXT || "syed@remote:~";
    const tapCount = parseInt(process.env.REACT_APP_MOBILE_TAP_COUNT, 10) || 5;

    const handleGlobalClick = (e) => {
      if (e.target && e.target.textContent === triggerText) {
        taps++;
        if (timeout) clearTimeout(timeout);
        if (taps >= tapCount) {
          sessionStorage.setItem("admin_gate_passed", "true");
          const hasToken = !!sessionStorage.getItem("admin_token");
          window.location.href = hasToken ? "/admin" : "/admin/login";
          taps = 0;
          return;
        }
        timeout = setTimeout(() => {
          taps = 0;
        }, 2000);
      }
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (formState !== "idle") return;
    setFormState("sending");
    const form = e.target;
    const name = form.name?.value || "";
    const email = form.email?.value || "";
    
    let message = "";
    if (formType === "service") {
      const service = form.service?.value || "";
      const budget = form.budget?.value || "";
      const desc = form.description?.value || "";
      message = `[SERVICE REQUEST: ${service}]
Budget Range: ${budget}

Project Description:
${desc}`;
    } else {
      message = form.message?.value || "";
    }

    try {
      await submitContact({ name, email, message }).unwrap();
      setFormState("success");
      form.reset();
      setTimeout(() => setFormState("idle"), 3000);
    } catch (err) {
      const errMsg = err.data?.details?.join(", ") || err.data?.error || "Failed to send. Please try emailing directly.";
      alert(errMsg);
      setFormState("idle");
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 h-[2px] bg-accent-primary z-[100] transition-[width] duration-75" style={{ width: `${scrollProgress * 100}%` }} />
      <GlassNav />
      <main className="fullpage-scroll">
        <Hero data={resumeData} />

        <Section id="about" title="About">
          <div className="bg-bg-secondary border border-border rounded-card p-6 md:p-8 mb-8">
            <p className="text-text-secondary leading-relaxed mb-4">{resumeData.summary}</p>
            {resumeData.aboutExtra && <p className="text-text-secondary leading-relaxed">{resumeData.aboutExtra}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <LinkedInBadge />
            <GitHubBadge username="sghani001" />
            <LeetCodeBadge username="syedghani" />
          </div>
        </Section>

        <Section id="engineering" title="Engineering">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-bg-secondary border border-border rounded-card p-6">
              <h3 className="font-mono font-medium text-text-primary mb-4 text-sm">practices</h3>
              <ul className="space-y-2">
                {resumeData.engineeringPractices.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-text-secondary text-sm"><ChevronRight size={14} className="mt-0.5 shrink-0 text-accent-primary" />{p}</li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {resumeData.technicalHighlights.map((h, i) => (
                <div key={i} className="bg-bg-secondary border border-border rounded-card p-5">
                  <h4 className="font-mono font-medium text-text-primary text-sm mb-1">{h.title}</h4>
                  <p className="text-text-secondary text-xs leading-relaxed">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <div className="space-y-[10px]">
            {resumeData.experience.map((job, i) => (
              <div key={i} className="bg-bg-secondary border border-border rounded-card p-[14px]">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                  {job.roles ? job.roles.map((r, ri) => (
                    <span key={ri} className="font-mono font-medium text-text-primary">{r.title}</span>
                  )) : <span className="font-mono font-medium text-text-primary">{job.role}</span>}
                  <span className="font-mono text-xs text-text-muted">{job.company}</span>
                </div>
                <div className="font-mono text-xs text-text-muted mb-3">
                  {job.duration || (job.roles?.[0]?.duration)}{job.location ? ` · ${job.location}` : ""}
                </div>
                {job.projects && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10px] mb-3">
                    {job.projects.map((proj, j) => (
                      <button key={j} onClick={() => setSelectedProject(proj)}
                        className="text-left bg-bg-primary border border-border rounded-card p-4 hover:border-border-hover transition-colors duration-150">
                        <span className="font-mono font-medium text-text-primary text-sm block mb-1">{proj.name}</span>
                        <p className="text-text-secondary text-xs leading-relaxed">{proj.description}</p>
                      </button>
                    ))}
                  </div>
                )}
                {job.points && (
                  <ul className="space-y-1">
                    {job.points.map((p, k) => (
                      <li key={k} className="flex items-start gap-2 text-text-secondary text-sm"><ChevronRight size={14} className="mt-0.5 shrink-0 text-accent-secondary" />{p}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Section>

        <Section id="education" title="Education">
          <div className="space-y-[10px]">
            {resumeData.education.map((edu, i) => (
              <div key={i} className="bg-bg-secondary border border-border rounded-card p-[14px]">
                <h3 className="font-mono font-medium text-text-primary mb-1">{edu.degree}{edu.field ? ` in ${edu.field}` : ""}</h3>
                <div className="font-mono text-xs text-text-muted mb-2">{edu.institution} · {edu.duration}</div>
                {edu.gpa && <span className="inline-block px-2 py-0.5 rounded-pill text-xs font-mono bg-bg-primary text-text-muted border border-border">GPA: {edu.gpa}</span>}
              </div>
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <div className="bg-bg-secondary border border-border rounded-card p-6 md:p-8">
            {Object.entries(resumeData.skills || {}).map(([group, items]) => items?.length > 0 ? (
              <div key={group} className="mb-6 last:mb-0">
                <h4 className="font-mono text-xs text-text-muted lowercase mb-3">{group}</h4>
                <div className="flex flex-wrap gap-[6px]">
                  {items.map((s, i) => (
                    <span key={i} className="px-3 py-1 rounded-pill text-sm font-mono bg-bg-primary text-text-muted border border-border">{s}</span>
                  ))}
                </div>
              </div>
            ) : null)}
          </div>
        </Section>

        <Section id="activity" title="Activity">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-mono text-sm text-text-muted lowercase mb-4">github</h3>
              <div className="grid grid-cols-2 gap-[10px] mb-4">
                <a href="https://github.com/sghani001" target="_blank" rel="noreferrer" className="bg-bg-secondary border border-border rounded-card p-3 hover:border-border-hover transition-colors">
                  <img src="https://github-readme-stats-eight-theta.vercel.app/api?username=sghani001&show_icons=true&theme=transparent&title_color=58a6ff&text_color=c9d1d9&icon_color=7ee787&hide_border=true&bg_color=0d1117" alt="GitHub Stats" className="w-full" />
                </a>
                <a href="https://github.com/sghani001" target="_blank" rel="noreferrer" className="bg-bg-secondary border border-border rounded-card p-3 hover:border-border-hover transition-colors">
                  <img src="https://github-readme-stats-eight-theta.vercel.app/api/top-langs/?username=sghani001&layout=compact&theme=transparent&title_color=58a6ff&text_color=c9d1d9&hide_border=true&bg_color=0d1117" alt="Top Languages" className="w-full" />
                </a>
              </div>
              <GitHubCalendar username="sghani001" />
            </div>
            <div>
              <h3 className="font-mono text-sm text-text-muted lowercase mb-4">leetcode</h3>
              <LeetcodeStats username="syedghani" />
            </div>
          </div>
        </Section>

        <Section id="gems" title="Ruby Gems">
          <GemStats />
        </Section>

        <Section id="projects" title="Projects">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10px]">
            {resumeData.projects.map((proj, i) => (
              <button key={i} onClick={() => setSelectedProject(proj)}
                className="text-left bg-bg-secondary border border-border rounded-card p-[14px] hover:border-border-hover transition-colors duration-150">
                <span className="font-mono font-medium text-text-primary block mb-1">{proj.name}</span>
                <p className="text-text-secondary text-sm leading-relaxed">{proj.description}</p>
                {proj.tech && (
                  <div className="flex flex-wrap gap-[6px] mt-3">
                    {proj.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-pill text-[11px] font-mono bg-bg-primary text-text-muted border border-border">{t}</span>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        </Section>

        <Section id="journey" title="Career">
          <div className="relative space-y-6">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
            {resumeData.journey.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-[15px] h-[15px] rounded-full bg-accent-secondary shrink-0 mt-1 relative z-10 border-2 border-bg-primary" />
                <div>
                  <div className="font-mono text-xs text-text-muted mb-0.5">{item.year}</div>
                  <h3 className="font-mono font-medium text-text-primary">{item.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed mt-0.5">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="testimonials" title="Testimonials">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
            {resumeData.testimonials.map((t, i) => (
              <div key={i} className="bg-bg-secondary border border-border rounded-card p-[14px]">
                <Quote size={16} className="text-accent-secondary/40 mb-2" />
                <p className="text-text-secondary text-sm leading-relaxed mb-4">"{t.quote}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-mono font-medium text-text-primary text-sm">{t.author}</h4>
                    <span className="font-mono text-xs text-text-muted">{t.title}</span>
                  </div>
                  {t.url && <a href={t.url} target="_blank" rel="noreferrer" className="text-text-muted hover:text-accent-secondary"><ExternalLink size={16} /></a>}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="contact" title="Contact">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-bg-secondary border border-border rounded-card p-6 space-y-4">
              <div className="flex items-center gap-3 text-text-secondary text-sm">
                <Mail size={16} className="text-accent-primary shrink-0" />
                <a href={`mailto:${resumeData.emailPersonal}`} className="hover:text-text-primary">{resumeData.emailPersonal}</a>
              </div>
              <div className="flex items-center gap-3 text-text-secondary text-sm">
                <MapPin size={16} className="text-accent-secondary shrink-0" />
                {resumeData.location}
              </div>
              <div className="flex items-center gap-3 text-text-secondary text-sm">
                <Phone size={16} className="text-accent-secondary shrink-0" />
                <a href={`tel:${resumeData.phone?.replace(/\s/g, "")}`} className="hover:text-text-primary">{resumeData.phone}</a>
              </div>
              <div className="flex gap-3 pt-2">
                {resumeData.socials?.map((s) => {
                  let icon;
                  if (s.icon === "github") {
                    icon = <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>;
                  } else if (s.icon === "linkedin") {
                    icon = <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
                  } else {
                    icon = <Mail size={18} />;
                  }
                  return (
                    <a key={s.name} href={s.url} target="_blank" rel="noreferrer" className="text-text-muted hover:text-accent-secondary" aria-label={s.name}>
                      {icon}
                    </a>
                  );
                })}
                {resumeData.leetcodeUrl && (
                  <a href={resumeData.leetcodeUrl} target="_blank" rel="noreferrer" className="font-mono text-xs text-text-muted hover:text-accent-secondary self-center">LC</a>
                )}
              </div>
            </div>
            <form className="bg-bg-secondary border border-border rounded-card p-6 space-y-4" onSubmit={handleContactSubmit}>
              <div className="flex gap-1 mb-2 bg-bg-primary p-1 border border-border rounded-card">
                <button type="button" onClick={() => setFormType("message")}
                  className={`flex-1 py-1.5 font-mono text-[11px] rounded-card transition-colors ${formType === "message" ? "bg-accent-primary text-bg-primary font-medium" : "text-text-muted hover:text-text-primary"}`}>
                  general message
                </button>
                <button type="button" onClick={() => setFormType("service")}
                  className={`flex-1 py-1.5 font-mono text-[11px] rounded-card transition-colors ${formType === "service" ? "bg-accent-primary text-bg-primary font-medium" : "text-text-muted hover:text-text-primary"}`}>
                  ask for service
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[11px] text-text-muted lowercase block mb-1">name</label>
                  <input type="text" name="name" required
                    className="w-full px-3 py-2 rounded-card bg-bg-primary border border-border text-text-primary text-sm focus:outline-none focus:border-border-hover placeholder:text-text-muted"
                    placeholder="Your name" />
                </div>
                <div>
                  <label className="font-mono text-[11px] text-text-muted lowercase block mb-1">email</label>
                  <input type="email" name="email" required
                    className="w-full px-3 py-2 rounded-card bg-bg-primary border border-border text-text-primary text-sm focus:outline-none focus:border-border-hover placeholder:text-text-muted"
                    placeholder="your@email.com" />
                </div>
              </div>

              {formType === "service" ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[11px] text-text-muted lowercase block mb-1">service type</label>
                      <select name="service" required
                        className="w-full px-3 py-2 rounded-card bg-bg-primary border border-border text-text-primary text-sm focus:outline-none focus:border-border-hover">
                        <option value="Web Development">Web Development</option>
                        <option value="Mobile App Development">Mobile App Development</option>
                        <option value="API Design & Backend">API Design & Backend</option>
                        <option value="Hotwire & Rails Consulting">Hotwire & Rails Consulting</option>
                        <option value="Code Audit & Refactoring">Code Audit & Refactoring</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-mono text-[11px] text-text-muted lowercase block mb-1">budget range</label>
                      <select name="budget" required
                        className="w-full px-3 py-2 rounded-card bg-bg-primary border border-border text-text-primary text-sm focus:outline-none focus:border-border-hover">
                        <option value="< $1,000">&lt; $1,000</option>
                        <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                        <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                        <option value="> $10,000">&gt; $10,000</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="font-mono text-[11px] text-text-muted lowercase block mb-1">project description</label>
                    <textarea name="description" rows={4} required minLength={10}
                      className="w-full px-3 py-2 rounded-card bg-bg-primary border border-border text-text-primary text-sm focus:outline-none focus:border-border-hover placeholder:text-text-muted resize-none"
                      placeholder="Describe your project goals, timeline, and requirements... (minimum 10 characters)" />
                  </div>
                </>
              ) : (
                <div>
                  <label className="font-mono text-[11px] text-text-muted lowercase block mb-1">message</label>
                  <textarea name="message" rows={4} required minLength={10}
                    className="w-full px-3 py-2 rounded-card bg-bg-primary border border-border text-text-primary text-sm focus:outline-none focus:border-border-hover placeholder:text-text-muted resize-none"
                    placeholder="Your message (minimum 10 characters)" />
                </div>
              )}

              <button type="submit" disabled={formState !== "idle"}
                className="w-full px-4 py-2.5 rounded-card border border-accent-primary text-accent-primary bg-transparent font-mono text-sm hover:bg-accent-primary/10 transition-all duration-150 disabled:opacity-40">
                {formState === "idle" && "Send request"}
                {formState === "sending" && "Sending..."}
                {formState === "success" && "Sent!"}
              </button>
              {formState === "success" && <p className="text-accent-primary text-xs font-mono text-center">delivered</p>}
            </form>
          </div>
        </Section>

        <footer className="border-t border-border py-8 mt-8">
          <div className="max-w-content mx-auto px-6 text-center">
            <p className="font-mono text-xs text-text-muted">
              <a href="https://www.linkedin.com/in/syed-m-ghani-357ba4234" target="_blank" rel="noreferrer" className="hover:text-text-primary">{resumeData.name}</a>
              <span className="mx-2">·</span>Software Engineer
            </p>
          </div>
        </footer>
      </main>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}

export default App;
