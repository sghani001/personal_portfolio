import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export function useCountUp(target, { duration = 1400, trigger = true } = {}) {
  const [value, setValue] = useState(0);
  const hasStartedRef = useRef(false);
  const prevTargetRef = useRef(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!trigger) return;
    hasStartedRef.current = true;
    const from = prevTargetRef.current;
    const to = target;
    prevTargetRef.current = target;

    if (reducedMotion) {
      setValue(to);
      return;
    }

    let raf;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(from + (to - from) * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [trigger, target, duration, reducedMotion]);

  return hasStartedRef.current ? value : 0;
}
