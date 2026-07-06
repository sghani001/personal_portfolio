import React, { useEffect, useState } from "react";
import resumeData from "../utils/resumeData";
import { skillPillClass } from "../utils/skillTone";
import "./OpenSourceSpotlight.css";

async function fetchGemStats(rubygemsName) {
  try {
    const res = await fetch(`https://rubygems.org/api/v1/gems/${rubygemsName}.json`);
    if (!res.ok) return null;
    const data = await res.json();
    return {
      downloads: data.downloads,
      version: data.version,
      info: data.info,
    };
  } catch {
    return null;
  }
}

export default function OpenSourceSpotlight() {
  const gems = resumeData.openSourceGems || [];
  const [stats, setStats] = useState({});

  useEffect(() => {
    gems.forEach(async (gem) => {
      const data = await fetchGemStats(gem.rubygemsName);
      if (data) {
        setStats((prev) => ({ ...prev, [gem.rubygemsName]: data }));
      }
    });
  }, [gems]);

  return (
    <div className="oss-spotlight">
      <div className="oss-spotlight__diagram glass-card">
        <h3 className="oss-spotlight__diagram-title">rails-guarddog scan flow</h3>
        <div className="oss-flow">
          <div className="oss-flow__step"><span>01</span> Parse codebase</div>
          <div className="oss-flow__arrow">→</div>
          <div className="oss-flow__step"><span>02</span> Detect patterns</div>
          <div className="oss-flow__arrow">→</div>
          <div className="oss-flow__step"><span>03</span> Severity tag</div>
          <div className="oss-flow__arrow">→</div>
          <div className="oss-flow__step"><span>04</span> CI exit code</div>
        </div>
      </div>

      <div className="oss-spotlight__grid">
        {gems.map((gem, i) => {
          const gemStats = stats[gem.rubygemsName];
          return (
            <article key={gem.name} className="oss-gem glass-card" style={{ "--stagger-i": i }}>
              {gem.image && (
                <div className="oss-gem__img-wrap">
                  <img src={gem.image} alt="" className="oss-gem__img" />
                </div>
              )}
              <h3 className="oss-gem__name">{gem.name}</h3>
              <p className="oss-gem__desc">{gem.description}</p>

              {gemStats && (
                <div className="oss-gem__downloads">
                  <span className="oss-gem__dl-value">{gemStats.downloads?.toLocaleString()}</span>
                  <span className="oss-gem__dl-label">downloads · v{gemStats.version}</span>
                </div>
              )}

              <pre className="oss-gem__snippet"><code>{gem.snippet}</code></pre>

              <div className="oss-gem__tech">
                {gem.tech.map((t, j) => (
                  <span key={j} className={`skill-pill ${skillPillClass(t)}`}>{t}</span>
                ))}
              </div>

              <div className="oss-gem__links">
                <a href={gem.githubUrl} target="_blank" rel="noreferrer">GitHub</a>
                <a href={`https://rubygems.org/gems/${gem.rubygemsName}`} target="_blank" rel="noreferrer">RubyGems</a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
