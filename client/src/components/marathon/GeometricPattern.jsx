import { memo } from 'react';

/**
 * GeometricPattern - Motifs géométriques interconnectés style Marathon
 * Triangles tessellants, lignes diagonales, formes abstraites
 */

// Pattern de triangles tessellants
export const TessellatedTriangles = memo(function TessellatedTriangles({
  size = 60,
  color = '#C2FE0B',
  opacity = 0.1,
  className = '',
}) {
  const patternId = `tess-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} style={{ opacity }}>
      <defs>
        <pattern id={patternId} x="0" y="0" width={size} height={size} patternUnits="userSpaceOnUse">
          <path
            d={`M0 0 L${size / 2} ${size} L${size} 0 Z`}
            fill="none"
            stroke={color}
            strokeWidth="1"
          />
          <path
            d={`M0 ${size} L${size / 2} 0 L${size} ${size} Z`}
            fill="none"
            stroke={color}
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
});

// Pattern de lignes diagonales croisées
export const CrossDiagonals = memo(function CrossDiagonals({
  size = 40,
  color = '#C2FE0B',
  opacity = 0.08,
  strokeWidth = 1,
  className = '',
}) {
  const patternId = `cross-diag-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} style={{ opacity }}>
      <defs>
        <pattern id={patternId} x="0" y="0" width={size} height={size} patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2={size} y2={size} stroke={color} strokeWidth={strokeWidth} />
          <line x1={size} y1="0" x2="0" y2={size} stroke={color} strokeWidth={strokeWidth} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
});

// Forme abstraite grand format (style footer Marathon)
export const AbstractShape = memo(function AbstractShape({
  color = '#C2FE0B',
  opacity = 0.05,
  variant = 1,
  className = '',
}) {
  const shapes = {
    1: (
      <path
        d="M0 100 L200 0 L400 100 L400 300 L200 400 L0 300 Z M100 150 L200 100 L300 150 L300 250 L200 300 L100 250 Z"
        fill="none"
        stroke={color}
        strokeWidth="2"
      />
    ),
    2: (
      <path
        d="M0 200 Q100 0 200 200 Q300 400 400 200 M50 200 Q150 50 250 200 Q350 350 450 200"
        fill="none"
        stroke={color}
        strokeWidth="3"
      />
    ),
    3: (
      <>
        <circle cx="200" cy="200" r="150" fill="none" stroke={color} strokeWidth="2" />
        <circle cx="200" cy="200" r="100" fill="none" stroke={color} strokeWidth="2" />
        <circle cx="200" cy="200" r="50" fill="none" stroke={color} strokeWidth="2" />
        <line x1="50" y1="200" x2="350" y2="200" stroke={color} strokeWidth="2" />
        <line x1="200" y1="50" x2="200" y2="350" stroke={color} strokeWidth="2" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 400 400"
      className={`pointer-events-none ${className}`}
      style={{ opacity }}
    >
      {shapes[variant]}
    </svg>
  );
});

// Composition de formes géométriques multiples
export const GeometricComposition = memo(function GeometricComposition({
  color = '#C2FE0B',
  opacity = 0.1,
  className = '',
}) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} style={{ opacity }}>
      {/* Grands cercles concentriques */}
      <svg className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px]" viewBox="0 0 400 400">
        <circle cx="200" cy="200" r="180" fill="none" stroke={color} strokeWidth="1" />
        <circle cx="200" cy="200" r="140" fill="none" stroke={color} strokeWidth="1" />
        <circle cx="200" cy="200" r="100" fill="none" stroke={color} strokeWidth="1" />
        <circle cx="200" cy="200" r="60" fill="none" stroke={color} strokeWidth="1" />
      </svg>

      {/* Triangles en bas gauche */}
      <svg className="absolute -bottom-20 -left-20 w-[400px] h-[400px]" viewBox="0 0 200 200">
        <polygon points="0,200 100,0 200,200" fill="none" stroke={color} strokeWidth="1" />
        <polygon points="25,175 100,25 175,175" fill="none" stroke={color} strokeWidth="1" />
        <polygon points="50,150 100,50 150,150" fill="none" stroke={color} strokeWidth="1" />
      </svg>

      {/* Lignes diagonales */}
      <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1="0" y1="30" x2="100" y2="70" stroke={color} strokeWidth="0.2" />
        <line x1="0" y1="50" x2="100" y2="90" stroke={color} strokeWidth="0.2" />
        <line x1="0" y1="70" x2="100" y2="30" stroke={color} strokeWidth="0.2" />
      </svg>
    </div>
  );
});

export default GeometricComposition;
