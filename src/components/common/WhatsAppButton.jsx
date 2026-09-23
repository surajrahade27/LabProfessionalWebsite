import { whatsappLink } from '../../utils/links'
import Icon from './Icon'
import styles from './WhatsAppButton.module.css'

/** Floating "chat on WhatsApp" button, visible on every page. */
function WhatsAppButton() {
  return (
    <a
      href={whatsappLink('Hi, I have a question about a test.')}
      className={styles.button}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <Icon name="chat" size={28} />
    </a>
  )
}

export default WhatsAppButton
