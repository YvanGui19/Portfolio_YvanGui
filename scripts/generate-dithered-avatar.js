/**
 * Script pour générer une image dithered statique à partir d'une photo portrait
 *
 * Usage: node scripts/generate-dithered-avatar.js <input-image> [output-image]
 *
 * Exemple:
 *   node scripts/generate-dithered-avatar.js ./photo-originale.png ./client/public/images/profile-dithered.png
 *
 * L'image originale NE DOIT PAS être commitée dans le repo git.
 * Seule l'image dithered générée sera utilisée dans le portfolio.
 */

const { Jimp } = require('jimp');
const fs = require('fs');
const path = require('path');

// Configuration par défaut (identique à DitheredAvatar)
const CONFIG = {
  color: '#C2FE0B',      // Lime Marathon
  pixelSize: 2,          // Taille des pixels
  brightness: 0,         // Ajustement luminosité
  contrast: 0,           // Ajustement contraste
  outputSize: 320,       // Taille de sortie
};

/**
 * Parse une couleur hex en RGB
 */
function parseHexColor(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

/**
 * Applique le dithering Floyd-Steinberg à une image
 */
async function generateDitheredImage(inputPath, outputPath, options = {}) {
  const config = { ...CONFIG, ...options };
  const { r: colorR, g: colorG, b: colorB } = parseHexColor(config.color);

  console.log('Loading image:', inputPath);
  const image = await Jimp.read(inputPath);

  const ratio = image.height / image.width;
  const gridWidth = Math.floor(config.outputSize / config.pixelSize);
  const gridHeight = Math.floor((config.outputSize * ratio) / config.pixelSize);

  // Redimensionner pour échantillonnage
  image.resize({ w: gridWidth, h: gridHeight });

  // Appliquer luminosité et contraste si nécessaire
  if (config.brightness !== 0) {
    image.brightness(config.brightness / 100);
  }
  if (config.contrast !== 0) {
    image.contrast(config.contrast / 100);
  }

  // Convertir en niveaux de gris
  image.greyscale();

  // Extraire les données de pixels
  const grayData = new Float32Array(gridWidth * gridHeight);
  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      const idx = y * gridWidth + x;
      const color = image.getPixelColor(x, y);
      // Jimp stocke les couleurs en RGBA (32-bit)
      const r = (color >> 24) & 0xFF;
      grayData[idx] = r; // Après greyscale, R=G=B
    }
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

  // Créer l'image finale
  const finalWidth = gridWidth * config.pixelSize;
  const finalHeight = gridHeight * config.pixelSize;

  const finalImage = new Jimp({ width: finalWidth, height: finalHeight, color: 0x000000FF });

  // Dessiner chaque pixel
  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      const idx = y * gridWidth + x;
      if (pixelGrid[idx] === 1) {
        // Dessiner un carré de pixelSize x pixelSize
        const pixelColor = ((colorR << 24) | (colorG << 16) | (colorB << 8) | 0xFF) >>> 0;
        for (let py = 0; py < config.pixelSize; py++) {
          for (let px = 0; px < config.pixelSize; px++) {
            finalImage.setPixelColor(
              pixelColor,
              x * config.pixelSize + px,
              y * config.pixelSize + py
            );
          }
        }
      }
    }
  }

  // Sauvegarder
  await finalImage.write(outputPath);

  console.log('Dithered image saved:', outputPath);
  console.log(`Dimensions: ${finalWidth}x${finalHeight}`);
  console.log(`Grid: ${gridWidth}x${gridHeight} pixels`);
  console.log(`Color: ${config.color}`);

  return {
    width: finalWidth,
    height: finalHeight,
    gridWidth,
    gridHeight,
  };
}

// CLI
async function main() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.log('Usage: node generate-dithered-avatar.js <input-image> [output-image]');
    console.log('');
    console.log('Options via environment variables:');
    console.log('  DITHER_COLOR=<hex>     Couleur des pixels (défaut: #C2FE0B)');
    console.log('  DITHER_SIZE=<number>   Taille des pixels (défaut: 2)');
    console.log('  DITHER_OUTPUT=<number> Taille de sortie (défaut: 320)');
    console.log('');
    console.log('Exemple:');
    console.log('  node scripts/generate-dithered-avatar.js ./ma-photo.png');
    console.log('  DITHER_COLOR=#01FFFF node scripts/generate-dithered-avatar.js ./ma-photo.png ./output.png');
    process.exit(1);
  }

  const inputPath = path.resolve(args[0]);
  const outputPath = args[1]
    ? path.resolve(args[1])
    : path.join(path.dirname(inputPath), 'profile-dithered.png');

  if (!fs.existsSync(inputPath)) {
    console.error('Error: Input file not found:', inputPath);
    process.exit(1);
  }

  const options = {};
  if (process.env.DITHER_COLOR) options.color = process.env.DITHER_COLOR;
  if (process.env.DITHER_SIZE) options.pixelSize = parseInt(process.env.DITHER_SIZE);
  if (process.env.DITHER_OUTPUT) options.outputSize = parseInt(process.env.DITHER_OUTPUT);

  try {
    await generateDitheredImage(inputPath, outputPath, options);
    console.log('');
    console.log('IMPORTANT: Ne commitez PAS l\'image originale dans git!');
    console.log('Ajoutez-la à .gitignore si nécessaire.');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
