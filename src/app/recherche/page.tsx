"use client";
import { useEffect, useState } from "react";

export default function Page({ searchParams }: { searchParams?: { city?: string; bloodGroup?: string } }) {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [city, setCity] = useState((searchParams?.city || "").trim());
  const [bloodGroup, setBloodGroup] = useState((searchParams?.bloodGroup || "").trim());

  async function search(e?: React.FormEvent) {
    e?.preventDefault();
    setLoading(true);
    const qs = new URLSearchParams();
    if (city) qs.set("city", city);
    if (bloodGroup) qs.set("bloodGroup", bloodGroup);
    const res = await fetch(`/api/donors?${qs.toString()}`);
    const j = await res.json();
    setResults(j.donors || []);
    setLoading(false);
  }

  useEffect(() => {
    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="container py-10">
      <h1 className="text-3xl font-bold">Recherche de donneurs</h1>
      <form className="mt-4 flex gap-2" onSubmit={search}>
        <input value={city} onChange={e=>setCity(e.target.value)} placeholder="Ville (ex: Conakry)" className="w-full p-2 rounded-md ring-1 ring-black/10 bg-white" />
        <select value={bloodGroup} onChange={e=>setBloodGroup(e.target.value)} className="p-2 rounded-md ring-1 ring-black/10 bg-white">
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

      <div className="mt-6">
        {loading ? <div className="text-sm text-black/60">Chargement…</div> : (
          results.length === 0 ? <div className="text-sm text-black/60">Aucun donneur trouvé.</div> : (
            <ul className="grid gap-3">
              {results.map(d => (
                <li key={d.id} className="p-4 rounded-lg ring-1 ring-black/10 bg-white">
                  <div className="font-medium">{d.fullName} · {d.bloodGroup}</div>
                  <div className="text-sm text-black/70">{d.city}, {d.region} · {d.phone}{d.email ? ` · ${d.email}` : ""}</div>
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </main>
  );
}




