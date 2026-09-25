import { line } from './engine'
import { portfolioCommands } from './portfolioCommands'
import { extraCommands } from './extraCommands'
import { easterEggs } from './easterEggs'
import { filesystemCommands } from './filesystem'
import type { Command, CommandGroup, TerminalContext, TerminalEntry } from './types'

const GROUP_ORDER: CommandGroup[] = ['ABOUT', 'TECH', 'WORK', 'CONNECT', 'SYSTEM']

/** Build the grouped `help` output from the registry itself. */
function buildHelp(registry: Command[]): TerminalEntry[] {
  const out: TerminalEntry[] = [line('COMMANDS', 'info'), line('')]

  for (const group of GROUP_ORDER) {
    const inGroup = registry.filter(c => c.group === group && !c.hidden)
    if (inGroup.length === 0) continue
    out.push(line(group, 'success'))
    for (const c of inGroup) {
      out.push(line(`  ${c.name.padEnd(12)}${c.description}`))
    }
    out.push(line(''))
  }

  out.push(line('There may be commands that aren’t listed here.', 'info'))
  return out
}

/**
 * Core command registry. Portfolio commands (whoami, projects, ...) and
 * easter eggs are appended in later phases.
 */
const systemCommands: Command[] = [
  {
    name: 'help',
    group: 'SYSTEM',
    description: 'Show available commands',
    aliases: ['h', '?'],
    handler: (_args, ctx) => buildHelp(ctx.registry),
  },
  {
    name: 'clear',
    group: 'SYSTEM',
    description: 'Clear the terminal',
    aliases: ['cls'],
    handler: (_args, ctx: TerminalContext) => {
      ctx.clear()
    },
  },
  {
    name: 'exit',
    group: 'SYSTEM',
    description: 'Close the terminal',
    aliases: ['quit'],
    handler: (_args, ctx: TerminalContext) => {
      ctx.close()
    },
  },
]

/**
 * Full registry. Portfolio commands precede system commands so `help`
 * lists them in a natural reading order (ABOUT → TECH → WORK → CONNECT → SYSTEM).
 */
export const commands: Command[] = [
  ...portfolioCommands,
  ...extraCommands,
  ...systemCommands,
  ...filesystemCommands,
  ...easterEggs,
]
