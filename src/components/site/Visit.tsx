import { useLang } from "@/i18n/LangContext";
import { business } from "@/data/business";
import { Magnetic, Reveal, SectionHead, btn } from "./ui";
import { OpeningHours } from "./OpeningHours";

export function Visit() {
  const { t } = useLang();
  const b = business;
  return (
    <section id="visit" className="px-5 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <SectionHead num="05" kicker={t.visit.kicker} title={t.visit.title} />
        <div className="mt-16 grid grid-cols-12 gap-8">
          <div className="col-span-12 space-y-12 md:col-span-5">
            <Reveal>
              <h3 className="kicker text-muted-foreground">{t.visit.address}</h3>
              <address className="mt-3 font-display text-3xl font-bold not-italic leading-tight md:text-4xl">
                {b.street}<br />{b.postal} {b.city}
              </address>
            </Reveal>
            <Reveal>
              <h3 className="kicker text-muted-foreground">{t.visit.contact}</h3>
              <ul className="mt-3 space-y-1 font-display text-lg">
                <li><a className="link-line" href={b.phoneHref}>{b.phoneDisplay}</a></li>
                <li><a className="link-line" href={`mailto:${b.email}`}>{b.email}</a></li>
                <li><a className="link-line" href={b.instagram} target="_blank" rel="noopener noreferrer">Instagram — @dotconceptbar</a></li>
              </ul>
            </Reveal>
            <Reveal>
              <h3 id="hours" className="kicker mb-3 text-muted-foreground">{t.visit.hours}</h3>
              <OpeningHours />
            </Reveal>
            <div className="flex flex-wrap gap-3">
              <Magnetic href={b.directions} external className={btn.solid}>{t.visit.dir}</Magnetic>
              <Magnetic href={b.phoneHref} className={btn.line}>{t.visit.call}</Magnetic>
            </div>
          </div>
          <Reveal className="col-span-12 md:col-span-6 md:col-start-7">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-border md:aspect-auto md:h-full md:min-h-[560px]">
              <iframe title="DOT Concept Bar map" src={b.mapEmbed} loading="lazy" className="absolute inset-0 h-full w-full grayscale contrast-125" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
