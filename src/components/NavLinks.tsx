"use client";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function NavLinks() {
  const { t } = useI18n();
  return (
    <nav className="hidden md:flex items-center gap-6 text-sm">
      <Link href="/" className="hover:underline">{t("nav_home")}</Link>
      <Link href="/criteres" className="hover:underline">{t("nav_who")}</Link>
      <Link href="/etapes" className="hover:underline">{t("nav_steps")}</Link>
      <Link href="/quiz" className="hover:underline">{t("nav_quiz")}</Link>
      <Link href="/recherche" className="hover:underline">{t("nav_search")}</Link>
      <Link href="/actualites" className="hover:underline">{t("nav_news")}</Link>
    </nav>
  );
}


