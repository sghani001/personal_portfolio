import React, { useState, useEffect } from "react";
import resumeData from "../utils/resumeData";
import C from "../theme";
import SystemFlowchart from "./SystemFlowchart";
import { useGemStatsContext } from "../context/GemStatsContext";
import { IconArrow, IconExternal, IconDownload, IconGem, IconForTech } from "./Icons";
import { FadeUp, Card, SkillPill, Section } from "./UI";

export function HeroSection() {
  const { displayTotal, isLive } = useGemStatsContext();
  const stats = [
    { value: "2+", label: "Years in Production" },
    { value: "6", label: "Live SaaS Products" },
    { value: "1", label: "Solo-Owned Platform" },
    { value: "4", label: "Published Rails Gems" },
  ];

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
                marginBottom: 24,
              }}
            >
              Full-stack{' '}
              <span style={{ color: C.primary, position: "relative", display: "inline-block" }}>
                Ruby on Rails
                <span style={{ position: "absolute", bottom: -3, left: 0, right: 0, height: 1, borderBottom: `1px dotted ${C.border}`, opacity: 0.6 }} />
              </span>{' '}
              & React engineer.
            </h1>

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
            {stats.map((s, i) => (
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

export function MetricsSection() {
  const { displayTotal, isLive, loading } = useGemStatsContext();
  const gemValue = loading ? "…" : `${displayTotal}+`;
  const stats = [
    { value: "2+", label: "Years in Production" },
    { value: "6", label: "Live SaaS Products" },
    { value: "1", label: "Solo-Owned Platform" },
    { value: "4", label: "Published Gems" },
    { value: gemValue, label: isLive ? "Gem Downloads (live)" : "Gem Downloads" },
  ];

  return (
    <div style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, background: `${C.surface}60` }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", display: "flex", flexWrap: "wrap" }}>
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              flex: "1 1 120px",
              padding: "28px 12px",
              textAlign: "center",
              borderRight: i < stats.length - 1 ? `1px solid ${C.border}` : "none",
            }}
          >
            <div style={{ fontSize: 26, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: C.copper, marginBottom: 6 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: C.secondary, textTransform: "uppercase", letterSpacing: "0.15em", lineHeight: 1.4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RailsShowcaseSection() {
  return (
    <Section id="rails-showcase" label="Technical Depth" title="Rails Proficiency" subtitle="Not a skills checklist — concrete proof of depth across architecture, data, payments, and security." tinted>
      <div className="rails-grid" style={{ marginBottom: 24 }}>
        {resumeData.railsProficiency.map((pillar, i) => (
          <FadeUp key={i} delay={i * 80}>
            <Card style={{ padding: 28, height: "100%", display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  marginBottom: 20,
                  background: `${C.copper}14`,
                  border: `1px solid ${C.copper}28`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                }}
              >
                {pillar.icon}
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
        ))}
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

export function SkillsSection() {
  const sk = resumeData.skills;
  const groups = [
    { label: "Backend", icon: <IconForTech name="Ruby on Rails" />, items: sk.backend },
    { label: "Frontend", icon: <IconForTech name="React.js" />, items: sk.frontend },
    { label: "Rails Ecosystem Gems", icon: <IconForTech name="gems" />, items: sk.railsGems },
    { label: "Payments", icon: <IconForTech name="Stripe" />, items: sk.payments },
    { label: "Integrations", icon: <IconForTech name="Integrations" />, items: sk.integrations },
    { label: "Testing & DevOps", icon: <IconForTech name="AWS" />, items: sk.testingAndDevOps },
    { label: "Also", icon: <IconForTech name="tools" />, items: sk.also },
  ];

  return (
    <Section id="skills" label="Tech" title="Skills" subtitle="Click any highlighted pill to see specifics. Skills with ▼ expand on click." tinted>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {groups.map((g, i) => (
          <FadeUp key={i} delay={i * 50}>
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "20px 24px", boxShadow: "0 4px 16px rgba(0,0,0,0.18)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 18, display: "inline-flex", alignItems: "center" }}>{g.icon}</span>
                <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: C.secondary, margin: 0 }}>{g.label}</h4>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {g.items.map((skill, j) => (
                  <SkillPill key={j} skill={skill} />
                ))}
              </div>
            </div>
          </FadeUp>
        ))}

        <FadeUp delay={350}>
          <div style={{ background: C.surface, border: `1px dashed ${C.border}`, borderRadius: 14, padding: "20px 24px", boxShadow: "0 4px 16px rgba(0,0,0,0.18)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <IconForTech name="learning" size={18} />
              <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: C.secondary, margin: 0 }}>Currently Learning</h4>
              <span style={{ marginLeft: 4, padding: "2px 8px", borderRadius: 100, fontSize: 10, background: `${C.copper}14`, border: `1px solid ${C.copper}30`, color: C.copper, fontFamily: "'JetBrains Mono',monospace" }}>
                growing
              </span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {sk.currentlyLearning.map((skill, j) => (
                <SkillPill key={j} skill={skill} dashed />
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </Section>
  );
}

export function ProcessSection() {
  const steps = [
    { n: "01", icon: <IconForTech name="chat" />, title: "Discovery", desc: "30-min call or interview. No pitch. I listen, ask hard questions, and tell you honestly if I'm the right fit." },
    { n: "02", icon: <IconForTech name="document" />, title: "Proposal / Onboarding", desc: "Written scope and architecture proposal (contract) or structured onboarding plan (full-time). You own the document." },
    { n: "03", icon: <IconForTech name="execution" />, title: "Execution", desc: "Regular async updates. Works across GMT+5 / EU / US overlap. Real, testable progress — not status theater." },
    { n: "04", icon: <IconForTech name="rocket" />, title: "Handoff / Continuity", desc: "Clean code, tests, full documentation. Zero mystery, zero bus factor, zero knowledge lock-in." },
  ];

  return (
    <Section id="process" label="Engagement" title="How I Work" subtitle="A predictable, low-overhead process — for a Lahore hiring manager or a remote founder.">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: 14 }}>
        {steps.map((s, i) => (
          <FadeUp key={i} delay={i * 80}>
            <Card style={{ padding: 28, height: "100%", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: 60, height: 60, borderBottomLeftRadius: 24, background: `${C.copper}08` }} />
              <div style={{ fontSize: 28, marginBottom: 16 }}>{s.icon}</div>
              <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: `${C.copper}60`, marginBottom: 8 }}>{s.n}</div>
              <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: C.primary, marginBottom: 10, fontSize: 16 }}>{s.title}</h4>
              <p style={{ fontSize: 13, color: C.secondary, lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
            </Card>
          </FadeUp>
        ))}
      </div>
    </Section>
  );
}

export function TechStackSection() {
  return (
    <Section id="tech-stack" label="Architecture & Tools" title="System Topology" subtitle="Interactive flowchart — click any node to inspect its production role. Gold lines trace connections to the core engine." tinted>
      <FadeUp delay={80}>
        <SystemFlowchart C={C} />
      </FadeUp>
    </Section>
  );
}

export function ExperienceSection() {
  return (
    <Section id="experience" label="Background" title="Experience" subtitle="Where I've shipped production work." tinted>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {resumeData.experience.map((job, i) => (
          <FadeUp key={i} delay={i * 60}>
            <Card style={{ padding: "32px 36px" }}>
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
                    <a href={job.companyUrl} target="_blank" rel="noreferrer" style={{ color: C.copper, textDecoration: "none", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4 }}>
                      {job.company} <IconExternal size={12} />
                    </a>
                  ) : (
                    <span style={{ color: C.copper, fontWeight: 600 }}>{job.company}</span>
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
                      <span style={{ color: C.copper, flexShrink: 0 }}>→</span>
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
                        {p.flagship && <span style={{ marginLeft: 5, color: C.copper }}>★</span>}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </FadeUp>
        ))}

        <FadeUp delay={180}>
          <Card style={{ padding: "32px 36px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 20 }}>🎓</span>
              <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", textTransform: "uppercase", letterSpacing: "0.12em", color: C.secondary }}>Education</span>
            </div>
            {resumeData.education.map((edu, i) => (
              <div key={i}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
                  <div>
                    <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: C.primary, fontSize: 18, margin: "0 0 4px" }}>{edu.degree}</h3>
                    <p style={{ color: C.copper, fontWeight: 600, margin: 0 }}>{edu.institution}</p>
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: C.secondary }}>{edu.duration}</span>
                </div>
                {edu.fyp && (
                  <div style={{ padding: "12px 16px", borderRadius: 10, background: C.bg, border: `1px solid ${C.border}`, fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: C.secondary }}>
                    <strong style={{ color: C.primary }}>FYP — {edu.fyp.name}:</strong> {edu.fyp.description}
                  </div>
                )}
              </div>
            ))}
          </Card>
        </FadeUp>
      </div>
    </Section>
  );
}

export function TestimonialsSection() {
  const [localTestimonials, setLocalTestimonials] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("userTestimonials") || "[]");
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("userTestimonials", JSON.stringify(localTestimonials));
    } catch (e) {}
  }, [localTestimonials]);

  const testimonials = [...localTestimonials, ...resumeData.testimonials];

  return (
    <Section id="testimonials" label="Social Proof" title="What They Say" subtitle="From people who worked with me directly." tinted>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16 }}>
        {testimonials.map((t, i) => (
          <FadeUp key={i} delay={i * 80}>
            <Card style={{ padding: 36, height: "100%", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 12, right: 20, fontSize: 72, color: `${C.copper}09`, fontFamily: "Georgia, serif", lineHeight: 1, userSelect: "none" }}>
                "
              </div>
              <p style={{ fontSize: 14, color: `${C.primary}CC`, lineHeight: 1.85, fontStyle: "italic", marginBottom: 24, flex: 1, position: "relative" }}>
                "{t.quote}"
              </p>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: C.primary, fontSize: 14, margin: "0 0 3px" }}>{t.author}</p>
                  <p style={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: C.secondary, margin: 0 }}>{t.title}</p>
                </div>
                {t.url && (
                  <a
                    href={t.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 11,
                      color: C.copper,
                      textDecoration: "none",
                      border: `1px solid ${C.copper}40`,
                      borderRadius: 8,
                      padding: "6px 10px",
                      flexShrink: 0,
                      transition: "background 0.2s",
                    }}
                  >
                    View post <IconExternal size={11} />
                  </a>
                )}
              </div>
            </Card>
          </FadeUp>
        ))}
      </div>
    </Section>
  );
}

