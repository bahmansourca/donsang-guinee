"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/admin/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || "Identifiants invalides");
      }
      window.dispatchEvent(new CustomEvent("toast", { detail: { type: "success", message: "Connecté" } }));
      router.replace("/admin");
    } catch (err: any) {
      setError(err?.message || "Erreur");
      window.dispatchEvent(new CustomEvent("toast", { detail: { type: "error", message: "Échec de connexion" } }));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container py-10 max-w-sm">
      <h1 className="text-2xl font-bold">Connexion administrateur</h1>
      <form onSubmit={onSubmit} className="mt-6 grid gap-3">
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe" className="p-2 rounded-md ring-1 ring-black/10 bg-white" />
        {error && <div className="text-sm text-red-700">{error}</div>}
        <button disabled={loading} className="btn btn-primary">{loading ? "Connexion…" : "Se connecter"}</button>
      </form>
    </main>
  );
}


