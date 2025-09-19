"use client";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState<Record<string,string>>({});
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/settings");
    if (res.ok) {
      const j = await res.json();
      const map: Record<string,string> = {};
      (j.settings || []).forEach((s: any) => map[s.key] = s.value);
      setValues(map);
    }
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function onSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData(e.currentTarget);
    const body: Record<string,string> = {};
    fd.forEach((v, k) => body[k] = String(v));
    const res = await fetch("/api/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setSaving(false);
    if (res.ok) window.dispatchEvent(new CustomEvent("toast", { detail: { type: "success", message: "Enregistré" } }));
  }

  return (
    <main className="container py-10 max-w-2xl">
      <h1 className="text-2xl font-bold">Paramètres</h1>
      {loading ? <div className="mt-4 text-sm text-black/60">Chargement…</div> : (
        <form onSubmit={onSave} className="mt-6 grid gap-4">
          <fieldset className="p-4 rounded-xl ring-1 ring-black/10 bg-white">
            <legend className="font-semibold">Twilio (SMS)</legend>
            <label className="block text-sm mt-2">Account SID</label>
            <input name="TWILIO_ACCOUNT_SID" defaultValue={values["TWILIO_ACCOUNT_SID"] || ""} className="mt-1 w-full p-2 rounded-md ring-1 ring-black/10 bg-white" />
            <label className="block text-sm mt-2">Auth Token</label>
            <input name="TWILIO_AUTH_TOKEN" defaultValue={values["TWILIO_AUTH_TOKEN"] || ""} className="mt-1 w-full p-2 rounded-md ring-1 ring-black/10 bg-white" />
            <label className="block text-sm mt-2">Numéro expéditeur</label>
            <input name="TWILIO_FROM" defaultValue={values["TWILIO_FROM"] || ""} className="mt-1 w-full p-2 rounded-md ring-1 ring-black/10 bg-white" />
          </fieldset>

          <fieldset className="p-4 rounded-xl ring-1 ring-black/10 bg-white">
            <legend className="font-semibold">Email (à venir)</legend>
            <label className="block text-sm mt-2">SENDGRID_API_KEY</label>
            <input name="SENDGRID_API_KEY" defaultValue={values["SENDGRID_API_KEY"] || ""} className="mt-1 w-full p-2 rounded-md ring-1 ring-black/10 bg-white" />
            <label className="block text-sm mt-2">SENDER_EMAIL</label>
            <input name="SENDER_EMAIL" defaultValue={values["SENDER_EMAIL"] || ""} className="mt-1 w-full p-2 rounded-md ring-1 ring-black/10 bg-white" />
          </fieldset>

          <button className="btn btn-primary" disabled={saving}>{saving ? "Enregistrement…" : "Enregistrer"}</button>
        </form>
      )}
    </main>
  );
}


