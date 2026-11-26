import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useLang } from "@/i18n/LangContext";
import { gallery } from "@/data/gallery";
import { EASE, PhotoSlot, SectionHead } from "./ui";
import { Lightbox } from "./Lightbox";

export function Gallery() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState<number | null>(null);
  return (
    <section id="gallery" className="px-5 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <SectionHead num="03" kicker={t.gallery.kicker} title={t.gallery.title} />
        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-12 md:auto-rows-[minmax(0,1fr)]">
          {gallery.map((g, i) => (
            <motion.button
              key={g.id}
              onClick={() => setIdx(i)}
              aria-label={t.gallery.shots[g.key]}
              className={`group block overflow-hidden text-left ${g.span}`}
              initial={reduce ? false : { clipPath: "inset(12% 12% 12% 12%)", opacity: 0 }}
              whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.1, ease: EASE, delay: (i % 3) * 0.08 }}
            >
              <PhotoSlot label={t.gallery.shots[g.key]} note={`0${i + 1} — ${t.gallery.ph}`} />
            </motion.button>
          ))}
        </div>
      </div>
      <Lightbox index={idx} onChange={setIdx} />
    </section>
  );
}
