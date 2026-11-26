import { MapPin, Navigation } from "lucide-react";
import { useLang } from "@/i18n/LangContext";
import { business } from "@/data/business";

export function MapVisual() {
  const { t } = useLang();

  return (
    <div className="relative h-full min-h-[560px] overflow-hidden border border-border bg-[var(--map-bg)] text-[var(--map-label)]">
      <svg viewBox="0 0 600 760" className="absolute inset-0 h-full w-full opacity-80" aria-hidden>
        <path
          d="M-30 145C100 175 220 120 650 155M-40 328C120 285 260 365 640 305M-20 530C180 470 335 600 640 520M120-30C165 130 120 330 168 800M335-30C300 160 385 280 318 800M505-20C470 160 540 350 460 800"
          fill="none"
          stroke="var(--map-street)"
          strokeWidth="18"
        />
        <path
          d="M-30 145C100 175 220 120 650 155M-40 328C120 285 260 365 640 305M-20 530C180 470 335 600 640 520M120-30C165 130 120 330 168 800M335-30C300 160 385 280 318 800M505-20C470 160 540 350 460 800"
          fill="none"
          stroke="var(--map-street-strong)"
          strokeWidth="2"
          strokeDasharray="8 12"
        />
        <path
          d="M-20 235C160 210 300 250 620 215M-20 420C180 390 360 455 620 400M245-20C230 155 270 320 235 800M420-20C390 160 455 350 395 800"
          fill="none"
          stroke="var(--map-street)"
          strokeWidth="7"
        />
        <circle
          cx="307"
          cy="356"
          r="108"
          fill="none"
          stroke="var(--map-street)"
          strokeDasharray="2 16"
          strokeWidth="2"
        />
      </svg>
      <div className="absolute left-6 top-6 max-w-[13rem]">
        <p className="kicker opacity-55">DOT / Subotica</p>
        <p className="mt-3 font-display text-2xl font-bold leading-tight">{business.street}</p>
      </div>
      <div className="absolute left-1/2 top-[47%] -translate-x-1/2 -translate-y-1/2">
        <span className="absolute -inset-5 animate-ping rounded-full bg-dot-red/20" aria-hidden />
        <span className="relative flex size-14 items-center justify-center rounded-full bg-dot-red text-white shadow-xl shadow-dot-red/30">
          <MapPin className="size-6" fill="currentColor" aria-hidden />
        </span>
      </div>
      <a
        href={business.directions}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-6 left-6 inline-flex items-center gap-2 border border-current/30 bg-[var(--map-bg)]/80 px-4 py-3 font-display text-xs font-semibold uppercase tracking-[0.12em] backdrop-blur transition-colors hover:bg-[var(--map-label)] hover:text-[var(--map-bg)]"
      >
        <Navigation className="size-4" aria-hidden />
        {t.visit.dir}
      </a>
      <span className="absolute bottom-7 right-6 font-display text-[10px] font-semibold uppercase tracking-[0.16em] opacity-45">
        46.0988554 / 19.6651161
      </span>
    </div>
  );
}
