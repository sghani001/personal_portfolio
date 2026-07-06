import React, { useMemo, useState } from "react";
import resumeData from "../utils/resumeData";
import { skillPillClass } from "../utils/skillTone";
import "./TechArsenal.css";

export default function TechArsenal() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const arsenal = resumeData.techArsenal || {};
  const categories = ["All", ...Object.keys(arsenal)];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const entries = Object.entries(arsenal);

    return entries
      .filter(([cat]) => activeCategory === "All" || cat === activeCategory)
      .map(([category, skills]) => ({
        category,
        skills: skills.filter(
          (s) => !q || s.toLowerCase().includes(q) || category.toLowerCase().includes(q)
        ),
      }))
      .filter((g) => g.skills.length > 0);
  }, [arsenal, query, activeCategory]);

  const totalMatches = filtered.reduce((sum, g) => sum + g.skills.length, 0);

  return (
    <div className="tech-arsenal">
      <div className="tech-arsenal__search glass-card">
        <span className="tech-arsenal__prompt">$</span>
        <span className="tech-arsenal__cmd">grep -r</span>
        <input
          type="text"
          className="tech-arsenal__input"
          placeholder="Search stack..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search tech stack"
        />
        <span className="tech-arsenal__count">{totalMatches} matches</span>
      </div>

      <div className="tech-arsenal__filters">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`tech-arsenal__filter ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="tech-arsenal__groups">
        {filtered.map(({ category, skills }) => (
          <div key={category} className="tech-arsenal__group glass-card">
            <h3 className="tech-arsenal__group-label">{category}/</h3>
            <div className="tech-arsenal__skills">
              {skills.map((s, i) => (
                <span key={i} className={`skill-pill ${skillPillClass(s)}`}>{s}</span>
              ))}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="tech-arsenal__empty glass-card">No matches for "{query}"</div>
        )}
      </div>
    </div>
  );
}
