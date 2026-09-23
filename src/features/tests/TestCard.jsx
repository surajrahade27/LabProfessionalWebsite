import Icon from '../../components/common/Icon'
import { formatPrice } from '../../utils/formatPrice'
import { whatsappLink } from '../../utils/links'
import styles from './TestCard.module.css'

function TestCard({ test }) {
  return (
    <article className={styles.card}>
      <p className={styles.category}>{test.category}</p>
      <h3 className={styles.name}>{test.name}</h3>

      <ul className={styles.meta}>
        <li>
          <Icon name="drop" size={16} />
          {test.sampleType}
        </li>
        <li>
          <Icon name="clock" size={16} />
          Report: {test.reportTime}
        </li>
        <li>
          <Icon name="check" size={16} />
          {test.preparation}
        </li>
      </ul>

      <div className={styles.footer}>
        <p className={styles.price}>{formatPrice(test.price)}</p>
        <a
          href={whatsappLink(`Hi, I would like to book: ${test.name}`)}
          className={styles.book}
          target="_blank"
          rel="noreferrer"
          aria-label={`Book ${test.name}`}
        >
          Book
          <Icon name="arrow" size={16} />
        </a>
      </div>
    </article>
  )
}

export default TestCard
