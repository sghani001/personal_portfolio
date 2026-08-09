import React, { useState } from "react";
import useSectionInView from "../hooks/useSectionInView";
import C from "../theme";
import IconForTech from "./Icons";

export function FadeUp({ children, delay = 0, className = "" }) {
  const [ref, inView] = useSectionInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export function Card({ children, hover = true, className = "", style = {} }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className={className}
      onMouseEnter={() => hover && setHov(true)}
      onMouseLeave={() => hover && setHov(false)}
      style={{
        background: C.surface,
        border: `1px solid ${hov ? C.copper + "55" : C.border}`,
        borderRadius: C.radius,
        boxShadow: hov
          ? "0 8px 32px var(--shadow-hover), var(--shadow-inset), 0 0 0 1px #E2C79918"
          : "0 4px 16px var(--shadow-base), var(--shadow-inset)",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        transition: "background 0.3s, border-color 0.25s, box-shadow 0.25s, transform 0.25s",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function SkillPill({ skill, dashed = false }) {
  const [open, setOpen] = useState(false);
  const hasDetail = skill.detail && skill.detail.length > 0;

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => hasDetail && setOpen((o) => !o)}
        style={{
          padding: "6px 14px",
          borderRadius: 8,
          fontSize: 13,
          fontFamily: "'JetBrains Mono', monospace",
          cursor: hasDetail ? "pointer" : "default",
          background: dashed ? "transparent" : C.bg,
          border: dashed ? `1.5px dashed ${C.border}` : `1px solid ${C.border}`,
          color: dashed ? C.secondary : C.primary,
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          transition: "border-color 0.2s, color 0.2s",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = C.copper;
          e.currentTarget.style.color = C.copper;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = dashed ? C.border : C.border;
          e.currentTarget.style.color = dashed ? C.secondary : C.primary;
        }}
      >
        <IconForTech name={skill.name} size={14} colored={true} />
        <span>{skill.name}</span>
        {hasDetail && (
          <span
            style={{
              fontSize: 9,
              color: C.copper,
              transform: open ? "rotate(180deg)" : "none",
              display: "inline-block",
              transition: "transform 0.2s",
            }}
          >
            ▼
          </span>
        )}
      </button>

      {hasDetail && open && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: C.surface,
            border: `1px solid ${C.copper}40`,
            borderRadius: 10,
            padding: "10px 14px",
            minWidth: 180,
            zIndex: 100,
            boxShadow: "0 8px 24px var(--shadow-hover)",
          }}
        >
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
            {skill.detail.map((d, i) => (
              <li key={i} style={{ fontSize: 12, color: C.secondary, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: C.sage, fontSize: 10 }}>✓</span> {d}
              </li>
            ))}
          </ul>
          <div
            style={{
              position: "absolute",
              bottom: -6,
              left: "50%",
              transform: "translateX(-50%)",
              width: 10,
              height: 10,
              background: C.surface,
              border: `1px solid ${C.copper}40`,
              borderTop: "none",
              borderLeft: "none",
              rotate: "45deg",
            }}
          />
        </div>
      )}
    </div>
  );
}

export function Section({ id, label, title, subtitle, children, tinted = false }) {
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
