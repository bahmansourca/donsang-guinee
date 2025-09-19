"use client";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function HeaderCTA() {
  const { t } = useI18n();
  return (
    <Link href="/inscription" className="btn btn-primary">{t("cta_donor")}</Link>
  );
}


