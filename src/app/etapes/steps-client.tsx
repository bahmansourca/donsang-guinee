"use client";
import { useI18n } from "@/lib/i18n";

export default function StepsClient() {
  const { t } = useI18n();
  return (
    <main className="container py-10 max-w-3xl">
      <h1 className="text-3xl font-bold">{t("steps_title")}</h1>
      <ol className="mt-6 space-y-4 list-decimal list-inside">
        <li>{t("step_welcome")}</li>
        <li>{t("step_interview")}</li>
        <li>{t("step_collection")}</li>
        <li>{t("step_snack")}</li>
      </ol>
    </main>
  );
}


