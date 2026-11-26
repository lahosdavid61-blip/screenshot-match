import type { MenuCategory } from "@/data/menu";

const palette: Record<MenuCategory, { liquid: string; glow: string }> = {
  coffee: { liquid: "#8f573d", glow: "#d7a15b" },
  beer: { liquid: "#e8b94f", glow: "#f5d47b" },
  cocktails: { liquid: "#d76671", glow: "#f6a2a7" },
  wine: { liquid: "#8c3157", glow: "#d26c8c" },
  soft: { liquid: "#b9d873", glow: "#e6f2a5" },
};

function Coffee() {
  return (
    <g>
      <path
        className="drink-steam"
        d="M92 56c-8-12 10-17 2-29M119 54c-8-13 10-18 2-30"
        fill="none"
        stroke="#e8f5d0"
        strokeLinecap="round"
        strokeWidth="4"
      />
      <ellipse cx="105" cy="116" rx="63" ry="12" fill="#071611" opacity="0.35" />
      <path d="M55 78h78v38c0 12-10 22-22 22H77c-12 0-22-10-22-22V78Z" fill="#f0e5c9" />
      <path
        d="M133 87h13c13 0 21 8 21 19s-8 19-21 19h-13"
        fill="none"
        stroke="#f0e5c9"
        strokeWidth="9"
      />
      <ellipse cx="94" cy="78" rx="39" ry="10" fill="#593b2c" />
      <ellipse cx="94" cy="77" rx="27" ry="5" fill="#d99d5d" opacity="0.7" />
      <ellipse cx="39" cy="143" rx="14" ry="8" fill="#a86d43" transform="rotate(-24 39 143)" />
      <path d="M34 139l10 7M42 136l9 7" stroke="#5c3829" strokeWidth="2" />
      <ellipse cx="62" cy="151" rx="12" ry="7" fill="#8b593d" transform="rotate(28 62 151)" />
      <path d="M57 148l10 6" stroke="#4b3027" strokeWidth="2" />
    </g>
  );
}

function Beer() {
  return (
    <g>
      <ellipse cx="106" cy="151" rx="63" ry="11" fill="#071611" opacity="0.35" />
      <path
        d="M64 55h73l-6 84c-1 10-9 17-19 17H89c-10 0-18-7-19-17l-6-84Z"
        fill={palette.beer.liquid}
      />
      <path d="M64 55h73l-4 20H66l-2-20Z" fill="#fff5cf" />
      <path
        d="M137 75h12c14 0 22 9 22 23v20c0 13-8 22-22 22h-15"
        fill="none"
        stroke="#f5d47b"
        strokeWidth="10"
      />
      <path d="M70 75h67" stroke="#fff9df" strokeWidth="4" opacity="0.8" />
      <circle cx="83" cy="42" r="6" fill={palette.beer.glow} />
      <circle cx="104" cy="38" r="8" fill={palette.beer.glow} />
      <circle cx="126" cy="43" r="5" fill={palette.beer.glow} />
    </g>
  );
}

function Cocktail() {
  return (
    <g>
      <ellipse cx="105" cy="151" rx="64" ry="11" fill="#071611" opacity="0.35" />
      <path
        d="M50 50h110l-43 52v48H93v-48L50 50Z"
        fill="#dff5e7"
        fillOpacity="0.13"
        stroke="#dff5e7"
        strokeWidth="3"
      />
      <path d="M68 73h74l-25 29v40H93v-40L68 73Z" fill={palette.cocktails.liquid} opacity="0.9" />
      <path d="M105 101v51M78 157h54" stroke="#e8f5d0" strokeWidth="4" strokeLinecap="round" />
      <path d="M126 59c15-11 26-7 32 1-13 7-24 6-32-1Z" fill="#7fbd62" />
      <circle cx="77" cy="66" r="7" fill="#f8cd62" />
      <path d="M77 59v14" stroke="#e8a84a" strokeWidth="2" />
    </g>
  );
}

function Wine() {
  return (
    <g>
      <ellipse cx="105" cy="151" rx="62" ry="11" fill="#071611" opacity="0.35" />
      <path
        d="M66 50h78l-9 41c-3 14-12 22-25 24v31M105 115v31M80 151h50"
        fill="none"
        stroke="#dff5e7"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M72 72h66l-7 29c-3 9-10 14-26 14s-23-5-26-14l-7-29Z"
        fill={palette.wine.liquid}
        opacity="0.92"
      />
      <path d="M74 67h62" stroke="#f1b5cb" strokeWidth="3" opacity="0.7" />
      <circle cx="141" cy="55" r="8" fill="#83bf5b" />
      <path d="M141 48c7-8 14-6 17-2-5 6-11 7-17 2Z" fill="#a9dc76" />
    </g>
  );
}

function Soft() {
  return (
    <g>
      <ellipse cx="105" cy="151" rx="62" ry="11" fill="#071611" opacity="0.35" />
      <path
        d="M64 51h76l-6 92c-1 9-8 14-17 14H87c-9 0-16-5-17-14l-6-92Z"
        fill="#dff5e7"
        fillOpacity="0.15"
        stroke="#dff5e7"
        strokeWidth="3"
      />
      <path
        d="M69 78h66l-4 61c-1 8-6 11-15 11H88c-9 0-14-3-15-11l-4-61Z"
        fill={palette.soft.liquid}
        opacity="0.88"
      />
      <path d="M69 82h66" stroke="#efffc8" strokeWidth="4" opacity="0.8" />
      <path
        d="M101 54c-12-21 9-25 1-40"
        fill="none"
        stroke="#e8f5d0"
        strokeLinecap="round"
        strokeWidth="4"
        opacity="0.6"
      />
      <circle cx="130" cy="64" r="10" fill="#f3cf69" />
      <path d="M130 54v20M120 64h20" stroke="#d4a849" strokeWidth="2" />
      <circle cx="84" cy="96" r="5" fill="#f5ffe0" opacity="0.7" />
      <circle cx="119" cy="116" r="4" fill="#f5ffe0" opacity="0.7" />
    </g>
  );
}

export function DrinkIllustration({ category, label }: { category: MenuCategory; label: string }) {
  const Illustration =
    category === "coffee"
      ? Coffee
      : category === "beer"
        ? Beer
        : category === "cocktails"
          ? Cocktail
          : category === "wine"
            ? Wine
            : Soft;
  const colors = palette[category];

  return (
    <div
      className="relative overflow-hidden border bg-[var(--drink-panel)] p-5 text-[var(--drink-panel-fg)] shadow-2xl shadow-black/20"
      style={{ borderColor: "var(--drink-panel-border)" }}
      aria-label={label}
    >
      <div
        className="absolute -right-16 -top-16 size-44 rounded-full blur-3xl"
        style={{ backgroundColor: colors.glow, opacity: 0.2 }}
      />
      <div className="relative flex items-center justify-between">
        <span className="kicker opacity-55">{label}</span>
        <span
          className="size-2 rounded-full"
          style={{ backgroundColor: colors.glow }}
          aria-hidden
        />
      </div>
      {category === "coffee" ? (
        <img
          src="/dot-coffee-clean.png"
          alt={label}
          className="drink-float mx-auto mt-2 h-[220px] w-full max-w-[260px] object-cover object-center"
        />
      ) : (
        <svg
          viewBox="0 0 210 175"
          className="drink-float mx-auto mt-2 h-auto w-full max-w-[260px]"
          role="img"
          aria-label={label}
        >
          <Illustration />
        </svg>
      )}
    </div>
  );
}
