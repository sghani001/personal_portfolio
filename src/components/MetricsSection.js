import React, { useEffect, useRef, useState } from "react";
import resumeData from "../utils/resumeData";
import { useInView } from "../hooks/useInView";
import "./MetricsSection.css";

function AnimatedCounter({ value, inView }) {
  const [display, setDisplay] = useState("0");
  const isNumeric = /^[\d,]+$/.test(value.replace(/,/g, ""));

  useEffect(() => {
    if (!inView || !isNumeric) {
      setDisplay(value);
      return;
    }

    const target = parseInt(value.replace(/,/g, ""), 10);
    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      setDisplay(current.toLocaleString());
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, value, isNumeric]);

  return <span>{isNumeric ? display : value}</span>;
}

export default function MetricsSection() {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <div className="metrics-block" ref={ref}>
      <div className="metrics-grid">
        {resumeData.metrics.map((m, i) => (
          <div key={i} className="metric-card glass-card" style={{ "--stagger-i": i }}>
            <div className="metric-card__value">
              <AnimatedCounter value={m.value} inView={inView} />
            </div>
            <div className="metric-card__label">{m.label}</div>
            {m.detail && <div className="metric-card__detail">{m.detail}</div>}
          </div>
        ))}
      </div>

      <blockquote className="philosophy-quote glass-card">
        <span className="philosophy-quote__mark">"</span>
        <p>{resumeData.philosophy}</p>
        <footer className="philosophy-quote__footer">— Engineering Philosophy</footer>
      </blockquote>
    </div>
  );
}
