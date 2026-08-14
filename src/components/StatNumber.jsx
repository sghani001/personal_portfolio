import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { useCountUp } from "../hooks/useCountUp";

export function StatNumber({ value, style, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const match = /^([\d,]+)(.*)$/.exec(String(value));
  const numeric = match ? parseInt(match[1].replace(/,/g, ""), 10) : null;
  const suffix = match ? match[2] : "";

  const count = useCountUp(numeric ?? 0, { trigger: inView });

  if (numeric === null || Number.isNaN(numeric)) {
    return (
      <span ref={ref} className={className} style={style}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className} style={style}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
