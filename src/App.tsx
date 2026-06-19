import Navigation from './components/Navigation'
import HexNav from './components/HexNav'
import PointerGlow from './components/PointerGlow'
import Hero from './components/Hero'
import SixFacets from './components/SixFacets'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Skills from './components/Skills'
import About from './components/About'
import Contact from './components/Contact'

export default function App() {
  return (
    <div className="bg-bg min-h-screen">
      <PointerGlow />
      <Navigation />
      <HexNav />
      <Hero />
      <SixFacets />
      <Projects />
      <Experience />
      <Skills />
      <About />
      <Contact />
      <footer className="border-t border-white/5 py-8 text-center text-muted text-sm">
        <p>Designed & built by Harsh Vyas</p>
      </footer>
    </div>
  )
}
