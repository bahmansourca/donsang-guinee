import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import Toaster from "@/components/Toaster";
import BackButton from "@/components/BackButton";
import ThemeToggle from "@/components/ThemeToggle";
import { I18nProvider, useI18n } from "@/lib/i18n";
import LangSwitcher from "@/components/LangSwitcher";
import NavLinks from "@/components/NavLinks";
import MobileNav from "@/components/MobileNav";
import HeaderCTA from "@/components/HeaderCTA";
import FooterContent from "@/components/FooterContent";

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
        <I18nProvider>
        <header className="border-b border-black/10 dark:border-white/10 sticky top-0 z-50 bg-white/80 backdrop-blur">
          <div className="container flex items-center justify-between py-3">
            <Link href="/" className="flex items-center gap-3">
              {/* logo */}
              <img src="/logo-drop-guinea.svg" alt="Logo DonSang Guinée" width="36" height="36" />
              <span className="text-lg font-bold tracking-tight">DONSANG GUINÉE</span>
            </Link>
            <NavLinks />
            <div className="flex items-center gap-3">
              <MobileNav />
              <BackButton />
              <ThemeToggle />
              <LangSwitcher />
              <HeaderCTA />
            </div>
          </div>
        </header>
        <a href="#top" className="fixed bottom-5 right-5 z-40 inline-flex items-center justify-center w-11 h-11 rounded-full bg-[var(--brand-red)] text-white shadow-lg hover:opacity-90" aria-label="Retour en haut">↑</a>
        {children}
        <Toaster />
        <footer className="mt-16 border-t border-black/10 dark:border-white/10">
          <FooterContent />
        </footer>
        </I18nProvider>
      </body>
    </html>
  );
}
