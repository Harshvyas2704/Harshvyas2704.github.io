import { useEffect, useRef, useState } from 'react'

type Anchor = 'top' | 'bottom' | 'left' | 'right'

// Six vertices of a pointy-top hexagon, expressed as ratios of the square box.
// Each vertex doubles as a navigation point, tying the six-fold geometry to the
// six primary sections of the site.
const navPoints: { id: string; label: string; x: number; y: number; anchor: Anchor }[] = [
  { id: 'home', label: 'Home', x: 0.5, y: 0.04, anchor: 'top' },
  { id: 'projects', label: 'Work', x: 0.898, y: 0.27, anchor: 'right' },
  { id: 'experience', label: 'Experience', x: 0.898, y: 0.73, anchor: 'right' },
  { id: 'skills', label: 'Skills', x: 0.5, y: 0.96, anchor: 'bottom' },
  { id: 'about', label: 'About', x: 0.102, y: 0.73, anchor: 'left' },
  { id: 'contact', label: 'Contact', x: 0.102, y: 0.27, anchor: 'left' },
]

const labelPlacement: Record<Anchor, React.CSSProperties> = {
  top: { bottom: '150%', left: '50%', transform: 'translateX(-50%)' },
  bottom: { top: '150%', left: '50%', transform: 'translateX(-50%)' },
  right: { left: '160%', top: '50%', transform: 'translateY(-50%)' },
  left: { right: '160%', top: '50%', transform: 'translateY(-50%)' },
}

const outerPoints = [
  [250, 20],
  [449, 135],
  [449, 365],
  [250, 480],
  [51, 365],
  [51, 135],
] as const

export default function HexNav() {
  const [docked, setDocked] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [activeId, setActiveId] = useState('home')
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const reduceMotion = useRef(false)
  const rafRef = useRef(0)
  const coords = useRef({ x: 0, y: 0 })

  // Dock to the corner once the hero has scrolled away.
  useEffect(() => {
    reduceMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const onScroll = () => setDocked(window.scrollY > window.innerHeight * 0.55)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Cursor parallax while floating in the hero, throttled to one update per frame.
  useEffect(() => {
    if (docked || reduceMotion.current) {
      setTilt({ x: 0, y: 0 })
      return
    }
    const flush = () => {
      rafRef.current = 0
      setTilt({ x: coords.current.x, y: coords.current.y })
    }
    const onMove = (e: MouseEvent) => {
      coords.current = {
        x: (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2),
        y: (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2),
      }
      if (!rafRef.current) rafRef.current = requestAnimationFrame(flush)
    }
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [docked])

  // Track which section is in view so the matching vertex can light up.
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveId(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    navPoints.forEach(p => {
      const el = document.getElementById(p.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const containerStyle: React.CSSProperties = docked
    ? { top: 'calc(100% - 164px)', right: '28px', width: 132, height: 132 }
    : { top: 'calc(50% - 220px)', right: '7%', width: 440, height: 440 }

  const innerTransform = docked
    ? `scale(${hovered ? 1.07 : 1})`
    : `perspective(900px) rotateY(${tilt.x * 12}deg) rotateX(${-tilt.y * 12}deg) translate3d(${tilt.x * 26}px, ${tilt.y * 26}px, 0)`

  return (
    <div
      className="fixed z-40 hidden lg:block"
      style={{
        ...containerStyle,
        pointerEvents: docked ? 'auto' : 'none',
        cursor: docked ? 'pointer' : 'default',
        transition:
          'top 0.8s cubic-bezier(0.16,1,0.3,1), right 0.8s cubic-bezier(0.16,1,0.3,1), width 0.8s cubic-bezier(0.16,1,0.3,1), height 0.8s cubic-bezier(0.16,1,0.3,1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative w-full h-full"
        style={{ transform: innerTransform, transition: 'transform 0.3s ease-out' }}
      >
        {/* Hexagon rings */}
        <svg viewBox="0 0 500 500" fill="none" className="absolute inset-0 w-full h-full">
          {outerPoints.map(([x, y], i) => (
            <line key={i} x1="250" y1="250" x2={x} y2={y} stroke="#4169E1" strokeWidth="0.6" opacity="0.14" />
          ))}
          <polygon points="250,20 449,135 449,365 250,480 51,365 51,135" stroke="#4169E1" strokeWidth="1.5" opacity={docked ? 0.6 : 0.4} />
          <polygon points="250,65 410,157 410,343 250,435 90,343 90,157" stroke="#4169E1" strokeWidth="1" opacity="0.22" />
          <polygon points="250,110 371,180 371,320 250,390 129,320 129,180" stroke="#4DA6FF" strokeWidth="0.8" opacity="0.13" />
          <polygon points="250,155 332,203 332,297 250,345 168,297 168,203" stroke="#4DA6FF" strokeWidth="0.5" opacity="0.08" />
          <circle cx="250" cy="250" r="4" fill="#4169E1" opacity="0.5" />
        </svg>

        {/* Navigation points at each vertex */}
        {navPoints.map(p => {
          const active = p.id === activeId
          const showLabel = docked && (hovered || active)
          return (
            <a
              key={p.id}
              href={`#${p.id}`}
              className="absolute group/nav"
              style={{
                left: `${p.x * 100}%`,
                top: `${p.y * 100}%`,
                transform: 'translate(-50%, -50%)',
                pointerEvents: docked ? 'auto' : 'none',
                opacity: docked ? 1 : 0,
                transition: 'opacity 0.5s ease 0.2s',
              }}
              tabIndex={docked ? 0 : -1}
              aria-hidden={!docked}
              aria-current={active ? 'true' : undefined}
              aria-label={p.label}
            >
              <span
                className="block rounded-full transition-all duration-200"
                style={{
                  width: hovered ? 9 : active ? 8 : 6,
                  height: hovered ? 9 : active ? 8 : 6,
                  background: active ? '#F4F7FF' : '#4DA6FF',
                  boxShadow: active
                    ? '0 0 12px rgba(244,247,255,0.9)'
                    : hovered
                      ? '0 0 10px rgba(77,166,255,0.9)'
                      : '0 0 4px rgba(65,105,225,0.6)',
                }}
              />
              <span
                className="absolute whitespace-nowrap text-[10px] font-bold uppercase tracking-widest transition-colors duration-200"
                style={{
                  ...labelPlacement[p.anchor],
                  color: active ? '#4DA6FF' : '#A0AEC0',
                  opacity: showLabel ? 1 : 0,
                  transition: 'opacity 0.25s ease, color 0.2s ease',
                }}
              >
                {p.label}
              </span>
            </a>
          )
        })}
      </div>
    </div>
  )
}
