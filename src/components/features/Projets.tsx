"use client";

import { useEffect, useRef } from "react";
import { Tabs } from "../ui/tabs";
import { gsap } from "@/lib/gsapConfig";
import { useTilt3D } from "@/lib/useTilt3D";
import { SplitReveal } from "./SplitReveal";
import zagyserv from "@/assets/zagyserv.png";
import hardsoft from "@/assets/hardsoft.png";
import freelancer from "@/assets/freelancer.png";
import setamf from "@/assets/setamf.png";
import ChampChain from "@/assets/CapChampPortfolio.png";

export function Projets() {
  const rootRef = useRef<HTMLDivElement>(null);
  const tabsWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      // Entrée 3D marquée : la fenêtre de projets "sort de l'écran" en
      // perspective, comme un panneau qui pivote vers le visiteur.
      gsap.fromTo(
        tabsWrapRef.current,
        { opacity: 0, y: 90, rotateX: 24, scale: 0.9, transformPerspective: 1200, transformOrigin: "50% 100%" },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 82%", toggleActions: "play reverse play reverse" },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  const tabs = [
    {
      title: "🚀 zagy'serv",
      value: "zagy'serv",
      content: (
        <div className="w-full flex gap-4 overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold font3 dark:text-[#0a001a] text-[#ede4fb] bg-gradient-to-br dark:from-[#efe5ff] dark:to-[#d8c4fb] from-[#0a001a] to-[#1c0a3d]">
          <span className="text-orange-400">Projet : zagy'serv</span> 
          <p>/</p>
          <span>Technologie : Next js</span> 
          <DummyContent1 />
        </div>
      ),
    },
    {
      title: "💼 HardSoft",
      value: "HardSoft",
      content: (
        <div className="w-full flex gap-4 overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold font3 dark:text-[#0a001a] text-[#ede4fb] bg-gradient-to-br dark:from-[#efe5ff] dark:to-[#d8c4fb] from-[#0a001a] to-[#1c0a3d]">
          <span className="text-pink-500">Projet : HardSoft</span> 
          <p>/</p>
          <span>Technologie : Next js</span> 
          <DummyContent2 />
        </div>
      ),
    },
    {
      title: "🧑‍💻 Freelancers229",
      value: "Freelancers229",
      content: (
        <div className="w-full flex gap-4 overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold font3 dark:text-[#0a001a] text-[#ede4fb] bg-gradient-to-br dark:from-[#efe5ff] dark:to-[#d8c4fb] from-[#0a001a] to-[#1c0a3d]">
          <span className="text-emerald-500">Projet : Freelancers229</span> 
          <p>/</p>
          <span>Technologie : React js</span> 
          <DummyContent3 />
        </div>
      ),
    },
    {
      title: "🏗️ setamf-engineering",
      value: "setamf-engineering",
      content: (
        <div className="w-full flex gap-4 overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold font3 dark:text-[#0a001a] text-[#ede4fb] bg-gradient-to-br dark:from-[#efe5ff] dark:to-[#d8c4fb] from-[#0a001a] to-[#1c0a3d]">
          <span className="text-sky-400">Projet : setamf-engineering</span> 
          <p>/</p>
          <span>Technologie : Wordpress</span> 
          <DummyContent4 />
        </div>
      ),
    },
    {
      title: "🏆 ChampChain",
      value: "ChampChain",
      content: (
        <div className="w-full flex flex-col gap-4 overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold font3 dark:text-[#0a001a] text-[#ede4fb] bg-gradient-to-br dark:from-[#efe5ff] dark:to-[#d8c4fb] from-[#0a001a] to-[#1c0a3d]">
          <span className="text-amber-400">Projet : ChampChain</span>
          <p className="text-base md:text-lg font-normal opacity-80">Hackathon Superteam Earn 🏆</p>
          <HackathonBadge />
        </div>
      ),
    },
  ];

  return (
    <div ref={rootRef} id="Projets" className="[perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start lg:mt-[200px] mt-[180px]">
      <SplitReveal as="h1" className="md:text-5xl text-4xl w-full font3 text-left pl-3 mb-5">
        📁 Mes projets
      </SplitReveal>
      <div ref={tabsWrapRef} className="w-full h-[24rem] md:h-[36rem] [transform-style:preserve-3d]">
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
}

export const DummyContent1 = () => {
  const tiltRef = useTilt3D<HTMLAnchorElement>({ max: 5, scale: 1.02 });
  return (
    <a
      ref={tiltRef}
      href="https://zagyserv.netlify.app/"
      target="_blank"
      rel="noopener noreferrer"
      className="absolute inset-4 md:inset-8 z-10 block overflow-hidden rounded-xl shadow-2xl ring-1 ring-[#a877fd]/30"
    >
      <img src={zagyserv} alt="Aperçu du site zagy'serv" className="h-full w-full object-cover object-left-top" />
    </a>
  );
};

export const DummyContent2 = () => {
  const tiltRef = useTilt3D<HTMLAnchorElement>({ max: 5, scale: 1.02 });
  return (
    <a
      ref={tiltRef}
      href="https://hardsoftbusiness.netlify.app/"
      target="_blank"
      rel="noopener noreferrer"
      className="absolute inset-4 md:inset-8 z-10 block overflow-hidden rounded-xl shadow-2xl ring-1 ring-[#a877fd]/30"
    >
      <img src={hardsoft} alt="Aperçu du site HardSoft" className="h-full w-full object-cover object-left-top" />
    </a>
  );
};

export const DummyContent3 = () => {
  const tiltRef = useTilt3D<HTMLAnchorElement>({ max: 5, scale: 1.02 });
  return (
    <a
      ref={tiltRef}
      href="https://freelancers229.netlify.app/"
      target="_blank"
      rel="noopener noreferrer"
      className="absolute inset-4 md:inset-8 z-10 block overflow-hidden rounded-xl shadow-2xl ring-1 ring-[#a877fd]/30"
    >
      <img src={freelancer} alt="Aperçu du site Freelancers229" className="h-full w-full object-cover object-left-top" />
    </a>
  );
};


/** Carte "hackathon" sans capture d'écran — badge propre en attendant les visuels du projet. */
export const HackathonBadge = () => {
  const tiltRef = useTilt3D<HTMLDivElement>({ max: 5, scale: 1.02 });
  return (
    <a
      ref={tiltRef}
      href="https://champchain.vercel.app/"
      target="_blank"
      rel="noopener noreferrer"
      className="absolute inset-4 md:inset-8 z-10 block overflow-hidden rounded-xl shadow-2xl ring-1 ring-[#a877fd]/30"
    >
      <img src={ChampChain} alt="Aperçu du site Champchain" className="h-full w-full object-cover object-left-top" />
    </a>
  );
};

export const DummyContent4 = () => {
  const tiltRef = useTilt3D<HTMLAnchorElement>({ max: 5, scale: 1.02 });
  return (
    <a
      ref={tiltRef}
      href="https://setamf-engineering.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="absolute inset-4 md:inset-8 z-10 block overflow-hidden rounded-xl shadow-2xl ring-1 ring-[#a877fd]/30"
    >
      <img src={setamf} alt="Aperçu du site setamf-engineering" className="h-full w-full object-cover object-left-top" />
    </a>
  );
};