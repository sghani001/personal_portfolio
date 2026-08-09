import React, { useEffect, useState } from "react";
import C from "../theme";

const LEETCODE_USERNAME = "sghani001";

// Hardcoded accurate fallback from actual LeetCode profile
const FALLBACK_STATS = {
  totalSolved: 35,
  easySolved: 18,
  mediumSolved: 12,
  hardSolved: 5,
  totalEasy: 946,
  totalMedium: 2061,
  totalHard: 936,
  acceptanceRate: "74.6",
  beatsPercentage: "50.2",
  ranking: 3174284,
};

const LeetCodeIcon = () => (
  <svg viewBox="0 0 50 50" fill="currentColor" height="18" width="18" style={{ display: "inline-block" }}>
    <path d="M36.2 37.3c-.6.6-1.5.6-2.1 0l-5.4-5.4c-.6-.6-.6-1.5 0-2.1l5.4-5.4c.6-.6 1.5-.6 2.1 0 .6.6.6 1.5 0 2.1L32 31l4.2 4.2c.6.6.6 1.5 0 2.1zM25 43c-3.9 0-7.5-1.5-10.2-4.2C12 36 10.5 32.4 10.5 28.5s1.5-7.5 4.3-10.3L24.3 8.7c.6-.6 1.5-.6 2.1 0l9.5 9.5c.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0L25 11.5l-8.1 8.1C14.7 21.7 13.5 25 13.5 28.5s1.2 6.8 3.4 9.2c2.3 2.3 5.3 3.3 8.1 3.3 3 0 5.9-1.1 8.1-3.3.6-.6 1.5-.6 2.1 0 .6.6.6 1.5 0 2.1C32.5 41.5 28.9 43 25 43z" />
  </svg>
);

function DifficultyBar({ label, solved, total, color }) {
  const pct = total > 0 ? Math.round((solved / total) * 100) : 0;
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: C.secondary, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</span>
        <span style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color }}>
          {solved}<span style={{ color: C.secondary, fontWeight: 400 }}>/{total}</span>
        </span>
      </div>
      <div style={{ height: 4, borderRadius: 2, background: `${C.border}`, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, borderRadius: 2, background: color, transition: "width 0.8s ease" }} />
      </div>
    </div>
  );
}

