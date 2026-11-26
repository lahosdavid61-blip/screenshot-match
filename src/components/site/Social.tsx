import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useLang } from "@/i18n/LangContext";
import { business } from "@/data/business";
import { Magnetic, btn } from "./ui";

/** Signature interaction: the dot grows into the whole section as it scrolls in. */
export function Social() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const clip = useTransform(
    scrollYProgress,
    [0, 1],
    ["circle(3% at 50% 50%)", "circle(75% at 50% 50%)"],
  );
  return (
    <section ref={ref} aria-labelledby="ig" className="relative px-5 py-10 md:px-10">
      <motion.div
        style={reduce ? {} : { clipPath: clip }}
        className="mx-auto flex min-h-[80svh] max-w-[1500px] flex-col items-center justify-center bg-primary px-6 py-20 text-center text-primary-foreground"
      >
        <p className="kicker">{t.social.kicker}</p>
        <h2
          id="ig"
          className="mt-6 max-w-4xl text-5xl font-extrabold leading-[0.95] tracking-tight md:text-8xl"
        >
          {t.social.title}
        </h2>
        <div className="mt-10">
          <Magnetic href={business.instagram} external className={btn.lineDark}>
            {t.social.cta}
          </Magnetic>
        </div>
      </motion.div>
    </section>
  );
}
