import React, { useState, useEffect, useRef } from "react";
import "./LeetcodeStats.css";

// ── GraphQL helpers ───────────────────────────────────────────────────────────

async function lcQuery(query, variables) {
  // Calls our Vercel proxy at /api/leetcode — server-side, no CORS issues
  const res = await fetch("https://leetcode-proxy-2.vercel.app/api/leetcode", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`Proxy returned HTTP ${res.status}`);
  return res.json();
}

const STATS_QUERY = `
  query userStats($username: String!) {
    matchedUser(username: $username) {
      username
      profile {
        realName
        userAvatar
        aboutMe
        ranking
      }
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
        totalSubmissionNum {
          difficulty
          count
          submissions
        }
      }
      problemsSolvedBeatsStats {
        difficulty
        percentage
      }
    }
    allQuestionsCount {
      difficulty
      count
    }
  }
`;

const CALENDAR_QUERY = `
  query userCalendar($username: String!, $year: Int) {
    matchedUser(username: $username) {
      userCalendar(year: $year) {
        activeYears
        streak
        totalActiveDays
        submissionCalendar
      }
    }
  }
`;

// ── Component ─────────────────────────────────────────────────────────────────

const LeetcodeStats = ({ username = "syedghani" }) => {
  const [data, setData]       = useState(null);
  const [calendar, setCalendar] = useState({});
  const [calMeta, setCalMeta]   = useState({ totalActiveDays: 0, streak: 0 });
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  const chartRef         = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const currentYear = new Date().getFullYear();

    const fetchAll = async () => {
      try {
        const [statsRes, calRes] = await Promise.all([
          lcQuery(STATS_QUERY, { username }),
          lcQuery(CALENDAR_QUERY, { username, year: currentYear }),
        ]);

        // ── Stats ──────────────────────────────────────────────────────────
        const user        = statsRes.data?.matchedUser;
        const allQ        = statsRes.data?.allQuestionsCount || [];
        const acNums      = user?.submitStats?.acSubmissionNum || [];
        const totalNums   = user?.submitStats?.totalSubmissionNum || [];

        const acByDiff    = Object.fromEntries(acNums.map(d => [d.difficulty, d]));
        const totalByDiff = Object.fromEntries(totalNums.map(d => [d.difficulty, d]));
        const countByDiff = Object.fromEntries(allQ.map(d => [d.difficulty, d.count]));
        const beatsStats = statsRes.data?.matchedUser?.problemsSolvedBeatsStats || [];
        const beatsByDiff = Object.fromEntries(beatsStats.map(d => [d.difficulty, d.percentage]));

        const allAcSubs   = acByDiff["All"]?.submissions    || 0;
        const allTotSubs  = totalByDiff["All"]?.submissions || 0;
        const acceptanceRate = allTotSubs > 0
          ? ((allAcSubs / allTotSubs) * 100).toFixed(1)
          : "0.0";

        setData({
          name:             user?.profile?.realName    || username,
          avatar:           user?.profile?.userAvatar  || "",
          bio:              user?.profile?.aboutMe     || "",
          ranking:          user?.profile?.ranking     || 0,
          easySolved:       acByDiff["Easy"]?.count    || 0,
          mediumSolved:     acByDiff["Medium"]?.count  || 0,
          hardSolved:       acByDiff["Hard"]?.count    || 0,
          totalSolved:      acByDiff["All"]?.count     || 0,
          totalEasy:        countByDiff["Easy"]        || 0,
          totalMedium:      countByDiff["Medium"]      || 0,
          totalHard:        countByDiff["Hard"]        || 0,
          totalSubmissions: allTotSubs,
          acceptanceRate,
          beatsEasy: beatsByDiff["Easy"] ?? null,
          beatsMedium: beatsByDiff["Medium"] ?? null,
          beatsHard: beatsByDiff["Hard"] ?? null,
        });

        // ── Calendar ───────────────────────────────────────────────────────
        const cal = calRes.data?.matchedUser?.userCalendar;
        if (cal) {
          const parsed = typeof cal.submissionCalendar === "string"
            ? JSON.parse(cal.submissionCalendar)
            : (cal.submissionCalendar || {});
          setCalendar(parsed);
          setCalMeta({
            totalActiveDays: cal.totalActiveDays || 0,
            streak:          cal.streak          || 0,
          });
        }

        setError(null);
      } catch (err) {
        console.error("LeetCode GraphQL error:", err);
        setError("Could not load data — LeetCode API may be blocked by CORS in this environment.");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [username]);

  // ── Chart.js ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!data || !chartRef.current) return;

    const initChart = () => {
      if (chartInstanceRef.current) chartInstanceRef.current.destroy();
      chartInstanceRef.current = new window.Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: ["Easy", "Medium", "Hard"],
          datasets: [
            {
              label: "Solved",
              data: [data.easySolved, data.mediumSolved, data.hardSolved],
              backgroundColor: ["#00b8a3", "#ffc01e", "#ff375f"],
              borderRadius: 6,
              borderSkipped: false,
            },
            {
              label: "Remaining",
              data: [
                data.totalEasy   - data.easySolved,
                data.totalMedium - data.mediumSolved,
                data.totalHard   - data.hardSolved,
              ],
              backgroundColor: [
                "rgba(0,184,163,0.12)",
                "rgba(255,192,30,0.12)",
                "rgba(255,55,95,0.12)",
              ],
              borderRadius: 6,
              borderSkipped: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: ctx => ctx.datasetIndex === 0
                  ? ` Solved: ${ctx.raw}`
                  : ` Remaining: ${ctx.raw}`,
              },
            },
          },
          scales: {
            x: { stacked: true, grid: { display: false }, ticks: { color: "#888" } },
            y: { stacked: true, grid: { color: "rgba(128,128,128,0.08)" }, ticks: { color: "#888" } },
          },
        },
      });
    };

    if (window.Chart) {
      initChart();
    } else {
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js";
      s.onload = initChart;
      document.head.appendChild(s);
    }

    return () => { if (chartInstanceRef.current) chartInstanceRef.current.destroy(); };
  }, [data]);

  // ── Loading / Error states ─────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="lcs-loading glass-card">
        <div className="lcs-spinner" />
        <p>Fetching LeetCode stats...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="lcs-error glass-card">
        <p>{error || "No data available."}</p>
      </div>
    );
  }

  // ── Heatmap build ──────────────────────────────────────────────────────────
  const WEEKS      = 26;
  const DAYS_TOTAL = WEEKS * 7;
  const nowTs      = Math.floor(Date.now() / 1000);

  // LeetCode keys are already UTC midnight timestamps — use them directly
  const cells = Array.from({ length: DAYS_TOTAL }, (_, i) => {
    const offsetDays = DAYS_TOTAL - 1 - i;
    const midnight   = nowTs - offsetDays * 86400;
    const dayMidnight = midnight - (midnight % 86400);
    const count      = calendar[String(dayMidnight)] || 0;
    return { ts: dayMidnight, count, date: new Date(dayMidnight * 1000) };
  });

  const maxCount = Math.max(...cells.map(c => c.count), 1);

  const monthLabels = Array.from({ length: WEEKS }, (_, w) => {
    const cell = cells[w * 7];
    if (!cell) return null;
    const prev = w > 0 ? cells[(w - 1) * 7] : null;
    const isNew = !prev || prev.date.getMonth() !== cell.date.getMonth();
    return isNew ? cell.date.toLocaleString("default", { month: "short" }) : null;
  });

  const s       = data;
  const rankFmt = typeof s.ranking === "number" ? s.ranking.toLocaleString() : s.ranking;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="lcs-container">

      {/* Profile */}
      <div className="lcs-profile glass-card">
        <img
          src={s.avatar}
          alt={s.name}
          className="lcs-avatar"
          onError={e => { e.target.style.display = "none"; }}
        />
        <div className="lcs-profile-info">
          <div className="lcs-name">{s.name}</div>
          {s.bio && <div className="lcs-bio">{s.bio}</div>}
          <div className="lcs-rank">Rank <strong>{rankFmt}</strong></div>
        </div>
      </div>

      {/* Solved + difficulty bars */}
      <div className="lcs-main-card glass-card">
        <div className="lcs-solved-row">
          <div>
            <div className="lcs-card-label">Total solved</div>
            <div className="lcs-solved-big">{s.totalSolved}</div>
            <div className="lcs-solved-sub">
              of {s.totalEasy + s.totalMedium + s.totalHard} problems
            </div>
          </div>
          <div className="lcs-diff-summary">
            <span className="lcs-diff-tag easy">{s.easySolved} Easy</span>
            <span className="lcs-diff-tag med">{s.mediumSolved} Med.</span>
            <span className="lcs-diff-tag hard">{s.hardSolved} Hard</span>
          </div>
        </div>

        <div className="lcs-diff-bars">
          {[
            { label: "Easy", solved: s.easySolved,   total: s.totalEasy,   cls: "easy" },
            { label: "Med.", solved: s.mediumSolved,  total: s.totalMedium, cls: "med"  },
            { label: "Hard", solved: s.hardSolved,    total: s.totalHard,   cls: "hard" },
          ].map(({ label, solved, total, cls }) => (
            <div className="lcs-diff-row" key={label}>
              <span className={`lcs-diff-label ${cls}`}>{label}</span>
              <div className="lcs-bar-wrap">
                <div
                  className={`lcs-bar ${cls}`}
                  style={{ width: total > 0 ? `${Math.round((solved / total) * 100)}%` : "0%" }}
                />
              </div>
              <span className="lcs-diff-count">
                {solved}<span className="lcs-diff-total">/{total}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="lcs-stats-row">
        <div className="lcs-stat-card glass-card">
          <span className="lcs-stat-val acceptance">{s.acceptanceRate}%</span>
          <span className="lcs-stat-lbl">Acceptance</span>
        </div>
        <div className="lcs-stat-card glass-card">
          <span className="lcs-stat-val submissions">{s.totalSubmissions}</span>
          <span className="lcs-stat-lbl">Submissions</span>
        </div>
        <div className="lcs-stat-card glass-card">
          <span className="lcs-stat-val ranking">{rankFmt}</span>
          <span className="lcs-stat-lbl">Global rank</span>
        </div>
        <div className="lcs-stat-card glass-card">
          <span className="lcs-stat-val beats easy">🔥 {s.beatsEasy !== null ? s.beatsEasy.toFixed(1) : "--"}%</span>
          <span className="lcs-stat-lbl">Beats Easy</span>
        </div>
        <div className="lcs-stat-card glass-card">
          <span className="lcs-stat-val beats med">🔥 {s.beatsMedium !== null ? s.beatsMedium.toFixed(1) : "--"}%</span>
          <span className="lcs-stat-lbl">Beats Med.</span>
        </div>
        <div className="lcs-stat-card glass-card">
          <span className="lcs-stat-val beats hard">🔥 {s.beatsHard !== null ? s.beatsHard.toFixed(1) : "--"}%</span>
          <span className="lcs-stat-lbl">Beats Hard</span>
        </div>
      </div>

      {/* Heatmap */}
      <div className="lcs-heatmap-card glass-card">
        <div className="lcs-section-title">
          Submission heatmap
          <span className="lcs-section-sub">
            {calMeta.totalActiveDays} active days · {calMeta.streak} day streak
          </span>
        </div>

        <div className="lcs-month-row">
          {monthLabels.map((m, i) => (
            <div key={i} className="lcs-month-cell">
              {m && <span className="lcs-month-label">{m}</span>}
            </div>
          ))}
        </div>

        <div className="lcs-heatmap-grid">
          {cells.map((cell, i) => {
            const alpha = cell.count === 0
              ? 0
              : Math.min(0.25 + (cell.count / maxCount) * 0.75, 1);
            const bg = cell.count === 0
              ? "rgba(255,255,255,0.05)"
              : `rgba(255,161,22,${alpha.toFixed(2)})`;
            return (
              <div
                key={i}
                className="lcs-heatmap-cell"
                style={{ background: bg }}
                title={`${cell.count} submission${cell.count !== 1 ? "s" : ""} — ${cell.date.toLocaleDateString()}`}
              />
            );
          })}
        </div>

        <div className="lcs-heatmap-legend">
          <span>less</span>
          {[0, 0.25, 0.5, 0.75, 1].map((a, i) => (
            <div
              key={i}
              className="lcs-legend-cell"
              style={{
                background: a === 0
                  ? "rgba(255,255,255,0.05)"
                  : `rgba(255,161,22,${(0.25 + a * 0.75).toFixed(2)})`,
              }}
            />
          ))}
          <span>more</span>
        </div>
      </div>

      {/* Difficulty chart */}
      <div className="lcs-chart-card glass-card">
        <div className="lcs-section-title">Solved vs remaining by difficulty</div>
        <div className="lcs-chart-legend">
          {[
            { color: "#00b8a3", label: `Easy (${s.easySolved})` },
            { color: "#ffc01e", label: `Med. (${s.mediumSolved})` },
            { color: "#ff375f", label: `Hard (${s.hardSolved})` },
          ].map(({ color, label }) => (
            <span key={label} className="lcs-legend-item">
              <span className="lcs-legend-dot" style={{ background: color }} />
              {label}
            </span>
          ))}
        </div>
        <div className="lcs-chart-wrap">
          <canvas
            ref={chartRef}
            role="img"
            aria-label={`Solved: Easy ${s.easySolved}, Medium ${s.mediumSolved}, Hard ${s.hardSolved}`}
          >
            Easy {s.easySolved}, Medium {s.mediumSolved}, Hard {s.hardSolved}
          </canvas>
        </div>
      </div>

    </div>
  );
};

export default LeetcodeStats;