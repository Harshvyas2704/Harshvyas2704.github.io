import { line } from './engine'
import { profile, contact, allProjects, findProject } from './data'
import type { Command, TerminalEntry } from './types'

/** Sections in the underlying portfolio that `open` can scroll to. */
const SECTIONS: Record<string, string> = {
  home: 'home',
  facets: 'facets',
  projects: 'projects',
  work: 'projects',
  personal: 'personal',
  experience: 'experience',
  skills: 'skills',
  about: 'about',
  contact: 'contact',
}

/** A clean, on-brand wordmark shown on boot and via `banner`. */
export const BANNER: string[] = [
  'H A R S H   V Y A S',
  '─'.repeat(19),
]

export const extraCommands: Command[] = [
  {
    name: 'open',
    group: 'WORK',
    description: 'Jump to a section on the site',
    handler: (args, ctx) => {
      const target = (args[0] || '').toLowerCase()
      if (!target) {
        return [
          line('Usage: open <section>', 'info'),
          line(`Sections: ${Object.keys(SECTIONS).filter((k, i, a) => a.indexOf(k) === i).join(', ')}`),
        ]
      }
      const id = SECTIONS[target]
      if (!id) return [line(`No such section: ${target}`, 'error')]
      ctx.navigate(id)
      return [line(`Opening ${target}...`, 'success')]
    },
  },
  {
    name: 'goto',
    group: 'WORK',
    description: 'Scroll to a project on the site',
    handler: (args, ctx) => {
      const query = args.join(' ').trim()
      if (!query) return [line('Usage: goto <project>', 'info')]
      const p = findProject(query)
      if (!p) return [line('Project not found. Try: projects', 'error')]
      const ok = ctx.navigate(`project-${p.id}`)
      return [line(ok ? `Scrolling to ${p.name}...` : `${p.name} is not on the page.`, ok ? 'success' : 'error')]
    },
  },
  {
    name: 'social',
    group: 'CONNECT',
    description: 'All social links',
    handler: () => {
      const out: TerminalEntry[] = [line('SOCIAL', 'info'), line('')]
      contact
        .filter(c => c.label !== 'Phone')
        .forEach(c => out.push({ id: `soc-${c.label}`, kind: 'link', content: `${c.label}: ${c.value}`, href: c.href }))
      return out
    },
  },
  {
    name: 'email',
    group: 'CONNECT',
    description: 'Compose an email',
    handler: (_args, ctx) => {
      ctx.openUrl(`mailto:${profile.email}`)
      return [line(`Opening mail to ${profile.email}...`, 'info')]
    },
  },
  {
    name: 'history',
    group: 'SYSTEM',
    description: 'Show command history',
    handler: (_args, ctx) => {
      if (ctx.history.length === 0) return [line('No history yet.', 'info')]
      return ctx.history.map((cmd, i) => line(`${String(i + 1).padStart(3, ' ')}  ${cmd}`))
    },
  },
  {
    name: 'echo',
    group: 'SYSTEM',
    description: 'Print a line of text',
    handler: (args) => [line(args.join(' '))],
  },
  {
    name: 'date',
    group: 'SYSTEM',
    description: 'Current date and time',
    handler: () => [line(new Date().toString())],
  },
  {
    name: 'uptime',
    group: 'SYSTEM',
    description: 'Years shipping code',
    handler: () => {
      const start = new Date('2023-06-01').getTime()
      const years = (Date.now() - start) / (1000 * 60 * 60 * 24 * 365)
      return [line(`up ${years.toFixed(1)} years · shipping since June 2023`)]
    },
  },
  {
    name: 'banner',
    group: 'SYSTEM',
    description: 'Show the banner',
    handler: () => [
      ...BANNER.map(l => line(l, 'info')),
      line(''),
      line(`${profile.name} — ${profile.role}`, 'success'),
      line(`${allProjects.length} projects · open to interesting problems`),
    ],
  },
]
