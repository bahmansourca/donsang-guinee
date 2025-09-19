"use client";
import Link from "next/link";
import { useState } from "react";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button
        aria-label="Ouvrir le menu"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center w-10 h-10 rounded-lg ring-1 ring-black/10 bg-white shadow"
      >
        <span className="block w-5 h-0.5 bg-black mb-1" />
        <span className="block w-5 h-0.5 bg-black mb-1" />
        <span className="block w-5 h-0.5 bg-black" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-xl p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="font-semibold">Menu</div>
              <button aria-label="Fermer" onClick={() => setOpen(false)} className="text-black/60">✕</button>
            </div>
            <nav className="grid gap-3 text-sm">
              <Link href="/" onClick={() => setOpen(false)}>Accueil</Link>
              <Link href="/criteres" onClick={() => setOpen(false)}>Qui peut donner ?</Link>
              <Link href="/etapes" onClick={() => setOpen(false)}>Étapes du don</Link>
              <Link href="/quiz" onClick={() => setOpen(false)}>Quiz</Link>
              <Link href="/recherche" onClick={() => setOpen(false)}>Recherche</Link>
              <Link href="/actualites" onClick={() => setOpen(false)}>Actualités</Link>
              <Link href="/inscription" onClick={() => setOpen(false)} className="btn btn-primary mt-2 text-center">Devenir donneur</Link>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}


