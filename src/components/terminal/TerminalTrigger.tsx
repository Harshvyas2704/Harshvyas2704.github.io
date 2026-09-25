interface TerminalTriggerProps {
  onOpen: () => void
}

/**
 * Discreet floating launcher. Primary interaction on mobile (no Ctrl+`),
 * and a subtle discovery hint on desktop.
 */
export default function TerminalTrigger({ onOpen }: TerminalTriggerProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Open developer terminal"
      className="fixed bottom-5 right-5 z-[55] flex items-center gap-2 px-3.5 py-2.5
                 font-mono text-xs text-muted bg-surface/90 backdrop-blur
                 border border-white/10 hover:border-royal-blue/50 hover:text-cream
                 shadow-lg shadow-black/40 transition-colors duration-200"
      style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
    >
      <span className="text-royal-blue">{'>_'}</span>
      <span className="hidden sm:inline">Ctrl + `</span>
      <span className="sm:hidden">Terminal</span>
    </button>
  )
}
