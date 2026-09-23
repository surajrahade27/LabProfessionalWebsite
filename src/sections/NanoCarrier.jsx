// Decorative SVG of a targeted nanocarrier: lipid bilayer shell, PEG-ligand
// "antennae" and a drug-loaded core. Pure geometry, no image assets.
const CX = 160
const CY = 160
const HEADS = 44
const LIGANDS = 12

const polar = (r, angle) => [CX + r * Math.cos(angle), CY + r * Math.sin(angle)]

const bilayer = Array.from({ length: HEADS }, (_, i) => {
  const a = (i / HEADS) * Math.PI * 2
  return { outer: polar(104, a), inner: polar(78, a), tailOut: polar(95, a), tailIn: polar(87, a) }
})

const ligands = Array.from({ length: LIGANDS }, (_, i) => {
  const a = (i / LIGANDS) * Math.PI * 2 + 0.13
  const [x1, y1] = polar(110, a)
  const [x2, y2] = polar(146, a)
  // Wiggle the PEG chain sideways with a quadratic curve
  const [mx, my] = polar(128, a + 0.09)
  return { d: `M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`, head: [x2, y2] }
})

const payload = [
  [148, 140],
  [176, 150],
  [158, 176],
  [140, 166],
  [182, 178],
  [166, 128],
]

// Flat-top hexagon, the usual shorthand for a drug molecule ring
const hexagon = (x, y, r) =>
  Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i
    return `${(x + r * Math.cos(a)).toFixed(1)},${(y + r * Math.sin(a)).toFixed(1)}`
  }).join(' ')

function NanoCarrier({ className }) {
  return (
    <svg className={className} viewBox="0 0 320 320" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="nc-core" cx="0.45" cy="0.4" r="0.65">
          <stop offset="0" stopColor="#818cf8" stopOpacity="0.55" />
          <stop offset="1" stopColor="#0b1026" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="nc-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="0.5" stopColor="#818cf8" />
          <stop offset="1" stopColor="#c084fc" />
        </linearGradient>
      </defs>

      <circle cx={CX} cy={CY} r="150" fill="url(#nc-core)" />

      {/* Whole particle rotates slowly */}
      <g className="nc-spin">
        {ligands.map((l, i) => (
          <g key={i}>
            <path d={l.d} fill="none" stroke="url(#nc-stroke)" strokeWidth="1.6" opacity="0.8" />
            <circle cx={l.head[0]} cy={l.head[1]} r="4.5" fill="#22d3ee" className="nc-ligand" />
          </g>
        ))}

        {bilayer.map((h, i) => (
          <g key={i}>
            <line
              x1={h.outer[0]}
              y1={h.outer[1]}
              x2={h.tailOut[0]}
              y2={h.tailOut[1]}
              stroke="#a5b4fc"
              strokeWidth="1.2"
              opacity="0.6"
            />
            <line
              x1={h.inner[0]}
              y1={h.inner[1]}
              x2={h.tailIn[0]}
              y2={h.tailIn[1]}
              stroke="#a5b4fc"
              strokeWidth="1.2"
              opacity="0.6"
            />
            <circle cx={h.outer[0]} cy={h.outer[1]} r="4.2" fill="#818cf8" />
            <circle cx={h.inner[0]} cy={h.inner[1]} r="3.4" fill="#c084fc" opacity="0.85" />
          </g>
        ))}
      </g>

      {/* Drug payload floats inside the core */}
      <g className="nc-payload" fill="none" stroke="url(#nc-stroke)" strokeWidth="1.6">
        {payload.map(([x, y], i) => (
          <polygon key={i} points={hexagon(x, y, 8)} />
        ))}
      </g>
    </svg>
  )
}

export default NanoCarrier
