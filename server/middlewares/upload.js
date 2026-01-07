const multer = require('multer');
const sharp = require('sharp');
const cloudinary = require('../config/cloudinary');

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

// Upload vers Cloudinary depuis un buffer
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'portfolio/projects',
        format: 'webp',
        transformation: [
          { width: 1200, height: 800, crop: 'limit' },
          { quality: 'auto:good' },
        ],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
};

// Middleware pour traiter et uploader l'image vers Cloudinary
const processImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    // Optimiser avec Sharp avant upload
    const optimizedBuffer = await sharp(req.file.buffer)
      .resize(1200, 800, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: 80 })
      .toBuffer();

    // Upload vers Cloudinary
    const result = await uploadToCloudinary(optimizedBuffer);

    // Ajouter l'URL Cloudinary à la requête
    req.file.filename = result.public_id;
    req.file.path = result.secure_url;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  upload,
  processImage,
};
