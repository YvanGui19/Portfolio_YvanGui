import { memo, useMemo } from 'react';

/**
 * Éléments décoratifs originaux inspirés de l'esthétique
 * sci-fi industrielle / editorial expérimental
 *
 * Inspiré par le style Marathon/Antireal mais 100% original
 */

// ═══════════════════════════════════════════════════════════════════════════
// SYMBOLES UNICODE DÉCORATIFS
// ═══════════════════════════════════════════════════════════════════════════

const SYMBOLS = ['⬡', '⬢', '◈', '◇', '▣', '▢', '⊞', '⊟', '⊠', '⊡', '⦿', '⦾', '◎', '◉', '⊕', '⊗', '⊙', '⊚', '⌬', '⏣', '⏥', '⎔', '⎕', '△', '▽', '◁', '▷', '⟁', '⟐', '⟡'];

/**
 * SymbolScatter - Symboles dispersés en arrière-plan
 */
export const SymbolScatter = memo(function SymbolScatter({
  count = 20,
  color = '#C2FE0B',
  opacity = 0.15,
  minSize = 16,
  maxSize = 32,
  className = '',
}) {
  const symbols = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      char: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: minSize + Math.random() * (maxSize - minSize),
      rotation: Math.random() * 360,
      opacity: 0.3 + Math.random() * 0.7,
    }));
  }, [count, minSize, maxSize]);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {symbols.map((s, i) => (
        <span
          key={i}
          className="absolute font-mono"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            fontSize: `${s.size}px`,
            color,
            opacity: opacity * s.opacity,
            transform: `rotate(${s.rotation}deg)`,
          }}
        >
          {s.char}
        </span>
      ))}
    </div>
  );
});

/**
 * SymbolGrid - Grille régulière de symboles
 */
export const SymbolGrid = memo(function SymbolGrid({
  rows = 5,
  cols = 8,
  size = 20,
  gap = 40,
  color = '#C2FE0B',
  opacity = 0.12,
  className = '',
}) {
  const symbols = useMemo(() => {
    return Array.from({ length: rows * cols }, () =>
      SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
    );
  }, [rows, cols]);

  return (
    <div
      className={`grid pointer-events-none ${className}`}
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: `${gap}px`,
        color,
        opacity,
        fontSize: `${size}px`,
      }}
    >
      {symbols.map((char, i) => (
        <span key={i} className="text-center font-mono">{char}</span>
      ))}
    </div>
  );
});

/**
 * SymbolLine - Ligne horizontale de symboles
 */
export const SymbolLine = memo(function SymbolLine({
  count = 12,
  size = 18,
  gap = 32,
  color = '#C2FE0B',
  opacity = 0.2,
  className = '',
}) {
  const symbols = useMemo(() => {
    return Array.from({ length: count }, () =>
      SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
    );
  }, [count]);

  return (
    <div
      className={`flex items-center justify-center pointer-events-none ${className}`}
      style={{ gap: `${gap}px`, color, opacity, fontSize: `${size}px` }}
    >
      {symbols.map((char, i) => (
        <span key={i} className="font-mono">{char}</span>
      ))}
    </div>
  );
});

/**
 * SymbolColumn - Colonne verticale de symboles
 */
export const SymbolColumn = memo(function SymbolColumn({
  count = 10,
  size = 16,
  gap = 24,
  color = '#C2FE0B',
  opacity = 0.15,
  className = '',
}) {
  const symbols = useMemo(() => {
    return Array.from({ length: count }, () =>
      SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
    );
  }, [count]);

  return (
    <div
      className={`flex flex-col items-center pointer-events-none ${className}`}
      style={{ gap: `${gap}px`, color, opacity, fontSize: `${size}px` }}
    >
      {symbols.map((char, i) => (
        <span key={i} className="font-mono">{char}</span>
      ))}
    </div>
  );
});

// ═══════════════════════════════════════════════════════════════════════════
// MOTIFS SVG ORIGINAUX - Inspirés de l'esthétique Marathon
// Formes fluides, organiques, abstraites avec traits épais
// ═══════════════════════════════════════════════════════════════════════════

/**
 * MotifWave - Forme ondulée fluide (inspiré fig02)
 */
export const MotifWave = memo(function MotifWave({
  size = 100,
  color = '#C2FE0B',
  className = '',
}) {
  const scale = size / 100;
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 100 60" className={className}>
      <path
        d="M5 30 C5 15, 20 5, 35 5 L65 5 C80 5, 95 15, 95 30 C95 45, 80 55, 65 55 L35 55 C20 55, 5 45, 5 30 Z M25 30 C25 22, 32 15, 42 15 L58 15 C68 15, 75 22, 75 30 C75 38, 68 45, 58 45 L42 45 C32 45, 25 38, 25 30 Z"
        fill={color}
        fillRule="evenodd"
      />
    </svg>
  );
});

