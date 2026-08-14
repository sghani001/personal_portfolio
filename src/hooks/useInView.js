import { useEffect, useRef, useState } from "react";

/**
 * True while the element is on (or near) screen.
 *
 * Used to park the looping decorative animations. framer-motion keeps a
 * `repeat: Infinity` animation running whether or not the element is visible,
 * so without this the skills solar system — 13 simultaneous loops — burns
 * main-thread time the entire time a visitor is reading the hero 4000px above
 * it, and never stops for as long as the tab is open.
 *
 * `rootMargin` starts things slightly before they scroll into view, so the
 * motion is already underway rather than visibly kicking off.
 */
export function useInView({ rootMargin = "200px", once = false } = {}) {
  const ref = useRef(null);
  // Starts true and is switched off once the observer confirms the element is
  // actually out of view. Defaulting to false would be the tighter optimisation,
  // but it fails closed: anywhere the observer doesn't report — no
  // IntersectionObserver, or a browser that never delivers the first callback —
  // the decorative motion would stay dead forever and the page would look
  // broken. Running a few animations for one extra frame is the cheaper mistake.
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver at all: leave it animating.
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) observer.disconnect();
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, once]);

  return [ref, inView];
}
