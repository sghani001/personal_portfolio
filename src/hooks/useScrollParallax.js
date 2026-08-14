import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export function useScrollParallax(distance = 120, offset = ["start end", "end start"]) {
  const ref = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const y = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [-distance, distance]);
  return { ref, y };
}
