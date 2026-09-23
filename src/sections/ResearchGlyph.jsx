// Line drawings of each research platform (64×64, stroke = currentColor).
const ring = (cx, cy, r, n, dot) =>
  Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2
    return <circle key={i} cx={cx + r * Math.cos(a)} cy={cy + r * Math.sin(a)} r={dot} />
  })

// Dendrimer: core → 3 branches → 2 sub-branches each
const dendrimerBranches = [0, 1, 2].flatMap((i) => {
  const a = (i / 3) * Math.PI * 2 - Math.PI / 2
  const x1 = 32 + 12 * Math.cos(a)
  const y1 = 32 + 12 * Math.sin(a)
  return [-0.5, 0.5].map((spread) => {
    const b = a + spread
    return { x1, y1, x2: 32 + 26 * Math.cos(b), y2: 32 + 26 * Math.sin(b) }
  })
})

const glyphs = {
  nanotube: (
    <>
      <ellipse cx="14" cy="32" rx="6" ry="14" />
      <path d="M14 18h36M14 46h36" />
      <path d="M50 18a6 14 0 0 1 0 28" />
      <path d="M22 24l5 4 5-4 5 4 5-4 5 4M22 36l5 4 5-4 5 4 5-4 5 4M27 28v8M37 28v8M47 28v8" opacity="0.6" />
    </>
  ),
  dendrimer: (
    <>
      <circle cx="32" cy="32" r="4" fill="currentColor" />
      {[0, 1, 2].map((i) => {
        const a = (i / 3) * Math.PI * 2 - Math.PI / 2
        return <line key={i} x1="32" y1="32" x2={32 + 12 * Math.cos(a)} y2={32 + 12 * Math.sin(a)} />
      })}
      {dendrimerBranches.map((b, i) => (
        <g key={i}>
          <line x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2} />
          <circle cx={b.x2} cy={b.y2} r="3" fill="currentColor" />
        </g>
      ))}
    </>
  ),
  hybrid: (
    <>
      <circle cx="32" cy="32" r="12" strokeDasharray="3 3" />
      <circle cx="32" cy="32" r="5" fill="currentColor" opacity="0.5" />
      <g fill="currentColor" stroke="none">
        {ring(32, 32, 22, 16, 2.4)}
      </g>
    </>
  ),
  vesicle: (
    <>
      <g fill="currentColor" stroke="none">
        {ring(32, 32, 24, 20, 2.2)}
        {ring(32, 32, 15, 14, 2)}
      </g>
      <path d="M26 30l4 4 6-8" opacity="0.6" />
    </>
  ),
  crystal: (
    <>
      <path d="M32 8 54 20v24L32 56 10 44V20z" />
      <path d="M10 20l22 12 22-12M32 32v24" />
      <g fill="currentColor" stroke="none">
        <circle cx="32" cy="8" r="3" />
        <circle cx="54" cy="20" r="3" />
        <circle cx="10" cy="20" r="3" />
        <circle cx="32" cy="32" r="3" />
        <circle cx="54" cy="44" r="3" />
        <circle cx="10" cy="44" r="3" />
        <circle cx="32" cy="56" r="3" />
      </g>
    </>
  ),
  curve: (
    <>
      <path d="M8 8v48h48" />
      <path d="M10 54C16 20 20 14 26 18s12 22 28 30" className="glyph-draw" />
      <g fill="currentColor" stroke="none">
        <circle cx="18" cy="26" r="2.4" />
        <circle cx="26" cy="18" r="2.4" />
        <circle cx="36" cy="30" r="2.4" />
        <circle cx="48" cy="44" r="2.4" />
      </g>
    </>
  ),
}

function ResearchGlyph({ name, className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {glyphs[name]}
    </svg>
  )
}

export default ResearchGlyph
