import { line, makeId } from './engine'
import {
  profile,
  contact,
  skills,
  stack,
  experience,
  allProjects,
  findProject,
} from './data'
import type { Command, TerminalEntry } from './types'

/** Render a { category: items[] } map as an indented tree. */
function tree(groups: Record<string, string[]>): TerminalEntry[] {
  const out: TerminalEntry[] = []
  const keys = Object.keys(groups)
  keys.forEach((key, ki) => {
    if (ki > 0) out.push(line(''))
    out.push(line(key, 'success'))
    const items = groups[key]
    items.forEach((item, i) => {
      const branch = i === items.length - 1 ? '└──' : '├──'
      out.push(line(` ${branch} ${item}`))
    })
  })
  return out
}

export const portfolioCommands: Command[] = [
  {
    name: 'whoami',
    group: 'ABOUT',
    description: 'Who I am',
    aliases: ['me'],
    handler: () => [
      line(profile.name, 'success'),
      line(''),
      line(profile.role),
      line(''),
      line(profile.tagline, 'info'),
      line(''),
      line('I like understanding how things work,'),
      line('not just how to use them.'),
    ],
  },
  {
    name: 'about',
    group: 'ABOUT',
    description: 'About me',
    handler: () => [
      line('ABOUT', 'info'),
      line(''),
      line('Started as an Electrical Engineer — systems thinking was the'),
      line('foundation, not the accident. After a B.E. from B.H. Gardi'),
      line('College, I made a deliberate pivot: a 30-week full-stack'),
      line('bootcamp at Masai School to retrain entirely in software.'),
      line(''),
      line('Two years of building production-grade mobile apps — React'),
      line('Native, Kotlin, real users, real constraints. Shipped a'),
      line('community platform for 15,000 people, a job-matching engine'),
      line('that halved time-to-hire, and a 100k+ product e-commerce app.'),
      line(''),
      line('I work at the intersection of system design and user'),
      line('experience. I take ownership of problems, not just tickets.'),
    ],
  },
  {
    name: 'experience',
    group: 'ABOUT',
    description: 'Professional experience',
    aliases: ['exp'],
    handler: () => {
      const out: TerminalEntry[] = [line('EXPERIENCE', 'info'), line('')]
      experience.forEach((job, i) => {
        if (i > 0) out.push(line(''))
        out.push(line(job.company, 'success'))
        out.push(line(`${job.role} · ${job.period}`))
        out.push(line(''))
        job.highlights.forEach((h, hi) => {
          const branch = hi === job.highlights.length - 1 ? '└──' : '├──'
          out.push(line(` ${branch} ${h}`))
        })
        out.push(line(`Tech: ${job.tech.join(' · ')}`, 'info'))
      })
      return out
    },
  },
  {
    name: 'skills',
    group: 'TECH',
    description: 'Technical skills',
    handler: () => [line('SKILLS', 'info'), line(''), ...tree(skills)],
  },
  {
    name: 'stack',
    group: 'TECH',
    description: 'Core technology stack',
    handler: () => [line('STACK', 'info'), line(''), ...tree(stack)],
  },
  {
    name: 'focus',
    group: 'TECH',
    description: 'Current technical focus',
    handler: () => {
      const out: TerminalEntry[] = [line('CURRENT FOCUS', 'info'), line('')]
      profile.focusAreas.forEach((area, i) => {
        out.push(line(`${String(i + 1).padStart(2, '0')}  ${area}`))
      })
      return out
    },
  },
  {
    name: 'projects',
    group: 'WORK',
    description: 'List projects',
    aliases: ['p'],
    handler: () => {
      const out: TerminalEntry[] = [line('PROJECTS', 'info'), line('')]
      allProjects.forEach((p, i) => {
        out.push(line(`${String(i + 1).padStart(2, '0')}  ${p.name}`, 'success'))
        out.push(line(`    ${p.tech.slice(0, 4).join(' · ')}`))
        if (i < allProjects.length - 1) out.push(line(''))
      })
      out.push(line(''))
      out.push(line('Run: project <name>   e.g. project threadly', 'info'))
      return out
    },
  },
  {
    name: 'project',
    group: 'WORK',
    description: 'Show project details',
    handler: (args) => {
      const query = args.join(' ').trim()
      if (!query) {
        return [
          line('Usage: project <name>', 'info'),
          line('Run "projects" to see all projects.'),
        ]
      }
      const p = findProject(query)
      if (!p) {
        return [
          line('Project not found.', 'error'),
          line(''),
          line('Try:'),
          line('  projects', 'info'),
        ]
      }
      const out: TerminalEntry[] = [
        line(p.name.toUpperCase(), 'success'),
        line(p.tagline),
        line(p.kind, 'info'),
        line(''),
        line(p.summary),
        line(''),
        line('TECHNOLOGIES', 'info'),
        line(p.tech.join(' · ')),
        line(''),
        line('FEATURES', 'info'),
      ]
      p.features.forEach(f => out.push(line(` • ${f}`)))
      if (p.links.length > 0) {
        out.push(line(''))
        out.push(line('LINKS', 'info'))
        p.links.forEach(l => out.push({ id: makeId(), kind: 'link', content: `${l.label}: ${l.href}`, href: l.href }))
      }
      return out
    },
  },
  {
    name: 'resume',
    group: 'CONNECT',
    description: 'View / download resume',
    aliases: ['cv'],
    handler: () => [
      line('RESUME', 'info'),
      line(''),
      line(`${profile.name} — ${profile.role}`),
      line(''),
      { id: makeId(), kind: 'link', content: '[ Open / Download Resume (PDF) ]', href: profile.resume },
    ],
  },
  {
    name: 'github',
    group: 'CONNECT',
    description: 'Open GitHub profile',
    aliases: ['gh'],
    handler: (_args, ctx) => {
      ctx.openUrl(profile.github)
      return [
        { id: makeId(), kind: 'link', content: profile.githubHandle, href: profile.github },
        line('Opening GitHub in a new tab...', 'info'),
      ]
    },
  },
  {
    name: 'linkedin',
    group: 'CONNECT',
    description: 'Open LinkedIn profile',
    aliases: ['li'],
    handler: (_args, ctx) => {
      ctx.openUrl(profile.linkedin)
      return [
        { id: makeId(), kind: 'link', content: profile.linkedinHandle, href: profile.linkedin },
        line('Opening LinkedIn in a new tab...', 'info'),
      ]
    },
  },
  {
    name: 'contact',
    group: 'CONNECT',
    description: 'Contact information',
    handler: () => {
      const out: TerminalEntry[] = [line('CONTACT', 'info'), line('')]
      contact.forEach(c => {
        out.push(line(c.label, 'success'))
        out.push({ id: makeId(), kind: 'link', content: c.value, href: c.href })
      })
      out.push(line(''))
      out.push(line('Location', 'success'))
      out.push(line(profile.location))
      return out
    },
  },
  {
    name: 'neofetch',
    group: 'SYSTEM',
    description: 'System information',
    handler: () => [
      line(`        ${profile.name.toUpperCase()}`, 'success'),
      line(`        @Harshvyas2704`, 'info'),
      line(''),
      line('OS:          Developer'),
      line('Shell:       zsh'),
      line('Editor:      VS Code'),
      line('Frontend:    React / Next.js'),
      line('Mobile:      React Native / Kotlin'),
      line('Backend:     Node.js / Express'),
      line('Database:    MongoDB / MySQL'),
      line('Experience:  2+ years'),
      line('Focus:       Backend Systems'),
      line('Status:      Building'),
    ],
  },
  {
    name: 'status',
    group: 'SYSTEM',
    description: 'Current status',
    handler: () => [
      line('PORTFOLIO STATUS', 'info'),
      line(''),
      line('Portfolio      ONLINE'),
      line('Learning       ACTIVE'),
      line('Building       ACTIVE'),
      line('Curiosity      HIGH'),
      line('Coffee         REQUIRED'),
    ],
  },
]
