import { useEffect, useRef, useState } from "react";

/**
 * Use the scroll container (main.fullpage-scroll) so sections animate when they enter view.
 */
export function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const scrollEl = document.querySelector(".fullpage-scroll");
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      {
        threshold: options.threshold ?? 0.2,
        root: options.root !== undefined ? options.root : scrollEl,
        rootMargin: options.rootMargin ?? "0px 0px -10% 0px",
      }
    );

    if (scrollEl) observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin, options.root]);

  return [ref, inView];
}

