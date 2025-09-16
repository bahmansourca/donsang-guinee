import Link from "next/link";
import { isAdmin } from "@/lib/auth";

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
      <form action="/admin/session" method="post" onSubmit={(e) => { e.preventDefault(); fetch('/admin/session', { method: 'DELETE' }).then(()=>location.href='/'); }}>
        <button className="mt-6 btn" style={{border:"1px solid rgba(0,0,0,0.1)"}}>Se déconnecter</button>
      </form>
    </main>
  );
}


