import Reveal from '../components/common/Reveal'
import lab from '../data/lab.json'
import { trackPointer } from '../utils/pointer'
import styles from './Vision.module.css'

function Vision() {
  return (
    <section id="vision" className={`section section-dark ${styles.vision}`} aria-labelledby="vision-title">
      <div className={styles.orb} aria-hidden="true" />
      <div className="container">
        <Reveal>
          <p className="kicker">02 — Vision</p>
          <h2 id="vision-title" className="visually-hidden">
            Vision, mission and objectives
          </h2>
          <blockquote className={styles.quote}>
            <p>{lab.vision}</p>
          </blockquote>
        </Reveal>

        <div className={styles.columns}>
          <div>
            <Reveal as="h3" className={styles.subhead}>
              Mission
            </Reveal>
            <ul className={styles.mission}>
              {lab.mission.map((m, i) => (
                <Reveal as="li" key={m.title} delay={i * 110}>
                  <div className={styles.card} onPointerMove={trackPointer}>
                    <span className={styles.index}>0{i + 1}</span>
                    <h4>{m.title}</h4>
                    <p>{m.text}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          <div>
            <Reveal as="h3" className={styles.subhead}>
              Objectives
            </Reveal>
            <ol className={styles.objectives}>
              {lab.objectives.map((o, i) => (
                <Reveal as="li" key={o} delay={i * 110}>
                  <span className={styles.bullet} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p>{o}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Vision
