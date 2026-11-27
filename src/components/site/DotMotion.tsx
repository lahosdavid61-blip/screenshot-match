import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useInView } from "motion/react";

// Actual roasted coffee photographs, bundled with the site (Apache-2.0).
// These files are intentionally local: no external image host or load-state gate.
const photos = [
  { src: "/beans/bean-1.png", outline: "polygon(1% 43%, 5% 26%, 15% 12%, 30% 3%, 45% 1%, 60% 4%, 73% 11%, 83% 22%, 89% 38%, 89% 55%, 84% 71%, 75% 82%, 62% 89%, 45% 89%, 28% 84%, 14% 76%, 5% 64%, 1% 53%)" },
  { src: "/beans/bean-2.png", outline: "polygon(1% 40%, 5% 25%, 14% 13%, 27% 4%, 44% 1%, 60% 3%, 72% 10%, 81% 21%, 87% 37%, 88% 54%, 84% 71%, 75% 82%, 62% 87%, 47% 87%, 31% 82%, 17% 73%, 6% 61%, 1% 50%)" },
  { src: "/beans/bean-3.png", outline: "polygon(1% 35%, 6% 19%, 17% 8%, 32% 1%, 48% 2%, 64% 7%, 77% 16%, 86% 28%, 92% 44%, 92% 59%, 86% 73%, 74% 81%, 59% 85%, 43% 83%, 28% 77%, 14% 65%, 5% 51%)" },
  { src: "/beans/bean-4.png", outline: "polygon(1% 36%, 6% 21%, 17% 10%, 32% 3%, 48% 1%, 64% 5%, 78% 14%, 88% 29%, 91% 45%, 90% 63%, 84% 77%, 72% 87%, 57% 91%, 41% 89%, 25% 81%, 13% 69%, 4% 55%)" },
] as const;

const beans = [
  { photo: 0, x: 6, y: 14, angle: -36, size: 0.94, dx: -180, dy: -90, turn: -48, delay: .08, duration: 1.26 },
  { photo: 1, x: 22, y: 6, angle: 38, size: .83, dx: -80, dy: -135, turn: 58, delay: .22, duration: 1.18 },
  { photo: 2, x: 32, y: 93, angle: -49, size: 1.02, dx: -110, dy: 125, turn: -52, delay: .27, duration: 1.24 },
  { photo: 3, x: 48, y: 10, angle: 23, size: .68, dx: 35, dy: -160, turn: 61, delay: .13, duration: 1.30 },
  { photo: 1, x: 61, y: 96, angle: 69, size: 1.12, dx: 95, dy: 145, turn: -43, delay: .31, duration: 1.23 },
  { photo: 2, x: 76, y: 4, angle: -65, size: .84, dx: 125, dy: -105, turn: 53, delay: .18, duration: 1.27 },
  { photo: 3, x: 89, y: 87, angle: -24, size: 1.16, dx: 180, dy: 95, turn: 68, delay: .34, duration: 1.24 },
  { photo: 0, x: 94, y: 24, angle: 49, size: .90, dx: 190, dy: -45, turn: -54, delay: .11, duration: 1.35 },
] as const;

export type BeanMotionState = "idle" | "running" | "paused";

export function RealCoffeeBeans({ foreground = false, motionState = "idle" }: {
  foreground?: boolean;
  motionState?: BeanMotionState;
}) {
  return (
    <span aria-hidden="true" data-motion={motionState} className={`dot-bean-layer ${foreground ? "dot-bean-front" : "dot-bean-back"}`}>
      {beans.map((bean, i) => {
        if (i % 2 !== (foreground ? 1 : 0)) return null;
        const photo = photos[bean.photo];
        return (
          <span
            key={i}
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
              "--bean-float-duration": `${6.8 + (i % 5) * .73}s`,
              "--bean-float-x": `${(i % 2 ? -1 : 1) * (3 + i % 4)}px`,
              "--bean-float-y": `${-(4 + i % 3)}px`,
              "--bean-float-turn": `${(i % 2 ? -1 : 1) * (2 + i % 3)}deg`,
            } as CSSProperties}
          >
            <img
              className="dot-bean-photo"
              src={photo.src}
              style={{ clipPath: photo.outline }}
              alt=""
              loading="eager"
              fetchPriority="high"
              draggable={false}
            />
          </span>
        );
      })}
    </span>
  );
}

export type SectionKind = "about" | "menu" | "gallery" | "events" | "reviews" | "visit" | "hours";

function SectionArt({ kind }: { kind: SectionKind }) {
  const ink = "currentColor";
  const accent = "var(--dot-red)";
  if (kind === "menu") return (
    <g className="dot-scene-slide" stroke={ink} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 16h60v78H17z" fill="var(--dot-art-bg, transparent)" />
      <path d="M25 16v78M33 41h33M33 51h27M33 64h23M33 75h18" opacity=".65" />
      <circle cx="49" cy="29" r="4" fill={accent} stroke="none" />
      <path d="M70 43h41L93 69v19h11M93 88H82M93 69 75 43" fill="var(--dot-art-bg, transparent)" />
      <path d="M79 54h23L91 67Z" fill={accent} stroke="none" opacity=".85" />
      <path d="M101 43l7-11" fill="none" />
      <circle cx="108" cy="32" r="5" fill="none" stroke={accent} />
    </g>
  );
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
