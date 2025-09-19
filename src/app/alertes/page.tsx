export default function Page() {
  const items = [
    { id: 1, title: "Urgent: O- à Conakry", description: "Besoin immédiat à l’hôpital Ignace Deen." },
  ];
  return (
    <main className="container py-10 max-w-3xl">
      <h1 className="text-3xl font-bold">Alertes urgentes</h1>
      <ul className="mt-6 grid gap-3">
        {items.map(a => (
          <li key={a.id} className="p-4 rounded-lg ring-1 ring-black/10 bg-white">
            <div className="font-medium">{a.title}</div>
            <div className="text-sm text-black/70">{a.description}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}




