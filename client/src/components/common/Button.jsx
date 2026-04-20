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
    // VerrouPass: Lime background with lime glow on hover
    className: 'bg-lime text-black hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(194,254,11,0.4)] focus-visible:ring-lime',
    style: clipPathMarathon,
  },
  outline: {
    // VerrouPass: Transparent with lime border, subtle glow on hover
    className: 'bg-transparent text-lime border border-lime/40 hover:border-lime hover:bg-lime/10 hover:shadow-[0_0_20px_rgba(194,254,11,0.2)] focus-visible:ring-lime focus-visible:ring-offset-0',
    style: {},
  },
  secondary: {
    // VerrouPass: Cyan accent variant
    className: 'bg-transparent text-cyan border border-cyan/40 hover:border-cyan hover:bg-cyan/10 hover:shadow-[0_0_20px_rgba(1,255,255,0.3)] focus-visible:ring-cyan focus-visible:ring-offset-0',
    style: {},
  },
  ghost: {
    className: 'bg-transparent text-grey border border-slate hover:text-white hover:border-white/50 focus-visible:ring-white focus-visible:ring-offset-0',
    style: {},
  },
  danger: {
    className: 'bg-red text-white hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(255,48,48,0.3)] focus-visible:ring-red',
    style: clipPathMarathon,
  },
  cyan: {
    className: 'bg-cyan text-black hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(1,255,255,0.4)] focus-visible:ring-cyan',
    style: clipPathMarathon,
  },
  violet: {
    className: 'bg-violet text-black hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(167,139,250,0.3)] focus-visible:ring-violet',
    style: clipPathMarathon,
  },
  'outline-lime': {
    className: 'btn-clipped btn-clipped-lime text-lime hover:text-black hover:shadow-[0_0_20px_rgba(194,254,11,0.2)] focus-visible:ring-lime',
    style: {},
  },
  'outline-cyan': {
    className: 'btn-clipped btn-clipped-cyan text-cyan hover:text-black hover:shadow-[0_0_20px_rgba(1,255,255,0.2)] focus-visible:ring-cyan',
    style: {},
  },
  'outline-violet': {
    className: 'btn-clipped btn-clipped-violet text-violet hover:text-black hover:shadow-[0_0_20px_rgba(167,139,250,0.2)] focus-visible:ring-violet',
    style: {},
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
