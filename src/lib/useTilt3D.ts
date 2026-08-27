import { useEffect, useRef } from "react";
import { gsap } from "./gsapConfig";
import { prefersReducedMotion } from "./motionPrefs";

interface TiltOptions {
  max?: number; // amplitude de rotation max en degrés — reste discret par défaut
  scale?: number;
  perspective?: number;
}

/**
 * Effet de bascule 3D "premium" qui suit la souris, avec un retour élastique
 * doux au relâchement. Utilise gsap.quickTo pour une interpolation fluide à
 * 60fps sans jank, façon showcases GSAP.
 */
export function useTilt3D<T extends HTMLElement = HTMLDivElement>({
  max = 8,
  scale = 1.03,
  perspective = 900,
}: TiltOptions = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    el.style.transformStyle = "preserve-3d";
    el.style.perspective = `${perspective}px`;
    el.style.willChange = "transform";

    const xTo = gsap.quickTo(el, "rotateY", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "rotateX", { duration: 0.6, ease: "power3.out" });
    const sTo = gsap.quickTo(el, "scale", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      xTo(px * max * 2);
      yTo(-py * max * 2);
      sTo(scale);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
      sTo(1);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [max, scale, perspective]);

  return ref;
}
