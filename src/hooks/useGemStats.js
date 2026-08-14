import { useState, useEffect } from "react";
import resumeData from "../utils/resumeData";
import { fetchWithTimeout } from "../utils/fetchWithTimeout";

export function useGemStats() {
  const [counts, setCounts] = useState({});
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const gems = resumeData.openSource.gems;
    Promise.allSettled(
      gems.map(g =>
        fetchWithTimeout(`https://rubygems.org/api/v1/gems/${g.name}.json`)
          .then(r => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.json();
          })
          .then(data => ({ name: g.name, downloads: data.downloads ?? 0 }))
      )
    ).then(results => {
      const next = {};
      let sum = 0;
      let anyOk = false;
      results.forEach(r => {
        if (r.status === "fulfilled") {
          next[r.value.name] = r.value.downloads;
          sum += r.value.downloads;
          anyOk = true;
        }
      });
      setCounts(next);
      if (anyOk) setTotal(sum);
      else setError(true);
      setLoading(false);
    });
  }, []);

  const fallback = resumeData.openSource.combinedDownloads;
  const resolvedTotal = total ?? fallback;

  const formatCount = n => {
    if (n == null) return "—";
    return n >= 1000 ? `${(n / 1000).toFixed(1)}k+` : `${n.toLocaleString()}+`;
  };

  return {
    counts,
    total: resolvedTotal,
    liveTotal: total,
    loading,
    error,
    isLive: total != null,
    formatCount,
    displayTotal: resolvedTotal.toLocaleString(),
  };
}
