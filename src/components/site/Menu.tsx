import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";
import { useLang } from "@/i18n/LangContext";
import { menu, menuCategories, type MenuCategory } from "@/data/menu";
import { business } from "@/data/business";
import { EASE, Magnetic, SectionHead, btn } from "./ui";
import { MenuItem } from "./MenuItem";
import { DrinkIllustration } from "./DrinkIllustration";

type Moment = "morning" | "afternoon" | "friends" | "break";

const momentCategories: Record<Moment, MenuCategory[]> = {
  morning: ["coffee", "soft"],
  afternoon: ["coffee", "soft", "wine"],
  friends: ["beer", "cocktails", "wine"],
  break: ["coffee", "soft", "beer"],
};

export function Menu() {
  const { t } = useLang();
  const [cat, setCat] = useState<MenuCategory | "all">("all");
  const [query, setQuery] = useState("");
  const [moment, setMoment] = useState<Moment | null>(null);
  const cats: (MenuCategory | "all")[] = ["all", ...menuCategories];
  const items = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    const allowed = moment ? momentCategories[moment] : null;
    return menu.filter((item) => {
      const matchesCategory = cat === "all" || item.category === cat;
      const matchesMoment = !allowed || allowed.includes(item.category);
      const matchesQuery = !normalized || item.name.toLocaleLowerCase().includes(normalized);
      return matchesCategory && matchesMoment && matchesQuery;
    });
  }, [cat, moment, query]);
  const illustrationCategory: MenuCategory =
    cat === "all"
      ? moment
        ? (momentCategories[moment][0] ?? "coffee")
        : "coffee"
      : cat;

  const chooseMoment = (value: Moment) => {
    setMoment(value);
    setCat("all");
    setQuery("");
  };

  return (
    <section
      id="menu"
      className="bg-secondary px-5 py-24 text-secondary-foreground md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1500px]">
        <SectionHead num="02" kicker={t.menu.kicker} title={t.menu.title} tone="dark" />
        <div className="mt-16 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <div
              role="tablist"
              aria-label={t.menu.kicker}
              className="flex gap-2 overflow-x-auto pb-2 md:flex-col md:gap-1"
            >
              {cats.map((c) => (
                <button
                  key={c}
                  role="tab"
                  aria-selected={cat === c}
                  onClick={() => {
                    setCat(c);
                    setMoment(null);
                  }}
                  className={`flex shrink-0 items-center gap-3 py-2 pr-4 text-left font-display text-lg font-semibold transition-opacity md:text-2xl ${cat === c && !moment ? "opacity-100" : "opacity-40 hover:opacity-75"}`}
                >
                  <span
                    aria-hidden
                    className={`size-2 rounded-full bg-primary transition-transform duration-300 ${cat === c && !moment ? "scale-100" : "scale-0"}`}
                  />
                  {c === "all" ? t.menu.all : t.menu.cats[c]}
                </button>
              ))}
            </div>
            <motion.div
              key={illustrationCategory}
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="mt-8"
            >
              <DrinkIllustration
                category={illustrationCategory}
                label={t.menu.cats[illustrationCategory]}
                {...(cat === "all" && !moment ? { variant: "menu" as const } : {})}
              />
            </motion.div>
            <div className="mt-10 border-t border-ivory/20 pt-6">
              <p className="kicker mb-4 text-ivory/50">{t.menu.moments}</p>
              <div className="flex flex-wrap gap-2 md:flex-col md:items-start">
                {(Object.keys(momentCategories) as Moment[]).map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => chooseMoment(value)}
                    className={`border px-3 py-2 text-left font-display text-sm transition-colors ${moment === value ? "border-primary bg-primary text-primary-foreground" : "border-ivory/20 text-ivory/75 hover:border-ivory/60"}`}
                  >
                    {t.menu.momentOptions[value]}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-8 md:col-start-5">
            <div className="mb-8 flex items-center gap-3 border-b border-ivory/20 pb-3">
              <Search aria-hidden className="size-5 text-ivory/50" />
              <label htmlFor="menu-search" className="sr-only">
                {t.menu.search}
              </label>
              <input
                id="menu-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t.menu.search}
                className="min-w-0 flex-1 bg-transparent font-display text-lg text-ivory outline-none placeholder:text-ivory/40"
              />
              {(query || moment) && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setMoment(null);
                    setCat("all");
                  }}
                  className="kicker flex items-center gap-1 text-ivory/60 hover:text-ivory"
                >
                  <X className="size-4" /> {t.menu.clear}
                </button>
              )}
            </div>
            <ul role="tabpanel" aria-live="polite" className="border-t border-ivory/20">
              <AnimatePresence mode="popLayout" initial={false}>
                {items.map((item, index) => (
                  <motion.li
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: EASE, delay: index * 0.04 }}
                  >
                    <MenuItem
                      item={item}
                      catLabel={t.menu.cats[item.category]}
                      priceLabel={t.menu.ask}
                    />
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
            {items.length === 0 && (
              <p className="border-b border-ivory/20 py-8 text-ivory/60">{t.menu.note}</p>
            )}
            <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <p className="max-w-md italic text-ivory/70">{t.menu.note}</p>
              <Magnetic href={business.instagram} external className={btn.lineDark}>
                Instagram
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
