import Link from "next/link";
import HeroText from "@/components/HeroText";
import QuickSearch from "@/components/QuickSearch";
import HomeInfoCards from "@/components/HomeInfoCards";

export default function Home() {
  // Client-only texts via i18n helper
  // Falls back to FR by default
  // Note: this is a Server Component; for the static labels we keep FR, and dynamic text is client via small islands below.
  return (
    <main>
      <section className="relative overflow-hidden" style={{minHeight: "55vh"}}>
        {/* Grande image de la donneuse en <img> direct pour compatibilité CDN */}
        <img
          src="/hero.jpg"
          alt="Donneuse africaine"
          loading="eager"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-contain bg-white opacity-100 z-0"
        />
        {/* Logo goutte + carte Guinée */}
        <div className="absolute right-[8%] top-20 md:top-24 z-0">
          <div className="relative w-36 h-36 md:w-52 md:h-52">
            <div className="absolute inset-0 rounded-full bg-[var(--brand-red)]/95 shadow-2xl" />
            <img src="/guinea-map.svg" alt="Carte Guinée" className="absolute inset-6 md:inset-8 object-contain" />
          </div>
        </div>
        <div className="container grid gap-10 md:grid-cols-2 items-center py-12 md:py-20 relative z-10">
          <HeroText />
          <div className="relative">
            <QuickSearch />
          </div>
        </div>
      </section>

      <HomeInfoCards />
    </main>
  );
}




