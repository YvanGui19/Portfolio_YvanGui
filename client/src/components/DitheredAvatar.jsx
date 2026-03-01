import { useRef, useEffect, useState, useCallback } from 'react';

/**
 * DitheredAvatar - Composant React pour afficher un portrait pixelisé avec effet dithering
 * et scintillement animé style terminal rétro.
 * 
 * @param {string} src - URL de l'image source
 * @param {string} color - Couleur des pixels (hex), défaut: '#00ff88'
 * @param {number} pixelSize - Taille des pixels (2-12), défaut: 4
 * @param {number} flickerIntensity - Intensité du scintillement en % (0-25), défaut: 8
 * @param {number} flickerSpeed - Vitesse du scintillement en ms (30-200), défaut: 60
 * @param {number} brightness - Ajustement luminosité (-50 à 50), défaut: 0
 * @param {number} contrast - Ajustement contraste (-50 à 50), défaut: 0
 * @param {number} size - Taille du canvas en pixels, défaut: 300
 * @param {string} className - Classes CSS additionnelles
 */
const DitheredAvatar = ({
  src,
  color = '#00ff88',
  pixelSize = 4,
  flickerIntensity = 8,
  flickerSpeed = 60,
  brightness = 0,
  contrast = 0,
  size = 300,
  className = '',
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const pixelGridRef = useRef(null);
  const gridDimensionsRef = useRef({ width: 0, height: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  // Traitement de l'image avec Floyd-Steinberg dithering
  const processImage = useCallback((img) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const ratio = img.height / img.width;
    
    // Calculer la grille de pixels
    const gridWidth = Math.floor(size / pixelSize);
    const gridHeight = Math.floor((size * ratio) / pixelSize);
    
    // Définir la taille du canvas
    canvas.width = gridWidth * pixelSize;
    canvas.height = gridHeight * pixelSize;
    
    // Canvas temporaire pour échantillonner l'image
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = gridWidth;
    tempCanvas.height = gridHeight;
    
    tempCtx.drawImage(img, 0, 0, gridWidth, gridHeight);
    const imageData = tempCtx.getImageData(0, 0, gridWidth, gridHeight);
    const data = imageData.data;
    
    // Appliquer luminosité et contraste
    const contrastFactor = (259 * (contrast + 255)) / (255 * (259 - contrast));
    for (let i = 0; i < data.length; i += 4) {
      for (let c = 0; c < 3; c++) {
        let val = data[i + c];
        val += brightness * 2;
        val = contrastFactor * (val - 128) + 128;
        data[i + c] = Math.max(0, Math.min(255, val));
      }
    }
    
    // Convertir en niveaux de gris
    const grayData = new Float32Array(gridWidth * gridHeight);
    for (let i = 0; i < gridWidth * gridHeight; i++) {
      const idx = i * 4;
      grayData[i] = data[idx] * 0.299 + data[idx + 1] * 0.587 + data[idx + 2] * 0.114;
    }
    
    // Floyd-Steinberg Dithering
    const pixelGrid = new Uint8Array(gridWidth * gridHeight);
    
    for (let y = 0; y < gridHeight; y++) {
      for (let x = 0; x < gridWidth; x++) {
        const idx = y * gridWidth + x;
        const oldVal = grayData[idx];
        const newVal = oldVal < 128 ? 0 : 255;
        pixelGrid[idx] = newVal > 0 ? 1 : 0;
        const error = oldVal - newVal;
        
        if (x + 1 < gridWidth) {
          grayData[idx + 1] += error * 7 / 16;
        }
        if (y + 1 < gridHeight) {
          if (x > 0) {
            grayData[idx + gridWidth - 1] += error * 3 / 16;
          }
          grayData[idx + gridWidth] += error * 5 / 16;
          if (x + 1 < gridWidth) {
            grayData[idx + gridWidth + 1] += error * 1 / 16;
          }
        }
      }
    }
    
    pixelGridRef.current = pixelGrid;
    gridDimensionsRef.current = { width: gridWidth, height: gridHeight };
    setIsLoaded(true);
  }, [size, pixelSize, brightness, contrast]);

  // Rendu du canvas avec scintillement optionnel
  const render = useCallback((withFlicker = false) => {
    const canvas = canvasRef.current;
    const pixelGrid = pixelGridRef.current;
    const { width: gridWidth, height: gridHeight } = gridDimensionsRef.current;
    
    if (!canvas || !pixelGrid) return;
    
    const ctx = canvas.getContext('2d');
    
    // Fond noir
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Parser la couleur
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    
    // Générer la map de scintillement si nécessaire
    let flickerMap = null;
    if (withFlicker && flickerIntensity > 0) {
      flickerMap = {};
      const totalPixels = gridWidth * gridHeight;
      const flickerCount = Math.floor(totalPixels * flickerIntensity / 100);
      
      for (let i = 0; i < flickerCount; i++) {
        const idx = Math.floor(Math.random() * totalPixels);
        if (pixelGrid[idx] === 1) {
          flickerMap[idx] = Math.random() < 0.5 
            ? 0.2 + Math.random() * 0.4
            : 1.1 + Math.random() * 0.3;
        }
      }
    }
    
    // Dessiner chaque pixel
    for (let y = 0; y < gridHeight; y++) {
      for (let x = 0; x < gridWidth; x++) {
        const idx = y * gridWidth + x;
        
        if (pixelGrid[idx] === 1) {
          let intensity = 1;
          
          if (flickerMap && flickerMap[idx] !== undefined) {
            intensity = flickerMap[idx];
          }
          
          const pr = Math.round(r * Math.min(intensity, 1.3));
          const pg = Math.round(g * Math.min(intensity, 1.3));
          const pb = Math.round(b * Math.min(intensity, 1.3));
          
          ctx.fillStyle = `rgb(${Math.min(255, pr)}, ${Math.min(255, pg)}, ${Math.min(255, pb)})`;
          ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
      }
    }
  }, [color, pixelSize, flickerIntensity]);

  // Animation loop
  const animate = useCallback(() => {
    render(true);
    animationRef.current = setTimeout(() => {
      requestAnimationFrame(animate);
    }, flickerSpeed);
  }, [render, flickerSpeed]);

  // Charger et traiter l'image
  useEffect(() => {
    if (!src) return;
    
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => processImage(img);
    img.src = src;
  }, [src, processImage]);

  // Démarrer l'animation quand l'image est chargée
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

export default DitheredAvatar;
