import React from "react";
import GlassNav from "./components/GlassNav";
import Hero from "./components/Hero";
import resumeData from "./utils/resumeData";
import { useInView } from "./hooks/useInView";
import "./App.css";

function Section({ id, title, subtitle, children, fullPage }) {
  const [ref, inView] = useInView();

  return (
    <section
      ref={ref}
      id={id}
      className={`portfolio-section ${fullPage ? "portfolio-section--fullpage" : ""} ${inView ? "portfolio-section--in-view" : ""}`}
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
  const handleContactSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name?.value || "";
    const email = form.email?.value || "";
    const message = form.message?.value || "";
    const mailto = `mailto:${resumeData.emailPersonal}?subject=Contact from ${encodeURIComponent(
      name
    )}&body=Name: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0A%0A${encodeURIComponent(
      message
    )}`;
    window.location.href = mailto;
  };

  return (
    <>
      <GlassNav />
      <main className="fullpage-scroll">
        <Hero />

        <Section id="summary" title="About Me" subtitle="Brief" fullPage>
          <div className="magic-card magic-card--text">
            <p className="magic-brief">{resumeData.summary}</p>
            {resumeData.aboutExtra && (
              <p className="magic-brief magic-brief--extra">{resumeData.aboutExtra}</p>
            )}
          </div>
        </Section>

        <Section id="experience" title="Experience" fullPage>
          <div className="exp-list">
            {resumeData.experience.map((job, i) => (
              <div key={i} className="exp-item glass-card">
                <div className="exp-item__header">
                  <span className="exp-item__role">{job.role}</span>
                  <span className="exp-item__company">{job.company}</span>
                </div>
                <div className="exp-item__meta">
                  {job.duration}
                  {job.durationShort && ` (${job.durationShort})`} · {job.location}
                </div>
                {job.projects && (
                  <div className="exp-item__projects exp-item__projects--cards">
                    {job.projects.map((proj, j) => (
                      <a
                        key={j}
                        href={proj.url || "#"}
                        target={proj.url ? "_blank" : undefined}
                        rel={proj.url ? "noreferrer" : undefined}
                        className="exp-project-card"
                        onClick={!proj.url ? (e) => e.preventDefault() : undefined}
                      >
                        <div className="exp-project-card__img-wrap">
                          {proj.image ? (
                            <img src={proj.image} alt="" className="exp-project-card__img exp-project-card__img--photo" />
                          ) : (
                            <div className={`exp-project-card__img exp-project-card__img--${(j % 3) + 1}`} aria-hidden />
                          )}
                        </div>
                        <span className="exp-project-card__label">{proj.name}</span>
                        <p className="exp-project-card__desc">{proj.description}</p>
                      </a>
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
        </Section>

        <Section id="education" title="Education" fullPage>
          <div className="edu-list">
            {resumeData.education.map((edu, i) => (
              <div key={i} className="edu-item glass-card">
                <div className="edu-item__degree">{edu.degree}</div>
                <div className="edu-item__meta">
                  {edu.institution} · {edu.duration}
                </div>
                {edu.gpa && <div className="edu-item__gpa">GPA: {edu.gpa}</div>}
              </div>
            ))}
          </div>
        </Section>

        <Section id="skills" title="Your skills" fullPage>
          <div className="glass-card" style={{ padding: "1.5rem 1.75rem" }}>
            <div className="skills-group">
              <div className="skills-group__label">Core</div>
              <div className="skills-grid">
                {resumeData.skills.core.map((s, i) => (
                  <span key={i} className="skill-pill">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="skills-group">
              <div className="skills-group__label">Integrations & tools</div>
              <div className="skills-grid">
                {resumeData.skills.integrations.map((s, i) => (
                  <span key={i} className="skill-pill">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="skills-group">
              <div className="skills-group__label">Front-end</div>
              <div className="skills-grid">
                {resumeData.skills.frontend.map((s, i) => (
                  <span key={i} className="skill-pill">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="skills-group">
              <div className="skills-group__label">Also</div>
              <div className="skills-grid">
                {resumeData.skills.also.map((s, i) => (
                  <span key={i} className="skill-pill">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section id="projects" title="Personal Projects" fullPage>
          <div className="magic-projects">
            {resumeData.projects.map((proj, i) => (
              <a
                key={i}
                href={proj.url || "#"}
                target={proj.url ? "_blank" : undefined}
                rel={proj.url ? "noreferrer" : undefined}
                className="magic-project-card"
                onClick={!proj.url ? (e) => e.preventDefault() : undefined}
              >
                <div className="magic-project-card__img-wrap">
                  {proj.image ? (
                    <img src={proj.image} alt="" className="magic-project-card__img magic-project-card__img--photo" />
                  ) : (
                    <div className={`magic-project-card__img magic-project-card__img--${(i % 3) + 1}`} aria-hidden />
                  )}
                </div>
                <span className="magic-project-card__label">{proj.name}</span>
                {proj.description && (
                  <span className="magic-project-card__desc">{proj.description}</span>
                )}
              </a>
            ))}
          </div>
        </Section>

        <Section id="contact" title="Contact" fullPage>
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
                <button type="submit" className="hero__btn hero__btn--primary">
                  Send message
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
    </>
  );
}

export default App;
