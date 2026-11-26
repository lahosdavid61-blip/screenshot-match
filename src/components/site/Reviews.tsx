import { useLang } from "@/i18n/LangContext";
import { business } from "@/data/business";
import { reviewThemes } from "@/data/reviews";
import { Magnetic, Reveal, SectionHead, btn } from "./ui";

export function Reviews() {
  const { t } = useLang();
  const r = business.rating;
  return (
    <section id="reviews" className="px-5 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <SectionHead num="04" kicker={t.reviews.kicker} title={t.reviews.title} />
        <div className="mt-16 grid grid-cols-12 gap-6">
          <Reveal className="col-span-12 md:col-span-5">
            <p className="font-display text-[28vw] font-extrabold leading-[0.8] tracking-[-0.07em] text-primary md:text-[14vw]">
              {r.value.toFixed(1)}
            </p>
            <p className="mt-6 font-display text-lg">{t.reviews.of} 5 — {r.count} {t.reviews.count}</p>
            <div className="mt-8"><Magnetic href={business.mapsSearch} external className={btn.line}>{t.reviews.read}</Magnetic></div>
          </Reveal>
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <p className="kicker text-muted-foreground">{t.reviews.src}</p>
            <ul className="mt-6 border-t border-border">
              {reviewThemes.map((k, i) => (
                <Reveal key={k} delay={i * 0.07}>
                  <li className="flex items-baseline gap-6 border-b border-border py-5">
                    <span className="kicker text-muted-foreground">0{i + 1}</span>
                    <span className="text-3xl italic md:text-5xl">“{t.reviews.themes[k]}”</span>
                  </li>
                </Reveal>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">Google · via Restaurant Guru · {r.checked}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
