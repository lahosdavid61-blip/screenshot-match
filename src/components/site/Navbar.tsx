import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/i18n/LangContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { EASE } from "./ui";
import { business } from "@/data/business";

const ids = ["home", "about", "menu", "gallery", "events", "reviews", "visit"] as const;

export function Navbar() {
  const { t } = useLang();
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setCompact(window.scrollY > 60);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${compact ? "bg-background/95 py-3 backdrop-blur-sm border-b border-border" : "py-6"}`}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex max-w-[1500px] items-center justify-between px-5 md:px-10"
        >
          <a
            href="#home"
            className="flex items-center gap-2 font-display text-xl font-extrabold tracking-tight"
          >
            <img src="/dot-logo.png" alt="DOT Concept Bar" className="size-10 object-contain" />
            DOT
          </a>
          <ul className="hidden items-center gap-8 lg:flex">
            {ids.slice(1).map((id) => (
              <li key={id}>
                <a href={`#${id}`} className="link-line font-display text-sm font-medium">
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-5">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <ThemeSwitcher />
            <button
              onClick={() => setOpen(true)}
              aria-label={t.menuOpen}
              aria-expanded={open}
              className="flex flex-col gap-1.5 p-2 lg:hidden"
            >
              <span className="h-px w-7 bg-foreground" />
              <span className="h-px w-5 self-end bg-foreground" />
            </button>
          </div>
        </nav>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex flex-col bg-secondary px-6 py-6 text-secondary-foreground"
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 font-display text-xl font-extrabold">
                <img src="/dot-logo.png" alt="DOT Concept Bar" className="size-10 object-contain" />
                DOT
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label={t.menuClose}
                className="kicker p-2"
              >
                ✕
              </button>
            </div>
            <ul className="mt-auto space-y-2">
              {ids.map((id, i) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease: EASE }}
                >
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 font-display text-5xl font-extrabold tracking-tight"
                  >
                    <span className="kicker text-ivory/50">0{i + 1}</span>
                    {t.nav[id]}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-10 border-t border-ivory/20 pt-6">
              <LanguageSwitcher />
              <div className="mt-5">
                <ThemeSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 border-t border-border bg-background/95 backdrop-blur-sm md:hidden">
        <a href="#menu" className="kicker border-r border-border px-2 py-4 text-center">
          {t.nav.menu}
        </a>
        <a
          href={business.directions}
          target="_blank"
          rel="noopener noreferrer"
          className="kicker border-r border-border px-2 py-4 text-center"
        >
          {t.visit.dir}
        </a>
        <a href={business.phoneHref} className="kicker px-2 py-4 text-center">
          {t.visit.call}
        </a>
      </div>
    </>
  );
}
