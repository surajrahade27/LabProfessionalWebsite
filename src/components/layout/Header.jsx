import { useEffect, useState } from 'react'
import site from '../../data/site.json'
import { phoneLink, whatsappLink } from '../../utils/links'
import Icon from '../common/Icon'
import styles from './Header.module.css'

// Section anchors on the homepage. Becomes route links once React Router is added.
const NAV = [
  { href: '#tests', label: 'Tests' },
  { href: '#packages', label: 'Packages' },
  { href: '#why-us', label: 'Why us' },
  { href: '#contact', label: 'Contact' },
]

function Header() {
  const [open, setOpen] = useState(false)

  // Close the mobile menu with the Escape key
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.logo}>
          <span className={styles.logoMark}>
            <Icon name="flask" size={22} />
          </span>
          {site.name}
        </a>

        <nav
          id="main-nav"
          className={`${styles.nav} ${open ? styles.navOpen : ''}`}
          aria-label="Main"
        >
          <ul className={styles.links}>
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.actions}>
            <a href={phoneLink} className={styles.phone}>
              <Icon name="phone" size={18} />
              {site.phoneDisplay}
            </a>
            <a
              href={whatsappLink('Hi, I would like to book a test.')}
              className="btn btn-primary"
              target="_blank"
              rel="noreferrer"
            >
              Book a test
            </a>
          </div>
        </nav>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>
    </header>
  )
}

export default Header
