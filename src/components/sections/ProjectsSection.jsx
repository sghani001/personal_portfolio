import React from "react";
import resumeData from "../../utils/resumeData";
import C from "../../theme";
import { IconExternal } from "../Icons";
import { FadeUp, Card, Section } from "../UI";

export function ProjectsSection() {
  const personalOnly = resumeData.projects.filter(
    (p) => p.name !== "Online Exam System" && !p.name.startsWith("Urdu Signify")
  );

  return (
    <Section id="projects" label="Personal Work" title="Personal Projects" subtitle="Side projects and academic work — built to learn, shipped to work.">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 16 }}>
        {personalOnly.map((proj, i) => (
          <FadeUp key={i} delay={i * 80}>
            <Card style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
              {proj.image && (
                <div style={{ height: 170, overflow: "hidden", position: "relative" }}>
                  <img
                    src={proj.image}
                    alt={proj.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.65, transition: "opacity 0.4s, transform 0.4s" }}
                    onMouseEnter={(e) => {
                      e.target.style.opacity = "0.85";
                      e.target.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.opacity = "0.65";
                      e.target.style.transform = "scale(1)";
                    }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 50%, ${C.surface})` }} />
                  {proj.badge && (
                    <div style={{ position: "absolute", top: 12, left: 12, padding: "4px 10px", borderRadius: 100, background: C.gold, color: C.onGold, fontSize: 10, fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif" }}>
                      {proj.badge}
                    </div>
                  )}
                </div>
              )}
              <div style={{ padding: 24, display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: C.primary, fontSize: 17, margin: 0 }}>{proj.name}</h3>
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: C.secondary,
                      padding: 6,
                      border: `1px solid ${C.border}`,
                      borderRadius: 8,
                      display: "flex",
                      transition: "color 0.2s, border-color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = C.copper;
                      e.currentTarget.style.borderColor = `${C.copper}50`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = C.secondary;
                      e.currentTarget.style.borderColor = C.border;
                    }}
                  >
                    <IconExternal />
                  </a>
                </div>
                <p style={{ fontSize: 13, color: C.secondary, lineHeight: 1.65, marginBottom: 16, flex: 1 }}>{proj.description}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {proj.tech.map((t, j) => (
                    <span key={j} style={{ padding: "3px 8px", borderRadius: 5, fontSize: 11, color: C.secondary, background: C.bg, border: `1px solid ${C.border}` }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </FadeUp>
        ))}
      </div>
    </Section>
  );
}
