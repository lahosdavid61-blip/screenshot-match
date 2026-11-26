import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useLang } from "@/i18n/LangContext";
import { business } from "@/data/business";
import { EASE, Magnetic, btn } from "./ui";
import { RealCoffeeBeans } from "./DotMotion";

export function Hero() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 120]);
  const init = (d: number) => (reduce ? false : { opacity: 0, y: 20, transition: { delay: d } });

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col overflow-hidden px-5 pt-28 pb-20 md:px-10 md:pb-6"
    >
      <div className="mx-auto flex w-full max-w-[1500px] flex-1 flex-col">
        <div className="grid grid-cols-12 gap-4">
          <motion.p
            className="kicker col-span-6"
            initial={init(0)}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduce ? 0 : 0.9, duration: reduce ? 0 : 0.8, ease: EASE }}
          >
            {t.hero.loc}
          </motion.p>
          <motion.p
            className="kicker col-span-6 text-right"
            initial={init(0)}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduce ? 0 : 1, duration: reduce ? 0 : 0.8, ease: EASE }}
          >
            46.0988° N — 19.6651° E
          </motion.p>

        </div>

        <h1 className="relative isolate mt-10 md:mt-8">
          <span className="sr-only">DOT Concept Bar — Subotica</span>
          <RealCoffeeBeans />
          <span aria-hidden className="relative z-[1] block overflow-hidden">
            <motion.span
              className="block font-display text-[34vw] font-extrabold leading-[0.78] tracking-[-0.08em] md:text-[min(27vw,390px)]"
              initial={reduce ? false : { y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: reduce ? 0 : 1.05, ease: EASE, delay: reduce ? 0 : 0.08 }}
            >
              DOT
            </motion.span>
          </span>
          <motion.span
            aria-hidden
            style={{ y }}
            className="absolute z-[2] right-[4%] top-[8%] block aspect-square w-[22vw] rounded-full bg-dot-red md:right-[10%] md:w-[13vw]"
            initial={reduce ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: reduce ? 0 : 0.85, ease: EASE, delay: reduce ? 0 : 0.48 }}
          />
          <RealCoffeeBeans foreground />
        </h1>

        <div className="mt-10 flex flex-1 flex-col justify-end border-t border-border pt-6 md:mt-12 md:pt-8">
          <div className="grid gap-7 md:grid-cols-12 md:items-end md:gap-10">
            <div className="min-w-0 md:col-span-8">
              <motion.p
                className="font-display text-xl font-bold uppercase tracking-[0.3em] md:text-2xl"
                initial={init(0)}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduce ? 0 : 1.1, duration: reduce ? 0 : 0.65, ease: EASE }}
              >
                {t.hero.sub}
              </motion.p>
              <motion.p
                className="mt-6 max-w-[25ch] text-[clamp(1.9rem,4.2vw,4.2rem)] italic leading-[1.12] tracking-[-0.035em] [font-family:Georgia,serif] md:mt-8"
                initial={init(0)}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduce ? 0 : 1.25, duration: reduce ? 0 : 0.75, ease: EASE }}
              >
                <span className="underline decoration-primary/75 decoration-[1px] underline-offset-[0.15em]">
                  {t.hero.line}
                </span>
              </motion.p>
            </div>
            <motion.div
              className="flex w-full min-w-0 flex-col gap-3 md:col-span-4 md:pb-1"
              initial={init(0)}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduce ? 0 : 0.85, duration: reduce ? 0 : 0.55, ease: EASE }}
            >
              <Magnetic href="#menu" className={`${btn.solid} w-full min-h-[64px] justify-between md:min-h-[76px]`}>
                {t.hero.menu}
              </Magnetic>
              <Magnetic href={business.directions} external className={`${btn.line} w-full min-h-[64px] justify-between md:min-h-[76px]`}>
                {t.hero.dir}
              </Magnetic>
            </motion.div>
          </div>
          <a
            href="#about"
            className="kicker mt-8 flex w-fit items-center gap-3 md:mt-9"
          >
            <span className="relative h-8 w-px overflow-hidden bg-border">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-pulse bg-foreground motion-reduce:animate-none" />
            </span>
            {t.hero.scroll}
          </a>
        </div>
      </div>
    </section>
  );
}
