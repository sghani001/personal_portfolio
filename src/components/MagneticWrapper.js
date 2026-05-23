import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };

/**
 * MagneticWrapper - A component that adds a magnetic "attraction" effect to its children.
 * When the mouse is near, the child element subtly follows the cursor.
 */
export default function MagneticWrapper({ children, strength = 0.35 }) {
  const ref = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    rawX.set((clientX - centerX) * strength);
    rawY.set((clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

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
