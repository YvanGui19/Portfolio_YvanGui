/**
 * Wave Field System
 * Creates 2D wave functions for procedural zone distribution
 * Reproduces the wave system from the Marathon mockup
 */

/**
 * Deterministic hash function for consistent random values
 * @param {number} ix - Grid X index
 * @param {number} iy - Grid Y index
 * @returns {number} Value between 0 and 1
 */
export function hash(ix, iy) {
  let n = ix * 1619 + iy * 31337;
  n = (n ^ (n >> 8)) * 1664525 + 1013904223;
  return ((n >>> 0) % 10000) / 10000;
}

/**
 * Evaluate 2D wave field at a position
 * @param {number} xF - Normalized X position (0-1)
 * @param {number} yF - Normalized Y position (0-1)
 * @param {Array} waves - Array of wave configurations {fx, fy, ph, a}
 * @returns {number} Value between 0 and 1
 */
export function evaluateWaveField(xF, yF, waves) {
  let d = 0;
  let tot = 0;

  for (const w of waves) {
    d += w.a * Math.sin(xF * Math.PI * w.fx + yF * Math.PI * w.fy + w.ph);
    tot += w.a;
  }

  return (d / tot + 1) * 0.5;
}

/**
 * Default wave configurations matching the mockup hero section
 */
export const HERO_CONFIG = {
  STEP: 16,
  bgWaves: [
    { fx: 2.0, fy: 1.4, ph: 0.5, a: 1.0 },
    { fx: 0.7, fy: 3.8, ph: 2.1, a: 0.8 },
    { fx: 3.3, fy: 2.6, ph: 1.0, a: 0.6 },
  ],
  symWaves: [
    { fx: 5.5, fy: 4.2, ph: 3.1, a: 1.0 },
    { fx: 3.0, fy: 7.8, ph: 0.7, a: 0.9 },
    { fx: 9.5, fy: 5.0, ph: 2.5, a: 0.7 },
    { fx: 6.2, fy: 9.5, ph: 1.3, a: 0.5 },
  ],
};

/**
 * Card configuration 1 - wider patterns
 */
export const CARD_CONFIG_1 = {
  STEP: 16,
  bgWaves: [
    { fx: 3.1, fy: 0.9, ph: 1.8, a: 1.0 },
    { fx: 1.4, fy: 2.8, ph: 0.3, a: 0.8 },
    { fx: 4.2, fy: 1.5, ph: 2.9, a: 0.6 },
  ],
  symWaves: [
    { fx: 6.5, fy: 3.5, ph: 1.2, a: 1.0 },
    { fx: 3.8, fy: 7.2, ph: 2.8, a: 0.8 },
    { fx: 8.2, fy: 5.5, ph: 0.5, a: 0.6 },
  ],
};

/**
 * Card configuration 2 - diagonal emphasis
 */
export const CARD_CONFIG_2 = {
  STEP: 16,
  bgWaves: [
    { fx: 1.9, fy: 2.4, ph: 3.0, a: 1.0 },
    { fx: 3.8, fy: 1.1, ph: 0.8, a: 0.8 },
    { fx: 0.9, fy: 4.0, ph: 1.7, a: 0.6 },
  ],
  symWaves: [
    { fx: 7.0, fy: 4.5, ph: 2.2, a: 1.0 },
    { fx: 4.2, fy: 8.0, ph: 0.6, a: 0.8 },
    { fx: 9.0, fy: 3.2, ph: 3.4, a: 0.6 },
  ],
};

/**
 * Card configuration 3 - vertical emphasis
 */
export const CARD_CONFIG_3 = {
  STEP: 16,
  bgWaves: [
    { fx: 1.2, fy: 3.4, ph: 2.5, a: 1.0 },
    { fx: 3.5, fy: 1.6, ph: 0.2, a: 0.8 },
    { fx: 2.4, fy: 4.8, ph: 1.9, a: 0.6 },
  ],
  symWaves: [
    { fx: 5.8, fy: 6.0, ph: 1.5, a: 1.0 },
    { fx: 8.5, fy: 3.0, ph: 3.0, a: 0.8 },
    { fx: 4.0, fy: 8.8, ph: 0.9, a: 0.6 },
  ],
};

/**
 * Card configuration 4 - balanced
 */
export const CARD_CONFIG_4 = {
  STEP: 16,
  bgWaves: [
    { fx: 2.2, fy: 1.5, ph: 2.4, a: 1.0 },
    { fx: 0.8, fy: 4.2, ph: 0.6, a: 0.8 },
    { fx: 3.5, fy: 2.8, ph: 1.3, a: 0.6 },
  ],
  symWaves: [
    { fx: 5.2, fy: 3.8, ph: 3.1, a: 1.0 },
    { fx: 2.8, fy: 6.5, ph: 0.9, a: 0.8 },
    { fx: 8.5, fy: 4.0, ph: 2.3, a: 0.5 },
  ],
};

/**
 * Generate a wave configuration with seed offset for variety
 * @param {number} seed - Seed value for phase offset
 * @returns {Object} Wave configuration
 */
export function generateConfigFromSeed(seed) {
  const phaseOffset = seed * 0.7;

  return {
    STEP: 16,
    bgWaves: [
      { fx: 2.0 + (seed % 3) * 0.5, fy: 1.4 + (seed % 2) * 0.4, ph: 0.5 + phaseOffset, a: 1.0 },
      { fx: 0.7 + (seed % 4) * 0.3, fy: 3.8 + (seed % 2) * 0.2, ph: 2.1 + phaseOffset, a: 0.8 },
      { fx: 3.3 + (seed % 2) * 0.4, fy: 2.6 + (seed % 3) * 0.3, ph: 1.0 + phaseOffset, a: 0.6 },
    ],
    symWaves: [
      { fx: 5.5 + (seed % 3) * 0.6, fy: 4.2 + (seed % 2) * 0.5, ph: 3.1 + phaseOffset, a: 1.0 },
      { fx: 3.0 + (seed % 4) * 0.4, fy: 7.8 + (seed % 2) * 0.3, ph: 0.7 + phaseOffset, a: 0.9 },
      { fx: 9.5 + (seed % 2) * 0.5, fy: 5.0 + (seed % 3) * 0.4, ph: 2.5 + phaseOffset, a: 0.7 },
    ],
  };
}

/**
 * Get a predefined configuration by index
 * @param {number} index - Configuration index (0-3)
 * @returns {Object} Wave configuration
 */
export function getConfigByIndex(index) {
  const configs = [CARD_CONFIG_1, CARD_CONFIG_2, CARD_CONFIG_3, CARD_CONFIG_4];
  return configs[index % configs.length];
}
