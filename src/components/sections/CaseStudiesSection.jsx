import React from "react";
import resumeData from "../../utils/resumeData";
import C from "../../theme";
import { IconExternal } from "../Icons";
import { FadeUp, Card, Section } from "../UI";

export function CaseStudiesSection() {
  const bsExp = resumeData.experience[0];
  const featured = bsExp.projects.slice(0, 3);
  const additionalClient = bsExp.projects.slice(3);
  const additionalPersonal = resumeData.projects.filter(
    (p) => p.name === "Online Exam System" || p.name.startsWith("Urdu Signify")
  );
  const additional = [...additionalClient, ...additionalPersonal];

  return (
    <Section id="case-studies" label="Selected Work" title="Featured Case Studies" subtitle="Three projects, three different capabilities — ownership, financial systems, and performance at scale.">
      <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 60 }}>
        {featured.map((proj, i) => (
          <FadeUp key={i} delay={i * 80}>
            <div
              style={{
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 18,
                boxShadow: "0 4px 24px rgba(0,0,0,0.22)",
                overflow: "hidden",
                transition: "border-color 0.25s, transform 0.25s, box-shadow 0.25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${C.copper}50`;
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = C.border;
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.22)";
              }}
            >
              <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.copper}70, transparent)` }} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                {proj.image && (
                  <div style={{ height: 200, overflow: "hidden", position: "relative" }}>
                    <img
                      src={proj.image}
                      alt={proj.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.55, transition: "opacity 0.4s, transform 0.4s" }}
                      onMouseEnter={(e) => {
                        e.target.style.opacity = "0.8";
                        e.target.style.transform = "scale(1.04)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.opacity = "0.55";
                        e.target.style.transform = "scale(1)";
                      }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 40%, ${C.surface})` }} />
                    {proj.flagship && (
                      <div
                        style={{
                          position: "absolute",
                          top: 14,
                          left: 14,
                          padding: "5px 12px",
                          borderRadius: 100,
                          background: C.gold,
                          color: C.onGold,
                          fontSize: 11,
                          fontWeight: 700,
                          fontFamily: "'Space Grotesk',sans-serif",
                        }}
                      >
                        Flagship · Sole Engineer
                      </div>
                    )}
                  </div>
                )}
                <div style={{ padding: 36 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 20 }}>
                    <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 700, color: C.primary, margin: 0 }}>{proj.name}</h3>
                    {proj.url && (
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          fontSize: 12,
                          color: C.secondary,
                          textDecoration: "none",
                          border: `1px solid ${C.border}`,
                          borderRadius: 8,
                          padding: "6px 12px",
                          transition: "color 0.2s, border-color 0.2s",
                          flexShrink: 0,
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
                        Visit site <IconExternal />
                      </a>
                    )}
                  </div>

                  {proj.problem && (
                    <p style={{ fontSize: 14, color: C.secondary, fontStyle: "italic", lineHeight: 1.7, marginBottom: 20, paddingLeft: 16, borderLeft: `2px solid ${C.border}` }}>
                      {proj.problem}
                    </p>
                  )}

                  {proj.metrics && (
                    <div style={{ marginBottom: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                      {proj.metrics.map((m, mi) => (
                        <div key={mi} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, fontWeight: 600, color: C.sage }}>
                          <span style={{ flexShrink: 0 }}>✓</span> {m}
                        </div>
                      ))}
                    </div>
                  )}

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7, paddingTop: 20, borderTop: `1px solid ${C.border}` }}>
                    {proj.tech.map((tag, j) => (
                      <span key={j} style={{ padding: "4px 10px", borderRadius: 6, fontSize: 12, color: C.secondary, background: C.bg, border: `1px solid ${C.border}` }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>

      <FadeUp>
        <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, color: C.primary, marginBottom: 20 }}>
          Additional Projects
        </h3>
      </FadeUp>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 14 }}>
        {additional.map((proj, i) => (
          <FadeUp key={i} delay={i * 60}>
            <Card style={{ padding: 24, height: "100%", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: C.primary, fontSize: 16, margin: 0 }}>{proj.name}</h4>
                {proj.url && (
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
                )}
              </div>
              <p style={{ fontSize: 13, color: C.secondary, lineHeight: 1.6, marginBottom: 14, flex: 1 }}>{proj.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {proj.tech.map((t, j) => (
                  <span key={j} style={{ padding: "3px 8px", borderRadius: 5, fontSize: 11, color: C.secondary, background: C.bg, border: `1px solid ${C.border}` }}>
                    {t}
                  </span>
                ))}
              </div>
            </Card>
          </FadeUp>
        ))}
      </div>
    </Section>
  );
}
