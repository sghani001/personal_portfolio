import React, { useEffect, useState } from "react";

export default function LeetCodeBadge({ username }) {
  const [stats, setStats] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [solvedRes, profileRes] = await Promise.all([
          fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`),
          fetch(`https://alfa-leetcode-api.onrender.com/${username}`)
        ]);
        const solvedData = await solvedRes.json();
        const profileData = await profileRes.json();

        setStats(solvedData);
        setProfile(profileData);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    };
    fetchAll();
  }, [username]);

  const LeetCodeIcon = () => (
    <svg viewBox="0 0 50 50" fill="currentColor" className="leetcode-badge__logo" height="20" width="20">
      <path d="M36.2 37.3c-.6.6-1.5.6-2.1 0l-5.4-5.4c-.6-.6-.6-1.5 0-2.1l5.4-5.4c.6-.6 1.5-.6 2.1 0 .6.6.6 1.5 0 2.1L32 31l4.2 4.2c.6.6.6 1.5 0 2.1zM25 43c-3.9 0-7.5-1.5-10.2-4.2C12 36 10.5 32.4 10.5 28.5s1.5-7.5 4.3-10.3L24.3 8.7c.6-.6 1.5-.6 2.1 0l9.5 9.5c.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0L25 11.5l-8.1 8.1C14.7 21.7 13.5 25 13.5 28.5s1.2 6.8 3.4 9.2c2.3 2.3 5.3 3.3 8.1 3.3 3 0 5.9-1.1 8.1-3.3.6-.6 1.5-.6 2.1 0 .6.6.6 1.5 0 2.1C32.5 41.5 28.9 43 25 43z" />
    </svg>
  );

  if (loading) {
    return (
      <div className="leetcode-badge-wrapper">
        <div className="leetcode-badge__header">
          <LeetCodeIcon />
          <span className="leetcode-badge__header-title">LeetCode</span>
        </div>
        <div className="github-badge__body">
          <div className="leetcode-badge__loading-spinner" />
          <div className="github-badge__username">Loading...</div>
        </div>
      </div>
    );
  }

  const totalSolved = stats?.solvedProblem || 0;
  const easySolved = stats?.easySolved || 0;
  const mediumSolved = stats?.mediumSolved || 0;
  const hardSolved = stats?.hardSolved || 0;
  const totalEasy = stats?.totalEasy || 944;
  const totalMedium = stats?.totalMedium || 2057;
  const totalHard = stats?.totalHard || 934;
  const totalQuestions = totalEasy + totalMedium + totalHard;
  const solvedPercent = totalQuestions > 0 ? Math.round((totalSolved / totalQuestions) * 100) : 0;

  const avatar = profile?.avatar || `https://avatars.githubusercontent.com/sghani001`;
  const name = profile?.name || username;
  const bio = profile?.aboutMe || "Full-Stack Engineer | Ruby on Rails & React.js";
  const ranking = profile?.ranking || "3,174,284";
  const acceptance = "73.8";

  return (
    <a href={`https://leetcode.com/${username}`} target="_blank" rel="noreferrer" className="leetcode-badge-wrapper fade-in-up">
      <div className="leetcode-badge__header">
        <LeetCodeIcon />
        <span className="leetcode-badge__header-title">LeetCode</span>
      </div>

      <div className="github-badge__body">
        {/* Avatar */}
        <img src={avatar} alt={name} className="github-badge__avatar" onError={(e) => { e.target.src = `https://avatars.githubusercontent.com/sghani001`; }} />
        <div className="github-badge__name">{name}</div>
        <div className="github-badge__username">@{username}</div>
        {bio && <div className="github-badge__bio">{bio}</div>}
        <div className="github-badge__meta">📍 Pakistan</div>

        {/* Circle progress */}
        {/* <div className="leetcode-badge__circle-wrap" style={{ marginTop: "0.75rem" }}>
          <svg viewBox="0 0 80 80" className="leetcode-badge__circle">
            <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
            <circle cx="40" cy="40" r="34" fill="none" stroke="#ffa116" strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 34}`}
              strokeDashoffset={`${2 * Math.PI * 34 * (1 - solvedPercent / 100)}`}
              transform="rotate(-90 40 40)" />
          </svg>
          <div className="leetcode-badge__circle-text">
            <span className="leetcode-badge__circle-value">{totalSolved}</span>
            <span className="leetcode-badge__circle-label">Solved</span>
          </div>
        </div> */}

        {/* Easy / Medium / Hard */}
        <div className="leetcode-badge__difficulties">
          <div className="leetcode-badge__diff leetcode-badge__diff--easy">
            <span className="leetcode-badge__diff-label">Easy</span>
            <span className="leetcode-badge__diff-value">{easySolved}<span className="leetcode-badge__diff-total">/{totalEasy}</span></span>
          </div>
          <div className="leetcode-badge__diff leetcode-badge__diff--medium">
            <span className="leetcode-badge__diff-label">Medium</span>
            <span className="leetcode-badge__diff-value">{mediumSolved}<span className="leetcode-badge__diff-total">/{totalMedium}</span></span>
          </div>
          <div className="leetcode-badge__diff leetcode-badge__diff--hard">
            <span className="leetcode-badge__diff-label">Hard</span>
            <span className="leetcode-badge__diff-value">{hardSolved}<span className="leetcode-badge__diff-total">/{totalHard}</span></span>
          </div>
        </div>

        {/* Stats */}
        <div className="github-badge__stats">
          <div className="github-badge__stat">
            <span className="github-badge__stat-value">{acceptance}%</span>
            <span className="github-badge__stat-label">Acceptance</span>
          </div>
          <div className="github-badge__stat">
            <span className="github-badge__stat-value">{typeof ranking === "number" ? ranking.toLocaleString() : ranking}</span>
            <span className="github-badge__stat-label">Ranking</span>
          </div>
        </div>
      </div>

      <div className="github-badge__footer">View Profile →</div>
    </a>
  );
}