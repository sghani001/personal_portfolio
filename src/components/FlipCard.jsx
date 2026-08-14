import React, { useState } from "react";
import C from "../theme";
import { usePointerFine } from "../hooks/usePointerFine";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const faceStyle = {
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  background: C.surface,
  border: `1px solid ${C.border}`,
  borderRadius: C.radius,
  boxShadow: "0 4px 16px var(--shadow-base), var(--shadow-inset)",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
};

export function FlipCard({ front, back, className = "" }) {
  const [flipped, setFlipped] = useState(false);
  const pointerFine = usePointerFine();
  const reducedMotion = usePrefersReducedMotion();

  const handlers = pointerFine
    ? { onMouseEnter: () => setFlipped(true), onMouseLeave: () => setFlipped(false) }
    : { onClick: () => setFlipped((f) => !f) };

  return (
    <div
      className={className}
      {...handlers}
      style={{ position: "relative", perspective: 1200, cursor: pointerFine ? "default" : "pointer", zIndex: flipped ? 2 : 1 }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          transformStyle: "preserve-3d",
          transition: reducedMotion ? "none" : "transform 0.55s cubic-bezier(0.22,1,0.36,1)",
          transform: flipped ? "rotateY(180deg) scale(1.04)" : "rotateY(0deg) scale(1)",
        }}
      >
        {/* front sits in normal flow — its natural content height sizes the whole card */}
        <div style={{ ...faceStyle, position: "relative" }}>{front}</div>
        {/* back overlays the front's box exactly, flipped */}
        <div style={{ ...faceStyle, position: "absolute", inset: 0, transform: "rotateY(180deg)" }}>{back}</div>
      </div>
    </div>
  );
}