/**
 * MotifTriad - Trois formes en éventail (inspiré fig03)
 */
export const MotifTriad = memo(function MotifTriad({
  size = 100,
  color = '#C2FE0B',
  className = '',
}) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 100 70" className={className}>
      <g fill={color}>
        {/* Forme gauche */}
        <path d="M5 65 C5 40, 15 20, 30 10 C35 25, 30 45, 20 60 Z" />
        {/* Forme centrale */}
        <path d="M40 65 C38 35, 45 10, 50 5 C55 10, 62 35, 60 65 Z" />
        {/* Forme droite */}
        <path d="M95 65 C95 40, 85 20, 70 10 C65 25, 70 45, 80 60 Z" />
      </g>
    </svg>
  );
});

/**
 * MotifLoop - Boucle entrelacée (inspiré fig01)
 */
export const MotifLoop = memo(function MotifLoop({
  size = 100,
  color = '#C2FE0B',
  className = '',
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <g fill="none" stroke={color} strokeWidth="8" strokeLinecap="round">
        {/* Boucle principale */}
        <path d="M20 80 L20 30 C20 15, 35 10, 50 10 C65 10, 80 15, 80 30 L80 80" />
        {/* Boucle intérieure */}
        <path d="M35 80 L35 40 C35 30, 42 25, 50 25 C58 25, 65 30, 65 40 L65 80" />
      </g>
    </svg>
  );
});

/**
 * MotifCurl - Forme courbée fluide (inspiré fig04)
 */
export const MotifCurl = memo(function MotifCurl({
  size = 100,
  color = '#C2FE0B',
  className = '',
}) {
  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 100 80" className={className}>
      <path
        d="M10 70 C10 30, 30 10, 50 10 C70 10, 85 25, 85 40 C85 55, 70 65, 55 65 C45 65, 38 58, 38 50 C38 42, 45 38, 52 38 C58 38, 62 42, 62 48"
        fill="none"
        stroke={color}
        strokeWidth="10"
        strokeLinecap="round"
      />
    </svg>
  );
});

/**
 * MotifArch - Double arche (inspiré fig06)
 */
export const MotifArch = memo(function MotifArch({
  size = 100,
  color = '#C2FE0B',
  className = '',
}) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 100 60" className={className}>
      <g fill={color}>
        {/* Arche gauche */}
        <path d="M5 55 L5 25 C5 10, 20 5, 35 5 C50 5, 50 20, 50 30 L50 55 L35 55 L35 30 C35 25, 30 20, 25 20 C20 20, 15 25, 15 30 L15 55 Z" />
        {/* Arche droite */}
        <path d="M50 55 L50 30 C50 20, 50 5, 65 5 C80 5, 95 10, 95 25 L95 55 L85 55 L85 30 C85 25, 80 20, 75 20 C70 20, 65 25, 65 30 L65 55 Z" />
      </g>
    </svg>
  );
});

/**
 * MotifSplit - Forme fendue symétrique (inspiré fig05)
 */
export const MotifSplit = memo(function MotifSplit({
  size = 100,
  color = '#C2FE0B',
  className = '',
}) {
  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 100 80" className={className}>
      <g fill={color}>
        {/* Partie gauche */}
        <path d="M5 75 L5 20 C5 10, 15 5, 30 5 C40 5, 45 12, 48 20 L48 75 L35 75 L35 25 C35 18, 28 15, 22 15 C16 15, 12 20, 12 28 L12 75 Z" />
        {/* Partie droite - miroir */}
        <path d="M95 75 L95 20 C95 10, 85 5, 70 5 C60 5, 55 12, 52 20 L52 75 L65 75 L65 25 C65 18, 72 15, 78 15 C84 15, 88 20, 88 28 L88 75 Z" />
      </g>
    </svg>
  );
});

/**
 * MotifInfinity - Forme infini/ruban (inspiré fig07)
 */
export const MotifInfinity = memo(function MotifInfinity({
  size = 100,
  color = '#C2FE0B',
  className = '',
}) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 100 50" className={className}>
      <path
        d="M25 25 C25 10, 10 10, 10 25 C10 40, 25 40, 35 30 L65 20 C75 10, 90 10, 90 25 C90 40, 75 40, 75 25 C75 10, 90 10, 90 25 C90 40, 75 40, 65 30 L35 20 C25 10, 10 10, 10 25 C10 40, 25 40, 25 25"
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  );
});

