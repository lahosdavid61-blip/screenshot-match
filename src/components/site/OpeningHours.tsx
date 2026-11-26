import { useEffect, useState } from "react";
import { useLang } from "@/i18n/LangContext";
import { hours, isOpenAt } from "@/data/hours";

export function OpeningHours() {
  const { t } = useLang();
  const [open, setOpen] = useState<boolean | null>(null);
  useEffect(() => {
    if (!hours) return;
    const tick = () => setOpen(isOpenAt(hours!, new Date()));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!hours) return <p className="text-lg italic">{t.visit.hoursTbd}</p>;
  const order = [1, 2, 3, 4, 5, 6, 0] as const;
  return (
    <div>
      {open !== null && (
        <p className="kicker mb-4 flex items-center gap-2">
          <span className={`size-2 rounded-full ${open ? "bg-olive" : "bg-warmgrey"}`} />
          {open ? t.visit.open : t.visit.closed}
        </p>
      )}
      <dl className="divide-y divide-border border-y border-border">
        {order.map((d) => (
          <div key={d} className="flex justify-between py-2 font-display text-sm">
            <dt>{t.visit.days[d]}</dt>
            <dd className="tabular-nums">
              {hours![d] ? `${hours![d]!.open} – ${hours![d]!.close}` : "—"}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
