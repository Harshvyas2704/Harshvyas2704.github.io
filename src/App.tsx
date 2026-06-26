import Navigation from './components/Navigation'
import HexNav from './components/HexNav'
import PointerGlow from './components/PointerGlow'
import Hero from './components/Hero'
import SixFacets from './components/SixFacets'
import Projects from './components/Projects'
import PersonalProjects from './components/PersonalProjects'
import Experience from './components/Experience'
import Skills from './components/Skills'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useState } from 'react'

export default function App() {
  const [mantraRevealed, setMantraRevealed] = useState(false)

  return (
    <div className="bg-bg min-h-screen">
      <PointerGlow />
      <Navigation />
      <HexNav onRevealMantra={() => setMantraRevealed(true)} />
      <Hero />
      <SixFacets />
      <Projects />
      <PersonalProjects />
      <Experience />
      <Skills />
      <About />
      <Contact />
      <Footer revealed={mantraRevealed} />
    </div>
  )
}
