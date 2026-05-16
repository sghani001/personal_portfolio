import { useEffect, useRef, useState } from "react";

/**
 * Observe sections inside `.fullpage-scroll`. Uses a low threshold so the last
 * sections (e.g. Contact) still become visible when scrolled into view.
 */
export function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const scrollEl = document.querySelector(".fullpage-scroll");
    if (!el || !scrollEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      {
        root: options.root !== undefined ? options.root : scrollEl,
        rootMargin: options.rootMargin ?? "20% 0px 20% 0px",
        threshold: options.threshold ?? 0,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin, options.root]);

  return [ref, inView];
}
