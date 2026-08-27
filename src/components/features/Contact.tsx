"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Cobe } from "../ui/globe";
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { gsap } from "@/lib/gsapConfig";
import { SplitReveal } from "./SplitReveal";

interface FormData {
  name: string;
  email: string;
  message: string;
  access_key?: string;
}


export function Contact() {
  const [movbut, setMovbut] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const rootRef = useRef<HTMLDivElement>(null);
  const globeSlotRef = useRef<HTMLDivElement>(null);
  const [showGlobe, setShowGlobe] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll("form > div > div"), {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 82%", toggleActions: "play reverse play reverse" },
      });
      gsap.from(el.querySelector(".globe-wrap"), {
        opacity: 0,
        scale: 0.8,
        rotateY: -30,
        transformPerspective: 900,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 82%", toggleActions: "play reverse play reverse" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  // Le globe 3D (WebGL) est coûteux : on ne le monte que quand il approche
  // du viewport, pour ne jamais bloquer le thread principal au chargement.
  useEffect(() => {
    const slot = globeSlotRef.current;
    if (!slot) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShowGlobe(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(slot);
    return () => observer.disconnect();
  }, []);

  //Comportement 
  //Traitement de handleSubmit 
  const onSubmit = async (formData: FormData) => {
    formData.access_key = "e6d1232b-ee9f-47ef-9e41-fb6928a514fb";
  
    const json = JSON.stringify(formData);
  
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());
  
    if (res.success) {
      Swal.fire({
        title: "Envoyé ! 🎉",
        text: "Merci de m'avoir contacté, je serai à vous sous peu de temps.",
        icon: "success",
        confirmButtonText: "Fermer",
        customClass: {
            popup: 'rounded-xl bg-[#121212] text-[#fff] absolute h-[400px] w[200px] md:mb-20',
            title: 'font3',
            confirmButton: 'h-[50px] w-[150px] bg-[#efe5ff] text-[#0a001a] rounded-lg',
          },
      });
    } else {
      Swal.fire({
        title: "Désolé, votre message n'a pas été envoyé",
        text: "Veuillez réessayer s'il vous plaît.",
        icon: "error",
        confirmButtonText: "Fermer",
        customClass: {
            popup: 'rounded-xl bg-[#121212] text-[#fff] absolute h-[400px] w[200px] md:mb-20',
            title: 'font3',
            confirmButton: 'h-[50px] w-[150px]  text-[#0a001a] rounded-lg',
          },
      });
    }
  };

 //Affichage
  return (
    <div ref={rootRef} id="Contact" className="flex flex-col md:flex-row items-center justify-center md:mt-36 dark:bg-[#0a001a] bg-[#efe5ff] relative w-full">
      <div ref={globeSlotRef} className="globe-wrap w-full md:w-[420px] lg:w-[520px] shrink-0 min-h-[200px] flex items-center justify-center">
        {showGlobe && <Cobe />}
      </div>
      <div className="flex justify-center md:mr-[200px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <SplitReveal as="h1" className="text-3xl font3 text-center mb-2 text-[#0a001a] dark:text-[#efe5ff]">
            📬 Contactez-moi
          </SplitReveal>
          <div className='grid grid-cols-12 md:w-[430px] place-content-center'>
            <div className='grid col-span-12 mb-2'>
              <input
                {...register('name', {
                  required: true,
                  pattern: /^[A-Za-z ]+$/,
                  maxLength: 30,
                })}
                type="text"
                placeholder="Nom"
                name='name'
                className="col-span-12 p-3 font3 rounded-md  bg-blue-gray-50 dark:bg-[#0a001a] bg-[#efe5ff] border border-accent-foreground font1 outline-none"
              />
            </div>
              {errors.name && errors.name.type === 'required' && <p className='col-span-6 text-[#0a001a] dark:text-[#efe5ff] font2'>Ce champ est requis</p>}
              {errors.name && errors.name.type === 'maxLength' && <p className='col-span-6 text-[#0a001a] dark:text-[#efe5ff] font2'>Votre nom est trop long</p>}
              {errors.name && errors.name.type === 'pattern' && <p className='col-span-6 text-[#0a001a] dark:text-[#efe5ff] font2'>Ceci n'est un nom</p>}

            <div className='grid col-span-12 mb-2'>
              <input
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                })} placeholder="Votre adresse mail"
                name='email'
                className='col-span-12 font3 bg-blue-gray-50 h-[50px] dark:bg-[#0a001a] bg-[#efe5ff] border border-accent-foreground p-3 rounded-md font1 outline-none'
              />
              {errors.email && errors.email.type === "required" && <p className='col-span-8 mr-20 text-[#0a001a] dark:text-[#efe5ff] font2'>Veuillez entrer une adresse mail</p>}
              {errors.email && errors.email.type === "pattern" && <p className='col-span-8 mr-20 text-[#0a001a] dark:text-[#efe5ff] font2' >Vous saisissez une fausse address </p>}
            </div>

            <div className='grid col-span-12 mb-2'>
              <textarea
                {...register('message', {
                  required: true,
                  pattern: /^[A-Za-z0-9._%()+\-!?*\s]+$/,
                  maxLength: 800,
                })}
                placeholder='Message'
                name='message'
                className='col-span-12 font3 resize-none p-20 bg-blue-gray-50 dark:bg-[#0a001a] bg-[#efe5ff] border border-accent-foreground rounded-md font1 outline-none'
              >
              </textarea>
            </div>
            {errors.message && errors.message.type === 'required' && <p className='col-span-8 mr-20 text-[#0a001a] dark:text-[#efe5ff] font2'>Ce champ est requis</p>}
            {errors.message && errors.message.type === 'maxLength' && <p className='col-span-8 mr-20 text-[#0a001a] dark:text-[#efe5ff] font2'>Votre message est trop long</p>}
            {errors.message && errors.message.type === 'pattern' && <p className='col-span-8 mr-20 text-[#0a001a] dark:text-[#efe5ff] font2'>Ceci n'est pas un message</p>}
            <div className='grid col-span-12'>
              <motion.button
                className='col-span-3 bg-gradient-to-r dark:from-[#a877fd] dark:to-[#ff6fd8] from-[#330288] to-[#a877fd] font3 text-[#efe5ff] p-3 rounded-lg shadow-lg shadow-[#a877fd]/30'
                animate={{ scale: movbut ? 1.1 : 1 }}
                whileHover={{ scale: 1.04 }}
                onClick={() => {
                  setMovbut(true);
                  setTimeout(() => {
                    setMovbut(false);
                  }, 100);
                }}

              >
                🚀 Envoyer
              </motion.button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

