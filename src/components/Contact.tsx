import { useIntersection } from '../hooks/useIntersection'

const contactLinks = [
  { label: 'Email', value: 'harshvyasdev@gmail.com', href: 'mailto:harshvyasdev@gmail.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/harsh-vyas', href: 'https://linkedin.com/in/harsh-vyas' },
  { label: 'GitHub', value: 'github.com/Harshvyas2704', href: 'https://github.com/Harshvyas2704' },
  { label: 'Phone', value: '+91 95379 06343', href: 'tel:+919537906343' },
]

export default function Contact() {
  const { ref, visible } = useIntersection()

  return (
    <section id="contact" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className={`reveal ${visible ? 'visible' : ''} mb-16`}>
          <span className="text-royal-blue text-xs font-bold tracking-widest uppercase mb-3 block">
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-cream mb-4">
            Contact <span className="font-devanagari text-2xl md:text-3xl font-medium text-muted">(संपर्क)</span>
          </h2>
          <p className="text-muted text-lg max-w-xl">
            Open to interesting problems, new opportunities, and direct conversations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Direct links */}
          <div className={`reveal reveal-delay-1 ${visible ? 'visible' : ''}`}>
            <h3 className="text-cream text-sm font-bold tracking-widest uppercase mb-8">
              Reach Me
            </h3>
            <div className="divide-y divide-white/5 border-y border-white/5">
              {contactLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="flex items-center justify-between gap-4 py-5 group"
                >
                  <span className="text-royal-blue/60 text-xs font-bold tracking-widest uppercase w-20 shrink-0">
                    {link.label}
                  </span>
                  <span className="text-muted text-sm group-hover:text-cream transition-colors flex-1">
                    {link.value}
                  </span>
                  <span className="text-royal-blue/40 group-hover:text-electric-blue group-hover:translate-x-1 transition-all">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Availability note + CTA */}
          <div className={`reveal reveal-delay-2 ${visible ? 'visible' : ''} space-y-6`}>
            <div className="p-8 border border-royal-blue/20 bg-surface">
              <p className="text-cream text-lg font-semibold mb-3 leading-snug">
                Have a problem worth solving?
              </p>
              <p className="text-muted text-sm leading-relaxed mb-6">
                Based in Rajkot, India. Available for full-time roles, contract work,
                and technical conversations worth having. The fastest way to reach me
                is a direct email.
              </p>
              <a
                href="mailto:harshvyasdev@gmail.com"
                className="inline-block px-7 py-3 bg-royal-blue text-white text-sm font-semibold tracking-wide hover:bg-electric-blue transition-colors duration-200"
              >
                Send an Email
              </a>
            </div>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-4 p-6 border border-white/10 hover:border-royal-blue/40 transition-colors group"
            >
              <span className="text-cream text-sm font-semibold">Download Resume</span>
              <span className="text-royal-blue group-hover:text-electric-blue group-hover:translate-x-1 transition-all">
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
