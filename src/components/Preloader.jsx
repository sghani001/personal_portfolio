import React, { useEffect, useState } from "react";
import C from "../theme";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

// Long enough that the loader reads as intentional rather than a flash of chrome,
// short enough that a warm cache doesn't feel padded.
const MIN_VISIBLE_MS = 700;
// A hard ceiling so a stalled font or image can never trap someone on the splash.
const MAX_VISIBLE_MS = 3500;
// Must match the .preloader transition duration in index.css.
const FADE_MS = 550;

/**
 * First-paint splash. Shown on every full page load (a refresh is a load), then
 * faded out once the document has finished loading. The app renders underneath the
 * whole time, so what's revealed is already laid out rather than assembling itself
 * in front of the viewer — which is the point: it covers the reflow that used to
 * be visible as the contribution board and other fetched sections settled.
 */
export function Preloader({ onDone }) {
  const reducedMotion = usePrefersReducedMotion();
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const startedAt = Date.now();
    let fadeTimer;
    let doneTimer;

    const finish = () => {
      // Hold for the remainder of the minimum, so a fast load doesn't produce a blink.
      const wait = Math.max(0, MIN_VISIBLE_MS - (Date.now() - startedAt));
      fadeTimer = setTimeout(() => {
        setLeaving(true);
        doneTimer = setTimeout(onDone, reducedMotion ? 0 : FADE_MS);
      }, wait);
    };

    const ceiling = setTimeout(finish, MAX_VISIBLE_MS);
    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    return () => {
      clearTimeout(ceiling);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
      window.removeEventListener("load", finish);
    };
  }, [onDone, reducedMotion]);

  // The page behind is fully laid out; without this it can be scrolled around
  // underneath the splash, and lands somewhere unexpected on reveal.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  return (
    <div className={`preloader${leaving ? " is-leaving" : ""}`} role="status" aria-live="polite">
      <div className="preloader-inner">
        <div
          className="preloader-mark"
          style={{ background: `linear-gradient(135deg, ${C.copper}, ${C.copperDeep})`, color: C.onGold }}
        >
          SG
        </div>
        <p className="preloader-name">Syed M. Ghani</p>
        <p className="preloader-role">Rails · React</p>
        <div className="preloader-track">
          <span className="preloader-fill" />
        </div>
        <span className="sr-only">Loading portfolio</span>
      </div>
    </div>
  );
}
