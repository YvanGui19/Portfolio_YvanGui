import { useRef, useEffect, useState, memo } from 'react';
import { drawSymbol, SYMBOL_TYPES } from './symbolDrawers';
import { hash } from './waveField';

/**
 * SkillsReveal - Canvas-based reveal animation for Skills section
 *
 * Animation phases (left to right):
 * 1. Sparse symbols
 * 2. Denser symbols
 * 3. Solid lime
 * 4. Clears to reveal content
 */
const SkillsReveal = memo(function SkillsReveal({
  onComplete,
  duration = 1.8, // Total animation duration in seconds
  colorLime = '#C2FE0B',
  colorBlack = '#000000',
  className = '',
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Intersection Observer to trigger animation when visible
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || isComplete) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const W = container.offsetWidth;
    const H = container.offsetHeight;
    if (!W || !H) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const STEP = 16;
    const sz = STEP * 0.7;
    const startTime = performance.now();
    const durationMs = duration * 1000;

    const animate = (timestamp) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      // Fill with black to hide skills
      ctx.fillStyle = colorBlack;
      ctx.fillRect(0, 0, W, H);

      // Wave position moves from left (-0.3) to right (1.3)
      const wavePos = -0.3 + progress * 1.6;
      const waveWidth = 0.4; // Width of the transition zone

      // Forme profilée - dimensions
      const profileWidth = waveWidth * 0.05 * W;
      const profileX = wavePos * W;
      const angleOffset = H * 0.1; // Décalage angulaire pour le biseau

      // Zone de trail (symboles après le chevron)
      const trailWidth = waveWidth * 0.35 * W;

      // Clear revealed area with angular edge (left of trail zone)
      ctx.save();
      ctx.beginPath();
      const clearX = profileX - profileWidth - trailWidth;
      ctx.moveTo(-10, -10);
      ctx.lineTo(clearX, -10);
      ctx.lineTo(clearX + angleOffset * 0.4, H * 0.5);
      ctx.lineTo(clearX, H + 10);
      ctx.lineTo(-10, H + 10);
      ctx.closePath();
      ctx.clip();
      ctx.clearRect(-10, -10, W + 20, H + 20);
      ctx.restore();

      // Draw stylized profile shape (forme de lame/biseau)
      if (profileX > -profileWidth * 2 && profileX < W + profileWidth * 2) {
        ctx.fillStyle = colorLime;
        ctx.beginPath();

        const x1 = profileX - profileWidth;
        const x2 = profileX + profileWidth * 0.4;

        // Forme profilée asymétrique style lame
        ctx.moveTo(x1, -10);
        ctx.lineTo(x2, -10);
        ctx.lineTo(x2 + angleOffset, H * 0.5);
        ctx.lineTo(x2, H + 10);
        ctx.lineTo(x1, H + 10);
        ctx.lineTo(x1 + angleOffset * 0.6, H * 0.5);
        ctx.closePath();
        ctx.fill();
      }

      // Draw symbols in zones (avant ET après le chevron)
      const trailWidthNorm = waveWidth * 0.35; // Zone de symboles après le chevron (normalized)

      let ix = 0;
      for (let gx = 0; gx < W + STEP; gx += STEP, ix++) {
        const xNorm = gx / W;
        const distFromWave = xNorm - wavePos;

        let iy = 0;
        for (let gy = 0; gy < H + STEP; gy += STEP, iy++) {
          const cx = gx + STEP / 2;
          const cy = gy + STEP / 2;
          const h = hash(ix, iy);

          // === ZONE AVANT LE CHEVRON (dense vers sparse) ===
          if (distFromWave >= waveWidth * 0.03 && distFromWave <= waveWidth) {
            // Zone 3: Dense symbols (proche du chevron)
            if (distFromWave < waveWidth * 0.25) {
              if (h > 0.2) {
                const type = SYMBOL_TYPES[Math.floor(h * SYMBOL_TYPES.length) % SYMBOL_TYPES.length];
                drawSymbol(ctx, type, cx, cy, sz, colorLime);
              }
            }
            // Zone 2: Medium density symbols
            else if (distFromWave < waveWidth * 0.5) {
              if (h > 0.5) {
                const type = SYMBOL_TYPES[Math.floor(h * SYMBOL_TYPES.length) % SYMBOL_TYPES.length];
                drawSymbol(ctx, type, cx, cy, sz * 0.9, colorLime);
              }
            }
            // Zone 1: Sparse symbols (loin du chevron)
            else {
              if (h > 0.85) {
                const type = SYMBOL_TYPES[Math.floor(h * SYMBOL_TYPES.length) % SYMBOL_TYPES.length];
                drawSymbol(ctx, type, cx, cy, sz * 0.8, colorLime);
              }
            }
          }

          // === ZONE APRÈS LE CHEVRON (dense vers sparse, finit en pointe) ===
          if (distFromWave < -waveWidth * 0.03 && distFromWave > -trailWidthNorm) {
            const trailDist = Math.abs(distFromWave + waveWidth * 0.03); // Distance depuis le chevron
            const trailProgress = trailDist / trailWidthNorm; // 0 = près du chevron, 1 = fin

            // Forme en pointe : plus on s'éloigne du chevron, plus la zone se rétrécit vers le centre
            const yNorm = cy / H; // Position Y normalisée
            const distFromCenter = Math.abs(yNorm - 0.5) * 2; // 0 = centre, 1 = bord
            const allowedWidth = 1 - trailProgress * 0.95; // Rétrécit vers 0.05 à la fin

            // Afficher seulement si dans la zone en pointe (proche du centre vertical)
            if (distFromCenter < allowedWidth) {
              // Dense symbols (juste après le chevron)
              if (trailDist < trailWidthNorm * 0.3) {
                if (h > 0.25) {
                  const type = SYMBOL_TYPES[Math.floor(h * SYMBOL_TYPES.length) % SYMBOL_TYPES.length];
                  drawSymbol(ctx, type, cx, cy, sz, colorLime);
                }
              }
              // Medium density symbols
              else if (trailDist < trailWidthNorm * 0.6) {
                if (h > 0.55) {
                  const type = SYMBOL_TYPES[Math.floor(h * SYMBOL_TYPES.length) % SYMBOL_TYPES.length];
                  drawSymbol(ctx, type, cx, cy, sz * 0.9, colorLime);
                }
              }
              // Sparse symbols (vers la pointe)
              else {
                if (h > 0.82) {
                  const type = SYMBOL_TYPES[Math.floor(h * SYMBOL_TYPES.length) % SYMBOL_TYPES.length];
                  drawSymbol(ctx, type, cx, cy, sz * 0.8, colorLime);
                }
              }
            }
          }
        }
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsComplete(true);
        onComplete?.();
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, isComplete, duration, colorLime, colorBlack, onComplete]);

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none z-10 ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />
    </div>
  );
});

export default SkillsReveal;
