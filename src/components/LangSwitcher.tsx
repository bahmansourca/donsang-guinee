"use client";
import { useI18n } from "@/lib/i18n";

export default function LangSwitcher() {
  const { lang, setLang } = useI18n();
  return (
    <select aria-label="Langue" value={lang} onChange={e=>setLang(e.target.value as any)} className="p-2 rounded-md ring-1 ring-black/10 bg-white text-sm">
      <option value="fr">FR</option>
      <option value="en">EN</option>
    </select>
  );
}


