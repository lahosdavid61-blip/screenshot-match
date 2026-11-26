import { motion, useReducedMotion } from "motion/react";
import { useLang } from "@/i18n/LangContext";
import { EASE, Reveal, SectionHead } from "./ui";

export function EventMoment() {
  const { t } = useLang();
  const reduce = useReducedMotion();

  return (
    <section
      id="events"
      className="bg-secondary px-5 py-24 text-secondary-foreground md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1500px]">
        <SectionHead num="04" kicker={t.event.kicker} title={t.event.title} tone="dark" />
        <Reveal className="mt-8 max-w-xl">
          <p className="text-lg leading-relaxed text-ivory/70 md:text-xl">{t.event.body}</p>
        </Reveal>
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          <motion.figure
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <div className="border-4 border-black bg-black p-1">
              <img
                src="/dot-event-upscaled.png"
                alt={t.event.title}
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
              />
            </div>
            <figcaption className="kicker mt-4 text-ivory/55">01 — {t.event.framed}</figcaption>
          </motion.figure>
          <motion.figure
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}
          >
            <div>
              <img
                src="/dot-event-upscaled.png"
                alt={t.event.title}
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
              />
            </div>
            <figcaption className="kicker mt-4 text-ivory/55">02 — {t.event.clean}</figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
