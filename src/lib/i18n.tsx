"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Lang = "fr" | "en";
type Dict = Record<string, Record<Lang, string>>;

const DICT: Dict = {
  nav_home: { fr: "Accueil", en: "Home" },
  nav_who: { fr: "Qui peut donner ?", en: "Who can donate?" },
  nav_steps: { fr: "Étapes du don", en: "Donation steps" },
  nav_quiz: { fr: "Quiz", en: "Quiz" },
  nav_search: { fr: "Recherche", en: "Search" },
  nav_news: { fr: "Actualités", en: "News" },
  cta_donor: { fr: "Devenir donneur", en: "Become donor" },
  hero_title: { fr: "Sauvez une vie en un clic", en: "Save a life in one click" },
  hero_sub: { fr: "Rejoignez le réseau national de donneurs volontaires en Guinée. Ensemble, répondons aux urgences.", en: "Join Guinea's national network of voluntary blood donors. Together, we respond to emergencies." },
  hero_check: { fr: "Vérifier mon admissibilité", en: "Check eligibility" },
  quick_search: { fr: "Recherche de donneurs", en: "Donor search" },
  badge_official: { fr: "Plateforme officielle", en: "Official platform" },
  tagline: { fr: "Donnez aujourd’hui, sauvez demain", en: "Give today, save tomorrow" },
  info_who_title: { fr: "Qui peut donner ?", en: "Who can donate?" },
  info_who_text: { fr: "Critères d’éligibilité pour devenir donneur.", en: "Eligibility criteria to become a donor." },
  info_who_cta: { fr: "Découvrir les critères →", en: "See criteria →" },
  info_steps_title: { fr: "Comment se déroule un don ?", en: "How does a donation work?" },
  info_steps_text: { fr: "Accueil, entretien, prélèvement et collation.", en: "Welcome, interview, collection and snack." },
  info_steps_cta: { fr: "Voir les étapes du don →", en: "See donation steps →" },
  info_first_title: { fr: "C’est votre premier don ?", en: "Is this your first donation?" },
  info_first_text: { fr: "Tout ce qu’il faut savoir pour être serein.", en: "Everything you need to know to feel confident." },
  info_first_cta: { fr: "Je me renseigne →", en: "Learn more →" },
  quick_city_placeholder: { fr: "Ville (ex: Conakry)", en: "City (e.g., Conakry)" },
  quick_blood_placeholder: { fr: "Groupe sanguin", en: "Blood group" },
  quick_search_button: { fr: "Rechercher", en: "Search" },
  criteres_title: { fr: "Qui peut donner ?", en: "Who can donate?" },
  criteres_text: { fr: "En général, vous pouvez donner si vous avez entre 18 et 65 ans, pesez au moins 50 kg, êtes en bonne santé le jour du don et ne présentez pas de contre-indications temporaires (fièvre, infection récente, voyage en zone à risque, tatouage/piercing < 4 mois, etc).", en: "Generally, you can donate if you are between 18 and 65, weigh at least 50 kg, are healthy on the donation day, and have no temporary deferrals (fever, recent infection, travel to risk areas, tattoo/piercing < 4 months, etc.)." },
  criteres_check: { fr: "Vérifier mon admissibilité", en: "Check my eligibility" },
  steps_title: { fr: "Étapes du don", en: "Donation steps" },
  step_welcome: { fr: "Accueil – vérification d’identité et enregistrement.", en: "Welcome – identity check and registration." },
  step_interview: { fr: "Entretien – questionnaire médical et prise de tension.", en: "Interview – medical questionnaire and blood pressure." },
  step_collection: { fr: "Prélèvement – environ 8 à 10 minutes, en conditions stériles.", en: "Collection – about 8–10 minutes, in sterile conditions." },
  step_snack: { fr: "Collation – repos et boisson pour récupérer.", en: "Snack – rest and drink to recover." },
  first_title: { fr: "Premier don", en: "First donation" },
  first_text: { fr: "Pas d’inquiétude. L’équipe est là pour vous accompagner. Mangez léger avant de venir, hydratez-vous, et prévoyez une pièce d’identité.", en: "No worries. Our team is here to support you. Eat light, stay hydrated, and bring an ID." },
  news_title: { fr: "Actualités & sensibilisation", en: "News & awareness" },
  post_importance_title: { fr: "Pourquoi le don de sang est vital", en: "Why blood donation is vital" },
  post_importance_excerpt: { fr: "Chaque don peut sauver jusqu’à trois vies.", en: "Each donation can save up to three lives." },
  post_importance_body: { fr: "Chaque don peut sauver jusqu’à trois vies. Les besoins sont constants, notamment pour les urgences et les opérations.", en: "Each donation can save up to three lives. Needs are constant, especially for emergencies and surgeries." },
  post_worldday_title: { fr: "Journée mondiale des donneurs", en: "World Blood Donor Day" },
  post_worldday_excerpt: { fr: "Célébrons l’engagement des donneurs volontaires.", en: "Let’s celebrate voluntary donors’ commitment." },
  post_worldday_body: { fr: "Merci aux donneurs volontaires ! Informez-vous, partagez, et incitez votre entourage à donner.", en: "Thank you to all voluntary donors! Get informed, share, and encourage others to donate." },
  article_not_found: { fr: "Article introuvable.", en: "Article not found." },
};

function translate(key: keyof typeof DICT, lang: Lang) {
  return DICT[key]?.[lang] || DICT[key]?.fr || String(key);
}

type Ctx = { lang: Lang; t: (key: keyof typeof DICT) => string; setLang: (l: Lang) => void };
const I18nCtx = createContext<Ctx | null>(null);

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("I18nProvider missing");
  return ctx;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");
  useEffect(() => {
    const saved = (localStorage.getItem("lang") as Lang) || "fr";
    setLangState(saved);
  }, []);
  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem("lang", l);
  }
  const value = useMemo<Ctx>(() => ({ lang, setLang, t: (k) => translate(k, lang) }), [lang]);
  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}


