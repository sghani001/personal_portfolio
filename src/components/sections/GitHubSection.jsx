import React, { useMemo } from "react";
import C from "../../theme";
import { FadeUp, Section } from "../UI";
import { useGitHubContributions } from "../../hooks/useGitHubContributions";
import { useLeetCodeStats } from "../../hooks/useLeetCodeStats";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { useThemeMode } from "../../hooks/useThemeMode";

const GITHUB_USERNAME = "sghani001";
const LEETCODE_USERNAME = "sghani001";

// Authentic GitHub palettes — the real ones GitHub itself ships for each theme.
// Kept as hex literals (not CSS vars) because the cells derive borders and glows
// by appending alpha, e.g. `${color}99`, which needs a real hex string.
const GH = {
  dark: {
    panel: "#0d1117",
    line: "#21262d",
    muted: "#8b949e",
    link: "#58a6ff",
    levels: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  },
  light: {
    panel: "#FFFFFF",
    line: "#D8D2CA",
    muted: "#57606A",
    link: "#0969DA",
    levels: ["#EBEDF0", "#ACEEBB", "#4AC26B", "#2DA44E", "#116329"],
  },
};

// LeetCode's brand colors are tuned for their dark UI and wash out on off-white,
// so light mode uses darkened equivalents that still read as the same hues.
const LC = {
  dark: { easy: "#00b8a3", medium: "#ffc01e", hard: "#ef4743" },
  light: { easy: "#00706B", medium: "#8A5A00", hard: "#C0322E" },
};

// Non-linear so high-activity days visibly pop — a level-4 day floats much higher than level-1.
const Z_BY_LEVEL = [0, 10, 22, 38, 58];

function ContributionHeatmap({ contributions, totalThisYear }) {
  const reducedMotion = usePrefersReducedMotion();
  const gh = GH[useThemeMode()];
  const LEVEL_COLORS = gh.levels;
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
      {/* Tilt wrapper — labels and grid are children of the SAME rotated block, so they move
          together as one rigid unit and stay perfectly aligned regardless of tilt angle. */}
      <div style={{ perspective: reducedMotion ? "none" : 550, paddingBottom: reducedMotion ? 0 : 30 }}>
        <div
          style={{
            display: "flex",
            transformStyle: reducedMotion ? "flat" : "preserve-3d",
            transform: reducedMotion ? "none" : "rotateX(38deg)",
            transformOrigin: "top",
          }}
        >
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
            {/* Grid — cells extrude toward the viewer with translateZ, proportional to contribution level */}
            <div style={{ display: "flex", gap: GAP, transformStyle: reducedMotion ? "flat" : "preserve-3d" }}>
              {weeks.map((week, wi) => (
                <div key={wi} style={{ display: "flex", flexDirection: "column", gap: GAP, transformStyle: reducedMotion ? "flat" : "preserve-3d" }}>
                  {week.map((day, di) => {
                    if (!day) return <div key={di} style={{ width: CELL, height: CELL }} />;
                    const level = day.level ?? 0;
                    const color = LEVEL_COLORS[level];
                    const z = reducedMotion ? 0 : Z_BY_LEVEL[level];
                    const baseTransform = `translateZ(${z}px)`;
                    return (
                      <div
                        key={di}
                        title={`${day.date}: ${day.count} contributions`}
                        style={{
                          width: CELL,
                          height: CELL,
                          borderRadius: 2,
                          background: color,
                          border: level > 0 ? `1px solid ${color}80` : `1px solid ${gh.line}`,
                          boxShadow: level > 0 && !reducedMotion ? `0 ${Math.round(z * 0.4)}px ${z + 10}px 0 ${color}99, 0 2px 6px var(--shadow-base)` : "none",
                          cursor: "default",
                          transform: baseTransform,
                          transition: "transform 0.15s",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = `${baseTransform} scale(1.4)`; e.currentTarget.style.zIndex = "10"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = baseTransform; e.currentTarget.style.zIndex = "1"; }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Legend */}
      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 10, fontSize: 10, color: C.secondary, fontFamily: "'JetBrains Mono',monospace" }}>
        <span>Less</span>
        {LEVEL_COLORS.map((c, i) => (
          <div key={i} style={{ width: 10, height: 10, borderRadius: 2, background: c, border: `1px solid ${gh.line}` }} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}

function LeetCodeStats({ stats, loading, error }) {
  const lc = LC[useThemeMode()];
  const cards = loading
    ? [
      { label: "Total Solved", value: "…", color: C.accentText },
      { label: "Easy", value: "…", color: lc.easy },
      { label: "Medium", value: "…", color: lc.medium },
      { label: "Hard", value: "…", color: lc.hard },
    ]
    : error || !stats
      ? null
      : [
        { label: "Total Solved", value: stats.totalSolved ?? "—", color: C.accentText },
        { label: "Easy", value: stats.easySolved ?? "—", color: lc.easy },
        { label: "Medium", value: stats.mediumSolved ?? "—", color: lc.medium },
        { label: "Hard", value: stats.hardSolved ?? "—", color: lc.hard },
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
          Global Rank: <span style={{ color: C.accentText, fontWeight: 700 }}>#{stats.ranking?.toLocaleString()}</span>
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
        style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 12, fontSize: 12, color: lc.medium, textDecoration: "none", fontFamily: "'JetBrains Mono',monospace" }}
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
  const gh = GH[useThemeMode()];

  const contributions = ghData?.contributions ?? [];
  const totalThisYear = ghData?.total ? Object.values(ghData.total).reduce((a, b) => a + b, 0) : null;

  return (
    <Section id="github" label="Activity" title="GitHub & LeetCode" watermark="ACTIVITY">
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

        {/* Contribution heatmap + LeetCode side by side (stacked on narrow screens) */}
        <div className="github-grid">
          {/* GitHub Heatmap */}
          <FadeUp delay={80}>
            <div
              style={{
                borderRadius: 16,
                background: gh.panel,
                border: `1px solid ${gh.line}`,
                padding: "24px 28px",
                boxShadow: "0 4px 20px var(--shadow-base)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
                <div>
                  <p style={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", textTransform: "uppercase", letterSpacing: "0.14em", color: gh.muted, margin: "0 0 4px" }}>
                    GitHub Contributions
                  </p>
                  <a
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: 13, color: gh.link, textDecoration: "none", fontFamily: "'JetBrains Mono',monospace" }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    @{GITHUB_USERNAME}
                  </a>
                </div>
              </div>
              {ghLoading && (
                <div style={{ fontSize: 12, color: gh.muted, fontFamily: "'JetBrains Mono',monospace", padding: "20px 0" }}>
                  Loading contributions…
                </div>
              )}
              {ghError && !ghLoading && (
                <div style={{ fontSize: 12, color: gh.muted, fontFamily: "'JetBrains Mono',monospace", padding: "20px 0" }}>
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
