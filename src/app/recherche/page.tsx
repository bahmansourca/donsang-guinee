export default function Page({ searchParams }: { searchParams?: { city?: string; bloodGroup?: string } }) {
  const city = (searchParams?.city || "").trim();
  const bloodGroup = (searchParams?.bloodGroup || "").trim();
  return (
    <main className="container py-10">
      <h1 className="text-3xl font-bold">Recherche de donneurs</h1>
      <form className="mt-4 flex gap-2" action="/recherche" method="get">
        <input name="city" defaultValue={city} placeholder="Ville (ex: Conakry)" className="w-full p-2 rounded-md ring-1 ring-black/10 bg-white" />
        <select name="bloodGroup" defaultValue={bloodGroup} className="p-2 rounded-md ring-1 ring-black/10 bg-white">
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
        <button className="btn btn-primary" type="submit">Rechercher</button>
      </form>
      <p className="mt-6 text-sm text-black/60">Les résultats en direct nécessitent la base de données et les APIs (à venir dans le prochain lot).</p>
    </main>
  );
}


