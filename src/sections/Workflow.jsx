import Reveal from '../components/common/Reveal'
import lab from '../data/lab.json'
import { useInView } from '../hooks/useInView'
import styles from './Workflow.module.css'

// Practical activities shown as a pipeline; the connecting line fills in on scroll.
function Workflow() {
  const [ref, inView] = useInView({ threshold: 0.3 })

  return (
    <section id="activities" className="section" aria-labelledby="activities-title">
      <div className="container">
        <Reveal as="header" className={styles.head}>
          <p className="kicker">06 — Practical activities</p>
          <h2 id="activities-title" className="section-title">
            The <span className="gradient-text-ink">bench-to-bedside</span> workflow
          </h2>
          <p className="section-lead">
            Scholars take a formulation from first synthesis through targeting, cellular
            evaluation and validated bioanalysis.
          </p>
        </Reveal>

        <ol ref={ref} className={`${styles.pipeline} ${inView ? styles.run : ''}`}>
          {lab.activities.map((a, i) => (
            <li key={a.title} style={{ '--i': i }}>
              <span className={styles.node} aria-hidden="true">
                {i + 1}
              </span>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Workflow