export default function LeetCodeBadge() {
  const [stats, setStats] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // Try two public APIs in parallel, use whichever responds
        const [res1, res2] = await Promise.all([
          fetch(`https://leetcode-api-faisalshohag.vercel.app/${LEETCODE_USERNAME}`).then(r => r.ok ? r.json() : null).catch(() => null),
          fetch(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}`).then(r => r.ok ? r.json() : null).catch(() => null),
        ]);

        const combined = res1 || res2 || {};
        const profileData = res2 || res1 || {};

        // Compute real acceptance rate if submission data exists
        const totalSubs  = combined.totalSubmissions?.[0]?.submissions ?? 0;
        const acceptedSubs = combined.acSubmissions?.[0]?.submissions ?? 0;
        const acceptanceRate =
          totalSubs > 0
            ? ((acceptedSubs / totalSubs) * 100).toFixed(1)
            : combined.acceptanceRate ?? FALLBACK_STATS.acceptanceRate;

        const resolved = {
          totalSolved: combined.totalSolved ?? FALLBACK_STATS.totalSolved,
          easySolved: combined.easySolved ?? FALLBACK_STATS.easySolved,
          mediumSolved: combined.mediumSolved ?? FALLBACK_STATS.mediumSolved,
          hardSolved: combined.hardSolved ?? FALLBACK_STATS.hardSolved,
          totalEasy: combined.totalEasy ?? FALLBACK_STATS.totalEasy,
          totalMedium: combined.totalMedium ?? FALLBACK_STATS.totalMedium,
          totalHard: combined.totalHard ?? FALLBACK_STATS.totalHard,
          acceptanceRate,
          beatsPercentage: combined.beatsPercentage ?? profileData.beatsPercentage ?? FALLBACK_STATS.beatsPercentage,
          ranking: profileData.ranking ?? combined.ranking ?? FALLBACK_STATS.ranking,
        };

        setStats(resolved);
        setProfile({
          avatar: profileData.avatar ?? null,
          name: profileData.name ?? LEETCODE_USERNAME,
          aboutMe: profileData.aboutMe ?? "Full-Stack Engineer | Ruby on Rails & React.js",
        });
      } catch {
        setStats(FALLBACK_STATS);
        setProfile({ avatar: null, name: LEETCODE_USERNAME, aboutMe: "Full-Stack Engineer | Ruby on Rails & React.js" });
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    borderRadius: 16,
    background: C.surface,
    border: `1px solid ${C.border}`,
    overflow: "hidden",
    boxShadow: "0 8px 32px rgba(0,0,0,0.28)",
    transition: "transform 0.25s, box-shadow 0.25s",
    textDecoration: "none",
    color: "inherit",
    cursor: "pointer",
  };

  const lcOrange = "#ffa116";

  const s = loading ? FALLBACK_STATS : (stats ?? FALLBACK_STATS);
  const p = profile ?? { avatar: null, name: LEETCODE_USERNAME, aboutMe: "" };

  return (
    <a
      href={`https://leetcode.com/${LEETCODE_USERNAME}`}
      target="_blank"
      rel="noreferrer"
      style={cardStyle}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.4)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.28)"; }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: `1px solid ${C.border}`, background: `${C.bg}80` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: lcOrange }}>
          <LeetCodeIcon />
          <span style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", textTransform: "uppercase", letterSpacing: "0.12em", color: C.secondary }}>LeetCode</span>
        </div>
        <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: C.secondary }}>
          {loading ? "loading…" : "live stats"}
        </span>
      </div>

      {/* Body */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 20px 16px", gap: 6, flex: 1 }}>
        {/* Avatar */}
        <div style={{ width: 64, height: 64, borderRadius: "50%", overflow: "hidden", border: `2px solid ${lcOrange}40`, marginBottom: 4, boxShadow: `0 4px 16px ${lcOrange}20` }}>
          <img
            src={p.avatar ?? `https://avatars.githubusercontent.com/${LEETCODE_USERNAME}`}
            alt={p.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => { e.target.src = `https://avatars.githubusercontent.com/${LEETCODE_USERNAME}`; }}
          />
        </div>

        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: C.primary, fontSize: 14, textAlign: "center" }}>
          {p.name}
        </div>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", color: C.secondary, fontSize: 11 }}>@{LEETCODE_USERNAME}</div>
        {p.aboutMe && (
          <p style={{ fontSize: 11, color: C.secondary, lineHeight: 1.5, textAlign: "center", margin: "4px 0 0", maxWidth: 210 }}>
            {p.aboutMe}
          </p>
        )}
        <div style={{ fontSize: 11, color: C.secondary, fontFamily: "'JetBrains Mono',monospace" }}>📍 Pakistan</div>

        {/* Beats pill */}
        <div style={{ marginTop: 8, padding: "4px 14px", borderRadius: 100, background: `${lcOrange}15`, border: `1px solid ${lcOrange}40`, fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: lcOrange, fontWeight: 700 }}>
          🔥 Beats {s.beatsPercentage}%
        </div>

        {/* Difficulty bars */}
        <div style={{ width: "100%", marginTop: 14 }}>
          <DifficultyBar label="Easy"   solved={s.easySolved}   total={s.totalEasy}   color="#00b8a3" />
          <DifficultyBar label="Medium" solved={s.mediumSolved} total={s.totalMedium} color="#ffc01e" />
          <DifficultyBar label="Hard"   solved={s.hardSolved}   total={s.totalHard}   color="#ef4743" />
        </div>

        {/* Acceptance + Rank */}
        <div style={{ display: "flex", gap: 10, width: "100%", marginTop: 4 }}>
          {[
            { label: "Acceptance", value: `${s.acceptanceRate}%` },
            { label: "Ranking", value: `#${typeof s.ranking === "number" ? s.ranking.toLocaleString() : s.ranking}` },
          ].map((stat, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center", padding: "8px 6px", borderRadius: 10, background: `${lcOrange}10`, border: `1px solid ${lcOrange}20` }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 12, color: lcOrange }}>{stat.value}</div>
              <div style={{ fontSize: 9, color: C.secondary, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 2 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 20px", borderTop: `1px solid ${C.border}`, textAlign: "center", fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: lcOrange, background: `${C.bg}80` }}>
        View Profile →
      </div>
    </a>
  );
}
