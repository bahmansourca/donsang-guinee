"use client";
import { useI18n } from "@/lib/i18n";

interface Props { params: { slug: string } }

export default function Page({ params }: Props) {
  const { t } = useI18n();
  const map: Record<string, { title: string; body: string }> = {
    "importance-don-sang": { title: t("post_importance_title"), body: t("post_importance_body") },
    "journee-mondiale": { title: t("post_worldday_title"), body: t("post_worldday_body") },
  };
  const post = map[params.slug];
  if (!post) return <main className="container py-10 max-w-3xl">{t("article_not_found")}</main>;
  return (
    <main className="container py-10 max-w-3xl">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="mt-4 text-black/70">{post.body}</p>
    </main>
  );
}




