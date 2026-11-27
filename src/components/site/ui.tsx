import { motion, useReducedMotion } from "motion/react";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { SectionMotion, type SectionKind } from "./DotMotion";

const sectionArt: Partial<Record<string, SectionKind>> = { "01": "about", "02": "menu", "03": "gallery", "04": "events", "05": "reviews", "06": "visit" };

export const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Dot({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`inline-block rounded-full bg-primary ${className}`} />;
}

export function SectionHead({
  num,
  kicker,
  title,
  tone = "light",
}: {
  num: string;
  kicker: string;
  title: string;
  tone?: "light" | "dark";
}) {
  return (
    <header className="grid grid-cols-12 items-end gap-4 border-t border-current/20 pt-6">
      <span
        className={`section-num col-span-12 md:col-span-3 ${tone === "dark" ? "text-ivory/40" : "text-foreground/30"}`}
      >
        {num}
      </span>
      <div className="col-span-12 md:col-span-9">
        <p className="kicker flex items-center gap-3">
          <Dot className="size-2" />
          {kicker}
        </p>
        <div className="flex items-end justify-between gap-3">
          <Reveal className="min-w-0 flex-1">
            <h2 className="mt-4 break-words text-4xl font-extrabold leading-[0.95] tracking-tight md:text-7xl">
              {title}
            </h2>
          </Reveal>
          {sectionArt[num] && <SectionMotion kind={sectionArt[num]} />}
        </div>
      </div>
    </header>
  );
}

const btnBase =
  "group inline-flex items-center gap-3 px-6 py-4 font-display text-sm font-semibold uppercase tracking-[0.14em] transition-colors duration-300";
export const btn = {
  solid: `${btnBase} bg-primary text-primary-foreground hover:bg-foreground hover:text-background`,
  line: `${btnBase} border border-current hover:bg-foreground hover:text-background`,
  lineDark: `${btnBase} border border-ivory/60 text-ivory hover:bg-ivory hover:text-charcoal`,
};

export function Magnetic({
  href,
  className,
  children,
  external,
}: {
  href: string;
  className: string;
  children: ReactNode;
  external?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const move = (e: MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.15}px, ${(e.clientY - r.top - r.height / 2) * 0.25}px)`;
  };
  const leave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={move}
      onMouseLeave={leave}
      className={`${className} transition-transform duration-300`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <ArrowUpRight
        className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        aria-hidden
      />
    </a>
  );
}

/** Clearly marked placeholder until owner-approved photos arrive. */
export function PhotoSlot({
  label,
  note,
  className = "",
}: {
  label: string;
  note: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex h-full w-full flex-col justify-between overflow-hidden bg-muted grain p-5 ${className}`}
    >
      <span className="kicker text-muted-foreground">{note}</span>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[15%] -bottom-[25%] aspect-square w-[70%] rounded-full bg-olive/25 transition-transform duration-700 group-hover:scale-110"
      />
      <span className="relative font-display text-2xl font-bold tracking-tight md:text-3xl">
        {label}
      </span>
    </div>
  );
}
