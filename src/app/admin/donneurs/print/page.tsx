"use client";
import { useEffect, useState } from "react";
import { BLOOD_GROUPS } from "@/lib/constants";

export default function PrintDonors() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/donors");
      const j = await res.json();
      setItems(j.donors || []);
      setTimeout(() => window.print(), 500);
    })();
  }, []);
  return (
    <main className="container py-6 print:py-0">
      <h1 className="text-2xl font-bold mb-4">Liste des donneurs</h1>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b border-black/10">
            <th className="py-2">Nom</th>
            <th className="py-2">Groupe</th>
            <th className="py-2">Téléphone</th>
            <th className="py-2">Email</th>
            <th className="py-2">Ville</th>
            <th className="py-2">Région</th>
          </tr>
        </thead>
        <tbody>
          {items.map((d:any) => (
            <tr key={d.id} className="border-b border-black/5">
              <td className="py-1">{d.fullName}</td>
              <td className="py-1">{BLOOD_GROUPS.find(x=>x.value===d.bloodGroup)?.label || d.bloodGroup}</td>
              <td className="py-1">{d.phone}</td>
              <td className="py-1">{d.email || ""}</td>
              <td className="py-1">{d.city}</td>
              <td className="py-1">{d.region}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}


