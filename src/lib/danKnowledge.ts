/**
 * Base de connaissance de Dan, l'assistant du portfolio.
 * Alimentée avec le vrai profil de Zack (DevZack).
 */
export interface DanEntry {
  id: string;
  keywords: string[];
  answer: string;
}

export const DAN_KNOWLEDGE: DanEntry[] = [
  // --- Salutations / politesse : réponses courtes et rapides, en priorité ---
  {
    id: "greeting",
    keywords: ["bonjour", "salut", "hello", "coucou", "hey", "yo", "bonsoir"],
    answer: "Salut 👋 Ravi de te voir ici ! Je suis Dan, l'assistant de Zack. Tu veux en savoir plus sur ses compétences, ses projets, ou comment le joindre ?",
  },
  {
    id: "thanks",
    keywords: ["merci", "cool merci", "top merci", "sympa merci", "thanks", "thx"],
    answer: "Avec plaisir 😊 N'hésite pas si tu as d'autres questions sur le profil de Zack !",
  },
  {
    id: "how-are-you",
    keywords: ["ca va", "ça va", "comment vas", "comment tu vas"],
    answer: "Ça roule pour moi 🤖✨ Et toi, qu'est-ce qui t'amène sur le portfolio de Zack aujourd'hui ?",
  },
  {
    id: "bye",
    keywords: ["au revoir", "bye", "a bientot", "à bientôt", "ciao"],
    answer: "À bientôt 👋 N'oublie pas de laisser un message dans la section Contact si tu veux échanger avec Zack directement !",
  },

  // --- Identité / présentation ---
  {
    id: "intro",
    keywords: ["qui es tu", "qui est zack", "presente", "présente", "toi", "profil"],
    answer:
      "Je suis Dan 🤖, l'assistant de DevZack. C'est un développeur front-end, spécialisé React.js et Next.js, diplômé d'une Licence Professionnelle en Systèmes Informatiques et Logiciels. Il conçoit des interfaces soignées et performantes, avec une vraie sensibilité pour le SEO et le détail. Curieux de ses compétences, ses projets, ou son parcours ?",
  },

  // --- Compétences ---
  {
    id: "skills",
    keywords: ["competence", "compétence", "stack", "technologie", "techno", "langage", "maitrise", "maîtrise", "outils"],
    answer:
      "Ses compétences principales : ⚛️ React JS (90%), ▲ Next JS, 📝 WordPress/Elementor (90%) et TanStack Query. Côté outils : Node.js, Express.js, Tailwind CSS, PHP, JavaScript — et il utilise aussi l'IA (Claude, Gemini, DeepSeek) dans son flux de travail. Tout le détail est visible dans la section « Mes compétences » un peu plus haut 🧠",
  },
  {
    id: "wordpress",
    keywords: ["wordpress", "elementor", "seo", "referencement", "référencement"],
    answer:
      "Zack conçoit des sites WordPress professionnels avec Elementor, en optimisant le SEO et la performance — et côté React/Next.js, il utilise le rendu serveur de Next.js pour un bon référencement également.",
  },

  // --- Projets (dev web) ---
  {
    id: "projects",
    keywords: ["projet", "portfolio", "realisation", "réalisation", "site", "travaux"],
    answer:
      "Côté développement, il a livré zagy'serv et HardSoft (Next.js), Freelancers229 (React.js) et setamf-engineering (WordPress) — tous en production. Il a aussi participé à des hackathons, dont ChampChain. Tu trouveras les liens cliquables dans la section « Mes projets » 📁",
  },
  {
    id: "hackathons",
    keywords: ["hackathon", "hackaton", "champchain", "concours", "compétition"],
    answer:
      "Oui, Zack participe régulièrement à des hackathons pour se challenger sur des projets courts et intenses — notamment ChampChain. C'est aussi l'occasion pour lui de prototyper vite et de travailler en équipe sous pression. Les détails sont dans la section « Mes projets » 📁",
  },

  // --- Expérience professionnelle ---
  {
    id: "experience",
    keywords: ["stage", "experience", "expérience", "sgtic", "solutech", "entreprise", "travaille", "poste"],
    answer:
      "Zack a fait un stage de 6 mois à la SGTIC (Société Générale des TIC), où il a travaillé avec Bootstrap, PHP, Express.js, React.js et Next.js, et créé des sites vitrines optimisés SEO. Il a ensuite eu un contrat d'un an avec Solutech Corporate, où il conçoit des plateformes React/Next.js performantes ainsi que des sites WordPress qu'il maintient.",
  },
  {
    id: "formation",
    keywords: ["formation", "etude", "étude", "diplome", "diplôme", "ecole", "école", "licence"],
    answer:
      "Il a une Licence Professionnelle en Systèmes Informatiques et Logiciels (2020–2023), obtenue à Cours Sonou (Cotonou, Bénin).",
  },

  // --- Contact ---
  {
    id: "contact",
    keywords: ["contact", "email", "mail", "joindre", "recruter", "embaucher", "disponib", "linkedin", "reseau", "réseau", "telephone", "téléphone"],
    answer:
      "Le plus simple : le formulaire dans la section Contact 📬 tout en bas de la page, ou les icônes du footer (LinkedIn, GitHub, X, Instagram, Facebook). Il est actuellement disponible pour de nouvelles opportunités ✨",
  },

  // --- Site / techno du portfolio ---
  {
    id: "who-built",
    keywords: ["cree", "créé", "code", "developpe", "développé", "gsap", "anime", "animation", "technique du site"],
    answer:
      "Ce portfolio est codé en React + Vite + Tailwind, avec des animations GSAP pour les effets au scroll et pour moi, Dan, le petit robot qui bouge 🤖 Zack l'a entièrement conçu et développé lui-même.",
  },

  // --- Sécurité / smart contracts : uniquement si la curiosité va plus loin ---
  {
    id: "security-intro",
    keywords: ["securite", "sécurité", "smart contract", "audit", "blockchain", "web3", "solidity", "defi", "reentrancy", "vulnerabilite", "vulnérabilité"],
    answer:
      "Ah, tu es curieux ! En parallèle du développement, Zack explore aussi la recherche en sécurité Web3 : audit de smart contracts, détection de vulnérabilités DeFi (reentrancy, logique de liquidation, invariants comptables) avec Foundry. Ce n'est pas son activité principale ici, mais s'il t'intéresse d'en savoir plus sur ses audits ou son approche PoC-first, demande-moi !",
  },
  {
    id: "security-detail",
    keywords: ["poc", "foundry", "liquidation", "invariant", "bad debt", "transient storage", "eip-1153", "exploit"],
    answer:
      "Sur ce terrain, Zack suit une approche PoC-first : chaque faille identifiée est démontrée avec un exploit Foundry fonctionnel, jamais juste théorique. Ses recherches couvrent notamment la logique de liquidation, les invariants comptables et les patterns de reentrancy sur des protocoles DeFi EVM. Ce volet reste secondaire par rapport à son travail de développeur front-end, mais il est actif sur des plateformes comme Sherlock et Code4rena.",
  },
];

export const DAN_FALLBACK =
  "Bonne question 🤔 Je n'ai pas encore l'info exacte à ce sujet. Le plus simple, c'est d'écrire directement à Zack via la section Contact 📬 !";

export const DAN_SUGGESTIONS = [
  "Quelles sont tes compétences ? 🧠",
  "Montre-moi tes projets 📁",
  "Comment te contacter ? 📬",
];

export function findDanAnswer(userMessage: string): string {
  const normalized = userMessage
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  let best: { entry: DanEntry; score: number } | null = null;

  for (const entry of DAN_KNOWLEDGE) {
    let score = 0;
    for (const kw of entry.keywords) {
      const normKw = kw.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (normalized.includes(normKw)) score += 1;
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { entry, score };
    }
  }

  return best ? best.entry.answer : DAN_FALLBACK;
}