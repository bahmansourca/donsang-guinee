import Link from "next/link";
import { I18nProvider } from "@/lib/i18n";
import NewsClient from "./news-client";

export default function Page() {
  return (
    <I18nProvider>
      <NewsClient />
    </I18nProvider>
  );
}




