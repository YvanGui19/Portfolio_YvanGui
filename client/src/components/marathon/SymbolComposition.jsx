import { memo } from 'react';
import { MotifArches, MotifReturn, MotifWaves, MotifHorns, MotifArch, MotifParallel, MotifHexSlash } from './SymbolMotifs';

/**
 * SymbolComposition - Compositions artistiques de symboles Marathon
 * Arrangements de plusieurs motifs pour créer des visuels cohérents
 */

// Composition verticale - Stack de symboles
export const VerticalStack = memo(function VerticalStack({
  color = '#C2FE0B',
  opacity = 0.15,
  size = 80,
  gap = 20,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col items-center pointer-events-none ${className}`}
      style={{ gap, opacity }}
    >
      <MotifHorns size={size} color={color} />
      <MotifWaves size={size * 0.8} color={color} />
      <MotifArch size={size * 0.9} color={color} />
      <MotifHexSlash size={size * 0.7} color={color} />
    </div>
  );
});

// Composition horizontale - Ligne de symboles
export const HorizontalRow = memo(function HorizontalRow({
  color = '#C2FE0B',
  opacity = 0.2,
  size = 60,
  gap = 30,
  className = '',
}) {
  return (
    <div
      className={`flex items-center justify-center pointer-events-none ${className}`}
      style={{ gap, opacity }}
    >
      <MotifParallel size={size} color={color} />
      <MotifWaves size={size * 1.2} color={color} />
      <MotifHexSlash size={size} color={color} />
      <MotifArches size={size} color={color} />
      <MotifReturn size={size * 1.1} color={color} />
    </div>
  );
});

// Composition en grille - Arrangement 2D
export const SymbolGrid = memo(function SymbolGrid({
  color = '#C2FE0B',
  opacity = 0.1,
  size = 50,
  cols = 3,
  rows = 3,
  gap = 25,
  className = '',
}) {
  const motifs = [
    MotifHorns, MotifWaves, MotifArch,
    MotifParallel, MotifHexSlash, MotifArches,
    MotifReturn, MotifWaves, MotifHorns,
  ];

  return (
    <div
      className={`grid pointer-events-none ${className}`}
      style={{
        gridTemplateColumns: `repeat(${cols}, ${size}px)`,
        gap,
        opacity,
      }}
    >
      {Array.from({ length: cols * rows }).map((_, i) => {
        const Motif = motifs[i % motifs.length];
        return <Motif key={i} size={size} color={color} />;
      })}
    </div>
  );
});

// Composition Hero - Grand motif central avec accents
export const HeroComposition = memo(function HeroComposition({
  color = '#C2FE0B',
  secondaryColor = '#01FFFF',
  className = '',
}) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Motif central massif */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04]">
        <MotifHorns size={900} color={color} />
      </div>

      {/* Composition haute droite */}
      <div className="absolute top-16 right-16 flex flex-col items-end gap-4 opacity-20">
        <MotifWaves size={120} color={color} />
        <MotifArch size={80} color={color} />
      </div>

      {/* Composition basse gauche */}
      <div className="absolute bottom-32 left-8 flex flex-col items-start gap-3 opacity-15">
        <MotifHexSlash size={70} color={secondaryColor} />
        <MotifParallel size={50} color={secondaryColor} />
      </div>

      {/* Petits accents dispersés */}
      <div className="absolute top-1/3 left-16 opacity-10">
        <MotifReturn size={100} color={color} />
      </div>
      <div className="absolute bottom-1/4 right-1/4 opacity-10">
        <MotifArches size={80} color={secondaryColor} />
      </div>

      {/* Ligne de symboles en bas */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-8 opacity-10">
        <MotifHexSlash size={30} color={color} />
        <MotifWaves size={40} color={color} />
        <MotifArch size={35} color={color} />
        <MotifHexSlash size={30} color={color} />
      </div>
    </div>
  );
});

// Composition pour sections - Motifs de côté
export const SectionAccent = memo(function SectionAccent({
  color = '#C2FE0B',
  position = 'right', // left, right
  opacity = 0.1,
  className = '',
}) {
  const positionClass = position === 'left' ? 'left-0' : 'right-0';

  return (
    <div className={`absolute top-0 ${positionClass} h-full w-32 flex flex-col justify-center items-center gap-6 pointer-events-none ${className}`} style={{ opacity }}>
      <MotifWaves size={60} color={color} />
      <MotifHexSlash size={50} color={color} />
      <MotifArch size={55} color={color} />
      <MotifParallel size={45} color={color} />
    </div>
  );
});

// Composition footer - Bande de symboles
export const FooterComposition = memo(function FooterComposition({
  color = '#C2FE0B',
  opacity = 0.15,
  className = '',
}) {
  return (
    <div className={`flex items-center justify-center gap-12 pointer-events-none ${className}`} style={{ opacity }}>
      <MotifArches size={40} color={color} />
      <MotifReturn size={50} color={color} />
      <MotifWaves size={55} color={color} />
      <MotifHorns size={45} color={color} />
      <MotifArch size={40} color={color} />
      <MotifParallel size={35} color={color} />
      <MotifHexSlash size={40} color={color} />
    </div>
  );
});

export default {
  VerticalStack,
  HorizontalRow,
  SymbolGrid,
  HeroComposition,
  SectionAccent,
  FooterComposition,
};
