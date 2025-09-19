import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import Toaster from "@/components/Toaster";
import BackButton from "@/components/BackButton";

export const metadata: Metadata = {
  title: "Don de Sang Guinée",
  description: "Sauvez des vies, donnez votre sang. Plateforme officielle de don de sang en Guinée.",
  metadataBase: new URL("https://donsang-guinee.example"),
  openGraph: {
    title: "Don de Sang Guinée",
    description: "Plateforme officielle de don de sang en Guinée. Devenez donneur, trouvez un centre, recevez les alertes.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" id="top">
      <body className={`antialiased`}>
        <header className="border-b border-black/10 dark:border-white/10 sticky top-0 z-50 bg-white/80 backdrop-blur">
          <div className="container flex items-center justify-between py-3">
            <Link href="/" className="flex items-center gap-3">
              {/* logo */}
              <img src="/logo-drop-guinea.svg" alt="Logo DonSang Guinée" width="36" height="36" />
              <span className="text-lg font-bold tracking-tight">DONSANG GUINÉE</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/criteres" className="hover:underline">Qui peut donner ?</Link>
              <Link href="/etapes" className="hover:underline">Étapes du don</Link>
              <Link href="/quiz" className="hover:underline">Quiz</Link>
              <Link href="/recherche" className="hover:underline">Recherche</Link>
              <Link href="/actualites" className="hover:underline">Actualités</Link>
            </nav>
            <div className="flex items-center gap-3">
              <div className="md:hidden overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-4 text-sm whitespace-nowrap pr-2">
                  <Link href="/criteres">Qui peut donner ?</Link>
                  <Link href="/etapes">Étapes du don</Link>
                  <Link href="/quiz">Quiz</Link>
                  <Link href="/recherche">Recherche</Link>
                  <Link href="/actualites">Actualités</Link>
                </div>
              </div>
              <BackButton />
              <Link href="/inscription" className="btn btn-primary">Devenir donneur</Link>
            </div>
          </div>
        </header>
        <a href="#top" className="fixed bottom-5 right-5 z-40 inline-flex items-center justify-center w-11 h-11 rounded-full bg-[var(--brand-red)] text-white shadow-lg hover:opacity-90" aria-label="Retour en haut">↑</a>
        {children}
        <Toaster />
        <footer className="mt-16 border-t border-black/10 dark:border-white/10">
          <div className="container py-8 grid gap-6 md:grid-cols-3 text-sm">
            <div>
              <div className="font-semibold mb-2">Liens utiles</div>
              <ul className="space-y-1">
                <li><a className="hover:underline" href="#" target="_blank" rel="noreferrer">Ministère de la Santé</a></li>
                <li><a className="hover:underline" href="#" target="_blank" rel="noreferrer">Croix-Rouge Guinée</a></li>
                <li><a className="hover:underline" href="#" target="_blank" rel="noreferrer">Partenaires</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-2">Contact</div>
              <p>Email: contact@donsang-guinee.org</p>
              <p>Tél: +224 600 00 00 00</p>
            </div>
            <div>
              <div className="font-semibold mb-2">Mentions</div>
              <p className="text-black/60 dark:text-white/60">© {new Date().getFullYear()} Don de Sang Guinée</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
