import site from '../data/site.json'

/** WhatsApp chat link with a pre-filled message. */
export const whatsappLink = (message) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`

export const phoneLink = `tel:${site.phone}`
