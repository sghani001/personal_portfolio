import React, { useEffect, useRef, useState } from "react";
import C from "../../theme";

export default function SkillPill({ skill, dashed = false }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const hasDetail = skill.detail && skill.detail.length > 0;

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={wrapperRef} style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => hasDetail && setOpen(!open)}
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
          gap: 5,
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
        {skill.name}
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
            background: "var(--surface)",
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
              background: "var(--surface)",
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
