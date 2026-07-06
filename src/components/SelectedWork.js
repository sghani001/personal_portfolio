import React from "react";
import resumeData from "../utils/resumeData";
import { skillPillClass } from "../utils/skillTone";
import "./SelectedWork.css";

export default function SelectedWork({ onSelectProject }) {
  const projects = resumeData.selectedWork || [];

  return (
    <div className="selected-work">
      {projects.map((proj, i) => (
        <article
          key={proj.id}
          className="work-card glass-card"
          style={{ "--stagger-i": i }}
          onClick={() => onSelectProject(proj)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onSelectProject(proj)}
        >
          <div className="work-card__top">
            <span className="work-card__num">{proj.id}</span>
            <span className="work-card__status">{proj.status}</span>
          </div>

          {proj.image && (
            <div className="work-card__img-wrap">
              <img src={proj.image} alt="" className="work-card__img" />
            </div>
          )}

          <h3 className="work-card__name">{proj.name}</h3>
          {proj.subtitle && <p className="work-card__subtitle">{proj.subtitle}</p>}

          <div className="work-card__tags">
            {proj.tags.map((tag) => (
              <span key={tag} className="work-card__tag">{tag}</span>
            ))}
          </div>

          {proj.role && <p className="work-card__role"><strong>Role:</strong> {proj.role}</p>}
          {proj.deployContext && <p className="work-card__deploy"><strong>Deploy:</strong> {proj.deployContext}</p>}

          {proj.tech && (
            <div className="work-card__tech">
              {proj.tech.slice(0, 4).map((t, j) => (
                <span key={j} className={`skill-pill ${skillPillClass(t)}`}>{t}</span>
              ))}
            </div>
          )}

          <span className="work-card__cta">View Case Study →</span>
        </article>
      ))}
    </div>
  );
}
