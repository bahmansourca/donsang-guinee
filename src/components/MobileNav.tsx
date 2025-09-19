"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MobileNav() {
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
          {/* zone clic fermante */}
          <div className="absolute inset-0" onClick={() => setOpen(false)} />
          {/* bande blanche derrière le panneau pour une lisibilité parfaite */}
          <div className="absolute right-0 top-0 h-full w-[86vw] max-w-[420px] bg-white" />
          {/* panneau d’options */}
          <aside className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl ring-1 ring-black/10 p-6 flex flex-col">
            <div className="flex items-center justify-between">
              <div className="font-semibold tracking-tight">Menu</div>
              <button aria-label="Fermer" onClick={() => setOpen(false)} className="inline-flex items-center justify-center w-9 h-9 rounded-md ring-1 ring-black/10">✕</button>
            </div>
            <nav className="mt-5 grid gap-2 text-base font-medium text-black">
              <Link href="/" onClick={() => setOpen(false)} className="px-2 py-2 rounded hover:bg-black/5">Accueil</Link>
              <Link href="/criteres" onClick={() => setOpen(false)} className="px-2 py-2 rounded hover:bg-black/5">Qui peut donner ?</Link>
              <Link href="/etapes" onClick={() => setOpen(false)} className="px-2 py-2 rounded hover:bg-black/5">Étapes du don</Link>
              <Link href="/quiz" onClick={() => setOpen(false)} className="px-2 py-2 rounded hover:bg-black/5">Quiz</Link>
              <Link href="/recherche" onClick={() => setOpen(false)} className="px-2 py-2 rounded hover:bg-black/5">Recherche</Link>
              <Link href="/actualites" onClick={() => setOpen(false)} className="px-2 py-2 rounded hover:bg-black/5">Actualités</Link>
              <Link href="/inscription" onClick={() => setOpen(false)} className="btn btn-primary mt-3 text-center">Devenir donneur</Link>
            </nav>
          </aside>
        </div>
      )}
    </div>
  );
}


