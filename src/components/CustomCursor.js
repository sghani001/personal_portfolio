import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, motion } from "framer-motion";
import "./CustomCursor.css";

// Tight spring for the dot (instant-feeling)
const DOT_SPRING = { damping: 50, stiffness: 800, mass: 0.2 };
// Looser spring for the trailing ring
const RING_SPRING = { damping: 28, stiffness: 220, mass: 0.6 };

/**
 * CustomCursor — Zero-state, zero-re-render custom cursor.
 * Hover class is toggled directly on DOM refs — no React setState at all.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  // Dot tracks the mouse exactly (tight spring = near-instant)
  const dotX = useMotionValue(-200);
  const dotY = useMotionValue(-200);
  const sDotX = useSpring(dotX, DOT_SPRING);
  const sDotY = useSpring(dotY, DOT_SPRING);

  // Ring trails behind (loose spring)
  const ringX = useMotionValue(-200);
  const ringY = useMotionValue(-200);
  const sRingX = useSpring(ringX, RING_SPRING);
  const sRingY = useSpring(ringY, RING_SPRING);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let rafId;

    const onMouseMove = (e) => {
      // Cancel any pending frame — coalesce rapid events
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        dotX.set(e.clientX);
        dotY.set(e.clientY);
        ringX.set(e.clientX);
        ringY.set(e.clientY);
        rafId = null;
      });
    };

    // Direct DOM class toggle — zero React re-renders
    const onMouseOver = (e) => {
      const t = e.target;
      const clickable =
        t.tagName === "BUTTON" ||
        t.tagName === "A" ||
        t.tagName === "INPUT" ||
        t.tagName === "TEXTAREA" ||
        t.closest("button") ||
        t.closest("a") ||
        t.classList.contains("clickable");

      if (clickable) {
        dot.classList.add("hovering");
        ring.classList.add("hovering");
      } else {
        dot.classList.remove("hovering");
        ring.classList.remove("hovering");
      }
    };

    const onMouseLeave = () => {
      // Hide cursor when it leaves the window
      dotX.set(-200);
      dotY.set(-200);
      ringX.set(-200);
      ringY.set(-200);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [dotX, dotY, ringX, ringY]);

  return (
    <>
      <motion.div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{ x: sDotX, y: sDotY }}
        aria-hidden
      />
      <motion.div
        ref={ringRef}
        className="custom-cursor-ring"
        style={{ x: sRingX, y: sRingY }}
        aria-hidden
      />
    </>
  );
}
