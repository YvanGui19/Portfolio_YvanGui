import { memo } from 'react';

/**
 * MarathonMotif - Les 7 motifs geometriques en SVG
 * Basé sur fig01-07 de la charte graphique
 */

// fig01 - Circuit: 3 barres verticales connectees en haut avec arrondi en bas
const CircuitSVG = ({ color }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15 10 H85 V10
         M15 10 V70 C15 85 25 95 40 95 V95
         M50 10 V70 C50 85 50 95 50 70 V95
         M85 10 V70 C85 85 75 95 60 95 V95
         M15 10 H85
         M40 95 H60"
      stroke={color}
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <rect x="10" y="5" width="80" height="10" rx="2" fill={color} />
    <path d="M20 15 V65 Q20 90 45 90 H55 Q80 90 80 65 V15" stroke={color} strokeWidth="8" fill="none" strokeLinecap="round" />
    <path d="M40 15 V75 Q40 85 50 85 Q60 85 60 75 V15" stroke={color} strokeWidth="8" fill="none" strokeLinecap="round" />
  </svg>
);

// fig02 - Flow: forme R/P courbe avec retour
const FlowSVG = ({ color }) => (
  <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 50 H30 Q55 50 55 30 Q55 10 30 10 H10
         M55 30 H90"
      stroke={color}
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

// fig03 - Wave: 3 vagues entremelees
const WaveSVG = ({ color }) => (
  <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 45 Q20 45 25 30 Q30 15 45 15 Q60 15 65 30 Q70 45 85 45"
      stroke={color}
      strokeWidth="8"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M15 45 Q30 45 35 30 Q40 15 55 15 Q70 15 75 30 Q80 45 95 45"
      stroke={color}
      strokeWidth="8"
      strokeLinecap="round"
      fill="none"
      opacity="0.7"
    />
    <path
      d="M0 45 Q10 45 15 30 Q20 15 35 15 Q50 15 55 30 Q60 45 75 45"
      stroke={color}
      strokeWidth="8"
      strokeLinecap="round"
      fill="none"
      opacity="0.5"
    />
  </svg>
);

// fig04 - Wings: arches miroir en W
const WingsSVG = ({ color }) => (
  <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 55 Q10 10 50 10 Q90 10 90 55"
      stroke={color}
      strokeWidth="8"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M25 55 Q25 25 50 25 Q75 25 75 55"
      stroke={color}
      strokeWidth="8"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

// fig05 - Arch: double arche pont
const ArchSVG = ({ color }) => (
  <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="90" height="15" rx="2" fill={color} />
    <path
      d="M15 20 V45 Q15 55 30 55 Q45 55 45 45 V20"
      stroke={color}
      strokeWidth="6"
      fill="none"
    />
    <path
      d="M55 20 V45 Q55 55 70 55 Q85 55 85 45 V20"
      stroke={color}
      strokeWidth="6"
      fill="none"
    />
  </svg>
);

// fig06 - Cross: diagonales croisees en S
const CrossSVG = ({ color }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 10 L45 45 M55 55 L90 90"
      stroke={color}
      strokeWidth="12"
      strokeLinecap="round"
    />
    <path
      d="M90 10 L55 45 M45 55 L10 90"
      stroke={color}
      strokeWidth="12"
      strokeLinecap="round"
    />
    <rect x="35" y="35" width="30" height="30" fill="none" stroke={color} strokeWidth="4" />
  </svg>
);

// fig07 - Hex: hexagone avec barre diagonale
const HexSVG = ({ color }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z"
      stroke={color}
      strokeWidth="6"
      fill="none"
      strokeLinejoin="round"
    />
    <line x1="20" y1="80" x2="80" y2="20" stroke={color} strokeWidth="6" strokeLinecap="round" />
  </svg>
);

const MOTIFS = {
  circuit: CircuitSVG,
  flow: FlowSVG,
  wave: WaveSVG,
  wings: WingsSVG,
  arch: ArchSVG,
  cross: CrossSVG,
  hex: HexSVG,
};

const SIZES = {
  sm: 40,
  md: 80,
  lg: 160,
  xl: 320,
};

const COLORS = {
  lime: '#C2FE0B',
  cyan: '#01FFFF',
  white: '#FFFFFF',
  grey: '#8E8E8E',
  red: '#FF0D1A',
  violet: '#5200FF',
};

const MarathonMotif = memo(function MarathonMotif({
  type = 'wave', // circuit, flow, wave, wings, arch, cross, hex
  size = 'md', // sm, md, lg, xl or number
  color = 'lime',
  opacity = 1,
  rotate = 0,
  className = '',
  style = {},
}) {
  const MotifComponent = MOTIFS[type] || MOTIFS.wave;
  const sizeValue = typeof size === 'number' ? size : SIZES[size] || SIZES.md;
  const colorValue = COLORS[color] || color;

  return (
    <div
      className={`marathon-motif marathon-motif-${type} ${className}`}
      style={{
        width: sizeValue,
        height: sizeValue,
        opacity,
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        flexShrink: 0,
        ...style,
      }}
    >
      <MotifComponent color={colorValue} />
    </div>
  );
});

// Export individual motifs for direct use
export { CircuitSVG, FlowSVG, WaveSVG, WingsSVG, ArchSVG, CrossSVG, HexSVG };
export default MarathonMotif;
