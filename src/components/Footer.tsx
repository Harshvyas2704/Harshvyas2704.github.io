// The six-syllable mantra of Kartikeya — शरवणभव (Sharavanabhava). Six letters
// for the six facets, the six-faced (Shanmukha), and the six-fold geometry.
// Hidden by default — revealed only by pressing the centre of the docked hexagon
// once you have reached the very bottom of the page.
const syllables = ['श', 'र', 'व', 'ण', 'भ', 'व']

export default function Footer({ revealed }: { revealed: boolean }) {
  return (
    <footer className="border-t border-white/5 py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* The hidden mantra */}
        <div
          className={`overflow-hidden transition-all duration-700 ease-out ${
            revealed ? 'max-h-48 opacity-100 mb-12' : 'max-h-0 opacity-0 mb-0'
          }`}
        >
          <div className="flex items-end justify-center gap-2.5 sm:gap-4 pt-2">
            {syllables.map((s, i) => (
              <div
                key={i}
                className="group relative w-12 h-[54px] sm:w-[58px] sm:h-16 flex items-center justify-center"
              >
                <svg viewBox="0 0 50 56" fill="none" className="absolute inset-0 w-full h-full">
                  <polygon
                    points="25,2 48,15 48,41 25,54 2,41 2,15"
                    stroke="#4169E1"
                    strokeWidth="1.2"
                    className="opacity-30 group-hover:opacity-70 transition-opacity duration-300"
                  />
                </svg>
                <span
                  className="font-devanagari relative text-2xl sm:text-3xl text-electric-blue/70 group-hover:text-electric-blue transition-colors duration-300 leading-none"
                  style={{ marginTop: '-2px' }}
                >
                  {s}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Credit */}
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="text-muted text-sm">Designed &amp; built by Harsh Vyas</p>
          <p className="text-muted/40 text-xs">© {new Date().getFullYear()} · Engineering complex systems into software</p>
        </div>
      </div>
    </footer>
  )
}
