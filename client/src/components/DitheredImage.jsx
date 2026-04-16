import { useRef, useEffect, useState, useCallback } from 'react';

/**
 * DitheredImage - Composant pour afficher une image PRÉ-DITHERED avec effet de flicker
 *
 * Contrairement à DitheredAvatar, ce composant n'applique PAS de dithering.
 * L'image source doit déjà être dithered (générée par le script generate-dithered-avatar.js)
 *
 * Cela permet de ne jamais exposer l'image originale sur internet.
 *
 * @param {string} src - URL de l'image PRÉ-DITHERED (noir + couleur lime)
 * @param {string} color - Couleur des pixels pour le flicker (hex), défaut: '#C2FE0B'
 * @param {number} flickerIntensity - Intensité du scintillement en % (0-25), défaut: 8
 * @param {number} flickerSpeed - Vitesse du scintillement en ms (30-200), défaut: 200
 * @param {string} className - Classes CSS additionnelles
 */
const DitheredImage = ({
  src,
  color = '#C2FE0B',
  flickerIntensity = 8,
  flickerSpeed = 200,
  className = '',
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const imageDataRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Charger l'image et extraire les données de pixels
  const loadImage = useCallback(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      // Extraire les données de pixels pour le flicker
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      imageDataRef.current = {
        original: new Uint8ClampedArray(imageData.data),
        width: canvas.width,
        height: canvas.height,
      };

      setIsLoaded(true);
    };

    img.src = src;
  }, [src]);

  // Rendu avec flicker
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const data = imageDataRef.current;

    if (!canvas || !data) return;

    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(data.width, data.height);
    const pixels = imageData.data;

    // Copier les données originales
    pixels.set(data.original);

    // Appliquer le flicker sur les pixels colorés (non-noirs)
    if (flickerIntensity > 0) {
      const totalPixels = data.width * data.height;
      const flickerCount = Math.floor(totalPixels * flickerIntensity / 100);

      for (let i = 0; i < flickerCount; i++) {
        const pixelIndex = Math.floor(Math.random() * totalPixels);
        const idx = pixelIndex * 4;

        // Vérifier si le pixel est coloré (pas noir)
        if (pixels[idx] > 10 || pixels[idx + 1] > 10 || pixels[idx + 2] > 10) {
          const factor = Math.random() < 0.5
            ? 0.3 + Math.random() * 0.4  // Dim
            : 1.1 + Math.random() * 0.2; // Bright

          pixels[idx] = Math.min(255, Math.round(pixels[idx] * factor));
          pixels[idx + 1] = Math.min(255, Math.round(pixels[idx + 1] * factor));
          pixels[idx + 2] = Math.min(255, Math.round(pixels[idx + 2] * factor));
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }, [flickerIntensity]);

  // Animation loop
  const animate = useCallback(() => {
    render();
    animationRef.current = setTimeout(() => {
      requestAnimationFrame(animate);
    }, flickerSpeed);
  }, [render, flickerSpeed]);

  // Charger l'image au montage
  useEffect(() => {
    loadImage();
  }, [loadImage]);

  // Démarrer l'animation
  useEffect(() => {
    if (isLoaded) {
      animate();
    }

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [isLoaded, animate]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        background: '#000',
        filter: `drop-shadow(0 0 20px ${color}40)`,
      }}
    />
  );
};

export default DitheredImage;
