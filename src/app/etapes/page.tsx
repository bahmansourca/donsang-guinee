export default function Page() {
  return (
    <main className="container py-10 max-w-3xl">
      <h1 className="text-3xl font-bold">Étapes du don</h1>
      <ol className="mt-6 space-y-4 list-decimal list-inside">
        <li>
          <span className="font-semibold">Accueil</span> – vérification d’identité et enregistrement.
        </li>
        <li>
          <span className="font-semibold">Entretien</span> – questionnaire médical et prise de tension.
        </li>
        <li>
          <span className="font-semibold">Prélèvement</span> – environ 8 à 10 minutes, en conditions stériles.
        </li>
        <li>
          <span className="font-semibold">Collation</span> – repos et boisson pour récupérer.
        </li>
      </ol>
    </main>
  );
}




