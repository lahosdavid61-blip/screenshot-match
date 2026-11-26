import { motion, useReducedMotion } from "motion/react";
import { useLang } from "@/i18n/LangContext";
import { business } from "@/data/business";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { EASE } from "./ui";

export function Footer() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const b = business;
  return (
    <footer className="overflow-hidden bg-secondary px-5 pt-20 pb-8 text-secondary-foreground md:px-10">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid grid-cols-12 gap-6 font-display text-sm">
          <div className="col-span-6 md:col-span-3">
            {b.street}
            <br />
            {b.postal} {b.city}, {b.country}
          </div>
          <div className="col-span-6 md:col-span-3">
            <a className="link-line" href={b.phoneHref}>
              {b.phoneDisplay}
            </a>
            <br />
            <a className="link-line" href={`mailto:${b.email}`}>
              {b.email}
            </a>
          </div>
          <div className="col-span-6 md:col-span-3">
            <a className="link-line" href={b.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <br />
            <a className="link-line" href="#hours">
              {t.footer.hours}
            </a>
          </div>
          <div className="col-span-6 md:col-span-3 md:justify-self-end">
            <LanguageSwitcher />
          </div>
        </div>
        <div className="relative mt-16 flex items-end">
          <p
            aria-hidden
            className="font-display text-[38vw] font-extrabold leading-[0.75] tracking-[-0.08em]"
          >
            DOT
          </p>
          <motion.span
            aria-hidden
            className="mb-[3vw] ml-[1vw] block aspect-square w-[7vw] rounded-full bg-dot-red"
            initial={reduce ? false : { scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE, delay: 0.3 }}
          />
        </div>
        <p className="mt-8 border-t border-ivory/20 pt-6 text-xs text-ivory/60">
          © {new Date().getFullYear()} DOT Concept Bar, Subotica. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
