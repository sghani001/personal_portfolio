import React, { useRef, useState } from "react";
import "./SpotlightCard.css";

/**
 * SpotlightCard - A glass card with a mouse-following spotlight effect.
 */
export default function SpotlightCard({ children, className = "" }) {
  const divRef = useRef(null);
  const glowRef = useRef(null);
  const isFocusedRef = useRef(false);

  const updateGlow = (x, y, opacity) => {
    if (glowRef.current) {
      glowRef.current.style.opacity = opacity;
      if (x !== undefined && y !== undefined) {
        glowRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(124, 61, 255, 0.15), transparent 40%)`;
      }
    }
  };

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocusedRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    updateGlow(e.clientX - rect.left, e.clientY - rect.top, 1);
  };

  const handleMouseEnter = () => {
    updateGlow(undefined, undefined, 1);
  };

  const handleMouseLeave = () => {
    updateGlow(undefined, undefined, 0);
  };

  const handleFocus = () => {
    isFocusedRef.current = true;
    updateGlow(undefined, undefined, 1);
  };

  const handleBlur = () => {
    isFocusedRef.current = false;
    updateGlow(undefined, undefined, 0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={`spotlight-card glass-card ${className}`}
    >
      <div
        ref={glowRef}
        className="spotlight-card__glow"
        style={{
          opacity: 0,
        }}
      />
      {children}
    </div>
  );
}
