import React, { useState } from "react";
import resumeData from "../../utils/resumeData";
import C, { alpha } from "../../theme";
import { FadeUp, Section } from "../UI";
import { ProjectModal } from "../ProjectModal";
import { Coverflow } from "../Coverflow";
import { AutoProjectImage } from "../AutoProjectImage";

function PersonalProjectCard({ project, isActive, onOpen }) {
  return (
    <div
      onClick={() => isActive && onOpen()}
      style={{
        borderRadius: 18,
        overflow: "hidden",
        border: `1px solid ${isActive ? `${alpha(C.copper, "45")}` : C.border}`,
        background: C.surface,
        boxShadow: isActive ? "0 24px 56px rgba(0,0,0,0.42)" : "0 8px 24px rgba(0,0,0,0.25)",
        cursor: isActive ? "pointer" : "default",
        height: 380,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ width: "100%", aspectRatio: "16/10", flexShrink: 0, position: "relative", overflow: "hidden", background: C.surface }}>
        {/* Real screenshot when the project has one; the generated placeholder is the fallback
            (both for projects without a shot and if the file ever fails to load). */}
        {project.image ? (
          <>
            <img
              src={project.image}
              alt={project.name}
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "block";
              }}
            />
            <div style={{ display: "none", position: "absolute", inset: 0 }}>
              <AutoProjectImage name={project.name} tech={project.tech} />
            </div>
          </>
        ) : (
          <AutoProjectImage name={project.name} tech={project.tech} />
        )}
      </div>
      <div style={{ padding: "18px 22px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 16, fontWeight: 700, color: C.primary, margin: "0 0 6px" }}>{project.name}</h3>
        {project.description && (
          <p style={{ fontSize: 12.5, color: C.secondary, lineHeight: 1.55, margin: 0, display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 3, overflow: "hidden" }}>
            {project.description}
          </p>
        )}
        {isActive && <p style={{ fontSize: 11, color: C.accentText, marginTop: "auto", fontFamily: "'JetBrains Mono',monospace" }}>Click for details →</p>}
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const projects = resumeData.projects.map((p) => ({
    ...p,
    githubUrl: p.url,
    url: undefined,
  }));
  const [active, setActive] = useState(null);

  return (
    <Section id="projects" label="Personal Work" title="Personal Projects" subtitle="Side projects and academic work — click the center card, or use the dots to browse." watermark="PROJECTS">
      <FadeUp>
        <Coverflow
          items={projects}
          cardWidth={280}
          height={400}
          renderCard={(project, { isActive }) => <PersonalProjectCard project={project} isActive={isActive} onOpen={() => setActive(project)} />}
        />
      </FadeUp>

      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </Section>
  );
}
