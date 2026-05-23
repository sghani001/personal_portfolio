import React, { useEffect, useState } from "react";
import "./ProjectModal.css";

export default function ProjectModal({ project, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (project) {
      setIsVisible(true);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }
  }, [project]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
      document.body.style.overflow = "";
    }, 150); // Wait for fade-out animation
  };

  if (!project) return null;

  return (
    <div className={`project-modal-overlay ${isVisible ? "open" : ""}`} onClick={handleClose}>
      <div className={`project-modal-content glass-card ${isVisible ? "open" : ""}`} onClick={(e) => e.stopPropagation()}>
        <button className="project-modal-close" onClick={handleClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="project-modal-header">
          {project.image && (
            <div className="project-modal-image-wrap">
              <img src={project.image} alt={project.name} className="project-modal-image" />
              <div className="project-modal-overlay-gradient"></div>
            </div>
          )}
          <div className="project-modal-title-wrap">
            <h2 className="project-modal-title">{project.name}</h2>
            {project.tech && (
              <div className="project-modal-tech">
                {project.tech.map((t, i) => (
                  <span key={i} className="skill-pill modal-pill">{t}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="project-modal-body">
          <div className="project-modal-section">
            <h3 className="project-modal-subtitle">
              <span role="img" aria-label="problem">❓</span> The Problem
            </h3>
            <p>{project.problem || "Real-world problem this project aims to solve, demonstrating product sense."}</p>
          </div>

          <div className="project-modal-section">
            <h3 className="project-modal-subtitle">
              <span role="img" aria-label="solution">💡</span> The Solution
            </h3>
            <p>{project.solution || project.description || "How the application architecturally and functionally provides a reliable, scalable fix."}</p>
          </div>

          <div className="project-modal-section grid-section">
            <div>
              <h3 className="project-modal-subtitle">
                <span role="img" aria-label="metrics">📈</span> Key Metrics & Impact
              </h3>
              <ul className="project-modal-list">
                {project.metrics ? project.metrics.map((m, i) => <li key={i}>{m}</li>) : (
                  <>
                    <li>Optimized API response times by 30%</li>
                    <li>Secure authentication with JWT & Devise</li>
                    <li>Fully tested with Rspec & Jest</li>
                  </>
                )}
              </ul>
            </div>
            <div>
              <h3 className="project-modal-subtitle">
                <span role="img" aria-label="features">🛠</span> Core Engineering
              </h3>
              <ul className="project-modal-list">
                {project.engineering ? project.engineering.map((e, i) => <li key={i}>{e}</li>) : (
                  <>
                    <li>MVC Architecture & RESTful patterns</li>
                    <li>Custom PostgreSQL complex queries</li>
                    <li>React Context & Custom Hooks</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="project-modal-footer">
          {project.url && (
            <a href={project.url} target="_blank" rel="noreferrer" className="hero__btn hero__btn--primary modal-btn">
              View Live App
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="hero__btn modal-btn secondary">
              GitHub Repo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
