import { useTheme } from "./ThemeProvider";
import { RiReactjsFill } from "react-icons/ri";
import { SiNextdotjs } from "react-icons/si";
import { FaWordpress } from "react-icons/fa";
import { FaNodeJs } from "react-icons/fa6";
import { SiExpress } from "react-icons/si";
import { SiTailwindcss } from "react-icons/si";
import { FaPhp } from "react-icons/fa";
import { RiJavascriptFill } from "react-icons/ri";
import { SiTanstack, SiClaude, SiGooglegemini, SiDeepseek } from "react-icons/si";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { gsap } from "@/lib/gsapConfig";
import { FloatingTechIcons } from "./FloatingTechIcons";
import { SkillCard } from "./SkillCard";
import { SplitReveal } from "./SplitReveal";

const SKILL_CARDS = [
    { Icon: RiReactjsFill, label: "React JS", target: 90, glow: "#61dafb" },
    { Icon: SiNextdotjs, label: "Next JS", target: 50, glow: "#a877fd" },
    { Icon: FaWordpress, label: "Wordpress", target: 90, glow: "#21759b" },
    { Icon: SiTanstack, label: "TanStack Query", target: 80, glow: "#ff4154" },
];

const OTHER_SKILLS = [
    { Icon: FaNodeJs, label: "Node JS", size: 45 },
    { Icon: SiExpress, label: "Express JS", size: 45 },
    { Icon: SiTailwindcss, label: "Tailwind CSS", size: 48 },
    { Icon: FaPhp, label: "Php", size: 50 },
    { Icon: RiJavascriptFill, label: "Javascript", size: 50 },
    { Icon: SiClaude, label: "Claude AI", size: 45 },
    { Icon: SiGooglegemini, label: "Gemini AI", size: 42 },
    { Icon: SiDeepseek, label: "DeepSeek", size: 42 },
];

export function Competences() {
    const { theme } = useTheme();
    const ref = useRef<HTMLDivElement | null>(null);
    const sectionRef = useRef<HTMLDivElement | null>(null);

    // Refs pour détecter la visibilité
    const cardsContainerRef = useRef<HTMLDivElement>(null);
    // Marge de déclenchement volontairement légère : un "-100px" sur les 4
    // côtés (valeur pensée pour desktop) rétrécissait trop la zone de
    // détection sur mobile, où le conteneur (4 cartes empilées en
    // flex-col) est bien plus haut que la fenêtre visible réelle du
    // téléphone — les pourcentages ne se déclenchaient quasiment jamais.
    const isCardsInView = useInView(cardsContainerRef, {
        once: true,
        amount: 0.15,
        margin: "-20px"
    });

    // États pour les compteurs (un par carte de compétence principale)
    const [counters, setCounters] = useState<number[]>(() => SKILL_CARDS.map(() => 0));

    // Animation des compteurs : chaque carte compte jusqu'à sa cible, avec un léger décalage en cascade
    useEffect(() => {
        if (!isCardsInView) return;
        const timers: ReturnType<typeof setInterval>[] = [];
        const timeouts: ReturnType<typeof setTimeout>[] = [];

        SKILL_CARDS.forEach(({ target }, i) => {
            const startTimeout = setTimeout(() => {
                let current = 0;
                const timer = setInterval(() => {
                    current += 1;
                    setCounters((prev) => {
                        const next = [...prev];
                        next[i] = current;
                        return next;
                    });
                    if (current >= target) clearInterval(timer);
                }, 20);
                timers.push(timer);
            }, i * 300);
            timeouts.push(startTimeout);
        });

        return () => {
            timers.forEach(clearInterval);
            timeouts.forEach(clearTimeout);
        };
    }, [isCardsInView]);

    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [-300, 350]);

    // Stagger GSAP à l'entrée des cartes principales + de la grille "autres compétences"
    useEffect(() => {
        const ctxEl = sectionRef.current;
        if (!ctxEl) return;
        const ctx = gsap.context(() => {
            gsap.from(cardsContainerRef.current?.children ?? [], {
                opacity: 0,
                y: 80,
                rotateX: 25,
                transformPerspective: 800,
                transformOrigin: "50% 100%",
                stagger: 0.14,
                duration: 1,
                ease: "expo.out",
                scrollTrigger: { trigger: cardsContainerRef.current, start: "top 85%", toggleActions: "play reverse play reverse" },
            });
            gsap.from(".other-skill-icon", {
                opacity: 0,
                scale: 0.6,
                y: 30,
                stagger: 0.07,
                duration: 0.7,
                ease: "back.out(1.4)",
                scrollTrigger: { trigger: ".other-skills-grid", start: "top 88%", toggleActions: "play reverse play reverse" },
            });
        }, ctxEl);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={sectionRef} className="relative flex flex-col mt-32 md:mt-[400px] lg:mt-60 overflow-hidden" id="Competences">
            <FloatingTechIcons />
            <SplitReveal as="h1" className="relative z-10 md:text-5xl text-4xl text-center mb-3 font3 text-[#0a001a] dark:text-[#efe5ff]">
                🧠 Mes compétences
            </SplitReveal>
            <span className="relative z-10 text-2xl text-center mb-12 font3 bg-gradient-to-r dark:from-[#a877fd] dark:to-[#ff6fd8] from-[#330288] to-[#a877fd] bg-clip-text text-transparent">✨ Principaux</span>

            {/* Conteneur des cartes avec ref pour détection de visibilité */}
            <div
                ref={cardsContainerRef}
                className="relative z-10 mx-auto flex w-[92%] max-w-6xl flex-col items-stretch gap-5 lg:h-[300px] lg:w-full lg:flex-row lg:items-stretch lg:justify-center lg:gap-6"
            >
                {SKILL_CARDS.map(({ Icon, label, glow }, i) => (
                    <div key={label} className="min-w-0 h-[220px] lg:h-auto lg:flex-1">
                        <SkillCard
                            Icon={Icon}
                            label={label}
                            glow={glow}
                            count={counters[i]}
                            gradientColor={theme === "dark" ? glow : "#fc4fe8"}
                        />
                    </div>
                ))}
            </div>

            <motion.div className="relative flex flex-col items-center font3 z-20" ref={ref}
                style={{ y }}
            >
                <span className="text-2xl text-center md:mt-52 mt-32 mb-2 font3 text-[#0a001a] dark:text-[#efe5ff]">🛠️ Autres compétences</span>
                <div className="other-skills-grid mx-auto grid grid-cols-2 gap-x-6 gap-y-8 mt-6 md:grid-cols-4 md:gap-8 max-w-4xl bg-gradient-to-br dark:from-[#e8dcfe] dark:to-[#d8c4fb] from-[#12052e] to-[#0a001a] p-8 md:p-14 rounded-2xl dark:text-[#0a001a] text-[#efe5ff] shadow-xl">
                    {OTHER_SKILLS.map(({ Icon, label, size }) => (
                        <div key={label} className="other-skill-icon">
                            <section className="flex flex-col items-center gap-1">
                                <Icon size={size} />
                                <h2 className="text-lg md:text-xl text-center">{label}</h2>
                            </section>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}