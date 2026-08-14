import React, { useState } from "react";
import resumeData from "../../utils/resumeData";
import C from "../../theme";
import { FadeUp, Section } from "../UI";
import { ProjectModal } from "../ProjectModal";
import { Coverflow } from "../Coverflow";
import { getScreenshotUrl } from "../../utils/screenshot";

function CaseStudyCard({ project, isActive, onOpen }) {
  return (
    <div
      onClick={() => isActive && onOpen()}
      style={{
        borderRadius: 18,
        overflow: "hidden",
        border: `1px solid ${isActive ? `${C.copper}45` : C.border}`,
        background: C.surface,
        boxShadow: isActive ? "0 24px 56px rgba(0,0,0,0.42)" : "0 8px 24px rgba(0,0,0,0.25)",
        cursor: isActive ? "pointer" : "default",
        height: 380,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ width: "100%", aspectRatio: "16/10", position: "relative", background: C.bg, flexShrink: 0 }}>
        <img
          src={project.image}
          alt={project.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => (e.target.style.display = "none")}
        />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${C.surface} 0%, transparent 40%)` }} />
        {project.flagship && (
          <div
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              padding: "4px 12px",
              borderRadius: 100,
              background: C.gold,
              color: C.onGold,
              fontSize: 10,
              fontWeight: 700,
              fontFamily: "'Space Grotesk',sans-serif",
            }}
          >
            Flagship
          </div>
        )}
      </div>
      <div style={{ padding: "18px 22px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 17, fontWeight: 700, color: C.primary, margin: "0 0 6px" }}>{project.name}</h3>
        {project.description && (
          <p style={{ fontSize: 12.5, color: C.secondary, lineHeight: 1.55, margin: 0, display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 3, overflow: "hidden" }}>
            {project.description}
          </p>
        )}
        {isActive && <p style={{ fontSize: 11, color: C.copper, marginTop: "auto", fontFamily: "'JetBrains Mono',monospace" }}>Click for full story →</p>}
      </div>
    </div>
  );
}

export function CaseStudiesSection() {
  const bsExp = resumeData.experience[0];
  const projects = bsExp.projects.map((p) => ({ ...p, image: getScreenshotUrl(p.url) }));
  const [active, setActive] = useState(null);

  return (
    <Section id="case-studies" label="Selected Work" title="Featured Case Studies" subtitle="Five production SaaS builds — click the center card, or use the dots to browse." watermark="WORK">
      <FadeUp>
        <Coverflow
          items={projects}
          cardWidth={300}
          height={400}
          renderCard={(project, { isActive }) => <CaseStudyCard project={project} isActive={isActive} onOpen={() => setActive(project)} />}
        />
      </FadeUp>

      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </Section>
  );
}
