import React from "react";
import { FaExternalLinkAlt, FaDownload, FaGem, FaArrowRight, FaRegFileAlt, FaPaperPlane, FaRocket, FaLink, FaNetworkWired, FaAws } from "react-icons/fa";
import { SiRuby, SiReact, SiVite, SiTailwindcss, SiDocker, SiStripe, SiGithub, SiMaterialdesign, SiRedux, SiPostgresql, SiRedis } from "react-icons/si";

const DEFAULT_SIZE = 18;

export const IconArrow = ({ size = DEFAULT_SIZE, rotate = 0 }) => (
  <FaArrowRight size={size} style={{ transform: `rotate(${rotate}deg)` }} />
);

export const IconExternal = ({ size = DEFAULT_SIZE }) => (
  <FaExternalLinkAlt size={size} />
);

export const IconDownload = ({ size = DEFAULT_SIZE }) => (
  <FaDownload size={size} />
);

export const IconGem = ({ size = DEFAULT_SIZE }) => (
  <FaGem size={size} />
);

export function IconForTech({ name = "", size = DEFAULT_SIZE }) {
  if (!name) return <FaExternalLinkAlt size={size} />;
  const n = name.toLowerCase();
  if (n.includes("ruby")) return <SiRuby size={size} />;
  if (n.includes("react")) return <SiReact size={size} />;
  if (n.includes("vite")) return <SiVite size={size} />;
  if (n.includes("tailwind")) return <SiTailwindcss size={size} />;
  if (n.includes("docker")) return <SiDocker size={size} />;
  if (n.includes("aws") || n.includes("amazon") || n.includes("cloud") || n.includes("deploy")) return <FaAws size={size} />;
  if (n.includes("stripe")) return <SiStripe size={size} />;
  if (n.includes("github")) return <SiGithub size={size} />;
  if (n.includes("material") || n.includes("mui")) return <SiMaterialdesign size={size} />;
  if (n.includes("redux")) return <SiRedux size={size} />;
  if (n.includes("postgres")) return <SiPostgresql size={size} />;
  if (n.includes("redis")) return <SiRedis size={size} />;
  if (n.includes("doc") || n.includes("proposal") || n.includes("file")) return <FaRegFileAlt size={size} />;
  if (n.includes("chat") || n.includes("discovery")) return <FaPaperPlane size={size} />;
  if (n.includes("rocket")) return <FaRocket size={size} />;
  if (n.includes("link") || n.includes("integration")) return <FaLink size={size} />;
  if (n.includes("network") || n.includes("scale") || n.includes("architecture")) return <FaNetworkWired size={size} />;
  // fallback to gem icon for libraries/gems
  return <FaGem size={size} />;
}

export default IconForTech;
