"use client";
import { useMemo, useState } from "react";
import Link from "next/link";

const QUESTIONS = [
  { id: "age", text: "Avez-vous entre 18 et 65 ans ?", admissibleIf: "oui" },
  { id: "poids", text: "Pesez-vous au moins 50 kg ?", admissibleIf: "oui" },
  { id: "sante", text: "Êtes-vous en bonne santé aujourd’hui (pas de fièvre/symptômes) ?", admissibleIf: "oui" },
  { id: "maladies", text: "Avez-vous des maladies transmissibles par le sang ?", admissibleIf: "non" },
  { id: "voyage", text: "Avez-vous voyagé récemment dans une zone à risque ?", admissibleIf: "non" },
  { id: "tatouage", text: "Avez-vous eu un tatouage/piercing dans les 4 derniers mois ?", admissibleIf: "non" },
  { id: "volontaire", text: "Souhaitez-vous donner volontairement et gratuitement ?", admissibleIf: "oui" },
 ] as const;

export default function Page() {
  const [step, setStep] = useState(0);
  const [eligible, setEligible] = useState(true);
  const current = QUESTIONS[step];
  const done = step >= QUESTIONS.length;

  function onAnswer(v: "oui" | "non") {
    if (!current) return;
    const ok = v === current.admissibleIf;
    if (!ok) {
      setEligible(false);
      setStep(QUESTIONS.length);
      return;
    }
    if (step + 1 < QUESTIONS.length) setStep(step + 1);
    else setStep(QUESTIONS.length);
  }

  const progress = useMemo(() => Math.min(step, QUESTIONS.length) / QUESTIONS.length * 100, [step]);

  return (
    <main className="container py-10 max-w-2xl">
      <h1 className="text-3xl font-bold">Questionnaire d’admissibilité</h1>
      <div className="mt-4 h-2 w-full rounded bg-black/10">
        <div className="h-2 rounded bg-[var(--brand-red)]" style={{ width: `${progress}%` }} />
      </div>

      {!done ? (
        <div className="mt-8 p-6 rounded-xl ring-1 ring-black/10 bg-white">
          <div className="text-sm text-black/60 mb-2">Question {step + 1} / {QUESTIONS.length}</div>
          <div className="text-lg font-medium">{current.text}</div>
          <div className="mt-5 flex gap-3">
            <button className="btn btn-primary" onClick={() => onAnswer("oui")}>Oui</button>
            <button className="btn" style={{border:"1px solid rgba(0,0,0,0.1)"}} onClick={() => onAnswer("non")}>Non</button>
          </div>
        </div>
      ) : eligible ? (
        <div className="mt-8 p-6 rounded-xl ring-1 ring-black/10 bg-white">
          <div className="text-green-700 font-semibold">Vous êtes admissible au don de sang.</div>
          <div className="mt-3 flex gap-3">
            <Link href="/inscription" className="btn btn-primary">M’inscrire comme donneur</Link>
            <Link href="/recherche" className="btn" style={{border:"1px solid rgba(0,0,0,0.1)"}}>Trouver des centres</Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 p-6 rounded-xl ring-1 ring-black/10 bg-white">
          <div className="text-amber-700 font-semibold">Vous ne semblez pas admissible pour l’instant.</div>
          <p className="text-sm mt-2 text-black/70">Merci pour votre volonté d’aider. Vous pouvez contribuer autrement : sensibilisez votre entourage, partagez les alertes, ou soutenez l’organisation de collectes.</p>
          <div className="mt-3">
            <Link href="/actualites" className="btn" style={{border:"1px solid rgba(0,0,0,0.1)"}}>En savoir plus</Link>
          </div>
        </div>
      )}
    </main>
  );
}




