import Link from "next/link";

export default function Page() {
  return (
    <main className="container py-10 max-w-3xl">
      <h1 className="text-3xl font-bold">Qui peut donner ?</h1>
      <p className="mt-4 text-black/70">
        En général, vous pouvez donner si vous avez entre 18 et 65 ans, pesez au moins 50 kg, êtes en bonne santé le jour du don et ne présentez pas de contre-indications temporaires (fièvre, infection récente, voyage en zone à risque, tatouage/piercing &lt; 4 mois, etc.).
      </p>
      <Link href="/quiz" className="mt-6 inline-block btn btn-primary">Vérifier mon admissibilité</Link>
    </main>
  );
}