// ═══════════════════════════════════════════════════════════════════════════
// COMPOSITIONS DE SYMBOLES - Inspirées des Screens_Jeu Marathon
// Grilles de ● × ○ □ arrangées artistiquement
// ═══════════════════════════════════════════════════════════════════════════

/**
 * SymbolComposition - Composition artistique de symboles type Marathon
 */
export const SymbolComposition = memo(function SymbolComposition({
  variant = 'dots', // 'dots', 'crosses', 'mixed', 'circles'
  rows = 5,
  cols = 8,
  size = 6,
  gap = 16,
  color = '#C2FE0B',
  opacity = 0.6,
  className = '',
}) {
  const getSymbol = (variant, index) => {
    switch (variant) {
      case 'dots':
        return '●';
      case 'crosses':
        return '×';
      case 'circles':
        return '○';
      case 'mixed':
        const symbols = ['●', '×', '○', '□'];
        return symbols[index % symbols.length];
      default:
        return '●';
    }
  };

  return (
    <div
      className={`grid pointer-events-none font-mono ${className}`}
      style={{
        gridTemplateColumns: `repeat(${cols}, ${size}px)`,
        gap: `${gap}px`,
        color,
        opacity,
        fontSize: `${size}px`,
        lineHeight: 1,
      }}
    >
      {Array.from({ length: rows * cols }, (_, i) => (
        <span key={i} className="text-center">{getSymbol(variant, i)}</span>
      ))}
    </div>
  );
});

/**
 * SymbolRow - Ligne de symboles identiques
 */
export const SymbolRow = memo(function SymbolRow({
  symbol = '●',
  count = 10,
  size = 8,
  gap = 20,
  color = '#C2FE0B',
  opacity = 0.5,
  className = '',
}) {
  return (
    <div
      className={`flex items-center pointer-events-none font-mono ${className}`}
      style={{ gap: `${gap}px`, color, opacity, fontSize: `${size}px` }}
    >
      {Array.from({ length: count }, (_, i) => (
        <span key={i}>{symbol}</span>
      ))}
    </div>
  );
});

/**
 * CrossGrid - Grille de croix × (très Marathon)
 */
export const CrossGrid = memo(function CrossGrid({
  rows = 4,
  cols = 6,
  size = 10,
  gap = 24,
  color = '#C2FE0B',
  opacity = 0.4,
  className = '',
}) {
  return (
    <div
      className={`grid pointer-events-none ${className}`}
      style={{
        gridTemplateColumns: `repeat(${cols}, ${size}px)`,
        gap: `${gap}px`,
      }}
    >
      {Array.from({ length: rows * cols }, (_, i) => (
        <span
          key={i}
          className="text-center font-mono"
          style={{ color, opacity, fontSize: `${size}px`, lineHeight: 1 }}
        >
          ×
        </span>
      ))}
    </div>
  );
});

/**
 * DotCluster - Cluster de points (composition libre)
 */
export const DotCluster = memo(function DotCluster({
  pattern = 'triangle', // 'triangle', 'diamond', 'line', 'random'
  count = 10,
  dotSize = 6,
  color = '#C2FE0B',
  opacity = 0.5,
  className = '',
}) {
  const positions = useMemo(() => {
    switch (pattern) {
      case 'triangle':
        return [
          { x: 50, y: 10 },
          { x: 30, y: 40 }, { x: 50, y: 40 }, { x: 70, y: 40 },
          { x: 10, y: 70 }, { x: 30, y: 70 }, { x: 50, y: 70 }, { x: 70, y: 70 }, { x: 90, y: 70 },
        ];
      case 'diamond':
        return [
          { x: 50, y: 10 },
          { x: 30, y: 30 }, { x: 70, y: 30 },
          { x: 10, y: 50 }, { x: 50, y: 50 }, { x: 90, y: 50 },
          { x: 30, y: 70 }, { x: 70, y: 70 },
          { x: 50, y: 90 },
        ];
      case 'line':
        return Array.from({ length: count }, (_, i) => ({
          x: 10 + (80 / (count - 1)) * i,
          y: 50,
        }));
      default:
        return Array.from({ length: count }, () => ({
          x: 10 + Math.random() * 80,
          y: 10 + Math.random() * 80,
        }));
    }
  }, [pattern, count]);

  return (
    <svg viewBox="0 0 100 100" className={`pointer-events-none ${className}`}>
      {positions.map((pos, i) => (
        <circle
          key={i}
          cx={pos.x}
          cy={pos.y}
          r={dotSize / 2}
          fill={color}
          opacity={opacity}
        />
      ))}
    </svg>
  );
});

