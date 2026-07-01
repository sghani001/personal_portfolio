import React, { useCallback, memo } from "react";
import resumeData from "../utils/resumeData";
import "./Hero.css";

/**
 * HeroVisual — Sleek code editor mockup showcasing Syed's tech profile.
 * High-end professional visual replacing floating orbit elements.
 */
const HeroVisual = memo(function HeroVisual() {
  return (
    <div className="hero__visual" aria-hidden>
      <div className="code-editor-mockup glass-card">
        {/* Editor Tab bar */}
        <div className="editor-header">
          <div className="editor-dots">
            <span className="dot dot--red" />
            <span className="dot dot--yellow" />
            <span className="dot dot--green" />
          </div>
          <span className="editor-file">ghani.rb</span>
        </div>
        
        {/* Code Content */}
        <div className="editor-body">
          <pre className="code-block">
            <code>
<span className="code-keyword">class</span> <span className="code-class">Developer</span>
  attr_reader <span className="code-symbol">:name</span>, <span className="code-symbol">:stack</span>

  <span className="code-keyword">def</span> <span className="code-method">initialize</span>
    <span className="code-variable">@name</span>  = <span className="code-string">"Syed Ghani"</span>
    <span className="code-variable">@stack</span> = [<span className="code-string">"Rails"</span>, <span className="code-string">"React"</span>, <span className="code-string">"PostgreSQL"</span>]
  <span className="code-keyword">end</span>

  <span className="code-keyword">def</span> <span className="code-method">build_saas</span>(<span className="code-variable">client</span>)
    puts <span className="code-string">"Designing secure APIs..."</span>
    <span className="code-variable">client</span>.integrate_stripe!
    <span className="code-variable">client</span>.sync_hubspot!
    <span className="code-variable">client</span>.deploy_features!
  <span className="code-keyword">end</span>
<span className="code-keyword">end</span>
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
});

export default function Hero() {
  const heroRef = React.useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!heroRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = heroRef.current.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    heroRef.current.style.setProperty("--mx", x.toFixed(3));
    heroRef.current.style.setProperty("--my", y.toFixed(3));
  }, []);

  const scrollTo = useCallback(
    (id) => (e) => {
      e.preventDefault();
      window.history.pushState(null, "", `#${id}`);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    },
    []
  );

  return (
    <section
      id="hero"
      className="hero hero--vision"
      ref={heroRef}
      onMouseMove={handleMouseMove}
    >
      <div className="hero__grid">
        <div className="hero__copy">
          <p className="hero__eyebrow">Software Engineer · Lahore</p>
          <h1 className="hero__name">{resumeData.name}</h1>
          <div className="hero__typewriter">
            <span className="hero__typewriter-text">{resumeData.tagline}</span>
          </div>
          <p className="hero__headline">{resumeData.headline}</p>
          <div className="hero__metrics">
            {resumeData.metrics.map((m, i) => (
              <div key={i} className="hero__metric">
                <span className="hero__metric-value">{m.value}</span>
                <span className="hero__metric-label">{m.label}</span>
              </div>
            ))}
          </div>
          <div className="hero__badge-row" style={{ marginBottom: "1.5rem" }}>
            <a 
              href="https://github.com/sghani001" 
              target="_blank" 
              rel="noreferrer" 
              className="hero__badge-link"
            >
              <img 
                src="https://img.shields.io/badge/GitHub-sghani001-181717?style=for-the-badge&logo=github" 
                alt="GitHub Profile" 
                style={{ height: "26px", borderRadius: "5px" }} 
              />
            </a>
          </div>
          <ul className="hero__bullets">
            {(resumeData.heroBullets || []).map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <div className="hero__actions">
              <button
                type="button"
                className="hero__btn hero__btn--primary"
                onClick={scrollTo("experience")}
              >
                View experience
              </button>

              <a
                href="#contact"
                className="hero__btn hero__btn--ghost"
                onClick={scrollTo("contact")}
              >
                Contact
              </a>
          </div>
        </div>

        <HeroVisual />
      </div>

      <button
        type="button"
        className="hero__scroll-hint"
        onClick={scrollTo("about")}
        aria-label="Scroll to about"
      >
        <span className="hero__scroll-line" />
        <span className="hero__scroll-label">Scroll</span>
      </button>
    </section>
  );
}
