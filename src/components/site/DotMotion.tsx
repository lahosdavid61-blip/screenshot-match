import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useInView } from "motion/react";

// Four distinct beans cropped from Raysonho's real CC0 studio photograph.
export const coffeeBeanPhoto =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/CoffeeBeansWhiteBackground.jpg/2560px-CoffeeBeansWhiteBackground.jpg";

// Crop coordinates are normalized to a 1000 × 667 reference preview.
// Hand-traced silhouettes remove the white background and original cast shadows.
const crops = [
  { x: 394, y: 357, w: 61, h: 53, outline: "polygon(4% 33%, 14% 18%, 30% 7%, 48% 3%, 64% 10%, 84% 27%, 96% 49%, 97% 69%, 85% 86%, 65% 96%, 44% 96%, 25% 85%, 9% 65%, 1% 48%)" },
  { x: 497, y: 361, w: 80, h: 62, outline: "polygon(3% 60%, 10% 42%, 25% 23%, 47% 6%, 65% 1%, 82% 8%, 94% 24%, 98% 43%, 92% 64%, 77% 80%, 55% 94%, 32% 98%, 15% 87%, 4% 75%)" },
  { x: 777, y: 250, w: 55, h: 50, outline: "polygon(3% 45%, 12% 25%, 29% 10%, 52% 3%, 73% 7%, 89% 23%, 97% 44%, 93% 63%, 81% 83%, 61% 95%, 43% 96%, 21% 85%, 6% 70%)" },
  { x: 229, y: 357, w: 96, h: 58, outline: "polygon(2% 66%, 8% 46%, 23% 29%, 44% 13%, 64% 2%, 79% 4%, 92% 16%, 98% 37%, 94% 55%, 79% 70%, 62% 82%, 44% 94%, 23% 97%, 7% 89%)" },
] as const;

// Deliberately composed rather than randomized: independent direction, depth,
// scale, angle and timing create a photographic still life around the wordmark.
const beans = [
  { crop: 3, x: 7, y: 6, angle: -30, size: 0.95, dx: -230, dy: -110, turn: -55, delay: 0.12, duration: 1.30, depth: 0.88 },
  { crop: 0, x: 21, y: 0, angle: 35, size: 0.69, dx: -90, dy: -190, turn: 45, delay: 0.26, duration: 1.12, depth: 1.05 },
  { crop: 1, x: 34, y: 91, angle: -42, size: 0.95, dx: -130, dy: 145, turn: -60, delay: 0.38, duration: 1.26, depth: 0.96 },
  { crop: 2, x: 48, y: 5, angle: 24, size: 0.65, dx: 35, dy: -175, turn: 70, delay: 0.19, duration: 1.18, depth: 1.08 },
  { crop: 0, x: 61, y: 92, angle: 73, size: 1.13, dx: 80, dy: 180, turn: -40, delay: 0.32, duration: 1.32, depth: 0.88 },
  { crop: 1, x: 75, y: 2, angle: -68, size: 0.82, dx: 170, dy: -115, turn: 52, delay: 0.24, duration: 1.23, depth: 1.02 },
  { crop: 2, x: 91, y: 79, angle: -32, size: 1.12, dx: 245, dy: 105, turn: 80, delay: 0.40, duration: 1.28, depth: 0.95 },
  { crop: 3, x: 96, y: 17, angle: 52, size: 0.88, dx: 255, dy: -40, turn: -65, delay: 0.15, duration: 1.34, depth: 1.06 },
] as const;

function PhotographicBean({ bean }: { bean: (typeof beans)[number] }) {
  const crop = crops[bean.crop];
  return (
    <span
      className="dot-bean"
      style={{
        left: `${bean.x}%`,
        top: `${bean.y}%`,
        "--bean-angle": `${bean.angle}deg`,
        "--bean-scale": bean.size,
        "--bean-dx": `${bean.dx}px`,
        "--bean-dy": `${bean.dy}px`,
        "--bean-turn": `${bean.turn}deg`,
        "--bean-delay": `${bean.delay}s`,
        "--bean-duration": `${bean.duration}s`,
        "--bean-depth": bean.depth,
      } as CSSProperties}
    >
      <span
        className="dot-bean-cutout"
        style={{ aspectRatio: `${crop.w} / ${crop.h}`, clipPath: crop.outline }}
      >
        <img
          src={coffeeBeanPhoto}
          alt=""
          width={2560}
          height={1706}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          draggable={false}
          referrerPolicy="no-referrer"
          style={{
            width: `${100000 / crop.w}%`,
            left: `${-100 * crop.x / crop.w}%`,
            top: `${-100 * crop.y / crop.h}%`,
          }}
        />
      </span>
    </span>
  );
}

/** Replays on every page mount without storage, timers or a blocking loader. */
export function RealCoffeeBeans({ foreground = false }: { foreground?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`dot-bean-layer ${foreground ? "dot-bean-front" : "dot-bean-back"}`}
    >
      {beans.map((bean, i) =>
        i % 2 === (foreground ? 1 : 0) ? <PhotographicBean key={i} bean={bean} /> : null,
      )}
    </span>
  );
}

export type SectionKind = "about" | "gallery" | "events" | "reviews" | "visit" | "hours";

