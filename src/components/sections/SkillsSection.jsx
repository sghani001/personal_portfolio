import React from "react";
import { motion } from "framer-motion";
import resumeData from "../../utils/resumeData";
import C, { alpha } from "../../theme";
import { IconForTech } from "../Icons";
import { FadeUp, SkillPill, Section } from "../UI";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { useInView } from "../../hooks/useInView";

const RINGS = [
  { radius: 92, duration: 18, size: 38, iconSize: 16, icons: ["React.js", "PostgreSQL", "Redis"] },
  { radius: 168, duration: 32, size: 42, iconSize: 18, icons: ["Sidekiq", "Docker", "AWS"] },
  { radius: 244, duration: 48, size: 42, iconSize: 18, icons: ["Stripe", "GitHub Actions", "TailwindCSS"] },
];

// The ring radii above are the full-size (desktop) values. On narrow screens the
// whole system is scaled down proportionally so it fits the viewport instead of
// being clipped by the section's overflow:hidden.
function useSolarScale(baseDiameter) {
  const [scale, setScale] = React.useState(1);
  React.useEffect(() => {
    const compute = () => {
      const available = Math.min(window.innerWidth, document.documentElement.clientWidth) - 32;
      setScale(Math.min(1, available / baseDiameter));
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [baseDiameter]);
  return scale;
}

function OrbitRing({ radius, duration, size, iconSize, icons, active }) {
  // Parked off-screen: a stopped animation costs nothing, and nobody can see
  // the reset to 0deg because the whole system is out of view when it happens.
  const spin = active ? { rotate: 360 } : { rotate: 0 };
  const spinBack = active ? { rotate: -360 } : { rotate: 0 };
  const loop = active ? { duration, repeat: Infinity, ease: "linear" } : { duration: 0 };

  return (
    <>
      <div style={{ position: "absolute", top: "50%", left: "50%", width: radius * 2, height: radius * 2, marginLeft: -radius, marginTop: -radius, borderRadius: "50%", border: `1px dashed ${C.border}` }} />
      <motion.div
        style={{ position: "absolute", inset: 0 }}
        animate={spin}
        transition={loop}
      >
        {icons.map((name, i) => {
          const angle = (360 / icons.length) * i;
          return (
            <div key={name} style={{ position: "absolute", top: "50%", left: "50%", transform: `rotate(${angle}deg) translateX(${radius}px) rotate(${-angle}deg)` }}>
              <motion.div
                animate={spinBack}
                transition={loop}
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
  const baseDiameter = RINGS[RINGS.length - 1].radius * 2 + 60;
  const scale = useSolarScale(baseDiameter);
  // Declared before the early return below — hooks can't run conditionally.
  const [viewRef, inView] = useInView();
  if (reducedMotion) return null;

  const diameter = baseDiameter * scale;
  // Scale every dimension by the same factor so the system shrinks as one rigid
  // unit — scaling radii without the icons would leave them overlapping.
  const rings = RINGS.map((r) => ({
    ...r,
    radius: r.radius * scale,
    size: r.size * scale,
    iconSize: Math.max(11, Math.round(r.iconSize * scale)),
  }));
  const sun = Math.round(76 * scale);
  const sunInner = Math.round(46 * scale);

  return (
    <div ref={viewRef} style={{ perspective: 1100, marginBottom: -diameter * 0.15, overflow: "hidden" }}>
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
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: `radial-gradient(circle, ${alpha(C.copper, "12")} 0%, transparent 65%)` }} />
        {rings.map((ring, i) => (
          <OrbitRing key={i} {...ring} active={inView} />
        ))}
        {/* Sun — Ruby on Rails at the center. The glow is a separate layer whose
            opacity/scale pulses, rather than an animated box-shadow: box-shadow
            can't be composited, so animating it repainted the sun every frame
            for as long as the page was open. */}
        <motion.div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: sun,
            height: sun,
            marginLeft: -sun / 2,
            marginTop: -sun / 2,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${alpha(C.copper, "80")} 0%, transparent 70%)`,
            zIndex: 1,
            pointerEvents: "none",
          }}
          animate={inView ? { opacity: [0.55, 1, 0.55], scale: [1.25, 1.9, 1.25] } : { opacity: 0.7, scale: 1.5 }}
          transition={inView ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: sun,
            height: sun,
            marginLeft: -sun / 2,
            marginTop: -sun / 2,
            borderRadius: "50%",
            background: `radial-gradient(circle at 35% 30%, ${C.gold}, ${C.goldDeep})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
          }}
        >
          <div style={{ width: sunInner, height: sunInner, borderRadius: "50%", background: "rgba(18,18,18,0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <IconForTech name="Ruby on Rails" size={Math.max(16, Math.round(26 * scale))} colored />
          </div>
        </div>
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
      <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 96 }}>
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
              <span style={{ marginLeft: 4, padding: "2px 8px", borderRadius: 100, fontSize: 10, background: `${alpha(C.copper, "14")}`, border: `1px solid ${alpha(C.copper, "30")}`, color: C.accentText, fontFamily: "'JetBrains Mono',monospace" }}>
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
