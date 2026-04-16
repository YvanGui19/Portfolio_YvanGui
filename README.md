# Portfolio - Yvan Gui

Portfolio professionnel de developpeur web full stack, presentant mes projets, competences et parcours.

[![Live Demo](https://img.shields.io/badge/demo-live-green)](https://yvangui.fr)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Local-green)](https://www.mongodb.com/)

## Demo

- **Site** : [https://yvangui.fr](https://yvangui.fr)

## Fonctionnalites

### Public

- Page d'accueil avec presentation et competences
- Portfolio de projets avec filtres par categorie
- Page detail projet avec galerie d'images
- Formulaire de contact
- Mode CLI interactif (Easter egg)

### Admin

- Authentification JWT securisee
- Gestion des projets (CRUD)
- Gestion des competences
- Gestion des experiences
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
| Axios         | 1.13    | Requetes HTTP |
| React Helmet  | 2       | SEO           |

### Backend

| Technologie | Version | Usage            |
| ----------- | ------- | ---------------- |
| Node.js     | 20+     | Runtime          |
| Express     | 5       | Framework API    |
| MongoDB     | 8       | Base de donnees  |
| Mongoose    | 9       | ODM              |
| JWT         | -       | Authentification |
| Sharp       | -       | Optimisation images |
| Helmet      | 8       | Securite HTTP    |

## Structure du projet

```
Portfolio/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Composants reutilisables
│   │   ├── pages/          # Pages (public & admin)
│   │   ├── context/        # Contextes React
│   │   ├── hooks/          # Hooks personnalises
│   │   ├── services/       # Services API
│   │   └── routes/         # Configuration routing
│   ├── public/             # Assets statiques
│   └── vite.config.js      # Configuration Vite
│
├── server/                 # Backend Express
│   ├── config/             # Configuration (DB)
│   ├── controllers/        # Logique metier
│   ├── middlewares/        # Middlewares (auth, upload)
│   ├── models/             # Modeles Mongoose
│   ├── routes/             # Routes API
│   ├── uploads/            # Images uploadees
│   └── server.js           # Point d'entree
│
├── deploy/                 # Configuration deploiement VPS
│   ├── setup-vps.sh        # Script installation VPS
│   ├── update.sh           # Script mise a jour
│   ├── nginx.conf          # Configuration Nginx
│   └── ecosystem.config.js # Configuration PM2
│
└── .github/workflows/      # CI/CD GitHub Actions
    └── deploy.yml          # Deploiement automatique
```

## Installation locale

### Prerequis

- Node.js 20+
- npm ou yarn
- MongoDB installe localement

### 1. Cloner le projet

```bash
git clone https://github.com/YvanGui19/Portfolio_YvanGui
cd Portfolio_YvanGui
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

### 4. Acceder a l'application

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
# Local: mongodb://localhost:27017/portfolio
# VPS: mongodb://portfolio_user:PASSWORD@127.0.0.1:27017/portfolio
MONGO_URI=mongodb://localhost:27017/portfolio

# JWT
JWT_SECRET=votre_secret_jwt
JWT_EXPIRES_IN=24h

# Email (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=votre.email@gmail.com
EMAIL_PASS=mot_de_passe_application

# Frontend URL (CORS)
CLIENT_URL=http://localhost:5173

# Server
PORT=5000
NODE_ENV=development
```

## Deploiement VPS

Le projet utilise GitHub Actions pour le deploiement automatique sur VPS.

### Configuration

1. Configurer les secrets GitHub (Settings > Secrets > Actions) :
   - `VPS_HOST` : IP du VPS
   - `VPS_USER` : Utilisateur SSH
   - `VPS_SSH_KEY` : Cle privee SSH

2. Push sur `main` declenche le deploiement automatique

### Documentation complete

Voir [deploy/README.md](deploy/README.md) pour les instructions detaillees.

## Optimisations

### Performance

- Code splitting avec React.lazy()
- Lazy loading des images
- Images optimisees avec Sharp (WebP)
- Chunks separes (vendor, animations, utils)

### SEO

- Meta tags dynamiques (React Helmet)
- Open Graph complet
- Canonical URLs
- Structure semantique HTML5

### Accessibilite (WCAG)

- Skip link "Aller au contenu principal"
- Navigation clavier complete
- Attributs ARIA (aria-label, aria-pressed, aria-expanded)
- Focus visible sur tous les elements interactifs
- Alt text descriptifs sur les images
- Structure de headings logique

### Securite

- Helmet.js (CSP, HSTS, X-Frame-Options)
- Rate limiting
- Validation des entrees
- JWT HttpOnly cookies
- CORS configure

## Scripts disponibles

### Client

```bash
npm run dev      # Serveur de developpement
npm run build    # Build production
npm run preview  # Preview du build
npm run lint     # Linter ESLint
```

### Server

```bash
npm run dev      # Developpement avec nodemon
npm start        # Production
```

## API Endpoints

### Public

- `GET /api/projects` - Liste des projets
- `GET /api/projects/:id` - Detail projet
- `GET /api/skills` - Liste des competences
- `GET /api/experiences` - Liste des experiences
- `POST /api/contact` - Envoyer un message

### Admin (authentifie)

- `POST /api/auth/login` - Connexion
- `POST /api/auth/logout` - Deconnexion
- `CRUD /api/projects` - Gestion projets
- `CRUD /api/skills` - Gestion competences
- `CRUD /api/experiences` - Gestion experiences
- `GET /api/messages` - Messages recus

## Auteur

**Yvan Gui** - Developpeur Web Full Stack

- Portfolio : [yvangui.fr](https://yvangui.fr)
- Email : yvan.gui19@gmail.com
- GitHub : [YvanGui19](https://github.com/YvanGui19)

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de details.
