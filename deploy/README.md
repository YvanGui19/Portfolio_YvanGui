# Déploiement Portfolio sur VPS Ubuntu

## Prérequis
- VPS Ubuntu 22.04+ avec accès SSH
- Minimum 1GB RAM (2GB recommandé pour MongoDB)

---

## CI/CD avec GitHub Actions

Le projet inclut un workflow GitHub Actions qui déploie automatiquement sur le VPS à chaque push sur la branche `v2`.

### Configuration des secrets GitHub

1. Aller dans **Settings > Secrets and variables > Actions** de ton repo GitHub
2. Ajouter les secrets suivants :

| Secret | Description |
|--------|-------------|
| `VPS_HOST` | Adresse IP ou nom de domaine du VPS |
| `VPS_USER` | Utilisateur SSH (ex: `root` ou `deploy`) |
| `VPS_SSH_KEY` | Clé privée SSH (contenu complet du fichier) |
| `VPS_PORT` | Port SSH (optionnel, défaut: 22) |

### Générer une clé SSH dédiée

```bash
# Sur ta machine locale
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_deploy_key

# Copier la clé publique sur le VPS
ssh-copy-id -i ~/.ssh/github_deploy_key.pub user@YOUR_VPS_IP

# Le contenu de ~/.ssh/github_deploy_key (clé privée) va dans le secret VPS_SSH_KEY
cat ~/.ssh/github_deploy_key
```

### Déclenchement

- **Automatique** : à chaque push sur la branche `v2`
- **Manuel** : depuis l'onglet Actions > "Deploy to VPS" > "Run workflow"

---

## Déploiement initial

### 1. Connexion au VPS
```bash
ssh user@YOUR_VPS_IP
```

### 2. Télécharger et exécuter le script
```bash
# Télécharger le script de setup
curl -O https://raw.githubusercontent.com/YvanGui19/Portfolio_YvanGui/v2/deploy/setup-vps.sh

# Rendre exécutable
chmod +x setup-vps.sh

# Exécuter
./setup-vps.sh
```

### 3. C'est prêt !
Le script configure automatiquement :
- MongoDB local avec authentification
- JWT_SECRET généré automatiquement
- CLIENT_URL avec l'IP du VPS

### 4. Accéder au site
Ouvrir `http://YOUR_VPS_IP` dans le navigateur.

### 5. (Optionnel) Configurer l'envoi d'emails
```bash
nano /var/www/portfolio/server/.env
# Ajouter tes identifiants SMTP si tu veux recevoir les messages du formulaire de contact
pm2 restart portfolio-api
```

**Note** : Les images sont stockées localement dans `/var/www/portfolio/server/uploads/` et servies par Nginx.

---

## Mise à jour

```bash
# Se connecter au VPS
ssh user@YOUR_VPS_IP

# Exécuter le script de mise à jour
/var/www/portfolio/deploy/update.sh
```

Ou manuellement :
```bash
cd /var/www/portfolio
git pull origin v2
cd client && npm ci && npm run build
cd ../server && npm ci
pm2 restart portfolio-api
```

---

## Commandes utiles

### PM2 (gestion du processus Node)
```bash
pm2 status              # État de l'application
pm2 logs                # Voir les logs en temps réel
pm2 logs --lines 100    # 100 dernières lignes
pm2 restart portfolio-api  # Redémarrer
pm2 stop portfolio-api     # Arrêter
pm2 monit               # Monitoring en temps réel
```

### Nginx
```bash
sudo nginx -t                    # Tester la configuration
sudo systemctl reload nginx      # Recharger la config
sudo systemctl restart nginx     # Redémarrer
sudo tail -f /var/log/nginx/error.log  # Logs d'erreur
```

### MongoDB
```bash
sudo systemctl status mongod     # État de MongoDB
sudo systemctl restart mongod    # Redémarrer MongoDB
mongosh                          # Shell MongoDB (sans auth)

# Se connecter avec authentification
mongosh "mongodb://portfolio_user:PASSWORD@127.0.0.1:27017/portfolio"

# Voir les logs
sudo tail -f /var/log/mongodb/mongod.log
```

### Logs
```bash
# Logs PM2
tail -f /var/log/pm2/portfolio-out.log
tail -f /var/log/pm2/portfolio-error.log

# Logs Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

## Ajouter un domaine + SSL (plus tard)

### 1. Configurer le DNS
Ajouter un enregistrement A pointant vers l'IP du VPS.

### 2. Installer Certbot
```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 3. Obtenir le certificat SSL
```bash
sudo certbot --nginx -d tondomaine.com -d www.tondomaine.com
```

### 4. Mettre à jour le fichier .env
```bash
nano /var/www/portfolio/server/.env
# Changer CLIENT_URL=https://tondomaine.com
pm2 restart portfolio-api
```

---

## Structure des fichiers sur le VPS

```
/var/www/portfolio/
├── client/
│   ├── dist/          # Build frontend (servi par Nginx)
│   └── ...
├── server/
│   ├── .env           # Variables d'environnement
│   ├── uploads/       # Fichiers uploadés
│   └── ...
└── deploy/
    ├── ecosystem.config.js
    ├── nginx.conf
    └── update.sh

/etc/nginx/sites-available/portfolio  # Config Nginx
/var/log/pm2/                         # Logs PM2
```

---

## Dépannage

### L'API ne répond pas
```bash
pm2 status
pm2 logs portfolio-api --lines 50
```

### Erreur 502 Bad Gateway
```bash
# Vérifier que l'API tourne
pm2 status

# Vérifier les logs Nginx
sudo tail -f /var/log/nginx/error.log
```

### Problème de connexion MongoDB
```bash
# Vérifier que MongoDB tourne
sudo systemctl status mongod

# Vérifier le .env
cat /var/www/portfolio/server/.env | grep MONGO

# Tester la connexion manuellement
cd /var/www/portfolio/server
source .env
mongosh "$MONGO_URI" --eval "db.stats()"

# Si MongoDB ne démarre pas (erreur de mémoire)
sudo systemctl restart mongod
sudo journalctl -u mongod --no-pager -n 50
```
