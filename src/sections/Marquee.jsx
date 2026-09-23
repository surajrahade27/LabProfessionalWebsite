import styles from './Marquee.module.css'

// Endlessly scrolling row of keywords. The list is rendered twice so the loop is seamless;
// the copy is hidden from screen readers.
function Marquee({ items, label, className = '' }) {
  return (
    <div className={`${styles.marquee} ${className}`} role="region" aria-label={label}>
      <div className={styles.track}>
        {[0, 1].map((copy) => (
          <ul key={copy} className={styles.list} aria-hidden={copy === 1 || undefined}>
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

export default Marquee
