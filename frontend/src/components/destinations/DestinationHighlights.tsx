import type { Destination } from '@/lib/types'

interface Props {
  destination: Destination
}

export default function DestinationHighlights({ destination }: Props) {
  const { whyVisit, bestTime, accentColor, name } = destination

  return (
    <section
      className="bg-[#0a1a09] py-24 md:py-32 px-6 md:px-12"
      aria-labelledby="highlights-heading"
    >
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <span
              className="uppercase text-xs tracking-[0.2em] font-semibold mb-4 block"
              style={{ color: accentColor }}
            >
              Por qué {name}
            </span>
            <h2
              id="highlights-heading"
              className="font-[family-name:var(--font-outfit)] text-3xl md:text-5xl font-black text-white tracking-tighter leading-none"
            >
              Razones que<br />no se olvidan.
            </h2>
          </div>

          {/* Best time badge */}
          <div
            className="inline-flex items-center gap-3 px-5 py-3 rounded-full border self-start md:self-auto"
            style={{ borderColor: `${accentColor}40`, backgroundColor: `${accentColor}10` }}
          >
            {/* Calendar icon */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect x="1.5" y="2.5" width="13" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" style={{ color: accentColor }} />
              <path d="M5 1v3M11 1v3M1.5 6.5h13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" style={{ color: accentColor }} />
              <circle cx="5" cy="10" r="1" fill="currentColor" style={{ color: accentColor }} />
              <circle cx="8" cy="10" r="1" fill="currentColor" style={{ color: accentColor }} />
            </svg>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.15em] text-white/40">Mejor época</span>
              <span className="text-sm font-semibold text-white">{bestTime}</span>
            </div>
          </div>
        </div>

        {/* Reasons list */}
        <ol className="flex flex-col gap-12">
          {whyVisit.map((reason, i) => {
            const num = String(i + 1).padStart(2, '0')
            return (
              <li key={i} className="relative pl-8 md:pl-12">
                {/* Left accent line */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-0.5"
                  style={{ backgroundColor: accentColor }}
                  aria-hidden="true"
                />
                {/* Decorative number */}
                <span
                  className="absolute -top-4 -left-2 text-8xl font-black leading-none select-none pointer-events-none"
                  style={{ color: 'rgba(255,255,255,0.04)' }}
                  aria-hidden="true"
                >
                  {num}
                </span>
                {/* Reason text */}
                <p className="text-lg md:text-xl font-light text-white/80 leading-relaxed relative z-10 max-w-[65ch]">
                  {typeof reason === 'string' ? reason : reason.title}
                </p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
