import { memo, useEffect, useRef, useCallback } from 'react';

/**
 * MatrixRain - Pluie de symboles Marathon style "Matrix"
 * Inspiré du screenshot marathon-bungie-extraction-shooter-news.png
 */

const SYMBOL_SETS = {
  marathon: ['✖', '⦿', '□', '⊹', '⁜', '⦾', '▣', '⊡', '⊗', '⊕', '△', '▽', '◯'],
  geometric: ['X', 'O', '+', '□', '◯', '△', '⊕', '⊗', '▣', '⊡'],
  minimal: ['X', 'O', '+', '.', ':', '-'],
  extended: ['X', '⊕', '⊗', '□', '◯', '△', '▽', '+', '⊹', '⦿', '⁜', '⦾', '▣', '⊡', '.', ':'],
};

const MatrixRain = memo(function MatrixRain({
  symbolSet = 'marathon',
  color = '#C2FE0B',
  backgroundColor = 'transparent',
  density = 0.03, // 0-1, chance of new drop per column per frame
  speed = 1.5, // Base fall speed
  fadeLength = 15, // Number of characters in the fade trail
  fontSize = 14,
  className = '',
  style = {},
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const dropsRef = useRef([]);

  const symbols = SYMBOL_SETS[symbolSet] || SYMBOL_SETS.marathon;

  const getRandomSymbol = useCallback(() => {
    return symbols[Math.floor(Math.random() * symbols.length)];
  }, [symbols]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      // Reset drops on resize
      const columns = Math.floor(rect.width / fontSize);
      dropsRef.current = Array(columns).fill(null).map(() => ({
        y: Math.random() * -100,
        speed: 0.5 + Math.random() * speed,
        chars: [],
      }));
    };

    resize();
    window.addEventListener('resize', resize);

    if (prefersReducedMotion) {
      // Static version for reduced motion
      const rect = canvas.getBoundingClientRect();
      ctx.fillStyle = backgroundColor === 'transparent' ? 'rgba(0,0,0,0)' : backgroundColor;
      ctx.fillRect(0, 0, rect.width, rect.height);
      ctx.font = `${fontSize}px monospace`;
      ctx.textAlign = 'center';

      const columns = Math.floor(rect.width / fontSize);
      const rows = Math.floor(rect.height / fontSize);

      for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
          if (Math.random() < density * 3) {
            const opacity = Math.random() * 0.5 + 0.1;
            ctx.fillStyle = color.replace(')', `, ${opacity})`).replace('rgb', 'rgba');
            if (!color.startsWith('rgb')) {
              ctx.fillStyle = `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
            }
            ctx.fillText(getRandomSymbol(), x * fontSize + fontSize / 2, y * fontSize + fontSize);
          }
        }
      }
      return;
    }

    const animate = () => {
      const rect = canvas.getBoundingClientRect();

      // Semi-transparent background for trail effect
      ctx.fillStyle = backgroundColor === 'transparent'
        ? 'rgba(0, 0, 0, 0.05)'
        : backgroundColor.replace(')', ', 0.05)').replace('rgb', 'rgba');
      ctx.fillRect(0, 0, rect.width, rect.height);

      ctx.font = `${fontSize}px monospace`;
      ctx.textAlign = 'center';

      const columns = dropsRef.current.length;

      for (let i = 0; i < columns; i++) {
        const drop = dropsRef.current[i];

        // Move drop
        drop.y += drop.speed;

        // Add new character
        if (drop.y > 0) {
          drop.chars.push({
            char: getRandomSymbol(),
            y: drop.y,
            brightness: 1,
          });
        }

        // Draw characters with fade
        drop.chars.forEach((char, idx) => {
          const age = drop.chars.length - idx;
          const opacity = Math.max(0, 1 - (age / fadeLength));

          if (opacity > 0) {
            // Brightest at the head
            const isHead = idx === drop.chars.length - 1;
            const finalOpacity = isHead ? 1 : opacity * 0.7;

            ctx.fillStyle = color;
            ctx.globalAlpha = finalOpacity;
            ctx.fillText(
              char.char,
              i * fontSize + fontSize / 2,
              char.y * fontSize
            );
          }
        });

        ctx.globalAlpha = 1;

        // Remove old characters
        drop.chars = drop.chars.filter((_, idx) => {
          const age = drop.chars.length - idx;
          return age < fadeLength;
        });

        // Reset drop when it goes off screen
        if (drop.y * fontSize > rect.height + fadeLength * fontSize) {
          if (Math.random() < density) {
            drop.y = 0;
            drop.speed = 0.5 + Math.random() * speed;
            drop.chars = [];
          }
        }

        // Random new drops
        if (drop.y < -50 && Math.random() < density) {
          drop.y = 0;
          drop.speed = 0.5 + Math.random() * speed;
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [color, backgroundColor, density, speed, fadeLength, fontSize, getRandomSymbol]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        width: '100%',
        height: '100%',
        ...style,
      }}
    />
  );
});

/**
 * SymbolCloud - Nuage statique de symboles avec densité variable
 */
export const SymbolCloud = memo(function SymbolCloud({
  symbolSet = 'marathon',
  color = '#C2FE0B',
  density = 0.4,
  size = 12,
  rows = 20,
  cols = 40,
  className = '',
  animated = false,
  animationSpeed = 2000,
}) {
  const symbols = SYMBOL_SETS[symbolSet] || SYMBOL_SETS.marathon;
  const containerRef = useRef(null);

  // Generate grid
  const grid = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      const filled = Math.random() < density;
      row.push(filled ? symbols[Math.floor(Math.random() * symbols.length)] : '.');
    }
    grid.push(row);
  }

  return (
    <div
      ref={containerRef}
      className={`font-mono select-none pointer-events-none overflow-hidden ${className}`}
      style={{
        fontSize: `${size}px`,
        lineHeight: `${size * 1.2}px`,
        color,
        letterSpacing: '0.15em',
        whiteSpace: 'pre',
      }}
    >
      {grid.map((row, i) => (
        <div key={i}>{row.join('')}</div>
      ))}
    </div>
  );
});

/**
 * GridPattern - Grille géométrique style Marathon (inspiré du screenshot)
 */
export const GridPattern = memo(function GridPattern({
  cellSize = 24,
  lineColor = '#C2FE0B',
  lineOpacity = 0.15,
  dotColor = '#C2FE0B',
  dotOpacity = 0.3,
  showDots = true,
  className = '',
  style = {},
}) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(${lineColor}${Math.round(lineOpacity * 255).toString(16).padStart(2, '0')} 1px, transparent 1px),
          linear-gradient(90deg, ${lineColor}${Math.round(lineOpacity * 255).toString(16).padStart(2, '0')} 1px, transparent 1px)
        `,
        backgroundSize: `${cellSize}px ${cellSize}px`,
        ...style,
      }}
    >
      {showDots && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(circle, ${dotColor}${Math.round(dotOpacity * 255).toString(16).padStart(2, '0')} 1px, transparent 1px)`,
            backgroundSize: `${cellSize}px ${cellSize}px`,
            backgroundPosition: `${cellSize / 2}px ${cellSize / 2}px`,
          }}
        />
      )}
    </div>
  );
});

export default MatrixRain;
