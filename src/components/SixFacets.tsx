import { useIntersection } from '../hooks/useIntersection'
import { facets } from '../data/portfolio'

const facetIcons: Record<string, string> = {
  'system-thinker': '⬡',
  'problem-solver': '◈',
  'engineer': '⬡',
  'craftsman': '◈',
  'owner': '⬡',
  'seeker': '◈',
}

function FacetCard({
  facet,
  index,
  visible,
}: {
  facet: (typeof facets)[0]
  index: number
  visible: boolean
}) {
  return (
    <div
      className={`reveal reveal-delay-${index + 1} ${visible ? 'visible' : ''} group relative bg-surface border border-white/5 p-7 hover:border-royal-blue/40 transition-all duration-300 hover:-translate-y-1`}
    >
      {/* Hex accent top-right */}
      <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-25 transition-opacity">
        <svg width="32" height="28" viewBox="0 0 32 28" fill="none">
          <polygon
            points="16,2 30,9 30,23 16,30 2,23 2,9"
            stroke="#4169E1"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* Number */}
      <span className="text-royal-blue/40 text-xs font-bold tracking-widest uppercase mb-4 block">
        0{index + 1}
      </span>

      {/* Label */}
      <h3 className="text-cream text-xl font-bold mb-3 group-hover:text-electric-blue transition-colors">
        {facet.label}
      </h3>

      {/* Description */}
      <p className="text-muted text-sm leading-relaxed mb-5">
        {facet.description}
      </p>

      {/* Evidence */}
      <div className="border-l-2 border-royal-blue/30 pl-3">
        <p className="text-muted/70 text-xs leading-relaxed italic">
          {facet.evidence}
        </p>
      </div>
    </div>
  )
}

export default function SixFacets() {
  const { ref, visible } = useIntersection()

  return (
    <section id="facets" className="py-24 px-6">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section header */}
        <div className={`reveal ${visible ? 'visible' : ''} mb-16`}>
          <span className="text-royal-blue text-xs font-bold tracking-widest uppercase mb-3 block">
            How I Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-cream mb-4">
            The Six Facets <span className="font-devanagari text-2xl md:text-3xl font-medium text-muted">(षण्मुख)</span>
          </h2>
          <p className="text-muted text-lg max-w-xl">
            The principles and perspectives that define how I approach engineering problems.
          </p>
        </div>

        {/* Facet grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {facets.map((facet, i) => (
            <FacetCard key={facet.id} facet={facet} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  )
}
