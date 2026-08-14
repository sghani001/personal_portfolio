import { useEffect, useState } from "react";

/**
 * Tracks which section is currently under the nav bar, and keeps the URL hash in
 * sync with it.
 *
 * The hash matters for more than looks: without it, scrolling to Contact and
 * hitting refresh reloads whatever stale `#gems` was left in the address bar,
 * dumping you back at the wrong section.
 *
 * `history.replaceState` is used rather than assigning `location.hash` for two
 * reasons — assigning the hash triggers a jump (fighting the user's scroll), and
 * it would push a history entry per section, so Back would crawl up the page
 * instead of leaving the site.
 *
 * @param {string[]} ids   section ids, in document order
 * @param {number}   offset pixels from the viewport top that count as "here"
 *                          (the fixed nav's height)
 */
export function useScrollSpy(ids, { offset = 72, syncHash = true } = {}) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    // Resolved once rather than per scroll event (this fires ~60–120x/second).
    let elements = ids.map((id) => [id, document.getElementById(id)]).filter(([, el]) => el);
    let lastY = -1;

    const compute = () => {
      // Horizontal scrolls and repeat events at the same offset can't change the
      // answer, so skip the measurement entirely.
      if (window.scrollY === lastY) return;
      lastY = window.scrollY;

      const line = offset + 1;
      let current = null;

      for (const [id, el] of elements) {
        const { top, bottom } = el.getBoundingClientRect();
        if (top <= line && bottom > line) {
          current = id;
          break;
        }
      }

      // At the very bottom the last section may be too short to reach the line,
      // so it would never activate — pin it explicitly.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) current = ids[ids.length - 1];

      setActiveId(current);
    };

    // Measured synchronously rather than coalesced into requestAnimationFrame:
    // this is a dozen getBoundingClientRect reads with no interleaved writes, so
    // it's cheap, and it keeps the spy working even when rAF is throttled (a
    // backgrounded or non-compositing tab), where an rAF-gated version stalls
    // and leaves the URL pointing at a stale section.
    // Sections mount with the page, but images and async widgets can shift them;
    // re-resolve and re-measure on resize.
    const onResize = () => {
      elements = ids.map((id) => [id, document.getElementById(id)]).filter(([, el]) => el);
      lastY = -1;
      compute();
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", onResize);
    };
  }, [ids, offset]);

  useEffect(() => {
    if (!syncHash) return;
    const desired = activeId ? `#${activeId}` : "";
    if (window.location.hash === desired) return;
    // Above the first section (the hero) drop the hash entirely, so a refresh at
    // the top reloads at the top.
    const url = desired || window.location.pathname + window.location.search;
    window.history.replaceState(null, "", url);
  }, [activeId, syncHash]);

  return activeId;
}
