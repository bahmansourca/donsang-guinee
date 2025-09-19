"use client";
import { useState } from "react";
import { BLOOD_GROUPS, REGIONS } from "@/lib/constants";
import { useI18n } from "@/lib/i18n";

export default function Page() {
  const { t } = useI18n();
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
      <h1 className="text-3xl font-bold">{t("insc_title")}</h1>
      {done ? (
        <div className="mt-6 p-6 rounded-xl ring-1 ring-black/10 bg-white">
          <h2 className="text-xl font-semibold">{t("success_title")}</h2>
          <p className="text-sm text-black/70 mt-2">{t("success_text")}</p>
          <div className="mt-4 flex gap-3">
            <a href="/recherche" className="btn" style={{border:"1px solid rgba(0,0,0,0.1)"}}>{t("action_view_donors")}</a>
            <a href="/" className="btn btn-primary">{t("action_back_home")}</a>
          </div>
        </div>
      ) : step === "form" ? (
        <form onSubmit={onRegister} className="mt-6 grid gap-3">
          <div className="flex gap-3 items-center text-sm">
            <label className="font-semibold">{t("insc_receive_by")}</label>
            <label className="flex items-center gap-1"><input type="radio" name="_chan" checked={channel === "SMS"} onChange={()=>setChannel("SMS")} /> {t("label_sms")}</label>
            <label className="flex items-center gap-1"><input type="radio" name="_chan" checked={channel === "EMAIL"} onChange={()=>setChannel("EMAIL")} /> {t("label_email")}</label>
          </div>
          <input name="fullName" placeholder={t("placeholder_fullname") as any} className="p-2 rounded-md ring-1 ring-black/10 bg-white" required />
          <input name="phone" placeholder={t("placeholder_phone") as any} className="p-2 rounded-md ring-1 ring-black/10 bg-white" required />
          <input type="email" name="email" placeholder={t("placeholder_email_opt") as any} className="p-2 rounded-md ring-1 ring-black/10 bg-white" />
          <input name="city" placeholder={t("placeholder_city") as any} className="p-2 rounded-md ring-1 ring-black/10 bg-white" required />
          <select name="region" className="p-2 rounded-md ring-1 ring-black/10 bg-white" required>
            <option value="">{t("placeholder_region")}</option>
            {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <select name="bloodGroup" className="p-2 rounded-md ring-1 ring-black/10 bg-white" required>
            <option value="">{t("placeholder_blood")}</option>
            {BLOOD_GROUPS.map(bg => <option key={bg.value} value={bg.value}>{bg.label}</option>)}
          </select>
          <button className="btn btn-primary" disabled={loading}>{loading ? t("action_sending") : t("action_continue")}</button>
          {error && <div className="text-sm text-red-700">{error}</div>}
        </form>
      ) : (
        <form onSubmit={onVerify} className="mt-6 grid gap-3">
          <p className="text-sm text-black/70">{channel === "EMAIL" ? t("verify_prompt_email") : t("verify_prompt_sms")}</p>
          <input name="code" placeholder={t("placeholder_code") as any} className="p-2 rounded-md ring-1 ring-black/10 bg-white" required />
          <button className="btn btn-primary" disabled={loading}>{loading ? t("action_verifying") : t("action_validate")}</button>
          {error && <div className="text-sm text-red-700">{error}</div>}
        </form>
      )}
    </main>
  );
}


