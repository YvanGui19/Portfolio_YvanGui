import { memo, useMemo, useState, useEffect, useCallback } from "react";

/**
 * MarathonWaveGrid - Symboles statiques avec glitchs en impulsions/tsunami
 * Les glitchs se propagent en vagues depuis un point d'origine
 */

const SYMBOLS = {
  dense: ["✖", "◎", "□", "▣", "⊕", "⦿"],
  medium: ["×", "+", "○", "□", "◇"],
  sparse: ["·", "·", "·", "+", "×"],
  accent: ["✖", "▣", "◎", "⦿"],
};

// Hook pour reduced motion
function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (event) => setPrefersReducedMotion(event.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
}

// Cellule qui réagit aux impulsions
const PulseCell = memo(function PulseCell({
  symbol,
  size,
  opacity,
  inverted,
  pulseTime,
  row,
  col,
}) {
  const [currentSymbol, setCurrentSymbol] = useState(symbol);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (!pulseTime) return;

    // Calculer le délai basé sur la distance depuis l'origine de l'impulsion
    const distance = Math.sqrt(row * row + col * col);
    const delay = distance * 30; // 30ms par unité de distance

    const timeout = setTimeout(() => {
      setIsGlitching(true);
      const allSymbols = [...SYMBOLS.dense, ...SYMBOLS.accent];
      setCurrentSymbol(allSymbols[Math.floor(Math.random() * allSymbols.length)]);

      // Fin du glitch
      setTimeout(() => {
        setIsGlitching(false);
        setCurrentSymbol(symbol); // Retour au symbole original
      }, 80 + Math.random() * 120);
    }, delay);

    return () => clearTimeout(timeout);
  }, [pulseTime, row, col, symbol]);

  return (
    <span
      className={`flex items-center justify-center transition-none ${
        inverted ? "text-black" : "text-lime"
      } ${isGlitching ? "brightness-150" : ""}`}
      style={{
        opacity,
        fontSize: `${size}rem`,
      }}
    >
      {currentSymbol}
    </span>
  );
});

// Bloc avec système d'impulsions
const WaveBlock = memo(function WaveBlock({
  rows,
  cols,
  waveFrequency = 2,
  waveAmplitude = 0.5,
  baseDensity = 0.7,
  baseSize = 0.8,
  sizeVariation = 0.3,
  className = "",
  inverted = false,
  animate = true,
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const shouldAnimate = animate && !prefersReducedMotion;
  const [pulseTime, setPulseTime] = useState(null);

  // Déclencher des impulsions périodiquement
  useEffect(() => {
    if (!shouldAnimate) return;

    const triggerPulse = () => {
      // Délai entre les impulsions : 6-15 secondes
      const delay = 6000 + Math.random() * 9000;
      return setTimeout(() => {
        setPulseTime(Date.now());
        timeoutId = triggerPulse();
      }, delay);
    };

    // Première impulsion après 2-5 secondes
    let timeoutId = setTimeout(() => {
      setPulseTime(Date.now());
      timeoutId = triggerPulse();
    }, 2000 + Math.random() * 3000);

    return () => clearTimeout(timeoutId);
  }, [shouldAnimate]);

  const cells = useMemo(() => {
    const items = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const nx = c / cols;
        const ny = r / rows;

        const wave1 = Math.sin((nx * waveFrequency + ny * 0.5) * Math.PI);
        const wave2 = Math.sin((ny * waveFrequency * 0.7 + nx * 0.3) * Math.PI);
        const combinedWave = (wave1 + wave2 * 0.5) / 1.5;

        const density = baseDensity + combinedWave * waveAmplitude;

        if (Math.random() > density) continue;

        const sizeFactor = 1 + combinedWave * sizeVariation;
        const size = Math.max(0.4, baseSize * sizeFactor);
        const opacity = 0.5 + combinedWave * 0.3 + Math.random() * 0.2;

        let symbolSet;
        if (density > 0.8) {
          symbolSet = SYMBOLS.dense;
        } else if (density > 0.5) {
          symbolSet = SYMBOLS.medium;
        } else {
          symbolSet = SYMBOLS.sparse;
        }

        items.push({
          id: `${r}-${c}`,
          row: r,
          col: c,
          symbol: symbolSet[Math.floor(Math.random() * symbolSet.length)],
          size,
          opacity: Math.min(1, Math.max(0.2, opacity)),
        });
      }
    }

    return items;
  }, [rows, cols, waveFrequency, waveAmplitude, baseDensity, baseSize, sizeVariation]);

  return (
    <div
      className={`grid font-mono leading-none h-full ${className}`}
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {cells.map((cell) => (
        <div
          key={cell.id}
          style={{ gridRow: cell.row + 1, gridColumn: cell.col + 1 }}
        >
          <PulseCell
            symbol={cell.symbol}
            size={cell.size}
            opacity={cell.opacity}
            inverted={inverted}
            pulseTime={pulseTime}
            row={cell.row}
            col={cell.col}
          />
        </div>
      ))}
    </div>
  );
});

