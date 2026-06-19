import { useEffect, useState } from 'react'

const focusAreas = ['Mobile Engineering', 'Backend Systems', 'AI Integration', 'Product Thinking']

function HexGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.08 }}>
        <defs>
          <pattern id="hex-bg" x="0" y="0" width="70" height="60.6" patternUnits="userSpaceOnUse">
            <polygon points="35,3 67,20 67,54 35,71 3,54 3,20" fill="none" stroke="#4169E1" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex-bg)" />
      </svg>
    </div>
  )
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <HexGrid />

      {/* Ambient glow centred on hex position */}
      <div
        className="absolute top-1/2 right-[25%] -translate-y-1/2 w-[520px] h-[520px] pointer-events-none animate-glow-pulse"
        style={{ background: 'radial-gradient(circle, rgba(65,105,225,0.14) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none animate-glow-pulse-slow"
        style={{ background: 'radial-gradient(circle, rgba(77,166,255,0.06) 0%, transparent 70%)', transform: 'translate(-20%, 20%)' }}
      />

      {/* The featured hexagon (HexNav) is rendered globally so it can dock to
          the corner on scroll. It floats centred over the hero at the top. */}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 items-center min-h-screen">
        <div className="pt-28 pb-16">
          {/* Focus chips */}
          <div
            className={`flex flex-wrap gap-2 mb-8 transition-all duration-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {focusAreas.map(area => (
              <span key={area} className="text-xs text-electric-blue border border-electric-blue/25 px-3 py-1 tracking-widest uppercase">
                {area}
              </span>
            ))}
          </div>

          {/* Name - the largest, highlighted element */}
          <h1
            className={`font-extrabold leading-none mb-6 transition-all duration-700 delay-100 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <span className="block text-[68px] sm:text-[88px] md:text-[104px] text-electric-blue tracking-tight">
              Harsh
            </span>
            <span className="block text-[68px] sm:text-[88px] md:text-[104px] text-electric-blue tracking-tight">
              Vyas
            </span>
          </h1>

          {/* Tagline */}
          <p
            className={`text-cream text-xl md:text-2xl font-semibold mb-4 leading-snug max-w-lg transition-all duration-700 delay-200 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Engineering complex systems into software.
          </p>

          {/* Description */}
          <p
            className={`text-muted text-base max-w-sm mb-10 leading-relaxed transition-all duration-700 delay-300 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Software engineer building production mobile and backend products.
            Two years, three shipped apps, 15k+ users.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-wrap gap-4 mb-16 transition-all duration-700 delay-400 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <a
              href="#projects"
              className="px-7 py-3 bg-royal-blue text-white font-semibold text-sm tracking-wide hover:bg-electric-blue transition-colors duration-200"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="px-7 py-3 border border-white/20 text-cream font-semibold text-sm tracking-wide hover:border-royal-blue hover:text-royal-blue transition-all duration-200"
            >
              Get in Touch
            </a>
          </div>

          {/* Scroll indicator */}
          <div
            className={`flex flex-col items-start gap-3 transition-all duration-700 delay-500 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="w-px h-12 bg-gradient-to-b from-royal-blue to-transparent" />
            <span className="text-muted text-xs tracking-widest uppercase">Scroll</span>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #050816)' }}
      />
    </section>
  )
}
