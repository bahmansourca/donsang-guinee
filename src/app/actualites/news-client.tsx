"use client";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function NewsClient() {
  const { t } = useI18n();
  const posts = [
    { slug: "importance-don-sang", title: t("post_importance_title"), excerpt: t("post_importance_excerpt") },
    { slug: "journee-mondiale", title: t("post_worldday_title"), excerpt: t("post_worldday_excerpt") },
  ];
  return (
    <main className="container py-10 max-w-3xl">
      <h1 className="text-3xl font-bold">{t("news_title")}</h1>
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


