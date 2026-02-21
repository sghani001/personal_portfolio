import React, { useState, useCallback, useRef, useEffect } from "react";
import { resumeData } from "../utils/resumeData";
import "./Hero.css";

const heroPhoto = process.env.PUBLIC_URL + "/hero-photo.png";
const TRAIL_DECAY_MS = 1000;
const MOVE_THRESHOLD = 0.005;
const SPARKS_PER_MOVE = 8;
const MAX_PARTICLES = 200;
const SCATTER = 0.14;
const DRIFT = 0.06;

export default function Hero() {
  const [trail, setTrail] = useState([]);
  const lastPosRef = useRef({ x: 0.5, y: 0.5 });
  const trailRef = useRef([]);
  const rafRef = useRef(null);
  const idRef = useRef(0);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    lastPosRef.current = { x, y };
  }, []);

  useEffect(() => {
    function updateTrail() {
      const now = Date.now();
      const { x, y } = lastPosRef.current;
      const prev = trailRef.current;
      const last = prev.length > 0 ? prev[prev.length - 1] : null;
      const lastCx = last?.cx;
      const lastCy = last?.cy;
      const dist = lastCx != null ? Math.hypot(x - lastCx, y - lastCy) : 1;

      if (dist > MOVE_THRESHOLD) {
        const newParticles = [];
        for (let i = 0; i < SPARKS_PER_MOVE; i++) {
          const scatterX = (Math.random() - 0.5) * 2 * SCATTER;
          const scatterY = (Math.random() - 0.5) * 2 * SCATTER;
          const driftX = (Math.random() - 0.5) * 2 * DRIFT;
          const driftY = (Math.random() - 0.5) * 2 * DRIFT;
          const size = 0.6 + Math.random() * 0.8;
          newParticles.push({
            id: `p-${now}-${idRef.current++}`,
            cx: x,
            cy: y,
            x: x + scatterX,
            y: y + scatterY,
            t: now,
            driftX,
            driftY,
            size,
          });
        }
        const next = [...prev, ...newParticles].slice(-MAX_PARTICLES);
        trailRef.current = next;
      }

      const decayed = trailRef.current.filter((p) => now - p.t < TRAIL_DECAY_MS);
      trailRef.current = decayed;

      const display = decayed.map((p) => {
        const age = Math.min(1, (now - p.t) / TRAIL_DECAY_MS);
        return {
          id: p.id,
          x: p.x,
          y: p.y,
          age,
          driftX: p.driftX,
          driftY: p.driftY,
          size: p.size,
        };
      });
      setTrail(display);

      rafRef.current = requestAnimationFrame(updateTrail);
    }
    rafRef.current = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="hero hero--animate"
      onMouseMove={handleMouseMove}
    >
      <div className="hero__bg-magic" aria-hidden>
        {trail.map((point) => (
          <div
            key={point.id}
            className="hero__trail-particle"
            style={{
              left: `${point.x * 100}%`,
              top: `${point.y * 100}%`,
              "--age": point.age,
              "--drift-x": point.driftX,
              "--drift-y": point.driftY,
              "--size": point.size,
            }}
          />
        ))}
      </div>
      <div className="hero__inner">
        <div className="hero__content">
          <div className="hero__photo-frame animate-in" style={{ animationDelay: "0.1s" }}>
            <img
              src={heroPhoto}
              alt={resumeData.name}
              className="hero__photo"
            />
          </div>
          <h1 className="hero__name animate-in" style={{ animationDelay: "0.25s" }}>
            {resumeData.name}
          </h1>
          <p className="hero__tagline animate-in" style={{ animationDelay: "0.4s" }}>
            {resumeData.tagline}
          </p>
          <div className="hero__actions animate-in" style={{ animationDelay: "0.55s" }}>
            <button type="button" className="hero__btn" onClick={scrollTo("summary")}>
              View work
            </button>
            <a
              href="#contact"
              className="hero__link"
              onClick={scrollTo("contact")}
            >
              Get in touch
            </a>
          </div>
        </div>
        <button
          type="button"
          className="hero__scroll-hint animate-in"
          style={{ animationDelay: "0.8s" }}
          onClick={scrollTo("summary")}
          aria-label="Scroll to content"
        >
          <span className="hero__scroll-mouse" aria-hidden>
            <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="22" height="34" rx="11" stroke="currentColor" strokeWidth="2" fill="none" />
              <circle cx="12" cy="12" r="2" fill="currentColor" className="hero__scroll-mouse-wheel" />
            </svg>
          </span>
          <span className="hero__scroll-text">Scroll</span>
        </button>
      </div>
    </section>
  );
}
