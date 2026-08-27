import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "./gsapConfig";

type Direction = "up" | "down" | "left" | "right" | "scale";

interface ScrollRevealOptions {
  /** Sélecteur des enfants à animer un par un. Si absent, anime le container entier. */
  childSelector?: string;
  direction?: Direction;
  distance?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  start?: string;
  once?: boolean;
}

const offsets: Record<Direction, { x?: number; y?: number; scale?: number }> = {
  up: { y: 60 },
  down: { y: -60 },
  left: { x: 80 },
  right: { x: -80 },
  scale: { scale: 0.85 },
};

/**
 * Anime l'entrée d'une section (ou de ses enfants) quand elle croise le viewport au scroll.
 * C'est le coeur des animations "objets qui bougent quand on scroll" du site.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  childSelector,
  direction = "up",
  distance,
  duration = 1,
  stagger = 0.12,
  delay = 0,
  start = "top 82%",
  once = true,
}: ScrollRevealOptions = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const offset = offsets[direction];
    const targets = childSelector
      ? container.querySelectorAll(childSelector)
      : container;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          opacity: 0,
          x: offset.x ?? 0,
          y: offset.y ?? (distance ?? 0),
          scale: offset.scale ?? 1,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration,
          delay,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start,
            toggleActions: once ? "play none none none" : "play reverse play reverse",
          },
        }
      );
    }, container);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

export { gsap, ScrollTrigger };
