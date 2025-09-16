"use client";
import { useEffect, useMemo, useState } from "react";
import { REGIONS } from "@/lib/constants";

export default function HospitalsPanel() {
  const [items, setItems] = useState<any[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/hospitals");
    const j = await res.json();
    setItems(j.hospitals || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => items.filter((h) => `${h.name} ${h.city}`.toLowerCase().includes(q.toLowerCase())), [items, q]);

  async function onCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/hospitals", { method: "POST", body: fd });
    if (res.ok) {
      window.dispatchEvent(new CustomEvent("toast", { detail: { type: "success", message: "Hôpital ajouté" } }));
      (e.target as HTMLFormElement).reset();
      load();
    } else {
      window.dispatchEvent(new CustomEvent("toast", { detail: { type: "error", message: "Erreur d’ajout" } }));
    }
  }

  async function onDelete(id: string) {
    if (!confirm("Supprimer cet hôpital ?")) return;
    const res = await fetch(`/api/hospitals/${id}`, { method: "DELETE" });
    if (res.ok) {
      setItems((prev) => prev.filter((x) => x.id !== id));
      window.dispatchEvent(new CustomEvent("toast", { detail: { type: "success", message: "Supprimé" } }));
    }
  }

  return (
    <main className="container py-10">
      <h1 className="text-2xl font-bold">Hôpitaux</h1>
      <form onSubmit={onCreate} className="mt-4 grid gap-2 md:grid-cols-6">
        <input name="name" placeholder="Nom" className="p-2 rounded-md ring-1 ring-black/10 bg-white" required />
        <input name="city" placeholder="Ville" className="p-2 rounded-md ring-1 ring-black/10 bg-white" required />
        <select name="region" className="p-2 rounded-md ring-1 ring-black/10 bg-white" required>
          <option value="">Région</option>
          {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <input name="phone" placeholder="Téléphone" className="p-2 rounded-md ring-1 ring-black/10 bg-white" />
        <input name="email" placeholder="Email" className="p-2 rounded-md ring-1 ring-black/10 bg-white" />
        <button className="btn btn-primary">Ajouter</button>
      </form>

      <div className="mt-6 flex items-center gap-2">
        <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Recherche…" className="p-2 rounded-md ring-1 ring-black/10 bg-white w-full md:w-80" />
        {loading && <span className="text-sm text-black/60">Chargement…</span>}
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-black/10">
              <th className="py-2">Nom</th>
              <th className="py-2">Ville</th>
              <th className="py-2">Région</th>
              <th className="py-2">Contact</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(h => (
              <tr key={h.id} className="border-b border-black/5">
                <td className="py-2">{h.name}</td>
                <td className="py-2">{h.city}</td>
                <td className="py-2">{h.region}</td>
                <td className="py-2">{h.phone || "-"} {h.email ? ` / ${h.email}` : ""}</td>
                <td className="py-2 text-right">
                  <button onClick={()=>onDelete(h.id)} className="text-red-600 hover:underline">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}


