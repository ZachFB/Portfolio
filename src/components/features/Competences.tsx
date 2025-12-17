import { MagicCard } from "@/components/magicui/magic-card";
import { useTheme } from "./ThemeProvider";
import { RiReactjsFill } from "react-icons/ri";
import { SiNextdotjs } from "react-icons/si";
import { FaWordpress } from "react-icons/fa";
import { FaNodeJs } from "react-icons/fa6";
import { SiExpress } from "react-icons/si";
import { SiTailwindcss } from "react-icons/si";
import { FaPhp } from "react-icons/fa";
import { RiJavascriptFill } from "react-icons/ri";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

export function Competences() {
    const { theme } = useTheme();
    const ref = useRef<HTMLDivElement | null>(null);
    
    // Refs pour détecter la visibilité
    const cardsContainerRef = useRef<HTMLDivElement>(null);
    const isCardsInView = useInView(cardsContainerRef, { 
        once: true, 
        amount: 0.3,
        margin: "-100px"
    });
    
    // États pour les compteurs
    const [reactCount, setReactCount] = useState(0);
    const [nextCount, setNextCount] = useState(0);
    const [wpCount, setWpCount] = useState(0);
    
    // Animation des compteurs
    useEffect(() => {
        if (isCardsInView) {
            // Animation React (90%)
            let reactCurrent = 0;
            const reactTimer = setInterval(() => {
                reactCurrent += 1;
                setReactCount(reactCurrent);
                if (reactCurrent >= 90) clearInterval(reactTimer);
            }, 20); // Ajustez la vitesse si nécessaire
            
            // Animation Next.js (50%) avec un petit délai
            setTimeout(() => {
                let nextCurrent = 0;
                const nextTimer = setInterval(() => {
                    nextCurrent += 1;
                    setNextCount(nextCurrent);
                    if (nextCurrent >= 50) clearInterval(nextTimer);
                }, 30);
            }, 300);
            
            // Animation WordPress (90%) avec un délai
            setTimeout(() => {
                let wpCurrent = 0;
                const wpTimer = setInterval(() => {
                    wpCurrent += 1;
                    setWpCount(wpCurrent);
                    if (wpCurrent >= 90) clearInterval(wpTimer);
                }, 20);
            }, 600);
            
            return () => {
                clearInterval(reactTimer);
            };
        }
    }, [isCardsInView]);
    
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [-300, 350]);

    return (
        <div className="flex flex-col lg:mt-60 md:mt-[400px] mt-64" id="Competences">
            <h1 className="md:text-5xl text-4xl text-center mb-12 font3 text-[#0a001a] dark:text-[#efe5ff]">Mes compétences</h1>
            <span className="text-2xl text-center mb-12 font3 text-[#0a001a] dark:text-[#efe5ff]">Principaux</span>
            
            {/* Conteneur des cartes avec ref pour détection de visibilité */}
            <div 
                ref={cardsContainerRef}
                className={
                    "flex h-[800px] w-[70%] flex-col m-auto gap-4 lg:h-[250px] lg:flex-row z-10"
                }
            >
                {/* Carte React - Style inchangé */}
                <MagicCard
                    className="cursor-pointer flex-col items-center dark:bg-[#0a001a] bg-[#efe5ff] shadow-2xl whitespace-nowrap"
                    gradientColor={theme === "dark" ? "#262626" : "#fc4fe8"}
                >
                    <section className="flex flex-col items-center mt-12 font3">
                        <RiReactjsFill size={60} />
                        <h2 className="text-2xl">React JS</h2>
                        <h3 className="mt-3 text-5xl">{reactCount}%</h3>
                    </section>
                </MagicCard>

                {/* Carte Next.js - Style inchangé */}
                <MagicCard
                    className="cursor-pointer flex-col items-center dark:bg-[#0a001a] bg-[#efe5ff] shadow-2xl whitespace-nowrap"
                    gradientColor={theme === "dark" ? "#262626" : "#fc4fe8"}
                >
                    <section className="flex flex-col items-center mt-12 font3">
                        <SiNextdotjs size={60} />
                        <h2 className="text-2xl">Next JS</h2>
                        <h3 className="mt-3 text-5xl">{nextCount}%</h3>
                    </section>
                </MagicCard>

                {/* Carte WordPress - Style inchangé */}
                <MagicCard
                    className="cursor-pointer flex-col items-center dark:bg-[#0a001a] bg-[#efe5ff] shadow-2xl whitespace-nowrap"
                    gradientColor={theme === "dark" ? "#262626" : "#fc4fe8"}
                >
                    <section className="flex flex-col items-center mt-12 font3">
                        <FaWordpress size={60} />
                        <h2 className="text-2xl">Wordpress</h2>
                        <h3 className="mt-3 text-5xl">{wpCount}%</h3>
                    </section>
                </MagicCard>
            </div>
            
            <motion.div className="flex flex-col items-center font3 z-0" ref={ref}
                style={{ y }}
            >
                <span className="text-2xl text-center md:mt-52 mt-32 font3 text-[#0a001a] dark:text-[#efe5ff]">Autres compétences</span>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-5 mt-6 dark:bg-[#e8dcfe] bg-[#0d0123] p-10 md:p-20 rounded-xl dark:text-[#0a001a] text-[#efe5ff]">
                    {/* Première ligne : 2 éléments en mobile, 2 éléments sur tablette */}
                    <div className="md:col-span-2 grid grid-cols-2 gap-5 md:gap-5 justify-self-center md:justify-self-auto">
                        <div>
                            <section className="flex flex-col items-center">
                                <FaNodeJs size={45} />
                                <h2 className="text-xl">Node JS</h2>
                            </section>
                        </div>
                        <div>
                            <section className="flex flex-col items-center">
                                <SiExpress size={45} />
                                <h2 className="text-xl">Express JS</h2>
                            </section>
                        </div>
                    </div>
                    {/* Deuxième ligne : 3 éléments en mobile, 3 éléments sur tablette */}
                    <div className="md:col-span-3 grid grid-cols-3 gap-5 justify-center md:justify-start">
                        <div>
                            <section className="flex flex-col items-center">
                                <SiTailwindcss size={48} />
                                <h2 className="text-xl">Tailwind CSS</h2>
                            </section>
                        </div>
                        <div>
                            <section className="flex flex-col items-center">
                                <FaPhp size={50} />
                                <h2 className="text-xl">Php</h2>
                            </section>
                        </div>
                        <div>
                            <section className="flex flex-col items-center">
                                <RiJavascriptFill size={50} />
                                <h2 className="text-xl">Javascript</h2>
                            </section>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}