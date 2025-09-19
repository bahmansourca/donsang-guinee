import { I18nProvider } from "@/lib/i18n";
import FirstClient from "./first-client";

export default function Page() {
  return (
    <I18nProvider>
      <FirstClient />
    </I18nProvider>
  );
}




