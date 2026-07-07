import React, { useCallback, memo, useState, useMemo } from "react";
import resumeData from "../utils/resumeData";
import "./Hero.css";

const COMMANDS = [
  { id: "help", label: "help", description: "List available resume commands" },
  { id: "about", label: "about", description: "Open the About section" },
  { id: "experience", label: "experience", description: "Open the Experience section" },
  { id: "projects", label: "projects", description: "Open the Projects section" },
  { id: "skills", label: "skills", description: "Open the Skills section" },
  { id: "contact", label: "contact", description: "Open the Contact section" },
  { id: "theme", label: "theme", description: "Toggle light/dark theme" },
  { id: "clear", label: "clear", description: "Reset the command output" },
];

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
              <span className="code-keyword">class</span> <span className="code-class">Developer</span>{'\n'}
              {'\u00A0\u00A0'}attr_reader <span className="code-symbol">:name</span>, <span className="code-symbol">:stack</span>{'\n'}
              {'\n'}
              {'\u00A0\u00A0'}<span className="code-keyword">def</span> <span className="code-method">initialize</span>{'\n'}
              {'\u00A0\u00A0\u00A0\u00A0'}<span className="code-variable">@name</span>  = <span className="code-string">"Syed Ghani"</span>{'\n'}
              {'\u00A0\u00A0\u00A0\u00A0'}<span className="code-variable">@stack</span> = [<span className="code-string">"Rails"</span>, <span className="code-string">"React"</span>, <span className="code-string">"PostgreSQL"</span>]{'\n'}
              {'\u00A0\u00A0'}<span className="code-keyword">end</span>{'\n'}
              {'\n'}
              {'\u00A0\u00A0'}<span className="code-keyword">def</span> <span className="code-method">build_saas</span>(<span className="code-variable">client</span>){'\n'}
              {'\u00A0\u00A0\u00A0\u00A0'}puts <span className="code-string">"Designing secure APIs..."</span>{'\n'}
              {'\u00A0\u00A0\u00A0\u00A0'}<span className="code-variable">client</span>.integrate_stripe!{'\n'}
              {'\u00A0\u00A0\u00A0\u00A0'}<span className="code-variable">client</span>.sync_hubspot!{'\n'}
              {'\u00A0\u00A0\u00A0\u00A0'}<span className="code-variable">client</span>.deploy_features!{'\n'}
              {'\u00A0\u00A0'}<span className="code-keyword">end</span>{'\n'}
              <span className="code-keyword">end</span>
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
});

export default function Hero({ theme, toggleTheme }) {
  const heroRef = React.useRef(null);
  const [commandInput, setCommandInput] = useState("");
  const [commandOutput, setCommandOutput] = useState([
    "Type 'help' to see available commands.",
  ]);

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
      e?.preventDefault();
      window.history.pushState(null, "", `#${id}`);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    },
    []
  );

  const commandsById = useMemo(
    () => COMMANDS.reduce((map, item) => ({ ...map, [item.id]: item }), {}),
    []
  );

  const executeCommand = (command) => {
    const normalized = command.trim().toLowerCase();

    if (!normalized) {
      setCommandOutput((prev) => [...prev, "Please enter a command."]);
      return;
    }

    if (normalized === "help") {
      setCommandOutput((prev) => [
        ...prev,
        "Available commands:",
        ...COMMANDS.map((item) => `- ${item.label}: ${item.description}`),
      ]);
      return;
    }

    if (normalized === "clear") {
      setCommandOutput(["Command output cleared."]);
      return;
    }

    const commandItem = commandsById[normalized];
    if (commandItem) {
      setCommandOutput((prev) => [...prev, `> ${normalized}`]);
      switch (normalized) {
        case "about":
        case "experience":
        case "projects":
        case "skills":
        case "contact":
          scrollTo(normalized)();
          setCommandOutput((prev) => [...prev, `Navigating to ${normalized}...`]);
          break;
        case "theme":
          toggleTheme();
          setCommandOutput((prev) => [...prev, `Theme toggled to ${theme === "dark" ? "light" : "dark"}.`]);
          break;
        default:
          setCommandOutput((prev) => [...prev, `Command '${normalized}' executed.`]);
      }
    } else {
      setCommandOutput((prev) => [...prev, `Unknown command: '${command}'. Type 'help' for options.`]);
    }
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    executeCommand(commandInput);
    setCommandInput("");
  };

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
