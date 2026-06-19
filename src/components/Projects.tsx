import { useState } from 'react'
import { useIntersection } from '../hooks/useIntersection'
import { projects } from '../data/portfolio'

function ProjectCard({
  project,
  index,
  visible,
}: {
  project: (typeof projects)[0]
  index: number
  visible: boolean
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <article
      className={`reveal reveal-delay-${index + 1} ${visible ? 'visible' : ''} border border-white/5 hover:border-royal-blue/30 transition-all duration-300 group`}
    >
      {/* Header */}
      <div className="bg-surface p-8 border-b border-white/5">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <span className="text-royal-blue/50 text-xs font-bold tracking-widest uppercase block mb-2">
              Project {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="text-cream text-2xl font-bold group-hover:text-electric-blue transition-colors">
              {project.name}
            </h3>
            <p className="text-muted text-sm mt-1">{project.tagline}</p>
          </div>
          <span className="shrink-0 text-xs text-electric-blue border border-electric-blue/20 px-2.5 py-1 whitespace-nowrap">
            {project.scale}
          </span>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map(t => (
            <span key={t} className="text-xs text-muted bg-white/5 px-2.5 py-1">
              {t}
            </span>
          ))}
        </div>

        {/* Store availability */}
        {project.playStore ? (
          <a
            href={project.playStore}
            target="_blank"
            rel="noreferrer"
            onClick={e => e.stopPropagation()}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-electric-blue hover:text-cream transition-colors"
          >
            View on Play Store
            <span aria-hidden>↗</span>
          </a>
        ) : project.comingSoon ? (
          <span className="mt-4 inline-block text-xs text-muted/70 tracking-wide">
            Coming soon to the Play Store
          </span>
        ) : null}
      </div>

      {/* Content */}
      <div className="p-8 space-y-6">
        <div>
          <span className="text-royal-blue text-xs font-bold tracking-wider uppercase block mb-2">
            Problem
          </span>
          <p className="text-muted text-sm leading-relaxed">{project.problem}</p>
        </div>

        <div>
          <span className="text-royal-blue text-xs font-bold tracking-wider uppercase block mb-2">
            Approach
          </span>
          <p className="text-muted text-sm leading-relaxed">{project.approach}</p>
        </div>

        {expanded && (
          <div className="animate-[fadeIn_0.3s_ease]">
            <span className="text-royal-blue text-xs font-bold tracking-wider uppercase block mb-2">
              Impact
            </span>
            <p className="text-muted text-sm leading-relaxed mb-4">{project.impact}</p>

            <p className="text-xs text-muted/70 leading-relaxed mb-5 border-l-2 border-royal-blue/30 pl-3">
              <span className="text-royal-blue/70 font-semibold uppercase tracking-wider mr-1">How it is measured:</span>
              {project.proof}
            </p>

            <div className="grid grid-cols-2 gap-2">
              {project.highlights.map(h => (
                <div key={h} className="flex items-start gap-2 text-xs text-muted">
                  <span className="text-royal-blue mt-0.5 shrink-0">▸</span>
                  {h}
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-royal-blue hover:text-electric-blue font-medium tracking-wide uppercase transition-colors flex items-center gap-2"
        >
          {expanded ? 'Show Less ↑' : 'View Impact ↓'}
        </button>
      </div>
    </article>
  )
}

export default function Projects() {
  const { ref, visible } = useIntersection()

  return (
    <section id="projects" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className={`reveal ${visible ? 'visible' : ''} mb-16`}>
          <span className="text-royal-blue text-xs font-bold tracking-widest uppercase mb-3 block">
            Engineering Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-cream mb-4">
            Featured Projects
          </h2>
          <p className="text-muted text-lg max-w-xl">
            Real products. Real constraints. Real users.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  )
}
