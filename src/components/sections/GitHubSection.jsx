import React, { useMemo } from "react";
import C from "../../theme";
import { FadeUp, Section } from "../UI";
import { useGitHubContributions } from "../../hooks/useGitHubContributions";
import { useLeetCodeStats } from "../../hooks/useLeetCodeStats";

const GITHUB_USERNAME = "sghani001";
const LEETCODE_USERNAME = "sghani001";

// GitHub contribution level → color (authentic GitHub palette, dark-mode tuned)
const LEVEL_COLORS = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];

function ContributionHeatmap({ contributions, totalThisYear }) {
  const weeks = useMemo(() => {
    if (!contributions || contributions.length === 0) return [];
    // Group days into weeks (columns of 7)
    const out = [];
    let week = [];
    contributions.forEach((day, i) => {
      week.push(day);
      if (week.length === 7) {
        out.push(week);
        week = [];
      }
    });
    if (week.length > 0) {
      // pad last week
      while (week.length < 7) week.push(null);
      out.push(week);
    }
    return out;
  }, [contributions]);

  // Month labels: find first day of each month
  const monthLabels = useMemo(() => {
    if (!contributions || contributions.length === 0) return [];
    const labels = [];
    const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let lastMonth = null;
    let weekIdx = 0;
    let dayInWeek = 0;
    contributions.forEach((day) => {
      const m = new Date(day.date).getMonth();
      if (m !== lastMonth) {
        labels.push({ month: MONTHS[m], weekIdx });
        lastMonth = m;
      }
      dayInWeek++;
      if (dayInWeek === 7) { weekIdx++; dayInWeek = 0; }
    });
    return labels;
  }, [contributions]);

  const CELL = 12;
  const GAP = 3;
  const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];
  const totalWidth = weeks.length * (CELL + GAP);

  return (
    <div style={{ overflowX: "auto", paddingBottom: 8 }}>
      <div style={{ display: "flex", gap: 8, fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: C.secondary, marginBottom: 4 }}>
        <span style={{ color: C.sage, fontWeight: 700 }}>{totalThisYear?.toLocaleString()}</span>
        <span>contributions in the last year</span>
      </div>
      <div style={{ display: "flex" }}>
        {/* Day-of-week labels */}
        <div style={{ display: "flex", flexDirection: "column", gap: GAP, marginRight: 6, paddingTop: 18 }}>
          {DAY_LABELS.map((label, i) => (
            <div key={i} style={{ height: CELL, fontSize: 9, color: C.secondary, fontFamily: "'JetBrains Mono',monospace", lineHeight: `${CELL}px`, textAlign: "right", whiteSpace: "nowrap" }}>
              {label}
            </div>
          ))}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Month labels */}
          <div style={{ display: "flex", marginBottom: 4, minWidth: totalWidth }}>
            {monthLabels.map((ml, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  left: ml.weekIdx * (CELL + GAP),
                  fontSize: 9,
                  color: C.secondary,
                  fontFamily: "'JetBrains Mono',monospace",
                  whiteSpace: "nowrap",
                  marginRight: i < monthLabels.length - 1 ? (monthLabels[i + 1].weekIdx - ml.weekIdx) * (CELL + GAP) - 20 : 0,
                }}
              >
                {ml.month}
              </div>
            ))}
          </div>
          {/* Grid */}
          <div style={{ display: "flex", gap: GAP }}>
            {weeks.map((week, wi) => (
              <div key={wi} style={{ display: "flex", flexDirection: "column", gap: GAP }}>
                {week.map((day, di) => {
                  if (!day) return <div key={di} style={{ width: CELL, height: CELL }} />;
                  const color = LEVEL_COLORS[day.level ?? 0];
                  return (
                    <div
                      key={di}
                      title={`${day.date}: ${day.count} contributions`}
                      style={{
                        width: CELL,
                        height: CELL,
                        borderRadius: 2,
                        background: color,
                        border: day.level > 0 ? `1px solid ${color}80` : "1px solid #21262d",
                        cursor: "default",
                        transition: "transform 0.1s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.4)"; e.currentTarget.style.zIndex = "10"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.zIndex = "1"; }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Legend */}
      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 10, fontSize: 10, color: C.secondary, fontFamily: "'JetBrains Mono',monospace" }}>
        <span>Less</span>
        {LEVEL_COLORS.map((c, i) => (
          <div key={i} style={{ width: 10, height: 10, borderRadius: 2, background: c, border: "1px solid #21262d" }} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}

function LeetCodeStats({ stats, loading, error }) {
  const cards = loading
    ? [
      { label: "Total Solved", value: "…", color: C.copper },
      { label: "Easy", value: "…", color: "#00b8a3" },
      { label: "Medium", value: "…", color: "#ffc01e" },
      { label: "Hard", value: "…", color: "#ef4743" },
    ]
    : error || !stats
      ? null
      : [
        { label: "Total Solved", value: stats.totalSolved ?? "—", color: C.copper },
        { label: "Easy", value: stats.easySolved ?? "—", color: "#00b8a3" },
        { label: "Medium", value: stats.mediumSolved ?? "—", color: "#ffc01e" },
        { label: "Hard", value: stats.hardSolved ?? "—", color: "#ef4743" },
      ];

  if (!loading && (error || !stats)) {
    return (
      <div style={{ fontSize: 12, color: C.secondary, fontFamily: "'JetBrains Mono',monospace", padding: "16px 0" }}>
        LeetCode stats unavailable (API unreachable)
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
        {cards?.map((card, i) => (
          <div
            key={i}
            style={{
              flex: "1 1 80px",
              padding: "14px 16px",
              borderRadius: 12,
              background: `${card.color}12`,
              border: `1px solid ${card.color}30`,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: card.color, marginBottom: 4 }}>
              {card.value}
            </div>
            <div style={{ fontSize: 10, color: C.secondary, textTransform: "uppercase", letterSpacing: "0.1em" }}>{card.label}</div>
          </div>
        ))}
      </div>
      {stats?.ranking && (
        <div style={{ fontSize: 12, color: C.secondary, fontFamily: "'JetBrains Mono',monospace" }}>
          Global Rank: <span style={{ color: C.copper, fontWeight: 700 }}>#{stats.ranking?.toLocaleString()}</span>
          {stats.acceptanceRate != null && (
            <span style={{ marginLeft: 16 }}>
              Acceptance: <span style={{ color: C.sage }}>{typeof stats.acceptanceRate === "number" ? `${stats.acceptanceRate.toFixed(1)}%` : stats.acceptanceRate}</span>
            </span>
          )}
        </div>
      )}
      <a
        href={`https://leetcode.com/${LEETCODE_USERNAME}`}
        target="_blank"
        rel="noreferrer"
        style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 12, fontSize: 12, color: "#ffc01e", textDecoration: "none", fontFamily: "'JetBrains Mono',monospace" }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        leetcode.com/{LEETCODE_USERNAME} →
      </a>
    </div>
  );
}

export function GitHubSection() {
  const { data: ghData, loading: ghLoading, error: ghError } = useGitHubContributions();
  const { stats: lcStats, loading: lcLoading, error: lcError } = useLeetCodeStats();

  const contributions = ghData?.contributions ?? [];
  const totalThisYear = ghData?.total ? Object.values(ghData.total).reduce((a, b) => a + b, 0) : null;

  return (
    <Section id="github" label="Activity" title="GitHub & LeetCode">
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

        {/* Snake Animation */}
        <FadeUp>
          <div
            style={{
              borderRadius: 16,
              overflow: "hidden",
              background: "#0d1117",
              border: "1px solid #21262d",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            {/* Terminal bar */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderBottom: "1px solid #21262d", background: "#161b22" }}>
              <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
              <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
              <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
              <span style={{ fontSize: 11, color: "#8b949e", fontFamily: "'JetBrains Mono',monospace", marginLeft: 8 }}>
                github.com/{GITHUB_USERNAME} — contribution snake
              </span>
            </div>
            <div style={{ padding: "20px 16px", overflowX: "auto" }}>
              <img
                src={`https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_USERNAME}/output/github-contribution-grid-snake-dark.svg`}
                alt="GitHub contribution snake animation"
                style={{ width: "100%", minWidth: 600, display: "block" }}
                onError={(e) => {
                  // Fallback: try the light version or hide
                  e.target.src = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_USERNAME}/output/github-contribution-grid-snake.svg`;
                  e.target.onerror = () => {
                    e.target.parentElement.innerHTML = `<div style="padding:20px;text-align:center;color:#8b949e;font-family:'JetBrains Mono',monospace;font-size:12px">Snake animation requires a GitHub Action in your profile repo (${GITHUB_USERNAME}/${GITHUB_USERNAME}) — see github.com/Platane/snk</div>`;
                  };
                }}
              />
            </div>
          </div>
        </FadeUp>

        {/* Contribution heatmap + LeetCode side by side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 20, alignItems: "start" }}>
          {/* GitHub Heatmap */}
          <FadeUp delay={80}>
            <div
              style={{
                borderRadius: 16,
                background: "#0d1117",
                border: "1px solid #21262d",
                padding: "24px 28px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
                <div>
                  <p style={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", textTransform: "uppercase", letterSpacing: "0.14em", color: "#8b949e", margin: "0 0 4px" }}>
                    GitHub Contributions
                  </p>
                  <a
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: 13, color: "#58a6ff", textDecoration: "none", fontFamily: "'JetBrains Mono',monospace" }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    @{GITHUB_USERNAME}
                  </a>
                </div>
              </div>
              {ghLoading && (
                <div style={{ fontSize: 12, color: "#8b949e", fontFamily: "'JetBrains Mono',monospace", padding: "20px 0" }}>
                  Loading contributions…
                </div>
              )}
              {ghError && !ghLoading && (
                <div style={{ fontSize: 12, color: "#8b949e", fontFamily: "'JetBrains Mono',monospace", padding: "20px 0" }}>
                  GitHub API unavailable — contributions not shown.
                </div>
              )}
              {!ghLoading && !ghError && contributions.length > 0 && (
                <ContributionHeatmap contributions={contributions} totalThisYear={totalThisYear} />
              )}
            </div>
          </FadeUp>

          {/* LeetCode Stats */}
          <FadeUp delay={140}>
            <div
              style={{
                borderRadius: 16,
                background: C.surface,
                border: `1px solid ${C.border}`,
                padding: "24px 28px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.28)",
                minWidth: 260,
              }}
            >
              <p style={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", textTransform: "uppercase", letterSpacing: "0.14em", color: C.secondary, margin: "0 0 16px" }}>
                LeetCode Stats
              </p>
              <LeetCodeStats stats={lcStats} loading={lcLoading} error={lcError} />
            </div>
          </FadeUp>
        </div>
      </div>
    </Section>
  );
}
