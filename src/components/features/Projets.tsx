"use client";

import { Tabs } from "../ui/tabs";
import zagyserv from "@/assets/zagyserv.png";
import hardsoft from "@/assets/hardsoft.png";
import freelancer from "@/assets/freelancer.png";
import setamf from "@/assets/setamf.png";

export function Projets() {
  const tabs = [
    {
      title: "zagy'serv",
      value: "zagy'serv",
      content: (
        <div className="w-full flex gap-4 overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold font3 dark:text-[#0a001a] text-[#ede4fb] bg-gradient-to-br dark:bg-[#efe5ff] bg-[#0a001a]">
          <span className="text-orange-400">Projet : zagy'serv</span> 
          <p>/</p>
          <span>Technologie : Next js</span> 
          <DummyContent1 />
        </div>
      ),
    },
    {
      title: "HardSoft",
      value: "HardSoft",
      content: (
        <div className="w-full flex gap-4 overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold font3 dark:text-[#0a001a] text-[#ede4fb] bg-gradient-to-br dark:bg-[#efe5ff] bg-[#0a001a]">
          <span className="text-pink-600">Projet : HardSoft</span> 
          <p>/</p>
          <span>Technologie : Next js</span> 
          <DummyContent2 />
        </div>
      ),
    },
    {
      title: "Freelancers229",
      value: "Freelancers229",
      content: (
        <div className="w-full flex gap-4 overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold font3 dark:text-[#0a001a] text-[#ede4fb] bg-gradient-to-br dark:bg-[#efe5ff] bg-[#0a001a]">
          <span className="text-emerald-600">Projet : Freelancers229</span> 
          <p>/</p>
          <span>Technologie : React js</span> 
          <DummyContent3 />
        </div>
      ),
    },
    {
      title: "setamf-engineering",
      value: "setamf-engineering",
      content: (
        <div className="w-full flex gap-4 overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold font3 dark:text-[#0a001a] text-[#ede4fb] bg-gradient-to-br dark:bg-[#efe5ff] bg-[#0a001a]">
          <span className="text-blue-400">Projet : setamf-engineering</span> 
          <p>/</p>
          <span>Technologie : Wordpress</span> 
          <DummyContent4 />
        </div>
      ),
    },
  ];

  return (
    <div id="Projets" className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start lg:mt-[200px] mt-[180px]">
      <h1 className="md:text-5xl text-4xl w-full font3 text-left pl-3 mb-5">Mes projets</h1>
      <Tabs tabs={tabs} />
    </div>
  );
}

export const DummyContent1 = () => {
  return (
    <a href="https://zagyserv.netlify.app/ " target="_blank" rel="noopener noreferrer">
    <img
      src={zagyserv}
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
    </a>
  );
};

export const DummyContent2 = () => {
  return (
    <a href="https://hardsoftbusiness.netlify.app/" target="_blank" rel="noopener noreferrer">
    <img
      src={hardsoft}
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
    </a>
  );
};

export const DummyContent3 = () => {
  return (
    <a href="https://freelancers229.netlify.app/" target="_blank" rel="noopener noreferrer">
    <img
      src={freelancer}
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
    </a>
  );
};


export const DummyContent4 = () => {
  return (
    <a href="https://setamf-engineering.com/" target="_blank" rel="noopener noreferrer">
    <img
      src={setamf}
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
    </a>
  );
};
