import { useInView } from '../../hooks/useInView'

// Fades and slides its content in when it scrolls into view.
function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...props }) {
  const [ref, inView] = useInView()

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}
      {...props}
    >
      {children}
    </Tag>
  )
}

export default Reveal
