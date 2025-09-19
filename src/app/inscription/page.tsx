"use client";
import { useState } from "react";
import { BLOOD_GROUPS, REGIONS } from "@/lib/constants";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<"form" | "code">("form");
  const [donorId, setDonorId] = useState<string | null>(null);
  const [channel, setChannel] = useState<"SMS" | "EMAIL">("SMS");
  const [done, setDone] = useState(false);

  async function onRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.set("channel", channel);
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/register", { method: "POST", body: fd });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j?.error || "Erreur d’inscription");
      setDonorId(j.donorId);
      setStep("code");
      window.dispatchEvent(new CustomEvent("toast", { detail: { type: "success", message: "Code envoyé" } }));
    } catch (err: any) {
      setError(err?.message || "Erreur inconnue");
      window.dispatchEvent(new CustomEvent("toast", { detail: { type: "error", message: "Échec d’envoi du code" } }));
    } finally {
      setLoading(false);
    }
  }

  async function onVerify(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!donorId) return;
    const fd = new FormData(e.currentTarget);
    const code = String(fd.get("code") || "").trim();
    if (!code) return setError("Entrez le code reçu");
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ donorId, code }) });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j?.error || "Code invalide");
      window.dispatchEvent(new CustomEvent("toast", { detail: { type: "success", message: "Inscription confirmée" } }));
      setDone(true);
    } catch (err: any) {
      setError(err?.message || "Erreur inconnue");
      window.dispatchEvent(new CustomEvent("toast", { detail: { type: "error", message: "Vérification échouée" } }));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container py-10 max-w-xl">
      <h1 className="text-3xl font-bold">Devenir donneur</h1>
      {done ? (
        <div className="mt-6 p-6 rounded-xl ring-1 ring-black/10 bg-white">
          <h2 className="text-xl font-semibold">Merci pour votre inscription</h2>
          <p className="text-sm text-black/70 mt-2">Votre profil est confirmé. Nous vous contacterons en cas de besoin urgent dans votre région.</p>
          <div className="mt-4 flex gap-3">
            <a href="/recherche" className="btn" style={{border:"1px solid rgba(0,0,0,0.1)"}}>Voir les donneurs</a>
            <a href="/" className="btn btn-primary">Retour à l’accueil</a>
          </div>
        </div>
      ) : step === "form" ? (
        <form onSubmit={onRegister} className="mt-6 grid gap-3">
          <div className="flex gap-3 items-center text-sm">
            <label className="font-semibold">Recevoir le code par</label>
            <label className="flex items-center gap-1"><input type="radio" name="_chan" checked={channel === "SMS"} onChange={()=>setChannel("SMS")} /> SMS</label>
            <label className="flex items-center gap-1"><input type="radio" name="_chan" checked={channel === "EMAIL"} onChange={()=>setChannel("EMAIL")} /> Email</label>
          </div>
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
          <button className="btn btn-primary" disabled={loading}>{loading ? "Envoi du code…" : "Continuer"}</button>
          {error && <div className="text-sm text-red-700">{error}</div>}
        </form>
      ) : (
        <form onSubmit={onVerify} className="mt-6 grid gap-3">
          <p className="text-sm text-black/70">Entrez le code reçu par {channel === "EMAIL" ? "email" : "SMS"}.</p>
          <input name="code" placeholder="Code à 6 chiffres" className="p-2 rounded-md ring-1 ring-black/10 bg-white" required />
          <button className="btn btn-primary" disabled={loading}>{loading ? "Vérification…" : "Valider"}</button>
          {error && <div className="text-sm text-red-700">{error}</div>}
        </form>
      )}
    </main>
  );
}


