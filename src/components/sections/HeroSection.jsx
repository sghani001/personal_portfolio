import React from "react";
import { motion } from "framer-motion";
import resumeData from "../../utils/resumeData";
import C from "../../theme";
import { useGemStatsContext } from "../../context/GemStatsContext";
import { IconArrow } from "../Icons";
import { TypewriterText } from "./TypewriterText";
import { FadeUp } from "../UI";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { useScrollParallax } from "../../hooks/useScrollParallax";
import { useTilt3D } from "../../hooks/useTilt3D";

function TiltPortrait() {
  const { ref, onPointerMove, onPointerLeave, tilt, enabled } = useTilt3D({ max: 8 });
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 460, margin: "0 auto" }}>
      {/* Decorative rings are deliberately much smaller than the photo so the person
          visually breaks past their edges (shoulders/head popping out of the circle)
          instead of being contained inside it. */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "62%",
          aspectRatio: "1",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.copper}35 0%, transparent 70%)`,
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />
      {!reducedMotion && (
        <>
          <motion.div
            style={{ position: "absolute", top: "50%", left: "50%", width: "68%", aspectRatio: "1", borderRadius: "50%", border: `1px dashed ${C.copper}50`, zIndex: 0 }}
            initial={{ x: "-50%", y: "-50%" }}
            animate={{ rotate: 360, x: "-50%", y: "-50%" }}
            transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            style={{ position: "absolute", top: "50%", left: "50%", width: "80%", aspectRatio: "1", borderRadius: "50%", border: `1px dotted ${C.border}`, zIndex: 0 }}
            initial={{ x: "-50%", y: "-50%" }}
            animate={{ rotate: -360, x: "-50%", y: "-50%" }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          />
        </>
      )}
      <div
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={{
          position: "relative",
          zIndex: 1,
          transform: enabled ? `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` : "none",
          transition: "transform 0.2s ease-out",
        }}
      >
        <img
          src="/syed_ghani_no_bg.png"
          alt="Syed M. Ghani — Ruby on Rails & React Engineer, Lahore"
          style={{ width: "100%", height: "auto", display: "block", filter: "drop-shadow(0 30px 50px rgba(0,0,0,0.5))" }}
          onError={(e) => {
            // Falls back to the existing photo if the no-background cutout isn't reachable.
            if (e.target.src.indexOf("syed_ghani_no_bg") !== -1) {
              e.target.src = resumeData.photo;
              e.target.style.borderRadius = "24px";
            } else {
              e.target.style.display = "none";
            }
          }}
        />
      </div>
    </div>
  );
}

function ContactWidget() {
  const reducedMotion = usePrefersReducedMotion();
  return (
    <motion.a
      href="#contact"
      animate={reducedMotion ? undefined : { y: [0, 8, 0] }}
      transition={reducedMotion ? undefined : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "absolute",
        bottom: 8,
        right: 8,
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 16px 10px 10px",
        borderRadius: 14,
        background: "rgba(12,10,8,0.8)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: `1px solid ${C.copper}45`,
        boxShadow: "0 16px 40px rgba(0,0,0,0.45)",
        textDecoration: "none",
        zIndex: 3,
      }}
    >
      <span
        style={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${C.gold}, ${C.goldDeep})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
          fontWeight: 800,
          color: C.onGold,
          flexShrink: 0,
        }}
      >
        SG
      </span>
      <div>
        <div style={{ fontSize: 9, color: "#9a9a9a", textTransform: "uppercase", letterSpacing: "0.1em" }}>Let's talk</div>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", fontFamily: "'Space Grotesk',sans-serif" }}>Syed Ghani</div>
      </div>
      <IconArrow />
    </motion.a>
  );
}

export function HeroSection() {
  const { displayTotal, isLive } = useGemStatsContext();
  const { ref: parallaxRef, y: parallaxY } = useScrollParallax(140, ["start start", "end start"]);

  return (
    <section ref={parallaxRef} style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: 64 }}>
      <motion.div className="crosshair-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.5, y: parallaxY }}>
        <div style={{ position: "absolute", top: -120, left: -80, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(226,199,153,0.06) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: -100, right: -80, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(226,199,153,0.05) 0%, transparent 70%)", filter: "blur(60px)" }} />
      </motion.div>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "10%",
          left: "2%",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}
      >
        <div
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontWeight: 800,
            fontSize: "clamp(40px, 7vw, 110px)",
            lineHeight: 0.95,
            color: C.primary,
            opacity: 0.12,
            letterSpacing: "0.03em",
            whiteSpace: "nowrap",
          }}
        >
          SYED
        </div>
        <div
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontWeight: 800,
            fontSize: "clamp(40px, 7vw, 110px)",
            lineHeight: 0.95,
            color: C.gold,
            opacity: 0.14,
            letterSpacing: "0.03em",
            marginTop: -6,
            whiteSpace: "nowrap",
          }}
        >
          GHANI
        </div>
      </div>

      <div className="hero-split">
        <div style={{ position: "relative", zIndex: 2, flex: "1 1 480px", maxWidth: 560 }}>
          <FadeUp>
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
                marginBottom: 24,
                letterSpacing: "0.05em",
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.copper, animation: "pulse 2s infinite" }} />
              Open to Lahore companies & remote roles worldwide
            </div>
          </FadeUp>

          <FadeUp delay={40}>
            <h1
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: "clamp(30px,4.4vw,48px)",
                fontWeight: 700,
                color: C.primary,
                lineHeight: 1.15,
                marginBottom: 18,
              }}
            >
              I help SaaS founders ship <span style={{ color: C.copper }}>production-ready</span> Rails & React features.
            </h1>
          </FadeUp>

          <FadeUp delay={80}>
            <div
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 16,
                fontWeight: 600,
                color: C.copper,
                minHeight: 24,
                marginBottom: 28,
              }}
            >
              <span style={{ color: C.secondary, marginRight: 8 }}>{'>'}</span>
              <TypewriterText words={resumeData.titles} />
            </div>
          </FadeUp>

          <FadeUp delay={120}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 36 }}>
              <a
                id="hero-contact"
                href="#contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 24px",
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
                Get in Touch <IconArrow />
              </a>
              <a
                id="hero-view-work"
                href="#case-studies"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 20px",
                  color: C.secondary,
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: "'Space Grotesk',sans-serif",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.copper)}
                onMouseLeave={(e) => (e.currentTarget.style.color = C.secondary)}
              >
                View Projects ↓
              </a>
            </div>
          </FadeUp>

          <FadeUp delay={160}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 20,
                fontSize: 11,
                fontFamily: "'JetBrains Mono',monospace",
                color: C.secondary,
                borderTop: `1px solid ${C.border}`,
                paddingTop: 20,
              }}
            >
              <span>© {new Date().getFullYear()}</span>
              {resumeData.credibilityStrip.slice(0, 2).map((item, i) => (
                <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: C.copper, flexShrink: 0 }} />
                  {item}
                </span>
              ))}
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: C.copper, flexShrink: 0 }} />
                {displayTotal}+ Gem Downloads{isLive ? " (live)" : ""}
              </span>
            </div>
          </FadeUp>
        </div>

        <div style={{ position: "relative", zIndex: 2, flex: "1 1 380px", maxWidth: 420 }}>
          <FadeUp delay={100}>
            <TiltPortrait />
          </FadeUp>
          <ContactWidget />
        </div>
      </div>
    </section>
  );
}
