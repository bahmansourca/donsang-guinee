"use client";
import { useState } from "react";
import { BLOOD_GROUPS, REGIONS } from "@/lib/constants";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setLoading(true);
    setError(null);
    setOk(false);
    try {
      const res = await fetch("/api/donors", { method: "POST", body: fd });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || "Erreur d’inscription");
      }
      setOk(true);
      window.dispatchEvent(new CustomEvent("toast", { detail: { type: "success", message: "Inscription enregistrée" } }));
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setError(err?.message || "Erreur inconnue");
      window.dispatchEvent(new CustomEvent("toast", { detail: { type: "error", message: "Échec d’inscription" } }));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container py-10 max-w-xl">
      <h1 className="text-3xl font-bold">Devenir donneur</h1>
      <form onSubmit={onSubmit} className="mt-6 grid gap-3">
        <input name="fullName" placeholder="Nom complet" className="p-2 rounded-md ring-1 ring-black/10 bg-white" required />
        <input name="phone" placeholder="Téléphone" className="p-2 rounded-md ring-1 ring-black/10 bg-white" required />
        <input type="email" name="email" placeholder="Email (optionnel)" className="p-2 rounded-md ring-1 ring-black/10 bg-white" />
        <input name="city" placeholder="Ville" className="p-2 rounded-md ring-1 ring-black/10 bg-white" required />
        <select name="region" className="p-2 rounded-md ring-1 ring-black/10 bg-white" required>
          <option value="">Région</option>
          {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <select name="bloodGroup" className="p-2 rounded-md ring-1 ring-black/10 bg-white" required>
          <option value="">Groupe sanguin</option>
          {BLOOD_GROUPS.map(bg => <option key={bg.value} value={bg.value}>{bg.label}</option>)}
        </select>
        <button className="btn btn-primary" disabled={loading}>{loading ? "Envoi…" : "S’inscrire"}</button>
        {ok && <div className="text-sm text-green-700">Merci ! Nous vous contacterons si nécessaire.</div>}
        {error && <div className="text-sm text-red-700">{error}</div>}
      </form>
    </main>
  );
}


