import { useState, useEffect, memo } from 'react';

/**
 * MarathonSymbolGrid - Grille de symboles avec impulsions tsunami
 * Les glitchs se propagent en vagues depuis un coin
 */

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (event) => setPrefersReducedMotion(event.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}

const SYMBOLS = [
  '✖', '◎', '□', '▣', '⊕', '⦿',
  '×', '+', '○', '◇', '■', '△',
  '/', '\\', '|', '-', '#', '@',
];

const COLOR_CLASSES = {
  lime: 'text-lime/70',
  cyan: 'text-cyan/70',
  violet: 'text-violet/70',
  slate: 'text-slate/70',
};

const SIZE_CLASSES = {
  sm: 'text-[0.6rem]',
  md: 'text-[0.8rem]',
  lg: 'text-[1.1rem]',
  xl: 'text-[1.4rem]',
};

const GAP_SIZES = {
  sm: '1px',
  md: '3px',
  lg: '4px',
  xl: '5px',
};

// Cellule qui réagit aux impulsions
const PulseCell = memo(function PulseCell({
  initialSymbol,
  color,
  opacity,
  pulseTime,
  row,
  col,
  rows,
  cols,
}) {
  const [symbol, setSymbol] = useState(initialSymbol);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (!pulseTime) return;

    // Distance depuis le coin haut-gauche (origine de l'impulsion)
    const distance = Math.sqrt(row * row + col * col);
    // Normaliser par la diagonale max
    const maxDistance = Math.sqrt(rows * rows + cols * cols);
    const delay = (distance / maxDistance) * 400; // 400ms pour traverser toute la grille

    const timeout = setTimeout(() => {
      // 80% de chance d'être touché
      if (Math.random() < 0.8) {
        setIsGlitching(true);
        setSymbol(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);

        setTimeout(() => {
          setIsGlitching(false);
          setSymbol(initialSymbol);
        }, 60 + Math.random() * 80);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [pulseTime, row, col, rows, cols, initialSymbol]);

  return (
    <span
      className={`${color} ${isGlitching ? 'brightness-150' : ''}`}
      style={{ opacity }}
    >
      {symbol}
    </span>
  );
});

const MarathonSymbolGrid = memo(function MarathonSymbolGrid({
  rows = 4,
  cols = 6,
  color = 'lime',
  size = 'md',
  className = '',
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const totalCells = rows * cols;
  const [pulseTime, setPulseTime] = useState(null);

  // Déclencher des impulsions périodiquement
  useEffect(() => {
    if (prefersReducedMotion) return;

    const triggerPulse = () => {
      const delay = 4000 + Math.random() * 8000;
      return setTimeout(() => {
        setPulseTime(Date.now());
        timeoutId = triggerPulse();
      }, delay);
    };

    let timeoutId = setTimeout(() => {
      setPulseTime(Date.now());
      timeoutId = triggerPulse();
    }, 1500 + Math.random() * 2000);

    return () => clearTimeout(timeoutId);
  }, [prefersReducedMotion]);

  // Générer les cellules une seule fois
  const [cells] = useState(() =>
    Array.from({ length: totalCells }, (_, i) => ({
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      opacity: 0.4 + Math.random() * 0.6,
      row: Math.floor(i / cols),
      col: i % cols,
    }))
  );

  const colorClass = COLOR_CLASSES[color] || COLOR_CLASSES.lime;
  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;
  const gapSize = GAP_SIZES[size] || GAP_SIZES.md;

  return (
    <div
      className={`font-mono ${sizeClass} leading-tight select-none pointer-events-none ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: gapSize,
      }}
      aria-hidden="true"
    >
      {cells.map((cell, index) => (
        <PulseCell
          key={index}
          initialSymbol={cell.symbol}
          color={colorClass}
          opacity={cell.opacity}
          pulseTime={pulseTime}
          row={cell.row}
          col={cell.col}
          rows={rows}
          cols={cols}
        />
      ))}
    </div>
  );
});

export default MarathonSymbolGrid;
