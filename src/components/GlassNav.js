import React, { useState, useEffect } from "react";
import "./GlassNav.css";

const navLinks = [
  { id: "hero", label: null },
  { id: "summary", label: "About" },
  { id: "engineering", label: "Engineering" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "activity", label: "Prowess" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

const visibleLinks = navLinks.filter((l) => l.label);

export default function GlassNav({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState("hero");

  // Scrolled state
  useEffect(() => {
    const el = document.querySelector(".fullpage-scroll");
    const onScroll = () => setScrolled(el ? el.scrollTop > 40 : false);
    if (el) el.addEventListener("scroll", onScroll, { passive: true });
    return () => el && el.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const scrollEl = document.querySelector(".fullpage-scroll");
    const sectionIds = navLinks.map((l) => l.id);
    const observers = [];
    const visibilityMap = {};

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          visibilityMap[id] = entry.intersectionRatio;
          // Pick the section with highest visibility
          const best = Object.entries(visibilityMap).sort((a, b) => b[1] - a[1])[0];
          if (best && best[1] > 0) setActiveId(best[0]);
        },
        { root: scrollEl, threshold: [0, 0.25, 0.5, 0.75, 1] }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);



  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMobileOpen(false);
    // Push the hash to the URL so shared links work accurately
    window.history.pushState(null, null, `#${id}`);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const cvUrl = process.env.PUBLIC_URL + "/Syed_Ghani.pdf";

  return (
    <header className={`magic-nav ${scrolled ? "magic-nav--scrolled" : ""}`}>
      <div className="magic-nav__inner">
        <a href="#hero" className="magic-nav__logo" onClick={(e) => handleNavClick(e, "hero")}>
          <span className="magic-nav__logo-mark" aria-hidden>G</span>
        </a>
        <button
          type="button"
          className="magic-nav__toggle"
          aria-label="Menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span /><span /><span />
        </button>
        <nav className={`magic-nav__links ${mobileOpen ? "magic-nav__links--open" : ""}`}>
          {visibleLinks.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleNavClick(e, id)}
              className={`magic-nav__link ${activeId === id ? "magic-nav__link--active" : ""}`}
            >
              {label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className={`magic-nav__theme-toggle ${theme === "light" ? "magic-nav__theme-toggle--light" : ""}`}
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
        <a href={cvUrl} download="Syed_Ghani.pdf" className="magic-nav__cv" rel="noopener noreferrer">
          CV
        </a>
      </div>
    </header>
  );
}
