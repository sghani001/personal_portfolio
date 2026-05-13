import React from "react";
import resumeData from "../utils/resumeData";
import "./Hero.css";

const heroPhoto = process.env.PUBLIC_URL + "/hero-photo.png";

export default function Hero() {
  const scrollTo = (id) => (e) => {
    e.preventDefault();
    window.history.pushState(null, "", `#${id}`);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="hero hero--vision">
      <div className="hero__grid">
        <div className="hero__copy">
          <p className="hero__eyebrow">Software engineer · Lahore</p>
          <h1 className="hero__name">{resumeData.name}</h1>
          <p className="hero__headline">{resumeData.headline}</p>
          <ul className="hero__bullets">
            {(resumeData.heroBullets || []).map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <div className="hero__actions">
            <button type="button" className="hero__btn hero__btn--primary" onClick={scrollTo("experience")}>
              View experience
            </button>
            <a href="#contact" className="hero__btn hero__btn--ghost" onClick={scrollTo("contact")}>
              Contact
            </a>
          </div>
        </div>

        <div className="hero__visual" aria-hidden>
          <div className="hero-scene">
            <div className="hero-scene__depth">
              <div className="hero-scene__panel hero-scene__panel--rails">
                <span className="hero-scene__panel-label">Rails</span>
                <span className="hero-scene__panel-lines" />
              </div>
              <div className="hero-scene__panel hero-scene__panel--react">
                <span className="hero-scene__panel-label">React</span>
              </div>
              <div className="hero-scene__panel hero-scene__panel--python">
                <span className="hero-scene__panel-label">Python</span>
              </div>

              <div className="hero-scene__ruby-wrap">
                <div className="hero-scene__ruby" />
              </div>
              <div className="hero-scene__orbit">
                <span className="hero-scene__electron" />
              </div>

              <div className="hero-scene__pillars">
                <span className="hero-scene__pillar" />
                <span className="hero-scene__pillar hero-scene__pillar--mid" />
                <span className="hero-scene__pillar" />
              </div>
            </div>

            <div className="hero-scene__photo glass-hero-photo">
              <img src={heroPhoto} alt="" className="hero-scene__photo-img" />
            </div>
          </div>
        </div>
      </div>

      <button type="button" className="hero__scroll-hint" onClick={scrollTo("summary")} aria-label="Scroll to about">
        <span className="hero__scroll-line" />
        <span className="hero__scroll-label">Scroll</span>
      </button>
    </section>
  );
}
