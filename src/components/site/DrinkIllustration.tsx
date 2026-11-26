import type { MenuCategory } from "@/data/menu";

const palette: Record<MenuCategory, string> = {
  coffee: "#c18a5f", beer: "#e8b94f", cocktails: "#d76671", wine: "#a64d70", soft: "#c6d978",
};

function Coffee() {
  return <g className="dot-cup-slide">
    <ellipse cx="120" cy="143" rx="66" ry="12" fill="#101a16" opacity=".27"/>
    <ellipse cx="120" cy="131" rx="65" ry="10" fill="#e2cfaa"/>
    <path d="M74 65h82v42q0 25-25 25H99q-25 0-25-25Z" fill="#f0e5c9" stroke="#aa9678" strokeWidth="2"/>
    <path d="M155 78h12a16 16 0 0 1 0 32h-13" fill="none" stroke="#f0e5c9" strokeWidth="9"/>
    <ellipse cx="115" cy="65" rx="41" ry="10" fill="#5a392b"/>
    <ellipse cx="115" cy="65" rx="32" ry="6" fill="#bd8750"/>
    <path className="dot-coffee-ripple" d="M98 65q16-6 32 0-16 6-32 0Z" fill="none" stroke="#f3d1a1" strokeWidth="2"/>
    <g className="dot-steam-once" stroke="#eee5cc" strokeWidth="3" strokeLinecap="round" fill="none">
      <path d="M99 49c-10-12 10-19 0-31M125 49c-10-12 10-19 0-31"/>
    </g>
    <g className="dot-garnish">
      <ellipse cx="57" cy="142" rx="11" ry="7" fill="#a86d43" transform="rotate(-27 57 142)"/>
      <path d="M50 145q7-2 13-7" stroke="#513429" strokeWidth="2" fill="none"/>
      <ellipse cx="77" cy="148" rx="10" ry="6" fill="#80513b" transform="rotate(26 77 148)"/>
      <path d="M70 145q6 5 13 6" stroke="#513429" strokeWidth="2" fill="none"/>
    </g>
  </g>;
}

type PairKind = "beer" | "cocktails" | "wine";

function Glass({ kind }: { kind: PairKind }) {
  if (kind === "beer") return <g>
    <path d="M-29 44h-10q-10 0-10 12v28q0 12 10 12h13" fill="none" stroke="#f5e6c6" strokeWidth="6"/>
    <path d="M-31 32h62l-5 96q-1 7-8 7h-36q-7 0-8-7Z" fill="#e8b94f" stroke="#f5e6c6" strokeWidth="2"/>
    <path d="M-29 33q8-10 15-4 8-7 16 0 9-8 17 0 7-4 12 3l-1 17h-58Z" fill="#fff1cd"/>
    <path d="M-18 54l4 62M8 54l-1 62" stroke="#fff3cd" strokeWidth="3" opacity=".45" strokeLinecap="round"/>
    <g className="dot-liquid-detail" fill="#fff1cd" opacity=".65"><circle cx="15" cy="82" r="2.5"/><circle cx="-9" cy="99" r="2"/><circle cx="5" cy="65" r="2"/></g>
  </g>;
  if (kind === "cocktails") return <g>
    <path d="M-37 34h74L4 91v38h20v4h-48v-4h20V91Z" fill="#f0e5c9" fillOpacity=".1" stroke="#f0e5c9" strokeWidth="2.2" strokeLinejoin="round"/>
    <path d="M-27 48h54L0 88Z" fill="#d76671"/>
    <path className="dot-liquid-detail" d="M-25 48q13 3 25 0t25 0" stroke="#f9b7ab" fill="none" strokeWidth="2"/>
    <g className="dot-garnish"><circle cx="-26" cy="35" r="11" fill="#d6b769" stroke="#f0e5c9" strokeWidth="1.4"/><path d="M-26 26v18M-35 35h18M-32 29l12 12M-20 29l-12 12" stroke="#a87a37" strokeWidth="1"/></g>
  </g>;
  return <g>
    <path d="M-34 29h68l-6 40q-4 24-28 29-24-5-28-29Z" fill="#f0e5c9" fillOpacity=".1" stroke="#f0e5c9" strokeWidth="2.2"/>
    <path d="M-27 52h54l-4 19Q18 91 0 94-18 91-23 71Z" fill="#a64d70"/>
    <path className="dot-liquid-detail" d="M-26 52q13 3 26 0t26 0" fill="none" stroke="#e9a4b8" strokeWidth="2"/>
    <path d="M0 98v33M-22 135h44" stroke="#f0e5c9" strokeWidth="2.6" strokeLinecap="round"/>
    <path d="M-22 37l4 25" stroke="#f0e5c9" strokeWidth="2" opacity=".45" strokeLinecap="round"/>
  </g>;
}

