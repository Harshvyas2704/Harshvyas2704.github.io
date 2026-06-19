import { useIntersection } from '../hooks/useIntersection'
import { experience } from '../data/portfolio'

function ExperienceCard({
  exp,
  index,
  visible,
  isLast,
}: {
  exp: (typeof experience)[0]
  index: number
  visible: boolean
  isLast: boolean
}) {
  return (
    <div className={`reveal reveal-delay-${index + 1} ${visible ? 'visible' : ''} relative pl-10`}>
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[7px] top-8 bottom-0 w-px bg-gradient-to-b from-royal-blue/40 to-transparent" />
      )}

      {/* Timeline dot */}
      <div className="absolute left-0 top-2 w-3.5 h-3.5 border-2 border-royal-blue bg-bg"
        style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />

      <div className="pb-16">
        {/* Period */}
        <span className="text-royal-blue text-xs font-bold tracking-widest uppercase mb-3 block">
          {exp.period}
        </span>

        {/* Role + Company */}
        <h3 className="text-cream text-2xl font-bold mb-1">{exp.role}</h3>
        <p className="text-electric-blue text-base font-medium mb-4">{exp.company}</p>

        {/* Summary */}
        <p className="text-muted text-sm leading-relaxed mb-6 max-w-2xl">{exp.summary}</p>

        {/* Highlights */}
        <ul className="space-y-3 mb-6">
          {exp.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-muted">
              <span className="text-royal-blue mt-0.5 shrink-0">▸</span>
              {h}
            </li>
          ))}
        </ul>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {exp.tech.map(t => (
            <span key={t} className="text-xs text-muted bg-surface border border-white/5 px-2.5 py-1">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  const { ref, visible } = useIntersection()

  return (
    <section id="experience" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <div className={`reveal ${visible ? 'visible' : ''} mb-16`}>
          <span className="text-royal-blue text-xs font-bold tracking-widest uppercase mb-3 block">
            Work History
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-cream mb-4">
            Experience <span className="font-devanagari text-2xl md:text-3xl font-medium text-muted">(अनुभव)</span>
          </h2>
          <p className="text-muted text-lg max-w-xl">
            A progression of increasing ownership — from shipping features to leading teams.
          </p>
        </div>

        <div>
          {experience.map((exp, i) => (
            <ExperienceCard
              key={exp.company}
              exp={exp}
              index={i}
              visible={visible}
              isLast={i === experience.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
