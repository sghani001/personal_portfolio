import { useState, useEffect } from "react";

const LEETCODE_USERNAME = "sghani001";

export function useLeetCodeStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Primary: alfa-leetcode-api (CORS-safe, free, no auth needed)
    fetch(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}`)
      .then((r) => {
        if (!r.ok) throw new Error("HTTP error");
        return r.json();
      })
      .then((data) => {
        if (data && (data.totalSolved !== undefined || data.easySolved !== undefined)) {
          setStats(data);
          setLoading(false);
        } else {
          throw new Error("Unexpected shape");
        }
      })
      .catch(() => {
        // Fallback: use leetcode-stats-api
        fetch(`https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`)
          .then((r) => (r.ok ? r.json() : Promise.reject()))
          .then((data) => {
            setStats({
              totalSolved: data.totalSolved,
              easySolved: data.easySolved,
              mediumSolved: data.mediumSolved,
              hardSolved: data.hardSolved,
              totalQuestions: data.totalQuestions,
              acceptanceRate: data.acceptanceRate,
              ranking: data.ranking,
            });
            setLoading(false);
          })
          .catch(() => {
            setError(true);
            setLoading(false);
          });
      });
  }, []);

  return { stats, loading, error };
}
