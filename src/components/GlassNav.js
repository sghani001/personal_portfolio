import React, { useState, useEffect } from "react";
import "./GlassNav.css";

const navLinks = [
  { id: "hero", label: null },
  { id: "summary", label: "About" },
  { id: "engineering", label: "Build" },
  { id: "experience", label: "Work" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "activity", label: "Stats" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "testimonials", label: "Voices" },
  { id: "contact", label: "Contact" },
];

const visibleLinks = navLinks.filter((l) => l.label);

export default function GlassNav({ theme, toggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState("hero");

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
          const best = Object.entries(visibilityMap).sort((a, b) => b[1] - a[1])[0];
          if (best && best[1] > 0) setActiveId(best[0]);
        },
        { root: scrollEl, threshold: [0, 0.2, 0.45, 0.7, 1] }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMobileOpen(false);
    window.history.pushState(null, "", `#${id}`);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const cvUrl = process.env.PUBLIC_URL + "/Syed_Ghani.pdf";

  return (
    <header className="dock-nav">
      <div className={`dock-nav__bar ${mobileOpen ? "dock-nav__bar--open" : ""}`}>
        <a href="#hero" className="dock-nav__brand" onClick={(e) => handleNavClick(e, "hero")} aria-label="Home">
          <span className="dock-nav__brand-mark">SG</span>
        </a>

        <button
          type="button"
          className="dock-nav__menu"
          aria-label="Menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span />
          <span />
        </button>

        <nav className={`dock-nav__links ${mobileOpen ? "dock-nav__links--visible" : ""}`} aria-label="Primary">
          {visibleLinks.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleNavClick(e, id)}
              className={`dock-nav__link ${activeId === id ? "dock-nav__link--active" : ""}`}
            >
              {label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className={`dock-nav__theme ${theme === "light" ? "dock-nav__theme--light" : ""}`}
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
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
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        <a href={cvUrl} download="Syed_Ghani.pdf" className="dock-nav__pill dock-nav__pill--cv" rel="noopener noreferrer">
          PDF
        </a>
      </div>
    </header>
  );
}
