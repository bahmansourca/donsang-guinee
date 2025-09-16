import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <img src="/guinea-map.svg" alt="Carte de la Guinée" className="absolute inset-0 w-full h-full object-cover opacity-20 -z-10" />
        <div className="container grid gap-10 md:grid-cols-2 items-center py-16 md:py-24">
          <div>
            <span className="badge">Plateforme officielle</span>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
              Sauvez une vie <span className="text-[var(--brand-red)]">en un clic</span>
            </h1>
            <p className="mt-4 text-lg text-black/70">
              Rejoignez le réseau national de donneurs volontaires en Guinée. Ensemble, répondons aux urgences.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link href="/inscription" className="btn btn-primary">Devenir donneur</Link>
              <Link href="/quiz" className="btn" style={{border:"1px solid rgba(0,0,0,0.1)"}}>Vérifier mon admissibilité</Link>
            </div>
            <div className="mt-6 inline-flex items-center gap-3">
              <img src="/logo-drop-guinea.svg" alt="goutte Guinée" width="40" height="40" />
              <span className="text-sm text-black/60">Donnez aujourd’hui, sauvez demain</span>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl bg-white ring-1 ring-black/10 p-6">
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


