import Link from "next/link";
import { isAdmin } from "@/lib/auth";
import LogoutButton from "./LogoutButton";

export default function Page() {
  const authed = isAdmin();
  if (!authed) {
    return (
      <main className="container py-10 max-w-xl">
        <h1 className="text-2xl font-bold">Espace administrateur</h1>
        <p className="mt-2 text-black/70">Veuillez vous connecter pour accéder au tableau de bord.</p>
        <Link href="/admin/login" className="btn btn-primary mt-4 inline-block">Se connecter</Link>
      </main>
    );
  }

  return (
    <main className="container py-10">
      <div className="mb-4 text-xs text-black/60">Statut: <span className="badge">Connecté</span></div>
      <h1 className="text-3xl font-bold">Tableau de bord</h1>
      <p className="mt-2 text-black/70">Le module complet (donneurs, hôpitaux, alertes, statistiques) arrive dans le prochain lot.</p>
      <LogoutButton />
    </main>
  );
}


