import React, { useState, useEffect, useRef, useMemo } from "react";
import resumeData from "../utils/resumeData";
import "./LeetcodeStats.css";

// ── GraphQL helpers ───────────────────────────────────────────────────────────

async function lcQuery(query, variables) {
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
      tagProblemCounts {
        advanced { tagName problemsSolved }
        intermediate { tagName problemsSolved }
        fundamental { tagName problemsSolved }
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

const TOPICS_QUERY = `
  query getAllTagTotals {
    arrayTotal: questionList(categorySlug: "", filters: {tags: ["array"]}, limit: 1) { totalNum }
    stringTotal: questionList(categorySlug: "", filters: {tags: ["string"]}, limit: 1) { totalNum }
    twopointersTotal: questionList(categorySlug: "", filters: {tags: ["two-pointers"]}, limit: 1) { totalNum }
    sortingTotal: questionList(categorySlug: "", filters: {tags: ["sorting"]}, limit: 1) { totalNum }
    linkedlistTotal: questionList(categorySlug: "", filters: {tags: ["linked-list"]}, limit: 1) { totalNum }
    matrixTotal: questionList(categorySlug: "", filters: {tags: ["matrix"]}, limit: 1) { totalNum }
    stackTotal: questionList(categorySlug: "", filters: {tags: ["stack"]}, limit: 1) { totalNum }
    simulationTotal: questionList(categorySlug: "", filters: {tags: ["simulation"]}, limit: 1) { totalNum }
    hashtableTotal: questionList(categorySlug: "", filters: {tags: ["hash-table"]}, limit: 1) { totalNum }
    mathTotal: questionList(categorySlug: "", filters: {tags: ["math"]}, limit: 1) { totalNum }
    recursionTotal: questionList(categorySlug: "", filters: {tags: ["recursion"]}, limit: 1) { totalNum }
    slidingwindowTotal: questionList(categorySlug: "", filters: {tags: ["sliding-window"]}, limit: 1) { totalNum }
    binarysearchTotal: questionList(categorySlug: "", filters: {tags: ["binary-search"]}, limit: 1) { totalNum }
    bitmanipulationTotal: questionList(categorySlug: "", filters: {tags: ["bit-manipulation"]}, limit: 1) { totalNum }
    greedyTotal: questionList(categorySlug: "", filters: {tags: ["greedy"]}, limit: 1) { totalNum }
    databaseTotal: questionList(categorySlug: "", filters: {tags: ["database"]}, limit: 1) { totalNum }
    dpTotal: questionList(categorySlug: "", filters: {tags: ["dynamic-programming"]}, limit: 1) { totalNum }
    divideandconquerTotal: questionList(categorySlug: "", filters: {tags: ["divide-and-conquer"]}, limit: 1) { totalNum }
    backtrackingTotal: questionList(categorySlug: "", filters: {tags: ["backtracking"]}, limit: 1) { totalNum }
    trieTotal: questionList(categorySlug: "", filters: {tags: ["trie"]}, limit: 1) { totalNum }
  }
`;

// ── Bubble helpers ────────────────────────────────────────────────────────────

const BUBBLE_COLORS = [
  '#a78bfa','#3b82f6','#ef4743','#ffc01e','#22c55e','#00b8a3',
  '#f97316','#ec4899','#14b8a6','#f59e0b','#14b8a6','#10b981',
  '#8b5cf6','#06b6d4','#f43f5e','#84cc16','#e879f9','#38bdf8',
  '#fb923c','#a3e635',
];

/**
 * Compute bubble diameter so the longest word in the tag name always fits.
 * Each character is ~8px wide at the label font-size; we add generous padding.
 * Minimum is 82px so even "Trie" has breathing room.
 */
function getBubbleSize(name) {
  const words = name.split(/\s+/);
  const longestWordChars = Math.max(...words.map(w => w.length));
  const hasMultipleWords = words.length > 1;
  // width = chars * ~8.5px + horizontal padding (24px)
  const widthNeeded = longestWordChars * 8.5 + 24;
  // if two-line label, add extra vertical room
  const extraForLines = hasMultipleWords ? 18 : 0;
  return Math.max(Math.ceil(widthNeeded) + extraForLines, 82);
}

// ── BubbleField ───────────────────────────────────────────────────────────────

const BubbleField = ({ topics }) => {
  const containerRef = useRef(null);
  const bubbleRefs   = useRef([]);

  const W = 620, H = 480;

  const sorted = useMemo(() => [...topics].sort((a, b) => b.problemsSolved - a.problemsSolved), [topics]);

  const positions = useMemo(() => {
    const result = [];
    const cx = W / 2, cy = H / 2;
    sorted.forEach((topic, idx) => {
      const r = getBubbleSize(topic.name) / 2;
      const gap = 5;
      if (idx === 0) {
        result.push({ x: cx, y: cy, r });
        return;
      }
      let bx = r + 10, by = r + 10;
      const step = 0.5;
      let placed = false;
      for (let dist = r + gap; dist < Math.max(W, H) * 1.5; dist += step) {
        const circumference = 2 * Math.PI * dist;
        const angleStep = step / Math.max(dist, 1);
        const steps = Math.max(8, Math.ceil(circumference / step));
        for (let s = 0; s < steps; s++) {
          const angle = s * angleStep + idx * 1.5;
          const px = cx + dist * Math.cos(angle);
          const py = cy + dist * Math.sin(angle);
          if (px - r - gap < 0 || px + r + gap > W || py - r - gap < 0 || py + r + gap > H) continue;
          const ok = result.every(p => {
            const dx = p.x - px, dy = p.y - py;
            return Math.sqrt(dx * dx + dy * dy) >= p.r + r + gap;
          });
          if (ok) { bx = px; by = py; placed = true; break; }
        }
        if (placed) break;
      }
      result.push({ x: bx, y: by, r });
    });
    return result;
  }, [sorted]);

  // Magnetic pull effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const STRENGTH = 0.28;
    const PULL_RADIUS = 170;

    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      bubbleRefs.current.forEach((el, i) => {
        if (!el) return;
        const pos = positions[i];
        if (!pos) return;
        const { x, y, r } = pos;
        const dx = mx - x;
        const dy = my - y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < PULL_RADIUS && dist > 0) {
          const pull = (1 - dist / PULL_RADIUS) * STRENGTH * r;
          const tx = (dx / dist) * pull;
          const ty = (dy / dist) * pull;
          el.style.transition = 'transform 0.12s ease-out';
          el.style.transform  = `translate(${tx}px, ${ty}px)`;
        } else {
          el.style.transition = 'transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)';
          el.style.transform  = '';
        }
      });
    };

    const onLeave = () => {
      bubbleRefs.current.forEach(el => {
        if (!el) return;
        el.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        el.style.transform  = '';
      });
    };

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);
    return () => {
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
    };
  }, [topics, positions]);

  return (
    <div
      ref={containerRef}
      className="leetcode-bubble-container"
      style={{ position: 'relative', width: '100%', height: H }}
    >
      {sorted.map((topic, i) => {
        const pos = positions[i] || { x: 50, y: 50, r: 41 };
        const { x, y, r } = pos;
        const size = r * 2;
        const fillPct = topic.total > 0
          ? parseFloat(((topic.problemsSolved / topic.total) * 100).toFixed(2))
          : 1;
        const color = BUBBLE_COLORS[i % BUBBLE_COLORS.length];
        // Font size scales with bubble, capped for readability
        const fontSize = size < 90 ? '0.7rem' : size < 110 ? '0.8rem' : '0.9rem';

        return (
          <div
            key={topic.name}
            ref={el => { bubbleRefs.current[i] = el; }}
            className="leetcode-bubble"
            style={{
              position: 'absolute',
              left: `calc(50% - ${W / 2}px + ${x - r}px)`,
              top: y - r,
              width: size,
              height: size,
              '--i': i,
              '--color': color,
              '--fill': `${fillPct}%`,
              willChange: 'transform',
            }}
          >
            <div className="bubble-liquid" />
            <span className="bubble-label" style={{ fontSize }}>
              {topic.name}
            </span>
            <div className="bubble-tooltip">
              <strong>{topic.name}</strong>
              <span>
                {topic.problemsSolved}
                {topic.total > 0 ? ` / ${topic.total}` : ''} solved
              </span>
            </div>
            <div className="bubble-glow" />
          </div>
        );
      })}
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────

const LeetcodeStats = ({ username = "syedghani" }) => {
  const [data, setData]         = useState({
    name: "Syed Ghani",
    avatar: resumeData.cachedStats.github.avatar_url,
    bio: "Software Engineer",
    ranking: resumeData.cachedStats.leetcode.ranking,
    easySolved: resumeData.cachedStats.leetcode.easySolved,
    mediumSolved: resumeData.cachedStats.leetcode.mediumSolved,
    hardSolved: resumeData.cachedStats.leetcode.hardSolved,
    totalSolved: resumeData.cachedStats.leetcode.solvedProblem,
    totalEasy: resumeData.cachedStats.leetcode.totalEasy,
    totalMedium: resumeData.cachedStats.leetcode.totalMedium,
    totalHard: resumeData.cachedStats.leetcode.totalHard,
    totalSubmissions: 350,
    acceptanceRate: resumeData.cachedStats.leetcode.acceptanceRate,
    beatsEasy: 48.5,
    beatsMedium: 50.2,
    beatsHard: 55.4,
  });
  const [calendar, setCalendar] = useState({});
  const [calMeta, setCalMeta]   = useState({ totalActiveDays: 124, streak: 5 });
  const [topics, setTopics]     = useState([
    { name: "Array", solved: 18, problemsSolved: 18, total: 30 },
    { name: "String", solved: 14, problemsSolved: 14, total: 25 },
    { name: "Two Pointers", solved: 6, problemsSolved: 6, total: 10 },
    { name: "Dynamic Programming", solved: 4, problemsSolved: 4, total: 15 },
    { name: "Hash Table", solved: 9, problemsSolved: 9, total: 20 },
    { name: "Sorting", solved: 8, problemsSolved: 8, total: 15 },
  ]);
  const [error, setError]       = useState(null);

  const chartRef         = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const currentYear = new Date().getFullYear();

    const fetchAll = async () => {
      try {
        const [statsRes, calRes, topicsRes] = await Promise.all([
          lcQuery(STATS_QUERY, { username }),
          lcQuery(CALENDAR_QUERY, { username, year: currentYear }),
          lcQuery(TOPICS_QUERY, {}),
        ]);

        // ── Stats ──────────────────────────────────────────────────────────
        const user        = statsRes.data?.matchedUser;
        if (user) {
          const allQ        = statsRes.data?.allQuestionsCount || [];
          const acNums      = user?.submitStats?.acSubmissionNum || [];
          const totalNums   = user?.submitStats?.totalSubmissionNum || [];

          const acByDiff    = Object.fromEntries(acNums.map(d => [d.difficulty, d]));
          const totalByDiff = Object.fromEntries(totalNums.map(d => [d.difficulty, d]));
          const countByDiff = Object.fromEntries(allQ.map(d => [d.difficulty, d.count]));
          const beatsStats  = user?.problemsSolvedBeatsStats || [];
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
            beatsEasy:        beatsByDiff["Easy"]   ?? null,
            beatsMedium:      beatsByDiff["Medium"] ?? null,
            beatsHard:        beatsByDiff["Hard"]   ?? null,
          });
        }

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

        // ── Topics ─────────────────────────────────────────────────────────
        const tagSlugMap = {
          'Array': 'arrayTotal', 'String': 'stringTotal', 'Two Pointers': 'twopointersTotal',
          'Sorting': 'sortingTotal', 'Linked List': 'linkedlistTotal', 'Matrix': 'matrixTotal',
          'Stack': 'stackTotal', 'Simulation': 'simulationTotal', 'Hash Table': 'hashtableTotal',
          'Math': 'mathTotal', 'Recursion': 'recursionTotal', 'Sliding Window': 'slidingwindowTotal',
          'Binary Search': 'binarysearchTotal', 'Bit Manipulation': 'bitmanipulationTotal',
          'Greedy': 'greedyTotal', 'Database': 'databaseTotal', 'Dynamic Programming': 'dpTotal',
          'Divide and Conquer': 'divideandconquerTotal', 'Backtracking': 'backtrackingTotal',
          'Trie': 'trieTotal',
        };
        const totalsData = topicsRes?.data || {};
        const allTags = [
          ...(user?.tagProblemCounts?.advanced     || []),
          ...(user?.tagProblemCounts?.intermediate || []),
          ...(user?.tagProblemCounts?.fundamental  || []),
        ];
        if (allTags.length > 0) {
          const builtTopics = allTags
            .sort((a, b) => b.problemsSolved - a.problemsSolved)
            .map(t => {
              const alias = tagSlugMap[t.tagName];
              const total = alias ? (totalsData[alias]?.totalNum || 0) : 0;
              return { name: t.tagName, solved: t.problemsSolved, problemsSolved: t.problemsSolved, total };
            });
          setTopics(builtTopics);
        }

        setError(null);
      } catch (err) {
        console.warn("LeetCode GraphQL error:", err);
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
              backgroundColor: ["#10b981", "#ffc01e", "#ef4444"],
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
                "rgba(16,185,129,0.12)",
                "rgba(255,192,30,0.12)",
                "rgba(239,68,68,0.12)",
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

  // ── Loading / Error ────────────────────────────────────────────────────────
  if (error || !data) {
    return (
      <div className="lcs-error glass-card">
        <p>{error || "No data available."}</p>
      </div>
    );
  }

  // ── Heatmap ────────────────────────────────────────────────────────────────
  const WEEKS      = 26;
  const DAYS_TOTAL = WEEKS * 7;
  const nowTs      = Math.floor(Date.now() / 1000);

  const cells = Array.from({ length: DAYS_TOTAL }, (_, i) => {
    const offsetDays  = DAYS_TOTAL - 1 - i;
    const midnight    = nowTs - offsetDays * 86400;
    const dayMidnight = midnight - (midnight % 86400);
    const count       = calendar[String(dayMidnight)] || 0;
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
            { label: "Easy", solved: s.easySolved,  total: s.totalEasy,   cls: "easy" },
            { label: "Med.", solved: s.mediumSolved, total: s.totalMedium, cls: "med"  },
            { label: "Hard", solved: s.hardSolved,   total: s.totalHard,   cls: "hard" },
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
          <span className="lcs-stat-val beats easy">
            🔥 {s.beatsEasy !== null ? s.beatsEasy.toFixed(1) : "--"}%
          </span>
          <span className="lcs-stat-lbl">Beats Easy</span>
        </div>
        <div className="lcs-stat-card glass-card">
          <span className="lcs-stat-val beats med">
            🔥 {s.beatsMedium !== null ? s.beatsMedium.toFixed(1) : "--"}%
          </span>
          <span className="lcs-stat-lbl">Beats Med.</span>
        </div>
        <div className="lcs-stat-card glass-card">
          <span className="lcs-stat-val beats hard">
            🔥 {s.beatsHard !== null ? s.beatsHard.toFixed(1) : "--"}%
          </span>
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

      {/* Solved Topics — BubbleField */}
      {topics && topics.length > 0 && (
        <div className="lcs-chart-card glass-card">
          <div className="lcs-section-title">
            Solved Topics
            <span className="lcs-section-sub">Dominant skills &amp; focus areas</span>
          </div>
          <BubbleField topics={topics} />
        </div>
      )}

    </div>
  );
};

export default LeetcodeStats;