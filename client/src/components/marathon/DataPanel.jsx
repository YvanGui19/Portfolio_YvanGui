import { memo, useState, useEffect } from 'react';

/**
 * DataPanel - Panneau de données HUD style Marathon
 * Affiche des informations techniques avec un style cyberpunk
 */

// Génère un code technique aléatoire
const generateCode = (length = 8) => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
  return Array(length).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
};

// Génère une date formatée style système
const generateTimestamp = () => {
  const now = new Date();
  return `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}.${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
};

const DataPanel = memo(function DataPanel({
  title = 'SYSTEM',
  code = null, // Auto-generate if null
  status = 'ONLINE',
  statusColor = 'lime', // lime, cyan, red, orange
  data = [], // Array of { label, value } or strings
  compact = false,
  animated = true,
  className = '',
}) {
  const [currentCode, setCurrentCode] = useState(code || generateCode());
  const [timestamp, setTimestamp] = useState(generateTimestamp());

  useEffect(() => {
    if (!animated) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setTimestamp(generateTimestamp());
      if (!code && Math.random() < 0.1) {
        setCurrentCode(generateCode());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [animated, code]);

  const statusColors = {
    lime: 'text-lime',
    cyan: 'text-cyan',
    red: 'text-red',
    orange: 'text-orange',
  };

  return (
    <div className={`font-mono text-white ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-2">
        <span className="text-[9px] tracking-[0.3em] text-lime uppercase font-bold">
          {title}
        </span>
        <span className="text-[8px] tracking-[0.15em] text-grey">
          {currentCode}
        </span>
      </div>

      {/* Status line */}
      <div className="flex items-center gap-3 text-[10px] tracking-[0.1em] mb-3">
        <span className={`${statusColors[statusColor]} flex items-center gap-1.5`}>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          {status}
        </span>
        <span className="text-grey">{timestamp}</span>
      </div>

      {/* Data rows */}
      {!compact && data.length > 0 && (
        <div className="space-y-1 border-t border-white/10 pt-2">
          {data.map((item, i) => (
            <div key={i} className="flex items-center justify-between text-[9px] tracking-[0.05em]">
              {typeof item === 'string' ? (
                <span className="text-grey">{item}</span>
              ) : (
                <>
                  <span className="text-grey">{item.label}</span>
                  <span className={item.color ? `text-${item.color}` : 'text-white'}>
                    {item.value}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

/**
 * AlertBar - Barre d'alerte avec texte défilant
 */
export const AlertBar = memo(function AlertBar({
  text = 'ALERT',
  repeat = 10,
  color = 'lime',
  backgroundColor = 'black',
  speed = 20, // seconds for full scroll
  className = '',
}) {
  const colors = {
    lime: '#C2FE0B',
    cyan: '#00F0FF',
    red: '#FF3030',
    orange: '#E8763A',
  };

  const colorValue = colors[color] || color;
  const repeatedText = Array(repeat).fill(text).join(' • ');

  return (
    <div
      className={`overflow-hidden whitespace-nowrap ${className}`}
      style={{ backgroundColor }}
    >
      <div
        className="inline-block animate-scroll"
        style={{
          color: colorValue,
          fontSize: '10px',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          animation: `scroll ${speed}s linear infinite`,
        }}
      >
        {repeatedText}
        <span className="inline-block ml-8">{repeatedText}</span>
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
});

/**
 * TechLabel - Label technique avec style Marathon
 */
export const TechLabel = memo(function TechLabel({
  prefix = 'SEC',
  number = '01',
  text = '',
  color = 'lime',
  size = 'default', // 'small', 'default', 'large'
  className = '',
}) {
  const sizes = {
    small: 'text-[8px]',
    default: 'text-[10px]',
    large: 'text-[12px]',
  };

  const colors = {
    lime: 'text-lime',
    cyan: 'text-cyan',
    red: 'text-red',
    orange: 'text-orange',
    white: 'text-white',
    grey: 'text-grey',
  };

  return (
    <span className={`font-mono tracking-[0.2em] uppercase ${sizes[size]} ${colors[color]} ${className}`}>
      {prefix}.{number}{text && ` — ${text}`}
    </span>
  );
});

/**
 * CoordinateDisplay - Affichage de coordonnées style GPS/militaire
 */
export const CoordinateDisplay = memo(function CoordinateDisplay({
  lat = 43.6047,
  lon = 1.4442,
  animated = true,
  className = '',
}) {
  const [coords, setCoords] = useState({ lat, lon });

  useEffect(() => {
    if (!animated) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCoords({
        lat: lat + (Math.random() - 0.5) * 0.0001,
        lon: lon + (Math.random() - 0.5) * 0.0001,
      });
    }, 200);

    return () => clearInterval(interval);
  }, [lat, lon, animated]);

  const formatCoord = (val, isLat) => {
    const dir = isLat ? (val >= 0 ? 'N' : 'S') : (val >= 0 ? 'E' : 'W');
    return `${Math.abs(val).toFixed(4)}°${dir}`;
  };

  return (
    <div className={`font-mono text-[9px] tracking-[0.1em] text-grey ${className}`}>
      <span className="text-lime">{formatCoord(coords.lat, true)}</span>
      <span className="mx-2">/</span>
      <span className="text-lime">{formatCoord(coords.lon, false)}</span>
    </div>
  );
});

/**
 * StatusIndicator - Indicateur de statut avec animation
 */
export const StatusIndicator = memo(function StatusIndicator({
  status = 'online', // online, offline, warning, processing
  label = '',
  size = 'default',
  className = '',
}) {
  const statusConfig = {
    online: { color: 'bg-lime', text: 'ONLINE', pulse: true },
    offline: { color: 'bg-grey', text: 'OFFLINE', pulse: false },
    warning: { color: 'bg-orange', text: 'WARNING', pulse: true },
    error: { color: 'bg-red', text: 'ERROR', pulse: true },
    processing: { color: 'bg-cyan', text: 'PROCESSING', pulse: true },
  };

  const config = statusConfig[status] || statusConfig.online;
  const sizes = {
    small: { dot: 'w-1 h-1', text: 'text-[8px]' },
    default: { dot: 'w-1.5 h-1.5', text: 'text-[9px]' },
    large: { dot: 'w-2 h-2', text: 'text-[10px]' },
  };

  const sizeConfig = sizes[size] || sizes.default;

  return (
    <div className={`flex items-center gap-2 font-mono ${sizeConfig.text} tracking-[0.15em] uppercase ${className}`}>
      <span
        className={`rounded-full ${config.color} ${sizeConfig.dot} ${config.pulse ? 'animate-pulse' : ''}`}
      />
      <span className="text-white">{label || config.text}</span>
    </div>
  );
});

/**
 * ProgressBar - Barre de progression style HUD
 */
export const ProgressBar = memo(function ProgressBar({
  value = 0, // 0-100
  label = '',
  showValue = true,
  color = 'lime',
  size = 'default',
  animated = true,
  className = '',
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!animated) {
      setDisplayValue(value);
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    const step = (value - displayValue) / 10;
    const interval = setInterval(() => {
      setDisplayValue(prev => {
        const next = prev + step;
        if ((step > 0 && next >= value) || (step < 0 && next <= value)) {
          clearInterval(interval);
          return value;
        }
        return next;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [value, animated]);

  const colors = {
    lime: 'bg-lime',
    cyan: 'bg-cyan',
    red: 'bg-red',
    orange: 'bg-orange',
  };

  const heights = {
    small: 'h-1',
    default: 'h-2',
    large: 'h-3',
  };

  return (
    <div className={`font-mono ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1 text-[9px] tracking-[0.1em]">
          {label && <span className="text-grey uppercase">{label}</span>}
          {showValue && <span className="text-white">{Math.round(displayValue)}%</span>}
        </div>
      )}
      <div className={`w-full bg-white/10 ${heights[size] || heights.default}`}>
        <div
          className={`h-full ${colors[color] || colors.lime} transition-all duration-300`}
          style={{ width: `${displayValue}%` }}
        />
      </div>
    </div>
  );
});

export default DataPanel;
