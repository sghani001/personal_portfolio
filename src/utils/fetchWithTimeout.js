/**
 * fetch() that gives up instead of hanging forever.
 *
 * Every widget on this page degrades to a fallback when its request fails, but
 * a request that never settles never *reaches* that fallback — the spinner just
 * stays. That's a real risk here: the LeetCode fallback API is a free Render
 * instance that cold-starts, and a sleeping dyno can leave a connection open for
 * a minute or more.
 *
 * A timeout turns "hangs indefinitely" into "shows the fallback in 8 seconds".
 */
export function fetchWithTimeout(url, options = {}, timeoutMs = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(timer));
}
