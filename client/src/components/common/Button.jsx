import { memo } from 'react'
import { Link } from 'react-router-dom'

// Base styles Marathon
const baseStyles = `
  inline-flex items-center justify-center gap-2
  font-condensed font-semibold tracking-[0.2em] uppercase
  transition-all duration-300 cursor-pointer
  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background
`

// Marathon clip-path for angled corners
const clipPathMarathon = {
  clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
}

const variants = {
  primary: {
    className: 'bg-lime text-black hover:bg-white hover:-translate-y-0.5 focus-visible:ring-lime',
    style: clipPathMarathon,
    hoverShadow: '0 4px 20px rgba(194, 254, 11, 0.3)'
  },
  outline: {
    className: 'bg-transparent text-lime border border-lime hover:bg-lime/10 focus-visible:ring-lime focus-visible:ring-offset-0',
    style: {},
    hoverShadow: '0 0 20px rgba(194, 254, 11, 0.1)'
  },
  ghost: {
    className: 'bg-transparent text-grey border border-slate hover:text-white hover:border-white focus-visible:ring-white focus-visible:ring-offset-0',
    style: {},
    hoverShadow: null
  },
  danger: {
    className: 'bg-red text-white hover:-translate-y-0.5 focus-visible:ring-red',
    style: clipPathMarathon,
    hoverShadow: '0 4px 20px rgba(255, 71, 87, 0.3)'
  },
  cyan: {
    className: 'bg-cyan text-black hover:-translate-y-0.5 focus-visible:ring-cyan',
    style: clipPathMarathon,
    hoverShadow: '0 4px 20px rgba(1, 255, 255, 0.3)'
  },
  violet: {
    className: 'bg-violet text-black hover:-translate-y-0.5 focus-visible:ring-violet',
    style: clipPathMarathon,
    hoverShadow: '0 4px 20px rgba(167, 139, 250, 0.3)'
  },
  'outline-lime': {
    className: 'btn-clipped btn-clipped-lime text-lime hover:text-black focus-visible:ring-lime',
    style: {},
    hoverShadow: '0 0 20px rgba(194, 254, 11, 0.2)'
  },
  'outline-cyan': {
    className: 'btn-clipped btn-clipped-cyan text-cyan hover:text-black focus-visible:ring-cyan',
    style: {},
    hoverShadow: '0 0 20px rgba(1, 255, 255, 0.2)'
  },
  'outline-violet': {
    className: 'btn-clipped btn-clipped-violet text-violet hover:text-black focus-visible:ring-violet',
    style: {},
    hoverShadow: '0 0 20px rgba(167, 139, 250, 0.2)'
  },
}

const sizes = {
  sm: 'px-4 py-2 text-[0.75rem]',
  md: 'px-6 py-3 text-[0.8rem]',
  lg: 'px-8 py-4 text-[0.875rem]',
}

const Button = memo(function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  className = '',
  ...props
}) {
  const variantConfig = variants[variant] || variants.primary
  const styles = `${baseStyles} ${variantConfig.className} ${sizes[size]} ${className}`
  const inlineStyle = variantConfig.style

  // Si c'est un lien interne (React Router)
  if (to) {
    return (
      <Link to={to} className={styles} style={inlineStyle} {...props}>
        {children}
      </Link>
    )
  }

  // Si c'est un lien externe
  if (href) {
    return (
      <a href={href} className={styles} style={inlineStyle} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  }

  // Sinon, c'est un bouton classique
  return (
    <button className={styles} style={inlineStyle} {...props}>
      {children}
    </button>
  )
})

export default Button
