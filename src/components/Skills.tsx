import { useIntersection } from '../hooks/useIntersection'
import { skills } from '../data/portfolio'

export default function Skills() {
  const { ref, visible } = useIntersection()

  return (
    <section id="skills" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className={`reveal ${visible ? 'visible' : ''} mb-16`}>
          <span className="text-royal-blue text-xs font-bold tracking-widest uppercase mb-3 block">
            Technical Stack
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-cream mb-4">
            Skills & Technologies
          </h2>
          <p className="text-muted text-lg max-w-xl">
            The tools I reach for — and the ones I've shipped production code with.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, items], i) => (
            <div
              key={category}
              className={`reveal reveal-delay-${i + 1} ${visible ? 'visible' : ''} bg-surface border border-white/5 p-6 hover:border-royal-blue/30 transition-colors duration-300`}
            >
              <h3 className="text-royal-blue text-xs font-bold tracking-widest uppercase mb-5">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map(skill => (
                  <span
                    key={skill}
                    className="text-sm text-cream/80 bg-white/5 border border-white/5 px-3 py-1.5 hover:border-royal-blue/40 hover:text-cream transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