/**
 * Corner Brackets - Cadre avec coins animés
 * Utilisé pour encadrer des sections importantes
 */
export const CornerBrackets = memo(function CornerBrackets({
  size = 24,
  thickness = 2,
  color = '#C2FE0B',
  className = '',
  animate = true,
}) {
  const style = {
    '--bracket-size': `${size}px`,
    '--bracket-thickness': `${thickness}px`,
    '--bracket-color': color,
  };

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} style={style}>
      {/* Top Left */}
      <div
        className={`absolute top-0 left-0 ${animate ? 'group-hover:scale-110 transition-transform' : ''}`}
        style={{
          width: size,
          height: size,
          borderTop: `${thickness}px solid ${color}`,
          borderLeft: `${thickness}px solid ${color}`,
        }}
      />
      {/* Top Right */}
      <div
        className={`absolute top-0 right-0 ${animate ? 'group-hover:scale-110 transition-transform' : ''}`}
        style={{
          width: size,
          height: size,
          borderTop: `${thickness}px solid ${color}`,
          borderRight: `${thickness}px solid ${color}`,
        }}
      />
      {/* Bottom Left */}
      <div
        className={`absolute bottom-0 left-0 ${animate ? 'group-hover:scale-110 transition-transform' : ''}`}
        style={{
          width: size,
          height: size,
          borderBottom: `${thickness}px solid ${color}`,
          borderLeft: `${thickness}px solid ${color}`,
        }}
      />
      {/* Bottom Right */}
      <div
        className={`absolute bottom-0 right-0 ${animate ? 'group-hover:scale-110 transition-transform' : ''}`}
        style={{
          width: size,
          height: size,
          borderBottom: `${thickness}px solid ${color}`,
          borderRight: `${thickness}px solid ${color}`,
        }}
      />
    </div>
  );
});

/**
 * Dot Grid - Grille de points
 * Pattern subtil pour les arrière-plans
 */
export const DotGrid = memo(function DotGrid({
  dotSize = 2,
  gap = 24,
  color = '#C2FE0B',
  opacity = 0.15,
  className = '',
}) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle, ${color} ${dotSize}px, transparent ${dotSize}px)`,
        backgroundSize: `${gap}px ${gap}px`,
        opacity,
      }}
    />
  );
});

/**
 * Line Pattern - Lignes diagonales ou horizontales
 */
export const LinePattern = memo(function LinePattern({
  angle = 45,
  spacing = 20,
  thickness = 1,
  color = '#C2FE0B',
  opacity = 0.1,
  className = '',
}) {
  const gradient = angle === 0
    ? `repeating-linear-gradient(0deg, ${color} 0px, ${color} ${thickness}px, transparent ${thickness}px, transparent ${spacing}px)`
    : angle === 90
    ? `repeating-linear-gradient(90deg, ${color} 0px, ${color} ${thickness}px, transparent ${thickness}px, transparent ${spacing}px)`
    : `repeating-linear-gradient(${angle}deg, ${color} 0px, ${color} ${thickness}px, transparent ${thickness}px, transparent ${spacing}px)`;

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: gradient,
        opacity,
      }}
    />
  );
});

/**
 * Cross Pattern - Croix répétées
 */
export const CrossPattern = memo(function CrossPattern({
  size = 8,
  gap = 40,
  thickness = 1,
  color = '#C2FE0B',
  opacity = 0.12,
  className = '',
}) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(${color} ${thickness}px, transparent ${thickness}px),
          linear-gradient(90deg, ${color} ${thickness}px, transparent ${thickness}px)
        `,
        backgroundSize: `${gap}px ${gap}px`,
        backgroundPosition: `center center`,
        opacity,
      }}
    />
  );
});

/**
 * Scan Line - Ligne de scan horizontale animée
 */
export const ScanLine = memo(function ScanLine({
  color = '#C2FE0B',
  opacity = 0.3,
  speed = 3,
  className = '',
}) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      <div
        className="absolute left-0 right-0 h-px animate-scan"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          opacity,
          animationDuration: `${speed}s`,
        }}
      />
    </div>
  );
});

/**
 * Grid Overlay - Grille technique
 */
