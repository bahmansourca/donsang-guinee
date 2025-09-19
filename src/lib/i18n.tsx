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


