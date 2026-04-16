import { memo } from 'react';

/**
 * DotGrid - Grille de points style Marathon
 * Pattern de points réguliers qui s'anime au hover
 */

const DotGrid = memo(function DotGrid({
  dotSize = 2,
  spacing = 20,
  color = '#C2FE0B',
  opacity = 0.3,
  animated = false,
  className = '',
}) {
  const patternId = `dot-pattern-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity }}
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width={spacing}
          height={spacing}
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx={spacing / 2}
            cy={spacing / 2}
            r={dotSize}
            fill={color}
            className={animated ? 'animate-pulse' : ''}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
});

export default DotGrid;
