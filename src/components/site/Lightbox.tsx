import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/i18n/LangContext";
import { gallery } from "@/data/gallery";

export function Lightbox({
  index,
  onChange,
}: {
  index: number | null;
  onChange: (i: number | null) => void;
}) {
  const { t } = useLang();
  const closeRef = useRef<HTMLButtonElement>(null);
  const touch = useRef(0);
  const n = gallery.length;
  const go = (d: number) => index !== null && onChange((index + d + n) % n);

  useEffect(() => {
    if (index === null) return;
    closeRef.current?.focus();
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  });

  const shot = index !== null ? gallery[index] : undefined;
  return (
    <AnimatePresence>
      {shot && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={t.gallery.shots[shot.key]}
          className="fixed inset-0 z-50 flex flex-col bg-secondary p-4 text-secondary-foreground md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onTouchStart={(e) => (touch.current = e.touches[0]?.clientX ?? 0)}
          onTouchEnd={(e) => {
            const dx = (e.changedTouches[0]?.clientX ?? 0) - touch.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          }}
        >
          <div className="flex items-center justify-between">
            <span className="kicker">
              {String(index! + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
            <button ref={closeRef} onClick={() => onChange(null)} className="kicker p-2">
              {t.gallery.close} ✕
            </button>
          </div>
          <div className="relative my-6 flex-1 text-foreground">
            <motion.div
              key={shot.id}
              className="h-full"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={shot.src}
                alt={t.gallery.shots[shot.key]}
                className="h-full w-full object-contain"
              />
            </motion.div>
          </div>
          <div className="flex justify-between">
            <button onClick={() => go(-1)} className="kicker p-2">
              ← {t.gallery.prev}
            </button>
            <button onClick={() => go(1)} className="kicker p-2">
              {t.gallery.next} →
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
