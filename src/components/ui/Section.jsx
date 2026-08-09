import React from "react";
import FadeUp from "./FadeUp";
import C from "../../theme";

export default function Section({ id, label, title, subtitle, children, tinted = false }) {
  return (
    <section
      id={id}
      style={{
        padding: "96px 0",
        background: tinted ? "var(--tinted-bg)" : "transparent",
        transition: "background 0.3s, color 0.3s",
      }}
    >
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
        {label && (
          <FadeUp>
            <p
              style={{
                fontSize: 11,
                fontFamily: "'JetBrains Mono',monospace",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: C.copper,
                marginBottom: 8,
              }}
            >
              {label}
            </p>
          </FadeUp>
        )}
        <FadeUp delay={40}>
          <h2
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: "clamp(28px,4vw,38px)",
              fontWeight: 700,
              color: C.primary,
              marginBottom: 12,
              lineHeight: 1.15,
            }}
          >
            {title}
          </h2>
        </FadeUp>
        {subtitle && (
          <FadeUp delay={80}>
            <p style={{ color: C.secondary, fontSize: 17, maxWidth: 640, marginBottom: 56, lineHeight: 1.7 }}>
              {subtitle}
            </p>
          </FadeUp>
        )}
        {children}
      </div>
    </section>
  );
}
