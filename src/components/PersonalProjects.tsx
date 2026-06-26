import { useIntersection } from '../hooks/useIntersection'
import { personalProjects } from '../data/portfolio'

export default function PersonalProjects() {
  const { ref, visible } = useIntersection()

  return (
    <section id="personal" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section header */}
        <div className={`reveal ${visible ? 'visible' : ''} mb-16`}>
          <span className="text-royal-blue text-xs font-bold tracking-widest uppercase mb-3 block">
            Beyond the Day Job
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-cream mb-4">
            Personal Projects <span className="font-devanagari text-2xl md:text-3xl font-medium text-muted">(साधना)</span>
          </h2>
          <p className="text-muted text-lg max-w-xl">
            Built for mastery, not metrics. Where curiosity sets the requirements.
          </p>
        </div>

        {/* Signature feature card */}
        {personalProjects.map((project, i) => (
          <article
            key={project.id}
            className={`reveal reveal-delay-${i + 1} ${visible ? 'visible' : ''} border border-white/5 hover:border-royal-blue/30 transition-all duration-300 bg-surface group`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-5">
              {/* Left: identity */}
              <div className="lg:col-span-2 p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-white/5 relative overflow-hidden">
                {/* Devanagari watermark */}
                <span
                  className="font-devanagari pointer-events-none absolute -bottom-6 -right-2 text-[120px] leading-none text-royal-blue/[0.06] select-none"
                  aria-hidden
                >
                  मोक्ष
                </span>

                <span className="relative text-royal-blue/50 text-xs font-bold tracking-widest uppercase block mb-3">
                  {project.kind}
                </span>
                <h3 className="relative text-cream text-3xl font-bold mb-1 group-hover:text-electric-blue transition-colors">
                  {project.name}
                </h3>
                <p className="relative text-electric-blue text-base font-medium mb-6">
                  {project.tagline}
                </p>
                <p className="relative text-muted text-sm leading-relaxed">
                  {project.concept}
                </p>
              </div>

              {/* Right: engineering detail */}
              <div className="lg:col-span-3 p-8 lg:p-10 flex flex-col gap-6">
                <div>
                  <span className="text-royal-blue text-xs font-bold tracking-wider uppercase block mb-2">
                    Approach
                  </span>
                  <p className="text-muted text-sm leading-relaxed">{project.detail}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.highlights.map(h => (
                    <div key={h} className="flex items-start gap-2 text-xs text-muted">
                      <span className="text-royal-blue mt-0.5 shrink-0">▸</span>
                      {h}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map(t => (
                    <span key={t} className="text-xs text-muted bg-white/5 px-2.5 py-1">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 pt-1 mt-auto">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-2.5 bg-royal-blue text-white text-sm font-semibold tracking-wide hover:bg-electric-blue transition-colors duration-200"
                  >
                    View on GitHub ↗
                  </a>
                  {project.apk && (
                    <a
                      href={project.apk}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-2.5 border border-white/20 text-cream text-sm font-semibold tracking-wide hover:border-royal-blue hover:text-royal-blue transition-all duration-200"
                    >
                      Download APK ↓
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
