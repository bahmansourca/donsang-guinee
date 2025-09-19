import Link from "next/link";
import { I18nProvider } from "@/lib/i18n";
import CriteriaClient from "./criteria-client";

export default function Page() {
  return (
    <I18nProvider>
      <CriteriaClient />
    </I18nProvider>
  );
}




