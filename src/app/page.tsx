import Link from "next/link";
import HeroText from "@/components/HeroText";

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
            <div className="rounded-2xl bg-white/90 ring-1 ring-black/10 p-6 shadow-lg">
              <h3 className="font-semibold">Recherche de donneurs</h3>
              <form action="/recherche" className="mt-4 grid md:grid-cols-2 gap-3">
                <input name="city" placeholder="Ville (ex: Conakry)" className="w-full p-2 rounded-md ring-1 ring-black/10 bg-white" />
                <select name="bloodGroup" className="w-full p-2 rounded-md ring-1 ring-black/10 bg-white">
                  <option value="">Groupe sanguin</option>
                  <option value="O_POS">O+</option>
                  <option value="O_NEG">O-</option>
                  <option value="A_POS">A+</option>
                  <option value="A_NEG">A-</option>
                  <option value="B_POS">B+</option>
                  <option value="B_NEG">B-</option>
                  <option value="AB_POS">AB+</option>
                  <option value="AB_NEG">AB-</option>
                </select>
                <button className="btn btn-primary md:col-span-2">Rechercher</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-12 grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl ring-1 ring-black/10 bg-white">
          <h3 className="font-semibold">Qui peut donner ?</h3>
          <p className="mt-2 text-sm text-black/70">Critères d’éligibilité pour devenir donneur.</p>
          <Link href="/criteres" className="mt-3 inline-block text-[var(--brand-red)] font-medium">Découvrir les critères →</Link>
        </div>
        <div className="p-6 rounded-xl ring-1 ring-black/10 bg-white">
          <h3 className="font-semibold">Comment se déroule un don ?</h3>
          <p className="mt-2 text-sm text-black/70">Accueil, entretien, prélèvement et collation.</p>
          <Link href="/etapes" className="mt-3 inline-block text-[var(--brand-red)] font-medium">Voir les étapes du don →</Link>
        </div>
        <div className="p-6 rounded-xl ring-1 ring-black/10 bg-white">
          <h3 className="font-semibold">C’est votre premier don ?</h3>
          <p className="mt-2 text-sm text-black/70">Tout ce qu’il faut savoir pour être serein.</p>
          <Link href="/premier-don" className="mt-3 inline-block text-[var(--brand-red)] font-medium">Je me renseigne →</Link>
        </div>
      </section>
    </main>
  );
}




