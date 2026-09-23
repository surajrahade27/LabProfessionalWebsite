import Icon from '../components/common/Icon'
import packages from '../data/packages.json'
import site from '../data/site.json'
import tests from '../data/tests.json'
import PackageCard from '../features/packages/PackageCard'
import TestCard from '../features/tests/TestCard'
import { phoneLink, whatsappLink } from '../utils/links'
import styles from './HomePage.module.css'

const FEATURES = [
  {
    icon: 'home',
    title: 'Free home collection',
    text: 'A trained phlebotomist visits your home at a time that suits you.',
  },
  {
    icon: 'clock',
    title: 'Fast, on-time reports',
    text: 'Most reports are ready the same day, sent straight to WhatsApp and email.',
  },
  {
    icon: 'shield',
    title: 'Accredited & accurate',
    text: `${site.accreditations.join(' & ')} certified processes, checked by experienced pathologists.`,
  },
  {
    icon: 'wallet',
    title: 'Honest pricing',
    text: 'Clear prices up front and health packages that save you money.',
  },
]

const STEPS = [
  {
    icon: 'calendar',
    title: 'Book',
    text: 'Call, WhatsApp or pick a test below. Choose home collection or a lab visit.',
  },
  {
    icon: 'drop',
    title: 'Give your sample',
    text: 'A quick, hygienic sample collection with single-use, sealed kits.',
  },
  {
    icon: 'report',
    title: 'Get your report',
    text: 'Receive a digital report on WhatsApp and email. Our doctors can explain it.',
  },
]

const popularTests = tests.filter((t) => t.popular)

function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={`container ${styles.heroGrid}`}>
          <div>
            <p className={styles.eyebrow}>
              <Icon name="shield" size={16} />
              {site.accreditations.join(' · ')} accredited lab
            </p>
            <h1 id="hero-title" className={styles.heroTitle}>
              {site.tagline}
            </h1>
            <p className={styles.heroText}>{site.intro}</p>
            <div className={styles.heroActions}>
              <a
                href={whatsappLink('Hi, I would like to book a home sample collection.')}
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="home" />
                Book home collection
              </a>
              <a href={phoneLink} className="btn btn-outline">
                <Icon name="phone" />
                Call {site.phoneDisplay}
              </a>
            </div>
            <ul className={styles.heroPoints}>
              <li>
                <Icon name="check" size={18} /> No extra charge for home visits
              </li>
              <li>
                <Icon name="check" size={18} /> Reports on WhatsApp
              </li>
            </ul>
          </div>

          {/* Decorative sample report card */}
          <div className={styles.heroVisual} aria-hidden="true">
            <div className={styles.reportCard}>
              <div className={styles.reportHead}>
                <span className={styles.reportIcon}>
                  <Icon name="report" />
                </span>
                <div>
                  <p className={styles.reportTitle}>Full Body Checkup</p>
                  <p className={styles.reportSub}>Report ready · Today, 6:30 PM</p>
                </div>
              </div>
              {[
                ['Haemoglobin', 82],
                ['Blood sugar (HbA1c)', 64],
                ['Cholesterol', 71],
                ['Thyroid (TSH)', 58],
              ].map(([label, value]) => (
                <div key={label} className={styles.reportRow}>
                  <span>{label}</span>
                  <span className={styles.bar}>
                    <span style={{ width: `${value}%` }} />
                  </span>
                  <span className={styles.normal}>Normal</span>
                </div>
              ))}
            </div>
            <div className={styles.floatBadge}>
              <Icon name="home" size={20} />
              Sample collected at home
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────── */}
      <section className={styles.stats} aria-label="Our numbers">
        <ul className={`container ${styles.statsGrid}`}>
          {site.stats.map((s) => (
            <li key={s.label}>
              <p className={styles.statValue}>{s.value}</p>
              <p className={styles.statLabel}>{s.label}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Why us ───────────────────────────────────────────── */}
      <section id="why-us" className={styles.section} aria-labelledby="why-title">
        <div className="container">
          <header className={styles.sectionHead}>
            <p className={styles.kicker}>Why choose us</p>
            <h2 id="why-title">Care you can trust, results you can rely on</h2>
          </header>
          <ul className={styles.features}>
            {FEATURES.map((f) => (
              <li key={f.title} className={styles.feature}>
                <span className={styles.featureIcon}>
                  <Icon name={f.icon} />
                </span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Popular tests ────────────────────────────────────── */}
      <section
        id="tests"
        className={`${styles.section} ${styles.surface}`}
        aria-labelledby="tests-title"
      >
        <div className="container">
          <header className={styles.sectionHead}>
            <p className={styles.kicker}>Popular tests</p>
            <h2 id="tests-title">Most booked tests</h2>
            <p>Prices include home sample collection. Can’t find your test? Just ask us.</p>
          </header>
          <div className={styles.testGrid}>
            {popularTests.map((t) => (
              <TestCard key={t.slug} test={t} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Packages ─────────────────────────────────────────── */}
      <section id="packages" className={styles.section} aria-labelledby="packages-title">
        <div className="container">
          <header className={styles.sectionHead}>
            <p className={styles.kicker}>Health packages</p>
            <h2 id="packages-title">Complete checkups at a better price</h2>
          </header>
          <div className={styles.packageGrid}>
            {packages.map((p) => (
              <PackageCard key={p.slug} pkg={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.surface}`} aria-labelledby="steps-title">
        <div className="container">
          <header className={styles.sectionHead}>
            <p className={styles.kicker}>How it works</p>
            <h2 id="steps-title">Your report in three simple steps</h2>
          </header>
          <ol className={styles.steps}>
            {STEPS.map((s, i) => (
              <li key={s.title} className={styles.step}>
                <span className={styles.stepNumber}>{i + 1}</span>
                <span className={styles.featureIcon}>
                  <Icon name={s.icon} />
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Contact CTA ──────────────────────────────────────── */}
      <section id="contact" className={styles.section} aria-labelledby="contact-title">
        <div className="container">
          <div className={styles.cta}>
            <div>
              <h2 id="contact-title">Book your test today</h2>
              <p>
                Message us on WhatsApp or call. We’ll confirm your slot and
                answer any questions about tests or preparation.
              </p>
              <div className={styles.heroActions}>
                <a
                  href={whatsappLink('Hi, I would like to book a test.')}
                  className={`btn ${styles.ctaPrimary}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon name="chat" />
                  WhatsApp us
                </a>
                <a href={phoneLink} className={`btn ${styles.ctaOutline}`}>
                  <Icon name="phone" />
                  {site.phoneDisplay}
                </a>
              </div>
            </div>

            <ul className={styles.contactList}>
              <li>
                <Icon name="pin" />
                <span>
                  {site.address}
                  <br />
                  <a href={site.mapUrl} target="_blank" rel="noreferrer">
                    Get directions
                  </a>
                </span>
              </li>
              <li>
                <Icon name="clock" />
                <span>
                  {site.hours.map((h) => (
                    <span key={h.days} className={styles.hoursRow}>
                      {h.days}: {h.time}
                    </span>
                  ))}
                </span>
              </li>
              <li>
                <Icon name="mail" />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