export const GridOverlay = memo(function GridOverlay({
  cellSize = 60,
  color = '#FFFFFF',
  opacity = 0.03,
  className = '',
}) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(${color} 1px, transparent 1px),
          linear-gradient(90deg, ${color} 1px, transparent 1px)
        `,
        backgroundSize: `${cellSize}px ${cellSize}px`,
        opacity,
      }}
    />
  );
});

/**
 * Noise Texture - Texture de bruit subtile
 */
export const NoiseTexture = memo(function NoiseTexture({
  opacity = 0.03,
  className = '',
}) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        opacity,
      }}
    />
  );
});

/**
 * Data Marker - Petit marqueur de données
 */
export const DataMarker = memo(function DataMarker({
  label = '001',
  color = '#C2FE0B',
  className = '',
}) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div
        className="w-2 h-2"
        style={{ backgroundColor: color }}
      />
      <span
        className="font-mono text-[10px] tracking-widest"
        style={{ color }}
      >
        {label}
      </span>
    </div>
  );
});

/**
 * Tech Border - Bordure technique avec détails
 */
export const TechBorder = memo(function TechBorder({
  position = 'left', // 'left', 'right', 'top', 'bottom'
  color = '#C2FE0B',
  thickness = 2,
  dashLength = 8,
  gapLength = 4,
  className = '',
}) {
  const isVertical = position === 'left' || position === 'right';

  const positionStyles = {
    left: 'left-0 top-0 bottom-0',
    right: 'right-0 top-0 bottom-0',
    top: 'top-0 left-0 right-0',
    bottom: 'bottom-0 left-0 right-0',
  };

  return (
    <div
      className={`absolute ${positionStyles[position]} pointer-events-none ${className}`}
      style={{
        width: isVertical ? thickness : '100%',
        height: isVertical ? '100%' : thickness,
        backgroundImage: isVertical
          ? `repeating-linear-gradient(180deg, ${color} 0px, ${color} ${dashLength}px, transparent ${dashLength}px, transparent ${dashLength + gapLength}px)`
          : `repeating-linear-gradient(90deg, ${color} 0px, ${color} ${dashLength}px, transparent ${dashLength}px, transparent ${dashLength + gapLength}px)`,
      }}
    />
  );
});

/**
 * Coordinate Display - Affichage de coordonnées style HUD
 */
export const CoordinateDisplay = memo(function CoordinateDisplay({
  x = '48.8566',
  y = '2.3522',
  color = '#666666',
  className = '',
}) {
  return (
    <div className={`font-mono text-[9px] tracking-wider ${className}`} style={{ color }}>
      <span>X:{x}</span>
      <span className="mx-2">·</span>
      <span>Y:{y}</span>
    </div>
  );
});

/**
 * Status Indicator - Indicateur de statut minimaliste
 */
export const StatusIndicator = memo(function StatusIndicator({
  status = 'active', // 'active', 'inactive', 'pending'
  label = '',
  className = '',
}) {
  const colors = {
    active: '#C2FE0B',
    inactive: '#666666',
    pending: '#00F0FF',
  };

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div
        className={`w-1.5 h-1.5 rounded-full ${status === 'active' ? 'animate-pulse' : ''}`}
        style={{ backgroundColor: colors[status] }}
      />
      {label && (
        <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: colors[status] }}>
          {label}
        </span>
      )}
    </div>
  );
});

// ═══════════════════════════════════════════════════════════════════════════
// SÉPARATEUR DE SECTION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * SectionDivider - Séparateur visuel entre sections
 */
export const SectionDivider = memo(function SectionDivider({
  variant = 'line', // 'line', 'dots', 'gradient'
  color = '#C2FE0B',
  className = '',
}) {
  if (variant === 'dots') {
    return (
      <div className={`flex items-center justify-center gap-4 py-8 ${className}`}>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
        <div className="flex gap-3">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: color, opacity: 0.4 + i * 0.1 }}
            />
          ))}
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
      </div>
    );
  }

  if (variant === 'gradient') {
    return (
      <div className={`relative h-px ${className}`}>
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}40, transparent)`,
          }}
        />
      </div>
    );
  }

  // Default: line
  return (
    <div className={`flex items-center gap-6 py-6 ${className}`}>
      <div
        className="w-12 h-px"
        style={{ backgroundColor: color, opacity: 0.6 }}
      />
      <span className="text-micro" style={{ color, opacity: 0.5 }}>●</span>
      <div className="h-px flex-1 bg-white/5" />
    </div>
  );
});

export default {
  CornerBrackets,
  DotGrid,
  LinePattern,
  CrossPattern,
  ScanLine,
  GridOverlay,
  NoiseTexture,
  DataMarker,
  TechBorder,
  CoordinateDisplay,
  StatusIndicator,
};
