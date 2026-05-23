import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import "./CustomCursor.css";

/**
 * CustomCursor - A trailing cursor effect that follows the mouse.
 */
export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const moveMouse = (e) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHover = (e) => {
      const target = e.target;
      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('clickable');
      
      setIsHovering(isClickable);
    };

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [cursorX, cursorY, dotX, dotY]);

  return (
    <>
      <motion.div
        className={`custom-cursor-dot ${isHovering ? 'hovering' : ''}`}
        style={{
          x: dotX,
          y: dotY,
        }}
      />
      <motion.div
        className={`custom-cursor-ring ${isHovering ? 'hovering' : ''}`}
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
    </>
  );
}
