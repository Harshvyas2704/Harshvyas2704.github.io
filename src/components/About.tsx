import { useIntersection } from '../hooks/useIntersection'

const stats = [
  { value: '2+', label: 'Years shipping production code', note: 'June 2023 to present, across two companies' },
  { value: '3', label: 'Production apps shipped', note: 'KVSC, Hirexpert, Kohira' },
  { value: '15k+', label: 'Active users served', note: 'Registered members on KVSC' },
  { value: '100k+', label: 'Products in a catalogue I built', note: 'Searchable SKUs in the Kohira catalogue' },
]

export default function About() {
  const { ref, visible } = useIntersection()

  return (
    <section id="about" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className={`reveal ${visible ? 'visible' : ''} mb-16`}>
          <span className="text-royal-blue text-xs font-bold tracking-widest uppercase mb-3 block">
            Background
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-cream mb-4">
            About <span className="font-devanagari text-2xl md:text-3xl font-medium text-muted">(परिचय)</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: text */}
          <div className={`reveal reveal-delay-1 ${visible ? 'visible' : ''} space-y-5`}>
            <p className="text-muted text-base leading-relaxed">
              I started as an Electrical Engineer — systems thinking was the foundation,
              not the accident. After completing my B.E. from B.H. Gardi College, I made a
              deliberate pivot: I enrolled in a 30-week full-stack bootcamp at Masai School
              to retrain entirely in software.
            </p>
            <p className="text-muted text-base leading-relaxed">
              What followed was two years of building production-grade mobile apps — React Native,
              Kotlin, real users, real constraints. I've shipped a community platform for 15,000
              people, a job-matching engine that halved time-to-hire, and a jewellery e-commerce
              app with 100,000+ products.
            </p>
            <p className="text-muted text-base leading-relaxed">
              I work best at the intersection of system design and user experience — where the
              architecture matters, but so does the tap response time. I take ownership of
              problems, not just tickets.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="https://linkedin.com/in/harsh-vyas"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-royal-blue border border-royal-blue/30 px-4 py-2 hover:bg-royal-blue hover:text-white transition-all duration-200"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://github.com/Harshvyas2704"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-royal-blue border border-royal-blue/30 px-4 py-2 hover:bg-royal-blue hover:text-white transition-all duration-200"
              >
                GitHub ↗
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-cream border border-white/20 px-4 py-2 hover:border-royal-blue hover:text-royal-blue transition-all duration-200"
              >
                Download Resume ↓
              </a>
            </div>
          </div>

          {/* Right: stats */}
          <div className={`reveal reveal-delay-2 ${visible ? 'visible' : ''}`}>
            <div className="grid grid-cols-2 gap-px bg-white/5">
              {stats.map(stat => (
                <div key={stat.label} className="bg-surface p-8 flex flex-col justify-between">
                  <span className="text-4xl font-bold text-royal-blue mb-3 block">
                    {stat.value}
                  </span>
                  <span className="text-cream text-sm leading-snug block mb-1">{stat.label}</span>
                  <span className="text-muted/60 text-xs leading-snug">{stat.note}</span>
                </div>
              ))}
            </div>

            {/* Git contribution card */}
            <div className="mt-4 bg-surface border border-white/5 p-6">
              <p className="text-muted text-xs tracking-widest uppercase font-bold mb-4">
                GitHub Activity
              </p>
              <img
                src="https://ghchart.rshah.org/4169E1/Harshvyas2704"
                alt="Harsh Vyas GitHub contribution graph"
                className="w-full opacity-80"
                width={663}
                height={104}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
