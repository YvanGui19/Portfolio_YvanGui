import { memo, useState, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";

// Symboles Marathon avec variations de densité
const SYMBOLS_DENSE = ["✖", "◎", "□", "▣", "⦿", "⊕"];
const SYMBOLS_MEDIUM = ["×", "+", "○", "◇", "⊹"];
const SYMBOLS_SPARSE = ["·", "·", "+", "×"];

// Composant pour un symbole flottant animé avec mouvement de vague lent
const WaveSymbol = memo(function WaveSymbol({ style, delay = 0, waveOffset = 0 }) {
  const allSymbols = [...SYMBOLS_DENSE, ...SYMBOLS_MEDIUM];
  const [symbol, setSymbol] = useState(() => allSymbols[Math.floor(Math.random() * allSymbols.length)]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Changement de symbole très lent
    const interval = setInterval(() => {
      if (Math.random() < 0.02) {
        setSymbol(allSymbols[Math.floor(Math.random() * allSymbols.length)]);
      }
    }, 800 + delay);

    return () => clearInterval(interval);
  }, [delay]);

  return (
    <motion.span
      className="absolute font-mono text-lime select-none"
      style={style}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0.1, style.baseOpacity || 0.3, 0.1],
        x: [0, Math.sin(waveOffset) * 5, 0],
        y: [0, Math.cos(waveOffset) * 3, 0]
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        repeat: Infinity,
        delay: delay / 1000,
        ease: "easeInOut"
      }}
    >
      {symbol}
    </motion.span>
  );
});

// Cascade de symboles fluide avec effet de vague
function SymbolCascade({
  count = 120,
  side = "right",
  xOffset = 45,
  amplitude = 20,
  spread = 30,
  fadeOut = false,
  className = ""
}) {
  const symbols = useMemo(() => {
    const items = [];

    for (let i = 0; i < count; i++) {
      const progress = i / count;

      // Vagues multiples pour un effet plus organique
      const wave1 = Math.sin(progress * Math.PI * 3);
      const wave2 = Math.sin(progress * Math.PI * 5 + 1);
      const combinedWave = (wave1 + wave2 * 0.4) / 1.4;

      const xBase = xOffset + combinedWave * amplitude + (Math.random() - 0.5) * spread;
      const yPos = progress * 100;

      // Densité variable selon la position dans la vague
      const densityFactor = 0.5 + combinedWave * 0.3;
      if (Math.random() > densityFactor + 0.3) continue;

      // Opacité modulée
      let opacity = 0.15 + Math.abs(combinedWave) * 0.3 + Math.random() * 0.2;
      if (fadeOut && progress > 0.7) {
        opacity *= (1 - (progress - 0.7) / 0.3);
      }

      // Taille variable selon densité
      const size = 0.6 + Math.abs(combinedWave) * 0.5 + Math.random() * 0.4;

      const positionStyle = side === "right"
        ? { right: `${100 - xBase}%` }
        : { left: `${100 - xBase}%` };

      items.push({
        id: i,
        style: {
          ...positionStyle,
          top: `${yPos}%`,
          opacity,
          baseOpacity: opacity,
          fontSize: `${size}rem`,
          textShadow: `0 0 ${4 + Math.random() * 8}px rgba(194, 254, 11, ${0.3 + Math.random() * 0.4})`,
        },
        delay: i * 50,
        waveOffset: progress * Math.PI * 4,
      });
    }
    return items;
  }, [count, side, xOffset, amplitude, spread, fadeOut]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {symbols.map((item) => (
        <WaveSymbol
          key={item.id}
          style={item.style}
          delay={item.delay}
          waveOffset={item.waveOffset}
        />
      ))}
    </div>
  );
}

// Cascade globale avec vagues fluides multi-couches
export function GlobalSymbolCascade({ className = "" }) {
  const phaseRef = useRef(0);
  const [phase, setPhase] = useState(0);

  // Animation lente de phase pour mouvement global
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      phaseRef.current += 0.01;
      setPhase(phaseRef.current);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const symbols = useMemo(() => {
    const items = [];
    const totalSymbols = 200;

    // Créer plusieurs "rivières" de symboles
    const rivers = [
      { xBase: 85, amplitude: 12, density: 0.8, size: 0.75 },
      { xBase: 70, amplitude: 18, density: 0.5, size: 0.65 },
      { xBase: 55, amplitude: 10, density: 0.25, size: 0.55 },
    ];

    let id = 0;
    rivers.forEach((river, riverIndex) => {
      const symbolsInRiver = Math.floor(totalSymbols * river.density / rivers.length);

      for (let i = 0; i < symbolsInRiver; i++) {
        const progress = i / symbolsInRiver;

        // Vagues multiples avec fréquences différentes
        const wave1 = Math.sin((progress * 6 + riverIndex) * Math.PI);
        const wave2 = Math.sin((progress * 4 + riverIndex * 0.5) * Math.PI);
        const wave3 = Math.sin((progress * 2.5) * Math.PI);
        const combinedWave = (wave1 + wave2 * 0.5 + wave3 * 0.3) / 1.8;

        // Position avec ondulation
        const xPos = river.xBase + combinedWave * river.amplitude + (Math.random() - 0.5) * 8;
        const yPos = progress * 100;

        // Skip certains symboles pour créer des zones de densité variable
        const localDensity = river.density + combinedWave * 0.2;
        if (Math.random() > localDensity) continue;

        // Opacité et taille modulées par la vague
        const opacity = 0.15 + Math.abs(combinedWave) * 0.25 + Math.random() * 0.15;
        const size = river.size + Math.abs(combinedWave) * 0.25;

        items.push({
          id: id++,
          style: {
            right: `${100 - xPos}%`,
            top: `${yPos}%`,
            opacity,
            baseOpacity: opacity,
            fontSize: `${size}rem`,
            textShadow: `0 0 ${3 + Math.random() * 6}px rgba(194, 254, 11, ${0.2 + Math.random() * 0.3})`,
          },
          delay: (i + riverIndex * 30) * 25,
          waveOffset: progress * Math.PI * 4 + riverIndex,
        });
      }
    });

    return items;
  }, []);

  return (
    <div className={`fixed right-0 top-0 bottom-0 w-[50%] pointer-events-none z-0 hidden lg:block ${className}`}>
      {symbols.map((item) => (
        <WaveSymbol
          key={item.id}
          style={item.style}
          delay={item.delay}
          waveOffset={item.waveOffset + phase}
        />
      ))}
    </div>
  );
}

export default memo(SymbolCascade);
