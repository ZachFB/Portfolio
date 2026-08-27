import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsapConfig";
import { prefersReducedMotion } from "@/lib/motionPrefs";

const zackLogo = new URL("../../assets/zack.jpeg", import.meta.url).href;

/**
 * Identité visuelle du héros : le logo "Dev Zack" (plus une photo), cadrage
 * carré net dans un anneau lumineux animé en continu + léger flottement 3D
 * (rotateY/rotateX très discret, façon objet "emballé" en volume).
 */
export const AvatarPortrait = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      if (ringRef.current) {
        gsap.to(ringRef.current, {
          rotate: 360,
          duration: 14,
          repeat: -1,
          ease: "none",
        });
      }
      if (floatRef.current) {
        floatRef.current.style.transformStyle = "preserve-3d";
        gsap.to(floatRef.current, {
          y: -12,
          rotateY: 6,
          rotateX: -3,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          transformPerspective: 800,
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={floatRef} className="relative shrink-0">
      {/* Anneau dégradé qui tourne en continu */}
      <div
        ref={ringRef}
        className="absolute -inset-2 rounded-full opacity-90"
        style={{
          background:
            "conic-gradient(from 0deg, #a877fd, #ff6fd8, #63e8ff, #ffd166, #a877fd)",
          filter: "blur(2px)",
        }}
      />
      {/* Halo doux fixe */}
      <div className="absolute -inset-4 rounded-full bg-[#a877fd] opacity-30 blur-2xl" />

      <div className="relative h-32 w-32 md:h-56 md:w-56 lg:h-[230px] lg:w-[230px] overflow-hidden rounded-full border-4 border-[#efe5ff] dark:border-[#0a001a] shadow-2xl bg-white">
        <img
          src={zackLogo}
          alt="Logo Dev Zack"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Badge statut */}
      <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-[#0a001a] dark:bg-[#efe5ff] px-2.5 py-1 text-xs font-semibold text-[#efe5ff] dark:text-[#0a001a] shadow-lg font3">
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        Dispo ✨
      </div>
    </div>
  );
};
