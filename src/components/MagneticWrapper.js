import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * MagneticWrapper - A component that adds a magnetic "attraction" effect to its children.
 * When the mouse is near, the child element subtly follows the cursor.
 */
export default function MagneticWrapper({ children, strength = 0.35 }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    // Calculate center of the element
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Calculate distance from center to mouse
    const x = (clientX - centerX) * strength;
    const y = (clientY - centerY) * strength;

    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      style={{ display: "inline-block" }}
    >
      {children}
    </motion.div>
  );
}
