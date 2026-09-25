import {
  profile,
  contact,
  skills,
  experience,
  projects,
  personalProjects,
} from '../../data/portfolio'

export { profile, contact, skills, experience }

export interface TermProjectLink {
  label: string
  href: string
}

/** A portfolio project normalized into a shape the terminal can render uniformly. */
export interface TermProject {
  id: string
  name: string
  tagline: string
  kind: string
  tech: string[]
  summary: string
  features: string[]
  links: TermProjectLink[]
  aliases: string[]
}

function slug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '')
}

const workProjects: TermProject[] = projects.map(p => ({
  id: p.id,
  name: p.name,
  tagline: p.tagline,
  kind: 'Professional',
  tech: p.tech,
  summary: p.problem,
  features: p.highlights,
  links: p.playStore ? [{ label: 'Play Store', href: p.playStore }] : [],
  aliases: [p.id, slug(p.name)],
}))

const openProjects: TermProject[] = personalProjects.map(p => ({
  id: p.id,
  name: p.name,
  tagline: p.tagline,
  kind: p.kind,
  tech: p.tech,
  summary: p.concept,
  features: p.highlights,
  links: [
    p.github && { label: 'GitHub', href: p.github },
    p.live && { label: 'Live', href: p.live },
    p.demo && { label: 'Demo', href: p.demo },
    p.apk && { label: 'APK', href: p.apk },
  ].filter(Boolean) as TermProjectLink[],
  aliases: [p.id, slug(p.name)],
}))

/** Extra human aliases so `project moksha` etc. resolve. */
const EXTRA_ALIASES: Record<string, string[]> = {
  mokshapatam: ['moksha', 'mokshapat'],
}

export const allProjects: TermProject[] = [...workProjects, ...openProjects].map(p => ({
  ...p,
  aliases: Array.from(new Set([...p.aliases, ...(EXTRA_ALIASES[p.id] || [])])),
}))

/** Resolve a project by id, slug, or alias (case-insensitive). */
export function findProject(query: string): TermProject | undefined {
  const q = slug(query)
  return allProjects.find(p => p.aliases.some(a => slug(a) === q))
}

/** Core technology stack, curated from the skills data for the `stack` tree. */
export const stack: Record<string, string[]> = {
  Frontend: skills.Frontend,
  Mobile: skills.Mobile,
  Backend: skills.Backend,
  Database: skills.Database,
}
