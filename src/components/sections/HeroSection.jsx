import React from "react";
import resumeData from "../../utils/resumeData";
import C from "../../theme";
import { useGemStatsContext } from "../../context/GemStatsContext";
import { IconArrow } from "../Icons";
import { heroStats } from "../../data/sectionsData";
import { TypewriterText } from "./TypewriterText";

export function HeroSection() {
  const { displayTotal, isLive } = useGemStatsContext();

  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: 64 }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            top: "8%",
            right: "-8%",
            width: "58%",
            height: "72%",
            background: "linear-gradient(155deg, #242424 0%, #1A1A1A 45%, #141414 100%)",
            transform: "rotate(-10deg)",
            boxShadow: "0 48px 96px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)",
            borderRadius: 3,
            opacity: 0.85,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "18%",
            right: "6%",
            width: "42%",
            height: "2px",
            borderTop: "1px dotted rgba(255,255,255,0.15)",
          }}
        />
        <div style={{ position: "absolute", top: -120, left: -80, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(226,199,153,0.05) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: 0, right: -60, width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(rgba(226,199,153,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(226,199,153,0.025) 1px, transparent 1px)`,
            backgroundSize: "52px 52px",
          }}
        />
      </div>

      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "80px 24px", width: "100%", position: "relative" }}>
        <div className="hero-grid">
          <div style={{ maxWidth: 660 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 16px",
                borderRadius: 100,
                border: `1px solid ${C.copper}40`,
                background: `${C.copper}0C`,
                fontSize: 12,
                fontFamily: "'JetBrains Mono',monospace",
                color: C.copper,
                marginBottom: 36,
                letterSpacing: "0.05em",
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.copper, animation: "pulse 2s infinite" }} />
              Open to Lahore companies & remote roles worldwide
            </div>

            <h1
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: "clamp(36px,5.5vw,58px)",
                fontWeight: 700,
                color: C.gold,
                lineHeight: 1.06,
                letterSpacing: "0.02em",
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              I help SaaS{' '}
              <span style={{ color: C.primary, position: "relative", display: "inline-block" }}>
               founders ship Websites
                <span style={{ position: "absolute", bottom: -3, left: 0, right: 0, height: 1, borderBottom: `1px dotted ${C.border}`, opacity: 0.6 }} />
              </span>{' '}
              & Production features.
            </h1>

            {/* Typewriter line — cycles through resumeData.titles: types one role
                title out, pauses, deletes it, moves to the next, loops forever. */}
            <div
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 17,
                fontWeight: 600,
                color: C.copper,
                minHeight: 26,
                marginBottom: 22,
              }}
            >
              <span style={{ color: C.secondary, marginRight: 8 }}>{'>'}</span>
              <TypewriterText words={resumeData.titles} />
            </div>

            <p style={{ fontSize: 17, color: C.secondary, lineHeight: 1.75, marginBottom: 12, maxWidth: 560 }}>
              2+ years shipping real production software across 6 SaaS products. Sole engineer on CinnaLab PRM — from architecture to CRM integrations to billing migration.
            </p>
            <p style={{ fontSize: 15, color: C.secondary, lineHeight: 1.7, marginBottom: 40, maxWidth: 560 }}>
              Based in <strong style={{ color: C.primary }}>Lahore, Pakistan</strong> · Open to on-site/hybrid locally and{' '}
              <strong style={{ color: C.primary }}>remote roles globally</strong> (GMT+5, EU/US overlap).
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
              <a
                id="hero-view-work"
                href="#case-studies"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "13px 28px",
                  background: `linear-gradient(135deg, ${C.gold}, ${C.goldDeep})`,
                  color: C.onGold,
                  borderRadius: C.radius,
                  fontSize: 14,
                  fontWeight: 700,
                  fontFamily: "'Space Grotesk',sans-serif",
                  textDecoration: "none",
                  boxShadow: `0 6px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)`,
                }}
              >
                View Projects <IconArrow />
              </a>
              <a
                id="hero-contact"
                href="#contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "13px 28px",
                  border: `1px solid ${C.border}`,
                  color: C.primary,
                  borderRadius: 12,
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: "'Space Grotesk',sans-serif",
                  textDecoration: "none",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.copper)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.border)}
              >
                Get in Touch
              </a>
            </div>

            <div
              style={{
                display: "inline-flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 8,
                padding: "10px 16px",
                borderRadius: C.radius,
                border: `1px solid ${C.copper}35`,
                background: C.surface,
                fontSize: 12,
                fontFamily: "'JetBrains Mono',monospace",
                color: C.secondary,
                marginBottom: 40,
                boxShadow: "0 4px 16px var(--shadow-base)",
              }}
            >
              <span>Open to:</span>
              {resumeData.availability.modes.map((m, i) => (
                <React.Fragment key={i}>
                  <span style={{ color: C.primary }}>{m}</span>
                  {i < resumeData.availability.modes.length - 1 && <span style={{ color: C.border }}>·</span>}
                </React.Fragment>
              ))}
              <span style={{ marginLeft: 4, padding: "2px 8px", borderRadius: 100, background: `${C.sage}18`, border: `1px solid ${C.sage}40`, color: C.sage, fontSize: 11 }}>
                Available now
              </span>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 24, fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: C.secondary, borderTop: `1px solid ${C.border}`, paddingTop: 28 }}>
              {resumeData.credibilityStrip.slice(0, 3).map((item, i) => (
                <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.copper, flexShrink: 0 }} />
                  {item}
                </span>
              ))}
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.copper, flexShrink: 0 }} />
                {displayTotal}+ Gem Downloads{isLive ? " (live)" : ""}
              </span>
            </div>
          </div>

          <div className="hero-stats" style={{ gridTemplateColumns: "1fr 1fr", gap: 12, maxWidth: 380, width: "100%", alignSelf: "center", alignItems: "stretch" }}>
            {heroStats.map((s, i) => (
              <div
                key={i}
                style={{
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: C.radius,
                  padding: "24px 20px",
                  minHeight: 108,
                  boxShadow: "0 4px 16px var(--shadow-base)",
                  transition: "transform 0.25s, box-shadow 0.25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 32px var(--shadow-hover)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 16px var(--shadow-base)";
                }}
              >
                <div style={{ fontSize: 32, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: C.copper, marginBottom: 6 }}>{s.value}</div>
                <div style={{ fontSize: 13, color: C.secondary, lineHeight: 1.4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}