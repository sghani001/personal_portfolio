import React, { useMemo } from "react";
import { useGetGemsQuery } from "../store/portfolioApi";

export default function Hero({ data }) {
  const roles = useMemo(() => (data && data.titles) || ["Software Engineer"], [data]);
  const [titleIndex, setTitleIndex] = React.useState(0);
  const [displayText, setDisplayText] = React.useState(roles[0] || "");
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const currentRole = roles[titleIndex];
    const isFinishing = !isDeleting && displayText === currentRole;
    const isStarting = isDeleting && displayText === "";
    if (isFinishing) {
      const t = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(t);
    }
    if (isStarting) {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % roles.length);
      return;
    }
    const nextText = isDeleting
      ? currentRole.substring(0, displayText.length - 1)
      : currentRole.substring(0, displayText.length + 1);
    const timer = setTimeout(() => setDisplayText(nextText), isDeleting ? 40 : 100);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex, roles]);

  const gemsData = useGetGemsQuery();
  const gems = Array.isArray(gemsData.data) ? gemsData.data : gemsData.data?.value || [];
  const totalDownloads = gems.reduce((sum, g) => sum + (g.downloads || 0), 0);
  const downloadDisplay = totalDownloads >= 1000 ? `${(totalDownloads / 1000).toFixed(1)}k+` : `${totalDownloads}+`;

  const metrics = data?.metrics?.length
    ? data.metrics.map((m) =>
        m.label === "Gem downloads" ? { ...m, value: downloadDisplay } : m
      )
    : [];

  const socialUrls = data?.socials || [];

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    window.history.pushState(null, "", `#${id}`);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center px-6 pt-24 pb-8">
      <div className="max-w-content mx-auto w-full">
        <div className="bg-bg-secondary border border-border rounded-window overflow-hidden mb-8">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <span className="ml-3 font-mono text-xs text-text-muted select-none">syed@remote:~</span>
          </div>
          <div className="p-5 md:p-6">
            <p className="font-mono text-xs text-text-muted mb-3">
              <span className="text-accent-secondary">guest</span>@<span className="text-accent-primary">syedghani.is-a.dev</span>
              <span className="text-text-muted">:</span><span className="text-accent-secondary">~</span><span className="text-text-muted">$ </span>
              <span className="text-text-secondary">whoami</span>
            </p>
            <h1 className="font-mono font-medium text-xl md:text-[22px] text-accent-primary leading-snug mb-3">
              {data?.name || "Syed Ghani"}
            </h1>
            <div className="h-7 flex items-center mb-3">
              <span className="font-mono text-xs text-text-muted mr-2">$</span>
              <span className="font-mono text-base md:text-lg font-medium text-accent-primary">{displayText}</span>
              <span className="w-[6px] h-[14px] bg-accent-primary ml-1 animate-pulse" />
            </div>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xl">
              {data?.headline || ""}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-[10px] mb-8">
          {metrics.slice(0, 3).map((m, i) => (
            <div key={i} className="inline-flex items-center gap-2 px-3 py-1.5 border border-border rounded-card">
              <span className="font-mono font-medium text-text-primary text-lg">{m.value}</span>
              <span className="font-mono text-[11px] text-text-muted lowercase">{m.label.replace(/\s+/g, "_")}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={scrollTo("experience")}
            className="inline-flex items-center px-4 py-2 rounded-card border border-accent-primary text-accent-primary font-mono text-sm hover:bg-accent-primary/10 transition-all duration-150">
            View experience
          </button>
          {socialUrls.find((s) => s.icon === "github") && (
            <a href={socialUrls.find((s) => s.icon === "github").url} target="_blank" rel="noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-card border border-border text-text-secondary font-mono text-sm hover:border-border-hover transition-colors duration-150">
              GitHub
            </a>
          )}
          <button type="button" onClick={scrollTo("contact")}
            className="inline-flex items-center px-4 py-2 rounded-card border border-border text-text-secondary font-mono text-sm hover:border-border-hover transition-colors duration-150">
            Contact
          </button>
        </div>
      </div>
    </section>
  );
}
