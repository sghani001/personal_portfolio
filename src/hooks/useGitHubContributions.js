import { useState, useEffect } from "react";
import { fetchWithTimeout } from "../utils/fetchWithTimeout";

const GITHUB_USERNAME = "sghani001";
const API_URL = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`;

export function useGitHubContributions() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchWithTimeout(API_URL)
      .then((r) => {
        if (!r.ok) throw new Error("Failed");
        return r.json();
      })
      .then((json) => {
        // API returns { contributions: [{ date, count, level }], total: { year: n } }
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
