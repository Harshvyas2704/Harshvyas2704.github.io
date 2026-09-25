import { forwardRef } from 'react'
import type { EntryKind, TerminalEntry } from './types'

const KIND_CLASS: Record<EntryKind, string> = {
  command: 'text-cream',
  text: 'text-muted',
  success: 'text-electric-blue',
  info: 'text-royal-blue',
  error: 'text-[#ff6b6b]',
  link: 'text-electric-blue',
  node: 'text-muted',
}

interface TerminalOutputProps {
  entries: TerminalEntry[]
}

/** Renders the scrollback. `ref` is the scroll container for auto-scroll. */
const TerminalOutput = forwardRef<HTMLDivElement, TerminalOutputProps>(
  function TerminalOutput({ entries }, ref) {
    return (
      <div
        ref={ref}
        className="flex-1 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed"
        aria-live="polite"
      >
        {entries.map(entry => {
          if (entry.kind === 'node') {
            return (
              <div key={entry.id} className="whitespace-pre-wrap break-words">
                {entry.content}
              </div>
            )
          }

          if (entry.kind === 'link' && entry.href) {
            return (
              <div key={entry.id}>
                <a
                  href={entry.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-electric-blue underline underline-offset-2 hover:brightness-125"
                >
                  {entry.content}
                </a>
              </div>
            )
          }

          return (
            <div
              key={entry.id}
              className={`whitespace-pre-wrap break-words ${KIND_CLASS[entry.kind]}`}
            >
              {entry.content === '' ? ' ' : entry.content}
            </div>
          )
        })}
      </div>
    )
  },
)

export default TerminalOutput
