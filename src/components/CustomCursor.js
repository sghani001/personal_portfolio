import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import "./CustomCursor.css";

/**
 * CustomCursor - A trailing cursor effect that follows the mouse.
 */
export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const moveMouse = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setMousePosition({ x: e.clientX, y: e.clientY });
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
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className={`custom-cursor-dot ${isHovering ? 'hovering' : ''}`}
        style={{
          x: mousePosition.x,
          y: mousePosition.y,
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
