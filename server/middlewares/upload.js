const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

// Dossier de stockage des images
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads', 'projects');

// Créer le dossier s'il n'existe pas
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Configuration du stockage en mémoire (pour traitement avec Sharp)
const storage = multer.memoryStorage();

// Filtre pour n'accepter que les images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Format non supporté. Utilisez JPEG, PNG ou WebP.'), false);
  }
};

// Configuration Multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB max
  },
});

// Générer un nom de fichier unique
const generateFilename = () => {
  const timestamp = Date.now();
  const randomStr = crypto.randomBytes(8).toString('hex');
  return `${timestamp}-${randomStr}.webp`;
};

// Middleware pour traiter et sauvegarder l'image localement
const processImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const filename = generateFilename();
    const filepath = path.join(UPLOADS_DIR, filename);

    // Optimiser avec Sharp et sauvegarder
    await sharp(req.file.buffer)
      .resize(1200, 800, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: 80 })
      .toFile(filepath);

    // Ajouter le chemin relatif à la requête (pour stockage en BDD)
    req.file.filename = filename;
    req.file.path = `/uploads/projects/${filename}`;

    next();
  } catch (error) {
    next(error);
  }
};

// Extraire le chemin du fichier depuis l'URL
const getFilepathFromUrl = (url) => {
  if (!url) return null;

  // Si c'est une URL Cloudinary, on ne peut pas la supprimer localement
  if (url.includes('cloudinary.com')) {
    return null;
  }

  // Extraire le chemin relatif et construire le chemin absolu
  const relativePath = url.replace(/^\//, '');
  return path.join(__dirname, '..', relativePath);
};

// Supprimer une image locale
const deleteLocalImage = async (imageUrl) => {
  const filepath = getFilepathFromUrl(imageUrl);
  if (!filepath) {
    return false;
  }

  try {
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Erreur suppression image locale:', error);
    return false;
  }
};

// Supprimer plusieurs images locales
const deleteMultipleImages = async (imageUrls) => {
  const results = await Promise.all(
    imageUrls.map((url) => deleteLocalImage(url))
  );
  return results;
};

// Aliases pour compatibilité avec le code existant
const deleteFromCloudinary = deleteLocalImage;
const deleteMultipleFromCloudinary = deleteMultipleImages;

module.exports = {
  upload,
  processImage,
  deleteLocalImage,
  deleteMultipleImages,
  // Aliases pour compatibilité
  deleteFromCloudinary,
  deleteMultipleFromCloudinary,
};
