import lab from '../../data/lab.json'
import Icon from '../common/Icon'
import Logo from '../common/Logo'
import styles from './Footer.module.css'

const QUICK_LINKS = [
  { href: '#about', label: 'About the lab' },
  { href: '#vision', label: 'Vision & mission' },
  { href: '#research', label: 'Research' },
  { href: '#team', label: 'Team' },
  { href: '#facilities', label: 'Facilities' },
  { href: '#contact', label: 'Contact' },
]

function Footer() {
  const year = new Date().getFullYear()
  const { contact } = lab

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brandCol}>
          <p className={styles.brand}>
            <Logo size={44} />
            <span>
              <strong>{lab.shortName}</strong>
              <small>{lab.name}</small>
            </span>
          </p>
          <p className={styles.muted}>
            {lab.department}, {lab.institute}.
          </p>
          <ul className={styles.social}>
            {lab.links.map((l) => (
              <li key={l.url}>
                <a href={l.url} target="_blank" rel="noreferrer" aria-label={l.label} title={l.label}>
                  <Icon name={l.icon} size={20} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer">
          <h2 className={styles.heading}>Explore</h2>
          <ul className={styles.list}>
            {QUICK_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={styles.heading}>Contact</h2>
          <ul className={styles.list}>
            <li>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            {contact.phones.map((p) => (
              <li key={p.tel}>
                <a href={`tel:${p.tel}`}>{p.display}</a>
              </li>
            ))}
            <li className={styles.muted}>Balanagar, Hyderabad 500037</li>
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>
          © {year} {lab.shortName}, {lab.instituteShort}. All rights reserved.
        </p>
        <a href="#top" className={styles.toTop}>
          Back to top <Icon name="up" size={16} />
        </a>
      </div>
    </footer>
  )
}

export default Footer
