import { useEffect, useState } from "react";

/**
 * Reports the active theme as a string, tracking the `light`/`dark` class App
 * puts on <html>.
 *
 * Most colours should just use the CSS custom properties (see theme.js) and never
 * need this. It exists for the few places that do arithmetic on hex literals —
 * the GitHub heatmap builds per-cell glows via `${color}99`, which only works on
 * a real hex string, not a `var(--x)` reference.
 */
export function useThemeMode() {
  const read = () =>
    typeof document !== "undefined" && document.documentElement.classList.contains("light")
      ? "light"
      : "dark";

  const [mode, setMode] = useState(read);

  useEffect(() => {
    const el = document.documentElement;
    const observer = new MutationObserver(() => setMode(read()));
    observer.observe(el, { attributes: true, attributeFilter: ["class"] });
    setMode(read()); // catch a toggle that happened between render and effect
    return () => observer.disconnect();
  }, []);

  return mode;
}
