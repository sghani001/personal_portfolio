import { useState, useEffect } from "react";
import { fetchWithTimeout } from "../utils/fetchWithTimeout";

const GITHUB_USERNAME = "dev-syedghani";
const apiUrl = (year) => `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=${year}`;

// Years are switched back and forth constantly once there are buttons for it, and
// a year that has already ended can never change. Caching per year keeps the
// unauthenticated API (which 429s readily) from being hit twice for the same data.
const cache = new Map();

/** @param year a calendar year, or "last" for the rolling trailing-12-months view. */
export function useGitHubContributions(year = "last") {
  const [data, setData] = useState(() => cache.get(year) ?? null);
  const [loading, setLoading] = useState(() => !cache.has(year));
  const [error, setError] = useState(false);

  useEffect(() => {
    const cached = cache.get(year);
    if (cached) {
      setData(cached);
      setLoading(false);
      setError(false);
      return;
    }

    // Guards against a slow response for a year the user has already clicked away
    // from overwriting the calendar they're currently looking at.
    let cancelled = false;
    setLoading(true);
    setError(false);

    fetchWithTimeout(apiUrl(year))
      .then((r) => {
        if (!r.ok) throw new Error("Failed");
        return r.json();
      })
      .then((json) => {
        // API returns { contributions: [{ date, count, level }], total: { year: n } }
        cache.set(year, json);
        if (cancelled) return;
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setError(true);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [year]);

  return { data, loading, error };
}
