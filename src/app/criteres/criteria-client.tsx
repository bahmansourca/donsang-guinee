"use client";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function CriteriaClient() {
  const { t } = useI18n();
  return (
    <main className="container py-10 max-w-3xl">
      <h1 className="text-3xl font-bold">{t("criteres_title")}</h1>
      <p className="mt-4 text-black/70">{t("criteres_text")}</p>
      <Link href="/quiz" className="mt-6 inline-block btn btn-primary">{t("criteres_check")}</Link>
    </main>
  );
}


