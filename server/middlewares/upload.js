const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

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

// Middleware pour traiter et sauvegarder l'image
const processImage = async (req, res, next) => {
if (!req.file) {
return next();
}

try {
// Créer le dossier si nécessaire
const uploadDir = path.join(__dirname, '../uploads/projects');
if (!fs.existsSync(uploadDir)) {
fs.mkdirSync(uploadDir, { recursive: true });
}

// Générer un nom unique
const filename = `project-${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;
const filepath = path.join(uploadDir, filename);

// Traiter l'image avec Sharp
await sharp(req.file.buffer)
.resize(1200, 800, {
fit: 'inside',
withoutEnlargement: true,
})
.webp({ quality: 80 })
.toFile(filepath);

// Ajouter le chemin à la requête
req.file.filename = filename;
req.file.path = `/uploads/projects/${filename}`;

next();
} catch (error) {
next(error);
}
};

module.exports = {
upload,
processImage,
};
