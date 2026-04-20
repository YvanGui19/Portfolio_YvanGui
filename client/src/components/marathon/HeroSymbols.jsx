/**
 * Hero Symbols - SVG versions of the procedural canvas symbols
 * For use as large static background elements
 */

// X shape - two diagonal lines
export function SymbolX({ className = "", style = {} }) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="square">
      <line x1="15" y1="15" x2="85" y2="85" />
      <line x1="85" y1="15" x2="15" y2="85" />
    </svg>
  );
}

// Square outline
export function SymbolSquare({ className = "", style = {} }) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8">
      <rect x="15" y="15" width="70" height="70" />
    </svg>
  );
}

// Plus sign
export function SymbolPlus({ className = "", style = {} }) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="square">
      <line x1="50" y1="15" x2="50" y2="85" />
      <line x1="15" y1="50" x2="85" y2="50" />
    </svg>
  );
}

// Circle outline
export function SymbolCircle({ className = "", style = {} }) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8">
      <circle cx="50" cy="50" r="35" />
    </svg>
  );
}

// Circle with center dot
export function SymbolCircleDot({ className = "", style = {} }) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" fill="currentColor" stroke="currentColor" strokeWidth="8">
      <circle cx="50" cy="50" r="35" fill="none" />
      <circle cx="50" cy="50" r="6" stroke="none" />
    </svg>
  );
}

// Square with center dot
export function SymbolSquareDot({ className = "", style = {} }) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" fill="currentColor" stroke="currentColor" strokeWidth="8">
      <rect x="15" y="15" width="70" height="70" fill="none" />
      <circle cx="50" cy="50" r="6" stroke="none" />
    </svg>
  );
}

// 6-pointed star (3 lines at 60 degrees)
export function SymbolStar6({ className = "", style = {} }) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="square">
      <line x1="50" y1="15" x2="50" y2="85" />
      <line x1="19.7" y1="32.5" x2="80.3" y2="67.5" />
      <line x1="19.7" y1="67.5" x2="80.3" y2="32.5" />
    </svg>
  );
}

// Bullseye - circle with filled center
export function SymbolBullseye({ className = "", style = {} }) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" fill="currentColor" stroke="currentColor" strokeWidth="8">
      <circle cx="50" cy="50" r="35" fill="none" />
      <circle cx="50" cy="50" r="12" stroke="none" />
    </svg>
  );
}

// Double ring
export function SymbolRing({ className = "", style = {} }) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6">
      <circle cx="50" cy="50" r="38" />
      <circle cx="50" cy="50" r="20" />
    </svg>
  );
}

// 4-pointed star (filled)
export function SymbolStar4({ className = "", style = {} }) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" fill="currentColor">
      <polygon points="50,10 58,42 90,50 58,58 50,90 42,58 10,50 42,42" />
    </svg>
  );
}

// Cross with dots at extremities
export function SymbolDotCross({ className = "", style = {} }) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" fill="currentColor" stroke="currentColor" strokeWidth="6" strokeLinecap="square">
      <line x1="30" y1="50" x2="70" y2="50" />
      <line x1="50" y1="30" x2="50" y2="70" />
      <circle cx="15" cy="50" r="6" stroke="none" />
      <circle cx="85" cy="50" r="6" stroke="none" />
      <circle cx="50" cy="15" r="6" stroke="none" />
      <circle cx="50" cy="85" r="6" stroke="none" />
    </svg>
  );
}

// 4 dots in square pattern
export function SymbolQuad({ className = "", style = {} }) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" fill="currentColor">
      <circle cx="30" cy="30" r="8" />
      <circle cx="70" cy="30" r="8" />
      <circle cx="30" cy="70" r="8" />
      <circle cx="70" cy="70" r="8" />
    </svg>
  );
}

export default {
  SymbolX,
  SymbolSquare,
  SymbolPlus,
  SymbolCircle,
  SymbolCircleDot,
  SymbolSquareDot,
  SymbolStar6,
  SymbolBullseye,
  SymbolRing,
  SymbolStar4,
  SymbolDotCross,
  SymbolQuad,
};
