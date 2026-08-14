import React, { useEffect, useState, useRef } from "react";
import resumeData from "../utils/resumeData";
import C from "../theme";
import { IconArrow, IconExternal, IconDownload } from "./Icons";
import { useScrollSpy } from "../hooks/useScrollSpy";

// Module-level constant: a fresh array each render would re-run the spy's effect
// on every scroll-driven re-render.
const SECTION_IDS = [
  "rails-showcase", "case-studies", "gems", "projects", "skills", "process",
  "tech-stack", "github", "experience", "education", "testimonials", "about", "contact",
];

function ResumeDropdown() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpen(false);
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("mousedown", onDocClick);
      document.addEventListener("touchstart", onDocClick);
      document.addEventListener("keydown", onKey);
    }
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("touchstart", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        style={{
          padding: "8px 14px",
          borderRadius: 8,
          border: `1px solid ${C.border}`,
          background: C.surface,
          color: C.primary,
          cursor: "pointer",
          fontSize: 13,
        }}
      >
        Resume ▾
      </button>
      {open && (
        <div
          role="menu"
          style={{
            position: "absolute",
            right: 0,
            marginTop: 8,
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 8,
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            zIndex: 60,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", minWidth: 220 }}>
            {resumeData.resumeDownloads.map((dl, i) => (
              <a
                key={i}
                href={dl.file}
                download={dl.file.split("/").pop()}
                onClick={() => setOpen(false)}
                role="menuitem"
                style={{
                  padding: "10px 14px",
                  textDecoration: "none",
                  color: C.primary,
                  borderBottom: i < resumeData.resumeDownloads.length - 1 ? `1px solid ${C.border}` : "none",
                }}
              >
                {dl.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Nav({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close the drawer on Escape, and if the viewport grows back to desktop
  // (where the drawer is hidden but would otherwise stay "open" in state).
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  // Every section on the page, in document order. Labels are kept short so the
  // full set fits the desktop bar. (There used to be a "#resume" entry here that
  // pointed at an element that doesn't exist — it scrolled nowhere. Resume
  // downloads live in the dropdown beside this row and in the mobile drawer.)
  const links = [
    ["#rails-showcase", "Rails"],
    ["#case-studies", "Work"],
    ["#gems", "Gems"],
    ["#projects", "Projects"],
    ["#skills", "Skills"],
    ["#process", "Process"],
    ["#tech-stack", "Stack"],
    ["#github", "Activity"],
    ["#experience", "Experience"],
    ["#education", "Education"],
    ["#testimonials", "Reviews"],
    ["#about", "About"],
    ["#contact", "Contact"],
  ];

  const activeId = useScrollSpy(SECTION_IDS);

  const navBg = scrolled ? (theme === "dark" ? "#121212F2" : "#F5F3F0F2") : "transparent";

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: navBg,
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        boxShadow: scrolled ? "0 4px 24px var(--shadow-base)" : "none",
        transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
      }}
    >
      <div
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: `linear-gradient(135deg, ${C.copper}, ${C.copperDeep})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: 800,
              color: C.onGold,
              fontFamily: "'Space Grotesk',sans-serif",
            }}
          >
            SG
          </div>
          <div style={{ display: "none" }} className="sm-show">
            <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, color: C.primary, fontSize: 14, margin: 0 }}>
              Syed M. Ghani
            </p>
            <p style={{ fontFamily: "'JetBrains Mono',monospace", color: C.secondary, fontSize: 11, margin: 0 }}>
              Rails · React
            </p>
          </div>
        </a>

        <div className="nav-links">
          {links.map(([href, label]) => {
            const isActive = href.slice(1) === activeId;
            return (
              <a
                key={href}
                href={href}
                aria-current={isActive ? "true" : undefined}
                style={{
                  position: "relative",
                  color: isActive ? C.primary : C.secondary,
                  fontWeight: isActive ? 600 : 400,
                  fontSize: 13,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  transition: "color 0.2s",
                  paddingBottom: 4,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.primary)}
                onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? C.primary : C.secondary)}
              >
                {label}
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: 2,
                    borderRadius: 2,
                    background: C.copper,
                    transform: isActive ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "center",
                    transition: "transform 0.25s ease",
                  }}
                />
              </a>
            );
          })}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={toggleTheme}
            id="theme-toggle"
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              border: `1px solid ${C.border}`,
              background: "transparent",
              color: C.secondary,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
            }}
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>
          <span className="nav-resume-desktop">
            <ResumeDropdown />
          </span>
          <a
            id="nav-hire-cta"
            href="#contact"
            className="nav-hire"
            style={{
              padding: "8px 20px",
              background: `linear-gradient(135deg, ${C.copper}, ${C.copperDeep})`,
              color: C.onGold,
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 700,
              fontFamily: "'Space Grotesk',sans-serif",
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12)",
              transition: "opacity 0.2s",
            }}
          >
            Hire Me
          </a>

          {/* Below 1024px the .nav-links row is hidden, so this is the only way
              to reach the sections — without it mobile has no navigation at all. */}
          <button
            className="nav-burger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              border: `1px solid ${C.border}`,
              background: C.surface,
              color: C.primary,
              cursor: "pointer",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 4,
              padding: 0,
              flexShrink: 0,
            }}
          >
            <span style={{ display: "block", width: 16, height: 2, borderRadius: 2, background: "currentColor", transition: "transform 0.25s", transform: menuOpen ? "translateY(3px) rotate(45deg)" : "none" }} />
            <span style={{ display: "block", width: 16, height: 2, borderRadius: 2, background: "currentColor", transition: "transform 0.25s", transform: menuOpen ? "translateY(-3px) rotate(-45deg)" : "none" }} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="nav-drawer"
          style={{
            borderTop: `1px solid ${C.border}`,
            background: theme === "dark" ? "#121212F7" : "#F5F3F0F7",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: "0 16px 40px var(--shadow-base)",
            maxHeight: "calc(100vh - 64px)",
            overflowY: "auto",
          }}
        >
          <div style={{ padding: "8px 24px 20px", display: "flex", flexDirection: "column" }}>
            {links.map(([href, label]) => {
              const isActive = href.slice(1) === activeId;
              return (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive ? "true" : undefined}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "14px 4px",
                    color: isActive ? C.accentText : C.primary,
                    fontSize: 16,
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontWeight: isActive ? 700 : 600,
                    textDecoration: "none",
                    borderBottom: `1px solid ${C.border}`,
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 3,
                      height: 16,
                      borderRadius: 2,
                      background: isActive ? C.copper : "transparent",
                      flexShrink: 0,
                    }}
                  />
                  {label}
                </a>
              );
            })}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
              {resumeData.resumeDownloads.map((dl, i) => (
                <a
                  key={i}
                  href={dl.file}
                  download={dl.file.split("/").pop()}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "14px 16px",
                    borderRadius: 10,
                    border: `1px solid ${C.border}`,
                    background: C.surface,
                    color: C.primary,
                    fontSize: 13,
                    textDecoration: "none",
                  }}
                >
                  <IconDownload /> {dl.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
