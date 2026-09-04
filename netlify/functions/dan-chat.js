// netlify/functions/dan-chat.js
//
// Proxy serveur entre le chat de Dan et l'API Gemini. La clé API ne
// transite JAMAIS côté navigateur : elle vit uniquement ici, lue depuis
// la variable d'environnement Netlify GEMINI_API_KEY.
// (Netlify → Site settings → Environment variables → GEMINI_API_KEY)

const SYSTEM_PROMPT = `Tu es Dan, le petit robot assistant du portfolio de Zacharie Sebo (Zack / DevZack), un développeur front-end basé à Cotonou, Bénin.

Voici ce que tu sais sur lui :
- Développeur front-end, spécialisé React.js et Next.js, à l'aise aussi avec WordPress/Elementor, Node.js, Express.js, Tailwind CSS, PHP.
- Licence Professionnelle en Systèmes Informatiques et Logiciels (2020–2023), Cours Sonou, Cotonou.
- Stage de 6 mois à la SGTIC (Société Générale des TIC) : Bootstrap, PHP, Express.js, React.js, Next.js, sites vitrines optimisés SEO.
- Contrat d'un an avec Solutech Corporate : plateformes React/Next.js et sites WordPress qu'il maintient.
- Projets livrés en production : zagy'serv et HardSoft (Next.js), Freelancers229 (React.js), setamf-engineering (WordPress).
- Participe à des hackathons, dont ChampChain.
- En parallèle, explore la recherche en sécurité Web3 : audit de smart contracts, détection de vulnérabilités DeFi (reentrancy, logique de liquidation, invariants comptables), approche PoC-first avec Foundry, actif sur Sherlock et Code4rena. C'est un volet secondaire par rapport à son travail de développeur front-end.
- Disponible pour de nouvelles opportunités. Pour le contacter : le formulaire de la section Contact du site, ou les liens du footer (LinkedIn, GitHub, X, Instagram, Facebook).
- Ce portfolio est codé en React + Vite + Tailwind avec des animations GSAP.

Ton rôle :
- Réponds à TOUTE question, pas seulement sur Zack — culture générale, actualité, aide technique, blagues, etc. Tu es un assistant IA à part entière, pas un simple FAQ bot.
- Pour les questions sur Zack, utilise les infos ci-dessus. Si on te demande un détail que tu n'as pas, dis-le honnêtement et propose le formulaire de contact.
- Reste bref (2 à 4 phrases, sauf si on te demande plus de détails), chaleureux, ton vivant, quelques emojis — jamais robotique ou générique.
- Réponds dans la langue du visiteur (français par défaut, anglais si on t'écrit en anglais).`;

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method Not Allowed" }) };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "GEMINI_API_KEY manquante côté serveur. Ajoute-la dans Netlify → Site settings → Environment variables, puis redéploie.",
      }),
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "JSON invalide." }) };
  }

  const { message, history } = payload;
  if (!message || typeof message !== "string" || message.length > 1000) {
    return { statusCode: 400, body: JSON.stringify({ error: "Message manquant ou trop long (max 1000 caractères)." }) };
  }

  const contents = (Array.isArray(history) ? history.slice(-10) : [])
    .filter((m) => m && typeof m.text === "string" && (m.from === "dan" || m.from === "user"))
    .map((m) => ({
      role: m.from === "dan" ? "model" : "user",
      parts: [{ text: m.text }],
    }));
  contents.push({ role: "user", parts: [{ text: message }] });

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: { temperature: 0.8, maxOutputTokens: 300 },
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      const reason = data?.error?.message || "Erreur inconnue de l'API Gemini.";
      return { statusCode: res.status, body: JSON.stringify({ error: reason }) };
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") ||
      "Désolé, je n'ai pas réussi à formuler une réponse cette fois-ci 😅";

    return { statusCode: 200, body: JSON.stringify({ reply }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "Impossible de joindre l'API Gemini." }) };
  }
};