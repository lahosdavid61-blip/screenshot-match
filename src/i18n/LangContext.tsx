import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { dict, langs, type Lang } from "./dict";

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (typeof dict)["sr"] }>({
  lang: "sr", setLang: () => {}, t: dict.sr,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("sr");
  useEffect(() => {
    const s = localStorage.getItem("dot-lang") as Lang | null;
    if (s && langs.includes(s)) setLangState(s);
  }, []);
  useEffect(() => { document.documentElement.lang = lang === "sr" ? "sr-Latn" : lang; }, [lang]);
  const setLang = (l: Lang) => { setLangState(l); localStorage.setItem("dot-lang", l); };
  return <Ctx.Provider value={{ lang, setLang, t: dict[lang] }}>{children}</Ctx.Provider>;
}
export const useLang = () => useContext(Ctx);
