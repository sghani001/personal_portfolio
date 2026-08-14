import { useCallback, useRef, useState } from "react";
import { usePointerFine } from "./usePointerFine";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export function useTilt3D({ max = 8 } = {}) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const pointerFine = usePointerFine();
  const reducedMotion = usePrefersReducedMotion();
  const enabled = pointerFine && !reducedMotion;

  const onPointerMove = useCallback(
    (e) => {
      if (!enabled || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      setTilt({ rx: -(py - 0.5) * 2 * max, ry: (px - 0.5) * 2 * max });
    },
    [enabled, max]
  );

  const onPointerLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0 });
  }, []);

  return { ref, onPointerMove, onPointerLeave, tilt, enabled };
}
