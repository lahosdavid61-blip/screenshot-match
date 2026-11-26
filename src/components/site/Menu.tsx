import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/i18n/LangContext";
import { menu, menuCategories, type MenuCategory } from "@/data/menu";
import { business } from "@/data/business";
import { EASE, Magnetic, SectionHead, btn } from "./ui";
import { MenuItem } from "./MenuItem";

export function Menu() {
  const { t } = useLang();
  const [cat, setCat] = useState<MenuCategory | "all">("all");
  const items = cat === "all" ? menu : menu.filter((m) => m.category === cat);
  const cats: (MenuCategory | "all")[] = ["all", ...menuCategories];
  return (
    <section id="menu" className="bg-secondary px-5 py-24 text-secondary-foreground md:px-10 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <SectionHead num="02" kicker={t.menu.kicker} title={t.menu.title} tone="dark" />
        <div className="mt-16 grid grid-cols-12 gap-6">
          <div role="tablist" aria-label={t.menu.kicker} className="col-span-12 flex gap-2 overflow-x-auto pb-2 md:col-span-3 md:flex-col md:gap-1">
            {cats.map((c) => (
              <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
                className={`flex shrink-0 items-center gap-3 py-2 pr-4 text-left font-display text-lg font-semibold transition-opacity md:text-2xl ${cat === c ? "opacity-100" : "opacity-40 hover:opacity-75"}`}>
                <span aria-hidden className={`size-2 rounded-full bg-primary transition-transform duration-300 ${cat === c ? "scale-100" : "scale-0"}`} />
                {c === "all" ? t.menu.all : t.menu.cats[c]}
              </button>
            ))}
          </div>
          <div className="col-span-12 md:col-span-8 md:col-start-5">
            <ul role="tabpanel" className="border-t border-ivory/20">
              <AnimatePresence mode="popLayout" initial={false}>
                {items.map((m, i) => (
                  <motion.li key={m.id} layout initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: EASE, delay: i * 0.04 }}>
                    <MenuItem item={m} catLabel={t.menu.cats[m.category]} priceLabel={t.menu.ask} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
            <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <p className="max-w-md italic text-ivory/70">{t.menu.note}</p>
              <Magnetic href={business.instagram} external className={btn.lineDark}>Instagram</Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
