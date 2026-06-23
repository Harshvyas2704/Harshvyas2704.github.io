import { useState, useEffect } from 'react'

const navLinks = [
  { href: '#projects', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = () => setMenuOpen(false)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-bg/90 backdrop-blur-md border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#home"
          className="text-cream font-bold text-lg tracking-tight flex items-center gap-2"
        >
          <span className="w-7 h-7 border border-royal-blue flex items-center justify-center text-royal-blue text-xs font-bold"
            style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
            HV
          </span>
          <span className="hidden sm:block">Harsh Vyas</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted hover:text-cream text-sm font-medium transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/Harsh_Vyas_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-1.5 border border-royal-blue/70 text-royal-blue text-sm font-medium hover:bg-royal-blue hover:text-white transition-all duration-200"
          >
            Resume ↗
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-cream p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-px bg-cream transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
            <span className={`block h-px bg-cream transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-px bg-cream transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-80 border-t border-white/5' : 'max-h-0'
        }`}
      >
        <div className="bg-surface/95 backdrop-blur-md px-6 py-4 flex flex-col gap-1">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="py-3 text-muted hover:text-cream text-base transition-colors border-b border-white/5 last:border-0"
              onClick={handleNavClick}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/Harsh_Vyas_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="mt-2 py-2 text-center border border-royal-blue/70 text-royal-blue text-sm font-medium"
            onClick={handleNavClick}
          >
            Resume ↗
          </a>
        </div>
      </div>
    </nav>
  )
}
