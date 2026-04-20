import { useRef, useEffect, useState, memo } from 'react';
import { drawSymbol, SYMBOL_TYPES } from './symbolDrawers';

/**
 * SymbolPortrait - Renders a portrait image using Marathon symbols
 * Converts image brightness to symbol density and type
 */
const SymbolPortrait = memo(function SymbolPortrait({
  src,
  width = 280,
  height = 350,
  gridStep = 4,
  colorLight = '#C2FE0B',
  colorDark = '#000000',
  className = '',
}) {
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef(null);

  // Load the image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageRef.current = img;
      setIsLoaded(true);
    };
    img.src = src;
  }, [src]);

  // Render symbols based on image brightness
  useEffect(() => {
    if (!isLoaded || !imageRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = imageRef.current;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    // Create offscreen canvas to extract image data
    const offscreen = document.createElement('canvas');
    offscreen.width = width;
    offscreen.height = height;
    const offCtx = offscreen.getContext('2d');
    offCtx.drawImage(img, 0, 0, width, height);

    const imgData = offCtx.getImageData(0, 0, width, height);
    const pixels = imgData.data;

    // Clear canvas with dark background
    ctx.fillStyle = colorDark;
    ctx.fillRect(0, 0, width, height);

    const sz = gridStep * 0.9;

    // Simple symbols for different brightness levels
    const symbolsForBrightness = ['dot', 'x', '+', 'o', 'sq', 'star4'];

    // Sample image and draw symbols
    for (let y = gridStep / 2; y < height; y += gridStep) {
      for (let x = gridStep / 2; x < width; x += gridStep) {
        // Get pixel brightness at this position
        const px = Math.floor(x);
        const py = Math.floor(y);
        const idx = (py * width + px) * 4;

        const r = pixels[idx];
        const g = pixels[idx + 1];
        const b = pixels[idx + 2];
        const a = pixels[idx + 3];

        if (a < 50) continue; // Skip transparent pixels

        // Calculate brightness (0-1)
        const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;

        // Draw symbol based on brightness
        // Darker areas = smaller/no symbols, brighter areas = larger symbols
        if (brightness > 0.1) {
          // Choose symbol based on brightness level
          const symbolIndex = Math.min(
            Math.floor(brightness * symbolsForBrightness.length),
            symbolsForBrightness.length - 1
          );
          const symbolType = symbolsForBrightness[symbolIndex];

          // Size varies with brightness
          const symbolSize = sz * (0.5 + brightness * 0.6);

          drawSymbol(ctx, symbolType, x, y, symbolSize, colorLight);
        }
      }
    }
  }, [isLoaded, width, height, gridStep, colorLight, colorDark]);

  return (
    <div className={`relative ${className}`}>
      {/* Corner brackets */}
      <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-[#C2FE0B]" />
      <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-[#C2FE0B]" />
      <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-[#C2FE0B]" />
      <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-[#C2FE0B]" />

      <canvas
        ref={canvasRef}
        className="block"
        style={{ width, height }}
      />
    </div>
  );
});

export default SymbolPortrait;
