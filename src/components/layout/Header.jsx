import { useEffect, useState } from 'react'
import lab from '../../data/lab.json'
import { useActiveSection } from '../../hooks/useActiveSection'
import Icon from '../common/Icon'
import Logo from '../common/Logo'
import styles from './Header.module.css'

// Section anchors on the homepage. Becomes route links once React Router is added.
const NAV = [
  { href: '#about', label: 'About' },
  { href: '#research', label: 'Research' },
  { href: '#team', label: 'Team' },
  { href: '#facilities', label: 'Facilities' },
  { href: '#recognition', label: 'Recognition' },
]

const SECTION_IDS = [...NAV.map((item) => item.href.slice(1)), 'contact']

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(SECTION_IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu with the Escape key
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Light text while floating over the dark hero, dark text once the bar turns solid
  const solid = scrolled || open

  return (
    <header className={`${styles.header} ${solid ? styles.solid : ''}`}>
      <span className={styles.progress} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.logo} aria-label={`${lab.shortName} – back to top`}>
          <Logo className={styles.logoMark} />
          <span className={styles.logoText}>
            <strong>{lab.shortName}</strong>
            <small>{lab.instituteShort}</small>
          </span>
        </a>

        <nav
          id="main-nav"
          className={`${styles.nav} ${open ? styles.navOpen : ''}`}
          aria-label="Main"
        >
          <ul className={styles.links}>
            {NAV.map((item) => {
              const isActive = active === item.href.slice(1)
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={isActive ? styles.active : undefined}
                    aria-current={isActive ? 'location' : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
          <a href="#contact" className={`btn btn-primary ${styles.cta}`} onClick={() => setOpen(false)}>
            Get in touch
            <Icon name="arrow" size={18} />
          </a>
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
