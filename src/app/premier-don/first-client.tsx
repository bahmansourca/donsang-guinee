"use client";
import { useI18n } from "@/lib/i18n";

export default function FirstClient() {
  const { t } = useI18n();
  return (
    <main className="container py-10 max-w-3xl">
      <h1 className="text-3xl font-bold">{t("first_title")}</h1>
      <p className="mt-4 text-black/70">{t("first_text")}</p>
    </main>
  );
}


