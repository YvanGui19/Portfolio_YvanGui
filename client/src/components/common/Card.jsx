function Card({ children, className = '', hover = false, ...props }) {
    const baseStyles = 'bg-gradient-to-br from-surface-light to-surface border border-border rounded-xl'

    const hoverStyles = hover
      ? 'transition-all duration-300 hover:border-primary hover:shadow-glow-lg hover:-translate-y-1'
      : ''

    return (
      <div className={`${baseStyles} ${hoverStyles} ${className}`} {...props}>
        {children}
      </div>
    )
  }

  function CardHeader({ children, className = '' }) {
    return (
      <div className={`p-6 border-b border-border ${className}`}>
        {children}
      </div>
    )
  }

  function CardContent({ children, className = '' }) {
    return (
      <div className={`p-6 ${className}`}>
        {children}
      </div>
    )
  }

  Card.Header = CardHeader
  Card.Content = CardContent

  export default Card
