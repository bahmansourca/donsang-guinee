"use client";
import { useEffect, useState } from "react";
import { BLOOD_GROUPS } from "@/lib/constants";
import { useI18n } from "@/lib/i18n";

export default function Page({ searchParams }: { searchParams?: { city?: string; bloodGroup?: string } }) {
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [city, setCity] = useState((searchParams?.city || "").trim());
  const [bloodGroup, setBloodGroup] = useState((searchParams?.bloodGroup || "").trim());
  const [region, setRegion] = useState("");

  async function search(e?: React.FormEvent) {
    e?.preventDefault();
    setLoading(true);
    const qs = new URLSearchParams();
    if (city) qs.set("city", city);
    if (bloodGroup) qs.set("bloodGroup", bloodGroup);
    if (region) qs.set("region", region);
    const res = await fetch(`/api/donors?${qs.toString()}`);
    const j = await res.json();
    setResults(j.donors || []);
    setLoading(false);
  }

  useEffect(() => {
    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="container py-10">
      <h1 className="text-3xl font-bold">{t("search_title")}</h1>
      <form className="mt-4 flex flex-wrap gap-2" onSubmit={search}>
        <input value={city} onChange={e=>setCity(e.target.value)} placeholder={t("quick_city_placeholder") as any} className="w-full p-2 rounded-md ring-1 ring-black/10 bg-white" />
        <select value={bloodGroup} onChange={e=>setBloodGroup(e.target.value)} className="p-2 rounded-md ring-1 ring-black/10 bg-white">
          <option value="">{t("quick_blood_placeholder")}</option>
          <option value="O_POS">O+</option>
          <option value="O_NEG">O-</option>
          <option value="A_POS">A+</option>
          <option value="A_NEG">A-</option>
          <option value="B_POS">B+</option>
          <option value="B_NEG">B-</option>
          <option value="AB_POS">AB+</option>
          <option value="AB_NEG">AB-</option>
        </select>
        <select value={region} onChange={e=>setRegion(e.target.value)} className="p-2 rounded-md ring-1 ring-black/10 bg-white">
          <option value="">{t("placeholder_region")}</option>
          <option value="CONAKRY">Conakry</option>
          <option value="BOKE">Boké</option>
          <option value="KINDIA">Kindia</option>
          <option value="MAMOU">Mamou</option>
          <option value="LABE">Labé</option>
          <option value="FARANAH">Faranah</option>
          <option value="KANKAN">Kankan</option>
          <option value="NZEREKORE">Nzérékoré</option>
        </select>
        <button className="btn btn-primary" type="submit">{t("quick_search_button")}</button>
      </form>

      <div className="mt-6">
        {loading ? <div className="text-sm text-black/60">{t("loading")}</div> : (
          results.length === 0 ? <div className="text-sm text-black/60">{t("empty_results")}</div> : (
            <ul className="grid gap-3">
              {results.map(d => (
                <li key={d.id} className="p-4 rounded-lg ring-1 ring-black/10 bg-white">
                  <div className="font-medium">
                    <a href={`tel:${d.phone}`} className="hover:underline">{d.fullName}</a> · {BLOOD_GROUPS.find(bg => bg.value === d.bloodGroup)?.label || d.bloodGroup}
                  </div>
                  <div className="text-sm text-black/70">{d.city}, {d.region} · <a className="text-[var(--brand-red)] hover:underline" href={`tel:${d.phone}`}>{d.phone}</a>{d.email ? <a className="ml-1 text-[var(--brand-red)] hover:underline" href={`mailto:${d.email}`}> · {d.email}</a> : ""}</div>
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </main>
  );
}




