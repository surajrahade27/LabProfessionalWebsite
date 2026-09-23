import Icon from '../../components/common/Icon'
import tests from '../../data/tests.json'
import { formatPrice } from '../../utils/formatPrice'
import { whatsappLink } from '../../utils/links'
import styles from './PackageCard.module.css'

const testName = Object.fromEntries(tests.map((t) => [t.slug, t.name]))

function PackageCard({ pkg }) {
  const savePercent = Math.round((1 - pkg.offerPrice / pkg.price) * 100)

  return (
    <article className={`${styles.card} ${pkg.highlight ? styles.highlight : ''}`}>
      {pkg.highlight && <p className={styles.ribbon}>Most popular</p>}

      <h3 className={styles.name}>{pkg.name}</h3>
      <p className={styles.count}>{pkg.testSlugs.length} tests included</p>

      <p className={styles.prices}>
        <span className={styles.offer}>{formatPrice(pkg.offerPrice)}</span>
        <del className={styles.original}>{formatPrice(pkg.price)}</del>
        <span className={styles.save}>Save {savePercent}%</span>
      </p>

      <ul className={styles.tests}>
        {pkg.testSlugs.map((slug) => (
          <li key={slug}>
            <Icon name="check" size={16} />
            {testName[slug]}
          </li>
        ))}
      </ul>

      <a
        href={whatsappLink(`Hi, I would like to book the ${pkg.name} package.`)}
        className={`btn ${pkg.highlight ? 'btn-primary' : 'btn-outline'} ${styles.cta}`}
        target="_blank"
        rel="noreferrer"
      >
        Book this package
      </a>
    </article>
  )
}

export default PackageCard
