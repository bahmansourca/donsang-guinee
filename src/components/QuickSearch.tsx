"use client";
import { useI18n } from "@/lib/i18n";

export default function QuickSearch() {
  const { t } = useI18n();
  return (
    <div className="rounded-2xl bg-white/90 ring-1 ring-black/10 p-6 shadow-lg">
      <h3 className="font-semibold">{t("quick_search")}</h3>
      <form action="/recherche" className="mt-4 grid md:grid-cols-2 gap-3">
        <input name="city" placeholder={t("quick_city_placeholder") as any} className="w-full p-2 rounded-md ring-1 ring-black/10 bg-white" />
        <select name="bloodGroup" className="w-full p-2 rounded-md ring-1 ring-black/10 bg-white">
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
        <button className="btn btn-primary md:col-span-2">{t("quick_search_button")}</button>
      </form>
    </div>
  );
}


