// api/leetcode.js
// Vercel serverless function — place this file at /api/leetcode.js in your project root.
// It proxies requests to LeetCode's GraphQL API server-side, bypassing CORS entirely.

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type":  "application/json",
        "Referer":       "https://leetcode.com",
        "User-Agent":    "Mozilla/5.0",
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `LeetCode returned ${response.status}` });
    }

    const data = await response.json();

    // Allow your portfolio origin — replace with your actual domain
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    // Cache for 5 minutes so repeated visits don't hammer LeetCode
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=60");

    return res.status(200).json(data);
  } catch (err) {
    console.error("LeetCode proxy error:", err);
    return res.status(500).json({ error: "Proxy request failed" });
  }
}