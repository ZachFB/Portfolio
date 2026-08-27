import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Send, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "@/lib/gsapConfig";
import { prefersReducedMotion } from "@/lib/motionPrefs";
import { useTilt3D } from "@/lib/useTilt3D";
import { DAN_SUGGESTIONS, findDanAnswer } from "@/lib/danKnowledge";
import { DanCharacter, type DanMood } from "./DanCharacter";

interface Message {
  id: number;
  from: "dan" | "user";
  text: string;
}

export const DanChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState("");
  const [pulseKey, setPulseKey] = useState(0);
  const [panelHeight, setPanelHeight] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      from: "dan",
      text: "Salut 👋 Moi c'est Dan, l'assistant de Zack. Pose-moi une question sur son profil, ses compétences ou ses projets !",
    },
  ]);

  const bubbleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelWrapperRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const idleTweenRef = useRef<gsap.core.Tween | null>(null);
  const greetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tiltRef = useTilt3D<HTMLButtonElement>({ max: 10, scale: 1.08 });

  const [mood, setMood] = useState<DanMood>("idle");

  // Ferme le chat au clic en dehors du panneau (et de la bulle qui l'ouvre) —
  // sauf si l'utilisateur a commencé à taper un message, pour ne jamais lui
  // faire perdre ce qu'il était en train d'écrire.
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (input.trim().length > 0) return;
      const target = e.target as Node;
      if (panelWrapperRef.current?.contains(target)) return;
      if (bubbleRef.current?.contains(target)) return;
      setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, input]);

  // Entrée + flottement idle 3D du bouton (léger wobble façon "objet emballé")
  useEffect(() => {
    if (!bubbleRef.current) return;
    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {
      gsap.from(bubbleRef.current, {
        scale: 0,
        rotateY: -50,
        opacity: 0,
        transformPerspective: 600,
        duration: 0.9,
        delay: 1,
        ease: "back.out(1.25)",
      });
      if (!reduced) {
        bubbleRef.current!.style.transformStyle = "preserve-3d";
        idleTweenRef.current = gsap.to(bubbleRef.current, {
          y: -8,
          rotateY: 8,
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.9,
          transformPerspective: 600,
        });
      }
    });
    return () => ctx.revert();
  }, []);

  // Ouverture / fermeture : on met en pause le flottement de la bulle et on
  // déclenche le salut de Dan (avec son petit tour sur lui-même) au moment
  // où il apparaît au-dessus du chat.
  useEffect(() => {
    if (isOpen) {
      idleTweenRef.current?.pause();
      setMood("greet");
      greetTimeoutRef.current = setTimeout(() => setMood("idle"), 2200);
    } else {
      idleTweenRef.current?.resume();
      setMood("idle");
    }
    return () => {
      if (greetTimeoutRef.current) clearTimeout(greetTimeoutRef.current);
    };
  }, [isOpen]);

  // Dan réagit à ce qui se passe réellement dans le chat : il "marche",
  // attentif, pendant que l'utilisateur tape, et "réfléchit" (fait les cent
  // pas) pendant qu'il génère sa réponse.
  useEffect(() => {
    if (!isOpen) return;
    if (isTyping) setMood("thinking");
    else if (input.trim().length > 0) setMood("listening");
    else setMood((m) => (m === "greet" ? m : "idle"));
  }, [isTyping, input, isOpen]);

  // Mesure la vraie hauteur du panneau (au lieu de deviner une valeur en vh)
  // pour positionner Dan exactement au-dessus, quelle que soit la taille de
  // la fenêtre — c'est ce qui évite qu'il se retrouve hors champ en haut.
  useLayoutEffect(() => {
    if (!isOpen) return;
    const panel = panelRef.current;
    if (!panel) return;
    const update = () => setPanelHeight(panel.getBoundingClientRect().height);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(panel);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [isOpen]);

  // Auto-scroll + animation d'entrée des nouveaux messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    const last = document.querySelector(".dan-msg:last-child");
    if (last) {
      gsap.from(last, { opacity: 0, y: 16, duration: 0.4, ease: "power2.out" });
    }
  }, [messages]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((m) => [...m, { id: Date.now(), from: "user", text: trimmed }]);
    setInput("");
    setIsTyping(true);
    setPulseKey((k) => k + 1);

    const delay = 500 + Math.random() * 500;
    setTimeout(() => {
      const answer = findDanAnswer(trimmed);
      setMessages((m) => [...m, { id: Date.now() + 1, from: "dan", text: answer }]);
      setIsTyping(false);
    }, delay);
  };

  return (
    <>
      {/* Dan, toujours visible au-dessus de la bulle (endormi, chat fermé) ou
          au-dessus du panneau (éveillé, chat ouvert) — jamais démonté, pour
          que ses comportements idle/sommeil tournent en continu. La position
          "ouvert" se base sur la vraie hauteur mesurée du panneau (pas une
          valeur devinée en vh), pour ne jamais sortir du cadre en haut. */}
      <div
        className="pointer-events-none fixed right-4 md:right-6 z-[60] transition-[bottom,transform] duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transformOrigin: "bottom right",
          bottom: isOpen && panelHeight > 0 ? `${96 + panelHeight - 26}px` : "92px",
          transform: isOpen ? "scale(1.15)" : "scale(1)",
        }}
      >
        <DanCharacter mood={mood} pulseKey={pulseKey} asleep={!isOpen} />
      </div>

      {/* Bulle flottante */}
      <button
        ref={(node) => {
          bubbleRef.current = node;
          tiltRef.current = node;
        }}
        onClick={() => setIsOpen((o) => !o)}
        aria-label="Ouvrir le chat avec Dan"
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full shadow-2xl shadow-[#a877fd]/50 focus:outline-none"
      >
        <div className="relative h-full w-full">
          <div
            className="absolute -inset-1 rounded-full opacity-90"
            style={{ background: "conic-gradient(from 0deg, #a877fd, #ff6fd8, #63e8ff, #a877fd)" }}
          />
          <div className="absolute inset-[3px] flex items-center justify-center overflow-hidden rounded-full border-2 border-[#0a001a] bg-gradient-to-br from-[#a877fd] to-[#6f3fe0]">
            <svg viewBox="0 0 100 100" className="h-9 w-9">
              <rect x="30" y="14" width="6" height="14" rx="3" fill="#efe5ff" />
              <circle cx="33" cy="12" r="5" fill="#63e8ff" />
              <rect x="20" y="26" width="60" height="46" rx="22" fill="#efe5ff" />
              <circle cx="18" cy="49" r="6" fill="#cdb8fb" />
              <circle cx="82" cy="49" r="6" fill="#cdb8fb" />
              <rect x="32" y="40" width="36" height="18" rx="9" fill="#0a001a" />
              <rect x="39" y="46" width="22" height="6" rx="3" fill="#63e8ff" />
            </svg>
          </div>
          <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#0a001a] ring-2 ring-[#efe5ff] dark:ring-[#0a001a]">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>
      </button>

      {/* Panneau de chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="dan-widget"
            ref={panelWrapperRef}
            className="fixed bottom-24 right-4 md:right-6 z-50 flex w-[92vw] max-w-[380px] flex-col items-center"
            style={{ transformOrigin: "bottom right" }}
            initial={{ opacity: 0, scale: 0.55, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 70 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            {/* Panneau de chat */}
            <div ref={panelRef} className="flex h-[65vh] max-h-[560px] w-full flex-col overflow-hidden rounded-2xl border border-[#a877fd]/30 bg-[#efe5ff] dark:bg-[#0a001a] shadow-2xl shadow-[#a877fd]/30 font2">
              {/* Header */}
              <div className="flex items-center gap-3 bg-gradient-to-r from-[#330288] to-[#a877fd] p-4 pt-7">
                <div className="flex-1">
                  <p className="font3 text-sm font-semibold text-white">Dan 🤖</p>
                  <p className="flex items-center gap-1 text-xs text-white/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Assistant de Zack
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Fermer"
                  className="rounded-full p-1.5 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 space-y-3 overflow-y-auto p-4 no-visible-scrollbar">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`dan-msg flex ${m.from === "dan" ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                        m.from === "dan"
                          ? "bg-white dark:bg-[#1c0a3d] text-[#0a001a] dark:text-[#efe5ff] rounded-bl-sm"
                          : "bg-gradient-to-r from-[#a877fd] to-[#ff6fd8] text-white rounded-br-sm"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="dan-msg flex justify-start">
                    <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-white dark:bg-[#1c0a3d] px-4 py-3 shadow-sm">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="h-1.5 w-1.5 rounded-full bg-[#a877fd] animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions rapides */}
              {messages.length <= 2 && (
                <div className="flex flex-wrap gap-2 px-4 pb-2">
                  {DAN_SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-[#a877fd]/40 px-3 py-1 text-xs text-[#330288] dark:text-[#efe5ff] hover:bg-[#a877fd]/10 transition-colors font3"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="flex items-center gap-2 border-t border-[#a877fd]/20 p-3"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Écris ta question à Dan…"
                  className="flex-1 rounded-full bg-white dark:bg-[#1c0a3d] px-4 py-2 text-sm text-[#0a001a] dark:text-[#efe5ff] outline-none placeholder:text-neutral-400 font2"
                />
                <button
                  type="submit"
                  aria-label="Envoyer"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#a877fd] to-[#ff6fd8] text-white shadow-md hover:scale-105 transition-transform"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};