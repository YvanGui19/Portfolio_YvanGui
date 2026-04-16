# Déploiement Portfolio sur VPS Ubuntu

## Prérequis
- VPS Ubuntu 20.04+ avec accès SSH
- Compte MongoDB Atlas (ou MongoDB local)

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

### 3. Configurer l'environnement
```bash
# Éditer le fichier .env du serveur
nano /var/www/portfolio/server/.env
```

Variables à modifier :
- `MONGO_URI` : Ta connexion MongoDB Atlas
- `JWT_SECRET` : Générer avec `openssl rand -base64 32`
- `CLIENT_URL` : `http://YOUR_VPS_IP`

### 4. Redémarrer l'API
```bash
pm2 restart portfolio-api
```

### 5. Accéder au site
Ouvrir `http://YOUR_VPS_IP` dans le navigateur.

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
# Vérifier le .env
cat /var/www/portfolio/server/.env | grep MONGO

# Tester la connexion manuellement
cd /var/www/portfolio/server
node -e "require('mongoose').connect(process.env.MONGO_URI).then(() => console.log('OK')).catch(console.error)"
```
