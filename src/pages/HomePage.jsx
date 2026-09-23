import { useState } from 'react'
import CountUp from '../components/common/CountUp'
import Icon from '../components/common/Icon'
import Reveal from '../components/common/Reveal'
import packages from '../data/packages.json'
import site from '../data/site.json'
import tests from '../data/tests.json'
import PackageCard from '../features/packages/PackageCard'
import TestCard from '../features/tests/TestCard'
import { phoneLink, whatsappLink } from '../utils/links'
import { resetPointer, trackPointer } from '../utils/pointer'
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

const REPORT_ROWS = [
  ['Haemoglobin', 82],
  ['Blood sugar (HbA1c)', 64],
  ['Cholesterol', 71],
  ['Thyroid (TSH)', 58],
]

const popularTests = tests.filter((t) => t.popular)
const categories = ['All', ...new Set(popularTests.map((t) => t.category))]

// Last sentence of the tagline gets the gradient highlight
const taglineParts = site.tagline.match(/[^.]+\.?/g) ?? [site.tagline]
const taglineLead = taglineParts.slice(0, -1).join('')
const taglineHighlight = taglineParts.at(-1).trim()

function HomePage() {
  const [category, setCategory] = useState('All')
  const visibleTests =
    category === 'All' ? popularTests : popularTests.filter((t) => t.category === category)

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroBg} aria-hidden="true">
          <span className={`${styles.blob} ${styles.blobA}`} />
          <span className={`${styles.blob} ${styles.blobB}`} />
          <span className={`${styles.blob} ${styles.blobC}`} />
        </div>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              <span className={styles.liveDot} />
              {site.accreditations.join(' · ')} accredited lab
            </p>
            <h1 id="hero-title" className={styles.heroTitle}>
              {taglineLead} <span className="gradient-text">{taglineHighlight}</span>
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
                <Icon name="arrow" size={18} />
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
          <div
            className={styles.heroVisual}
            aria-hidden="true"
            onPointerMove={trackPointer}
            onPointerLeave={resetPointer}
          >
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
              {REPORT_ROWS.map(([label, value], i) => (
                <div key={label} className={styles.reportRow}>
                  <span>{label}</span>
                  <span className={styles.bar}>
                    <span style={{ width: `${value}%`, animationDelay: `${600 + i * 150}ms` }} />
                  </span>
                  <span className={styles.normal}>Normal</span>
                </div>
              ))}
            </div>
            <div className={styles.floatBadge}>
              <Icon name="home" size={20} />
              Sample collected at home
            </div>
            <div className={styles.floatChip}>
              <span className={styles.chipIcon}>
                <Icon name="chat" size={16} />
              </span>
              Sent on WhatsApp
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────── */}
      <section className={styles.stats} aria-label="Our numbers">
        <ul className={`container ${styles.statsGrid}`}>
          {site.stats.map((s) => (
            <li key={s.label}>
              <p className={styles.statValue}>
                <CountUp value={s.value} />
              </p>
              <p className={styles.statLabel}>{s.label}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Why us ───────────────────────────────────────────── */}
      <section id="why-us" className={styles.section} aria-labelledby="why-title">
        <div className="container">
          <Reveal as="header" className={styles.sectionHead}>
            <p className={styles.kicker}>Why choose us</p>
            <h2 id="why-title">Care you can trust, results you can rely on</h2>
          </Reveal>
          <ul className={styles.features}>
            {FEATURES.map((f, i) => (
              <Reveal
                as="li"
                key={f.title}
                delay={i * 90}
                className={styles.feature}
                onPointerMove={trackPointer}
              >
                <span className={styles.featureIcon}>
                  <Icon name={f.icon} />
                </span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </Reveal>
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
          <Reveal as="header" className={styles.sectionHead}>
            <p className={styles.kicker}>Popular tests</p>
            <h2 id="tests-title">Most booked tests</h2>
            <p>Prices include home sample collection. Can’t find your test? Just ask us.</p>
          </Reveal>
          <Reveal className={styles.filters} role="group" aria-label="Filter tests by category">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                className={styles.chip}
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </Reveal>
          <Reveal className={styles.testGrid} aria-live="polite">
            {visibleTests.map((t, i) => (
              <TestCard key={`${category}-${t.slug}`} test={t} index={i} />
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Packages ─────────────────────────────────────────── */}
      <section id="packages" className={styles.section} aria-labelledby="packages-title">
        <div className="container">
          <Reveal as="header" className={styles.sectionHead}>
            <p className={styles.kicker}>Health packages</p>
            <h2 id="packages-title">Complete checkups at a better price</h2>
          </Reveal>
          <div className={styles.packageGrid}>
            {packages.map((p, i) => (
              <Reveal key={p.slug} delay={i * 120} className={styles.packageItem}>
                <PackageCard pkg={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.surface}`} aria-labelledby="steps-title">
        <div className="container">
          <Reveal as="header" className={styles.sectionHead}>
            <p className={styles.kicker}>How it works</p>
            <h2 id="steps-title">Your report in three simple steps</h2>
          </Reveal>
          <ol className={styles.steps}>
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 150} className={styles.step}>
                <span className={styles.stepNumber}>{i + 1}</span>
                <span className={styles.featureIcon}>
                  <Icon name={s.icon} />
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Contact CTA ──────────────────────────────────────── */}
      <section id="contact" className={styles.section} aria-labelledby="contact-title">
        <div className="container">
          <Reveal className={styles.cta}>
            <span className={styles.ctaGlow} aria-hidden="true" />
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
          </Reveal>
        </div>
      </section>
    </>
  )
}

export default HomePage
