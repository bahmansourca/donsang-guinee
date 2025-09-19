"use client";
import { useEffect, useMemo, useState } from "react";
import { BLOOD_GROUPS, REGIONS } from "@/lib/constants";

type Donor = {
  id: string;
  fullName: string;
  bloodGroup: string;
  phone: string;
  email?: string | null;
  city: string;
  region: string;
  verified?: boolean;
  createdAt?: string;
};

export default function AdminDonorsPage() {
  const [items, setItems] = useState<Donor[]>([]);
  const [q, setQ] = useState("");
  const [bg, setBg] = useState("");
  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  async function load() {
    setLoading(true);
    const qs = new URLSearchParams();
    if (q) qs.set("city", q);
    if (bg) qs.set("bloodGroup", bg);
    if (region) qs.set("region", region);
    const res = await fetch(`/api/donors?${qs.toString()}`);
    const j = await res.json();
    setItems(j.donors || []);
    setLoading(false);
  }

  useEffect(() => { load(); /* initial */ }, []);

  const filtered = useMemo(() => {
    return items.filter(d =>
      (!q || `${d.fullName} ${d.city}`.toLowerCase().includes(q.toLowerCase())) &&
      (!bg || d.bloodGroup === bg) &&
      (!region || d.region === region)
    );
  }, [items, q, bg, region]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  async function onCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/donors", { method: "POST", body: fd });
    if (res.ok) {
      (e.target as HTMLFormElement).reset();
      window.dispatchEvent(new CustomEvent("toast", { detail: { type: "success", message: "Donneur ajouté" } }));
      load();
    } else {
      const j = await res.json().catch(() => ({}));
      window.dispatchEvent(new CustomEvent("toast", { detail: { type: "error", message: j?.error || "Erreur" } }));
    }
  }

  async function onDelete(id: string) {
    if (!confirm("Supprimer ce donneur ?")) return;
    const r = await fetch(`/api/donors/${id}`, { method: "DELETE" });
    if (r.ok) {
      setItems(prev => prev.filter(x => x.id !== id));
      window.dispatchEvent(new CustomEvent("toast", { detail: { type: "success", message: "Supprimé" } }));
    }
  }

  return (
    <main className="container py-10">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Donneurs</h1>
        <div className="flex gap-2">
          <a className="btn" style={{border:"1px solid rgba(0,0,0,0.1)"}} href="/admin/donneurs/print" target="_blank" rel="noreferrer">Imprimer / PDF</a>
          <a className="btn" style={{border:"1px solid rgba(0,0,0,0.1)"}} href="/api/donors/export">Exporter CSV</a>
        </div>
      </div>

      <form onSubmit={onCreate} className="mt-4 grid gap-2 md:grid-cols-6">
        <input name="fullName" placeholder="Nom complet" className="p-2 rounded-md ring-1 ring-black/10 bg-white" required />
        <select name="bloodGroup" className="p-2 rounded-md ring-1 ring-black/10 bg-white" required>
          <option value="">Groupe</option>
          {BLOOD_GROUPS.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
        </select>
        <input name="phone" placeholder="Téléphone" className="p-2 rounded-md ring-1 ring-black/10 bg-white" required />
        <input name="email" placeholder="Email (optionnel)" className="p-2 rounded-md ring-1 ring-black/10 bg-white" />
        <input name="city" placeholder="Ville" className="p-2 rounded-md ring-1 ring-black/10 bg-white" required />
        <select name="region" className="p-2 rounded-md ring-1 ring-black/10 bg-white" required>
          <option value="">Région</option>
          {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <button className="btn btn-primary md:col-span-6">Ajouter</button>
      </form>

      <div className="mt-6 flex flex-wrap gap-2 items-center">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Recherche (nom/ville)…" className="p-2 rounded-md ring-1 ring-black/10 bg-white w-full md:w-64" />
        <select value={bg} onChange={e=>setBg(e.target.value)} className="p-2 rounded-md ring-1 ring-black/10 bg-white">
          <option value="">Tous groupes</option>
          {BLOOD_GROUPS.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
        </select>
        <select value={region} onChange={e=>setRegion(e.target.value)} className="p-2 rounded-md ring-1 ring-black/10 bg-white">
          <option value="">Toutes régions</option>
          {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <button type="button" onClick={load} className="btn" style={{border:"1px solid rgba(0,0,0,0.1)"}}>Actualiser</button>
        {loading && <span className="text-sm text-black/60">Chargement…</span>}
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-black/10">
              <th className="py-2">Nom</th>
              <th className="py-2">Groupe</th>
              <th className="py-2">Contact</th>
              <th className="py-2">Localisation</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paged.map(d => (
              <tr key={d.id} className="border-b border-black/5">
                <td className="py-2 font-medium">{d.fullName}</td>
                <td className="py-2">{BLOOD_GROUPS.find(x=>x.value===d.bloodGroup)?.label || d.bloodGroup}</td>
                <td className="py-2">
                  <a className="text-[var(--brand-red)] hover:underline" href={`tel:${d.phone}`}>{d.phone}</a>
                  {d.email ? <a className="ml-1 text-[var(--brand-red)] hover:underline" href={`mailto:${d.email}`}>{d.email}</a> : null}
                </td>
                <td className="py-2">{d.city}, {d.region}</td>
                <td className="py-2">
                  <button onClick={()=>onDelete(d.id)} className="text-red-600 hover:underline">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && !loading && (
          <div className="text-sm text-black/60 py-6">Aucun résultat.</div>
        )}
        {filtered.length > 0 && (
          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="text-black/60">Page {page} / {totalPages}</div>
            <div className="flex gap-2">
              <button disabled={page<=1} onClick={()=>setPage(p=>Math.max(1,p-1))} className="btn" style={{border:"1px solid rgba(0,0,0,0.1)", opacity: page<=1?0.5:1}}>Précédent</button>
              <button disabled={page>=totalPages} onClick={()=>setPage(p=>Math.min(totalPages,p+1))} className="btn" style={{border:"1px solid rgba(0,0,0,0.1)", opacity: page>=totalPages?0.5:1}}>Suivant</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}


