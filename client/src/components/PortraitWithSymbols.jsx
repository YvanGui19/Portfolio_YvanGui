import { useState, useEffect, useCallback, memo } from "react";
import DitheredImage from "./DitheredImage";

// Symboles Marathon spécifiés
const SYMBOLS = ["⁜", "⊡", "⊹", "▣", "□", "✖", "⦿", "⦾", "✤"];

// Composant pour un symbole animé
const AnimatedSymbol = memo(function AnimatedSymbol({
  changeSpeed = 200,
  changeChance = 0.15,
  size = "text-lg"
}) {
  const [symbol, setSymbol] = useState(() =>
    SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
  );
  const [opacity, setOpacity] = useState(() => 0.3 + Math.random() * 0.5);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      if (Math.random() < changeChance) {
        setSymbol(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
        setOpacity(0.3 + Math.random() * 0.5);
      }
    }, changeSpeed);

    return () => clearInterval(interval);
  }, [changeSpeed, changeChance]);

  return (
    <span
      className={`${size} font-mono text-lime transition-opacity duration-300`}
      style={{ opacity }}
    >
      {symbol}
    </span>
  );
});

// Composant principal
function PortraitWithSymbols({
  imageSrc = "/images/profile-dithered.png",
  symbolChangeSpeed = 250,
  symbolChangeChance = 0.08
}) {
  // Générer les positions des symboles autour du portrait
  const [symbolPositions] = useState(() => {
    const positions = [];

    // Symboles en haut (5)
    for (let i = 0; i < 5; i++) {
      positions.push({ top: "0%", left: `${10 + i * 20}%`, size: "text-xl" });
    }

    // Symboles à gauche (3)
    for (let i = 0; i < 3; i++) {
      positions.push({ top: `${25 + i * 25}%`, left: "0%", size: "text-lg" });
    }

    // Symboles à droite (3)
    for (let i = 0; i < 3; i++) {
      positions.push({ top: `${25 + i * 25}%`, right: "0%", size: "text-lg" });
    }

    // Symboles en bas (5)
    for (let i = 0; i < 5; i++) {
      positions.push({ bottom: "0%", left: `${10 + i * 20}%`, size: "text-xl" });
    }

    return positions;
  });

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Cadre avec coins Marathon */}
      <div className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-lime" />
      <div className="absolute -top-2 -right-2 w-6 h-6 border-r-2 border-t-2 border-lime" />
      <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-2 border-b-2 border-lime" />
      <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-lime" />

      {/* Grille de symboles autour */}
      <div className="absolute inset-0 pointer-events-none">
        {symbolPositions.map((pos, index) => (
          <div
            key={index}
            className="absolute flex items-center justify-center"
            style={{
              top: pos.top,
              left: pos.left,
              right: pos.right,
              bottom: pos.bottom,
              transform: "translate(-50%, -50%)"
            }}
          >
            <AnimatedSymbol
              changeSpeed={symbolChangeSpeed + Math.random() * 100}
              changeChance={symbolChangeChance}
              size={pos.size}
            />
          </div>
        ))}
      </div>

      {/* Portrait avec effet dither */}
      <div className="relative p-8">
        <div className="relative overflow-hidden">
          {/* Lignes de scan subtiles */}
          <div
            className="absolute inset-0 pointer-events-none z-10 opacity-20"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(194, 254, 11, 0.1) 2px, rgba(194, 254, 11, 0.1) 4px)"
            }}
          />

          <DitheredImage
            src={imageSrc}
            color="#C2FE0B"
            flickerIntensity={6}
            flickerSpeed={180}
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Réticule central subtil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-30">
        <div className="w-32 h-32 border border-lime/30 rounded-full" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-lime/20" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-lime/20" />
      </div>
    </div>
  );
}

export default memo(PortraitWithSymbols);
