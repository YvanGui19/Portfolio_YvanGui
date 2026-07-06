/**
 * Génère un portrait-mosaïque SVG statique à partir d'une photo source.
 *
 * Réplique la logique du composant React SymbolPortrait
 * (client/src/components/canvas/SymbolPortrait.jsx) en pré-rendu offline :
 * on lit la photo source une seule fois, on échantillonne les pixels selon
 * une grille, et on émet des symboles Marathon dans un SVG. La photo source
 * ne quitte JAMAIS ta machine - seul le SVG (représentation non-reconnaissable
 * en symboles) est destiné à être publié.
 *
 * Usage :
 *   node scripts/generate-portrait-mosaic.js <input-image> [output-svg]
 *
 * Exemple typique :
 *   node scripts/generate-portrait-mosaic.js ./photo-privee.png \
 *        ./client/public/images/portrait-mosaic.svg
 *
 * Options via variables d'environnement (par défaut = configuration
 * qui reproduit l'usage About.jsx : width=300, height=300, gridStep=3,
 * colorLight="#01FFFF") :
 *   MOSAIC_WIDTH        Largeur output (défaut 300)
 *   MOSAIC_HEIGHT       Hauteur output (défaut 300)
 *   MOSAIC_GRID_STEP    Pas d'échantillonnage (défaut 3, plus petit = plus fin)
 *   MOSAIC_COLOR_LIGHT  Couleur des symboles (défaut #01FFFF cyan Marathon)
 *   MOSAIC_COLOR_DARK   Couleur du fond (défaut #000000)
 *
 * IMPORTANT : la photo source ne doit JAMAIS être committée dans git.
 * Le SVG généré est safe à commit et à servir publiquement.
 */
const { Jimp } = require('jimp');
const fs = require('fs');
const path = require('path');

const CONFIG = {
  width: 300,
  height: 300,
  gridStep: 3,
  colorLight: '#01FFFF',
  colorDark: '#000000',
};

// Ordre calqué sur SymbolPortrait.jsx (symbolsForBrightness) : les 6 types
// utilisés, du plus sombre (dot) au plus lumineux (star4).
const SYMBOLS_FOR_BRIGHTNESS = ['dot', 'x', '+', 'o', 'sq', 'star4'];

/**
 * Retourne un fragment SVG pour un symbole donné. Reproduit exactement les
 * shapes de symbolDrawers.js (client/src/components/canvas/symbolDrawers.js).
 */
function drawSymbolSVG(type, cx, cy, sz, col) {
  const r = sz * 0.42;
  const sw = Math.max(0.7, sz * 0.13);
  const f = (n) => n.toFixed(1);
  const fs2 = (n) => n.toFixed(2);
  const stroke = `stroke="${col}" stroke-width="${fs2(sw)}" stroke-linecap="square" fill="none"`;

  switch (type) {
    case 'dot':
      return `<circle cx="${f(cx)}" cy="${f(cy)}" r="${fs2(sz * 0.1)}" fill="${col}" />`;
    case 'x':
      return (
        `<line x1="${f(cx - r)}" y1="${f(cy - r)}" x2="${f(cx + r)}" y2="${f(cy + r)}" ${stroke} />` +
        `<line x1="${f(cx + r)}" y1="${f(cy - r)}" x2="${f(cx - r)}" y2="${f(cy + r)}" ${stroke} />`
      );
    case '+':
      return (
        `<line x1="${f(cx - r)}" y1="${f(cy)}" x2="${f(cx + r)}" y2="${f(cy)}" ${stroke} />` +
        `<line x1="${f(cx)}" y1="${f(cy - r)}" x2="${f(cx)}" y2="${f(cy + r)}" ${stroke} />`
      );
    case 'o':
      return `<circle cx="${f(cx)}" cy="${f(cy)}" r="${fs2(r)}" ${stroke} />`;
    case 'sq':
      return `<rect x="${f(cx - r)}" y="${f(cy - r)}" width="${fs2(2 * r)}" height="${fs2(2 * r)}" ${stroke} />`;
    case 'star4': {
      const pts = [];
      for (let i = 0; i < 8; i++) {
        const a = (i * Math.PI) / 4 - Math.PI / 2;
        const ri = i % 2 === 0 ? r : r * 0.28;
        pts.push(`${f(cx + ri * Math.cos(a))},${f(cy + ri * Math.sin(a))}`);
      }
      return `<polygon points="${pts.join(' ')}" fill="${col}" />`;
    }
    default:
      return `<circle cx="${f(cx)}" cy="${f(cy)}" r="${fs2(sz * 0.1)}" fill="${col}" />`;
  }
}

