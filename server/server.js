const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

// Charger les variables d'environnement
dotenv.config();

// Connexion à MongoDB
connectDB();

const app = express();

// Middlewares de sécurité
app.use(helmet({
  // Permet le chargement cross-origin des ressources (images Cloudinary, etc.)
  crossOriginResourcePolicy: { policy: "cross-origin" },

  // Content Security Policy - adapté pour le portfolio
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https://res.cloudinary.com", "https://*.cloudinary.com"],
      connectSrc: ["'self'", process.env.CLIENT_URL || "http://localhost:5173"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },

  // HSTS - Force HTTPS (15552000 = 180 jours)
  strictTransportSecurity: {
    maxAge: 15552000,
    includeSubDomains: true,
  },

  // Referrer-Policy - moins restrictif pour les analytics
  referrerPolicy: {
    policy: "strict-origin-when-cross-origin",
  },
}));

// Rate limiting (200 requêtes par 15 minutes par IP)
const limiter = rateLimit({
windowMs: 15 * 60 * 1000,
max: 200,
message: { message: 'Trop de requêtes, réessayez plus tard.' },
});
app.use('/api', limiter);

// CORS
app.use(
cors({
origin: process.env.CLIENT_URL || 'http://localhost:5173',
credentials: true,
})
);

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Servir les fichiers uploadés
app.use('/uploads', express.static('uploads'));

// Route de test
app.get('/', (req, res) => {
res.json({ message: 'API Portfolio fonctionne !' });
});

// Routes API
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/experiences', require('./routes/experiences'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/upload', require('./routes/upload'));

// Middleware de gestion des erreurs (toujours en dernier)
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`Serveur démarré sur le port ${PORT}`);
console.log(`URL: http://localhost:${PORT}`);
});
