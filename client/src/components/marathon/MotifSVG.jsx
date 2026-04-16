import { memo } from "react";

const motifs = {
  // fig01 - Three vertical bars connected at top
  circuit: (
    <path
      d="M10 90 L10 30 Q10 10 30 10 L70 10 Q90 10 90 30 L90 90 M50 10 L50 90"
      fill="none"
      stroke="currentColor"
      strokeWidth="8"
      strokeLinecap="round"
    />
  ),
  // fig02 - Flowing P/R shape
  flow: (
    <path
      d="M10 10 L70 10 Q90 10 90 30 L90 50 Q90 70 70 70 L30 70 Q10 70 10 90 L90 90"
      fill="none"
      stroke="currentColor"
      strokeWidth="8"
      strokeLinecap="round"
    />
  ),
  // fig03 - Three intertwined waves
  wave: (
    <path
      d="M5 50 Q20 20 35 50 Q50 80 65 50 Q80 20 95 50 M5 35 Q20 5 35 35 Q50 65 65 35 Q80 5 95 35 M5 65 Q20 35 35 65 Q50 95 65 65 Q80 35 95 65"
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
    />
  ),
  // fig04 - Wings/W shape
  wings: (
    <path
      d="M10 70 Q10 30 40 30 L50 30 M90 70 Q90 30 60 30 L50 30 M50 30 L50 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="8"
      strokeLinecap="round"
    />
  ),
  // fig05 - Double arch bridge
  arch: (
    <>
      <rect x="5" y="5" width="90" height="35" fill="currentColor" />
      <path
        d="M5 40 L5 95 Q30 95 30 70 L30 40 M70 40 L70 70 Q70 95 95 95 L95 40"
        fill="currentColor"
      />
    </>
  ),
  // fig06 - Diagonal S cross
  cross: (
    <path
      d="M10 10 L40 10 L90 60 L90 90 L60 90 L10 40 Z M90 10 L90 40 M10 60 L10 90"
      fill="currentColor"
    />
  ),
  // fig07 - Hexagon with diagonal
  hex: (
    <path
      d="M30 5 L70 5 L95 50 L70 95 L30 95 L5 50 Z M15 85 L85 15"
      fill="none"
      stroke="currentColor"
      strokeWidth="8"
    />
  ),
};

function MotifSVG({
  type = "circuit",
  size = 200,
  color = "currentColor",
  className = "",
  opacity = 1,
  style = {},
}) {
  const motif = motifs[type];
  if (!motif) return null;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      style={{ color, opacity, ...style }}
      aria-hidden="true"
    >
      {motif}
    </svg>
  );
}

export default memo(MotifSVG);
