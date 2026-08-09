import React, { useState, useEffect, useRef } from "react";
import resumeData from "../../utils/resumeData";
import C from "../../theme";
import { IconExternal } from "../Icons";
import { FadeUp, Card, Section } from "../UI";

const CLAMP_LINES = 5;

function TestimonialModal({ t, onClose }) {
  // close on Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: C.bg || "#0d0d0d",
          border: `1px solid ${C.copper}30`,
          borderRadius: 16,
          maxWidth: 560,
          width: "100%",
          maxHeight: "80vh",
          overflowY: "auto",
          padding: "40px 36px 32px",
          position: "relative",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE and Edge
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            width: 32,
            height: 32,
            borderRadius: 8,
            border: `1px solid ${C.copper}40`,
            background: "transparent",
            color: C.primary,
            fontSize: 16,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ×
        </button>

        <div style={{ fontSize: 48, color: `${C.copper}25`, fontFamily: "Georgia, serif", lineHeight: 1, marginBottom: 8 }}>
          "
        </div>

        <p
          style={{
            fontSize: 15,
            color: `${C.primary}DD`,
            lineHeight: 1.9,
            fontStyle: "italic",
            marginBottom: 28,
            whiteSpace: "pre-line",
          }}
        >
          {t.quote}
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: C.primary, fontSize: 15, margin: "0 0 4px" }}>
              {t.author}
            </p>
            <p style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: C.secondary, margin: 0 }}>
              {t.title}
            </p>
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
                fontSize: 12,
                color: C.copper,
                textDecoration: "none",
                border: `1px solid ${C.copper}40`,
                borderRadius: 8,
                padding: "8px 12px",
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
            >
              {t.type === "post" && "view post"}
              {t.type === "profile" && "view profile"}
              <IconExternal size={12} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function TestimonialCard({ t, delay, onExpand }) {
  const [isLong, setIsLong] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = parseFloat(getComputedStyle(textRef.current).lineHeight);
      const maxHeight = lineHeight * CLAMP_LINES;
      setIsLong(textRef.current.scrollHeight > maxHeight + 2);
    }
  }, []);

  return (
    <FadeUp delay={delay}>
      <Card
        style={{
          padding: 32,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 20,
            fontSize: 72,
            color: `${C.copper}09`,
            fontFamily: "Georgia, serif",
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          "
        </div>

        <p
          ref={textRef}
          style={{
            fontSize: 14,
            color: `${C.primary}CC`,
            lineHeight: 1.85,
            fontStyle: "italic",
            marginBottom: 10,
            position: "relative",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: CLAMP_LINES,
            overflow: "hidden",
          }}
        >
          "{t.quote}"
        </p>

        {isLong && (
          <button
            onClick={onExpand}
            style={{
              alignSelf: "flex-start",
              background: "none",
              border: "none",
              padding: 0,
              marginBottom: 20,
              fontSize: 11,
              fontFamily: "'JetBrains Mono',monospace",
              color: C.copper,
              cursor: "pointer",
              textDecoration: "underline",
              textUnderlineOffset: 3,
            }}
          >
            read full testimonial →
          </button>
        )}

        <div
          style={{
            marginTop: "auto",
            paddingTop: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div style={{ minWidth: 0 }}>
            <p
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontWeight: 700,
                color: C.primary,
                fontSize: 14,
                margin: "0 0 4px",
              }}
            >
              {t.author}
            </p>
            <p
              style={{
                fontSize: 11,
                fontFamily: "'JetBrains Mono',monospace",
                color: C.secondary,
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {t.title}
            </p>
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
                whiteSpace: "nowrap",
                transition: "background 0.2s",
              }}
            >
              {t.type === "post" && "view post"}
              {t.type === "profile" && "view profile"}
              <IconExternal size={11} />
            </a>
          )}
        </div>
      </Card>
    </FadeUp>
  );
}

export function TestimonialsSection() {
  const [localTestimonials] = useState(() => {
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
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <Section id="testimonials" label="Social Proof" title="What They Say" subtitle="From people who worked with me directly." tinted>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16, alignItems: "stretch" }}>
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} t={t} delay={i * 80} onExpand={() => setActiveIndex(i)} />
        ))}
      </div>

      {activeIndex !== null && (
        <TestimonialModal t={testimonials[activeIndex]} onClose={() => setActiveIndex(null)} />
      )}
    </Section>
  );
}