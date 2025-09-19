"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDark = saved ? saved === "dark" : false;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button onClick={toggle} aria-label="Basculer thème" className="inline-flex items-center justify-center w-10 h-10 rounded-lg ring-1 ring-black/10 bg-white text-black dark:bg-white/10 dark:text-white/90 dark:ring-white/10">
      {dark ? "☾" : "☀"}
    </button>
  );
}


