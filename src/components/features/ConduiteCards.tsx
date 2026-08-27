import { useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { SimpleCard } from "@/components/ui/canvas-reveal-effect";
import { gsap } from "@/lib/gsapConfig";
import { SplitReveal } from "./SplitReveal";

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export function CanvasRevealEffectDemo2() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const cards = el.querySelectorAll(".testimonial-card");
      gsap.from(cards[0] ?? [], {
        x: -140,
        opacity: 0,
        rotateY: 20,
        transformPerspective: 900,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play reverse play reverse" },
      });
      gsap.from(cards[1] ?? [], {
        x: 140,
        opacity: 0,
        rotateY: -20,
        transformPerspective: 900,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play reverse play reverse" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="flex flex-col lg:mt-72 mt-60 lg:gap-2">
       <SplitReveal as="h1" className="lg:text-4xl text-2xl font3 text-center">
        💬 Les avis des recruteurs de mes stages
       </SplitReveal>
      <div className="py-20 flex flex-col md:flex-row items-center justify-center w-full lg:gap-0 md:gap-16 gap-20 mx-auto px-8 dark:bg-[#0a001a] bg-[#efe5ff]">
        <div className="testimonial-card lg:ml-48 group/canvas-card flex items-center justify-center max-w-sm w-full mx-auto p-4 relative h-[25rem]">
          <Icon className="absolute h-12 w-12 -top-7 -left-7 text-[#0a001a] dark:text-[#efe5ff]" /> 
          <Icon className="absolute h-12 w-12 -bottom-7 -left-7  text-[#0a001a] dark:text-[#efe5ff]" />
          <Icon className="absolute h-12 w-12 -top-7 -right-7  text-[#0a001a] dark:text-[#efe5ff]" />
          <Icon className="absolute h-12 w-12 -bottom-7 -right-7  text-[#0a001a] dark:text-[#efe5ff]" />
          <AnimatePresence>
            <div className="h-full w-full absolute inset-0">
              <SimpleCard ClassName="dark:bg-[#efe5ff] bg-[#0a001a] border border-accent rounded-md" />
            </div>
          </AnimatePresence>
          <div className="relative z-20 flex flex-col items-center justify-center">
            <div className="text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full mx-auto flex mt-64 items-center justify-center">
            <h1 className="text-[#efe5ff] font2 lg:text-2xl text-xl dark:text-[#0a001a] ">
              Stage Academique à E4Africa
             </h1>
            </div>
            <h2 className="flex flex-col gap-8 text-[#efe5ff] dark:text-[#0a001a] text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 font-bold group-hover/canvas-card:-translate-y-32 transition duration-500">
            <span className="font2">Zacharie est un développeur talentueux et de confiance. Son attitude positive et sa capacité à résoudre des problèmes en se servant des outils qui existent aujourd'hui en font un atout précieux pour tout projet. Nous avons beaucoup apprécié son professionnalisme.</span>
            <span className="font2 text-sm">— Mr Pierre CLAVER</span>
            </h2>
          </div>
        </div>
        <div className="testimonial-card lg:mr-48 group/canvas-card flex items-center justify-center max-w-sm w-full mx-auto p-4 relative h-[25rem]">
          <Icon className="absolute h-12 w-12 -top-7 -left-7  text-[#0a001a] dark:text-[#efe5ff]" /> 
          <Icon className="absolute h-12 w-12 -bottom-7 -left-7  text-[#0a001a] dark:text-[#efe5ff]" />
          <Icon className="absolute h-12 w-12 -top-7 -right-7  text-[#0a001a] dark:text-[#efe5ff]" />
          <Icon className="absolute h-12 w-12 -bottom-7 -right-7  text-[#0a001a] dark:text-[#efe5ff]" />
          <AnimatePresence>
            <div className="h-full w-full absolute inset-0">
              <SimpleCard ClassName="dark:bg-[#efe5ff] bg-[#0a001a] border border-accent rounded-md" />
            </div>
          </AnimatePresence>
          <div className="relative z-20 flex flex-col items-center justify-center">
            <div className="text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full mx-auto mt-56 flex items-center justify-center">
            <h1 className="text-[#efe5ff] font2 lg:text-2xl text-xl dark:text-[#0a001a] ">
              Stage Professionnel à la SGTIC
             </h1>
            </div>
            <h2 className="flex flex-col gap-8 text-[#efe5ff] dark:text-[#0a001a] text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 mt-4 font-bold group-hover/canvas-card:-translate-y-32 transition duration-500">
            <span className="font2">Travailler avec Zacharie a été un plaisir. Il est sociable, fiable et sait utiliser efficacement les ressources pour résoudre les défis de codage. Un développeur compétent et agréable à avoir dans une équipe.</span>
            <span className="font2 text-sm">— Mr Raymond CAPO CHICHI</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Icon: React.FC<IconProps> = ({ className, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 30 30" // Agrandir le viewBox
      strokeWidth="2" // Rendre le trait plus bold
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 8v14m7-7H8" />
    </svg>
  );
};
