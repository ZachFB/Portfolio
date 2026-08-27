import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsapConfig";
import { RiReactjsFill, RiJavascriptFill } from "react-icons/ri";
import { SiNextdotjs, SiTailwindcss, SiExpress } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa6";
import { FaWordpress, FaPhp } from "react-icons/fa";

const ICONS = [
  { Icon: RiReactjsFill, className: "top-[6%] left-[6%] text-[#61dafb]" },
  { Icon: SiNextdotjs, className: "top-[15%] right-[10%] text-white dark:text-white" },
  { Icon: FaNodeJs, className: "top-[45%] left-[3%] text-[#68a063]" },
  { Icon: SiTailwindcss, className: "top-[55%] right-[4%] text-[#38bdf8]" },
  { Icon: FaWordpress, className: "bottom-[18%] left-[10%] text-[#21759b]" },
  { Icon: SiExpress, className: "bottom-[10%] right-[14%] text-neutral-400" },
  { Icon: FaPhp, className: "top-[30%] right-[25%] text-[#787cb5]" },
  { Icon: RiJavascriptFill, className: "bottom-[30%] left-[22%] text-[#f0db4f]" },
];

/**
 * Petites icônes tech en arrière-plan qui montent/descendent à des vitesses
 * différentes pendant le scroll — l'effet "évolution d'objets" demandé.
 */
export const FloatingTechIcons = () => {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    // Chaque icône a deux couches distinctes : une couche "parallax" (scroll,
    // property y) et une couche "idle" interne (float + rotate). Elles ne
    // touchent jamais la même propriété du même élément en même temps, ce qui
    // évite le conflit de tweens qui causait le mouvement saccadé.
    const layers = wrap.querySelectorAll<HTMLDivElement>(".float-icon-scroll");
    const floats = wrap.querySelectorAll<HTMLDivElement>(".float-icon-idle");

    const ctx = gsap.context(() => {
      floats.forEach((icon, i) => {
        gsap.to(icon, {
          y: i % 2 === 0 ? -18 : 18,
          rotate: i % 2 === 0 ? 8 : -8,
          duration: 3 + (i % 4),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.15,
        });
      });

      layers.forEach((layer, i) => {
        // Parallax scroll : chaque icône monte à une vitesse propre
        gsap.to(layer, {
          y: `-=${80 + i * 22}`,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-40 md:opacity-60"
    >
      {ICONS.map(({ Icon, className }, i) => (
        <div key={i} className={`float-icon-scroll absolute ${className}`}>
          <div className="float-icon-idle">
            <Icon size={34} className="drop-shadow-lg md:!w-10 md:!h-10" />
          </div>
        </div>
      ))}
    </div>
  );
};