function Clink({ kind }: { kind: PairKind }) {
  return <g className={`dot-clink dot-clink-${kind}`}>
    <ellipse cx="120" cy="145" rx="92" ry="10" fill="#101a16" opacity=".24"/>
    <g transform="translate(77 0)"><g className="dot-glass-left"><Glass kind={kind}/></g></g>
    <g transform="translate(163 0)"><g className="dot-glass-right"><g transform="scale(-1 1)"><Glass kind={kind}/></g></g></g>
    <g className="dot-clink-spark" stroke="#f0d49a" strokeWidth="2" strokeLinecap="round" fill="none">
      <path d="M120 12v12M108 18l5 8M132 18l-5 8"/>
    </g>
  </g>;
}

function Soft() {
  return <g>
    <g className="dot-cup-slide">
      <ellipse cx="120" cy="145" rx="53" ry="10" fill="#101a16" opacity=".27"/>
      <path d="M78 38h84l-9 94q-1 10-11 10H98q-10 0-11-10Z" fill="#e5ead3" fillOpacity=".14" stroke="#f0e5c9" strokeWidth="2.5"/>
      <path d="M82 61h76l-9 69q-1 8-9 8h-40q-8 0-9-8Z" fill="#c6d978" opacity=".9"/>
      <path d="M91 65h58" stroke="#f0f5ca" strokeWidth="2"/>
      <g className="dot-ice" fill="#edf5e8" fillOpacity=".65" stroke="#f0e5c9" strokeWidth="1">
        <rect x="98" y="69" width="17" height="16" rx="3" transform="rotate(-18 106 77)"/>
        <rect x="127" y="80" width="17" height="17" rx="3" transform="rotate(16 135 88)"/>
        <rect x="107" y="101" width="19" height="17" rx="3" transform="rotate(8 116 109)"/>
      </g>
      <path d="M104 35l12 82" stroke="#f0e5c9" strokeWidth="3" strokeLinecap="round"/>
      <g fill="#f0f5ca" opacity=".62"><circle cx="94" cy="92" r="2"/><circle cx="140" cy="115" r="2.5"/><circle cx="119" cy="126" r="2"/></g>
    </g>
    <g transform="translate(158 38)"><g className="dot-lemon">
      <circle r="20" fill="#e1b64d" stroke="#f8e6a7" strokeWidth="2"/>
      <circle r="15.5" fill="#f7dc79" stroke="#f9edbf" strokeWidth="1.5"/>
      <path d="M0-15V15M-15 0H15M-10.5-10.5l21 21M-10.5 10.5l21-21" stroke="#f9edbf" strokeWidth="1.6"/>
      <path d="M0 0v20" stroke="#b88a36" strokeWidth="1.5"/>
    </g></g>
  </g>;
}

function MenuCard() {
  return <g className="dot-cup-slide" stroke="#78563b" strokeWidth="2.5">
    <path d="M76 17h88v125H76Z" fill="#f0e5c9"/>
    <circle cx="120" cy="39" r="6" fill="#a64d70" stroke="none"/>
    <path d="M91 57h58M91 72h44M91 92h58M91 107h50M91 125h35" strokeLinecap="round" opacity=".75"/>
  </g>;
}

export function DrinkIllustration({ category, label, variant }: {
  category: MenuCategory;
  label: string;
  variant?: "menu";
}) {
  return (
    <div className="relative overflow-hidden border bg-[var(--drink-panel)] p-4 text-[var(--drink-panel-fg)]"
      style={{borderColor:"var(--drink-panel-border)"}}>
      <div className="relative flex items-center justify-between gap-2">
        <span className="kicker opacity-70">{label}</span>
        <span className="size-2 shrink-0 rounded-full" style={{backgroundColor:palette[category]}} aria-hidden="true"/>
      </div>
      <svg viewBox="0 0 240 166" className="dot-drink-art mx-auto mt-2 h-auto w-full max-w-[260px]" aria-hidden="true">
        {variant === "menu" ? <MenuCard/> : category === "coffee" ? <Coffee/> : category === "soft" ? <Soft/> : <Clink kind={category}/>}
      </svg>
    </div>
  );
}
