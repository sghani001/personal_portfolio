import React, { createContext, useContext } from "react";
import { useGemStats } from "../hooks/useGemStats";

const GemStatsContext = createContext(null);

export function GemStatsProvider({ children }) {
  const stats = useGemStats();
  return <GemStatsContext.Provider value={stats}>{children}</GemStatsContext.Provider>;
}

export function useGemStatsContext() {
  const ctx = useContext(GemStatsContext);
  if (!ctx) throw new Error("useGemStatsContext must be used within GemStatsProvider");
  return ctx;
}
