import React from "react";
import resumeData from "../../utils/resumeData";
import C from "../../theme";
import { FadeUp, Card, Section } from "../UI";
import { IconForTech, getTechColor } from "../Icons";

export function RailsShowcaseSection() {
  return (
    <Section id="rails-showcase" label="Technical Depth" title="Rails Proficiency" subtitle="Not a skills checklist — concrete proof of depth across architecture, data, payments, and security." tinted>
      <div className="rails-grid" style={{ marginBottom: 24 }}>
        {resumeData.railsProficiency.map((pillar, i) => {
          const accentColor = getTechColor(pillar.icon);
          return (
            <FadeUp key={i} delay={i * 80}>
              <Card style={{ padding: 28, height: "100%", display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 12,
                    marginBottom: 20,
                    background: `${accentColor}18`,
                    border: `1px solid ${accentColor}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 4px 12px ${accentColor}20`,
                  }}
                >
                  <IconForTech name={pillar.icon} size={22} />
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: C.primary, fontSize: 17, marginBottom: 16 }}>{pillar.title}</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                  {pillar.points.map((pt, pi) => (
                    <li key={pi} style={{ display: "flex", gap: 10, fontSize: 14, color: C.secondary, lineHeight: 1.55 }}>
                      <span style={{ color: C.sage, flexShrink: 0, marginTop: 2 }}>✓</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </Card>
            </FadeUp>
          );
        })}
      </div>
      <FadeUp delay={320}>
        <div style={{ textAlign: "center", padding: "22px 24px", borderRadius: 14, border: `1px solid ${C.copper}30`, background: `${C.copper}08` }}>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 17, fontStyle: "italic", fontWeight: 600, color: C.copper, margin: 0 }}>
            {resumeData.railsClosingLine}
          </p>
        </div>
      </FadeUp>
    </Section>
  );
}
