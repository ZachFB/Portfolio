import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsapConfig";
import { prefersReducedMotion } from "@/lib/motionPrefs";

interface SplitRevealProps {
  as?: "h1" | "h2" | "span";
  className?: string;
  children: string;
  start?: string;
}

/**
 * Découpe le texte en mots et les révèle un par un avec une légère bascule 3D
 * (rotateX) au scroll — discret, propre, jamais criard.
 */
export const SplitReveal = ({ as = "h1", className = "", children, start = "top 85%" }: SplitRevealProps) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const words = children.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el.querySelectorAll(".split-word"), { opacity: 1, y: 0, rotateX: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".split-word"),
        { opacity: 0, y: 34, rotateX: -70, transformOrigin: "50% 100%" },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.045,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start, toggleActions: "play reverse play reverse" },
        }
      );
    }, el);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Tag = as;

  return (
    <Tag ref={ref as any} className={className} style={{ perspective: 600 }}>
      {words.map((w, i) => (
        <span key={i} className="inline-block" style={{ transformStyle: "preserve-3d" }}>
          <span className="split-word inline-block">{w}</span>
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
};
