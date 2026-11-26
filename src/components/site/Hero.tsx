import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useLang } from "@/i18n/LangContext";
import { business } from "@/data/business";
import { EASE, Magnetic, btn } from "./ui";

export function Hero() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 120]);
  const init = (d: number) => (reduce ? false : { opacity: 0, y: 20, transition: { delay: d } });

  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden px-5 pt-28 pb-10 md:px-10"
    >
      <div className="mx-auto grid max-w-[1500px] grid-cols-12 gap-4">
        <motion.p
          className="kicker col-span-6"
          initial={init(0)}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease: EASE }}
        >
          {t.hero.loc}
        </motion.p>
        <motion.p
          className="kicker col-span-6 text-right"
          initial={init(0)}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: EASE }}
        >
          46.0988° N — 19.6651° E
        </motion.p>

        <h1 className="relative col-span-12 mt-6 md:mt-2">
          <span className="sr-only">DOT Concept Bar — Subotica</span>
          <span aria-hidden className="block overflow-hidden">
            <motion.span
              className="block font-display text-[34vw] font-extrabold leading-[0.78] tracking-[-0.08em] md:text-[27vw]"
              initial={reduce ? false : { y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
            >
              DOT
            </motion.span>
          </span>
          <motion.span
            aria-hidden
            style={{ y }}
            className="absolute right-[4%] top-[8%] block aspect-square w-[22vw] rounded-full bg-dot-red md:right-[10%] md:w-[13vw]"
            initial={reduce ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.7 }}
          />
        </h1>

        <div className="col-span-12 mt-6 grid grid-cols-12 gap-4 border-t border-border pt-6">
          <motion.p
            aria-hidden
            className="col-span-12 font-display text-2xl font-bold uppercase tracking-[0.3em] md:col-span-4 md:text-3xl"
            initial={init(0)}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8, ease: EASE }}
          >
            {t.hero.sub}
          </motion.p>
          <motion.p
            className="col-span-12 max-w-md text-xl italic leading-snug md:col-span-4 md:text-2xl"
            initial={init(0)}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.8, ease: EASE }}
          >
            {t.hero.line}
          </motion.p>
          <motion.div
            className="col-span-12 flex flex-wrap gap-3 md:col-span-4 md:justify-end"
            initial={init(0)}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8, ease: EASE }}
          >
            <Magnetic href="#menu" className={btn.solid}>
              {t.hero.menu}
            </Magnetic>
            <Magnetic href={business.directions} external className={btn.line}>
              {t.hero.dir}
            </Magnetic>
          </motion.div>
        </div>
      </div>
      <a
        href="#about"
        className="kicker absolute bottom-6 left-5 flex items-center gap-3 md:left-10"
      >
        <span className="relative h-10 w-px overflow-hidden bg-border">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-pulse bg-foreground" />
        </span>
        {t.hero.scroll}
      </a>
    </section>
  );
}
