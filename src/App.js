import React, { useState, useEffect } from "react";
import GlassNav from "./components/GlassNav";
import Hero from "./components/Hero";
import ProjectModal from "./components/ProjectModal";
import LeetcodeStats from "./components/LeetcodeStats";
import GitHubCalendar from "./components/GitHubCalendar";
import SpotlightCard from "./components/SpotlightCard";
import LinkedInBadge from "./components/LinkedInBadge";
import resumeData from "./utils/resumeData";
import { skillPillClass } from "./utils/skillTone";
import { useInView } from "./hooks/useInView";
import "./App.css";
import GitHubBadge from "./components/GitHubBadge";
import LeetCodeBadge from "./components/LeetCodeBadge";

function Section({ id, title, subtitle, children, fullPage }) {
  const [ref, inView] = useInView();

  return (
    <section
      ref={ref}
      id={id}
      className={`portfolio-section ${fullPage ? "portfolio-section--fullpage" : ""} ${inView ? "portfolio-section--in-view" : ""}`}
      data-in-view={inView ? "true" : "false"}
    >
      <div className="portfolio-section__inner">
        <h2 className="portfolio-section__title">{title}</h2>
        {subtitle && <p className="portfolio-section__subtitle">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}

function App() {
  const [formState, setFormState] = useState("idle"); // idle | sending | success
  const [selectedProject, setSelectedProject] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem("portfolio-theme") || "dark");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  useEffect(() => {
    console.log(
      "%cSyed Ghani — portfolio",
      "color: #b79fff; font-size: 18px; font-weight: 700; font-family: system-ui, sans-serif;"
    );
    console.log(
      "%cReact + Framer Motion + hand-tuned glass UI. If something looks off in your browser, I want to know.\n%s",
      "color: rgba(244,246,255,0.85); font-size: 13px; font-family: system-ui, sans-serif; line-height: 1.55;",
      "syedghani001@gmail.com"
    );
  }, []);

  // Scroll to hash on load
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 300); // Small delay to wait for rendering
    }
  }, []);



  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (formState !== "idle") return;
    setFormState("sending");
    const form = e.target;
    const name = form.name?.value || "";
    const email = form.email?.value || "";
    const message = form.message?.value || "";
    const mailto = `mailto:${resumeData.emailPersonal}?subject=Contact from ${encodeURIComponent(
      name
    )}&body=Name: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0A%0A${encodeURIComponent(
      message
    )}`;
    setTimeout(() => {
      window.location.href = mailto;
      setFormState("success");
      setTimeout(() => setFormState("idle"), 3000);
    }, 900);
  };

  return (
    <>
      <GlassNav theme={theme} toggleTheme={toggleTheme} />
      <main className="fullpage-scroll">
        <Hero />

        {/* SECTION 1: ABOUT */}
        <Section id="about" title="About Me" subtitle="Brief" fullPage>
          {/* Full width about card */}
          <SpotlightCard className="magic-card--text" style={{ width: "100%", marginBottom: "2rem" }}>
            <p className="magic-brief">{resumeData.summary}</p>
            {resumeData.aboutExtra && (
              <p className="magic-brief magic-brief--extra">{resumeData.aboutExtra}</p>
            )}
          </SpotlightCard>

          {/* Badges row */}
          <div className="about-badges-row" style={{ marginBottom: "3rem" }}>
            <LinkedInBadge theme={theme} />
            <GitHubBadge username="sghani001" theme={theme} />
            <LeetCodeBadge username="syedghani" />
          </div>

          {/* Engineering Practices & Highlights */}
          <div className="engineering-grid">
            <SpotlightCard className="engineering-card">
              <h3 className="engineering-card__title">Engineering Practices</h3>
              <ul className="engineering-practices-list">
                {resumeData.engineeringPractices.map((practice, i) => (
                  <li key={i}>{practice}</li>
                ))}
              </ul>
            </SpotlightCard>
            <div className="engineering-highlights">
              {resumeData.technicalHighlights.map((highlight, i) => (
                <div key={i} className="glass-card highlight-item" style={{ "--stagger-i": i }}>
                  <h4 className="highlight-item__title">
                    {highlight.title}
                  </h4>
                  <p className="highlight-item__desc">{highlight.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* SECTION 2: EXPERIENCE */}
        <Section id="experience" title="Experience & Journey" fullPage>
          <div className="exp-list">
            {resumeData.experience.map((job, i) => (
              <div key={i} className="exp-item glass-card" style={{ "--stagger-i": i }}>
                <div className="exp-item__header">
                  {job.roles ? (
                    <div className="exp-item__roles-list">
                      {job.roles.map((r, rIdx) => (
                        <div key={rIdx} className="exp-item__role-entry">
                          <span className="exp-item__role">{r.title}</span>
                          <span className="exp-item__role-duration">{r.duration}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="exp-item__role">{job.role}</span>
                  )}
                  {job.companyUrl ? (
                    <a href={job.companyUrl} target="_blank" rel="noreferrer" className="exp-item__company-link">
                      <span className="exp-item__company">{job.company}</span>
                      <svg
                        className="exp-item__link-icon"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  ) : (
                    <span className="exp-item__company">{job.company}</span>
                  )}
                </div>
                {!job.roles ? (
                  <div className="exp-item__meta">
                    {job.duration}
                    {job.durationShort && ` (${job.durationShort})`} · {job.location}
                  </div>
                ) : (
                  <div className="exp-item__meta">
                    {job.location}
                  </div>
                )}
                {job.projects && (
                  <div className="exp-item__projects exp-item__projects--cards">
                    {job.projects.map((proj, j) => (
                      <div key={j} className="exp-project-card" onClick={() => setSelectedProject(proj)}>
                        <div className="exp-project-card__img-wrap">
                          {proj.image ? (
                            <img src={proj.image} alt="" className="exp-project-card__img exp-project-card__img--photo" />
                          ) : (
                            <div className={`exp-project-card__img exp-project-card__img--${(j % 3) + 1}`} aria-hidden />
                          )}
                        </div>
                        <span className="exp-project-card__label">{proj.name}</span>
                        <p className="exp-project-card__desc">{proj.description}</p>
                      </div>
                    ))}
                  </div>
                )}
                {job.points && (
                  <ul className="exp-item__points">
                    {job.points.map((point, k) => (
                      <li key={k}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="experience-footer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginTop: "3rem" }}>
            {/* Career Journey Timeline */}
            <div className="journey-block">
              <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1.5rem", color: "var(--text-primary)" }}>Career Timeline</h3>
              <div className="journey-timeline journey-timeline--compact">
                {resumeData.journey.map((item, i) => (
                  <div key={i} className="journey-item" style={{ "--stagger-i": i }}>
                    <div className="journey-item__dot"></div>
                    <div className="journey-item__content glass-card">
                      <div className="journey-item__year">{item.year}</div>
                      <h4 className="journey-item__title" style={{ fontSize: "0.95rem", margin: "0.2rem 0" }}>{item.title}</h4>
                      <p className="journey-item__desc" style={{ fontSize: "0.85rem", margin: 0 }}>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Block */}
            <div className="education-block">
              <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1.5rem", color: "var(--text-primary)" }}>Education</h3>
              <div className="edu-list">
                {resumeData.education.map((edu, i) => (
                  <div key={i} className="edu-item glass-card" style={{ "--stagger-i": i }}>
                    <div className="edu-item__degree" style={{ fontWeight: "600" }}>{edu.degree}</div>
                    <div className="edu-item__meta" style={{ fontSize: "0.9rem" }}>
                      {edu.institution}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                      {edu.duration} {edu.gpa && `· GPA: ${edu.gpa}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* SECTION 3: PROJECTS */}
        <Section id="projects" title="Personal Projects" fullPage>
          <div className="magic-projects">
            {resumeData.projects.map((proj, i) => (
              <div key={i} className="magic-project-card" onClick={() => setSelectedProject(proj)}>
                <div className="magic-project-card__img-wrap">
                  {proj.image ? (
                    <img src={proj.image} alt="" className="magic-project-card__img magic-project-card__img--photo" />
                  ) : (
                    <div className={`magic-project-card__img magic-project-card__img--${(i % 3) + 1}`} aria-hidden />
                  )}
                </div>
                <span className="magic-project-card__label">{proj.name}</span>
                {proj.description && <span className="magic-project-card__desc">{proj.description}</span>}
              </div>
            ))}
          </div>
        </Section>

        {/* SECTION 4: SKILLS & STATS */}
        <Section id="activity" title="Skills & Stats" subtitle="Technical Prowess" fullPage>
          {/* Skills Grid Card */}
          <div className="glass-card" style={{ padding: "1.5rem 1.75rem", marginBottom: "2.5rem" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: "600", marginBottom: "1.5rem", color: "var(--text-primary)" }}>Skills Profile</h3>
            <div className="skills-group">
              <div className="skills-group__label">Core</div>
              <div className="skills-grid">
                {resumeData.skills.core.map((s, i) => (
                  <span key={i} className={`skill-pill ${skillPillClass(s)}`} style={{ "--pill-i": i }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="skills-group">
              <div className="skills-group__label">Integrations & tools</div>
              <div className="skills-grid">
                {resumeData.skills.integrations.map((s, i) => (
                  <span key={i} className={`skill-pill ${skillPillClass(s)}`} style={{ "--pill-i": i }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="skills-group">
              <div className="skills-group__label">Front-end</div>
              <div className="skills-grid">
                {resumeData.skills.frontend.map((s, i) => (
                  <span key={i} className={`skill-pill ${skillPillClass(s)}`} style={{ "--pill-i": i }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="skills-group">
              <div className="skills-group__label">Also</div>
              <div className="skills-grid">
                {resumeData.skills.also.map((s, i) => (
                  <span key={i} className={`skill-pill ${skillPillClass(s)}`} style={{ "--pill-i": i }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="activity-grid">
            <div className="github-activity">
              <h3 className="activity-group-title">GitHub Activity</h3>
              <div className="github-stats-grid">
                <a href="https://github.com/sghani001" target="_blank" rel="noreferrer" className="glass-card github-card fade-in-up">
                  <img
                    src={`https://github-readme-stats-eight-theta.vercel.app/api?username=sghani001&show_icons=true&theme=transparent&title_color=${theme === "dark" ? "3b82f6" : "2563eb"}&text_color=${theme === "dark" ? "fafafa" : "09090b"}&icon_color=${theme === "dark" ? "4f46e5" : "2563eb"}&hide_border=true&bg_color=00000000`}
                    alt="Syed Ghani's GitHub Stats"
                    className="github-stat-img"
                  />
                </a>
                <a href="https://github.com/sghani001" target="_blank" rel="noreferrer" className="glass-card github-card fade-in-up" style={{ animationDelay: '0.1s' }}>
                  <img
                    src={`https://github-readme-stats-eight-theta.vercel.app/api/top-langs/?username=sghani001&layout=compact&theme=transparent&title_color=${theme === "dark" ? "3b82f6" : "2563eb"}&text_color=${theme === "dark" ? "fafafa" : "09090b"}&hide_border=true&bg_color=00000000`}
                    alt="Top Languages"
                    className="github-stat-img"
                  />
                </a>
              </div>
              <div className="github-contribution fade-in-up" style={{ animationDelay: '0.2s', width: '100%' }}>
                <GitHubCalendar username="sghani001" theme={theme} />
              </div>
            </div>

            <div className="leetcode-activity">
              <h3 className="activity-group-title">LeetCode Stats</h3>
              <div className="fade-in-up" style={{ animationDelay: '0.3s' }}>
                <LeetcodeStats username="syedghani" />
              </div>
            </div>
          </div>
        </Section>

        {/* SECTION 5: CONTACT */}
        <Section id="contact" title="Contact & Testimonials" fullPage>
          {/* Testimonials Grid */}
          <div className="testimonials-wrap" style={{ marginBottom: "3rem" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1.5rem", color: "var(--text-primary)" }}>Testimonials</h3>
            <div className="testimonials-grid">
              {resumeData.testimonials.map((test, i) => (
                <div key={i} className="testimonial-card glass-card" style={{ "--stagger-i": i }}>
                  <svg className="testimonial-quote-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="testimonial-text">"{test.quote}"</p>
                  <div className="testimonial-author-wrap">
                    <div className="testimonial-author-info">
                      <h4 className="testimonial-author">{test.author}</h4>
                      <span className="testimonial-role">{test.title}</span>
                    </div>
                    {test.url && (
                      <a href={test.url} target="_blank" rel="noreferrer" className="testimonial-link" aria-label="View original post">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-inner">
            <div className="glass-card" style={{ padding: "1.5rem 1.75rem" }}>
              <div className="contact-info__item">
                <strong>Email</strong>
                <a href={`mailto:${resumeData.emailPersonal}`}>{resumeData.emailPersonal}</a>
              </div>
              <div className="contact-info__item">
                <strong>Location</strong>
                {resumeData.location}
              </div>
              <div className="contact-info__item">
                <strong>Phone</strong>
                <a href={`tel:${resumeData.phone.replace(/\s/g, "")}`}>{resumeData.phone}</a>
              </div>
              <div className="contact-info__item">
                <strong>Links</strong>
                <span>
                  {resumeData.socials.map((s, i) => (
                    <React.Fragment key={s.name}>
                      <a href={s.url} target="_blank" rel="noreferrer">
                        {s.name}
                      </a>
                      {i < resumeData.socials.length - 1 && " · "}
                    </React.Fragment>
                  ))}
                  {" · "}
                  <a href={resumeData.leetcodeUrl} target="_blank" rel="noreferrer">
                    LeetCode
                  </a>
                </span>
              </div>
            </div>
            <div className="contact-form">
              <form className="glass-card" onSubmit={handleContactSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  rows={4}
                />
                <button
                  type="submit"
                  className={`hero__btn hero__btn--primary contact-form__submit contact-form__submit--${formState}`}
                  disabled={formState !== "idle"}
                >
                  {formState === "idle" && "Send message"}
                  {formState === "sending" && (
                    <span className="contact-form__spinner-wrap">
                      <span className="contact-form__spinner" aria-hidden /> Sending…
                    </span>
                  )}
                  {formState === "success" && (
                    <span className="contact-form__success-wrap">
                      <svg className="contact-form__check" viewBox="0 0 20 20" fill="none" aria-hidden>
                        <polyline points="4 10 8 14 16 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Sent!
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </Section>

        <footer className="magic-footer">
          <div className="magic-footer__gradient" aria-hidden />
          <div className="magic-footer__inner">
            <p>
              <a href="https://www.linkedin.com/in/syed-m-ghani-357ba4234" target="_blank" rel="noreferrer">
                {resumeData.name}
              </a>
              — Software Engineer · Lahore
            </p>
          </div>
        </footer>
      </main>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}

export default App;
