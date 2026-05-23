import React, { useCallback, memo } from "react";
import resumeData from "../utils/resumeData";
import MagneticWrapper from "./MagneticWrapper";
import "./Hero.css";

const heroPhoto = process.env.PUBLIC_URL + "/hero-photo.png";
const roles = resumeData.titles || [resumeData.title];

/**
 * HeroVisual — Memoized so the 3D scene never re-renders during
 * typewriter state changes in the parent Hero component.
 */
const HeroVisual = memo(function HeroVisual() {
  return (
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
  );
});

export default function Hero() {
  const [titleIndex, setTitleIndex] = React.useState(0);
  const [displayText, setDisplayText] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [typingSpeed, setTypingSpeed] = React.useState(150);
  const heroRef = React.useRef(null);

  React.useEffect(() => {
    const handleTyping = () => {
      const currentRole = roles[titleIndex];
      const isFinishing = !isDeleting && displayText === currentRole;
      const isStarting = isDeleting && displayText === "";

      if (isFinishing) {
        setTimeout(() => setIsDeleting(true), 2000);
        return;
      }

      if (isStarting) {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % roles.length);
        return;
      }

      const nextText = isDeleting
        ? currentRole.substring(0, displayText.length - 1)
        : currentRole.substring(0, displayText.length + 1);

      setDisplayText(nextText);
      setTypingSpeed(isDeleting ? 50 : 120);
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex, typingSpeed]);

  // Stable ref — doesn't change across typewriter re-renders
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
          <p className="hero__eyebrow">Software engineer · Lahore</p>
          <h1 className="hero__name">{resumeData.name}</h1>
          <div className="hero__typewriter">
            <span className="hero__typewriter-text">{displayText || roles[0]}</span>
            <span className="hero__typewriter-cursor">|</span>
          </div>
          <p className="hero__headline">{resumeData.headline}</p>
          <ul className="hero__bullets">
            {(resumeData.heroBullets || []).map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <div className="hero__actions">
            <MagneticWrapper strength={0.35}>
              <button
                type="button"
                className="hero__btn hero__btn--primary"
                onClick={scrollTo("experience")}
              >
                View experience
              </button>
            </MagneticWrapper>

            <MagneticWrapper strength={0.25}>
              <a
                href="#contact"
                className="hero__btn hero__btn--ghost"
                onClick={scrollTo("contact")}
              >
                Contact
              </a>
            </MagneticWrapper>
          </div>
        </div>

        <HeroVisual />
      </div>

      <button
        type="button"
        className="hero__scroll-hint"
        onClick={scrollTo("summary")}
        aria-label="Scroll to about"
      >
        <span className="hero__scroll-line" />
        <span className="hero__scroll-label">Scroll</span>
      </button>
    </section>
  );
}
