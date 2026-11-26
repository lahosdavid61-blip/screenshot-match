import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useInView } from "motion/react";

const beans = [
  [7, 19, -26, 0.14, 1], [20, 6, 34, 0.23, 0.72],
  [34, 83, -47, 0.3, 0.9], [47, 13, 72, 0.12, 0.68],
  [58, 92, 25, 0.35, 1.1], [69, 5, -18, 0.18, 0.8],
  [84, 73, -59, 0.28, 1.15], [94, 25, 48, 0.09, 0.9],
  [12, 90, 58, 0.4, 0.67], [76, 42, 24, 0.37, 0.52],
] as const;

/** A non-blocking, session-scoped opening detail, not a loading screen. */
export function CoffeeBeanOrbit({ foreground = false }: { foreground?: boolean }) {
  const [play, setPlay] = useState(false);
  const checked = useRef(false);
  useEffect(() => {
    if (checked.current) return;
    checked.current = true;
    try {
      // The two layers share a session flag via the same page-level custom event.
      if (sessionStorage.getItem("dot-beans-seen")) return;
    } catch { /* storage may be disabled */ }
    setPlay(true);
  }, []);
  useEffect(() => {
    if (!play) return;
    try { sessionStorage.setItem("dot-beans-seen", "1"); } catch { /* optional */ }
    const stop = () => setPlay(false);
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") stop(); };
    window.addEventListener("pointerdown", stop, { once: true });
    window.addEventListener("keydown", onKey);
    const timeout = window.setTimeout(stop, 2350);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("pointerdown", stop);
      window.removeEventListener("keydown", onKey);
    };
  }, [play]);
  if (!play) return null;
  return (
    <span aria-hidden="true" className={`dot-bean-layer ${foreground ? "dot-bean-front" : "dot-bean-back"}`}>
      {beans.map(([x, y, angle, delay, scale], i) => (i % 2 === (foreground ? 1 : 0) ? (
        <span key={i} className="dot-bean" style={{
          left: `${x}%`, top: `${y}%`, "--bean-angle": `${angle}deg`,
          "--bean-delay": `${delay}s`, "--bean-scale": scale,
          "--bean-drift": `${x < 50 ? -45 : 45}px`,
        } as CSSProperties}>
          <svg viewBox="0 0 54 76" fill="none">
            <path d="M28 3C11 1 2 18 3 40c1 20 10 33 25 33 15-1 25-16 23-37C49 15 43 5 28 3Z" fill="#80513b" stroke="#442b22" strokeWidth="2"/>
            <path d="M13 12C4 27 8 49 18 59c-4-16-5-34 3-48Z" fill="#c18a5f" opacity=".64"/>
            <path d="M28 7c-12 14 9 20-1 36-6 10-8 17-1 26" stroke="#422a20" strokeWidth="4" strokeLinecap="round"/>
            <path d="M32 9c-8 15 9 23 0 36-5 9-7 16-3 22" stroke="#d39c73" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </span>
      ) : null))}
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
