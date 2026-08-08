import React, { useEffect, useState, useRef } from "react";
import resumeData from "../utils/resumeData";
import C from "../theme";
import { IconArrow, IconExternal, IconDownload } from "./Icons";

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
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    ["#rails-showcase", "Rails"],
    ["#case-studies", "Work"],
    ["#gems", "Gems"],
    ["#skills", "Skills"],
    ["#experience", "Experience"],
    ["#about", "About"],
    ["#contact", "Contact"],
    ["#resume", "Resume"],
  ];

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
          {links.map(([href, label]) => (
            <a
              key={href}
              href={href}
              style={{
                color: C.secondary,
                fontSize: 14,
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = C.primary)}
              onMouseLeave={(e) => (e.target.style.color = C.secondary)}
            >
              {label}
            </a>
          ))}
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
          <ResumeDropdown />
          <a
            id="nav-hire-cta"
            href="#contact"
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
        </div>
      </div>
    </nav>
  );
}
