import { useRef, useState } from 'react'
import Reveal from '../components/common/Reveal'
import lab from '../data/lab.json'
import styles from './Facilities.module.css'

const W = 300
const H = 110
const gauss = (x, mu, sigma, amp) => amp * Math.exp(-((x - mu) ** 2) / (2 * sigma ** 2))

// An illustrative signal per instrument, in the same order as lab.equipment (x and y in 0–1)
const SIGNALS = [
  (x) => gauss(x, 0.18, 0.018, 0.55) + gauss(x, 0.42, 0.025, 0.95) + gauss(x, 0.7, 0.02, 0.4), // HPLC chromatogram
  (x) => gauss(Math.log(x * 9 + 1), 1.2, 0.28, 0.95), // DLS size distribution
  (x) => 0.9 - 0.75 * (1 - Math.exp(-x * 5)) + 0.04 * Math.sin(x * 40) * Math.exp(-x * 3), // pressure during drying
  (x) => 0.5 + 0.42 * Math.sin(x * 38) * Math.exp(-x * 2.4), // damped cavitation wave
  (x) => 0.92 * (1 - Math.exp(-x * 4.2)), // cumulative drug release
  (x) => gauss(x, 0.3, 0.07, 0.85) + gauss(x, 0.62, 0.1, 0.45) + 0.05, // UV-Vis absorbance
]

const toPath = (fn) =>
  Array.from({ length: 121 }, (_, i) => {
    const x = i / 120
    const y = Math.min(Math.max(fn(x), 0), 1)
    return `${i ? 'L' : 'M'}${(x * W).toFixed(1)} ${(H - 6 - y * (H - 16)).toFixed(1)}`
  }).join(' ')

const PATHS = SIGNALS.map(toPath)

function Facilities() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef([])
  const item = lab.equipment[active]

  // Arrow keys move between tabs (WAI-ARIA tabs pattern)
  const onKeyDown = (e) => {
    const last = lab.equipment.length - 1
    const next = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowDown: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      ArrowUp: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    }[e.key]
    if (next === undefined) return
    e.preventDefault()
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section id="facilities" className="section section-surface" aria-labelledby="facilities-title">
      <div className="container">
        <Reveal as="header" className={styles.head}>
          <p className="kicker">05 — Facilities</p>
          <h2 id="facilities-title" className="section-title">
            From synthesis to <span className="gradient-text-ink">in vivo evaluation</span>
          </h2>
          <p className="section-lead">
            Five dedicated sections cover the full formulation pipeline under one roof.
          </p>
        </Reveal>

        <div className={styles.layout}>
          <Reveal as="ol" className={styles.sections} aria-label="Laboratory sections">
            {lab.labSections.map((s, i) => (
              <li key={s}>
                <span className={styles.sectionNo}>{String(i + 1).padStart(2, '0')}</span>
                {s}
              </li>
            ))}
          </Reveal>

          <Reveal delay={120} className={styles.explorer}>
            <h3 className={styles.explorerTitle}>Instrumentation</h3>
            <div className={styles.tabs} role="tablist" aria-label="Equipment" onKeyDown={onKeyDown}>
              {lab.equipment.map((eq, i) => (
                <button
                  key={eq.short}
                  ref={(el) => {
                    tabRefs.current[i] = el
                  }}
                  type="button"
                  role="tab"
                  id={`eq-tab-${i}`}
                  aria-selected={active === i}
                  aria-controls="eq-panel"
                  tabIndex={active === i ? 0 : -1}
                  className={styles.tab}
                  onClick={() => setActive(i)}
                >
                  {eq.short}
                </button>
              ))}
            </div>

            <div
              id="eq-panel"
              role="tabpanel"
              aria-labelledby={`eq-tab-${active}`}
              className={styles.panel}
              tabIndex={0}
            >
              {/* key restarts the draw-in animation on every switch */}
              <div key={active} className={styles.panelInner}>
                <svg className={styles.trace} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="trace-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#818cf8" stopOpacity="0.35" />
                      <stop offset="1" stopColor="#818cf8" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="trace-stroke" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0" stopColor="#22d3ee" />
                      <stop offset="1" stopColor="#c084fc" />
                    </linearGradient>
                  </defs>
                  <path d={`${PATHS[active]} L${W} ${H} L0 ${H} Z`} fill="url(#trace-fill)" className={styles.area} />
                  <path
                    d={PATHS[active]}
                    fill="none"
                    stroke="url(#trace-stroke)"
                    strokeWidth="2.5"
                    vectorEffect="non-scaling-stroke"
                    pathLength="1"
                    className={styles.line}
                  />
                </svg>
                <h4>{item.name}</h4>
                <p>{item.use}</p>
                <ul className={styles.tags}>
                  {item.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Facilities
