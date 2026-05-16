import React, { useState, useEffect } from 'react';
import './GitHubCalendar.css';

const GitHubCalendar = ({ username }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeYear, setActiveYear] = useState(2026);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // If year is 2026 (current), fetch last year, otherwise fetch specific year range
        const url = activeYear === 2026 
          ? `https://github-contributions-api.deno.dev/${username}.json`
          : `https://github-contributions-api.deno.dev/${username}.json?from=${activeYear}-01-01&to=${activeYear}-12-31`;
          
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch contributions');
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username, activeYear]);

  // Always render the root container to prevent jumping
  const renderLoader = () => (
    <div className="github-calendar-loader-container">
      <div className="github-spinner"></div>
      <span>Loading contributions...</span>
    </div>
  );

  if (error) return (
    <div className="github-calendar-root github-calendar-error">
      <div className="glass-card" style={{ padding: '2rem' }}>Error: {error}</div>
    </div>
  );

  const monthLabels = [];
  if (data?.contributions) {
    let lastMonth = -1;
    data.contributions.forEach((week, weekIndex) => {
      const firstDay = week[0];
      if (firstDay) {
        const date = new Date(firstDay.date);
        const month = date.getMonth();
        if (month !== lastMonth) {
          monthLabels.push({ month: date.toLocaleString('default', { month: 'short' }), index: weekIndex });
          lastMonth = month;
        }
      }
    });
  }

  const years = [2026, 2025, 2024, 2023, 2022];

  return (
    <div className="github-calendar-root glass-card">
      <div className="github-calendar-header">
        <h2 className="github-calendar-stats">
          {loading ? 'Fetching contributions...' : `${data?.totalContributions || 0} contributions in ${activeYear === 2026 ? 'the last year' : activeYear}`}
        </h2>
        
        <div className="year-selector">
          {years.map(year => (
            <button 
              key={year} 
              className={`year-btn ${year === activeYear ? 'active' : ''}`}
              onClick={() => setActiveYear(year)}
              disabled={loading}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      <div className="github-calendar-main" style={{ minHeight: '280px', position: 'relative' }}>
        {loading ? renderLoader() : data && (
          <div className="github-calendar-container">
            <div className="github-calendar-graph-wrap">
              <div className="github-calendar-graph">
                {/* Day Labels */}
                <div className="day-labels">
                  <span></span>
                  <span>Mon</span>
                  <span></span>
                  <span>Wed</span>
                  <span></span>
                  <span>Fri</span>
                  <span></span>
                </div>

                <div className="graph-content">
                  {/* Month Labels */}
                  <div className="month-labels">
                    {monthLabels.map((label, i) => (
                      <span 
                        key={i} 
                        className="month-label" 
                        style={{ left: `${label.index * 14}px` }}
                      >
                        {label.month}
                      </span>
                    ))}
                  </div>

                  {/* Grid of Squares */}
                  <div className="contribution-grid">
                    {data.contributions.map((week, weekIndex) => (
                      <div key={weekIndex} className="contribution-week">
                        {week.map((day, dayIndex) => (
                          <div
                            key={dayIndex}
                            className={`contribution-day level-${day.contributionLevel.toLowerCase()}`}
                            style={{ backgroundColor: day.color }}
                            title={`${day.contributionCount} contributions on ${day.date}`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="github-calendar-footer">
              <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer" className="learn-more">
                Learn how we count contributions
              </a>
              <div className="legend">
                <span>Less</span>
                <div className="legend-squares">
                  <div className="legend-square level-none"></div>
                  <div className="legend-square level-first_quartile"></div>
                  <div className="legend-square level-second_quartile"></div>
                  <div className="legend-square level-third_quartile"></div>
                  <div className="legend-square level-fourth_quartile"></div>
                </div>
                <span>More</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GitHubCalendar;
