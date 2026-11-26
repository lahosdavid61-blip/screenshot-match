import { motion, useReducedMotion } from "motion/react";
import { useLang } from "@/i18n/LangContext";
import { business } from "@/data/business";
import { Dot, EASE, Reveal, SectionHead } from "./ui";

export function About() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  return (
    <section id="about" className="px-5 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <SectionHead num="01" kicker={t.about.kicker} title={t.about.title} />
        <div className="mt-16 grid grid-cols-12 gap-6 md:mt-24">
          <motion.div
            className="group col-span-12 aspect-[4/5] md:col-span-6 md:col-start-2"
            initial={reduce ? false : { clipPath: "circle(0% at 50% 50%)" }}
            whileInView={{ clipPath: "circle(75% at 50% 50%)" }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.3, ease: EASE }}
          >
            <img
              src="/dot-street-table-clean.png"
              alt={t.gallery.shots.interior}
              className="h-full w-full object-cover"
            />
          </motion.div>
          <div className="col-span-12 flex flex-col justify-end md:col-span-4 md:col-start-9">
            <Reveal>
              <p className="text-xl leading-relaxed md:text-2xl">{t.about.body}</p>
            </Reveal>
            <ul className="mt-10 divide-y divide-border border-y border-border">
              {t.about.facts.map((f, i) => (
                <Reveal key={f} delay={i * 0.08}>
                  <li className="flex items-center gap-4 py-4 font-display text-sm font-medium">
                    <Dot className="size-1.5" />
                    {f}
                  </li>
                </Reveal>
              ))}
            </ul>
            <div className="mt-10 border-l-4 border-primary bg-muted/60 p-5 md:p-6">
              <p className="kicker text-primary">{t.about.verified}</p>
              <p className="mt-3 text-base leading-relaxed text-foreground/80">
                {t.about.verifiedBody}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-4 font-display text-sm font-semibold">
                <a
                  href={business.mapsSearch}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-line"
                >
                  {t.about.maps} ↗
                </a>
                <span className="text-muted-foreground">
                  {business.rating.value.toFixed(1)} / 5 · {business.rating.count} {t.reviews.count}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
