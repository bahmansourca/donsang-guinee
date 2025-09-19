"use client";
import { useEffect, useState } from "react";
import { BLOOD_GROUPS, REGIONS } from "@/lib/constants";

export default function AdminAlertsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [bg, setBg] = useState("");
  const [region, setRegion] = useState("");

  async function load() {
    setLoading(true);
    const qs = new URLSearchParams();
    if (bg) qs.set("bloodGroup", bg);
    if (region) qs.set("region", region);
    const res = await fetch(`/api/alerts?${qs.toString()}`);
    const j = await res.json();
    setItems(j.alerts || []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function onCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/alerts", { method: "POST", body: fd });
    if (res.ok) { (e.target as HTMLFormElement).reset(); load(); }
  }

  async function onClose(id: string) {
    await fetch(`/api/alerts/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "RESOLVED" }) });
    load();
  }

  async function onDelete(id: string) {
    if (!confirm("Supprimer l’alerte ?")) return;
    await fetch(`/api/alerts/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <main className="container py-10">
      <h1 className="text-2xl font-bold">Alertes urgentes</h1>

      <form onSubmit={onCreate} className="mt-4 grid gap-2 md:grid-cols-4">
        <input name="title" placeholder="Titre" className="p-2 rounded-md ring-1 ring-black/10 bg-white" required />
        <select name="bloodGroup" className="p-2 rounded-md ring-1 ring-black/10 bg-white" required>
          <option value="">Groupe</option>
          {BLOOD_GROUPS.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
        </select>
        <select name="region" className="p-2 rounded-md ring-1 ring-black/10 bg-white" required>
          <option value="">Région</option>
          {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <textarea name="content" placeholder="Détails…" className="p-2 rounded-md ring-1 ring-black/10 bg-white md:col-span-4" required />
        <button className="btn btn-primary md:col-span-4">Créer</button>
      </form>

      <div className="mt-6 flex gap-2 items-center">
        <select value={bg} onChange={e=>setBg(e.target.value)} className="p-2 rounded-md ring-1 ring-black/10 bg-white">
          <option value="">Tous groupes</option>
          {BLOOD_GROUPS.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
        </select>
        <select value={region} onChange={e=>setRegion(e.target.value)} className="p-2 rounded-md ring-1 ring-black/10 bg-white">
          <option value="">Toutes régions</option>
          {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <button type="button" onClick={load} className="btn" style={{border:"1px solid rgba(0,0,0,0.1)"}}>Filtrer</button>
        {loading && <span className="text-sm text-black/60">Chargement…</span>}
      </div>

      <ul className="mt-4 grid gap-3">
        {items.map(a => (
          <li key={a.id} className="p-4 rounded-lg ring-1 ring-black/10 bg-white">
            <div className="font-semibold">{a.title} · {a.bloodGroup} · {a.region}</div>
            <div className="text-sm text-black/70">{a.content}</div>
            <div className="mt-2 flex gap-3 text-sm">
              <button onClick={()=>onClose(a.id)} className="text-emerald-700 hover:underline">Clore</button>
              <button onClick={()=>onDelete(a.id)} className="text-red-600 hover:underline">Supprimer</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}


