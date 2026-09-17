# yvangui.fr - Infrastructure VPS souveraine et portfolio applicatif

Infrastructure VPS Linux souveraine (Debian, Nginx, PM2, hardening HTTP) hébergeant un portfolio applicatif full-stack (React 19 + Node/Express 5 + MongoDB). Déploiement automatisé via GitHub Actions.

[![Live Demo](https://img.shields.io/badge/demo-live-green)](https://yvangui.fr)
[![Debian](https://img.shields.io/badge/VPS-Debian-orange)](https://www.debian.org/)
[![Nginx](https://img.shields.io/badge/Nginx-reverse--proxy-green)](https://nginx.org/)
[![PM2](https://img.shields.io/badge/PM2-process--manager-blue)](https://pm2.keymetrics.io/)
[![GitHub Actions](https://img.shields.io/badge/CI/CD-GitHub_Actions-black)](https://github.com/features/actions)

## Démo

- **Site en production** : [https://yvangui.fr](https://yvangui.fr)

## Infrastructure

Le VPS Debian héberge l’ensemble de la stack en autonomie, sans dépendance cloud provider.

### Composants

| Rôle                  | Techno                              |
| --------------------- | ----------------------------------- |
| OS                    | Debian                              |
| Reverse proxy + TLS   | Nginx + Let’s Encrypt (certbot)     |
| Process manager Node  | PM2 (ecosystem.config.js)           |
| Base de données       | MongoDB en local sur VPS            |
| Firewall              | UFW                                 |
| Accès distant         | SSH clé publique uniquement         |
| CI/CD                 | GitHub Actions (push main → deploy) |

### Sécurité HTTP applicative

- Helmet.js (CSP, HSTS, X-Frame-Options, referrer policy)
- Rate limiting sur endpoints publics
- JWT en HttpOnly cookies (pas de token en localStorage)
- CORS restrictif
- Validation serveur des entrées
- Sharp pour l’optimisation des images (contre le stockage brut)

### Fichiers infrastructure

Voir `deploy/` :

- `setup-vps.sh` - script d’installation initial du VPS (packages, users, permissions)
- `nginx.conf` - configuration reverse proxy avec TLS
- `ecosystem.config.js` - configuration PM2 pour Node en production
- `update.sh` - script de mise à jour à chaud
- `.github/workflows/deploy.yml` - pipeline CI/CD (build + SSH deploy)

### Documentation infrastructure

Voir [deploy/README.md](deploy/README.md) pour la procédure complète de déploiement.

## Application hébergée

L’application est un portfolio full-stack construit en React + Node.

### Fonctionnalités publiques

- Page d’accueil avec présentation et compétences
- Portfolio de projets avec filtres par catégorie
- Page détail projet avec galerie d’images
- Formulaire de contact
- Mode CLI interactif

### Fonctionnalités admin

- Authentification JWT
- CRUD projets / compétences / expériences
- Messagerie de contact

### Stack applicative

#### Frontend

| Technologie   | Version | Usage         |
| ------------- | ------- | ------------- |
| React         | 19      | Framework UI  |
| Vite          | 7       | Build tool    |
| Tailwind CSS  | 4       | Styles        |
| Framer Motion | 12      | Animations    |
| React Router  | 7       | Routing       |
| Axios         | 1.13    | Requêtes HTTP |
| React Helmet  | 2       | SEO           |

#### Backend

| Technologie | Version | Usage               |
| ----------- | ------- | ------------------- |
| Node.js     | 20+     | Runtime             |
| Express     | 5       | Framework API       |
| MongoDB     | 8       | Base de données     |
| Mongoose    | 9       | ODM                 |
| JWT         | -       | Authentification    |
| Sharp       | -       | Optimisation images |
| Helmet      | 8       | Sécurité HTTP       |

## Structure du projet

```
Portfolio/
├── deploy/                 # Infrastructure VPS
│   ├── setup-vps.sh        # Installation VPS
│   ├── update.sh           # Mise à jour à chaud
│   ├── nginx.conf          # Reverse proxy + TLS
│   └── ecosystem.config.js # PM2
│
├── .github/workflows/      # CI/CD
│   └── deploy.yml          # Pipeline déploiement
│
├── server/                 # Backend Express
│   ├── config/             # Configuration (DB)
│   ├── controllers/        # Logique métier
│   ├── middlewares/        # Auth, upload
│   ├── models/             # Modèles Mongoose
│   ├── routes/             # Routes API
│   ├── uploads/            # Images uploadées
│   └── server.js           # Point d’entrée
│
└── client/                 # Frontend React
    ├── src/
    │   ├── components/     # Composants
    │   ├── pages/          # Pages
    │   ├── context/        # Contextes
    │   ├── hooks/          # Hooks perso
    │   ├── services/       # Services API
    │   └── routes/         # Routing
    ├── public/             # Assets
    └── vite.config.js      # Config Vite
```

## Installation locale

### Prérequis

- Node.js 20+
- npm ou yarn
- MongoDB installé localement

### 1. Cloner le projet

```bash
git clone https://github.com/YvanGui19/Portfolio_YvanGui
cd Portfolio_YvanGui
```

### 2. Backend

```bash
cd server
npm install
cp .env.example .env
# Configurer les variables d’environnement dans .env
npm run dev
```

### 3. Frontend

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

### 4. Accéder

- Frontend : http://localhost:5173
- Backend : http://localhost:5000

## Variables d’environnement

### Client (.env)

```env
VITE_API_URL=http://localhost:5000/api
VITE_UPLOADS_URL=http://localhost:5000
```

### Server (.env)

```env
# MongoDB
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

## Déploiement VPS (CI/CD)

Le projet utilise GitHub Actions pour un déploiement automatique sur VPS Debian.

### Pipeline

Push sur `main` déclenche :

1. Checkout du code
2. Build du client (Vite)
3. Copie SSH vers le VPS
4. Reload PM2 sur le VPS

### Configuration GitHub Actions

Secrets requis (Settings > Secrets > Actions) :

- `VPS_HOST` - IP du VPS
- `VPS_USER` - utilisateur SSH
- `VPS_SSH_KEY` - clé privée SSH

Voir [deploy/README.md](deploy/README.md) pour la procédure complète.

## Optimisations

### Performance

- Code splitting avec React.lazy()
- Lazy loading des images
- Images optimisées avec Sharp (WebP)
- Chunks séparés (vendor, animations, utils)

### SEO

- Meta tags dynamiques (React Helmet)
- Open Graph
- Canonical URLs
- Structure sémantique HTML5

### Accessibilité (WCAG)

- Skip link « Aller au contenu principal »
- Navigation clavier complète
- Attributs ARIA (aria-label, aria-pressed, aria-expanded)
- Focus visible sur tous les éléments interactifs
- Alt text descriptifs sur les images
- Structure de headings logique

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

- `GET /api/projects` - liste des projets
- `GET /api/projects/:id` - détail projet
- `GET /api/skills` - liste des compétences
- `GET /api/experiences` - liste des expériences
- `POST /api/contact` - envoyer un message

### Admin (authentifié)

- `POST /api/auth/login` - connexion
- `POST /api/auth/logout` - déconnexion
- `CRUD /api/projects` - gestion projets
- `CRUD /api/skills` - gestion compétences
- `CRUD /api/experiences` - gestion expériences
- `GET /api/messages` - messages reçus

## Auteur

**Yvan Gui**, en reconversion vers l’infrastructure et la cybersécurité (Mastère ERIS, ORT France).

- Site : [yvangui.fr](https://yvangui.fr)
- Email : yvan.gui19@gmail.com
- GitHub : [YvanGui19](https://github.com/YvanGui19)

## Licence

MIT. Voir [LICENSE](LICENSE).
