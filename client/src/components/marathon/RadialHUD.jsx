import { memo, useEffect, useState } from 'react';

/**
 * RadialHUD - Cercles concentriques avec segments colores
 * Inspire de l'ecran "etherstep" du jeu Marathon
 */

const COLORS = {
  lime: '#C2FE0B',
  cyan: '#01FFFF',
  blue: '#3B82F6',
  violet: '#5200FF',
  red: '#FF0D1A',
  grey: '#8E8E8E',
};

const RadialHUD = memo(function RadialHUD({
  size = 200,
  rings = 3, // Number of concentric rings
  segments = 8, // Segments per ring
  activeSegments = [], // Array of [ring, segment] pairs to highlight
  activeRings = [0, 1], // Which rings are "active" (colored)
  primaryColor = 'lime',
  secondaryColor = 'cyan',
  animated = true,
  rotationSpeed = 30, // seconds for full rotation
  showCrosshairs = true,
  showCenter = true,
  centerContent = null,
  className = '',
  glow = true,
}) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!animated) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.5) % 360);
    }, (rotationSpeed * 1000) / 720);

    return () => clearInterval(interval);
  }, [animated, rotationSpeed]);

  const primaryColorValue = COLORS[primaryColor] || primaryColor;
  const secondaryColorValue = COLORS[secondaryColor] || secondaryColor;

  const center = size / 2;
  const maxRadius = (size / 2) - 10;
  const ringWidth = maxRadius / (rings + 1);

  // Generate ring paths
  const generateRingSegments = (ringIndex) => {
    const outerRadius = maxRadius - (ringIndex * ringWidth);
    const innerRadius = outerRadius - ringWidth + 4;
    const segmentAngle = 360 / segments;
    const paths = [];

    for (let i = 0; i < segments; i++) {
      const startAngle = (i * segmentAngle) - 90;
      const endAngle = ((i + 1) * segmentAngle) - 90 - 2; // 2deg gap

      const isActive = activeSegments.some(([r, s]) => r === ringIndex && s === i) ||
        (activeRings.includes(ringIndex) && Math.random() > 0.4);

      const startRadOuter = (startAngle * Math.PI) / 180;
      const endRadOuter = (endAngle * Math.PI) / 180;
      const startRadInner = (startAngle * Math.PI) / 180;
      const endRadInner = (endAngle * Math.PI) / 180;

      const x1 = center + outerRadius * Math.cos(startRadOuter);
      const y1 = center + outerRadius * Math.sin(startRadOuter);
      const x2 = center + outerRadius * Math.cos(endRadOuter);
      const y2 = center + outerRadius * Math.sin(endRadOuter);
      const x3 = center + innerRadius * Math.cos(endRadInner);
      const y3 = center + innerRadius * Math.sin(endRadInner);
      const x4 = center + innerRadius * Math.cos(startRadInner);
      const y4 = center + innerRadius * Math.sin(startRadInner);

      const largeArc = segmentAngle > 180 ? 1 : 0;

      const d = `
        M ${x1} ${y1}
        A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2}
        L ${x3} ${y3}
        A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}
        Z
      `;

      const color = isActive
        ? (ringIndex % 2 === 0 ? primaryColorValue : secondaryColorValue)
        : 'rgba(255,255,255,0.1)';

      paths.push(
        <path
          key={`ring-${ringIndex}-seg-${i}`}
          d={d}
          fill={color}
          opacity={isActive ? 0.8 : 0.3}
        />
      );
    }

    return paths;
  };

  return (
    <div
      className={`marathon-radial-hud ${className}`}
      style={{
        width: size,
        height: size,
        position: 'relative',
        flexShrink: 0,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{
          transform: animated ? `rotate(${rotation}deg)` : undefined,
          filter: glow ? `drop-shadow(0 0 10px ${primaryColorValue}40)` : undefined,
        }}
      >
        {/* Rings */}
        {Array.from({ length: rings }).map((_, ringIndex) =>
          generateRingSegments(ringIndex)
        )}

        {/* Ring outlines */}
        {Array.from({ length: rings + 1 }).map((_, i) => {
          const radius = maxRadius - (i * ringWidth);
          return (
            <circle
              key={`outline-${i}`}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
            />
          );
        })}

        {/* Crosshairs */}
        {showCrosshairs && (
          <>
            <line
              x1={center}
              y1={10}
              x2={center}
              y2={size - 10}
              stroke={primaryColorValue}
              strokeWidth="1"
              opacity="0.5"
            />
            <line
              x1={10}
              y1={center}
              x2={size - 10}
              y2={center}
              stroke={primaryColorValue}
              strokeWidth="1"
              opacity="0.5"
            />
            {/* Corner marks */}
            <line x1={center - 15} y1={center} x2={center - 5} y2={center} stroke={primaryColorValue} strokeWidth="2" />
            <line x1={center + 5} y1={center} x2={center + 15} y2={center} stroke={primaryColorValue} strokeWidth="2" />
            <line x1={center} y1={center - 15} x2={center} y2={center - 5} stroke={primaryColorValue} strokeWidth="2" />
            <line x1={center} y1={center + 5} x2={center} y2={center + 15} stroke={primaryColorValue} strokeWidth="2" />
          </>
        )}

        {/* Center dot */}
        {showCenter && !centerContent && (
          <circle
            cx={center}
            cy={center}
            r={4}
            fill={primaryColorValue}
          />
        )}
      </svg>

      {/* Center content */}
      {centerContent && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
          }}
        >
          {centerContent}
        </div>
      )}
    </div>
  );
});

// Mini version for compact use
export const RadialHUDMini = memo(function RadialHUDMini({
  size = 60,
  color = 'lime',
  animated = false,
  className = '',
}) {
  return (
    <RadialHUD
      size={size}
      rings={2}
      segments={6}
      primaryColor={color}
      secondaryColor={color}
      animated={animated}
      showCrosshairs={false}
      showCenter={true}
      glow={false}
      className={className}
    />
  );
});

export default RadialHUD;
