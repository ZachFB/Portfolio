import { Competences } from "./components/features/Competences"
import { CanvasRevealEffectDemo2 } from "./components/features/ConduiteCards"
import { Contact } from "./components/features/Contact"
import Footer from "./components/features/Footer"
import { Hero } from "./components/features/Hero"
import { HeroDetail } from "./components/features/HeroDetail"
import { Navbar } from "./components/features/Navbar"
import { Projets } from "./components/features/Projets"
import { ThemeProvider } from "./components/features/ThemeProvider"
import { BackgroundAura } from "./components/features/BackgroundAura"
import { DanChatBot } from "./components/features/DanChatBot"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="relative dark:bg-[#0a001a] bg-[#efe5ff] h-full overflow-x-hidden">
      <BackgroundAura />
      <Navbar className="dark:bg-[#0a001a]/80 bg-[#efe5ff]/80 backdrop-blur-md z-20"/>
      <div className="relative z-10">
        <Hero/>
        <HeroDetail/>
        <Competences/>
        <Projets/>
        <CanvasRevealEffectDemo2/>
        <Contact/>
        <Footer/>
      </div>
      <DanChatBot />
      </div>
    </ThemeProvider>
  )
}

export default App
