import React from "react";
import { motion } from "framer-motion";
import resumeData from "../../utils/resumeData";
import C from "../../theme";
import { IconForTech } from "../Icons";
import { FadeUp, SkillPill, Section } from "../UI";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

const RINGS = [
  { radius: 92, duration: 18, size: 38, iconSize: 16, icons: ["React.js", "PostgreSQL", "Redis"] },
  { radius: 168, duration: 32, size: 42, iconSize: 18, icons: ["Sidekiq", "Docker", "AWS"] },
  { radius: 244, duration: 48, size: 42, iconSize: 18, icons: ["Stripe", "GitHub Actions", "TailwindCSS"] },
];

function OrbitRing({ radius, duration, size, iconSize, icons }) {
  return (
    <>
      <div style={{ position: "absolute", top: "50%", left: "50%", width: radius * 2, height: radius * 2, marginLeft: -radius, marginTop: -radius, borderRadius: "50%", border: `1px dashed ${C.border}` }} />
      <motion.div
        style={{ position: "absolute", inset: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {icons.map((name, i) => {
          const angle = (360 / icons.length) * i;
          return (
            <div key={name} style={{ position: "absolute", top: "50%", left: "50%", transform: `rotate(${angle}deg) translateX(${radius}px) rotate(${-angle}deg)` }}>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration, repeat: Infinity, ease: "linear" }}
                style={{
                  marginLeft: -size / 2,
                  marginTop: -size / 2,
                  width: size,
                  height: size,
                  borderRadius: Math.round(size * 0.28),
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  boxShadow: "0 4px 16px var(--shadow-base)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconForTech name={name} size={iconSize} colored />
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    </>
  );
}

function SkillSolarSystem() {
  const reducedMotion = usePrefersReducedMotion();
  if (reducedMotion) return null;

  const outerRadius = RINGS[RINGS.length - 1].radius;
  const diameter = outerRadius * 2 + 60;

  return (
    <div style={{ perspective: 1100, marginBottom: -diameter * 0.15, overflow: "hidden" }}>
      <div
        style={{
          position: "relative",
          width: diameter,
          height: diameter,
          margin: "0 auto",
          transformStyle: "preserve-3d",
          transform: "rotateX(45deg)",
        }}
      >
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: `radial-gradient(circle, ${C.copper}12 0%, transparent 65%)` }} />
        {RINGS.map((ring, i) => (
          <OrbitRing key={i} {...ring} />
        ))}
        {/* Sun — Ruby on Rails at the center */}
        <motion.div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 76,
            height: 76,
            marginLeft: -38,
            marginTop: -38,
            borderRadius: "50%",
            background: `radial-gradient(circle at 35% 30%, ${C.gold}, ${C.goldDeep})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
          }}
          animate={{ boxShadow: [`0 0 24px 6px ${C.copper}55`, `0 0 40px 14px ${C.copper}80`, `0 0 24px 6px ${C.copper}55`] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div style={{ width: 46, height: 46, borderRadius: "50%", background: "rgba(18,18,18,0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <IconForTech name="Ruby on Rails" size={26} colored />
          </div>
        </motion.div>
      </div>
    </div>
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
    <Section id="skills" label="Tech" title="Skills" subtitle="Click any highlighted pill to see specifics. Skills with ▼ expand on click." tinted className="crosshair-grid" watermark="SKILLS">
      <FadeUp>
        <SkillSolarSystem />
      </FadeUp>
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
