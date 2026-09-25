import type { Command, TerminalContext, TerminalEntry } from './types'

let entryCounter = 0

/** Stable, unique id for a rendered line. */
export function makeId(): string {
  entryCounter += 1
  return `t${entryCounter}`
}

/** Convenience builders so handlers stay terse. */
export function line(content: string, kind: TerminalEntry['kind'] = 'text'): TerminalEntry {
  return { id: makeId(), kind, content }
}

export function lines(text: string, kind: TerminalEntry['kind'] = 'text'): TerminalEntry[] {
  return text.split('\n').map(l => line(l, kind))
}

export interface ParsedInput {
  name: string
  args: string[]
  raw: string
}

/** Split raw input into a command name + arguments. Whitespace-tolerant. */
export function parseInput(raw: string): ParsedInput {
  const trimmed = raw.trim()
  const parts = trimmed.split(/\s+/).filter(Boolean)
  const name = (parts[0] || '').toLowerCase()
  return { name, args: parts.slice(1), raw: trimmed }
}

/** Look up a command by name or alias (case-insensitive). */
export function resolveCommand(name: string, registry: Command[]): Command | undefined {
  return registry.find(
    c => c.name === name || (c.aliases?.includes(name) ?? false),
  )
}

/**
 * Execute a parsed command against the registry. Never throws: handler
 * errors are caught and surfaced as an error line so the terminal survives.
 */
export function runCommand(
  raw: string,
  registry: Command[],
  ctx: TerminalContext,
): TerminalEntry[] {
  const { name, args } = parseInput(raw)
  if (!name) return []

  const command = resolveCommand(name, registry)
  if (!command) {
    return [
      line(`Command not found: ${name}`, 'error'),
      line('Type "help" to see available commands.', 'info'),
    ]
  }

  try {
    return command.handler(args, ctx) || []
  } catch (err) {
    if (import.meta.env.DEV) console.error('[terminal] command error:', err)
    return [
      line('An unexpected error occurred.', 'error'),
      line('Try: help', 'info'),
    ]
  }
}
