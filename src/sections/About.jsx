import Icon from '../components/common/Icon'
import Reveal from '../components/common/Reveal'
import lab from '../data/lab.json'
import styles from './About.module.css'

const DISCIPLINES = [
  { label: 'Material science', cx: 150, cy: 118 },
  { label: 'Nanotechnology', cx: 108, cy: 190 },
  { label: 'Biopharmaceutics', cx: 192, cy: 190 },
]

// Three overlapping fields with the lab at their intersection
function InterfaceDiagram() {
  return (
    <figure className={styles.diagram}>
      <svg viewBox="0 0 300 300" role="img" aria-labelledby="interface-caption">
        {DISCIPLINES.map((d, i) => (
          <circle key={d.label} cx={d.cx} cy={d.cy} r="78" className={styles.circle} style={{ '--i': i }} />
        ))}
        <text x="150" y="84" className={styles.circleLabel}>
          Material
        </text>
        <text x="150" y="100" className={styles.circleLabel}>
          science
        </text>
        <text x="70" y="222" className={styles.circleLabel}>
          Nano-
        </text>
        <text x="70" y="238" className={styles.circleLabel}>
          technology
        </text>
        <text x="230" y="222" className={styles.circleLabel}>
          Bio-
        </text>
        <text x="230" y="238" className={styles.circleLabel}>
          pharmaceutics
        </text>
        <circle cx="150" cy="166" r="24" className={styles.core} />
        <text x="150" y="171" className={styles.coreLabel}>
          PNRL
        </text>
      </svg>
      <figcaption id="interface-caption">
        PNRL works where material science, nanotechnology and biopharmaceutics overlap.
      </figcaption>
    </figure>
  )
}

function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className={`container ${styles.grid}`}>
        <Reveal>
          <p className="kicker">01 — About the lab</p>
          <h2 id="about-title" className="section-title">
            Where material science meets <span className="gradient-text-ink">biopharmaceutics</span>
          </h2>
          <div className={styles.body}>
            {lab.about.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <InterfaceDiagram />
        </Reveal>
      </div>

      <div className="container">
        <Reveal className={styles.history}>
          <div className={styles.historyText}>
            <p className="kicker">Our story</p>
            <h3>A specialised centre for targeted formulation science</h3>
            <p>{lab.history}</p>
          </div>
          <ul className={styles.highlights}>
            {lab.historyHighlights.map((h, i) => (
              <Reveal as="li" key={h.text} delay={i * 100}>
                <span className={styles.highlightIcon}>
                  <Icon name={h.icon} size={22} />
                </span>
                {h.text}
              </Reveal>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

export default About
