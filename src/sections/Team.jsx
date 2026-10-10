import { useRef, useState } from 'react'
import CountUp from '../components/common/CountUp'
import Icon from '../components/common/Icon'
import Reveal from '../components/common/Reveal'
import lab from '../data/lab.json'
import piPhoto from '../assets/pi-neelesh-mehra.jpg'
import styles from './Team.module.css'

// The PI card links to academic profiles only
const PROFILE_LINKS = lab.links.filter((l) => l.icon === 'scholar' || l.icon === 'rg')

// Member photos live in src/assets/team/<slug>.jpg; lab.json refers to them by slug
const PHOTOS = Object.fromEntries(
  Object.entries(import.meta.glob('../assets/team/*.jpg', { eager: true, import: 'default' })).map(
    ([path, url]) => [path.split('/').pop().replace('.jpg', ''), url],
  ),
)

// "Mr. Sri Pada Datta" → "SD", shown when a member has no photo yet
function initials(name) {
  const words = name.replace(/^(Dr|Mr|Ms|Mrs)\.\s+/, '').split(/\s+/)
  return (words[0][0] + (words.length > 1 ? words.at(-1)[0] : '')).toUpperCase()
}

function ProfileCard({ icon, title, children }) {
  return (
    <div className={styles.card}>
      <h4 className={styles.cardTitle}>
        <span className={styles.cardIcon}>
          <Icon name={icon} size={20} />
        </span>
        {title}
      </h4>
      {children}
    </div>
  )
}

function PiProfile({ pi }) {
  const cards = [
    {
      icon: 'cap',
      title: 'Education',
      body: (
        <ol className={styles.timeline}>
          {pi.education.map((e) => (
            <li key={e.degree}>
              <span className={styles.year}>{e.year}</span>
              <p className={styles.degree}>
                {e.degree} · {e.discipline}
              </p>
              <p className={styles.institution}>{e.institution}</p>
            </li>
          ))}
        </ol>
      ),
    },
    {
      icon: 'flask',
      title: 'Research areas',
      body: (
        <ul className={styles.list}>
          {pi.researchAreas.map((a) => (
            <li key={a}>
              <Icon name="check" size={16} />
              {a}
            </li>
          ))}
        </ul>
      ),
    },
    {
      icon: 'award',
      title: 'Key awards & honours',
      body: (
        <ul className={styles.list}>
          {pi.awards.map((a) => (
            <li key={a}>
              <Icon name="star" size={16} />
              {a}
            </li>
          ))}
        </ul>
      ),
    },
    {
      icon: 'bulb',
      title: 'Patents & grants',
      body: (
        <>
          <ul className={styles.figures} aria-label="Patents">
            {pi.patents.map((p) => (
              <li key={p.label}>
                <strong>{p.value}</strong>
                <span>{p.label}</span>
              </li>
            ))}
          </ul>
          <ul className={styles.grants}>
            {pi.grants.map((g) => (
              <li key={g.label}>
                <strong>{g.value}</strong> {g.label}
                <span className={styles.amount}>{g.amount}</span>
              </li>
            ))}
          </ul>
        </>
      ),
    },
    {
      icon: 'users',
      title: 'Students mentored',
      body: (
        <table className={styles.mentorship}>
          <thead>
            <tr>
              <td />
              <th scope="col">Awarded</th>
              <th scope="col">Ongoing</th>
            </tr>
          </thead>
          <tbody>
            {pi.mentorship.map((m) => (
              <tr key={m.level}>
                <th scope="row">{m.level}</th>
                <td>{m.awarded}</td>
                <td>{m.ongoing}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ),
    },
    {
      icon: 'building',
      title: 'Institutional responsibilities',
      body: (
        <ul className={styles.list}>
          {pi.responsibilities.map((r) => (
            <li key={r}>
              <Icon name="check" size={16} />
              {r}
            </li>
          ))}
        </ul>
      ),
    },
  ]

  return (
    <ul className={styles.profile}>
      {cards.map((c, i) => (
        <Reveal as="li" key={c.title} delay={(i % 3) * 90}>
          <ProfileCard icon={c.icon} title={c.title}>
            {c.body}
          </ProfileCard>
        </Reveal>
      ))}
    </ul>
  )
}

function MemberCard({ member }) {
  const photo = PHOTOS[member.photo]

  return (
    <li className={styles.member}>
      {photo ? (
        <img
          className={styles.memberPhoto}
          src={photo}
          alt={`Portrait of ${member.name}`}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span className={`${styles.memberPhoto} ${styles.initials}`} aria-hidden="true">
          {initials(member.name)}
        </span>
      )}
      <div className={styles.memberBody}>
        <h4>{member.name}</h4>
        <p className={styles.position}>{member.position}</p>
        {member.organization && <p className={styles.organization}>{member.organization}</p>}
        {member.focus && (
          <p className={styles.focus}>
            <span className="visually-hidden">Research focus: </span>
            {member.focus}
          </p>
        )}
      </div>
    </li>
  )
}

// Doctoral scholars / master's scholars / alumni as an accessible tab set
function TeamTabs({ groups }) {
  const [active, setActive] = useState(groups[0].id)
  const tabs = useRef([])

  const onKeyDown = (e, i) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key]
    let next
    if (step) next = (i + step + groups.length) % groups.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = groups.length - 1
    else return
    e.preventDefault()
    setActive(groups[next].id)
    tabs.current[next].focus()
  }

  return (
    <>
      <div className={styles.tabs} role="tablist" aria-label="Research team">
        {groups.map((g, i) => {
          const selected = g.id === active
          return (
            <button
              key={g.id}
              ref={(el) => (tabs.current[i] = el)}
              type="button"
              role="tab"
              id={`team-tab-${g.id}`}
              aria-controls={`team-panel-${g.id}`}
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              className={styles.tab}
              onClick={() => setActive(g.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              <Icon name={g.icon} size={18} />
              {g.title}
              <span className={styles.count}>{g.members.length}</span>
            </button>
          )
        })}
      </div>

      {groups.map((g) => (
        <div
          key={g.id}
          role="tabpanel"
          id={`team-panel-${g.id}`}
          aria-labelledby={`team-tab-${g.id}`}
          className={styles.panel}
          hidden={g.id !== active}
        >
          <p className={styles.panelLead}>{g.description}</p>
          <ul className={styles.members}>
            {g.members.map((m) => (
              <MemberCard key={m.name} member={m} />
            ))}
          </ul>
        </div>
      ))}
    </>
  )
}

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
            <p className={styles.meta}>
              {pi.experience} · {pi.lab}, {lab.shortName}
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

          <ul className={styles.metrics} aria-label="Research output">
            {pi.metrics.map((m) => (
              <li key={m.label}>
                <p className={styles.metricValue}>
                  <CountUp value={m.value} />
                </p>
                <p className={styles.metricLabel}>
                  {m.label}
                  {m.note && <span>{m.note}</span>}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        <PiProfile pi={pi} />

        <div className={styles.groupsHead}>
          <Reveal as="h3">Research team</Reveal>
          <Reveal as="p" delay={80}>
            The scholars of {pi.lab} and the alumni who trained here.
          </Reveal>
        </div>
        <Reveal>
          <TeamTabs groups={lab.team} />
        </Reveal>
      </div>
    </section>
  )
}

export default Team
