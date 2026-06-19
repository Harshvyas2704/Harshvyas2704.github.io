import { useEffect, useRef } from 'react'

// A soft circular glow that trails the cursor. Updated via requestAnimationFrame
// and direct style writes so it never triggers React re-renders.
export default function PointerGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reduceMotion) return

    let raf = 0
    let x = 0
    let y = 0

    const apply = () => {
      raf = 0
      const el = ref.current
      if (el) {
        el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
        el.style.opacity = '1'
      }
    }

    const onMove = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
      if (!raf) raf = requestAnimationFrame(apply)
    }

    document.addEventListener('mousemove', onMove)
    return () => {
      document.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-30 hidden lg:block"
      style={{
        width: 460,
        height: 460,
        borderRadius: '9999px',
        background:
          'radial-gradient(circle, rgba(65,105,225,0.15) 0%, rgba(77,166,255,0.06) 38%, transparent 70%)',
        filter: 'blur(6px)',
        mixBlendMode: 'screen',
        transform: 'translate3d(-9999px, -9999px, 0)',
        opacity: 0,
        transition: 'opacity 0.5s ease',
        willChange: 'transform',
      }}
    />
  )
}
