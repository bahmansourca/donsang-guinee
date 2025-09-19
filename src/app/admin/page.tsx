import Link from "next/link";
import { isAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import LogoutButton from "./LogoutButton";

export default async function Page() {
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

  // Stats côté serveur
  const [donors, alerts] = await Promise.all([
    prisma.donor.findMany({ select: { bloodGroup: true, region: true, verified: true } }),
    prisma.alert.findMany({ select: { status: true } }),
  ]);
  const totalDonors = donors.length;
  const verifiedDonors = donors.filter(d => d.verified).length;
  const openAlerts = alerts.filter(a => a.status === "OPEN").length;
  const groupCounts: Record<string, number> = {};
  donors.forEach(d => { groupCounts[d.bloodGroup] = (groupCounts[d.bloodGroup] || 0) + 1; });

  return (
    <main className="container py-10">
      <div className="mb-4 text-xs text-black/60">Statut: <span className="badge">Connecté</span></div>
      <h1 className="text-3xl font-bold">Tableau de bord</h1>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="p-4 rounded-xl ring-1 ring-black/10 bg-white">
          <div className="text-sm text-black/60">Donneurs inscrits</div>
          <div className="text-2xl font-bold">{totalDonors}</div>
        </div>
        <div className="p-4 rounded-xl ring-1 ring-black/10 bg-white">
          <div className="text-sm text-black/60">Donneurs vérifiés</div>
          <div className="text-2xl font-bold">{verifiedDonors}</div>
        </div>
        <div className="p-4 rounded-xl ring-1 ring-black/10 bg-white">
          <div className="text-sm text-black/60">Alertes actives</div>
          <div className="text-2xl font-bold">{openAlerts}</div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="p-4 rounded-xl ring-1 ring-black/10 bg-white">
          <div className="font-semibold mb-3">Répartition par groupe sanguin</div>
          <div className="space-y-2">
            {Object.entries(groupCounts).sort().map(([g, n]) => (
              <div key={g} className="flex items-center gap-3">
                <div className="w-14 text-xs text-black/60">{g.replace("_POS","+").replace("_NEG","-")}</div>
                <div className="h-2 bg-black/10 rounded w-full">
                  <div className="h-2 bg-[var(--brand-red)] rounded" style={{ width: `${Math.max(4, (n/Math.max(1,totalDonors))*100)}%` }} />
                </div>
                <div className="w-8 text-right text-xs">{n}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl ring-1 ring-black/10 bg-white">
          <div className="font-semibold mb-3">Accès rapide</div>
          <div className="grid gap-3 text-sm">
            <Link href="/admin/donneurs" className="btn" style={{border:"1px solid rgba(0,0,0,0.1)"}}>Gérer les donneurs</Link>
            <Link href="/admin/alertes" className="btn" style={{border:"1px solid rgba(0,0,0,0.1)"}}>Alertes urgentes</Link>
            <Link href="/admin/parametres" className="btn" style={{border:"1px solid rgba(0,0,0,0.1)"}}>Paramètres</Link>
            <LogoutButton />
          </div>
        </div>
      </div>
    </main>
  );
}