export function AboutSection() {
  const { displayTotal, isLive } = useGemStatsContext();
  return (
    <Section id="about" label="About" title="Who You're Hiring">
      <div className="about-grid">
        <FadeUp>
          <div style={{ position: "relative", maxWidth: 260 }}>
            <div style={{ width: "100%", aspectRatio: "1", borderRadius: 18, overflow: "hidden", background: C.surface, border: `1px solid ${C.border}`, boxShadow: "0 8px 32px rgba(0,0,0,0.28)" }}>
              <img
                src={resumeData.photo}
                alt="Syed M. Ghani — Ruby on Rails & React Engineer, Lahore"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:${C.surface};font-family:'Space Grotesk',sans-serif;font-size:52px;font-weight:800;color:${C.copper}">SG</div>`;
                }}
              />
            </div>
            <div style={{ position: "absolute", bottom: -14, right: -14, padding: "8px 16px", borderRadius: 10, background: `linear-gradient(135deg, ${C.copper}, ${C.copperDeep})`, color: C.onGold, fontSize: 12, fontFamily: "'JetBrains Mono',monospace", boxShadow: `0 6px 20px rgba(0,0,0,0.35)` }}>
              GMT+5 · Remote ✓
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={100}>
          <div>
            <p style={{ fontSize: 17, color: C.secondary, lineHeight: 1.8, marginBottom: 16 }}>{resumeData.summary}</p>
            <p style={{ fontSize: 15, color: C.secondary, lineHeight: 1.75, marginBottom: 28 }}>{resumeData.aboutExtra}</p>

            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 12, marginBottom: 32, background: `${C.copper}0C`, border: `1px solid ${C.copper}30`, color: C.copper, fontSize: 14, fontWeight: 600 }}>
              📍 Lahore, Pakistan · 🌍 Remote worldwide · GMT+5 · EU/US overlap available
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 32 }}>
              {resumeData.engineeringPractices.map((p, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: C.secondary }}>
                  <span style={{ color: C.sage, flexShrink: 0 }}>✓</span>
                  {p}
                </div>
              ))}
            </div>

            <div style={{ padding: "16px 20px", borderRadius: 12, background: C.surface, border: `1px solid ${C.border}`, marginBottom: 28 }}>
              <p style={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", textTransform: "uppercase", letterSpacing: "0.12em", color: C.secondary, margin: "0 0 6px" }}>Education</p>
              <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: C.primary, fontSize: 14, margin: "0 0 2px" }}>{resumeData.education[0].degree}</p>
              <p style={{ color: C.copper, fontSize: 13, margin: 0 }}>{resumeData.education[0].institution} · {resumeData.education[0].duration}</p>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {[
                { label: "LinkedIn", url: resumeData.linkedinUrl, badge: "in", bg: "#0077B5" },
                { label: "GitHub", url: resumeData.githubUrl, badge: "gh", bg: "#24292e" },
              ].map((link) => (
                <a
                  key={link.label}
                  id={`about-${link.label.toLowerCase()}`}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "9px 18px",
                    border: `1px solid ${C.border}`,
                    borderRadius: 12,
                    color: C.primary,
                    fontSize: 13,
                    fontWeight: 500,
                    textDecoration: "none",
                    background: C.surface,
                    transition: "border-color 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = C.copper;
                    e.currentTarget.style.color = C.copper;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = C.border;
                    e.currentTarget.style.color = C.primary;
                  }}
                >
                  <span style={{ padding: "2px 5px", borderRadius: 4, background: link.bg, color: "#fff", fontSize: 10, fontWeight: 800 }}>{link.badge}</span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </Section>
  );
}

