import { memo, useMemo } from 'react';

/**
 * Symboles Unicode inspirés du jeu Marathon
 * Utilisés pour créer des compositions visuelles de fond
 */
const SYMBOLS = ['⁜', '⊡', '⊹', '▣', '□', '✖', '⦿', '⦾', '✤', '⁘', '◈', '◇', '▢', '⬡', '⬢', '◎', '◉', '⊕', '⊗', '⊙'];

const COLORS = {
  lime: '#C2FE0B',
  cyan: '#00F0FF',
  white: '#FFFFFF',
  cream: '#E8E4DC',
  red: '#FF3030',
};

/**
 * Grille de symboles - affiche une grille de symboles Unicode
 */
export const SymbolGrid = memo(function SymbolGrid({
  rows = 5,
  cols = 10,
  symbolSize = 24,
  gap = 16,
  color = 'lime',
  opacity = 0.1,
  randomize = true,
  className = '',
}) {
  const symbols = useMemo(() => {
    const grid = [];
    for (let i = 0; i < rows * cols; i++) {
      if (randomize) {
        grid.push(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
      } else {
        grid.push(SYMBOLS[i % SYMBOLS.length]);
      }
    }
    return grid;
  }, [rows, cols, randomize]);

  const c = COLORS[color] || color;

  return (
    <div
      className={`grid pointer-events-none select-none ${className}`}
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: `${gap}px`,
        opacity,
        color: c,
        fontSize: `${symbolSize}px`,
        lineHeight: 1,
      }}
    >
      {symbols.map((symbol, i) => (
        <span key={i} className="text-center">
          {symbol}
        </span>
      ))}
    </div>
  );
});

/**
 * Cascade de symboles - colonnes verticales avec animation
 */
export const SymbolCascade = memo(function SymbolCascade({
  columns = 8,
  symbolsPerColumn = 12,
  symbolSize = 20,
  color = 'lime',
  opacity = 0.08,
  className = '',
}) {
  const c = COLORS[color] || color;

  const columnData = useMemo(() => {
    return Array.from({ length: columns }, () => ({
      symbols: Array.from({ length: symbolsPerColumn }, () =>
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
      ),
      offset: Math.random() * 100,
    }));
  }, [columns, symbolsPerColumn]);

  return (
    <div
      className={`flex justify-between pointer-events-none select-none ${className}`}
      style={{ opacity, color: c, fontSize: `${symbolSize}px` }}
    >
      {columnData.map((col, i) => (
        <div
          key={i}
          className="flex flex-col gap-3"
          style={{ transform: `translateY(${col.offset}px)` }}
        >
          {col.symbols.map((symbol, j) => (
            <span key={j} className="leading-none">{symbol}</span>
          ))}
        </div>
      ))}
    </div>
  );
});

/**
 * Ligne de symboles horizontale
 */
export const SymbolLine = memo(function SymbolLine({
  count = 15,
  symbolSize = 18,
  gap = 24,
  color = 'lime',
  opacity = 0.15,
  className = '',
}) {
  const symbols = useMemo(() => {
    return Array.from({ length: count }, () =>
      SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
    );
  }, [count]);

  const c = COLORS[color] || color;

  return (
    <div
      className={`flex items-center justify-center pointer-events-none select-none ${className}`}
      style={{
        gap: `${gap}px`,
        opacity,
        color: c,
        fontSize: `${symbolSize}px`,
      }}
    >
      {symbols.map((symbol, i) => (
        <span key={i}>{symbol}</span>
      ))}
    </div>
  );
});

/**
 * Cluster de symboles - groupe aléatoire positionné
 */
export const SymbolCluster = memo(function SymbolCluster({
  count = 7,
  spread = 100,
  symbolSize = 28,
  color = 'lime',
  opacity = 0.12,
  className = '',
}) {
  const positions = useMemo(() => {
    return Array.from({ length: count }, () => ({
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      x: (Math.random() - 0.5) * spread * 2,
      y: (Math.random() - 0.5) * spread * 2,
      rotation: Math.random() * 360,
      scale: 0.6 + Math.random() * 0.8,
    }));
  }, [count, spread]);

  const c = COLORS[color] || color;

  return (
    <div
      className={`relative pointer-events-none select-none ${className}`}
      style={{
        width: spread * 2,
        height: spread * 2,
        opacity,
        color: c,
        fontSize: `${symbolSize}px`,
      }}
    >
      {positions.map((pos, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            left: `calc(50% + ${pos.x}px)`,
            top: `calc(50% + ${pos.y}px)`,
            transform: `translate(-50%, -50%) rotate(${pos.rotation}deg) scale(${pos.scale})`,
          }}
        >
          {pos.symbol}
        </span>
      ))}
    </div>
  );
});

/**
 * Bordure de symboles
 */
export const SymbolBorder = memo(function SymbolBorder({
  symbolSize = 14,
  gap = 20,
  color = 'lime',
  opacity = 0.1,
  side = 'left', // 'left', 'right', 'top', 'bottom'
  length = 10,
  className = '',
}) {
  const symbols = useMemo(() => {
    return Array.from({ length }, () =>
      SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
    );
  }, [length]);

  const c = COLORS[color] || color;
  const isVertical = side === 'left' || side === 'right';

  return (
    <div
      className={`flex pointer-events-none select-none ${isVertical ? 'flex-col' : 'flex-row'} ${className}`}
      style={{
        gap: `${gap}px`,
        opacity,
        color: c,
        fontSize: `${symbolSize}px`,
      }}
    >
      {symbols.map((symbol, i) => (
        <span key={i}>{symbol}</span>
      ))}
    </div>
  );
});

/**
 * Symbole unique décoratif
 */
export const SingleSymbol = memo(function SingleSymbol({
  symbol,
  size = 48,
  color = 'lime',
  opacity = 0.15,
  rotation = 0,
  className = '',
}) {
  const c = COLORS[color] || color;
  const displaySymbol = symbol || SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];

  return (
    <span
      className={`pointer-events-none select-none ${className}`}
      style={{
        fontSize: `${size}px`,
        color: c,
        opacity,
        transform: `rotate(${rotation}deg)`,
        display: 'inline-block',
      }}
    >
      {displaySymbol}
    </span>
  );
});

export default {
  Grid: SymbolGrid,
  Cascade: SymbolCascade,
  Line: SymbolLine,
  Cluster: SymbolCluster,
  Border: SymbolBorder,
  Single: SingleSymbol,
  SYMBOLS,
};
