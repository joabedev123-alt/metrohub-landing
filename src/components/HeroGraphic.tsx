/**
 * Abstract hub diagram: one central hub connected to the three operating
 * areas the company describes. Purely illustrative — no data is represented.
 */
const NODES = [
  { label: 'Sourcing', x: 260, y: 92, labelY: 58 },
  { label: 'Distribution', x: 114, y: 344, labelY: 386 },
  { label: 'Operations', x: 406, y: 344, labelY: 386 },
]

export function HeroGraphic() {
  return (
    <svg
      viewBox="0 0 520 440"
      className="h-auto w-full"
      role="img"
      aria-label="Diagram connecting sourcing, distribution, and operations through a central hub"
    >
      <defs>
        <linearGradient id="spoke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#29B8CD" />
          <stop offset="1" stopColor="#344AB2" />
        </linearGradient>
        <linearGradient id="hub-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#29B8CD" />
          <stop offset="0.45" stopColor="#344AB2" />
          <stop offset="0.8" stopColor="#7527AA" />
          <stop offset="1" stopColor="#D3268A" />
        </linearGradient>
        <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#344AB2" stopOpacity="0.32" />
          <stop offset="1" stopColor="#344AB2" stopOpacity="0" />
        </radialGradient>
        <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#ffffff" fillOpacity="0.09" />
        </pattern>
        <radialGradient id="fade" cx="0.5" cy="0.55" r="0.5">
          <stop offset="0.4" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="dots-mask">
          <rect width="520" height="440" fill="url(#fade)" />
        </mask>
      </defs>

      <rect width="520" height="440" fill="url(#dots)" mask="url(#dots-mask)" />
      <circle cx="260" cy="260" r="190" fill="url(#glow)" />

      {/* Orbits */}
      <circle cx="260" cy="260" r="168" fill="none" stroke="#fff" strokeOpacity="0.08" strokeDasharray="2 7" />
      <circle cx="260" cy="260" r="96" fill="none" stroke="#fff" strokeOpacity="0.07" />

      {/* Perimeter connecting the three areas */}
      <path
        d="M260 92 L406 344 L114 344 Z"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.12"
        strokeLinejoin="round"
      />

      {/* Spokes */}
      {NODES.map((node) => (
        <g key={node.label}>
          <line x1="260" y1="260" x2={node.x} y2={node.y} stroke="#fff" strokeOpacity="0.1" strokeWidth="1.5" />
          <line
            className="flow-line"
            x1="260"
            y1="260"
            x2={node.x}
            y2={node.y}
            stroke="url(#spoke)"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </g>
      ))}

      {/* Nodes */}
      {NODES.map((node) => (
        <g key={`${node.label}-node`}>
          <circle className="pulse-ring" cx={node.x} cy={node.y} r="18" fill="none" stroke="#29B8CD" strokeOpacity="0.35" />
          <circle cx={node.x} cy={node.y} r="8" fill="#050507" stroke="#29B8CD" strokeWidth="2" />
          <text
            x={node.x}
            y={node.labelY}
            textAnchor="middle"
            fill="#C3C7D1"
            fontSize="12"
            fontWeight="600"
            letterSpacing="2.2"
          >
            {node.label.toUpperCase()}
          </text>
        </g>
      ))}

      {/* Hub */}
      <rect x="222" y="222" width="76" height="76" rx="18" fill="#111218" stroke="url(#hub-stroke)" strokeWidth="1.5" />
      <rect x="240" y="240" width="40" height="40" rx="10" fill="none" stroke="#fff" strokeOpacity="0.14" />
      <circle cx="260" cy="260" r="6" fill="#29B8CD" />
    </svg>
  )
}

/** Compact version for small screens. */
export function HeroGraphicCompact() {
  return (
    <div className="flex min-w-0 items-center gap-1.5 text-[11px] font-semibold tracking-[0.06em] text-white/70 uppercase min-[360px]:gap-2.5 min-[360px]:tracking-[0.16em] sm:gap-3" aria-hidden="true">
      {NODES.map((node, index) => (
        <span key={node.label} className="contents">
          {index > 0 && <span className="h-px flex-1 bg-gradient-to-r from-brand-cyan/70 to-brand-blue/70" />}
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="hidden h-1.5 w-1.5 rounded-full bg-brand-cyan min-[360px]:block" />
            {node.label}
          </span>
        </span>
      ))}
    </div>
  )
}
