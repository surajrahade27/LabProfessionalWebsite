import Reveal from '../components/common/Reveal'
import lab from '../data/lab.json'
import { resetPointer, trackPointer } from '../utils/pointer'
import styles from './Research.module.css'
import ResearchGlyph from './ResearchGlyph'

function Research() {
  return (
    <section id="research" className="section section-surface" aria-labelledby="research-title">
      <div className="container">
        <Reveal as="header" className={styles.head}>
          <div>
            <p className="kicker">03 — Research thrusts</p>
            <h2 id="research-title" className="section-title">
              Nano-architectures built to <span className="gradient-text-ink">cross biological barriers</span>
            </h2>
          </div>
          <p className="section-lead">
            Six connected platforms that solve the solubility, permeability and toxicity limits
            of challenging therapeutics, from design through to pharmacokinetic modeling.
          </p>
        </Reveal>

        <ul className={styles.grid}>
          {lab.research.map((r, i) => (
            <Reveal as="li" key={r.title} delay={(i % 3) * 100} className={styles.item}>
              <div className={styles.card} onPointerMove={trackPointer} onPointerLeave={resetPointer}>
                <span className={styles.number}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.glyphWrap}>
                  <ResearchGlyph name={r.glyph} className={styles.glyph} />
                </span>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className={styles.applications}>
          <div>
            <h3 className={styles.appTitle}>Therapeutic focus</h3>
            <ul className={styles.pills}>
              {lab.therapeuticAreas.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={styles.appTitle}>Non-invasive delivery routes</h3>
            <ul className={styles.pills}>
              {lab.deliveryRoutes.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Research
