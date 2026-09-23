import Icon from '../components/common/Icon'
import Reveal from '../components/common/Reveal'
import lab from '../data/lab.json'
import Marquee from './Marquee'
import styles from './Recognition.module.css'

function Recognition() {
  return (
    <section id="recognition" className="section section-surface" aria-labelledby="recognition-title">
      <div className="container">
        <Reveal as="header" className={styles.head}>
          <p className="kicker">07 — Recognition</p>
          <h2 id="recognition-title" className="section-title">
            Accredited institute, <span className="gradient-text-ink">award-winning research</span>
          </h2>
        </Reveal>

        <div className={styles.layout}>
          <div>
            <Reveal as="h3" className={styles.subhead}>
              Certifications & accreditations
            </Reveal>
            <ul className={styles.accreditations}>
              {lab.accreditations.map((a, i) => (
                <Reveal as="li" key={a.title} delay={i * 100}>
                  <span className={styles.shield}>
                    <Icon name="shield" />
                  </span>
                  <div>
                    <h4>{a.title}</h4>
                    <p>{a.text}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          <div>
            <Reveal as="h3" className={styles.subhead}>
              Achievements & awards
            </Reveal>
            <ul className={styles.achievements}>
              {lab.achievements.map((a, i) => (
                <Reveal as="li" key={a.title} delay={i * 100}>
                  <div className={styles.achievement}>
                    <span className={styles.achIcon}>
                      <Icon name={a.icon} />
                    </span>
                    <h4>{a.title}</h4>
                    <p>{a.text}</p>
                    {a.icon === 'award' && (
                      <ul className={styles.funders} aria-label="Funding agencies">
                        {lab.funders.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Reveal className={styles.journals}>
        <p className={`container ${styles.journalsLabel}`}>Published in journals including</p>
        <Marquee items={lab.journals} label="Journals the lab has published in" className={styles.journalMarquee} />
      </Reveal>
    </section>
  )
}

export default Recognition
