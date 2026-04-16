import { memo } from 'react';
import ProceduralBackground from './ProceduralBackground';
import { HERO_CONFIG } from './waveField';
import { SYMBOL_TYPES } from './symbolDrawers';

/**
 * HeroBackground - Full-screen procedural canvas for Hero section
 * Uses the hero configuration from the mockup for dramatic effect
 */
const HeroBackground = memo(function HeroBackground({
  className = '',
  style = {},
  animated = true,
  speed = 0.008, // Gentle water flow speed
  gridStep = 24, // Larger grid for better performance
  targetFps = 30, // Limited framerate
}) {
  return (
    <ProceduralBackground
      bgWaves={HERO_CONFIG.bgWaves}
      symWaves={HERO_CONFIG.symWaves}
      symbolTypes={SYMBOL_TYPES}
      gridStep={gridStep}
      animated={animated}
      speed={speed}
      targetFps={targetFps}
      className={className}
      style={style}
    />
  );
});

export default HeroBackground;
