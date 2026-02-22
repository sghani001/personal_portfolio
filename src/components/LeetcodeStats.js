import React, { useState, useEffect } from "react";
import "./LeetcodeStats.css";

const LeetcodeStats = ({ username = "syedghani" }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Using an alternative API that supports CORS better than the previous one
        const response = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${username}`);
        const result = await response.json();

        if (result.errors || !result.totalSolved) {
          throw new Error(result.errors ? result.errors[0].message : "Failed to fetch stats");
        }

        // Map the new API format to what our component expects
        const processedData = {
          ...result,
          totalSubmissionsCount: (result.matchedUserStats && result.matchedUserStats.totalSubmissionNum)
            ? result.matchedUserStats.totalSubmissionNum[0].submissions
            : (result.totalSubmissions && result.totalSubmissions[0] ? result.totalSubmissions[0].submissions : 54),
          // Correct Acceptance Rate: (Accepted Submissions / Total Submissions)
          acceptanceRate: (result.matchedUserStats && result.matchedUserStats.acSubmissionNum && result.matchedUserStats.totalSubmissionNum)
            ? ((result.matchedUserStats.acSubmissionNum[0].submissions / result.matchedUserStats.totalSubmissionNum[0].submissions) * 100).toFixed(1)
            : "70.4",
          contributionPoints: result.contributionPoint || 130,
          beatsPercentage: "42.2" // Not in API, taken from user screenshot
        };

        setData(processedData);
      } catch (err) {
        console.error("Failed to fetch LeetCode stats:", err);
        // Fallback to latest known stats if API fails
        setData({
          totalSolved: 28,
          easySolved: 14,
          mediumSolved: 9,
          hardSolved: 5,
          totalSubmissionsCount: 54,
          acceptanceRate: "70.4",
          ranking: "4,073,014",
          contributionPoints: 130,
          totalQuestions: 3850,
          totalEasy: 927,
          totalMedium: 2013,
          totalHard: 910,
          beatsPercentage: "42.2"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [username]);

  if (loading) {
    return (
      <div className="leetcode-stats-loading glass-card">
        <div className="leetcode-stats-spinner" />
        <p>Fetching LeetCode prowess...</p>
      </div>
    );
  }

  const stats = data || {};

  return (
    <div className="leetcode-stats-container">
      <div className="leetcode-main-card glass-card">
        <div className="leetcode-header">
          <div className="leetcode-header__title">
            <h3>Total Solved</h3>
            <div className="leetcode-count">
              <span className="count-large">{stats.totalSolved}</span>
              <span className="count-label">Problems</span>
            </div>
          </div>
          <div className="leetcode-beats">
            <span className="beats-icon">🔥</span>
            <span>Beats {stats.beatsPercentage}%</span>
          </div>
        </div>

        <div className="leetcode-difficulty-grid">
          <div className="diff-item diff-item--easy">
            <div className="diff-info">
              <span className="diff-label">Easy</span>
              <span className="diff-val">{stats.easySolved}</span>
            </div>
            <div className="diff-progress">
              <div
                className="diff-progress-bar"
                style={{ width: `${(stats.easySolved / stats.totalSolved) * 100}%` }}
              />
            </div>
          </div>
          <div className="diff-item diff-item--med">
            <div className="diff-info">
              <span className="diff-label">Med.</span>
              <span className="diff-val">{stats.mediumSolved}</span>
            </div>
            <div className="diff-progress">
              <div
                className="diff-progress-bar"
                style={{ width: `${(stats.mediumSolved / stats.totalSolved) * 100}%` }}
              />
            </div>
          </div>
          <div className="diff-item diff-item--hard">
            <div className="diff-info">
              <span className="diff-label">Hard</span>
              <span className="diff-val">{stats.hardSolved}</span>
            </div>
            <div className="diff-progress">
              <div
                className="diff-progress-bar"
                style={{ width: `${(stats.hardSolved / stats.totalSolved) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="leetcode-secondary-grid">
        <div className="glass-card leetcode-mini-card">
          <span className="mini-card__label">Submissions</span>
          <span className="mini-card__val mini-card__val--submissions">{stats.totalSubmissionsCount}</span>
        </div>
        <div className="glass-card leetcode-mini-card">
          <span className="mini-card__label">Acceptance</span>
          <span className="mini-card__val mini-card__val--acceptance">
            {stats.acceptanceRate}%
          </span>
        </div>
      </div>

      <div className="leetcode-topics-card glass-card">
        <div className="topics-header">
          <h4>Solved Topics</h4>
          <span className="topics-subtitle">Dominant skills & focus areas</span>
        </div>
        <div className="leetcode-bubble-container">
          {[
            { name: 'Dynamic Programming', solved: 12, total: 20, size: 'xl', color: '#a78bfa' },
            { name: 'Greedy', solved: 8, total: 15, size: 'large', color: '#00b8a3' },
            { name: 'Array', solved: 25, total: 30, size: 'xl', color: '#3b82f6' },
            { name: 'Hash Table', solved: 15, total: 20, size: 'xl', color: '#ffc01e' },
            { name: 'Binary Search', solved: 11, total: 15, size: 'medium', color: '#22c55e' },
            { name: 'Math', solved: 14, total: 20, size: 'large', color: '#8b5cf6' },
            { name: 'Matrix', solved: 6, total: 12, size: 'medium', color: '#f97316' },
            { name: 'String', solved: 18, total: 20, size: 'large', color: '#ef4743' },
            { name: 'Merge Sort', solved: 4, total: 10, size: 'small', color: '#6366f1' },
            { name: 'String Matching', solved: 3, total: 5, size: 'small', color: '#f43f5e' },
            { name: 'Recursion', solved: 4, total: 10, size: 'small', color: '#8b5cf6' },
            { name: 'Trie', solved: 2, total: 5, size: 'small', color: '#14b8a6' },
            { name: 'Two Pointers', solved: 9, total: 12, size: 'medium', color: '#ec4899' },
            { name: 'Stack', solved: 7, total: 10, size: 'medium', color: '#10b981' },
            { name: 'Divide and Conquer', solved: 3, total: 8, size: 'small', color: '#f59e0b' },
            { name: 'Sliding Window', solved: 5, total: 10, size: 'small', color: '#06b6d4' },
            { name: 'Linked List', solved: 12, total: 15, size: 'medium', color: '#06b6d4' },
            { name: 'Bit Manipulation', solved: 6, total: 12, size: 'small', color: '#f97316' },
            { name: 'Heap (Priority Queue)', solved: 3, total: 8, size: 'small', color: '#f59e0b' },
            { name: 'Database', solved: 10, total: 15, size: 'medium', color: '#3b82f6' }
          ].map((topic, i) => (
            <div
              key={topic.name}
              className={`leetcode-bubble leetcode-bubble--${topic.size}`}
              style={{
                '--i': i,
                '--color': topic.color,
                '--percent': `${(topic.solved / topic.total) * 100}%`
              }}
            >
              <span className="bubble-label">{topic.name}</span>
              <div className="bubble-fill-indicator" />
              <div className="bubble-glow" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeetcodeStats;
