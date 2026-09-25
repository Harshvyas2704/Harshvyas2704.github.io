import { line } from './engine'
import type { Command } from './types'

/** A filled 20-cell progress bar at 100%. */
const BAR = `${'█'.repeat(20)} 100%`

export const easterEggs: Command[] = [
  {
    name: 'sudo',
    group: 'SYSTEM',
    description: 'Superuser do',
    hidden: true,
    handler: (args, ctx) => {
      const rest = args.join(' ').toLowerCase()

      if (rest === 'hire harsh') {
        ctx.print([
          line('Checking permissions...', 'info'),
          line(''),
          line('User:    recruiter'),
          line('Request: hire harsh'),
        ])
        window.setTimeout(() => {
          ctx.print([
            line(''),
            line(BAR, 'success'),
            line(''),
            line('Additional information required.'),
            line(''),
            line('Try:'),
            line('  projects', 'info'),
            line('  experience', 'info'),
            line('  resume', 'info'),
          ])
        }, 550)
        return []
      }

      return [
        line('Nice try.', 'error'),
        line(''),
        line('You don’t have sudo privileges here.'),
      ]
    },
  },
  {
    name: 'coffee',
    group: 'SYSTEM',
    description: 'Brew coffee',
    hidden: true,
    handler: (_args, ctx) => {
      window.setTimeout(() => {
        ctx.print([
          line(BAR, 'success'),
          line(''),
          line('Developer mode activated.', 'success'),
        ])
      }, 500)
      return [line('Brewing coffee...', 'info')]
    },
  },
  {
    name: '42',
    group: 'SYSTEM',
    description: 'The answer',
    hidden: true,
    handler: () => [
      line('The answer is correct.', 'success'),
      line(''),
      line('Unfortunately,'),
      line('the question is still missing.'),
    ],
  },
  {
    name: 'matrix',
    group: 'SYSTEM',
    description: 'Enter the stream',
    hidden: true,
    handler: (_args, ctx) => {
      ctx.runMatrix()
      return [line('Entering the stream... (press Esc or click to exit)', 'info')]
    },
  },
]
