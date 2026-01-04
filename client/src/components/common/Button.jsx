import { Link } from 'react-router-dom'

  function Button({
    children,
    variant = 'primary',
    size = 'md',
    to,
    href,
    className = '',
    ...props
  }) {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 cursor-pointer'

    const variants = {
      primary: 'bg-primary text-background hover:bg-primary-dark shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5',
      outline: 'bg-transparent text-primary border border-primary hover:bg-primary/10',
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
    }

    const styles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

    // Si c'est un lien interne (React Router)
    if (to) {
      return (
        <Link to={to} className={styles} {...props}>
          {children}
        </Link>
      )
    }

    // Si c'est un lien externe
    if (href) {
      return (
        <a href={href} className={styles} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      )
    }

    // Sinon, c'est un bouton classique
    return (
      <button className={styles} {...props}>
        {children}
      </button>
    )
  }

  export default Button
