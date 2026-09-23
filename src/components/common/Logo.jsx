import crest from '../../assets/pnrl-crest.png'
import styles from './Logo.module.css'

// PNRL crest, cropped from the full logo so it stays legible at header size.
function Logo({ className = '', size = 40 }) {
  return (
    <img
      className={`${styles.logo} ${className}`}
      src={crest}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      decoding="async"
    />
  )
}

export default Logo
