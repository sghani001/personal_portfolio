import React, { useState } from "react";
import resumeData from "../../utils/resumeData";
import C, { alpha } from "../../theme";
import { useGemStatsContext } from "../../context/GemStatsContext";
import { IconGem } from "../Icons";
import { FadeUp, Card, Section } from "../UI";
import { DetailModal } from "../DetailModal";

export function GemsSection() {
  const { counts, displayTotal, isLive, loading, formatCount } = useGemStatsContext();
  const gems = resumeData.openSource.gems;
  const [active, setActive] = useState(null);

  return (
    <Section id="gems" label="Open Source" title="Published Rails Gems" subtitle={`${loading ? "…" : displayTotal + "+"} total downloads${isLive ? " (live from RubyGems)" : ""} — production tools built for real pain points, not tutorials. Click a card for full details.`} tinted className="crosshair-grid" watermark="GEMS">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 16 }}>
        {gems.map((gem, i) => {
          const liveCount = counts[gem.name];
          const displayCount = liveCount != null ? formatCount(liveCount) : loading ? "…" : "—";
          return (
            <FadeUp key={i} delay={i * 70}>
              <Card hover onClick={() => setActive(gem)} style={{ padding: 24, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", cursor: "pointer" }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    marginBottom: 14,
                    background: `${alpha(C.copper, "14")}`,
                    border: `1px solid ${alpha(C.copper, "25")}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconGem />
                </div>
                <h3 style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color: C.primary, fontSize: 14, margin: "0 0 6px" }}>{gem.name}</h3>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 700, color: C.sage }}>{displayCount}</span>
                  <span style={{ fontSize: 11, color: C.secondary }}>downloads</span>
                </div>
                <p style={{ fontSize: 11, color: C.accentText, marginTop: "auto", fontFamily: "'JetBrains Mono',monospace" }}>Click for details →</p>
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
              e.currentTarget.style.color = C.accentText;
              e.currentTarget.style.borderColor = `${alpha(C.copper, "50")}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = C.secondary;
              e.currentTarget.style.borderColor = C.border;
            }}
          >
            View RubyGems profile
          </a>
        </div>
      </FadeUp>

      {active && (
        <DetailModal
          icon={<IconGem />}
          eyebrow={`${active.version}${active.badge ? ` · ${active.badge}` : ""}`}
          title={active.name}
          subtitle={active.tagline}
          links={[
            { label: "GitHub", href: active.github },
            { label: "RubyGems", href: active.rubygems },
          ]}
          onClose={() => setActive(null)}
        >
          <p style={{ fontSize: 14, color: C.secondary, lineHeight: 1.65, marginBottom: 16 }}>{active.description}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {active.tech.map((t, j) => (
              <span key={j} style={{ padding: "3px 9px", borderRadius: 6, fontSize: 11, color: C.secondary, background: C.bg, border: `1px solid ${C.border}` }}>
                {t}
              </span>
            ))}
          </div>
        </DetailModal>
      )}
    </Section>
  );
}
