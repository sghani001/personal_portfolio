import { useState, useEffect } from "react";

/**
 * Cycles through `words`, typing each one out, pausing, deleting it, then
 * moving to the next. Pure setTimeout-based — no extra dependency needed.
 *
 * Usage:
 *   <TypewriterText words={resumeData.titles} />
 */
export function TypewriterText({
  words,
  typingSpeed = 65,
  deletingSpeed = 35,
  pauseTime = 1600,
  loop = true,
  className,
  style,
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) return;

    // Stop on the last word fully typed if not looping.
    const isLastWord = wordIndex === words.length - 1;
    if (!loop && isLastWord && !deleting && subIndex === words[wordIndex].length) {
      return;
    }

    const current = words[wordIndex % words.length];

    if (!deleting && subIndex === current.length) {
      const pause = setTimeout(() => setDeleting(true), pauseTime);
      return () => clearTimeout(pause);
    }

    if (deleting && subIndex === 0) {
      setDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const speed = deleting ? deletingSpeed : typingSpeed;
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, speed);
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime, loop]);

  if (!words || words.length === 0) return null;
  const current = words[wordIndex % words.length];

  return (
    <span className={className} style={{ display: "inline-flex", alignItems: "center", ...style }}>
      {current.slice(0, subIndex)}
      <span
        aria-hidden="true"
        style={{
          display: "inline-block",
          width: 2,
          height: "1em",
          marginLeft: 3,
          background: "currentColor",
          animation: "typewriter-blink 1s step-start infinite",
          verticalAlign: "text-bottom",
        }}
      />
      {/* Keyframes are scoped by name, so repeated instances of this component
          re-declaring the same @keyframes rule is harmless — but if you're
          using this component more than once per page, consider moving this
          block into your global stylesheet instead. */}
      <style>{`
        @keyframes typewriter-blink {
          0%, 50% { opacity: 1; }
          50.01%, 100% { opacity: 0; }
        }
      `}</style>
    </span>
  );
}