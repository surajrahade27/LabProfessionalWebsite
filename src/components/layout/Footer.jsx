import site from '../../data/site.json'
import { phoneLink } from '../../utils/links'
import styles from './Footer.module.css'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <p className={styles.brand}>{site.name}</p>
          <p className={styles.muted}>{site.tagline}</p>
          <p className={styles.badges}>
            {site.accreditations.map((a) => (
              <span key={a}>{a}</span>
            ))}
          </p>
        </div>

        <div>
          <h2 className={styles.heading}>Contact</h2>
          <ul className={styles.list}>
            <li>
              <a href={phoneLink}>{site.phoneDisplay}</a>
            </li>
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li className={styles.muted}>{site.address}</li>
          </ul>
        </div>

        <div>
          <h2 className={styles.heading}>Timings</h2>
          <ul className={styles.list}>
            {site.hours.map((h) => (
              <li key={h.days}>
                <span className={styles.muted}>{h.days}:</span> {h.time}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>
          © {year} {site.name}. All rights reserved.
        </p>
        <p>Reports should be interpreted by a qualified doctor.</p>
      </div>
    </footer>
  )
}

export default Footer
