import { memo, useEffect, useState } from 'react';

/**
 * DiagonalStripes - Bandes diagonales larges et visibles
 * Element visuel signature de Marathon
 */

const COLORS = {
  lime: '#C2FE0B',
  cyan: '#01FFFF',
  red: '#FF0D1A',
  violet: '#5200FF',
  white: '#FFFFFF',
  grey: '#8E8E8E',
};

const DiagonalStripes = memo(function DiagonalStripes({
  color = 'lime',
  thickness = 'medium', // thin (8px), medium (16px), thick (32px)
  angle = -45,
  animated = false,
  animationSpeed = 20, // seconds for full cycle
  height = '100%',
  width = '100%',
  opacity = 1,
  gap = null, // Override automatic gap
  className = '',
  style = {},
}) {
  const [offset, setOffset] = useState(0);

  const thicknessValues = {
    thin: 8,
    medium: 16,
    thick: 32,
  };

  const thicknessValue = typeof thickness === 'number' ? thickness : thicknessValues[thickness] || 16;
  const gapValue = gap !== null ? gap : thicknessValue * 1.5;
  const colorValue = COLORS[color] || color;

  useEffect(() => {
    if (!animated) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const totalSize = thicknessValue + gapValue;
    const interval = setInterval(() => {
      setOffset(prev => (prev + 1) % totalSize);
    }, (animationSpeed * 1000) / (totalSize * 60));

    return () => clearInterval(interval);
  }, [animated, animationSpeed, thicknessValue, gapValue]);

  const stripePattern = `repeating-linear-gradient(
    ${angle}deg,
    ${colorValue} 0px,
    ${colorValue} ${thicknessValue}px,
    transparent ${thicknessValue}px,
    transparent ${thicknessValue + gapValue}px
  )`;

  return (
    <div
      className={`marathon-diagonal-stripes ${className}`}
      style={{
        width,
        height,
        background: stripePattern,
        backgroundPosition: animated ? `${offset}px ${offset}px` : undefined,
        opacity,
        ...style,
      }}
    />
  );
});

// Full-width header stripe
export const StripeHeader = memo(function StripeHeader({
  color = 'lime',
  thickness = 'medium',
  children,
  className = '',
}) {
  const thicknessValues = { thin: '2rem', medium: '3rem', thick: '4rem' };
  const heightValue = thicknessValues[thickness] || '3rem';

  return (
    <div
      className={`marathon-stripe-header relative overflow-hidden ${className}`}
      style={{ height: heightValue }}
    >
      <DiagonalStripes
        color={color}
        thickness={thickness}
        style={{ position: 'absolute', inset: 0 }}
      />
      {children && (
        <div
          className="relative z-10 flex items-center justify-center h-full px-4"
          style={{
            backgroundColor: 'rgba(10, 14, 26, 0.7)',
            backdropFilter: 'blur(4px)',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
});

// Vertical stripe bar
export const StripeBar = memo(function StripeBar({
  color = 'lime',
  width = '4px',
  className = '',
}) {
  return (
    <div
      className={`marathon-stripe-bar ${className}`}
      style={{
        width,
        height: '100%',
        background: `repeating-linear-gradient(
          0deg,
          ${COLORS[color] || color} 0px,
          ${COLORS[color] || color} 8px,
          transparent 8px,
          transparent 16px
        )`,
      }}
    />
  );
});

export default DiagonalStripes;
