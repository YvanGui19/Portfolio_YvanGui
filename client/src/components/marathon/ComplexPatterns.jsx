import { memo } from 'react';

/**
 * ComplexPatterns - Patterns complexes multi-couches style Marathon
 * Tessellations, crosshairs, corner brackets, compositions géométriques
 */

// Tessellation de parallélogrammes (style hero Marathon)
export const ParallelogramTessellation = memo(function ParallelogramTessellation({
  color = '#C2FE0B',
  opacity = 0.15,
  scale = 1,
  className = '',
}) {
  const patternId = `para-tess-${Math.random().toString(36).substr(2, 9)}`;
  const size = 60 * scale;

  return (
    <svg className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} style={{ opacity }}>
      <defs>
        <pattern id={patternId} x="0" y="0" width={size} height={size} patternUnits="userSpaceOnUse">
          {/* Parallélogramme principal */}
          <polygon
            points={`0,${size} ${size * 0.3},0 ${size},0 ${size * 0.7},${size}`}
            fill="none"
            stroke={color}
            strokeWidth="1"
          />
          {/* Lignes internes */}
          <line x1={size * 0.15} y1={size * 0.5} x2={size * 0.85} y2={size * 0.5} stroke={color} strokeWidth="0.5" strokeDasharray="4 4" />
          <line x1={size * 0.5} y1="0" x2={size * 0.5} y2={size} stroke={color} strokeWidth="0.5" strokeDasharray="2 6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
});

// Crosshair avec cercles concentriques
export const CrosshairPattern = memo(function CrosshairPattern({
  color = '#C2FE0B',
  size = 200,
  strokeWidth = 1,
  className = '',
}) {
  const center = size / 2;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={`pointer-events-none ${className}`}>
      {/* Cercles concentriques */}
      <circle cx={center} cy={center} r={size * 0.4} fill="none" stroke={color} strokeWidth={strokeWidth} strokeDasharray="8 4" />
      <circle cx={center} cy={center} r={size * 0.3} fill="none" stroke={color} strokeWidth={strokeWidth} />
      <circle cx={center} cy={center} r={size * 0.2} fill="none" stroke={color} strokeWidth={strokeWidth} strokeDasharray="4 8" />
      <circle cx={center} cy={center} r={size * 0.1} fill="none" stroke={color} strokeWidth={strokeWidth * 1.5} />

      {/* Crosshair lines */}
      <line x1="0" y1={center} x2={size * 0.35} y2={center} stroke={color} strokeWidth={strokeWidth} />
      <line x1={size * 0.65} y1={center} x2={size} y2={center} stroke={color} strokeWidth={strokeWidth} />
      <line x1={center} y1="0" x2={center} y2={size * 0.35} stroke={color} strokeWidth={strokeWidth} />
      <line x1={center} y1={size * 0.65} x2={center} y2={size} stroke={color} strokeWidth={strokeWidth} />

      {/* Diagonal marks */}
      <line x1={size * 0.15} y1={size * 0.15} x2={size * 0.25} y2={size * 0.25} stroke={color} strokeWidth={strokeWidth} />
      <line x1={size * 0.85} y1={size * 0.15} x2={size * 0.75} y2={size * 0.25} stroke={color} strokeWidth={strokeWidth} />
      <line x1={size * 0.15} y1={size * 0.85} x2={size * 0.25} y2={size * 0.75} stroke={color} strokeWidth={strokeWidth} />
      <line x1={size * 0.85} y1={size * 0.85} x2={size * 0.75} y2={size * 0.75} stroke={color} strokeWidth={strokeWidth} />

      {/* Corner dots */}
      <circle cx={size * 0.1} cy={size * 0.1} r="3" fill={color} />
      <circle cx={size * 0.9} cy={size * 0.1} r="3" fill={color} />
      <circle cx={size * 0.1} cy={size * 0.9} r="3" fill={color} />
      <circle cx={size * 0.9} cy={size * 0.9} r="3" fill={color} />
    </svg>
  );
});

// Corner brackets complexes (style Marathon footer)
export const CornerBrackets = memo(function CornerBrackets({
  color = '#C2FE0B',
  size = 40,
  strokeWidth = 2,
  animated = false,
  className = '',
}) {
  const animationClass = animated ? 'animate-bracket' : '';

  return (
    <>
      {/* Top-left */}
      <svg className={`absolute top-0 left-0 pointer-events-none ${className}`} width={size} height={size}>
        <path
          d={`M${size},0 L0,0 L0,${size}`}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          className={animationClass}
          style={animated ? { strokeDasharray: size * 2, strokeDashoffset: size * 2 } : {}}
        />
        <circle cx={size * 0.2} cy={size * 0.2} r="2" fill={color} />
      </svg>

      {/* Top-right */}
      <svg className={`absolute top-0 right-0 pointer-events-none ${className}`} width={size} height={size}>
        <path
          d={`M0,0 L${size},0 L${size},${size}`}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          className={animationClass}
        />
        <circle cx={size * 0.8} cy={size * 0.2} r="2" fill={color} />
      </svg>

      {/* Bottom-left */}
      <svg className={`absolute bottom-0 left-0 pointer-events-none ${className}`} width={size} height={size}>
        <path
          d={`M0,0 L0,${size} L${size},${size}`}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          className={animationClass}
        />
        <circle cx={size * 0.2} cy={size * 0.8} r="2" fill={color} />
      </svg>

      {/* Bottom-right */}
      <svg className={`absolute bottom-0 right-0 pointer-events-none ${className}`} width={size} height={size}>
        <path
          d={`M${size},0 L${size},${size} L0,${size}`}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          className={animationClass}
        />
        <circle cx={size * 0.8} cy={size * 0.8} r="2" fill={color} />
      </svg>

      <style>{`
        @keyframes bracket-draw {
          to { stroke-dashoffset: 0; }
        }
        .animate-bracket {
          animation: bracket-draw 0.5s ease forwards;
        }
      `}</style>
    </>
  );
});

