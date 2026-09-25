import { line } from './engine'
import type { Command, TerminalEntry } from './types'

/** Fictional directory listing shown by `ls`. */
const DIRS = ['about/', 'projects/', 'experience/', 'skills/', 'contact/']
const FILES = ['resume.pdf', 'README.md']

/** Valid directories for `cd` (without trailing slash). */
export const FS_DIRS = DIRS.map(d => d.replace('/', ''))

const README = [
  '# Harsh Vyas',
  '',
  'Software Engineer',
  '',
  'I build software, learn how systems work,',
  'and enjoy solving difficult problems.',
  '',
  'See:',
  '  projects',
  '  skills',
  '  experience',
  '  contact',
]

export const filesystemCommands: Command[] = [
  {
    name: 'ls',
    group: 'SYSTEM',
    description: 'List directory',
    hidden: true,
    handler: () => {
      const out: TerminalEntry[] = []
      DIRS.forEach(d => out.push(line(d, 'info')))
      FILES.forEach(f => out.push(line(f)))
      return out
    },
  },
  {
    name: 'pwd',
    group: 'SYSTEM',
    description: 'Print working directory',
    hidden: true,
    handler: (_args, ctx) => {
      const path = ctx.cwd === '~' ? '/home/harsh' : `/home/harsh/${ctx.cwd.replace('~/', '')}`
      return [line(path)]
    },
  },
  {
    name: 'cd',
    group: 'SYSTEM',
    description: 'Change directory',
    hidden: true,
    handler: (args, ctx) => {
      const target = (args[0] || '~').replace(/\/$/, '')
      if (target === '~' || target === '' || target === '..') {
        ctx.setDirectory('~')
        return []
      }
      const ok = ctx.setDirectory(target)
      if (!ok) {
        return [line(`cd: no such directory: ${target}`, 'error')]
      }
      return []
    },
  },
  {
    name: 'cat',
    group: 'SYSTEM',
    description: 'Read a file',
    hidden: true,
    handler: (args) => {
      const file = (args[0] || '').toLowerCase()
      if (!file) return [line('Usage: cat <file>', 'info')]
      if (file === 'readme.md' || file === 'readme') {
        return README.map(l => line(l))
      }
      if (file === 'resume.pdf') {
        return [line('resume.pdf is a binary file. Try: resume', 'info')]
      }
      return [line(`cat: ${args[0]}: No such file`, 'error')]
    },
  },
]
