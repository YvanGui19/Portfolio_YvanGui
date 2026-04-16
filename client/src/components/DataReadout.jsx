import React, { memo } from 'react';

/**
 * DataReadout - Composant d'affichage de donnees techniques style Marathon
 *
 * @param {string} label - Le label de la donnee (ex: "STATUS", "SECTOR")
 * @param {string} value - La valeur a afficher (ex: "ONLINE", "TLS")
 * @param {string} color - Couleur du theme: 'lime' | 'cyan' | 'violet' | 'grey' | 'red'
 * @param {string} indicator - Type d'indicateur: 'none' | 'pulse' | 'static' | 'warning' | 'offline'
 * @param {string} size - Taille: 'sm' | 'md' | 'lg'
 * @param {string} className - Classes CSS additionnelles
 * @param {boolean} showBrackets - Afficher des crochets autour de la valeur
 */
const DataReadout = memo(function DataReadout({
  label,
  value,
  color = 'lime',
  indicator = 'none',
  size = 'md',
  className = '',
  showBrackets = false,
}) {
  const colorClasses = {
    lime: 'text-lime',
    cyan: 'text-cyan',
    violet: 'text-violet',
    grey: 'text-grey',
    red: 'text-red',
  };

  const sizeClasses = {
    sm: 'text-[0.55rem]',
    md: 'text-[0.65rem]',
    lg: 'text-[0.75rem]',
  };

  const indicatorClasses = {
    none: '',
    pulse: 'status-dot status-dot-pulse',
    static: 'status-dot',
    warning: 'status-dot status-dot-warning',
    offline: 'status-dot status-dot-offline',
  };

  const indicatorColors = {
    lime: 'bg-lime',
    cyan: 'bg-cyan',
    violet: 'bg-violet',
    grey: 'bg-grey',
    red: 'bg-red',
  };

  const displayValue = showBrackets ? `[${value}]` : value;

  return (
    <span
      className={`
        inline-flex items-center gap-2
        font-mono uppercase tracking-wider
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {indicator !== 'none' && (
        <span
          className={`${indicatorClasses[indicator]} ${indicatorColors[color]}`}
          style={{ width: size === 'sm' ? '6px' : size === 'lg' ? '10px' : '8px', height: size === 'sm' ? '6px' : size === 'lg' ? '10px' : '8px' }}
        />
      )}
      <span className="text-grey">{label}:</span>
      <span className={colorClasses[color]}>{displayValue}</span>
    </span>
  );
});

/**
 * DataReadoutGroup - Groupe de readouts avec separateurs
 */
export const DataReadoutGroup = memo(function DataReadoutGroup({
  children,
  separator = '|',
  className = '',
}) {
  const childArray = React.Children.toArray(children);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {childArray.map((child, index) => (
        <React.Fragment key={index}>
          {child}
          {index < childArray.length - 1 && (
            <span className="text-slate text-[0.5rem]">{separator}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
});

/**
 * DataReadoutBlock - Bloc de donnees avec label et valeur empiles
 */
export const DataReadoutBlock = memo(function DataReadoutBlock({
  label,
  value,
  subValue,
  color = 'lime',
  className = '',
}) {
  const colorClasses = {
    lime: 'text-lime',
    cyan: 'text-cyan',
    violet: 'text-violet',
    grey: 'text-grey',
    red: 'text-red',
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <span className="text-grey text-[0.6rem] font-mono uppercase tracking-wider">
        {label}
      </span>
      <span className={`${colorClasses[color]} text-sm font-mono uppercase tracking-wide`}>
        {value}
      </span>
      {subValue && (
        <span className="text-slate text-[0.55rem] font-mono">
          {subValue}
        </span>
      )}
    </div>
  );
});

/**
 * Timestamp - Affichage de l'heure en temps reel
 */
export const TimestampReadout = memo(function TimestampReadout({
  color = 'cyan',
  showDate = false,
  className = '',
}) {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const colorClasses = {
    lime: 'text-lime',
    cyan: 'text-cyan',
    violet: 'text-violet',
    grey: 'text-grey',
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <span className={`font-mono text-[0.6rem] uppercase tracking-wider ${colorClasses[color]} ${className}`}>
      {showDate && <span className="text-slate mr-2">{formatDate(time)}</span>}
      {formatTime(time)}
    </span>
  );
});

/**
 * Designation - Code de section style Marathon
 */
export const Designation = memo(function Designation({
  code,
  color = 'lime',
  className = '',
}) {
  const colorClasses = {
    lime: 'text-lime',
    cyan: 'text-cyan',
    violet: 'text-violet',
    grey: 'text-grey',
    red: 'text-red',
  };

  return (
    <span
      className={`
        font-display text-[0.6rem] font-bold
        tracking-[0.3em] uppercase
        ${colorClasses[color]}
        ${className}
      `}
    >
      [{code}]
    </span>
  );
});

/**
 * ProtocolText - Texte technique subtil
 */
export const ProtocolText = memo(function ProtocolText({
  children,
  prefix = '//',
  className = '',
}) {
  return (
    <span className={`font-mono text-[0.6rem] text-slate uppercase tracking-wide ${className}`}>
      {prefix} {children}
    </span>
  );
});

export default DataReadout;
