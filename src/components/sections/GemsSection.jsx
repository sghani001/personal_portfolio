import React from "react";
import resumeData from "../../utils/resumeData";
import C from "../../theme";
import { useGemStatsContext } from "../../context/GemStatsContext";
import { IconExternal, IconGem } from "../Icons";
import { FadeUp, Card, Section } from "../UI";

export function GemsSection() {
  const { counts, displayTotal, isLive, loading, formatCount } = useGemStatsContext();
  const gems = resumeData.openSource.gems;

  return (
    <Section id="gems" label="Open Source" title="Published Rails Gems" subtitle={`${loading ? "…" : displayTotal + "+"} total downloads${isLive ? " (live from RubyGems)" : ""} — production tools built for real pain points, not tutorials.`} tinted>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 16 }}>
        {gems.map((gem, i) => {
          const liveCount = counts[gem.name];
          const displayCount = liveCount != null ? formatCount(liveCount) : loading ? "…" : "—";
          return (
            <FadeUp key={i} delay={i * 70}>
              <Card style={{ padding: 28, height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        flexShrink: 0,
                        background: `${C.copper}14`,
                        border: `1px solid ${C.copper}25`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <IconGem />
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
                        <h3 style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color: C.primary, fontSize: 14, margin: 0 }}>{gem.name}</h3>
                        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: C.secondary }}>{gem.version}</span>
                        {gem.badge && (
                          <span style={{ padding: "2px 8px", borderRadius: 100, fontSize: 10, fontWeight: 600, background: `${C.amber}18`, border: `1px solid ${C.amber}35`, color: C.amber }}>
                            {gem.badge}
                          </span>
                        )}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 700, color: C.sage }}>{displayCount}</span>
                        <span style={{ fontSize: 12, color: C.secondary }}>downloads{isLive ? " (live)" : ""}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                  <a
                    href={gem.github}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      fontSize: 11,
                      color: C.secondary,
                      textDecoration: "none",
                      border: `1px solid ${C.border}`,
                      borderRadius: 7,
                      padding: "4px 10px",
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
                    GitHub <IconExternal size={11} />
                  </a>
                  <a
                    href={gem.rubygems}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      fontSize: 11,
                      color: C.secondary,
                      textDecoration: "none",
                      border: `1px solid ${C.border}`,
                      borderRadius: 7,
                      padding: "4px 10px",
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
                    RubyGems <IconExternal size={11} />
                  </a>
                </div>

                <p style={{ fontSize: 14, fontWeight: 600, color: C.primary, marginBottom: 8 }}>{gem.tagline}</p>
                <p style={{ fontSize: 13, color: C.secondary, lineHeight: 1.6, marginBottom: 16, flex: 1 }}>{gem.description}</p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {gem.tech.map((t, j) => (
                    <span key={j} style={{ padding: "3px 9px", borderRadius: 6, fontSize: 11, color: C.secondary, background: C.bg, border: `1px solid ${C.border}` }}>
                      {t}
                    </span>
                  ))}
                </div>
              </Card>
            </FadeUp>
          );
        })}
      </div>
      <FadeUp delay={280}>
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <a
            href={resumeData.rubygemsProfile}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
              color: C.secondary,
              textDecoration: "none",
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              padding: "10px 22px",
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
            View RubyGems profile <IconExternal />
          </a>
        </div>
      </FadeUp>
    </Section>
  );
}
