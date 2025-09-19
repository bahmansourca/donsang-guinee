"use client";
import { useState } from "react";
import { BLOOD_GROUPS, REGIONS } from "@/lib/constants";

export default function MessagesPage() {
  const [channel, setChannel] = useState<"SMS" | "EMAIL">("SMS");
  const [bg, setBg] = useState("");
  const [region, setRegion] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  async function onSend(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setResult(null);
    const res = await fetch("/api/messages/broadcast", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ channel, bloodGroup: bg, region, message }) });
    const j = await res.json().catch(()=>({}));
    setLoading(false);
    if (!res.ok) { setResult(j?.error || "Erreur"); return; }
    setResult(`Envoyé: ${j.sent}/${j.total}`);
  }

  return (
    <main className="container py-10 max-w-2xl">
      <h1 className="text-2xl font-bold">Messages ciblés</h1>
      <form onSubmit={onSend} className="mt-6 grid gap-3">
        <div className="flex gap-4 text-sm">
          <label className="flex items-center gap-2"><input type="radio" checked={channel==="SMS"} onChange={()=>setChannel("SMS")} /> SMS</label>
          <label className="flex items-center gap-2"><input type="radio" checked={channel==="EMAIL"} onChange={()=>setChannel("EMAIL")} /> Email</label>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <select value={bg} onChange={e=>setBg(e.target.value)} className="p-2 rounded-md ring-1 ring-black/10 bg-white">
            <option value="">Tous groupes</option>
            {BLOOD_GROUPS.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
          </select>
          <select value={region} onChange={e=>setRegion(e.target.value)} className="p-2 rounded-md ring-1 ring-black/10 bg-white">
            <option value="">Toutes régions</option>
            {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <textarea value={message} onChange={e=>setMessage(e.target.value)} rows={5} placeholder="Votre message…" className="p-2 rounded-md ring-1 ring-black/10 bg-white" required />
        <button className="btn btn-primary" disabled={loading}>{loading ? "Envoi…" : "Envoyer"}</button>
        {result && <div className="text-sm text-black/70">{result}</div>}
      </form>
    </main>
  );
}


