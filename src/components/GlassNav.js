import React, { useState, useEffect } from "react";
import { resumeData } from "../utils/resumeData";
import "./GlassNav.css";

const navLinks = [
  { id: "summary", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Personal Projects" },
  { id: "contact", label: "Contact" },
];

export default function GlassNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const el = document.querySelector(".fullpage-scroll");
    const onScroll = () => setScrolled(el ? el.scrollTop > 40 : false);
    if (el) el.addEventListener("scroll", onScroll, { passive: true });
    return () => el && el.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMobileOpen(false);
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
          {navLinks.map(({ id, label }) => (
            <a key={id} href={`#${id}`} onClick={(e) => handleNavClick(e, id)} className="magic-nav__link">
              {label}
            </a>
          ))}
        </nav>
        <a href={cvUrl} download="Syed_Ghani.pdf" className="magic-nav__cv" rel="noopener noreferrer">
          CV
        </a>
      </div>
    </header>
  );
}
