"use client";
import { useI18n } from "@/lib/i18n";

export default function FooterContent() {
  const { t } = useI18n();
  return (
    <div className="container py-8 grid gap-6 md:grid-cols-3 text-sm">
      <div>
        <div className="font-semibold mb-2">{t("footer_links")}</div>
        <ul className="space-y-1">
          <li><a className="hover:underline" href="#" target="_blank" rel="noreferrer">{t("footer_ministry")}</a></li>
          <li><a className="hover:underline" href="#" target="_blank" rel="noreferrer">{t("footer_redcross")}</a></li>
          <li><a className="hover:underline" href="#" target="_blank" rel="noreferrer">{t("footer_partners")}</a></li>
        </ul>
      </div>
      <div>
        <div className="font-semibold mb-2">{t("footer_contact")}</div>
        <p>{t("footer_email_label")}: contact@donsang-guinee.org</p>
        <p>{t("footer_phone_label")}: +224 600 00 00 00</p>
      </div>
      <div>
        <div className="font-semibold mb-2">{t("footer_mentions")}</div>
        <p className="text-black/60 dark:text-white/60">© {new Date().getFullYear()} {t("footer_copyright")}</p>
      </div>
    </div>
  );
}


