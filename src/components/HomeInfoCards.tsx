"use client";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function HomeInfoCards() {
  const { t } = useI18n();
  return (
    <section className="container py-12 grid md:grid-cols-3 gap-6">
      <div className="p-6 rounded-xl ring-1 ring-black/10 bg-white">
        <h3 className="font-semibold">{t("info_who_title")}</h3>
        <p className="mt-2 text-sm text-black/70">{t("info_who_text")}</p>
        <Link href="/criteres" className="mt-3 inline-block text-[var(--brand-red)] font-medium">{t("info_who_cta")}</Link>
      </div>
      <div className="p-6 rounded-xl ring-1 ring-black/10 bg-white">
        <h3 className="font-semibold">{t("info_steps_title")}</h3>
        <p className="mt-2 text-sm text-black/70">{t("info_steps_text")}</p>
        <Link href="/etapes" className="mt-3 inline-block text-[var(--brand-red)] font-medium">{t("info_steps_cta")}</Link>
      </div>
      <div className="p-6 rounded-xl ring-1 ring-black/10 bg-white">
        <h3 className="font-semibold">{t("info_first_title")}</h3>
        <p className="mt-2 text-sm text-black/70">{t("info_first_text")}</p>
        <Link href="/premier-don" className="mt-3 inline-block text-[var(--brand-red)] font-medium">{t("info_first_cta")}</Link>
      </div>
    </section>
  );
}