function SectionArt({ kind }: { kind: SectionKind }) {
  const ink = "currentColor";
  const accent = "var(--dot-red)";
  if (kind === "gallery") return (
    <>
      <g className="dot-scene-slide" stroke={ink} strokeWidth="2.4" strokeLinejoin="round">
        <path d="M20 30h19l6-9h30l6 9h18q7 0 7 7v44q0 7-7 7H20q-7 0-7-7V37q0-7 7-7Z" fill="var(--dot-art-bg, transparent)"/>
        <path d="M18 43h83M18 76h83M84 23h13v7" fill="none" opacity=".5"/>
        <circle cx="60" cy="59" r="23" fill="none"/>
        <g className="dot-camera-lens">
          <circle cx="60" cy="59" r="16" fill="none"/>
          <path d="M60 43l9 16-9 16-9-16Z" fill={accent} stroke="none" opacity=".85"/>
          <path d="M44 59h32M60 43v32" strokeWidth="1" opacity=".55"/>
        </g>
        <rect x="84" y="36" width="13" height="8" rx="1" fill={accent} stroke="none"/>
      </g>
      <g className="dot-camera-flash" fill={accent}>
        <path d="M103 5l3 13 11 4-11 3-3 13-4-13-11-3 11-4Z"/>
        <circle cx="103" cy="22" r="14" opacity=".12"/>
      </g>
    </>
  );
  if (kind === "reviews") return (
    <>
      <g className="dot-scene-slide" fill="none" stroke={ink} strokeWidth="2.4" strokeLinejoin="round">
        <path d="M24 24h72q8 0 8 8v38q0 8-8 8H49L33 91V78h-9q-8 0-8-8V32q0-8 8-8Z"/>
        <path d="M30 65h43" opacity=".45"/>
      </g>
      {[36,60,84].map((x,i)=><g key={x} transform={`translate(${x} 47)`}><path className="dot-star" style={{ animationDelay: `${0.26+i*.12}s` }} d="M0-10 3-3 11-3 5 2 7 10 0 6-7 10-5 2-11-3-3-3Z" fill={accent}/></g>)}
    </>
  );
  if (kind === "visit") return (
    <>
      <path className="dot-route" d="M9 88c24 0 20-22 42-22s27 20 61 14" fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" strokeDasharray="3 6"/>
      <ellipse className="dot-pin-ripple" cx="64" cy="77" rx="25" ry="9" stroke={accent} strokeWidth="2" fill="none"/>
      <g className="dot-pin">
        <path d="M64 12c-17 0-29 12-29 27 0 18 29 42 29 42s29-24 29-42c0-15-12-27-29-27Z" fill={accent} stroke={ink} strokeWidth="2"/>
        <circle cx="64" cy="39" r="11" fill="var(--ivory)" stroke={ink} strokeWidth="2"/>
      </g>
    </>
  );
  if (kind === "hours") return (
    <g fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round">
      <circle cx="60" cy="54" r="36"/>
      <path d="M60 22v6M60 80v6M28 54h6M86 54h6" opacity=".6"/>
      <path className="dot-clock-hand" d="M60 54V32M60 54l18 10" stroke={accent} strokeWidth="3.5"/>
      <circle cx="60" cy="54" r="3" fill={accent} stroke="none"/>
    </g>
  );
  if (kind === "events") return (
    <>
      <g className="dot-scene-slide" stroke={ink} strokeWidth="2.4" fill="none">
        <circle cx="56" cy="54" r="38"/><circle cx="56" cy="54" r="30" opacity=".35"/><circle cx="56" cy="54" r="24" opacity=".35"/>
        <circle cx="56" cy="54" r="13" fill={accent}/><circle cx="56" cy="54" r="3" fill="var(--ivory)"/>
        <path d="M104 23v45l-12 11" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <g className="dot-note" fill={accent}><path d="M100 7v24c-10-3-15 9-6 11 7 1 9-4 9-9V15l12 4V10Z"/></g>
    </>
  );
  return (
    <>
      <circle cx="60" cy="54" r="39" fill="none" stroke={ink} strokeWidth="2" strokeDasharray="2 5" opacity=".4"/>
      <g className="dot-scene-slide" stroke={ink} strokeWidth="2.3" strokeLinejoin="round">
        <path d="M30 36h50v27q0 15-15 15H45q-15 0-15-15Z" fill="var(--ivory)"/>
        <path d="M80 42h8q15 0 15 12T88 67h-9M21 84h77" fill="none" strokeLinecap="round"/>
        <ellipse cx="55" cy="36" rx="25" ry="6" fill="#80513b"/>
      </g>
      <path className="dot-steam-once" d="M50 28c-8-9 8-12 1-21M64 27c-8-9 8-12 1-21" fill="none" stroke={accent} strokeWidth="2.4" strokeLinecap="round"/>
    </>
  );
}

/** Plays on viewport entry and on an explicit same-section anchor click. */
export function SectionMotion({ kind, small = false }: { kind: SectionKind; small?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { amount: 0.35 });
  const [replay, setReplay] = useState(0);
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a");
      if (link?.getAttribute("href") === `#${kind}` && visible) setReplay(n => n + 1);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [kind, visible]);
  return (
    <span ref={ref} aria-hidden="true" className={`dot-section-art ${small ? "dot-section-art-small" : ""}`}>
      <svg key={`${visible}-${replay}`} viewBox="0 0 120 108" className={visible ? "dot-scene-active" : ""} fill="none">
        <SectionArt kind={kind}/>
      </svg>
    </span>
  );
}
