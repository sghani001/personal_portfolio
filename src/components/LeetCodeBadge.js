import React, { useEffect, useState } from "react";
import resumeData from "../utils/resumeData";

export default function LeetCodeBadge({ username }) {
  const [stats, setStats] = useState(resumeData.cachedStats.leetcode);
  const [profile, setProfile] = useState({
    avatar: null,
    name: username,
    aboutMe: "Full-Stack Engineer | Ruby on Rails & React.js",
    ranking: resumeData.cachedStats.leetcode.ranking,
  });

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [res1, res2] = await Promise.all([
          fetch(`https://leetcode-api-faisalshohag.vercel.app/${username}`).then(r => r.json()).catch(() => null),
          fetch(`https://alfa-leetcode-api.onrender.com/${username}`).then(r => r.json()).catch(() => null),
        ]);

        const combined = res1 || res2 || {};
        const profileData = res2 || res1 || {};

        if (combined.totalSolved || profileData.ranking) {
          const submissionNum = combined.matchedUserStats?.totalSubmissionNum || combined.totalSubmissions || [];
          const acSubmissionNum = combined.matchedUserStats?.acSubmissionNum || combined.acSubmissions || [];
          const totalSubs = submissionNum.length > 0 ? submissionNum[0].submissions : 0;
          const acceptedSubs = acSubmissionNum.length > 0 ? acSubmissionNum[0].submissions : 0;
          const acceptanceRate =
            totalSubs > 0
              ? ((acceptedSubs / totalSubs) * 100).toFixed(1)
              : combined.acceptanceRate || stats.acceptanceRate;

          setStats({
            solvedProblem: combined.totalSolved || stats.solvedProblem,
            easySolved: combined.easySolved || stats.easySolved,
            mediumSolved: combined.mediumSolved || stats.mediumSolved,
            hardSolved: combined.hardSolved || stats.hardSolved,
            totalEasy: combined.totalEasy || stats.totalEasy,
            totalMedium: combined.totalMedium || stats.totalMedium,
            totalHard: combined.totalHard || stats.totalHard,
            acceptanceRate,
            beatsPercentage: combined.beatsPercentage || profileData.beatsPercentage || stats.beatsPercentage,
          });

          setProfile({
            avatar: profileData.avatar || null,
            name: profileData.name || username,
            aboutMe: profileData.aboutMe || "Full-Stack Engineer | Ruby on Rails & React.js",
            ranking: profileData.ranking || combined.ranking || stats.ranking,
          });
        }
      } catch (err) {
        // Silently fail, keeping cached data
      }
    };
    fetchAll();
  }, [username]);

  const LeetCodeIcon = () => (
    <svg viewBox="0 0 50 50" fill="currentColor" className="leetcode-badge__logo" height="20" width="20">
      <path d="M36.2 37.3c-.6.6-1.5.6-2.1 0l-5.4-5.4c-.6-.6-.6-1.5 0-2.1l5.4-5.4c.6-.6 1.5-.6 2.1 0 .6.6.6 1.5 0 2.1L32 31l4.2 4.2c.6.6.6 1.5 0 2.1zM25 43c-3.9 0-7.5-1.5-10.2-4.2C12 36 10.5 32.4 10.5 28.5s1.5-7.5 4.3-10.3L24.3 8.7c.6-.6 1.5-.6 2.1 0l9.5 9.5c.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0L25 11.5l-8.1 8.1C14.7 21.7 13.5 25 13.5 28.5s1.2 6.8 3.4 9.2c2.3 2.3 5.3 3.3 8.1 3.3 3 0 5.9-1.1 8.1-3.3.6-.6 1.5-.6 2.1 0 .6.6.6 1.5 0 2.1C32.5 41.5 28.9 43 25 43z" />
    </svg>
  );



  const easySolved    = stats?.easySolved      || 0;
  const mediumSolved  = stats?.mediumSolved    || 0;
  const hardSolved    = stats?.hardSolved      || 0;
  const totalEasy     = stats?.totalEasy       || 946;
  const totalMedium   = stats?.totalMedium     || 2061;
  const totalHard     = stats?.totalHard       || 936;

  const avatar    = profile?.avatar || `https://avatars.githubusercontent.com/sghani001`;
  const name      = profile?.name   || username;
  const bio       = profile?.aboutMe || "Full-Stack Engineer | Ruby on Rails & React.js";
  const ranking   = profile?.ranking || "3,174,284";
  const acceptance = stats?.acceptanceRate || "74.6";
  const beats      = stats?.beatsPercentage || "50.2";

  return (
    <a href={`https://leetcode.com/${username}`} target="_blank" rel="noreferrer" className="leetcode-badge-wrapper fade-in-up">
      <div className="leetcode-badge__header">
        <LeetCodeIcon />
        <span className="leetcode-badge__header-title">LeetCode</span>
      </div>

      <div className="github-badge__body">
        {/* Avatar */}
        <img
          src={avatar}
          alt={name}
          className="github-badge__avatar"
          onError={(e) => { e.target.src = `https://avatars.githubusercontent.com/sghani001`; }}
        />
        <div className="github-badge__name">{name}</div>
        <div className="github-badge__username">@{username}</div>
        {bio && <div className="github-badge__bio">{bio}</div>}
        <div className="github-badge__meta">📍 Pakistan</div>

        {/* Beats pill */}
        <div className="leetcode-badge__beats-pill">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 3 }}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          {beats}%
        </div>

        {/* Easy / Medium / Hard */}
        <div className="leetcode-badge__difficulties">
          <div className="leetcode-badge__diff leetcode-badge__diff--easy">
            <span className="leetcode-badge__diff-label">Easy</span>
            <span className="leetcode-badge__diff-value">
              {easySolved}<span className="leetcode-badge__diff-total">/{totalEasy}</span>
            </span>
          </div>
          <div className="leetcode-badge__diff leetcode-badge__diff--medium">
            <span className="leetcode-badge__diff-label">Medium</span>
            <span className="leetcode-badge__diff-value">
              {mediumSolved}<span className="leetcode-badge__diff-total">/{totalMedium}</span>
            </span>
          </div>
          <div className="leetcode-badge__diff leetcode-badge__diff--hard">
            <span className="leetcode-badge__diff-label">Hard</span>
            <span className="leetcode-badge__diff-value">
              {hardSolved}<span className="leetcode-badge__diff-total">/{totalHard}</span>
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="github-badge__stats">
          <div className="github-badge__stat">
            <span className="github-badge__stat-value">{acceptance}%</span>
            <span className="github-badge__stat-label">Acceptance</span>
          </div>
          <div className="github-badge__stat">
            <span className="github-badge__stat-value">
              {typeof ranking === "number" ? ranking.toLocaleString() : ranking}
            </span>
            <span className="github-badge__stat-label">Ranking</span>
          </div>
        </div>
      </div>

      <div className="github-badge__footer">View Profile →</div>
    </a>
  );
}