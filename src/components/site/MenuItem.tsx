import type { MenuItem as Item } from "@/data/menu";

export function MenuItem({ item, catLabel, priceLabel }: { item: Item; catLabel: string; priceLabel: string }) {
  return (
    <div className="flex items-baseline gap-4 border-b border-ivory/20 py-5">
      <span className="font-display text-xl font-semibold md:text-3xl">{item.name}</span>
      <span className="kicker hidden text-ivory/40 sm:inline">{catLabel}</span>
      <span aria-hidden className="mx-2 flex-1 translate-y-[-4px] border-b border-dotted border-ivory/30" />
      <span className="shrink-0 font-display text-sm tabular-nums text-ivory/70">
        {item.price ? `${item.price} RSD` : priceLabel}
      </span>
    </div>
  );
}
