import React, { useEffect, useState } from "react";

export default function LinkedInBadge({ theme }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // LinkedIn doesn't have a public API, so we use hardcoded data
    // Update this data to match your LinkedIn profile
    setProfile({
      name: "Syed M Ghani",
      headline: "Full-Stack Engineer | Ruby on Rails & React.js | SaaS & Payments | Aspiring Python/Django & AI Automation | Open to Remote / Lahore On-site",
      company: "Ex: Blackstack Software Solutions",
      education: "University of Engineering and Technology, Lahore",
      location: "Lahore, Pakistan",
      connections: "1400+",
      avatar: "https://avatars.githubusercontent.com/u/sghani001", // reuse GitHub avatar
      url: "https://pk.linkedin.com/in/syed-m-ghani-357ba4234",
    });
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="linkedin-badge-wrapper">
        <div className="github-badge__loading">Loading...</div>
      </div>
    );
  }

  return (
    <a href={profile.url} target="_blank" rel="noreferrer" className="linkedin-badge-wrapper fade-in-up">
      {/* Header */}
      <div className="linkedin-badge__header">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="linkedin-badge__logo" height="20" width="20">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
        <span className="linkedin-badge__header-title">LinkedIn</span>
      </div>

      {/* Body */}
      <div className="github-badge__body">
        <img
          src={`https://avatars.githubusercontent.com/sghani001`}
          alt={profile.name}
          className="github-badge__avatar"
        />
        <div className="github-badge__name">{profile.name}</div>
        <div className="github-badge__username">{profile.company}</div>
        <div className="github-badge__bio">{profile.headline}</div>
        <div className="github-badge__meta">{profile.education}</div>
        <div className="github-badge__meta">{profile.location}</div>

        {/* Stats */}
        <div className="github-badge__stats">
          <div className="github-badge__stat">
            <span className="github-badge__stat-value">{profile.connections}</span>
            <span className="github-badge__stat-label">Connections</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="github-badge__footer">
        View Profile →
      </div>
    </a>
  );
}