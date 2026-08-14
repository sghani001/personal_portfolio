import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import resumeData from "../../utils/resumeData";
import C, { alpha } from "../../theme";
import { IconExternal } from "../Icons";
import { FadeUp, Section } from "../UI";
import { Coverflow } from "../Coverflow";

const CLAMP_LINES = 5;

function TestimonialModal({ t, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Rendered via portal: Section now has overflow:hidden for the background watermark,
  // which visually clips position:fixed descendants in real browsers — escape to document.body.
  return createPortal(
    <motion.div
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
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
        perspective: 1200,
      }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, rotateY: 180, scale: 0.6 }}
        animate={{ opacity: 1, rotateY: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: C.bg || "#0d0d0d",
          border: `1px solid ${alpha(C.copper, "30")}`,
          borderRadius: 16,
          maxWidth: 560,
          width: "100%",
          maxHeight: "80vh",
          overflowY: "auto",
          padding: "40px 36px 32px",
          position: "relative",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
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
            border: `1px solid ${alpha(C.copper, "40")}`,
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

        <div style={{ fontSize: 48, color: `${alpha(C.copper, "25")}`, fontFamily: "Georgia, serif", lineHeight: 1, marginBottom: 8 }}>"</div>

        <p style={{ fontSize: 15, color: `${alpha(C.primary, "DD")}`, lineHeight: 1.9, fontStyle: "italic", marginBottom: 28, whiteSpace: "pre-line" }}>
          {t.quote}
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: C.primary, fontSize: 15, margin: "0 0 4px" }}>{t.author}</p>
            <p style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: C.secondary, margin: 0 }}>{t.title}</p>
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
                color: C.accentText,
                textDecoration: "none",
                border: `1px solid ${alpha(C.copper, "40")}`,
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
      </motion.div>
    </motion.div>,
    document.body
  );
}

function TestimonialCard({ t, isActive, onExpand }) {
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
    <div
      style={{
        background: C.surface,
        border: `1px solid ${isActive ? `${alpha(C.copper, "45")}` : C.border}`,
        borderRadius: C.radius,
        boxShadow: isActive ? "0 24px 56px rgba(0,0,0,0.42)" : "0 8px 24px rgba(0,0,0,0.25)",
        padding: 32,
        height: 380,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 12, right: 20, fontSize: 72, color: `${alpha(C.copper, "09")}`, fontFamily: "Georgia, serif", lineHeight: 1, userSelect: "none" }}>
        "
      </div>

      <p
        ref={textRef}
        style={{
          fontSize: 14,
          color: `${alpha(C.primary, "CC")}`,
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

      {isLong && isActive && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onExpand();
          }}
          style={{
            alignSelf: "flex-start",
            background: "none",
            border: "none",
            padding: 0,
            marginBottom: 20,
            fontSize: 11,
            fontFamily: "'JetBrains Mono',monospace",
            color: C.accentText,
            cursor: "pointer",
            textDecoration: "underline",
            textUnderlineOffset: 3,
          }}
        >
          read full testimonial →
        </button>
      )}

      <div style={{ marginTop: "auto", paddingTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: C.primary, fontSize: 14, margin: "0 0 4px" }}>{t.author}</p>
          <p style={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: C.secondary, margin: 0, lineHeight: 1.5 }}>{t.title}</p>
        </div>
        {t.url && isActive && (
          <a
            href={t.url}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 11,
              color: C.accentText,
              textDecoration: "none",
              border: `1px solid ${alpha(C.copper, "40")}`,
              borderRadius: 8,
              padding: "6px 10px",
              flexShrink: 0,
              whiteSpace: "nowrap",
            }}
          >
            {t.type === "post" && "view post"}
            {t.type === "profile" && "view profile"}
            <IconExternal size={11} />
          </a>
        )}
      </div>
    </div>
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
    <Section id="testimonials" label="Social Proof" title="What They Say" subtitle="From people who worked with me directly. Click a card or use the arrows to browse." tinted watermark="PROOF">
      <FadeUp>
        <Coverflow
          items={testimonials}
          cardWidth={340}
          height={400}
          renderCard={(t, { isActive }) => <TestimonialCard t={t} isActive={isActive} onExpand={() => setActiveIndex(testimonials.indexOf(t))} />}
        />
      </FadeUp>

      {activeIndex !== null && (
        <TestimonialModal t={testimonials[activeIndex]} onClose={() => setActiveIndex(null)} />
      )}
    </Section>
  );
}
