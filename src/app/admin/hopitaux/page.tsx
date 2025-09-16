import HospitalsPanel from "./HospitalsPanel";
import { isAdmin } from "@/lib/auth";

export default function Page() {
  const authed = isAdmin();
  if (!authed) return <main className="container py-10 max-w-xl">Accès restreint. <a className="text-[var(--brand-red)] underline" href="/admin/login">Se connecter</a></main>;
  return <HospitalsPanel />;
}


