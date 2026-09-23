const rupees = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

/** 1999 → "₹1,999" */
export const formatPrice = (amount) => rupees.format(amount)
