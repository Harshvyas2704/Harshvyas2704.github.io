import { useEffect, useRef } from 'react'

interface MatrixEffectProps {
  onStop: () => void
}

const stopKeys = new Set(['Escape', 'Enter', ' ', 'q'])

const CHARS = 'アカサタナハマヤラワ0123456789<>[]{}/\\=+*'
const AUTO_STOP_MS = 6500

/**
 * A subtle, cancellable "code rain" rendered in the portfolio's blue palette
 * (never green). Overlays the terminal window only, stops on click/keypress
 * or after a few seconds, and is skipped entirely under reduced-motion.
 */
export default function MatrixEffect({ onStop }: MatrixEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      onStop()
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement!
    const ctx = canvas.getContext('2d')!

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = parent.clientWidth
    const h = parent.clientHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    ctx.scale(dpr, dpr)

    const fontSize = 14
    const columns = Math.floor(w / fontSize)
    const drops = new Array(columns).fill(0).map(() => Math.random() * -20)

    let raf = 0
    const draw = () => {
      ctx.fillStyle = 'rgba(5, 8, 22, 0.18)'
      ctx.fillRect(0, 0, w, h)
      ctx.font = `${fontSize}px ui-monospace, monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize
        // Leading glyph brighter (electric blue), trail in royal blue.
        ctx.fillStyle = Math.random() > 0.94 ? '#4DA6FF' : '#4169E1'
        ctx.fillText(char, x, y)
        if (y > h && Math.random() > 0.975) drops[i] = 0
        drops[i] += 0.5
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    const stopTimer = window.setTimeout(onStop, AUTO_STOP_MS)

    const onKey = (e: KeyboardEvent) => {
      if (stopKeys.has(e.key)) {
        e.preventDefault()
        onStop()
      }
    }
    window.addEventListener('keydown', onKey)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(stopTimer)
      window.removeEventListener('keydown', onKey)
    }
  }, [onStop])

  return (
    <button
      type="button"
      onClick={onStop}
      autoFocus
      aria-label="Exit matrix effect"
      className="absolute inset-0 z-10 cursor-pointer bg-transparent border-0 p-0"
    >
      <canvas ref={canvasRef} className="block w-full h-full opacity-80" />
    </button>
  )
}
