import { useState, useEffect } from "react";

const LEETCODE_USERNAME = "sghani001";
const PROXY_URL = "https://leetcode-proxy-2.vercel.app/api/leetcode";

// This site deploys to GitHub Pages (static, no serverless functions), so this repo's own
// api/leetcode.js can never run in production — the deployed proxy above is the real primary source.
const PROFILE_QUERY = `
  query userProfile($username: String!) {
    matchedUser(username: $username) {
      username
      profile {
        ranking
      }
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
        totalSubmissionNum {
          difficulty
          count
        }
      }
    }
  }
`;

// Last-resort fallback so the UI never shows "unavailable" — accurate numbers from the real profile.
const HARDCODED_FALLBACK = {
  totalSolved: 35,
  easySolved: 18,
  mediumSolved: 12,
  hardSolved: 5,
  acceptanceRate: 74.6,
  ranking: 3174284,
};

function parseGraphQLStats(data) {
  const user = data?.data?.matchedUser;
  if (!user) return null;

  const ac = user.submitStatsGlobal?.acSubmissionNum ?? [];
  const total = user.submitStatsGlobal?.totalSubmissionNum ?? [];
  const byDifficulty = (arr, difficulty) => arr.find((d) => d.difficulty === difficulty)?.count;

  const acAll = byDifficulty(ac, "All");
  const totalAll = byDifficulty(total, "All");

  return {
    totalSolved: acAll,
    easySolved: byDifficulty(ac, "Easy"),
    mediumSolved: byDifficulty(ac, "Medium"),
    hardSolved: byDifficulty(ac, "Hard"),
    ranking: user.profile?.ranking,
    acceptanceRate: acAll != null && totalAll ? (acAll / totalAll) * 100 : undefined,
  };
}

export function useLeetCodeStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const useFallback = () => {
      if (!cancelled) {
        setStats(HARDCODED_FALLBACK);
        setLoading(false);
      }
    };

    // Primary: the user's own deployed Vercel proxy — bypasses CORS and LeetCode's anti-bot GraphQL blocking.
    fetch(PROXY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: PROFILE_QUERY, variables: { username: LEETCODE_USERNAME } }),
    })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        const parsed = parseGraphQLStats(data);
        if (!parsed || parsed.totalSolved == null) throw new Error("Unexpected shape");
        if (!cancelled) {
          setStats(parsed);
          setLoading(false);
        }
      })
      .catch(() => {
        // Fallback 1: alfa-leetcode-api (CORS-safe, free, no auth needed)
        fetch(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}`)
          .then((r) => {
            if (!r.ok) throw new Error("HTTP error");
            return r.json();
          })
          .then((data) => {
            if (cancelled) return;
            if (data && (data.totalSolved !== undefined || data.easySolved !== undefined)) {
              setStats(data);
              setLoading(false);
            } else {
              throw new Error("Unexpected shape");
            }
          })
          .catch(useFallback);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { stats, loading, error };
}
