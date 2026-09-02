import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import { prefersReducedMotion } from "@/lib/motionPrefs";

/**
 * Halos de couleur doux, flottants, qui dérivent en parallax quand on scrolle.
 * Purement décoratif, fixé derrière tout le contenu (z-0).
 *
 * Sur mobile, `blur()` sur un grand calque `fixed` est très coûteux à
 * repeindre à chaque frame (GPU beaucoup plus faible que sur desktop) —
 * c'était la cause principale des ralentissements généralisés du site.
 * On limite donc le nombre de calques flous ET leur rayon de flou en
 * dessous du breakpoint `lg`, sans rien changer au rendu desktop.
 */
export const BackgroundAura = () => {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || prefersReducedMotion()) return;

    const layers = wrap.querySelectorAll<HTMLDivElement>(".aura-blob-scroll");
    const floats = wrap.querySelectorAll<HTMLDivElement>(".aura-blob-float");

    const ctx = gsap.context(() => {
      floats.forEach((blob, i) => {
        gsap.to(blob, {
          y: i % 2 === 0 ? 40 : -30,
          x: i % 2 === 0 ? -25 : 30,
          duration: 6 + i,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      layers.forEach((layer, i) => {
        gsap.to(layer, {
          y: `+=${(i + 1) * 140 * (i % 2 === 0 ? 1 : -1)}`,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
          },
        });
      });

      ScrollTrigger.refresh();
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="aura-blob-scroll absolute -top-24 -left-24 h-[420px] w-[420px]">
        <div className="aura-blob-float h-full w-full rounded-full bg-[#a877fd] opacity-30 blur-[60px] lg:blur-[120px] dark:opacity-25" />
      </div>
      <div className="aura-blob-scroll absolute top-1/3 -right-32 h-[480px] w-[480px]">
        <div className="aura-blob-float h-full w-full rounded-full bg-[#ff6fd8] opacity-20 blur-[60px] lg:blur-[140px] dark:opacity-20" />
      </div>
      {/* Réservés au desktop : 4 calques flous en simultané suffisaient à
          faire ramer tout le site sur GPU mobile, y compris le scroll. */}
      <div className="aura-blob-scroll absolute bottom-0 left-1/4 h-[400px] w-[400px] hidden lg:block">
        <div className="aura-blob-float h-full w-full rounded-full bg-[#63e8ff] opacity-20 blur-[130px] dark:opacity-[0.15]" />
      </div>
      <div className="aura-blob-scroll absolute bottom-1/4 right-1/4 h-[300px] w-[300px] hidden lg:block">
        <div className="aura-blob-float h-full w-full rounded-full bg-[#ffd166] opacity-[0.12] blur-[110px] dark:opacity-10" />
      </div>
    </div>
  );
};