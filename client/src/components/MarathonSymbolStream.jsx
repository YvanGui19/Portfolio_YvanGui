import { useState, useEffect, memo } from 'react';

/**
 * MarathonSymbolStream - Colonnes/lignes avec défilement CSS et impulsions tsunami
 * Les glitchs se propagent en vagues le long des colonnes/lignes
 */

const SYMBOLS = ['✖', '◎', '□', '▣', '⊕', '⦿', '×', '+', '○', '◇', '/', '\\', '|', '-', '▲', '▼'];

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

// Symbole qui réagit aux impulsions
const PulseSymbol = memo(function PulseSymbol({ initial, pulseTime, index, total }) {
  const [symbol, setSymbol] = useState(initial);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (!pulseTime) return;

    // Propagation le long de la colonne/ligne
    const delay = (index / total) * 600; // 600ms pour traverser toute la colonne

    const timeout = setTimeout(() => {
      if (Math.random() < 0.75) {
        setIsGlitching(true);
        setSymbol(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);

        setTimeout(() => {
          setIsGlitching(false);
          setSymbol(initial);
        }, 50 + Math.random() * 80);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [pulseTime, index, total, initial]);

  return (
    <span className={isGlitching ? 'brightness-150' : ''}>
      {symbol}
    </span>
  );
});

// Colonne verticale avec impulsions
const VerticalColumn = memo(function VerticalColumn({ index, speed, totalColumns, reverse = false }) {
  const symbolCount = 50;
  const prefersReducedMotion = usePrefersReducedMotion();
  const [pulseTime, setPulseTime] = useState(null);

  const [initialSymbols] = useState(() =>
    Array.from({ length: symbolCount }, () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)])
  );

  // Déclencher des impulsions
  useEffect(() => {
    if (prefersReducedMotion) return;

    const triggerPulse = () => {
      const delay = 6000 + Math.random() * 12000;
      return setTimeout(() => {
        setPulseTime(Date.now());
        timeoutId = triggerPulse();
      }, delay);
    };

    // Délai initial basé sur l'index de la colonne pour désynchroniser
    let timeoutId = setTimeout(() => {
      setPulseTime(Date.now());
      timeoutId = triggerPulse();
    }, 2000 + index * 500 + Math.random() * 3000);

    return () => clearTimeout(timeoutId);
  }, [prefersReducedMotion, index]);

  const delay = (index / totalColumns) * speed;
  const isReversed = reverse ? index % 2 === 0 : index % 2 === 1;
  const animationName = isReversed ? 'symbolScrollVerticalReverse' : 'symbolScrollVertical';

  return (
    <div
      className="flex flex-col text-slate/50 font-mono text-[0.9rem] leading-relaxed select-none overflow-hidden h-full"
      style={{ width: '1.2rem' }}
    >
      <div
        className="flex flex-col"
        style={{
          animation: prefersReducedMotion ? 'none' : `${animationName} ${speed}s linear infinite`,
          animationDelay: `-${delay}s`,
        }}
      >
        {initialSymbols.map((symbol, i) => (
          <span key={i} className="h-6 flex items-center justify-center">
            <PulseSymbol
              initial={symbol}
              pulseTime={pulseTime}
              index={i}
              total={symbolCount}
            />
          </span>
        ))}
        {initialSymbols.map((symbol, i) => (
          <span key={`dup-${i}`} className="h-6 flex items-center justify-center">
            <PulseSymbol
              initial={symbol}
              pulseTime={pulseTime}
              index={i}
              total={symbolCount}
            />
          </span>
        ))}
      </div>
    </div>
  );
});

