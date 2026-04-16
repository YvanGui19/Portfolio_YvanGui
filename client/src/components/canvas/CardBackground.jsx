import { memo, useMemo } from 'react';
import ProceduralBackground from './ProceduralBackground';
import { generateConfigFromSeed, getConfigByIndex } from './waveField';
import { SYMBOL_TYPES } from './symbolDrawers';

/**
 * CardBackground - Procedural canvas for project cards
 * Uses seed-based configuration for variety between cards
 */
const CardBackground = memo(function CardBackground({
  className = '',
  style = {},
  seed = 0,
  variant = 'default', // 'default' | 'dense' | 'sparse'
}) {
  const config = useMemo(() => {
    // Use predefined configs for indices 0-3, generate for others
    if (seed < 4) {
      return getConfigByIndex(seed);
    }
    return generateConfigFromSeed(seed);
  }, [seed]);

  // Adjust grid step based on variant
  const gridStep = useMemo(() => {
    switch (variant) {
      case 'dense':
        return 12;
      case 'sparse':
        return 20;
      default:
        return 16;
    }
  }, [variant]);

  // Select subset of symbols based on seed for variety
  const symbolTypes = useMemo(() => {
    if (seed % 3 === 0) {
      return ['x', 'sq', 'co', '+', 'dot', 'sq_dot', 'star6', 'bullseye', 'star4', 'quad'];
    } else if (seed % 3 === 1) {
      return ['o', 'sq_sq', 'ring', 'dotcross', 'x', '+', 'co', 'bullseye', 'star6', 'dot'];
    }
    return SYMBOL_TYPES;
  }, [seed]);

  return (
    <ProceduralBackground
      bgWaves={config.bgWaves}
      symWaves={config.symWaves}
      symbolTypes={symbolTypes}
      gridStep={gridStep}
      className={className}
      style={style}
    />
  );
});

export default CardBackground;
