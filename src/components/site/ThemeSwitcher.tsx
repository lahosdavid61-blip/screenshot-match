import { useEffect, useState } from "react";
import { Palette } from "lucide-react";
import { useLang } from "@/i18n/LangContext";

export type ThemeMode = "emerald" | "noir" | "chalk";

const modes: ThemeMode[] = ["emerald", "noir", "chalk"];

export function ThemeSwitcher() {
  const { t } = useLang();
  const [theme, setTheme] = useState<ThemeMode>("emerald");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("dot-theme") as ThemeMode | null;
    const next = saved && modes.includes(saved) ? saved : "emerald";
    setTheme(next);
    document.documentElement.dataset.theme = next;
  }, []);

  const choose = (next: ThemeMode) => {
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("dot-theme", next);
    setOpen(false);
  };

  const labels: Record<ThemeMode, string> = {
    emerald: t.theme.emerald,
    noir: t.theme.noir,
    chalk: t.theme.chalk,
  };

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={t.theme.label}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-2 rounded-full border border-current/20 px-3 py-2 font-display text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors hover:border-current/50"
      >
        <Palette className="size-3.5" aria-hidden />
        <span className="hidden md:inline">{labels[theme]}</span>
        <span className="size-2 rounded-full bg-dot-red" aria-hidden />
      </button>
      {open && (
        <div
          role="dialog"
          aria-label={t.theme.label}
          className="absolute right-0 top-[calc(100%+0.6rem)] z-50 min-w-40 border border-border bg-card p-2 text-card-foreground shadow-2xl"
        >
          <p className="kicker px-2 pb-2 pt-1 text-muted-foreground">{t.theme.label}</p>
          <div className="grid gap-1">
            {modes.map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => choose(mode)}
                aria-pressed={theme === mode}
                className={`flex items-center gap-3 px-2 py-2 text-left font-display text-xs font-semibold transition-colors ${theme === mode ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
              >
                <span
                  className={`size-3 rounded-full border border-current/30 ${mode === "emerald" ? "bg-[#3f9f77]" : mode === "noir" ? "bg-[#090d0c]" : "bg-[#f5f0e3]"}`}
                  aria-hidden
                />
                {labels[mode]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
