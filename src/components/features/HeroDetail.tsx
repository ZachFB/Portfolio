import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { motion } from "framer-motion"
const zackImage = new URL("../../assets/zack.jpeg", import.meta.url).href;
import { useCallback, useEffect, useState } from "react";
import { AvatarC } from "./AvatarC";

export const HeroDetail = () => {
    // State
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const period = 1000;

    // Function tick with useCallback
    const tick = useCallback(() => {
        const toRotate = [
            "🚀Zack – Développeur React.js passionné ",
            "⚡Créateur d'expériences web avec Next.js",
            "💡Innovateur en solutions front-end modernes",
            "🌐Architecte d'interfaces utilisateur dynamiques"
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

    return (
        <div className="flex flex-row z-10 font2">
            <motion.div
                initial={{ x: -150 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Avatar className="md:w-60 md:h-60 w-36 h-36 mt-40  lg:ml-[76px] ml-3">
                    <AvatarImage src={zackImage} />
                    <AvatarFallback>ZACK</AvatarFallback>#a877fd
                </Avatar>
            </motion.div>
            <div className="relative lg:pl-8 pl-3 lg:ml-12 md:m-5 m-2 md:h-60 h-[160px] w-[670px] dark:bg-[#a877fd] bg-[#330288] z-10 rounded-xl md:mt-40 mt-40 ">
                <h1 className="md:mt-10 mt-5 md:text-6xl text-3xl text-left xs:ml-6 mb-6 dark:text-[#0a001a] text-[#efe5ff] ">{text}</h1>
                <AvatarC />
            </div>
        </div>
    )
}
