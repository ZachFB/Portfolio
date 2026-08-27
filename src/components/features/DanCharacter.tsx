import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsapConfig";
import { prefersReducedMotion } from "@/lib/motionPrefs";

export type DanMood = "idle" | "greet" | "listening" | "thinking";

interface DanCharacterProps {
  mood: DanMood;
  /** Incrémenté à chaque envoi de message : déclenche un petit geste ponctuel. */
  pulseKey: number;
  /** true tant que le chat est fermé : Dan dort (yeux fermés, respiration lourde, Zzz). */
  asleep: boolean;
}

export const DanCharacter = ({ mood, pulseKey, asleep }: DanCharacterProps) => {
  const floatRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const armRRef = useRef<SVGGElement>(null);
  const armLRef = useRef<SVGGElement>(null);
  const legRRef = useRef<SVGGElement>(null);
  const legLRef = useRef<SVGGElement>(null);
  const eyeLRef = useRef<SVGRectElement>(null);
  const eyeRRef = useRef<SVGRectElement>(null);
  const coreRef = useRef<SVGCircleElement>(null);
  const antennaTipRef = useRef<SVGCircleElement>(null);
  const zzzRef = useRef<SVGGElement>(null);
  const bubbleIconRef = useRef<SVGGElement>(null);
  const shadowRef = useRef<SVGEllipseElement>(null);

  const breatheTl = useRef<gsap.core.Timeline | null>(null);
  const walkTl = useRef<gsap.core.Timeline | null>(null);
  const inviteTl = useRef<gsap.core.Timeline | null>(null);
  const zzzTl = useRef<gsap.core.Timeline | null>(null);
  const blinkCall = useRef<gsap.core.Tween | null>(null);
  const lookCall = useRef<gsap.core.Tween | null>(null);
  const inviteCall = useRef<gsap.core.Tween | null>(null);
  const spinCall = useRef<gsap.core.Tween | null>(null);
  const scheduleInviteRef = useRef<() => void>(() => {});
  const scheduleSpinRef = useRef<() => void>(() => {});
  const asleepRef = useRef(asleep);
  const moodRef = useRef(mood);

  useEffect(() => {
    asleepRef.current = asleep;
  }, [asleep]);
  useEffect(() => {
    moodRef.current = mood;
  }, [mood]);

  const EYE_CLOSED = { x: -6, y: -2, width: 12, height: 4, rx: 2 };
  const EYE_OPEN = { x: -4.5, y: -4.5, width: 9, height: 9, rx: 4.5 };

  const scheduleBlink = () => {
    blinkCall.current?.kill();
    const blink = () => {
      if (!eyeLRef.current || !eyeRRef.current || asleepRef.current) return;
      gsap.to([eyeLRef.current, eyeRRef.current], {
        attr: EYE_CLOSED,
        duration: 0.15,
        ease: "power2.in",
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          blinkCall.current = gsap.delayedCall(2.4 + Math.random() * 3, blink);
        },
      });
    };
    blinkCall.current = gsap.delayedCall(1.4, blink);
  };

  const scheduleLook = () => {
    lookCall.current?.kill();
    const look = () => {
      if (!eyeLRef.current || !eyeRRef.current || asleepRef.current) return;
      gsap.to([eyeLRef.current, eyeRRef.current], {
        x: gsap.utils.random(-3.2, 3.2),
        y: gsap.utils.random(-1.4, 1.4),
        duration: 0.3 + Math.random() * 0.2,
        ease: "power2.out",
        onComplete: () => {
          lookCall.current = gsap.delayedCall(1.4 + Math.random() * 2.4, look);
        },
      });
    };
    lookCall.current = gsap.delayedCall(0.8, look);
  };

  useEffect(() => {
    const reduced = prefersReducedMotion();
    if (reduced || !floatRef.current) return;

    const ctx = gsap.context(() => {
      floatRef.current!.style.transformStyle = "preserve-3d";

      if (shadowRef.current) {
        gsap.to(shadowRef.current, {
          scaleX: 0.75,
          opacity: 0.22,
          transformOrigin: "center",
          duration: 2.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (coreRef.current) {
        gsap.to(coreRef.current, {
          opacity: 0.4,
          scale: 0.85,
          transformOrigin: "center",
          duration: 1.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      const invite = () => {
        inviteCall.current = gsap.delayedCall(6 + Math.random() * 4, () => {
          if (moodRef.current !== "idle" || !armRRef.current) return;
          if (!asleepRef.current) {
            invite();
            return;
          }
          inviteTl.current?.kill();
          const tl = gsap.timeline({ defaults: { ease: "sine.inOut" }, onComplete: invite });
          inviteTl.current = tl;
          if (eyeLRef.current && eyeRRef.current) {
            tl.to([eyeLRef.current, eyeRRef.current], { attr: EYE_OPEN, duration: 0.3, ease: "back.out(1.8)" }, 0.15)
              .to([eyeLRef.current, eyeRRef.current], { attr: EYE_CLOSED, duration: 0.3, ease: "power2.inOut" }, 0.95);
          }
          if (zzzRef.current) {
            tl.to(zzzRef.current, { opacity: 0, duration: 0.2 }, 0.15)
              .to(zzzRef.current, { opacity: 1, duration: 0.3 }, 0.95);
          }
          tl.set(armRRef.current, { svgOrigin: "139 120" }, 0)
            .to(armRRef.current, { rotate: -125, duration: 0.45 }, 0)
            .to(armRRef.current, { rotate: -95, duration: 0.28 })
            .to(armRRef.current, { rotate: -125, duration: 0.28 })
            .to(armRRef.current, { rotate: -95, duration: 0.28 })
            .to(armRRef.current, { rotate: 0, duration: 0.45 })
            .to(headRef.current, { rotate: -5, duration: 0.5 }, 0)
            .to(headRef.current, { rotate: 0, duration: 0.5 }, 1.2);
        });
      };
      scheduleInviteRef.current = invite;
      invite();

      const spin = () => {
        spinCall.current = gsap.delayedCall(12 + Math.random() * 8, () => {
          if (moodRef.current !== "idle" || !floatRef.current) return;
          gsap.to(floatRef.current, {
            rotateY: "+=360",
            duration: 1.6,
            ease: "power2.inOut",
            onComplete: spin,
          });
        });
      };
      scheduleSpinRef.current = spin;
      spin();
    }, floatRef);

    return () => {
      blinkCall.current?.kill();
      lookCall.current?.kill();
      inviteCall.current?.kill();
      inviteTl.current?.kill();
      spinCall.current?.kill();
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion() || !floatRef.current) return;

    if (asleep) {
      blinkCall.current?.kill();
      lookCall.current?.kill();
      if (eyeLRef.current && eyeRRef.current) {
        gsap.to([eyeLRef.current, eyeRRef.current], { x: 0, y: 0, scaleY: 1, duration: 0.15, ease: "power1.out" });
        gsap.to([eyeLRef.current, eyeRRef.current], { attr: EYE_CLOSED, duration: 0.45, ease: "power2.inOut" });
      }
      if (antennaTipRef.current) {
        gsap.to(antennaTipRef.current, { opacity: 0.25, scale: 0.8, transformOrigin: "center", duration: 0.6 });
      }
      if (zzzRef.current) {
        gsap.to(zzzRef.current, { opacity: 1, duration: 0.5 });
        zzzTl.current?.kill();
        zzzTl.current = gsap
          .timeline({ repeat: -1 })
          .fromTo(
            zzzRef.current.children,
            { opacity: 0, y: 0, scale: 0.6 },
            { opacity: 1, y: -14, scale: 1, duration: 0.9, stagger: 0.35, ease: "sine.out" },
            0
          )
          .to(zzzRef.current.children, { opacity: 0, y: -26, duration: 0.6, stagger: 0.35, ease: "sine.in" }, 0.9);
      }
    } else {
      if (eyeLRef.current && eyeRRef.current && moodRef.current !== "greet") {
        gsap.to([eyeLRef.current, eyeRRef.current], { attr: EYE_OPEN, duration: 0.45, ease: "back.out(1.8)" });
      }
      if (antennaTipRef.current) {
        gsap.to(antennaTipRef.current, { opacity: 1, scale: 1, transformOrigin: "center", duration: 0.4 });
      }
      if (zzzRef.current) {
        zzzTl.current?.kill();
        gsap.to(zzzRef.current, { opacity: 0, duration: 0.3 });
      }
      scheduleBlink();
      scheduleLook();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asleep]);

  useEffect(() => {
    if (prefersReducedMotion() || !floatRef.current) return;
    breatheTl.current?.kill();
    breatheTl.current = gsap
      .timeline({ repeat: -1, yoyo: true, paused: mood !== "idle", defaults: { ease: "sine.inOut" } })
      .to(floatRef.current, asleep ? { y: -5, rotateZ: -0.8, duration: 3.2 } : { y: -8, rotateZ: -1.2, duration: 2.4 }, 0);
    return () => {
      breatheTl.current?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asleep, mood]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    walkTl.current?.kill();

    if (mood !== "idle") {
      inviteTl.current?.kill();
      inviteCall.current?.kill();
      spinCall.current?.kill();
      gsap.to([armLRef.current, armRRef.current], { rotate: 0, duration: 0.22, ease: "power2.out" });
    }

    const ctx = gsap.context(() => {
      if (mood === "greet") {
        gsap.set(floatRef.current, { rotateY: 0 });
        if (eyeLRef.current && eyeRRef.current) {
          gsap.to([eyeLRef.current, eyeRRef.current], { attr: EYE_OPEN, duration: 0.4, ease: "back.out(1.8)" });
        }
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
        tl.fromTo(
          floatRef.current,
          { x: 32, opacity: 0, scale: 0.85, rotateY: -90 },
          { x: 0, opacity: 1, scale: 1, rotateY: 0, duration: 0.6, ease: "expo.out" }
        )
          .to(floatRef.current, { rotateY: "+=360", duration: 1.5, ease: "power2.inOut" }, "+=0.1")
          .add(() => {
            inviteTl.current?.kill();
            inviteCall.current?.kill();
            spinCall.current?.kill();
            scheduleInviteRef.current();
            scheduleSpinRef.current();
            scheduleLook();
          });
      }

      if (mood === "listening") {
        gsap.to(headRef.current, { rotate: -3, y: 1.5, transformOrigin: "center", duration: 0.4, ease: "power1.out" });
        gsap.to(floatRef.current, { rotateY: 0, duration: 0.4, ease: "power2.out" });
        gsap.set(legRRef.current, { svgOrigin: "112.5 192" });
        gsap.set(legLRef.current, { svgOrigin: "87.5 192" });
        gsap.set(armLRef.current, { svgOrigin: "61 120" });
        gsap.set(armRRef.current, { svgOrigin: "139 120" });
        walkTl.current = gsap
          .timeline({ repeat: -1, delay: 0.24, defaults: { ease: "sine.inOut" } })
          .to(legRRef.current, { rotate: 20, duration: 0.24 }, 0)
          .to(legLRef.current, { rotate: -20, duration: 0.24 }, 0)
          .to(legRRef.current, { rotate: -16, duration: 0.24 }, 0.24)
          .to(legLRef.current, { rotate: 16, duration: 0.24 }, 0.24)
          .to(armLRef.current, { rotate: 12, duration: 0.24 }, 0)
          .to(armRRef.current, { rotate: -12, duration: 0.24 }, 0)
          .to(armLRef.current, { rotate: -8, duration: 0.24 }, 0.24)
          .to(armRRef.current, { rotate: 8, duration: 0.24 }, 0.24)
          .to(floatRef.current, { y: "-=3.5", duration: 0.24 }, 0)
          .to(floatRef.current, { y: "+=3.5", duration: 0.24 }, 0.24);
      } else if (mood === "thinking") {
        gsap.set(legRRef.current, { svgOrigin: "112.5 192" });
        gsap.set(legLRef.current, { svgOrigin: "87.5 192" });
        // Une vraie pose "il réfléchit" : tête et corps balancent ensemble,
        // lentement, des deux côtés, dans une seule timeline synchronisée —
        // avant, la tête et le corps tournaient chacun sur leur propre
        // boucle avec un tempo différent, ce qui les faisait dériver l'un
        // par rapport à l'autre et donnait cet effet saccadé, "cou tordu".
        walkTl.current = gsap
          .timeline({ repeat: -1, delay: 0.15, defaults: { ease: "sine.inOut" } })
          .to(headRef.current, { rotate: -7, transformOrigin: "center", duration: 1.5 }, 0)
          .to(floatRef.current, { x: -6, duration: 1.5 }, 0)
          .to(headRef.current, { rotate: 7, duration: 1.5 }, 1.5)
          .to(floatRef.current, { x: 6, duration: 1.5 }, 1.5)
          .to(headRef.current, { rotate: 0, duration: 1.1 }, 3)
          .to(floatRef.current, { x: 0, duration: 1.1 }, 3);
        gsap.to([legRRef.current, legLRef.current], {
          rotate: (i) => (i === 0 ? 5 : -5),
          duration: 0.9,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to(bubbleIconRef.current, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)" });
      } else {
        gsap.to(headRef.current, { rotate: 0, y: 0, duration: 0.5, ease: "power2.out" });
        gsap.to([legRRef.current, legLRef.current], { rotate: 0, duration: 0.4, ease: "power2.out" });
        gsap.to([armLRef.current, armRRef.current], { rotate: 0, duration: 0.4, ease: "power2.out" });
        gsap.to(bubbleIconRef.current, { opacity: 0, scale: 0.6, duration: 0.3 });
        inviteTl.current?.kill();
        inviteCall.current?.kill();
        spinCall.current?.kill();
        scheduleInviteRef.current();
        scheduleSpinRef.current();
      }
    }, floatRef);
    return () => {
      walkTl.current?.kill();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mood]);

  // Petit geste ponctuel à chaque envoi de message : plus aucun mouvement de
  // bras (c'est ce qui le faisait "sortir de son épaule"), et plus aucune
  // rotation de la tête (le mode "réflexion" fait déjà tourner la tête en
  // boucle juste après — les deux se battaient pour la même propriété, ce
  // qui la faisait paraître "décollée du cou"). Ici on ne touche qu'à
  // l'échelle de la tête, une propriété que rien d'autre ne pilote jamais :
  // aucun risque de collision. + le rebond du corps + le clignotement de
  // l'antenne, qui marchaient déjà très bien.
  useEffect(() => {
    if (pulseKey === 0 || prefersReducedMotion()) return;
    const tl = gsap.timeline({ defaults: { ease: "back.out(2)" } });
    tl.to(headRef.current, { scale: 1.12, duration: 0.16 })
      .to(headRef.current, { scale: 1, duration: 0.22 })
      .to(floatRef.current, { scale: 1.08, duration: 0.18, yoyo: true, repeat: 1 }, 0)
      .to(antennaTipRef.current, { opacity: 0.3, duration: 0.12, yoyo: true, repeat: 3 }, 0);
    return () => {
      tl.kill();
      if (headRef.current) {
        gsap.set(headRef.current, { scale: 1 });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pulseKey]);

  return (
    <div className="relative h-[122px] w-[100px]" style={{ perspective: "1000px" }}>
      <div
        ref={floatRef}
        className="relative h-full w-full select-none drop-shadow-[0_16px_20px_rgba(168,119,253,0.4)]"
      >
        <svg viewBox="0 0 200 280" className="h-full w-full overflow-visible">
        <defs>
          <linearGradient id="dan-shell" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#efe5ff" />
            <stop offset="55%" stopColor="#cdb8fb" />
            <stop offset="100%" stopColor="#8f68e6" />
          </linearGradient>
          <linearGradient id="dan-shell-dark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7a4fe0" />
            <stop offset="100%" stopColor="#4a2596" />
          </linearGradient>
          <radialGradient id="dan-aura" cx="50%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#a877fd" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#a877fd" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="dan-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#63e8ff" />
            <stop offset="100%" stopColor="#a877fd" stopOpacity="0.2" />
          </radialGradient>
        </defs>

        <circle cx="100" cy="95" r="80" fill="url(#dan-aura)" />

        <ellipse ref={shadowRef} cx="100" cy="256" rx="30" ry="7" fill="#0a001a" opacity="0.16" />

        <g ref={legLRef}>
          <rect x="80" y="192" width="15" height="50" rx="7" fill="url(#dan-shell-dark)" />
          <circle cx="87.5" cy="192" r="8" fill="#efe5ff" />
          <rect x="74" y="240" width="27" height="11" rx="5" fill="#0a001a" />
        </g>
        <g ref={legRRef}>
          <rect x="105" y="192" width="15" height="50" rx="7" fill="url(#dan-shell-dark)" />
          <circle cx="112.5" cy="192" r="8" fill="#efe5ff" />
          <rect x="99" y="240" width="27" height="11" rx="5" fill="#0a001a" />
        </g>

        <g ref={armLRef}>
          <circle cx="61" cy="120" r="9" fill="#efe5ff" />
          <rect x="52.5" y="120" width="17" height="52" rx="8.5" fill="url(#dan-shell)" />
          <circle cx="61" cy="176" r="10" fill="#0a001a" />
          <circle cx="61" cy="176" r="5.5" fill="#63e8ff" opacity="0.85" />
        </g>

        <g ref={armRRef}>
          <circle cx="139" cy="120" r="9" fill="#efe5ff" />
          <rect x="130.5" y="120" width="17" height="52" rx="8.5" fill="url(#dan-shell)" />
          <circle cx="139" cy="176" r="10" fill="#0a001a" />
          <circle cx="139" cy="176" r="5.5" fill="#63e8ff" opacity="0.85" />
        </g>

        <path d="M64 116 Q100 100 136 116 L144 196 Q100 210 56 196 Z" fill="url(#dan-shell)" />
        <path d="M74 122 Q100 112 126 122 L131 188 Q100 199 69 188 Z" fill="url(#dan-shell-dark)" opacity="0.35" />
        <circle ref={coreRef} cx="100" cy="152" r="13" fill="url(#dan-core)" />
        <circle cx="100" cy="152" r="13" fill="none" stroke="#efe5ff" strokeWidth="1.5" opacity="0.5" />
        <path d="M80 118 L100 128 L120 118" stroke="#efe5ff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.55" />

        <g ref={zzzRef} opacity="0" fontFamily="sans-serif" fontWeight="700" fill="#a877fd">
          <text x="118" y="20" fontSize="14">Z</text>
          <text x="130" y="10" fontSize="10">z</text>
          <text x="140" y="2" fontSize="7">z</text>
        </g>

        <g ref={bubbleIconRef} opacity="0" style={{ transform: "scale(0.6)", transformOrigin: "160px 66px" } as React.CSSProperties}>
          <rect x="150" y="52" width="34" height="24" rx="8" fill="#efe5ff" />
          <path d="M158 76 L154 85 L166 76 Z" fill="#efe5ff" />
          <circle cx="159" cy="64" r="2.4" fill="#a877fd" />
          <circle cx="167" cy="64" r="2.4" fill="#a877fd" />
          <circle cx="175" cy="64" r="2.4" fill="#a877fd" />
        </g>

        <rect x="91" y="96" width="18" height="16" rx="5" fill="url(#dan-shell-dark)" />

        <g ref={headRef} style={{ transformBox: "fill-box", transformOrigin: "50% 100%" } as React.CSSProperties}>
          <rect x="97" y="14" width="6" height="18" rx="3" fill="#cdb8fb" />
          <circle
            ref={antennaTipRef}
            cx="100"
            cy="12"
            r="6"
            fill="#63e8ff"
            style={{ transformOrigin: "center", opacity: asleep ? 0.25 : 1, transform: asleep ? "scale(0.8)" : "scale(1)" } as React.CSSProperties}
          />

          <rect x="60" y="30" width="80" height="66" rx="30" fill="url(#dan-shell)" />
          <rect x="60" y="30" width="80" height="30" rx="26" fill="#ffffff" opacity="0.18" />
          <circle cx="58" cy="66" r="8" fill="#8f68e6" />
          <circle cx="142" cy="66" r="8" fill="#8f68e6" />

          <rect x="74" y="56" width="52" height="26" rx="13" fill="#0a001a" />
          <g transform="translate(91,69)">
            <rect
              ref={eyeLRef}
              {...(asleep ? EYE_CLOSED : EYE_OPEN)}
              fill="#63e8ff"
              style={{ transformBox: "fill-box", transformOrigin: "center" } as React.CSSProperties}
            />
          </g>
          <g transform="translate(109,69)">
            <rect
              ref={eyeRRef}
              {...(asleep ? EYE_CLOSED : EYE_OPEN)}
              fill="#63e8ff"
              style={{ transformBox: "fill-box", transformOrigin: "center" } as React.CSSProperties}
            />
          </g>
        </g>
      </svg>
      </div>
    </div>
  );
};