// Triangular tessellation (style footer Marathon)
export const TriangularMesh = memo(function TriangularMesh({
  color = '#C2FE0B',
  opacity = 0.1,
  cellSize = 40,
  className = '',
}) {
  const patternId = `tri-mesh-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} style={{ opacity }}>
      <defs>
        <pattern id={patternId} x="0" y="0" width={cellSize * 2} height={cellSize * 1.732} patternUnits="userSpaceOnUse">
          {/* Upward triangle */}
          <polygon
            points={`${cellSize},0 ${cellSize * 2},${cellSize * 1.732} 0,${cellSize * 1.732}`}
            fill="none"
            stroke={color}
            strokeWidth="0.5"
          />
          {/* Downward triangle */}
          <polygon
            points={`0,0 ${cellSize * 2},0 ${cellSize},${cellSize * 1.732}`}
            fill="none"
            stroke={color}
            strokeWidth="0.5"
          />
          {/* Center dot */}
          <circle cx={cellSize} cy={cellSize * 0.577} r="1.5" fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
});

// Composition HUD complexe
export const HUDComposition = memo(function HUDComposition({
  color = '#C2FE0B',
  secondaryColor = '#01FFFF',
  className = '',
}) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Crosshair central */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.08]">
        <CrosshairPattern color={color} size={600} strokeWidth={1} />
      </div>

      {/* Corner brackets */}
      <div className="absolute inset-8 opacity-20">
        <CornerBrackets color={color} size={60} strokeWidth={1.5} />
      </div>

      {/* Smaller inner brackets */}
      <div className="absolute inset-24 opacity-15">
        <CornerBrackets color={secondaryColor} size={40} strokeWidth={1} />
      </div>

      {/* Diagonal lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.05]">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke={color} strokeWidth="1" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke={color} strokeWidth="1" />
      </svg>

      {/* Corner accents */}
      <div className="absolute top-16 left-16 opacity-15">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <path d="M0 50 L50 0 L100 50 L50 100 Z" fill="none" stroke={color} strokeWidth="1" />
          <circle cx="50" cy="50" r="20" fill="none" stroke={color} strokeWidth="1" strokeDasharray="4 4" />
        </svg>
      </div>

      <div className="absolute bottom-16 right-16 opacity-15">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <rect x="10" y="10" width="80" height="80" fill="none" stroke={secondaryColor} strokeWidth="1" />
          <rect x="25" y="25" width="50" height="50" fill="none" stroke={secondaryColor} strokeWidth="1" strokeDasharray="8 4" />
          <line x1="10" y1="10" x2="90" y2="90" stroke={secondaryColor} strokeWidth="0.5" />
          <line x1="90" y1="10" x2="10" y2="90" stroke={secondaryColor} strokeWidth="0.5" />
        </svg>
      </div>
    </div>
  );
});

// Data grid pattern (style news cards Marathon)
export const DataGrid = memo(function DataGrid({
  color = '#C2FE0B',
  opacity = 0.2,
  dotSize = 1.5,
  spacing = 22,
  showLines = true,
  className = '',
}) {
  const patternId = `data-grid-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} style={{ opacity }}>
      <defs>
        <pattern id={patternId} x="0" y="0" width={spacing} height={spacing} patternUnits="userSpaceOnUse">
          {/* Dot */}
          <circle cx={spacing / 2} cy={spacing / 2} r={dotSize} fill={color} fillOpacity="0.6" />
          {/* Optional grid lines */}
          {showLines && (
            <>
              <line x1={spacing / 2} y1="0" x2={spacing / 2} y2={spacing} stroke={color} strokeWidth="0.3" strokeOpacity="0.3" />
              <line x1="0" y1={spacing / 2} x2={spacing} y2={spacing / 2} stroke={color} strokeWidth="0.3" strokeOpacity="0.3" />
            </>
          )}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
});

// Hexagonal grid
export const HexGrid = memo(function HexGrid({
  color = '#C2FE0B',
  opacity = 0.08,
  size = 30,
  className = '',
}) {
  const patternId = `hex-grid-${Math.random().toString(36).substr(2, 9)}`;
  const h = size * Math.sqrt(3);

  return (
    <svg className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} style={{ opacity }}>
      <defs>
        <pattern id={patternId} x="0" y="0" width={size * 3} height={h} patternUnits="userSpaceOnUse">
          <polygon
            points={`${size},0 ${size * 2},0 ${size * 2.5},${h / 2} ${size * 2},${h} ${size},${h} ${size * 0.5},${h / 2}`}
            fill="none"
            stroke={color}
            strokeWidth="0.5"
          />
          <polygon
            points={`${size * 2.5},${h / 2} ${size * 3},${h / 2} ${size * 3},${h} ${size * 2.5},${h}`}
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            strokeDasharray="2 2"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
});

export default {
  ParallelogramTessellation,
  CrosshairPattern,
  CornerBrackets,
  TriangularMesh,
  HUDComposition,
  DataGrid,
  HexGrid,
};