// Bloc solide pour contraste
const SolidBlock = memo(function SolidBlock({
  className = "",
  color = "black",
}) {
  return (
    <div
      className={`${className}`}
      style={{
        backgroundColor: color === "black" ? "#000" : "#C2FE0B",
      }}
    />
  );
});

// Composition principale
function MarathonWaveGrid({ className = "", variant = "default" }) {
  if (variant === "minimal") {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <div className="absolute top-0 right-0 w-[35%] h-full">
          <WaveBlock
            rows={30}
            cols={12}
            waveFrequency={3}
            waveAmplitude={0.6}
            baseDensity={0.5}
            baseSize={0.7}
          />
        </div>

        <div className="absolute top-[20%] left-[5%] w-[25%] h-[60%]">
          <WaveBlock
            rows={20}
            cols={10}
            waveFrequency={2}
            waveAmplitude={0.3}
            baseDensity={0.15}
            baseSize={0.5}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>

      {/* Zone dense haut-droite avec bloc noir */}
      <div className="absolute top-0 right-0 w-[30%] h-[35%]">
        <SolidBlock className="absolute top-[10%] right-[20%] w-[50%] h-[40%]" color="black" />
        <div className="absolute inset-0 p-2">
          <WaveBlock
            rows={14}
            cols={14}
            waveFrequency={2.5}
            waveAmplitude={0.5}
            baseDensity={0.75}
            baseSize={0.85}
            sizeVariation={0.4}
          />
        </div>
      </div>

      {/* Colonne dense extrême droite */}
      <div className="absolute top-[30%] right-0 w-[10%] h-[50%]">
        <WaveBlock
          rows={25}
          cols={5}
          waveFrequency={4}
          waveAmplitude={0.4}
          baseDensity={0.85}
          baseSize={0.9}
        />
      </div>

      {/* Zone de transition centre-droite */}
      <div className="absolute top-[40%] right-[15%] w-[20%] h-[30%]">
        <WaveBlock
          rows={12}
          cols={10}
          waveFrequency={3}
          waveAmplitude={0.6}
          baseDensity={0.5}
          baseSize={0.7}
        />
      </div>

      {/* Bloc lime avec symboles noirs */}
      <div className="absolute top-[60%] right-[25%] w-[15%] h-[20%]">
        <SolidBlock className="absolute inset-0" color="lime" />
        <div className="absolute inset-0 p-1">
          <WaveBlock
            rows={8}
            cols={8}
            waveFrequency={2}
            waveAmplitude={0.3}
            baseDensity={0.7}
            baseSize={0.75}
            inverted
          />
        </div>
      </div>

      {/* Vague éparse haut-gauche */}
      <div className="absolute top-[5%] left-[5%] w-[25%] h-[30%]">
        <WaveBlock
          rows={12}
          cols={12}
          waveFrequency={2}
          waveAmplitude={0.4}
          baseDensity={0.2}
          baseSize={0.55}
        />
      </div>

      {/* Points épars centre-gauche */}
      <div className="absolute top-[40%] left-[3%] w-[20%] h-[35%]">
        <WaveBlock
          rows={14}
          cols={8}
          waveFrequency={1.5}
          waveAmplitude={0.3}
          baseDensity={0.15}
          baseSize={0.5}
        />
      </div>

      {/* Ligne de transition horizontale - bas */}
      <div className="absolute bottom-[5%] left-[10%] w-[50%] h-[12%]">
        <WaveBlock
          rows={4}
          cols={20}
          waveFrequency={5}
          waveAmplitude={0.5}
          baseDensity={0.6}
          baseSize={0.75}
        />
      </div>

      {/* Bloc noir bas-droite avec symboles */}
      <div className="absolute bottom-[8%] right-[5%] w-[18%] h-[25%]">
        <SolidBlock className="absolute inset-0" color="black" />
        <div className="absolute inset-0 p-2">
          <WaveBlock
            rows={10}
            cols={8}
            waveFrequency={3}
            waveAmplitude={0.4}
            baseDensity={0.8}
            baseSize={0.8}
          />
        </div>
      </div>

      {/* Accents diagonaux */}
      <div className="absolute top-[25%] left-[30%] w-[12%] h-[15%]">
        <WaveBlock
          rows={6}
          cols={6}
          waveFrequency={2}
          waveAmplitude={0.5}
          baseDensity={0.4}
          baseSize={0.65}
        />
      </div>

    </div>
  );
}