export function ContactSection() {
  const [state, setState] = useState("idle");
  const web3formsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  const submitMailto = (fd, form) => {
    const name = fd.get("name");
    const email = fd.get("email");
    const msg = fd.get("message");
    const type = fd.get("hiring_for");
    const subject = `[${type || "Portfolio"}] from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\nHiring for: ${type}\n\n${msg}`;
    window.location.href = `mailto:${resumeData.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setState("success");
    setTimeout(() => {
      setState("idle");
      form.reset();
    }, 5000);
  };

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const name = fd.get("name");
    const email = fd.get("email");
    const msg = fd.get("message");
    const type = fd.get("hiring_for");
    setState("sending");

    if (web3formsKey) {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: web3formsKey,
            name,
            email,
            message: msg,
            subject: `[${type || "Portfolio"}] from ${name}`,
            hiring_for: type,
            from_name: "Syed Ghani Portfolio",
          }),
        });
        const data = await res.json();
        if (data.success) {
          setState("success");
          e.target.reset();
          setTimeout(() => setState("idle"), 5000);
        } else {
          setState("error");
          setTimeout(() => setState("idle"), 4000);
        }
      } catch {
        setState("error");
        setTimeout(() => setState("idle"), 4000);
      }
      return;
    }

    setTimeout(() => submitMailto(fd, e.target), 400);
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 10,
    fontSize: 14,
    background: C.bg,
    border: `1px solid ${C.border}`,
    color: C.primary,
    outline: "none",
    transition: "border-color 0.2s",
    fontFamily: "'Inter',sans-serif",
    boxSizing: "border-box",
  };

  return (
    <Section id="contact" label="Contact" title="Let's Work Together" subtitle="I respond within 24 hours. No middlemen — just me." tinted>
      <div className="contact-grid">
        <FadeUp>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div>
              <p style={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", textTransform: "uppercase", letterSpacing: "0.18em", color: C.secondary, marginBottom: 8 }}>Email</p>
              <a href={`mailto:${resumeData.email}`} style={{ color: C.copper, textDecoration: "none", fontSize: 17, fontWeight: 600 }}>{resumeData.email}</a>
            </div>
            <div>
              <p style={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", textTransform: "uppercase", letterSpacing: "0.18em", color: C.secondary, marginBottom: 8 }}>Location</p>
              <p style={{ color: C.primary, fontWeight: 600, margin: "0 0 4px" }}>Lahore, Pakistan · GMT+5</p>
              <p style={{ color: C.secondary, fontSize: 13, margin: 0 }}>Async-first. EU/US schedule overlap available.</p>
            </div>
            <div>
              <p style={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", textTransform: "uppercase", letterSpacing: "0.18em", color: C.secondary, marginBottom: 12 }}>Links</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { label: "LinkedIn", url: resumeData.linkedinUrl, badge: "in", bg: "#0077B5" },
                  { label: "GitHub", url: resumeData.githubUrl, badge: "gh", bg: "#24292e" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 13, color: C.primary, textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = C.copper)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = C.primary)}
                  >
                    <span style={{ width: 24, height: 24, borderRadius: 5, background: link.bg, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>{link.badge}</span>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", textTransform: "uppercase", letterSpacing: "0.18em", color: C.secondary, marginBottom: 12 }}>Resume</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {resumeData.resumeDownloads.map((dl, i) => (
                  <a
                    key={i}
                    id={`resume-dl-${i}`}
                    href={dl.file}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 16px",
                      border: `1px solid ${C.border}`,
                      borderRadius: 12,
                      fontSize: 13,
                      color: C.primary,
                      textDecoration: "none",
                      background: C.surface,
                      transition: "border-color 0.2s, color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = C.copper;
                      e.currentTarget.style.color = C.copper;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = C.border;
                      e.currentTarget.style.color = C.primary;
                    }}
                  >
                    <IconDownload /> {dl.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={120}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 18, padding: 36, boxShadow: "0 8px 32px rgba(0,0,0,0.28)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${C.copper}60, transparent)` }} />
            <form id="contact-form" onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontFamily: "'JetBrains Mono',monospace", textTransform: "uppercase", letterSpacing: "0.12em", color: C.secondary, marginBottom: 6 }}>Name</label>
                  <input
                    type="text"
                    name="name"
                    id="contact-name"
                    required
                    placeholder="Your name"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = C.copper)}
                    onBlur={(e) => (e.target.style.borderColor = C.border)}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontFamily: "'JetBrains Mono',monospace", textTransform: "uppercase", letterSpacing: "0.12em", color: C.secondary, marginBottom: 6 }}>Email</label>
                  <input
                    type="email"
                    name="email"
                    id="contact-email"
                    required
                    placeholder="you@company.com"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = C.copper)}
                    onBlur={(e) => (e.target.style.borderColor = C.border)}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 11, fontFamily: "'JetBrains Mono',monospace", textTransform: "uppercase", letterSpacing: "0.12em", color: C.secondary, marginBottom: 6 }}>I'm hiring for</label>
                <select
                  name="hiring_for"
                  id="contact-hiring-for"
                  style={{ ...inputStyle, cursor: "pointer" }}
                  onFocus={(e) => (e.target.style.borderColor = C.copper)}
                  onBlur={(e) => (e.target.style.borderColor = C.border)}
                >
                  <option value="">Select role type…</option>
                  <option>On-site / Hybrid (Lahore)</option>
                  <option>Remote — Full-time</option>
                  <option>Remote — Contract / Freelance</option>
                  <option>Other / Just exploring</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 11, fontFamily: "'JetBrains Mono',monospace", textTransform: "uppercase", letterSpacing: "0.12em", color: C.secondary, marginBottom: 6 }}>Message</label>
                <textarea
                  name="message"
                  id="contact-message"
                  required
                  rows={5}
                  placeholder="Tell me about the role, project, or what you need…"
                  style={{ ...inputStyle, resize: "none" }}
                  onFocus={(e) => (e.target.style.borderColor = C.copper)}
                  onBlur={(e) => (e.target.style.borderColor = C.border)}
                />
              </div>

              <button
                id="contact-submit"
                type="submit"
                disabled={state === "sending"}
                style={{
                  padding: "14px 28px",
                  borderRadius: C.radius,
                  border: "none",
                  cursor: state === "sending" ? "default" : "pointer",
                  fontSize: 15,
                  fontWeight: 700,
                  fontFamily: "'Space Grotesk',sans-serif",
                  background: state === "success" ? `${C.sage}20` : state === "error" ? `${C.copperDeep}20` : `linear-gradient(135deg, ${C.copper}, ${C.copperDeep})`,
                  color: state === "success" ? C.sage : state === "error" ? C.goldDeep : C.onGold,
                  boxShadow: state === "idle" ? "0 6px 24px rgba(0,0,0,0.35)" : "none",
                  transition: "all 0.3s",
                }}
              >
                {state === "idle" && "Send Message →"}
                {state === "sending" && "Sending…"}
                {state === "success" && "✓ Message sent — I'll reply within 24h"}
                {state === "error" && "Failed — please email directly"}
              </button>
            </form>
          </div>
        </FadeUp>
      </div>
    </Section>
  );
}
