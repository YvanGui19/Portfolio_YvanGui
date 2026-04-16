import { memo } from 'react';

/**
 * CrosshairFrame - Conteneur avec crosshairs decoratifs aux 4 coins
 * Element visuel signature de Marathon
 */

const COLORS = {
  lime: '#C2FE0B',
  cyan: '#01FFFF',
  red: '#FF0D1A',
  violet: '#5200FF',
  white: '#FFFFFF',
  grey: '#8E8E8E',
};

// Single crosshair corner element
const Crosshair = memo(function Crosshair({
  position, // 'top-left', 'top-right', 'bottom-left', 'bottom-right'
  color,
  size,
  style = 'minimal', // 'minimal', 'full', 'technical'
  animated = false,
}) {
  const colorValue = COLORS[color] || color;

  const positionStyles = {
    'top-left': { top: 0, left: 0 },
    'top-right': { top: 0, right: 0 },
    'bottom-left': { bottom: 0, left: 0 },
    'bottom-right': { bottom: 0, right: 0 },
  };

  const rotations = {
    'top-left': 0,
    'top-right': 90,
    'bottom-right': 180,
    'bottom-left': 270,
  };

  // Minimal style: simple +
  if (style === 'minimal') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        style={{
          position: 'absolute',
          ...positionStyles[position],
          transform: `rotate(${rotations[position]}deg)`,
          transition: animated ? 'opacity 0.3s ease' : undefined,
        }}
      >
        <line x1="0" y1="8" x2="8" y2="8" stroke={colorValue} strokeWidth="2" />
        <line x1="8" y1="0" x2="8" y2="8" stroke={colorValue} strokeWidth="2" />
      </svg>
    );
  }

  // Full style: corner bracket with crosshair
  if (style === 'full') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        style={{
          position: 'absolute',
          ...positionStyles[position],
          transform: `rotate(${rotations[position]}deg)`,
          transition: animated ? 'opacity 0.3s ease' : undefined,
        }}
      >
        <path
          d="M0 12 L0 0 L12 0"
          fill="none"
          stroke={colorValue}
          strokeWidth="2"
        />
        <line x1="0" y1="16" x2="8" y2="16" stroke={colorValue} strokeWidth="1" opacity="0.5" />
        <line x1="16" y1="0" x2="16" y2="8" stroke={colorValue} strokeWidth="1" opacity="0.5" />
        <circle cx="8" cy="8" r="2" fill={colorValue} />
      </svg>
    );
  }

  // Technical style: more elaborate with grid lines
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      style={{
        position: 'absolute',
        ...positionStyles[position],
        transform: `rotate(${rotations[position]}deg)`,
        transition: animated ? 'opacity 0.3s ease' : undefined,
      }}
    >
      {/* Main corner bracket */}
      <path
        d="M0 16 L0 0 L16 0"
        fill="none"
        stroke={colorValue}
        strokeWidth="2"
      />
      {/* Inner bracket */}
      <path
        d="M4 12 L4 4 L12 4"
        fill="none"
        stroke={colorValue}
        strokeWidth="1"
        opacity="0.5"
      />
      {/* Extended lines */}
      <line x1="0" y1="24" x2="8" y2="24" stroke={colorValue} strokeWidth="1" opacity="0.3" />
      <line x1="24" y1="0" x2="24" y2="8" stroke={colorValue} strokeWidth="1" opacity="0.3" />
      {/* Dot markers */}
      <circle cx="8" cy="8" r="2" fill={colorValue} />
      <rect x="14" y="14" width="4" height="4" fill={colorValue} opacity="0.5" />
    </svg>
  );
});

const CrosshairFrame = memo(function CrosshairFrame({
  children,
  color = 'lime',
  size = 24, // Size of each crosshair
  style = 'minimal', // 'minimal', 'full', 'technical'
  corners = 'all', // 'all', 'top', 'bottom', or array ['top-left', 'bottom-right']
  animated = false,
  padding = 0, // Inner padding
  className = '',
  containerStyle = {},
}) {
  const getCorners = () => {
    if (corners === 'all') return ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
    if (corners === 'top') return ['top-left', 'top-right'];
    if (corners === 'bottom') return ['bottom-left', 'bottom-right'];
    if (Array.isArray(corners)) return corners;
    return ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
  };

  const activeCorners = getCorners();

  return (
    <div
      className={`marathon-crosshair-frame relative ${className}`}
      style={{
        padding: padding + size / 2,
        ...containerStyle,
      }}
    >
      {/* Crosshairs */}
      {activeCorners.map((position) => (
        <Crosshair
          key={position}
          position={position}
          color={color}
          size={size}
          style={style}
          animated={animated}
        />
      ))}

      {/* Content */}
      {children}
    </div>
  );
});

// Standalone crosshair for decorative use
export const CrosshairMark = memo(function CrosshairMark({
  color = 'lime',
  size = 24,
  style = 'minimal',
  className = '',
}) {
  const colorValue = COLORS[color] || color;

  if (style === 'minimal') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={className}
      >
        <line x1="12" y1="0" x2="12" y2="24" stroke={colorValue} strokeWidth="1" />
        <line x1="0" y1="12" x2="24" y2="12" stroke={colorValue} strokeWidth="1" />
        <circle cx="12" cy="12" r="4" fill="none" stroke={colorValue} strokeWidth="1" />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
    >
      <line x1="16" y1="0" x2="16" y2="10" stroke={colorValue} strokeWidth="1" />
      <line x1="16" y1="22" x2="16" y2="32" stroke={colorValue} strokeWidth="1" />
      <line x1="0" y1="16" x2="10" y2="16" stroke={colorValue} strokeWidth="1" />
      <line x1="22" y1="16" x2="32" y2="16" stroke={colorValue} strokeWidth="1" />
      <circle cx="16" cy="16" r="6" fill="none" stroke={colorValue} strokeWidth="1" />
      <circle cx="16" cy="16" r="2" fill={colorValue} />
    </svg>
  );
});

export default CrosshairFrame;
