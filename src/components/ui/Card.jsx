import React, { useState } from "react";
import C from "../../theme";

export default function Card({ children, hover = true, className = "", style = {} }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className={className}
      onMouseEnter={() => hover && setHov(true)}
      onMouseLeave={() => hover && setHov(false)}
      style={{
        background: C.surface,
        border: `1px solid ${hov ? C.copper + "55" : C.border}`,
        borderRadius: C.radius,
        boxShadow: hov
          ? "0 8px 32px var(--shadow-hover), var(--shadow-inset), 0 0 0 1px #E2C79918"
          : "0 4px 16px var(--shadow-base), var(--shadow-inset)",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        transition: "background 0.3s, border-color 0.25s, box-shadow 0.25s, transform 0.25s",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
