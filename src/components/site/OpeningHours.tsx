import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLang } from "@/i18n/LangContext";
import { belgradeNow, hours, isOpenAt } from "@/data/hours";

const order = [1, 2, 3, 4, 5, 6, 0] as const;

export function OpeningHours() {
  const { t } = useLang();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = window.setInterval(tick, 60_000);
    document.addEventListener("visibilitychange", tick);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", tick);
    };
  }, []);

  const day = now ? belgradeNow(now).day : null;
  const today = day === null ? null : hours[day as keyof typeof hours];
  const open = now === null ? null : isOpenAt(hours, now);
  const formatHours = (value: (typeof hours)[keyof typeof hours]) =>
    value ? `${value.open} – ${value.close}` : t.visit.closed;

  return (
    <details className="group/hours max-w-md border-y border-border">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 py-3 font-display outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden">
        <span className="flex min-w-0 flex-col gap-1">
          <span className="text-sm font-semibold">{t.visit.weeklyHours}</span>
          {open !== null && (
            <span className="flex items-center gap-2 text-xs text-muted-foreground" role="status">
              <span aria-hidden className={`size-1.5 shrink-0 rounded-full ${open ? "bg-olive" : "bg-warmgrey"}`} />
              {open ? t.visit.open : t.visit.closed}
            </span>
          )}
        </span>
        <span className="flex shrink-0 items-center gap-3">
          {day !== null && (
            <span className="text-right text-xs tabular-nums">
              <span className="block text-muted-foreground">{t.visit.today}</span>
              <span className="font-semibold">{formatHours(today)}</span>
            </span>
          )}
          <ChevronDown aria-hidden className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open/hours:rotate-180 motion-reduce:transition-none" />
        </span>
      </summary>
      <dl className="divide-y divide-border border-t border-border font-display text-sm">
        {order.map((d) => (
          <div
            key={d}
            aria-current={day === d ? "date" : undefined}
            className={`flex items-center justify-between gap-3 py-2 ${day === d ? "font-semibold text-primary" : ""}`}
          >
            <dt>{t.visit.days[d]}</dt>
            <dd className="shrink-0 tabular-nums">{formatHours(hours[d])}</dd>
          </div>
        ))}
      </dl>
      <p className="border-t border-border py-3 text-xs leading-relaxed text-muted-foreground">
        {t.visit.hoursNote}
      </p>
    </details>
  );
}
