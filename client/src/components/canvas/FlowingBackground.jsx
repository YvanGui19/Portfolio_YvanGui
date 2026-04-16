import { memo } from 'react';
import ProceduralBackground from './ProceduralBackground';
import { HERO_CONFIG } from './waveField';
import { SYMBOL_TYPES } from './symbolDrawers';

/**
 * FlowingBackground - Forme en S fluide qui coule du haut vers le bas
 * Position fixe pour rester visible pendant le scroll
 * Utilise un SVG clipPath pour une forme organique en S
 */
const FlowingBackground = memo(function FlowingBackground({
  className = '',
  side = 'right', // 'right' ou 'left' - côté de départ en haut
  opacity = 0.12,
}) {
  const clipId = `flowing-s-clip-${side}`;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* SVG clipPath définition */}
      <svg className="absolute w-0 h-0">
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            {side === 'right' ? (
              // S partant de la droite en haut
              <path d="
                M 1 0
                C 1 0.12, 0.35 0.18, 0.35 0.32
                C 0.35 0.46, 0.85 0.52, 0.85 0.68
                C 0.85 0.84, 0.25 0.88, 0.25 1
                L 1 1
                Z
              " />
            ) : (
              // S partant de la gauche en haut
              <path d="
                M 0 0
                C 0 0.12, 0.65 0.18, 0.65 0.32
                C 0.65 0.46, 0.15 0.52, 0.15 0.68
                C 0.15 0.84, 0.75 0.88, 0.75 1
                L 0 1
                Z
              " />
            )}
          </clipPath>
        </defs>
      </svg>

      {/* Background avec clip-path */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `url(#${clipId})` }}
      >
        <ProceduralBackground
          bgWaves={HERO_CONFIG.bgWaves}
          symWaves={HERO_CONFIG.symWaves}
          symbolTypes={SYMBOL_TYPES}
          gridStep={HERO_CONFIG.STEP}
        />
      </div>
    </div>
  );
});

export default FlowingBackground;