// Ligne horizontale avec impulsions
const HorizontalRow = memo(function HorizontalRow({ index, speed, totalRows, reverse = false }) {
  const symbolCount = 80;
  const prefersReducedMotion = usePrefersReducedMotion();
  const [pulseTime, setPulseTime] = useState(null);

  const [initialSymbols] = useState(() =>
    Array.from({ length: symbolCount }, () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)])
  );

  useEffect(() => {
    if (prefersReducedMotion) return;

    const triggerPulse = () => {
      const delay = 5000 + Math.random() * 10000;
      return setTimeout(() => {
        setPulseTime(Date.now());
        timeoutId = triggerPulse();
      }, delay);
    };

    let timeoutId = setTimeout(() => {
      setPulseTime(Date.now());
      timeoutId = triggerPulse();
    }, 2000 + index * 400 + Math.random() * 2000);

    return () => clearTimeout(timeoutId);
  }, [prefersReducedMotion, index]);

  const delay = (index / totalRows) * speed;
  const isReversed = reverse ? index % 2 === 0 : index % 2 === 1;
  const animationName = isReversed ? 'symbolScrollHorizontalReverse' : 'symbolScrollHorizontal';

  return (
    <div
      className="flex text-slate/50 font-mono text-[0.9rem] select-none overflow-hidden w-full"
      style={{ height: '1.4rem' }}
    >
      <div
        className="flex whitespace-nowrap gap-4"
        style={{
          animation: prefersReducedMotion ? 'none' : `${animationName} ${speed}s linear infinite`,
          animationDelay: `-${delay}s`,
        }}
      >
        <span className="tracking-[0.3em] flex">
          {initialSymbols.map((symbol, i) => (
            <PulseSymbol
              key={i}
              initial={symbol}
              pulseTime={pulseTime}
              index={i}
              total={symbolCount}
            />
          ))}
        </span>
        <span className="tracking-[0.3em] flex">
          {initialSymbols.map((symbol, i) => (
            <PulseSymbol
              key={`dup-${i}`}
              initial={symbol}
              pulseTime={pulseTime}
              index={i}
              total={symbolCount}
            />
          ))}
        </span>
      </div>
    </div>
  );
});

const MarathonSymbolStream = memo(function MarathonSymbolStream({
  direction = 'vertical',
  countLeft = 3,
  countRight = 2,
  countTop = 3,
  countBottom = 2,
  speed = 20,
  className = '',
  fixed = true,
}) {
  const positionClass = fixed ? 'fixed' : 'absolute';
  const clampLeft = Math.min(Math.max(countLeft, 0), 8);
  const clampRight = Math.min(Math.max(countRight, 0), 8);
  const clampTop = Math.min(Math.max(countTop, 0), 8);
  const clampBottom = Math.min(Math.max(countBottom, 0), 8);

  if (direction === 'vertical') {
    return (
      <>
        <div
          className={`fixed left-0 top-0 h-screen flex gap-1 pointer-events-none z-0 ${className}`}
          style={{ paddingLeft: '0.5rem' }}
          aria-hidden="true"
        >
          {Array.from({ length: clampLeft }).map((_, i) => (
            <VerticalColumn
              key={`left-${i}`}
              index={i}
              speed={speed}
              totalColumns={clampLeft}
              reverse={false}
            />
          ))}
        </div>

        <div
          className={`fixed right-0 top-0 h-screen flex gap-1 pointer-events-none z-0 ${className}`}
          style={{ paddingRight: '0.5rem' }}
          aria-hidden="true"
        >
          {Array.from({ length: clampRight }).map((_, i) => (
            <VerticalColumn
              key={`right-${i}`}
              index={i}
              speed={speed + 5}
              totalColumns={clampRight}
              reverse={true}
            />
          ))}
        </div>
      </>
    );
  }

  if (direction === 'horizontal') {
    return (
      <>
        {clampTop > 0 && (
          <div
            className={`${positionClass} left-0 top-0 w-screen flex flex-col gap-0.5 pointer-events-none z-0 ${className}`}
            aria-hidden="true"
          >
            {Array.from({ length: clampTop }).map((_, i) => (
              <HorizontalRow
                key={`top-${i}`}
                index={i}
                speed={speed}
                totalRows={clampTop}
                reverse={false}
              />
            ))}
          </div>
        )}

        {clampBottom > 0 && (
          <div
            className={`fixed left-0 bottom-8 w-screen flex flex-col gap-1 pointer-events-none z-0 ${className}`}
            aria-hidden="true"
          >
            {Array.from({ length: clampBottom }).map((_, i) => (
              <HorizontalRow
                key={`bottom-${i}`}
                index={i}
                speed={speed + 5}
                totalRows={clampBottom}
                reverse={true}
              />
            ))}
          </div>
        )}
      </>
    );
  }

  return null;
});

export default MarathonSymbolStream;
