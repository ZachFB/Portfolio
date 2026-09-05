# Dev Zack — Portfolio

Personal portfolio of **Zacharie Sebo (Zack / DevZack)**, a front-end developer based in Cotonou, Benin — [devzack.netlify.app](https://devzack.netlify.app).

Built with React + Vite and animated throughout (GSAP, Framer Motion), featuring **Dan**, an in-site conversational assistant connected to the Gemini API.

## ✨ Features

- **Animated design**: scroll-driven transitions powered by GSAP (ScrollTrigger), text reveals, parallax background auras, floating tech icons.
- **Dan, the portfolio assistant**: an animated robot mascot (walking, blinking, sleep/wake states) paired with a real chatbot — connected to the **Gemini API** through a Netlify serverless function, able to answer questions about Zack as well as general questions on any topic.
- **Skills section** with scroll-triggered animated percentage counters.
- **Projects section** showcasing: zagy'serv, HardSoft, Freelancers229, setamf-engineering, ChampChain.
- **Contact form**, light/dark theme, mobile-first responsive layout.

## 🧱 Tech stack

| Area | Tech |
|---|---|
| Framework | React 18 + Vite 6 + TypeScript |
| Styling | Tailwind CSS, Radix UI, `tailwindcss-animate` |
| Animation | GSAP (+ ScrollTrigger), Framer Motion |
| 3D | Three.js, `@react-three/fiber`, `cobe` (globe) |
| Forms | React Hook Form, SweetAlert2 |
| AI | Gemini API (Google), via a Netlify serverless function |
| Hosting | Netlify (static site + Netlify Functions) |

## 📂 Project structure

```
src/
├── components/
│   ├── features/     # Site sections (Hero, Competences, Projets, DanChatBot, DanCharacter, ...)
│   └── ui/            # Reusable UI components (Radix, cards, etc.)
├── lib/                # GSAP config, utilities, Dan's knowledge base
└── assets/             # Images and logos

netlify/
└── functions/
    └── dan-chat.js     # Serverless function: secure proxy to the Gemini API
```

## 🚀 Running locally

```bash
npm install
npm run dev
```

The site is available at `http://localhost:5173`.

Other useful commands:

```bash
npm run build     # production build (tsc + vite build)
npm run preview   # preview the production build locally
npm run lint      # lint the codebase with ESLint
```

## 🤖 Setting up Dan (Gemini API)

Dan's chat calls `/.netlify/functions/dan-chat`, which relays the request to the Gemini API server-side — the API key is **never exposed** to the browser.

1. Grab a free API key from [Google AI Studio](https://aistudio.google.com).
2. In the site's Netlify dashboard: **Site settings → Environment variables**, add a variable containing that key.
3. Redeploy the site (**Deploys → Trigger deploy**) so the variable takes effect.

This function isn't executed by `npm run dev` locally (it needs the Netlify runtime) — to test it locally, use the [Netlify CLI](https://docs.netlify.com/cli/get-started/) (`netlify dev`).

## 📦 Deployment

The site is deployed on Netlify, with an automatic build on every merge to `main`:

- `netlify.toml` defines the build command (`npm run build`), the published directory (`dist`), and the serverless functions directory (`netlify/functions`).
- The `main` branch is protected: changes go through a pull request before being merged and deployed.

## 📬 Contact

Available directly on the site's **Contact** section, or via the footer links (LinkedIn, GitHub, X, Instagram, Facebook).

---

© 2024–2026 Dev Zack. Built with 💜 by Zacharie Sebo.