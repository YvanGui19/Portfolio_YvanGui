import { useRef, useEffect, useCallback, memo } from 'react';
import { drawSymbol, SYMBOL_TYPES } from './symbolDrawers';
import { evaluateWaveField, hash, HERO_CONFIG } from './waveField';

/**
 * ProceduralBackground - Canvas-based procedural symbol pattern
 *
 * Uses 2D wave fields to create lime/black zones with procedural symbols
 * Symbols are lime on black zones, black on lime zones (inverse contrast)
 * Reproduces the pattern system from the Marathon mockup
 */
const ProceduralBackground = memo(function ProceduralBackground({
  // Wave configuration
  bgWaves = HERO_CONFIG.bgWaves,
  symWaves = HERO_CONFIG.symWaves,
  symbolTypes = SYMBOL_TYPES,

  // Grid settings
  gridStep = 24, // Increased for better performance

  // Colors (Marathon mockup palette)
  colorLime = '#c8f000',
  colorBlack = '#080906',

  // Animation settings
  animated = false,
  speed = 0.0003, // Very slow for subtle effect
  targetFps = 30, // Reduced framerate for performance

  // Styling
  className = '',
  style = {},
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const timeRef = useRef(0);
  const lastFrameTimeRef = useRef(0);
  const isVisibleRef = useRef(true);

  const paint = useCallback((time = 0) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const W = container.offsetWidth;
    const H = container.offsetHeight;
    if (!W || !H) return;

    // Set canvas size with device pixel ratio for sharpness
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    // Fill with black background
    ctx.fillStyle = colorBlack;
    ctx.fillRect(0, 0, W, H);

    const STEP = gridStep;
    const sz = STEP * 0.72;

    // Water flow animation - offset Y coordinate over time
    const flowSpeed = time * 0.08;

    // Helper to get flowing Y coordinate with ripple effect
    const getFlowingY = (xF, yF) => {
      // Main downward flow + subtle horizontal ripple
      const ripple = Math.sin(xF * 6 + time * 0.3) * 0.02;
      // Subtract to flow downward (top to bottom)
      return ((yF - flowSpeed - ripple) % 1 + 1) % 1;
    };

    // First pass: Draw all lime zones as solid areas (no grid gaps)
    ctx.fillStyle = colorLime;
    ctx.beginPath();
    let ix = 0;
    for (let gx = 0; gx < W + STEP; gx += STEP, ix++) {
      let iy = 0;
      for (let gy = 0; gy < H + STEP; gy += STEP, iy++) {
        const xF = gx / W;
        const yF = gy / H;
        const flowingY = getFlowingY(xF, yF);
        const bgVal = evaluateWaveField(xF, flowingY, bgWaves);
        if (bgVal > 0.5) {
          // Add to path with slight overlap to prevent gaps
          ctx.rect(gx - 0.5, gy - 0.5, STEP + 1, STEP + 1);
        }
      }
    }
    ctx.fill();

    // Second pass: Draw symbols only
    ix = 0;
    for (let gx = 0; gx < W + STEP; gx += STEP, ix++) {
      let iy = 0;
      for (let gy = 0; gy < H + STEP; gy += STEP, iy++) {
        const xF = gx / W;
        const yF = gy / H;
        const flowingY = getFlowingY(xF, yF);
        const cx = gx + STEP / 2;
        const cy = gy + STEP / 2;
        const h = hash(ix, iy);

        // Determine symbol type from symWaves (flows with water)
        const st = evaluateWaveField(xF, flowingY, symWaves);
        const type = symbolTypes[Math.floor(st * symbolTypes.length) % symbolTypes.length];

        // Determine if in lime or black zone
        const bgVal = evaluateWaveField(xF, flowingY, bgWaves);
        const isLime = bgVal > 0.5;

        if (isLime) {
          // LIME ZONE: black symbols
          const dl = evaluateWaveField(xF, flowingY, symWaves);
          if (dl > 0.22 + 0.55 * h) {
            drawSymbol(ctx, type, cx, cy, sz, colorBlack);
          }
        } else {
          // BLACK ZONE: lime symbols
          const d = evaluateWaveField(xF, flowingY, symWaves);
          if (d > 0.28 + 0.55 * h) {
            drawSymbol(ctx, type, cx, cy, sz, colorLime);
          }
        }
      }
    }
  }, [bgWaves, symWaves, symbolTypes, gridStep, colorLime, colorBlack]);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const shouldAnimate = animated && !prefersReducedMotion;
    const frameInterval = 1000 / targetFps;

    // Intersection Observer - pause when not visible
    const observer = new IntersectionObserver(
      (entries) => {
        isVisibleRef.current = entries[0].isIntersecting;
      },
      { threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    if (shouldAnimate) {
      // Animation loop with framerate limiting
      const animate = (timestamp) => {
        // Skip if not visible
        if (!isVisibleRef.current) {
          animationRef.current = requestAnimationFrame(animate);
          return;
        }

        // Limit framerate
        const elapsed = timestamp - lastFrameTimeRef.current;
        if (elapsed < frameInterval) {
          animationRef.current = requestAnimationFrame(animate);
          return;
        }
        lastFrameTimeRef.current = timestamp - (elapsed % frameInterval);

        timeRef.current += speed;
        paint(timeRef.current);
        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);
    } else {
      // Static paint
      paint(0);
    }

    // Handle resize
    const handleResize = () => {
      if (!shouldAnimate) {
        paint(0);
      }
    };

    window.addEventListener('resize', handleResize);

    // Use ResizeObserver for container size changes
    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [paint, animated, speed, targetFps]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
      style={style}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />
    </div>
  );
});

export default ProceduralBackground;
