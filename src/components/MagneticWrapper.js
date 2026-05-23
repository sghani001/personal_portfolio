import React, { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Snappy but not bouncy — feels like a physical button
const springConfig = { stiffness: 320, damping: 30, mass: 0.5 };

/**
 * MagneticWrapper — Adds a subtle magnetic attraction to its child element.
 * The child moves toward the cursor when hovered. Uses Framer Motion springs
 * for smooth, physics-based easing. Zero React re-renders during mouse move.
 */
export default function MagneticWrapper({ children, strength = 0.3 }) {
  const ref = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  const handleMouseMove = useCallback(
    (e) => {
      if (!ref.current) return;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      rawX.set((e.clientX - centerX) * strength);
      rawY.set((e.clientY - centerY) * strength);
    },
    [rawX, rawY, strength]
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: "inline-block", x, y }}
    >
      {children}
    </motion.div>
  );
}
