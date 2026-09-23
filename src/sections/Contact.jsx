import Icon from '../components/common/Icon'
import Reveal from '../components/common/Reveal'
import lab from '../data/lab.json'
import styles from './Contact.module.css'

const { contact } = lab
const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(contact.mapEmbedQuery)}&z=15&output=embed`

function Contact() {
  return (
    <section id="contact" className={`section section-dark ${styles.contact}`} aria-labelledby="contact-title">
      <div className={styles.glow} aria-hidden="true" />
      <div className="container">
        <Reveal as="header" className={styles.head}>
          <p className="kicker">08 — Contact</p>
          <h2 id="contact-title" className="section-title">
            Collaborate, study or <span className="gradient-text">visit the lab</span>
          </h2>
          <p className="section-lead">
            For research collaborations, industry partnerships or M.S. (Pharm.) and Ph.D.
            enquiries, get in touch with the PI directly.
          </p>
          <div className={styles.actions}>
            <a href={`mailto:${contact.email}`} className="btn btn-primary">
              <Icon name="mail" />
              {contact.email}
            </a>
            <a href={`tel:${contact.phones[0].tel}`} className="btn btn-ghost">
              <Icon name="phone" />
              Call the office
            </a>
          </div>
        </Reveal>

        <div className={styles.grid}>
          <div className={styles.cards}>
            <Reveal className={styles.card}>
              <span className={styles.icon}>
                <Icon name="pin" />
              </span>
              <h3>Address</h3>
              <address>
                {contact.address.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
              <a href={contact.mapUrl} target="_blank" rel="noreferrer" className={styles.link}>
                Get directions <Icon name="arrow" size={16} />
              </a>
            </Reveal>

            <Reveal delay={80} className={styles.card}>
              <span className={styles.icon}>
                <Icon name="phone" />
              </span>
              <h3>Phone</h3>
              <ul>
                {contact.phones.map((p) => (
                  <li key={p.tel}>
                    <span className={styles.label}>{p.label}</span>
                    <a href={`tel:${p.tel}`}>{p.display}</a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={160} className={styles.card}>
              <span className={styles.icon}>
                <Icon name="clock" />
              </span>
              <h3>Working hours</h3>
              <ul>
                {contact.hours.map((h) => (
                  <li key={h.days}>
                    <span className={styles.label}>{h.days}</span>
                    {h.time}
                  </li>
                ))}
              </ul>
              <p className={styles.note}>{contact.hoursNote}</p>
            </Reveal>

            <Reveal delay={240} className={styles.card}>
              <span className={styles.icon}>
                <Icon name="globe" />
              </span>
              <h3>Online</h3>
              <ul className={styles.online}>
                {lab.links.map((l) => (
                  <li key={l.url}>
                    <a href={l.url} target="_blank" rel="noreferrer">
                      <Icon name={l.icon} size={18} />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={120} className={styles.map}>
            <iframe
              title={`Map showing ${lab.institute}`}
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Contact