async function generateMosaic(inputPath, outputPath, options = {}) {
  const config = { ...CONFIG, ...options };
  const { width, height, gridStep, colorLight, colorDark } = config;

  console.log(`Loading source image: ${inputPath}`);
  const image = await Jimp.read(inputPath);

  // Cover: remplit exactement width x height en croppant l'excédent, comme le
  // fait le canvas offscreen dans SymbolPortrait (drawImage 0,0,width,height).
  image.cover({ w: width, h: height });

  const shapes = [];
  const sz = gridStep * 0.9;

  for (let y = gridStep / 2; y < height; y += gridStep) {
    for (let x = gridStep / 2; x < width; x += gridStep) {
      const px = Math.floor(x);
      const py = Math.floor(y);
      const color = image.getPixelColor(px, py);
      // Jimp 32-bit RGBA (big-endian: RRGGBBAA)
      const r = (color >>> 24) & 0xff;
      const g = (color >>> 16) & 0xff;
      const b = (color >>> 8) & 0xff;
      const a = color & 0xff;

      if (a < 50) continue; // même seuil qu'en runtime

      const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
      if (brightness <= 0.1) continue; // idem SymbolPortrait

      const symbolIndex = Math.min(
        Math.floor(brightness * SYMBOLS_FOR_BRIGHTNESS.length),
        SYMBOLS_FOR_BRIGHTNESS.length - 1,
      );
      const symbolType = SYMBOLS_FOR_BRIGHTNESS[symbolIndex];
      const symbolSize = sz * (0.5 + brightness * 0.6);

      shapes.push(drawSymbolSVG(symbolType, x, y, symbolSize, colorLight));
    }
  }

  const svg =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" ` +
    `width="${width}" height="${height}" role="img" aria-label="Portrait stylisé en symboles Marathon">\n` +
    `  <rect width="${width}" height="${height}" fill="${colorDark}" />\n` +
    shapes.map((s) => `  ${s}`).join('\n') + '\n' +
    `</svg>\n`;

  fs.writeFileSync(outputPath, svg, 'utf8');
  const kb = (fs.statSync(outputPath).size / 1024).toFixed(1);

  console.log(`\nSaved SVG mosaic: ${outputPath}`);
  console.log(`  Dimensions   : ${width}x${height}`);
  console.log(`  Grid step    : ${gridStep} px (plus petit = plus fin)`);
  console.log(`  Symbols drawn: ${shapes.length}`);
  console.log(`  Colors       : ${colorLight} on ${colorDark}`);
  console.log(`  File size    : ${kb} KB`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.log('Usage: node generate-portrait-mosaic.js <input-image> [output-svg]');
    console.log('');
    console.log('Variables d\'environnement disponibles :');
    console.log('  MOSAIC_WIDTH=<int>       (défaut: 300)');
    console.log('  MOSAIC_HEIGHT=<int>      (défaut: 300)');
    console.log('  MOSAIC_GRID_STEP=<int>   (défaut: 3, plus petit = plus fin)');
    console.log('  MOSAIC_COLOR_LIGHT=<hex> (défaut: #01FFFF)');
    console.log('  MOSAIC_COLOR_DARK=<hex>  (défaut: #000000)');
    console.log('');
    console.log('Exemple :');
    console.log('  node scripts/generate-portrait-mosaic.js ./ma-photo.png \\');
    console.log('       ./client/public/images/portrait-mosaic.svg');
    console.log('');
    console.log('IMPORTANT : la photo source ne doit PAS être committée dans git.');
    console.log('Seul le SVG généré est destiné à être publié.');
    process.exit(1);
  }

  const inputPath = path.resolve(args[0]);
  const outputPath = args[1]
    ? path.resolve(args[1])
    : path.join(path.dirname(inputPath), 'portrait-mosaic.svg');

  if (!fs.existsSync(inputPath)) {
    console.error(`Error: input file not found: ${inputPath}`);
    process.exit(1);
  }

  const options = {};
  if (process.env.MOSAIC_WIDTH) options.width = parseInt(process.env.MOSAIC_WIDTH, 10);
  if (process.env.MOSAIC_HEIGHT) options.height = parseInt(process.env.MOSAIC_HEIGHT, 10);
  if (process.env.MOSAIC_GRID_STEP) options.gridStep = parseInt(process.env.MOSAIC_GRID_STEP, 10);
  if (process.env.MOSAIC_COLOR_LIGHT) options.colorLight = process.env.MOSAIC_COLOR_LIGHT;
  if (process.env.MOSAIC_COLOR_DARK) options.colorDark = process.env.MOSAIC_COLOR_DARK;

  try {
    await generateMosaic(inputPath, outputPath, options);
    console.log('');
    console.log('Étape suivante :');
    console.log('  1. Ouvre le SVG dans un navigateur pour valider le rendu.');
    console.log('  2. Ajuste MOSAIC_GRID_STEP si trop fin/gros (2 = très fin, 4-5 = plus lâche).');
    console.log('  3. Une fois le rendu OK, place le SVG à client/public/images/portrait-mosaic.svg.');
    console.log('  4. Commit + push - le SVG est safe car il ne contient aucun pixel de la source.');
  } catch (e) {
    console.error(`Error: ${e.message}`);
    process.exit(1);
  }
}

main();
