interface TerminalHeaderProps {
  title: string
  maximized: boolean
  onClose: () => void
  onToggleMax: () => void
}

export default function TerminalHeader({ title, maximized, onClose, onToggleMax }: TerminalHeaderProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/10 bg-white/[0.02] select-none">
      {/* Traffic-light controls (real buttons for a11y) */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close terminal"
          className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-125 transition"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Minimize terminal"
          className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-125 transition"
        />
        <button
          type="button"
          onClick={onToggleMax}
          aria-label={maximized ? 'Restore terminal size' : 'Maximize terminal'}
          className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-125 transition"
        />
      </div>

      <span className="flex-1 text-center text-xs font-mono text-muted tracking-wide truncate">
        {title}
      </span>

      {/* Spacer to visually balance the traffic lights */}
      <span aria-hidden className="w-[52px]" />
    </div>
  )
}
