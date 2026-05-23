import React, { useEffect, useState } from "react";

export default function GitHubBadge({ username, theme }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((r) => r.json())
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [username]);

  if (loading) {
    return (
      <div className="github-badge-wrapper">
        <div className="github-badge__loading">Loading...</div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer" className="github-badge-wrapper fade-in-up">
      <div className="github-badge__header">
        <svg height="20" viewBox="0 0 16 16" fill="currentColor" className="github-badge__logo">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
        </svg>
        <span className="github-badge__header-title">GitHub</span>
      </div>
      <div className="github-badge__body">
        <img src={profile.avatar_url} alt={profile.name || username} className="github-badge__avatar" />
        <div className="github-badge__name">{profile.name || username}</div>
        <div className="github-badge__username">@{profile.login}</div>
        {profile.bio && <div className="github-badge__bio">{profile.bio}</div>}
        {profile.company && <div className="github-badge__meta">🏢 {profile.company}</div>}
        {profile.location && <div className="github-badge__meta">📍 {profile.location}</div>}
        <div className="github-badge__stats">
          <div className="github-badge__stat">
            <span className="github-badge__stat-value">{profile.public_repos}</span>
            <span className="github-badge__stat-label">Repos</span>
          </div>
          <div className="github-badge__stat">
            <span className="github-badge__stat-value">{profile.followers}</span>
            <span className="github-badge__stat-label">Followers</span>
          </div>
          <div className="github-badge__stat">
            <span className="github-badge__stat-value">{profile.following}</span>
            <span className="github-badge__stat-label">Following</span>
          </div>
        </div>
        <div className="github-badge__achievements">
          <div className="github-badge__achievement" title="Arctic Code Vault Contributor">
            <img src="https://github.githubassets.com/images/modules/profile/achievements/arctic-code-vault-contributor-default.png" alt="Arctic Code Vault" />
          </div>
          <div className="github-badge__achievement" title="Pull Shark">
            <img src="https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png" alt="Pull Shark" />
          </div>
          <div className="github-badge__achievement" title="Quickdraw">
            <img src="https://github.githubassets.com/images/modules/profile/achievements/quickdraw-default.png" alt="Quickdraw" />
          </div>
        </div>
      </div>
      <div className="github-badge__footer">
        View Profile →
      </div>
    </a>
  );
}