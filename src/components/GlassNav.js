import React, { useState, useEffect } from "react";

const links = [
  { id: "about", label: "About" },
  { id: "engineering", label: "Build" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "activity", label: "Activity" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function GlassNav() {
  const [activeId, setActiveId] = useState("hero");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) setActiveId(hash);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-10% 0px -40% 0px" }
    );
    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    const hero = document.getElementById("hero");
    if (hero) observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    setActiveId(id);
    window.history.pushState(null, "", `#${id}`);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-md border-b border-border">
      <div className="max-w-content mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#hero" onClick={scrollTo("hero")}
          className="font-mono font-medium text-text-primary text-sm">
          <span className="text-text-muted">~$ </span>whoami
        </a>

        <button className="md:hidden text-text-primary p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          <span className={`block w-5 h-px bg-current mb-1 transition-transform ${open ? "rotate-45 translate-y-[5px]" : ""}`} />
          <span className={`block w-5 h-px bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {links.map(({ id, label }) => (
            <a key={id} href={`#${id}`} onClick={scrollTo(id)}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                activeId === id ? "text-accent-primary" : "text-text-muted hover:text-accent-secondary"
              }`}>
              {activeId === id ? "→ " : ""}{label.toLowerCase()}
            </a>
          ))}
        </nav>
      </div>

      {open && (
        <nav className="md:hidden bg-bg-primary border-t border-border px-6 py-4 space-y-2">
          {links.map(({ id, label }) => (
            <a key={id} href={`#${id}`} onClick={scrollTo(id)}
              className={`block w-full text-left px-3 py-2 rounded text-xs font-mono transition-colors ${
                activeId === id ? "text-accent-primary bg-bg-tertiary" : "text-text-muted hover:text-accent-secondary"
              }`}>
              {label.toLowerCase()}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
