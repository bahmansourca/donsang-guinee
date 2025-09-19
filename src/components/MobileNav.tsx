"use client";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { useEffect, useState } from "react";

export default function MobileNav() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);
  return (
    <div className="md:hidden">
      <button
        aria-label="Ouvrir le menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center w-10 h-10 rounded-lg ring-1 ring-black/10 bg-white shadow"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-[80]">
          {/* arrière-plan assombri cliquable */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          {/* panneau intégral dans un cadre rouge */}
          <aside className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-[var(--brand-red)] shadow-2xl ring-1 ring-black/10 p-6 flex flex-col text-black">
            <div className="flex items-center justify-between">
              <div className="font-semibold tracking-tight text-white">Menu</div>
              <button aria-label="Fermer" onClick={() => setOpen(false)} className="inline-flex items-center justify-center w-9 h-9 rounded-md ring-1 ring-white/20 text-white">✕</button>
            </div>
            <nav className="mt-5 grid gap-2 text-base font-medium text-black">
              <Link href="/" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md hover:brightness-95" style={{ background: "var(--brand-red)" }}>{t("nav_home")}</Link>
              <Link href="/criteres" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md hover:brightness-95" style={{ background: "var(--brand-red)" }}>{t("nav_who")}</Link>
              <Link href="/etapes" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md hover:brightness-95" style={{ background: "var(--brand-red)" }}>{t("nav_steps")}</Link>
              <Link href="/quiz" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md hover:brightness-95" style={{ background: "var(--brand-red)" }}>{t("nav_quiz")}</Link>
              <Link href="/recherche" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md hover:brightness-95" style={{ background: "var(--brand-red)" }}>{t("nav_search")}</Link>
              <Link href="/actualites" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md hover:brightness-95" style={{ background: "var(--brand-red)" }}>{t("nav_news")}</Link>
              <Link href="/inscription" onClick={() => setOpen(false)} className="block mt-3 text-center px-3 py-2 rounded-md bg-white text-black font-semibold">{t("cta_donor")}</Link>
            </nav>
          </aside>
        </div>
      )}
    </div>
  );
}