// Variante Hero avec impulsions synchronisées
export function MarathonWaveHero({ className = "" }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [pulseTime, setPulseTime] = useState(null);

  // Impulsions globales pour le Hero
  useEffect(() => {
    if (prefersReducedMotion) return;

    const triggerPulse = () => {
      const delay = 5000 + Math.random() * 8000;
      return setTimeout(() => {
        setPulseTime(Date.now());
        timeoutId = triggerPulse();
      }, delay);
    };

    let timeoutId = setTimeout(() => {
      setPulseTime(Date.now());
      timeoutId = triggerPulse();
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [prefersReducedMotion]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 80px, black 85%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 80px, black 85%, transparent 100%)'
      }}
    >
      <div
        className="absolute top-0 right-0 w-[60%] h-full"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.05) 10%, rgba(0,0,0,0.15) 20%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.7) 50%, black 65%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.05) 10%, rgba(0,0,0,0.15) 20%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.7) 50%, black 65%)'
        }}
      >
        <HeroPulseGrid rows={28} cols={20} pulseTime={pulseTime} />
      </div>
    </div>
  );
}

// Grille Hero avec propagation d'impulsion depuis le bord droit
const HeroPulseGrid = memo(function HeroPulseGrid({ rows, cols, pulseTime }) {
  const cells = useMemo(() => {
    const items = [];
    const waveFrequency = 4;
    const waveAmplitude = 0.65;
    const baseDensity = 0.7;
    const baseSize = 0.7;
    const sizeVariation = 0.3;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const nx = c / cols;
        const ny = r / rows;

        const wave1 = Math.sin((nx * waveFrequency + ny * 0.5) * Math.PI);
        const wave2 = Math.sin((ny * waveFrequency * 0.7 + nx * 0.3) * Math.PI);
        const combinedWave = (wave1 + wave2 * 0.5) / 1.5;

        const density = baseDensity + combinedWave * waveAmplitude;

        if (Math.random() > density) continue;

        const sizeFactor = 1 + combinedWave * sizeVariation;
        const size = Math.max(0.4, baseSize * sizeFactor);
        const opacity = 0.5 + combinedWave * 0.3 + Math.random() * 0.2;

        let symbolSet;
        if (density > 0.8) {
          symbolSet = SYMBOLS.dense;
        } else if (density > 0.5) {
          symbolSet = SYMBOLS.medium;
        } else {
          symbolSet = SYMBOLS.sparse;
        }

        items.push({
          id: `${r}-${c}`,
          row: r,
          col: c,
          // Distance depuis le bord droit pour l'effet tsunami
          distanceFromRight: cols - c,
          symbol: symbolSet[Math.floor(Math.random() * symbolSet.length)],
          size,
          opacity: Math.min(1, Math.max(0.2, opacity)),
        });
      }
    }

    return items;
  }, [rows, cols]);

  return (
    <div
      className="grid font-mono leading-none h-full"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {cells.map((cell) => (
        <div
          key={cell.id}
          style={{ gridRow: cell.row + 1, gridColumn: cell.col + 1 }}
        >
          <TsunamiCell
            symbol={cell.symbol}
            size={cell.size}
            opacity={cell.opacity}
            pulseTime={pulseTime}
            distanceFromRight={cell.distanceFromRight}
            row={cell.row}
          />
        </div>
      ))}
    </div>
  );
});

// Cellule avec effet tsunami depuis la droite
const TsunamiCell = memo(function TsunamiCell({
  symbol,
  size,
  opacity,
  pulseTime,
  distanceFromRight,
  row,
}) {
  const [currentSymbol, setCurrentSymbol] = useState(symbol);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (!pulseTime) return;

    // L'impulsion vient du bord droit et se propage vers la gauche
    // Ajouter une variation verticale pour un effet plus organique
    const verticalOffset = Math.sin(row * 0.3) * 50;
    const delay = distanceFromRight * 40 + verticalOffset;

    const timeout = setTimeout(() => {
      // 70% de chance d'être touché par l'impulsion
      if (Math.random() < 0.7) {
        setIsGlitching(true);
        const allSymbols = [...SYMBOLS.dense, ...SYMBOLS.accent];
        setCurrentSymbol(allSymbols[Math.floor(Math.random() * allSymbols.length)]);

        setTimeout(() => {
          setIsGlitching(false);
          setCurrentSymbol(symbol);
        }, 60 + Math.random() * 100);
      }
    }, Math.max(0, delay));

    return () => clearTimeout(timeout);
  }, [pulseTime, distanceFromRight, row, symbol]);

  return (
    <span
      className={`flex items-center justify-center text-lime ${isGlitching ? "brightness-150" : ""}`}
      style={{
        opacity,
        fontSize: `${size}rem`,
      }}
    >
      {currentSymbol}
    </span>
  );
});

export default memo(MarathonWaveGrid);
