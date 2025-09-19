"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved ? saved === "dark" : systemPrefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
    setMounted(true);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      onClick={toggle}
      aria-label="Basculer thème"
      aria-pressed={dark}
      title={dark ? "Mode sombre" : "Mode clair"}
      className="inline-flex items-center justify-center w-10 h-10 rounded-lg ring-1 ring-black/10 bg-white text-black dark:bg-white/10 dark:text-white/90 dark:ring-white/10 active:scale-[0.98]"
    >
      {mounted ? (dark ? "☾" : "☀") : ""}
    </button>
  );
}


