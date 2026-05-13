/** Maps skill label to accent class for glass pills (React / Ruby / AWS palette). */
export function skillPillClass(label) {
  const s = String(label).toLowerCase();
  if (
    s.includes("react") ||
    s.includes("next") ||
    s.includes("javascript") ||
    s.includes("redux") ||
    s.includes("vite") ||
    s.includes("tailwind")
  ) {
    return "skill-pill--react";
  }
  if (
    s.includes("ruby") ||
    s.includes("rails") ||
    s.includes("sidekiq") ||
    s.includes("rspec")
  ) {
    return "skill-pill--ruby";
  }
  if (
    s.includes("aws") ||
    s.includes("s3") ||
    s.includes("ec2") ||
    s.includes("lambda") ||
    s.includes("cloudfront")
  ) {
    return "skill-pill--aws";
  }
  if (s.includes("python") || s.includes("django")) {
    return "skill-pill--python";
  }
  return "skill-pill--neutral";
}
