import React, { useState, useEffect } from "react";
import resumeData from "../../utils/resumeData";
import C from "../../theme";
import { IconExternal } from "../Icons";
import { FadeUp, Card, Section } from "../UI";

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
