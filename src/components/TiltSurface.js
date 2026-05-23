import React, { useRef, useMemo, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Crisper spring — fast response, no wobble
const spring = { stiffness: 420, damping: 36, mass: 0.3 };

/**
 * TiltSurface — Subtle 3D tilt on hover.
 * Respects prefers-reduced-motion. Tilt capped at 6deg for elegance.
 * Zero re-renders during mouse move — all Framer Motion motion values.
 */
export default function TiltSurface({ children, className, style, as = "div", fill, ...rest }) {
  const ref = useRef(null);

  // Memoize once — no need to re-check on every render
  const reduceMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, spring);
  const smy = useSpring(my, spring);

  // Reduced from 11deg → 6deg — more refined, less distracting
  const rotateX = useTransform(smy, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(smx, [-0.5, 0.5], ["-6deg", "6deg"]);

  const onMove = useCallback(
    (e) => {
      if (reduceMotion) return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    },
    [reduceMotion, mx, my]
  );

  const onLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  const MotionTag = as === "button" ? motion.button : motion.div;

  return (
    <div
      className={`tilt-surface${fill ? " tilt-surface--fill" : ""}`}
      style={{ perspective: 900 }}
    >
      <MotionTag
        ref={ref}
        type={as === "button" ? "button" : undefined}
        className={className}
        {...rest}
        style={{
          transformStyle: "preserve-3d",
          ...(reduceMotion ? {} : { rotateX, rotateY }),
          ...(fill
            ? { display: "flex", flexDirection: "column", width: "100%", height: "100%", minHeight: 0 }
            : {}),
          ...style,
        }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {children}
      </MotionTag>
    </div>
  );
}
