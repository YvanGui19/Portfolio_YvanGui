import React, { memo, useState, useEffect, useMemo } from 'react';

// Characters for noise effect
const NOISE_CHARS = '░▒▓█▌▐│┤┬├─┼╪╫╬═║╒╓╔╕╖╗╘╙╚╛╜╝╞╟╠╡╢╣╤╥╦╧╨╩╪╫╬';
const STATIC_CHARS = '▓▒░█▌▐';
const GLITCH_CHARS = '⊡⊹⋰⋱◎◇◆●○';

/**
 * SignalNoise - Barre de bruit statique animee
 *
 * @param {string} height - Hauteur de la barre
 * @param {string} width - Largeur de la barre
 * @param {string} intensity - Intensite: 'low' | 'medium' | 'high'
 * @param {string} color - Couleur: 'lime' | 'cyan' | 'mixed' | 'grey'
 * @param {string} direction - Direction: 'horizontal' | 'vertical'
 * @param {string} className - Classes CSS additionnelles
 * @param {boolean} animated - Animation activee
 */
const SignalNoise = memo(function SignalNoise({
  height = '1.5rem',
  width = '100%',
  intensity = 'medium',
  color = 'lime',
  direction = 'horizontal',
  className = '',
  animated = true,
}) {
  const [chars, setChars] = useState('');

  const intensityConfig = {
    low: { charCount: 30, interval: 150, opacity: 0.2 },
    medium: { charCount: 50, interval: 100, opacity: 0.3 },
    high: { charCount: 80, interval: 50, opacity: 0.5 },
  };

  const colorClasses = {
    lime: 'text-lime',
    cyan: 'text-cyan',
    mixed: '', // Will use inline colors
    grey: 'text-grey',
  };

  const config = intensityConfig[intensity];

  const generateNoise = () => {
    let result = '';
    const charSet = intensity === 'high' ? NOISE_CHARS : STATIC_CHARS;

    for (let i = 0; i < config.charCount; i++) {
      result += charSet[Math.floor(Math.random() * charSet.length)];
    }
    return result;
  };

  useEffect(() => {
    if (!animated) {
      setChars(generateNoise());
      return;
    }

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setChars(generateNoise());
      return;
    }

    const interval = setInterval(() => {
      setChars(generateNoise());
    }, config.interval);

    return () => clearInterval(interval);
  }, [animated, intensity]);

  // For mixed color, generate colored spans
  const renderMixedChars = () => {
    if (color !== 'mixed') return null;

    const colors = ['text-lime', 'text-cyan', 'text-violet', 'text-grey'];
    return chars.split('').map((char, i) => (
      <span
        key={i}
        className={colors[Math.floor(Math.random() * colors.length)]}
      >
        {char}
      </span>
    ));
  };

  return (
    <div
      className={`
        overflow-hidden font-mono text-[0.6rem] leading-none
        whitespace-nowrap select-none pointer-events-none
        ${colorClasses[color]}
        ${className}
      `}
      style={{
        height,
        width,
        opacity: config.opacity,
        writingMode: direction === 'vertical' ? 'vertical-rl' : 'horizontal-tb',
      }}
      aria-hidden="true"
    >
      {color === 'mixed' ? renderMixedChars() : chars}
    </div>
  );
});

/**
 * StaticOverlay - Overlay de parasites sur tout l'ecran
 */
export const StaticOverlay = memo(function StaticOverlay({
  opacity = 0.05,
  active = true,
  className = '',
}) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!active) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setFrame(f => f + 1);
    }, 100);

    return () => clearInterval(interval);
  }, [active]);

  if (!active) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-50 ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundPosition: `${frame * 10}px ${frame * 10}px`,
        }}
      />
    </div>
  );
});

/**
 * GlitchBar - Barre avec effet de glitch intermittent
 */
export const GlitchBar = memo(function GlitchBar({
  height = '2px',
  color = 'lime',
  glitchInterval = 3000,
  className = '',
}) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const triggerGlitch = () => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 150);
    };

    const interval = setInterval(triggerGlitch, glitchInterval);
    return () => clearInterval(interval);
  }, [glitchInterval]);

  const colorClasses = {
    lime: 'bg-lime',
    cyan: 'bg-cyan',
    violet: 'bg-violet',
    red: 'bg-red',
  };

  return (
    <div
      className={`
        w-full ${colorClasses[color]}
        transition-all duration-75
        ${isGlitching ? 'opacity-30 translate-x-1' : 'opacity-50'}
        ${className}
      `}
      style={{ height }}
      aria-hidden="true"
    />
  );
});

/**
 * TransmissionIndicator - Indicateur de transmission avec animation
 */
export const TransmissionIndicator = memo(function TransmissionIndicator({
  active = true,
  label = 'TRANSMITTING',
  color = 'lime',
  className = '',
}) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (!active) {
      setDots('');
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDots('...');
      return;
    }

    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    return () => clearInterval(interval);
  }, [active]);

  const colorClasses = {
    lime: 'text-lime',
    cyan: 'text-cyan',
    violet: 'text-violet',
    red: 'text-red',
  };

  return (
    <span
      className={`
        font-mono text-[0.6rem] uppercase tracking-wider
        ${colorClasses[color]}
        ${className}
      `}
    >
      {label}<span className="inline-block w-6">{dots}</span>
    </span>
  );
});

/**
 * ProgressNoise - Barre de progression avec effet noise
 */
export const ProgressNoise = memo(function ProgressNoise({
  progress = 0,
  height = '8px',
  showPercent = true,
  color = 'lime',
  className = '',
}) {
  const colorClasses = {
    lime: 'bg-lime',
    cyan: 'bg-cyan',
    violet: 'bg-violet',
  };

  const bgColorClasses = {
    lime: 'bg-lime/10',
    cyan: 'bg-cyan/10',
    violet: 'bg-violet/10',
  };

  const textColorClasses = {
    lime: 'text-lime',
    cyan: 'text-cyan',
    violet: 'text-violet',
  };

  // Generate block characters for progress
  const totalBlocks = 20;
  const filledBlocks = Math.round((progress / 100) * totalBlocks);
  const emptyBlocks = totalBlocks - filledBlocks;

  const progressChars = '▓'.repeat(filledBlocks) + '░'.repeat(emptyBlocks);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className={`font-mono text-[0.7rem] ${textColorClasses[color]} tracking-wider`}
      >
        [{progressChars}]
      </div>
      {showPercent && (
        <span className={`font-mono text-[0.65rem] ${textColorClasses[color]}`}>
          {Math.round(progress)}%
        </span>
      )}
    </div>
  );
});

/**
 * AcquiringLoader - Loader style "ACQUIRING DATA..."
 */
export const AcquiringLoader = memo(function AcquiringLoader({
  text = 'ACQUIRING DATA',
  color = 'lime',
  className = '',
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const interval = setInterval(() => {
      setProgress(prev => {
        // Random progress increment for more organic feel
        const increment = prefersReducedMotion ? 5 : Math.random() * 15 + 5;
        return prev >= 100 ? 0 : Math.min(100, prev + increment);
      });
    }, prefersReducedMotion ? 200 : 150);

    return () => clearInterval(interval);
  }, []);

  const colorClasses = {
    lime: 'text-lime',
    cyan: 'text-cyan',
    violet: 'text-violet',
  };

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <TransmissionIndicator label={text} color={color} />
      <ProgressNoise progress={progress} color={color} showPercent />
    </div>
  );
});

export default SignalNoise;
