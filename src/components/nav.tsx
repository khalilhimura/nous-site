"use client";

import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";

type Theme = "system" | "light" | "dark";
const subscribe = (notify: () => void) => {
  window.addEventListener("nous-theme", notify);
  window.addEventListener("storage", notify);
  return () => { window.removeEventListener("nous-theme", notify); window.removeEventListener("storage", notify); };
};
const getTheme = (): Theme => {
  try { const saved = localStorage.getItem("nous-theme"); return saved === "light" || saved === "dark" ? saved : "system"; }
  catch { return "system"; }
};
function selectTheme(value: Theme) {
  document.documentElement.setAttribute("data-theme", value);
  try { localStorage.setItem("nous-theme", value); } catch { /* Selection still works for this visit. */ }
  window.dispatchEvent(new Event("nous-theme"));
}
export function Nav({ home = false }: { home?: boolean }) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "system" as Theme);
  useEffect(() => { document.documentElement.setAttribute("data-theme", theme); }, [theme]);
  const prefix = home ? "" : "/";
  return <header className="site-header shell">
    <nav aria-label="Reading" className="reading-nav">
      <a href={`${prefix}#meaning`}>Explore the entries</a>
      <a href={`${prefix}#anaxagoras`}>Greek philosophy</a>
      <a href={`${prefix}#christian_theology`}>Christian theology</a>
      <a href={`${prefix}#modern_usage`}>Modern usage</a>
    </nav>
    <div className="theme-control" role="group" aria-label="Color theme">
      {(["system", "light", "dark"] as const).map(value => <button key={value} type="button" aria-pressed={theme === value} onClick={() => selectTheme(value)}>{value}</button>)}
    </div>
    <div className="header-note"><span className="eyebrow">A dictionary of understanding</span><p>One word, seven connected entries.<br />From ancient thought to everyday language.</p></div>
    <Link className="home-mark" href="/" aria-label="Nous home" lang="el">νοῦς</Link>
  </header>;
}
