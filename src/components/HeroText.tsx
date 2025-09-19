"use client";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function HeroText() {
  const { t } = useI18n();
  return (
    <div className="max-w-xl">
      <span className="badge">{t("badge_official")}</span>
      <h1 className="mt-4 text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
        {t("hero_title").split("en un clic")[0]}
        <span className="text-[var(--brand-red)]">{t("hero_title").includes("en un clic") ? "en un clic" : ""}</span>
      </h1>
      <p className="mt-4 text-lg text-black/70">{t("hero_sub")}</p>
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Link href="/inscription" className="btn btn-primary">{t("cta_donor")}</Link>
        <Link href="/quiz" className="btn" style={{border:"1px solid rgba(0,0,0,0.1)"}}>{t("hero_check")}</Link>
      </div>
      <div className="mt-6 inline-flex items-center gap-3">
        <img src="/logo-drop-guinea.svg" alt="goutte Guinée" width="40" height="40" />
        <span className="text-sm text-black/60">{t("tagline")}</span>
      </div>
    </div>
  );
}


