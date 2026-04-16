import { memo, useState, useEffect, useCallback, useRef } from 'react';

/**
 * GlitchText - Texte avec effet de scramble/glitch style Marathon
 * Le texte se "décode" progressivement avec des symboles Marathon
 */

const MARATHON_CHARS = '✖⦿□⊹⁜⦾▣⊡⊗⊕△▽◯×+/\\|-_.';
const GLITCH_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

const GlitchText = memo(function GlitchText({
  text,
  className = '',
  as: Component = 'span',
  scrambleOnHover = false,
  scrambleOnMount = true,
  scrambleDuration = 1500, // ms
  scrambleSpeed = 30, // ms per iteration
  useMarathonChars = true,
  staggerDelay = 50, // ms delay between each character starting
  glitchProbability = 0.1, // chance of random glitch after reveal
  style = {},
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  const chars = useMarathonChars ? MARATHON_CHARS : GLITCH_CHARS;

  const getRandomChar = useCallback(() => {
    return chars[Math.floor(Math.random() * chars.length)];
  }, [chars]);

  const scramble = useCallback(() => {
    if (isScrambling) return;

    setIsScrambling(true);
    const originalText = text;
    const length = originalText.length;
    const revealed = new Array(length).fill(false);
    const startTimes = new Array(length).fill(0).map((_, i) => i * staggerDelay);
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      let newText = '';
      let allRevealed = true;

      for (let i = 0; i < length; i++) {
        const charElapsed = elapsed - startTimes[i];
        const charDuration = scrambleDuration - startTimes[i];

        if (charElapsed < 0) {
          // Not started yet
          newText += getRandomChar();
          allRevealed = false;
        } else if (charElapsed >= charDuration || revealed[i]) {
          // Revealed
          revealed[i] = true;
          // Small chance of temporary glitch
          if (Math.random() < glitchProbability && !revealed[i]) {
            newText += getRandomChar();
          } else {
            newText += originalText[i];
          }
        } else {
          // Scrambling
          newText += getRandomChar();
          allRevealed = false;
        }
      }

      setDisplayText(newText);

      if (!allRevealed) {
        intervalRef.current = setTimeout(animate, scrambleSpeed);
      } else {
        setDisplayText(originalText);
        setIsScrambling(false);
      }
    };

    animate();
  }, [text, scrambleDuration, scrambleSpeed, staggerDelay, glitchProbability, getRandomChar, isScrambling]);

  // Initial scramble on mount
  useEffect(() => {
    if (scrambleOnMount) {
      timeoutRef.current = setTimeout(scramble, 100);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, []);

  // Re-scramble when text changes
  useEffect(() => {
    if (scrambleOnMount && !isScrambling) {
      setDisplayText(text.split('').map(() => getRandomChar()).join(''));
      timeoutRef.current = setTimeout(scramble, 100);
    }
  }, [text]);

  const handleMouseEnter = () => {
    if (scrambleOnHover && !isScrambling) {
      scramble();
    }
  };

  return (
    <Component
      className={className}
      style={style}
      onMouseEnter={handleMouseEnter}
    >
      {displayText}
    </Component>
  );
});

/**
 * TypewriterText - Effet machine à écrire avec curseur clignotant
 */
export const TypewriterText = memo(function TypewriterText({
  text,
  className = '',
  as: Component = 'span',
  typeSpeed = 50,
  startDelay = 0,
  showCursor = true,
  cursorChar = '▌',
  onComplete = () => {},
  style = {},
}) {
  const [displayText, setDisplayText] = useState('');
  const [showCursorState, setShowCursorState] = useState(true);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    let timeout;

    const type = () => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
        timeout = setTimeout(type, typeSpeed);
      } else {
        setIsTyping(false);
        onComplete();
      }
    };

    timeout = setTimeout(type, startDelay);

    return () => clearTimeout(timeout);
  }, [text, typeSpeed, startDelay, onComplete]);

  // Cursor blink
  useEffect(() => {
    if (!showCursor) return;

    const interval = setInterval(() => {
      setShowCursorState(prev => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, [showCursor]);

  return (
    <Component className={className} style={style}>
      {displayText}
      {showCursor && (
        <span style={{ opacity: showCursorState ? 1 : 0 }}>
          {cursorChar}
        </span>
      )}
    </Component>
  );
});

/**
 * FlickerText - Texte qui clignote de façon erratique
 */
export const FlickerText = memo(function FlickerText({
  text,
  className = '',
  as: Component = 'span',
  flickerIntensity = 0.3, // 0-1, higher = more flicker
  flickerSpeed = 100,
  style = {},
}) {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      if (Math.random() < flickerIntensity) {
        setOpacity(Math.random() * 0.5 + 0.5);
      } else {
        setOpacity(1);
      }
    }, flickerSpeed);

    return () => clearInterval(interval);
  }, [flickerIntensity, flickerSpeed]);

  return (
    <Component
      className={className}
      style={{ ...style, opacity, transition: 'opacity 0.05s ease' }}
    >
      {text}
    </Component>
  );
});

/**
 * DataCounter - Compteur de données qui défile
 */
export const DataCounter = memo(function DataCounter({
  prefix = '',
  suffix = '',
  min = 0,
  max = 9999,
  speed = 50,
  fixed = 0,
  className = '',
  style = {},
}) {
  const [value, setValue] = useState(min);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setValue(Math.floor((min + max) / 2));
      return;
    }

    const interval = setInterval(() => {
      setValue(Math.random() * (max - min) + min);
    }, speed);

    return () => clearInterval(interval);
  }, [min, max, speed]);

  return (
    <span className={className} style={style}>
      {prefix}{value.toFixed(fixed)}{suffix}
    </span>
  );
});

export default GlitchText;
