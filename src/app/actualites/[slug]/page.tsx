interface Props { params: { slug: string } }

const DUMMY: Record<string, { title: string; body: string }> = {
  "importance-don-sang": {
    title: "Pourquoi le don de sang est vital",
    body: "Chaque don peut sauver jusqu’à trois vies. Les besoins sont constants, notamment pour les urgences et les opérations.",
  },
  "journee-mondiale": {
    title: "Journée mondiale des donneurs",
    body: "Merci aux donneurs volontaires ! Informez-vous, partagez, et incitez votre entourage à donner.",
  },
};

export default function Page({ params }: Props) {
  const post = DUMMY[params.slug];
  if (!post) return <main className="container py-10 max-w-3xl">Article introuvable.</main>;
  return (
    <main className="container py-10 max-w-3xl">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="mt-4 text-black/70">{post.body}</p>
    </main>
  );
}




