import { useLang } from "@/i18n/LangContext";
import { langs } from "@/i18n/dict";

export function LanguageSwitcher() {
  const { lang, setLang, t } = useLang();
  return (
    <div role="group" aria-label={t.lang} className="flex items-center gap-1 font-display text-xs font-semibold tracking-[0.14em]">
      {langs.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span aria-hidden className="opacity-30">/</span>}
          <button onClick={() => setLang(l)} aria-pressed={lang === l}
            className={`relative px-1 py-1 uppercase transition-opacity ${lang === l ? "opacity-100" : "opacity-45 hover:opacity-80"}`}>
            {l}
            <span aria-hidden className={`absolute -bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-primary transition-transform duration-300 ${lang === l ? "scale-100" : "scale-0"}`} />
          </button>
        </span>
      ))}
    </div>
  );
}
