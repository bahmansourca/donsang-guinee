import Link from "next/link";

export default function Page() {
  const posts = [
    { slug: "importance-don-sang", title: "Pourquoi le don de sang est vital", excerpt: "Chaque don peut sauver jusqu’à trois vies." },
    { slug: "journee-mondiale", title: "Journée mondiale des donneurs", excerpt: "Célébrons l’engagement des donneurs volontaires." },
  ];
  return (
    <main className="container py-10 max-w-3xl">
      <h1 className="text-3xl font-bold">Actualités & sensibilisation</h1>
      <ul className="mt-6 grid gap-4">
        {posts.map(p => (
          <li key={p.slug} className="p-4 rounded-xl ring-1 ring-black/10 bg-white">
            <Link href={`/actualites/${p.slug}`} className="font-semibold hover:underline">{p.title}</Link>
            <p className="text-sm text-black/70">{p.excerpt}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}


