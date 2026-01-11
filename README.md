# Portfolio - Yvan Gui

Portfolio professionnel de développeur web full stack, présentant mes projets, compétences et parcours.

[![Live Demo](https://img.shields.io/badge/demo-live-green)](https://portfolio-yvan-gui.vercel.app/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://www.mongodb.com/)

## Démo

- **Frontend** : [https://portfolio-yvan-gui.vercel.app](https://portfolio-yvan-gui.vercel.app)
- **Backend API** : [https://portfolio-yvangui.onrender.com](https://portfolio-yvangui.onrender.com)

## Fonctionnalités

### Public

- Page d'accueil avec présentation et compétences
- Portfolio de projets avec filtres par catégorie
- Page détail projet avec galerie d'images
- Formulaire de contact
- Mode CLI interactif (Easter egg)

### Admin

- Authentification JWT sécurisée
- Gestion des projets (CRUD)
- Gestion des compétences
- Gestion des expériences
- Messagerie de contact

## Technologies

### Frontend

| Technologie   | Version | Usage         |
| ------------- | ------- | ------------- |
| React         | 19      | Framework UI  |
| Vite          | 7       | Build tool    |
| Tailwind CSS  | 4       | Styles        |
| Framer Motion | 12      | Animations    |
| React Router  | 7       | Routing       |
| Axios         | 1.13    | Requêtes HTTP |
| React Helmet  | 2       | SEO           |

### Backend

| Technologie | Version | Usage            |
| ----------- | ------- | ---------------- |
| Node.js     | 20+     | Runtime          |
| Express     | 5       | Framework API    |
| MongoDB     | -       | Base de données  |
| Mongoose    | 9       | ODM              |
| JWT         | -       | Authentification |
| Cloudinary  | -       | Stockage images  |
| Helmet      | 8       | Sécurité HTTP    |

## Structure du projet

```
Portfolio/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Composants réutilisables
│   │   ├── pages/          # Pages (public & admin)
│   │   ├── context/        # Contextes React
│   │   ├── hooks/          # Hooks personnalisés
│   │   ├── services/       # Services API
│   │   └── routes/         # Configuration routing
│   ├── public/             # Assets statiques
│   └── vite.config.js      # Configuration Vite
│
├── server/                 # Backend Express
│   ├── config/             # Configuration (DB, Cloudinary)
│   ├── controllers/        # Logique métier
│   ├── middlewares/        # Middlewares (auth, upload)
│   ├── models/             # Modèles Mongoose
│   ├── routes/             # Routes API
│   └── server.js           # Point d'entrée
│
└── README.md
```

## Installation

### Prérequis

- Node.js 20+
- npm ou yarn
- Compte MongoDB Atlas
- Compte Cloudinary

### 1. Cloner le projet

```bash
git clone https://github.com/YvanGui19/Portfolio_YvanGui
cd portfolio
```

### 2. Installer le backend

```bash
cd server
npm install
cp .env.example .env
# Configurer les variables d'environnement dans .env
npm run dev
```

### 3. Installer le frontend

```bash
cd client
npm install
cp .env.example .env
# Configurer les variables d'environnement dans .env
npm run dev
```

### 4. Accéder à l'application

- Frontend : http://localhost:5173
- Backend : http://localhost:5000

## Variables d'environnement

### Client (.env)

```env
VITE_API_URL=http://localhost:5000/api
VITE_UPLOADS_URL=http://localhost:5000
```

### Server (.env)

```env
# MongoDB
MONGO_URI=mongodb+srv://...

# JWT
JWT_SECRET=votre_secret_jwt
JWT_EXPIRES_IN=24h

# Email (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=votre.email@gmail.com
EMAIL_PASS=mot_de_passe_application

# Cloudinary
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# Frontend URL (CORS)
CLIENT_URL=http://localhost:5173

# Server
PORT=5000
NODE_ENV=development
```

## Déploiement

### Frontend (Vercel)

1. Connecter le repo GitHub à Vercel
2. Configurer les variables d'environnement
3. Build command : `npm run build`
4. Output directory : `dist`

### Backend (Render)

1. Connecter le repo GitHub à Render
2. Configurer les variables d'environnement
3. Build command : `npm install`
4. Start command : `npm start`

## Optimisations

### Performance

- Code splitting avec React.lazy()
- Lazy loading des images
- Preconnect Cloudinary
- Chunks séparés (vendor, animations, utils)
- Bundle gzip ~173 KB

### SEO

- Meta tags dynamiques (React Helmet)
- Open Graph complet
- Canonical URLs
- Structure sémantique HTML5

### Accessibilité (WCAG)

- Skip link "Aller au contenu principal"
- Navigation clavier complète
- Attributs ARIA (aria-label, aria-pressed, aria-expanded)
- Focus visible sur tous les éléments interactifs
- Alt text descriptifs sur les images
- Structure de headings logique

### Sécurité

- Helmet.js (CSP, HSTS, X-Frame-Options)
- Rate limiting
- Validation des entrées
- JWT HttpOnly cookies
- CORS configuré

## Scripts disponibles

### Client

```bash
npm run dev      # Serveur de développement
npm run build    # Build production
npm run preview  # Preview du build
npm run lint     # Linter ESLint
```

### Server

```bash
npm run dev      # Développement avec nodemon
npm start        # Production
```

## API Endpoints

### Public

- `GET /api/projects` - Liste des projets
- `GET /api/projects/:id` - Détail projet
- `GET /api/skills` - Liste des compétences
- `GET /api/experiences` - Liste des expériences
- `POST /api/contact` - Envoyer un message

### Admin (authentifié)

- `POST /api/auth/login` - Connexion
- `POST /api/auth/logout` - Déconnexion
- `CRUD /api/projects` - Gestion projets
- `CRUD /api/skills` - Gestion compétences
- `CRUD /api/experiences` - Gestion expériences
- `GET /api/messages` - Messages reçus

## Auteur

**Yvan Gui** - Développeur Web Full Stack

- Portfolio : [portfolio-yvan-gui.vercel.app](https://portfolio-yvan-gui.vercel.app)
- Email : yvan.gui19@gmail.com
- GitHub : [Profil GitHub](https://github.com/YvanGui19)

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.
