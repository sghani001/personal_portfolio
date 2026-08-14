import React from "react";
import resumeData from "../../utils/resumeData";
import C, { alpha } from "../../theme";
import { IconExternal } from "../Icons";
import { FadeUp, Card, Section } from "../UI";

export function ExperienceSection() {
  return (
    <Section id="experience" label="Background" title="Experience" subtitle="Where I've shipped production work." tinted watermark="CAREER">
      <div style={{ position: "relative", paddingLeft: 36 }}>
        <div style={{ position: "absolute", left: 11, top: 8, bottom: 8, width: 2, background: `linear-gradient(180deg, ${C.copper}, ${alpha(C.copper, "10")})`, borderRadius: 2 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {resumeData.experience.map((job, i) => (
            <FadeUp key={i} delay={i * 60}>
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    left: -31,
                    top: 5,
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: `radial-gradient(circle at 35% 30%, ${C.gold}, ${C.goldDeep})`,
                    boxShadow: `0 0 12px 2px ${alpha(C.copper, "70")}`,
                    border: `2px solid var(--tinted-bg)`,
                    zIndex: 1,
                  }}
                />
                <Card tilt3D style={{ padding: "32px 36px" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 16 }}>
                    <div>
                      {job.roles ? (
                        <div style={{ marginBottom: 6 }}>
                          {job.roles.map((r, ri) => (
                            <div key={ri} style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: ri < job.roles.length - 1 ? 6 : 0 }}>
                              <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: C.primary, fontSize: 18 }}>{r.title}</span>
                              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: C.secondary, padding: "2px 8px", borderRadius: 6, background: C.bg, border: `1px solid ${C.border}` }}>{r.duration}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: C.primary, fontSize: 18, margin: "0 0 4px" }}>{job.role}</h3>
                      )}
                      {job.companyUrl ? (
                        <a href={job.companyUrl} target="_blank" rel="noreferrer" style={{ color: C.accentText, textDecoration: "none", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4 }}>
                          {job.company} <IconExternal size={12} />
                        </a>
                      ) : (
                        <span style={{ color: C.accentText, fontWeight: 600 }}>{job.company}</span>
                      )}
                      {job.employmentNote && (
                        <p style={{ fontSize: 12, color: C.secondary, fontStyle: "italic", marginTop: 4, margin: "4px 0 0" }}>{job.employmentNote}</p>
                      )}
                    </div>
                    <div style={{ textAlign: "right", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: C.secondary }}>
                      {job.duration && <div>{job.duration}</div>}
                      <div style={{ fontSize: 11, marginTop: 2 }}>{job.location}</div>
                    </div>
                  </div>

                  {job.summary && <p style={{ color: C.secondary, fontSize: 14, lineHeight: 1.65, marginBottom: 16 }}>{job.summary}</p>}

                  {job.points && (
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px", display: "flex", flexDirection: "column", gap: 7 }}>
                      {job.points.map((pt, pi) => (
                        <li key={pi} style={{ display: "flex", gap: 10, fontSize: 13, color: C.secondary }}>
                          <span style={{ color: C.accentText, flexShrink: 0 }}>→</span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  )}

                  {job.projects && (
                    <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
                      <p style={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", textTransform: "uppercase", letterSpacing: "0.12em", color: C.secondary, marginBottom: 10 }}>Products</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {job.projects.map((p, pi) => (
                          <span key={pi} style={{ padding: "4px 12px", borderRadius: 100, fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: C.secondary, background: C.bg, border: `1px solid ${C.border}` }}>
                            {p.name}
                            {p.flagship && <span style={{ marginLeft: 5, color: C.accentText }}>★</span>}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </Section>
  );
}
