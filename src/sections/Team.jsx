import Icon from '../components/common/Icon'
import Reveal from '../components/common/Reveal'
import lab from '../data/lab.json'
import piPhoto from '../assets/pi-neelesh-mehra.jpg'
import styles from './Team.module.css'

// The PI card links to academic profiles only
const PROFILE_LINKS = lab.links.filter((l) => l.icon === 'scholar' || l.icon === 'rg')

function Team() {
  const { pi } = lab

  return (
    <section id="team" className="section" aria-labelledby="team-title">
      <div className="container">
        <Reveal as="header" className={styles.head}>
          <p className="kicker">04 — People</p>
          <h2 id="team-title" className="section-title">
            Led by <span className="gradient-text-ink">{pi.name}</span>
          </h2>
        </Reveal>

        <Reveal className={styles.pi}>
          <div className={styles.portrait}>
            <span className={styles.halo} aria-hidden="true" />
            <img
              className={styles.photo}
              src={piPhoto}
              alt={`Portrait of ${pi.name}`}
              width="367"
              height="444"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className={styles.piBody}>
            <p className={styles.role}>Principal Investigator</p>
            <h3 className={styles.piName}>{pi.name}</h3>
            <p className={styles.credentials}>
              {pi.credentials} · {pi.role}
            </p>
            <p className={styles.recognition}>
              <Icon name="star" size={18} />
              {pi.recognition}
            </p>

            <h4 className={styles.label}>Expertise</h4>
            <ul className={styles.expertise}>
              {pi.expertise.map((e) => (
                <li key={e} className="tag">
                  {e}
                </li>
              ))}
            </ul>

            <div className={styles.links}>
              {PROFILE_LINKS.map((l) => (
                <a key={l.url} href={l.url} className="btn btn-outline" target="_blank" rel="noreferrer">
                  <Icon name={l.icon} />
                  {l.label}
                  <Icon name="external" size={16} />
                </a>
              ))}
              <a href={`mailto:${lab.contact.email}`} className="btn btn-primary">
                <Icon name="mail" />
                Email the PI
              </a>
            </div>
          </div>
        </Reveal>

        <div className={styles.groupsHead}>
          <Reveal as="h3">Research team</Reveal>
          <Reveal as="p" delay={80}>
            Member profiles are coming soon.
          </Reveal>
        </div>
        <ul className={styles.groups}>
          {lab.teamGroups.map((g, i) => (
            <Reveal as="li" key={g.title} delay={i * 90}>
              <div className={styles.group}>
                <span className={styles.groupIcon}>
                  <Icon name={g.icon} />
                </span>
                <h4>{g.title}</h4>
                <p>{g.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Team
