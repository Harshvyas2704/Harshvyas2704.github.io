import { forwardRef } from 'react'
import type { KeyboardEvent } from 'react'

interface TerminalInputProps {
  prompt: string
  value: string
  onChange: (v: string) => void
  onSubmit: () => void
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
}

/**
 * Real, accessible <input> styled as a terminal line. Uses the browser's
 * native (blinking) caret, tinted electric-blue, so the cursor stays in sync
 * with the actual text position and remains fully accessible.
 */
const TerminalInput = forwardRef<HTMLInputElement, TerminalInputProps>(
  function TerminalInput({ prompt, value, onChange, onSubmit, onKeyDown }, ref) {
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        onSubmit()
        return
      }
      onKeyDown?.(e)
    }

    return (
      <label className="flex items-center gap-2 px-4 py-2.5 border-t border-white/10 font-mono text-[13px]">
        <span className="text-royal-blue shrink-0 select-none">{prompt}</span>
        <span className="relative flex-1 min-w-0">
          <input
            ref={ref}
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Terminal command input"
            className="w-full bg-transparent border-none outline-none text-cream caret-electric-blue placeholder:text-muted/40"
          />
        </span>
      </label>
    )
  },
)

export default TerminalInput
