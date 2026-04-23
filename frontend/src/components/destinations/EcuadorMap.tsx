interface EcuadorMapProps {
  region: 'galapagos' | 'amazonia' | 'andes'
  accent: string
}

export default function EcuadorMap({ region, accent }: EcuadorMapProps) {
  const isGal = region === 'galapagos'
  const isAma = region === 'amazonia'
  const isAnd = !isGal && !isAma

  return (
    <svg viewBox="0 0 220 188" width="100%" height="100%">
      <defs>
        <pattern id="mapgrid" width="22" height="18.8" patternUnits="userSpaceOnUse">
          <path d="M22 0L0 0 0 18.8" fill="none" stroke="rgba(0,100,140,0.1)" strokeWidth="0.4" />
        </pattern>
      </defs>
      <rect width="220" height="188" fill="#cce9f2" />
      <rect width="220" height="188" fill="url(#mapgrid)" />

      {/* Perú */}
      <path d="M175,140 L215,115 L220,145 L220,188 L85,188 L90,140Z" fill="#cddfc6" stroke="#a8c49a" strokeWidth="0.6" />
      {/* Colombia */}
      <path d="M64,0 L205,0 L205,44 L175,52 L90,50 L72,38Z" fill="#cddfc6" stroke="#a8c49a" strokeWidth="0.6" />

      {/* Ecuador Costa */}
      <path
        d="M90,50 L114,50 L114,140 L90,140Z"
        fill={isAnd ? `${accent}90` : '#b8d4a4'}
        stroke="#7aaa6a"
        strokeWidth="0.5"
      />
      {/* Ecuador Sierra */}
      <path
        d="M114,50 L140,50 L140,140 L114,140Z"
        fill={isAnd ? `${accent}cc` : '#b8d4a4'}
        stroke="#7aaa6a"
        strokeWidth="0.5"
      />
      {/* Ecuador Oriente */}
      <path
        d="M140,50 L176,52 L176,138 L140,140Z"
        fill={isAma ? `${accent}cc` : '#b8d4a4'}
        stroke="#7aaa6a"
        strokeWidth="0.5"
      />
      {/* Ecuador border */}
      <path d="M90,50 L176,52 L176,138 L90,140Z" fill="none" stroke="#4a8840" strokeWidth="1.3" />

      {/* Galápagos connector */}
      <line x1="60" y1="87" x2="90" y2="92" stroke="#4a8840" strokeWidth="0.8" strokeDasharray="3 2" />
      {/* Galápagos islands */}
      {([
        [22, 81, 5], [38, 76, 7], [52, 85, 6],
        [26, 94, 4], [50, 95, 4.5], [36, 100, 3],
      ] as [number, number, number][]).map(([cx, cy, r], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill={isGal ? accent : '#b4d0a0'}
          fillOpacity={isGal ? 0.9 : 0.8}
          stroke={isGal ? accent : '#7aaa6a'}
          strokeWidth="0.7"
        />
      ))}

      {/* Pins */}
      {isGal && (
        <>
          <circle cx="38" cy="62" r="8" fill={accent} opacity="0.2" />
          <circle cx="38" cy="62" r="5.5" fill={accent} />
          <circle cx="38" cy="62" r="2.5" fill="white" />
        </>
      )}
      {isAma && (
        <>
          <circle cx="158" cy="92" r="8" fill={accent} opacity="0.2" />
          <circle cx="158" cy="92" r="5.5" fill={accent} />
          <circle cx="158" cy="92" r="2.5" fill="white" />
        </>
      )}
      {isAnd && (
        <>
          <circle cx="126" cy="82" r="8" fill={accent} opacity="0.2" />
          <circle cx="126" cy="82" r="5.5" fill={accent} />
          <circle cx="126" cy="82" r="2.5" fill="white" />
        </>
      )}

      {/* Labels */}
      <text x="38" y="112" fontSize="6.5" fill="rgba(10,70,100,0.65)" textAnchor="middle" fontFamily="sans-serif" letterSpacing="0.4">Galápagos</text>
      <text x="133" y="97" fontSize="7" fill="rgba(10,50,10,0.5)" textAnchor="middle" fontFamily="sans-serif" fontWeight="700" letterSpacing="0.5">ECUADOR</text>
      <text x="152" y="24" fontSize="5.8" fill="rgba(0,0,0,0.28)" textAnchor="middle" fontFamily="sans-serif">COLOMBIA</text>
      <text x="152" y="174" fontSize="5.8" fill="rgba(0,0,0,0.28)" textAnchor="middle" fontFamily="sans-serif">PERÚ</text>
      <text x="20" y="32" fontSize="5.8" fill="rgba(0,80,120,0.32)" fontFamily="sans-serif">Pacífico</text>
      <text x="195" y="95" fontSize="5.5" fill="rgba(0,80,10,0.28)" fontFamily="sans-serif" transform="rotate(90,195,95)" textAnchor="middle">Amazonas</text>
    </svg>
  )
}
