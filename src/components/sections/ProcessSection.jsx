import React from "react";
import C from "../../theme";
import { IconForTech } from "../Icons";
import { FadeUp, Card, Section } from "../UI";
import { processSteps } from "../../data/sectionsData";

export function ProcessSection() {
  return (
    <Section id="process" label="Engagement" title="How I Work" subtitle="A predictable, low-overhead process — for a Lahore hiring manager or a remote founder.">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: 14 }}>
        {processSteps.map((s, i) => (
          <FadeUp key={i} delay={i * 80}>
            <Card style={{ padding: 28, height: "100%", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: 60, height: 60, borderBottomLeftRadius: 24, background: `${C.copper}08` }} />
              <div style={{ fontSize: 28, marginBottom: 16 }}>
                <IconForTech name={s.iconName} />
              </div>
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
