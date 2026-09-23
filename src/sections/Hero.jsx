import CountUp from '../components/common/CountUp'
import Icon from '../components/common/Icon'
import NanoField from '../components/common/NanoField'
import lab from '../data/lab.json'
import { resetPointer, trackPointer } from '../utils/pointer'
import styles from './Hero.module.css'
import NanoCarrier from './NanoCarrier'

// Labels orbiting the nanocarrier, taken from the research platforms
const ORBIT_CHIPS = ['Dendrimers', 'Carbon nanotubes', 'Lipid hybrids', 'Transferosomes']

function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <NanoField className={styles.canvas} />
      <div className={styles.glow} aria-hidden="true" />

      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <span className={styles.pulse} />
            {lab.instituteShort} · {lab.department}
          </p>
          <h1 id="hero-title" className={styles.title}>
            {lab.headline.lead} <span className="gradient-text">{lab.headline.highlight}</span>
          </h1>
          <p className={styles.intro}>{lab.intro}</p>
          <div className={styles.actions}>
            <a href="#research" className="btn btn-primary">
              Explore our research
              <Icon name="arrow" size={18} />
            </a>
            <a href="#team" className="btn btn-ghost">
              Meet the PI
            </a>
          </div>
        </div>

        <div
          className={styles.visual}
          aria-hidden="true"
          onPointerMove={trackPointer}
          onPointerLeave={resetPointer}
        >
          <div className={styles.tilt}>
            <div className={styles.ring} />
            <div className={`${styles.ring} ${styles.ringOuter}`} />
            <NanoCarrier className={styles.carrier} />
            {ORBIT_CHIPS.map((chip, i) => (
              <span key={chip} className={styles.chip} style={{ '--i': i }}>
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <ul className={styles.stats} aria-label="The lab at a glance">
          {lab.stats.map((s) => (
            <li key={s.label}>
              <p className={styles.statValue}>
                <CountUp value={s.value} />
              </p>
              <p className={styles.statLabel}>{s.label}</p>
            </li>
          ))}
        </ul>
      </div>

      <a href="#about" className={styles.scrollCue} aria-label="Scroll to About">
        <span />
      </a>
    </section>
  )
}

export default Hero
