import { memo, useMemo, useEffect, useState } from 'react';

/**
 * MarathonSymbolGrid - Grille dense de symboles style Marathon
 * Inspire du screenshot "marathon-bungie-extraction-shooter-news.png"
 */

const SYMBOLS = ['X', 'O', '+', '.', ':', '/', '\\', '*', '#', '-'];
const SYMBOLS_EXTENDED = ['X', 'O', '+', '.', '⊗', '⊕', '□', '◯', '△', '▽'];

function generateGrid(cols, rows, density, extended = false) {
  const symbols = extended ? SYMBOLS_EXTENDED : SYMBOLS;
  const grid = [];

  for (let row = 0; row < rows; row++) {
    const rowData = [];
    for (let col = 0; col < cols; col++) {
      // Density determines if cell is filled or empty
      const isFilled = Math.random() < density;
      if (isFilled) {
        rowData.push(symbols[Math.floor(Math.random() * symbols.length)]);
      } else {
        rowData.push('.');
      }
    }
    grid.push(rowData);
  }
  return grid;
}

const MarathonSymbolGrid = memo(function MarathonSymbolGrid({
  mode = 'static', // static, scrolling, randomizing, pulse
  density = 'medium', // sparse (0.15), medium (0.3), dense (0.5)
  inverted = false, // false: black symbols on transparent, true: lime symbols on black
  opacity = 0.1,
  cellSize = 20,
  className = '',
  extended = false, // Use extended Unicode symbols
  speed = 50, // Animation speed (lower = faster)
  changeSpeed = 2000, // For randomizing mode
  changeChance = 0.02, // Chance for each cell to change per tick
}) {
  const densityValues = {
    sparse: 0.15,
    medium: 0.3,
    dense: 0.5,
  };

  const cols = Math.ceil(typeof window !== 'undefined' ? window.innerWidth / cellSize : 100);
  const rows = Math.ceil(typeof window !== 'undefined' ? window.innerHeight / cellSize : 50);

  const [grid, setGrid] = useState(() => generateGrid(cols, rows * 2, densityValues[density] || 0.3, extended));
  const [offset, setOffset] = useState(0);
  const [pulsePhase, setPulsePhase] = useState(0);

  // Scrolling animation
  useEffect(() => {
    if (mode !== 'scrolling') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setOffset(prev => (prev + 1) % (rows * cellSize));
    }, speed);

    return () => clearInterval(interval);
  }, [mode, rows, cellSize, speed]);

  // Randomizing animation
  useEffect(() => {
    if (mode !== 'randomizing') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setGrid(prevGrid => {
        const symbols = extended ? SYMBOLS_EXTENDED : SYMBOLS;
        return prevGrid.map(row =>
          row.map(cell => {
            if (Math.random() < changeChance) {
              const isFilled = Math.random() < (densityValues[density] || 0.3);
              return isFilled ? symbols[Math.floor(Math.random() * symbols.length)] : '.';
            }
            return cell;
          })
        );
      });
    }, changeSpeed);

    return () => clearInterval(interval);
  }, [mode, density, extended, changeSpeed, changeChance]);

  // Pulse animation
  useEffect(() => {
    if (mode !== 'pulse') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setPulsePhase(prev => (prev + 1) % 4);
    }, 500);

    return () => clearInterval(interval);
  }, [mode]);

  const gridStyle = useMemo(() => ({
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
    opacity,
  }), [opacity]);

  const innerStyle = useMemo(() => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
    gap: 0,
    fontFamily: 'var(--font-mono)',
    fontSize: `${cellSize * 0.6}px`,
    lineHeight: `${cellSize}px`,
    color: inverted ? '#C2FE0B' : '#0A0E1A',
    backgroundColor: inverted ? '#0A0E1A' : 'transparent',
    transform: mode === 'scrolling' ? `translateY(-${offset}px)` : 'none',
    transition: mode === 'pulse' ? 'opacity 0.3s ease' : 'none',
  }), [cols, cellSize, inverted, mode, offset]);

  return (
    <div className={`marathon-symbol-grid ${className}`} style={gridStyle}>
      <div style={innerStyle}>
        {grid.map((row, rowIndex) => (
          row.map((cell, colIndex) => {
            const isPulseVisible = mode !== 'pulse' ||
              ((rowIndex + colIndex) % 4 === pulsePhase);

            return (
              <span
                key={`${rowIndex}-${colIndex}`}
                style={{
                  textAlign: 'center',
                  opacity: isPulseVisible ? 1 : 0.3,
                  transition: mode === 'pulse' ? 'opacity 0.3s ease' : 'none',
                }}
              >
                {cell}
              </span>
            );
          })
        ))}
      </div>
    </div>
  );
});

export default MarathonSymbolGrid;
