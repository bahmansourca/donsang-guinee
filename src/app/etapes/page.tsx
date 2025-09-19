import { I18nProvider } from "@/lib/i18n";
import StepsClient from "./steps-client";

export default function Page() {
  return (
    <I18nProvider>
      <StepsClient />
    </I18nProvider>
  );
}




