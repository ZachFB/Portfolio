import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { FolderDot, GraduationCap, Home, Mail } from 'lucide-react';
import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";

export const Navbar = ({className} : {className?:string}) => {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => setIsOpen(false);

  // Ferme le menu au clic en dehors de lui (et du bouton hamburger qui l'ouvre).
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (menuRef.current?.contains(target)) return;
      if (toggleBtnRef.current?.contains(target)) return;
      closeMenu();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Le header gagne une ombre douce + un fond plus opaque dès qu'on scrolle
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const trigger = ScrollTrigger.create({
      start: 40,
      end: 99999,
      onUpdate: (self) => {
        gsap.to(header, {
          boxShadow: self.progress > 0 || window.scrollY > 40
            ? "0 8px 30px -10px rgba(168,119,253,0.35)"
            : "0 0 0 rgba(0,0,0,0)",
          backdropFilter: window.scrollY > 40 ? "blur(10px)" : "blur(0px)",
          duration: 0.3,
        });
      },
    });
    return () => trigger.kill();
  }, []);

  return (
    <header ref={headerRef} className={clsx(className, "fixed top-0 w-full font1 h-20 border border-b-accent transition-shadow")}>
      <nav className="flex max-w-6xl mt-6 m-auto items-center justify-between">
        <h1 className="ml-8 text-2xl mr-auto bg-gradient-to-r dark:from-[#efe5ff] dark:to-[#a877fd] from-[#0a001a] to-[#330288] bg-clip-text text-transparent font-semibold">🚀 Dev Zack</h1>
        
        {/* Bouton pour ouvrir le menu sur mobile/tablette */}
        <button
          ref={toggleBtnRef}
          className="md:hidden mr-8 focus:outline-none"
          onClick={toggleMenu}
        >
          {/* Icone pour le menu hamburger */}
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>

        {/* Menu pour desktop */}
        <ul className="hidden md:flex md:space-x-6">
        <a href="#Presentation"><li className="flex space-x-2 hover:text-[#a877fd] transition-colors active:text-muted"><Home size={20}/><span>Présentation</span></li></a>
        <a href="#Competences"><li className="flex space-x-2 hover:text-[#a877fd] transition-colors active:text-muted"><GraduationCap size={20}/><span>Compétences</span></li></a>
        <a href="#Projets"><li className="flex space-x-2 hover:text-[#a877fd] transition-colors active:text-muted"><FolderDot size={20}/><span>Projets</span></li></a>
        <a href="#Contact"><li className="flex space-x-2 hover:text-[#a877fd] transition-colors active:text-muted"><Mail size={20}/><span>Contact</span></li></a>
          <li><ThemeToggle/></li>
        </ul>

        {/* Dropdown pour mobile/tablette */}
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              ref={menuRef}
              className="md:hidden absolute top-20 left-0 w-full dark:bg-[#0a001a] bg-[#efe5ff] z-20 overflow-hidden origin-top"
              initial={{ opacity: 0, scaleY: 0.7, y: -20 }}
              animate={{ opacity: 1, scaleY: 1, y: 0 }}
              exit={{ opacity: 0, scaleY: 0.7, y: -20 }}
              transition={{ duration: 0.38, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <a href="#Presentation" onClick={closeMenu}><li className="px-6 py-2 flex space-x-2 active:text-muted"><Home size={20}/><span>Présentation</span></li></a>
              <a href="#Competences" onClick={closeMenu}><li className="px-6 py-2 flex space-x-2 active:text-muted"><GraduationCap size={20}/><span>Compétences</span></li></a>
              <a href="#Projets" onClick={closeMenu}><li className="px-6 py-2 flex space-x-2 active:text-muted"><FolderDot size={20}/><span>Projets</span></li></a>
              <a href="#Contact" onClick={closeMenu}><li className="px-6 py-2 flex space-x-2 active:text-muted"><Mail size={20}/><span>Contact</span></li></a>
              <li className="px-6 py-2"><ThemeToggle/></li>
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};