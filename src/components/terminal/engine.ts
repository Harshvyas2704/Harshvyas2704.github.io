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

/** Levenshtein edit distance (small strings only). */
function editDistance(a: string, b: string): number {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...new Array(b.length).fill(0)])
  for (let j = 0; j <= b.length; j++) dp[0][j] = j
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost)
    }
  }
  return dp[a.length][b.length]
}

/** Nearest visible command name to an unknown input, if close enough. */
export function suggestCommand(name: string, registry: Command[]): string | undefined {
  let best: string | undefined
  let bestDist = Infinity
  for (const c of registry) {
    if (c.hidden) continue
    const d = editDistance(name, c.name)
    if (d < bestDist) {
      bestDist = d
      best = c.name
    }
  }
  // Only suggest when it's a plausible typo (<= 2 edits, or a clear prefix).
  return best && bestDist <= 2 ? best : undefined
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
    const suggestion = suggestCommand(name, registry)
    const out = [line(`Command not found: ${name}`, 'error')]
    if (suggestion) out.push(line(`Did you mean "${suggestion}"?`, 'info'))
    out.push(line('Type "help" to see available commands.', 'info'))
    return out
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
