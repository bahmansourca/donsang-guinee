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

"use client";

import { useState } from "react";
import { BLOOD_GROUPS, REGIONS, BLOOD_GROUP_LABEL, REGION_LABEL } from "@/lib/constants";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/donors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.get("fullName"),
          bloodGroup: formData.get("bloodGroup"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          city: formData.get("city"),
          region: formData.get("region"),
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Erreur");
      setSuccess("Merci ! Votre inscription a été enregistrée.");
    } catch (e: any) {
      setError(e.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container py-10 max-w-2xl">
      <h1 className="text-3xl font-bold">Inscription donneur volontaire</h1>
      <p className="mt-2 text-black/70 dark:text-white/70">Remplissez ce formulaire pour rejoindre le réseau national.</p>

      <form
        className="mt-6 grid gap-4"
        action={async (fd) => onSubmit(fd)}
      >
        <div>
          <label className="block text-sm font-medium">Nom complet</label>
          <input name="fullName" required className="mt-1 w-full p-2 rounded-md ring-1 ring-black/10 dark:ring-white/10 bg-white/70 dark:bg-white/5" />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Groupe sanguin</label>
            <select name="bloodGroup" required className="mt-1 w-full p-2 rounded-md ring-1 ring-black/10 dark:ring-white/10 bg-white/70 dark:bg-white/5">
              <option value="">Choisir…</option>
              {BLOOD_GROUPS.map((g) => (
                <option key={g} value={g}>{BLOOD_GROUP_LABEL[g]}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Téléphone</label>
            <input name="phone" required className="mt-1 w-full p-2 rounded-md ring-1 ring-black/10 dark:ring-white/10 bg-white/70 dark:bg-white/5" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Email (optionnel)</label>
            <input name="email" type="email" className="mt-1 w-full p-2 rounded-md ring-1 ring-black/10 dark:ring-white/10 bg-white/70 dark:bg-white/5" />
          </div>
          <div>
            <label className="block text-sm font-medium">Ville</label>
            <input name="city" required className="mt-1 w-full p-2 rounded-md ring-1 ring-black/10 dark:ring-white/10 bg-white/70 dark:bg-white/5" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Région</label>
          <select name="region" required className="mt-1 w-full p-2 rounded-md ring-1 ring-black/10 dark:ring-white/10 bg-white/70 dark:bg-white/5">
            <option value="">Choisir…</option>
            {REGIONS.map((r) => (
              <option key={r} value={r}>{REGION_LABEL[r]}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <button disabled={loading} className="btn btn-primary" type="submit">
            {loading ? "Enregistrement…" : "S’inscrire"}
          </button>
          <a href="/recherche" className="btn border border-black/10 dark:border-white/20">Voir les donneurs</a>
        </div>

        {success && <p className="text-green-600 dark:text-green-400">{success}</p>}
        {error && <p className="text-red-600 dark:text-red-400">{error}</p>}
      </form>
    </main>
  );
}


