import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsapConfig";
import { AvatarC } from "./AvatarC";
import { AvatarPortrait } from "./AvatarPortrait";

export const HeroDetail = () => {
    // State
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const period = 1000;

    const rootRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    // Function tick with useCallback
    const tick = useCallback(() => {
        const toRotate = [
            "🚀 Zack – Développeur React.js passionné",
            "⚡ Créateur d'expériences web accrochantes",
            "💡 Innovateur en solutions front-end modernes",
        ];
        const i = loopNum % toRotate.length;
        const fullText = toRotate[i];
        const updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(70);
        }
    }, [loopNum, isDeleting, text, period]);

    // Comportement
    useEffect(() => {
        const ticker = setInterval(() => {
            tick();
        }, delta);
        return () => { clearInterval(ticker) };
    }, [tick, delta]);

    // Entrée GSAP : avatar + carte glissent et fondent à l'ouverture
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
            tl.from(rootRef.current?.querySelector(".hero-avatar") ?? [], {
                x: -160,
                opacity: 0,
                rotateY: -25,
                transformPerspective: 800,
                duration: 1.1,
            }).from(
                cardRef.current,
                { opacity: 0, y: 40, scale: 0.94, rotateX: 8, transformPerspective: 900, duration: 1 },
                "-=0.6"
            );
        }, rootRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={rootRef} className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-3 font2 px-4">
            <div className="hero-avatar mt-40">
                <AvatarPortrait />
            </div>
            <div
                ref={cardRef}
                className="relative lg:pl-8 pl-3 lg:ml-6 md:m-5 m-2 md:h-60 h-[210px] w-[88%] max-w-[380px] md:w-full md:max-w-[670px] lg:w-[800px] lg:h-72 xl:w-[900px] xl:h-80 bg-gradient-to-br dark:from-[#a877fd] dark:via-[#8f5cf0] dark:to-[#6f3fe0] from-[#4d18b8] via-[#330288] to-[#20015c] shadow-[0_0_60px_-15px_rgba(168,119,253,0.55)] z-10 rounded-2xl md:mt-32 mt-8"
            >
                <h1 className="md:mt-10 mt-4 md:text-6xl text-4xl text-left mb-4 dark:text-[#0a001a] text-[#efe5ff] lg:text-7xl min-h-[1.4em] leading-snug">
                    {text}
                    <span className="animate-pulse">|</span>
                </h1>
                <AvatarC />
            </div>
        </div>
    )
}