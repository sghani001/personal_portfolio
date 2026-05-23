import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const spring = { stiffness: 380, damping: 28, mass: 0.4 };

/**
 * Subtle 3D tilt on hover. Respects reduced motion.
 */
export default function TiltSurface({ children, className, style, as = "div", fill, ...rest }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, spring);
  const smy = useSpring(my, spring);
  const rotateX = useTransform(smy, [-0.5, 0.5], ["11deg", "-11deg"]);
  const rotateY = useTransform(smx, [-0.5, 0.5], ["-11deg", "11deg"]);

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function onMove(e) {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  const MotionTag = as === "button" ? motion.button : motion.div;

  return (
    <div className={`tilt-surface${fill ? " tilt-surface--fill" : ""}`} style={{ perspective: 1000 }}>
      <MotionTag
        ref={ref}
        type={as === "button" ? "button" : undefined}
        className={className}
        {...rest}
        style={{
          transformStyle: "preserve-3d",
          ...(reduceMotion ? {} : { rotateX, rotateY }),
          ...(fill ? { display: "flex", flexDirection: "column", width: "100%", height: "100%", minHeight: 0 } : {}),
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
