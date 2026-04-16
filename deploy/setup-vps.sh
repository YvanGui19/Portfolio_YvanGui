#!/bin/bash

# ===========================================
# Script de déploiement Portfolio sur VPS Ubuntu
# Inclut: Node.js, Nginx, MongoDB, PM2
# ===========================================

set -e  # Arrêter en cas d'erreur

echo "=========================================="
echo "  Déploiement Portfolio - VPS Ubuntu"
echo "=========================================="

# Variables
APP_DIR="/var/www/portfolio"
REPO_URL="https://github.com/YvanGui19/Portfolio_YvanGui.git"
BRANCH="v2"
MONGO_DB_NAME="portfolio"
MONGO_USER="portfolio_user"
MONGO_PASS=$(openssl rand -base64 16 | tr -dc 'a-zA-Z0-9' | head -c 20)

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

print_step() {
    echo -e "${GREEN}[STEP]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 1. Mise à jour système
print_step "Mise à jour du système..."
sudo apt update && sudo apt upgrade -y

# 2. Installation de MongoDB 7.0
print_step "Installation de MongoDB 7.0..."
sudo apt install -y gnupg curl

# Ajouter la clé GPG MongoDB
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

# Ajouter le repository MongoDB
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
   sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

sudo apt update
sudo apt install -y mongodb-org

# Démarrer et activer MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Attendre que MongoDB soit prêt
sleep 3

# Créer l'utilisateur admin et l'utilisateur de l'application
print_step "Configuration de MongoDB..."
mongosh --eval "
use admin
db.createUser({
  user: 'admin',
  pwd: '$(openssl rand -base64 16 | tr -dc 'a-zA-Z0-9' | head -c 20)',
  roles: ['root']
})

use $MONGO_DB_NAME
db.createUser({
  user: '$MONGO_USER',
  pwd: '$MONGO_PASS',
  roles: [{ role: 'readWrite', db: '$MONGO_DB_NAME' }]
})
" || print_warning "Les utilisateurs MongoDB existent peut-être déjà"

# Activer l'authentification MongoDB
print_step "Activation de l'authentification MongoDB..."
sudo tee /etc/mongod.conf > /dev/null << 'MONGOCONF'
storage:
  dbPath: /var/lib/mongodb
  journal:
    enabled: true

systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log

net:
  port: 27017
  bindIp: 127.0.0.1

processManagement:
  timeZoneInfo: /usr/share/zoneinfo

security:
  authorization: enabled
MONGOCONF

sudo systemctl restart mongod

# 3. Installation de Node.js
print_step "Installation de Node.js 20.x..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

print_step "Installation de Nginx..."
sudo apt install -y nginx

print_step "Installation de PM2..."
sudo npm install -g pm2

print_step "Installation de Git..."
sudo apt install -y git

# 3. Création du répertoire
print_step "Création du répertoire application..."
sudo mkdir -p $APP_DIR
sudo chown -R $USER:$USER $APP_DIR

# 4. Clonage du repo
print_step "Clonage du repository..."
if [ -d "$APP_DIR/.git" ]; then
    cd $APP_DIR
    git fetch origin
    git checkout $BRANCH
    git pull origin $BRANCH
else
    git clone -b $BRANCH $REPO_URL $APP_DIR
    cd $APP_DIR
fi

# 5. Installation des dépendances
print_step "Installation des dépendances client..."
cd $APP_DIR/client
npm ci --production=false

print_step "Installation des dépendances serveur..."
cd $APP_DIR/server
npm ci --production

# 6. Build du frontend
print_step "Build du frontend..."
cd $APP_DIR/client
npm run build

# 7. Configuration de l'environnement
print_step "Configuration de l'environnement serveur..."
JWT_SECRET=$(openssl rand -base64 32)
VPS_IP=$(curl -s ifconfig.me || echo "YOUR_VPS_IP")

cat > $APP_DIR/server/.env << ENVEOF
NODE_ENV=production
PORT=5000

# MongoDB Local
MONGO_URI=mongodb://${MONGO_USER}:${MONGO_PASS}@127.0.0.1:27017/${MONGO_DB_NAME}

# JWT Secret (généré automatiquement)
JWT_SECRET=${JWT_SECRET}
JWT_EXPIRES_IN=24h

# Email (optionnel)
EMAIL_HOST=
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASS=

# URL du frontend
CLIENT_URL=http://${VPS_IP}
ENVEOF

# Créer le dossier uploads avec les bonnes permissions
print_step "Configuration du dossier uploads..."
mkdir -p $APP_DIR/server/uploads/projects
chown -R $USER:$USER $APP_DIR/server/uploads
chmod -R 755 $APP_DIR/server/uploads

print_step "Fichier .env créé avec MongoDB local configuré"

# 8. Configuration Nginx
print_step "Configuration de Nginx..."
sudo cp $APP_DIR/deploy/nginx.conf /etc/nginx/sites-available/portfolio
sudo ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

# 9. Création du répertoire de logs PM2
print_step "Configuration des logs PM2..."
sudo mkdir -p /var/log/pm2
sudo chown -R $USER:$USER /var/log/pm2

# 10. Démarrage de l'application
print_step "Démarrage de l'application avec PM2..."
cd $APP_DIR
pm2 delete portfolio-api 2>/dev/null || true
pm2 start deploy/ecosystem.config.js
pm2 save
pm2 startup systemd -u $USER --hp /home/$USER

# 11. Configuration du firewall
print_step "Configuration du firewall..."
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw --force enable

echo ""
echo "=========================================="
echo -e "${GREEN}  Déploiement terminé !${NC}"
echo "=========================================="
echo ""
echo "Prochaines étapes :"
echo "1. Modifier le fichier .env : nano $APP_DIR/server/.env"
echo "2. Redémarrer l'API : pm2 restart portfolio-api"
echo "3. Accéder au site : http://YOUR_VPS_IP"
echo ""
echo "Commandes utiles :"
echo "  pm2 status          - État de l'application"
echo "  pm2 logs            - Voir les logs"
echo "  pm2 restart all     - Redémarrer"
echo "  sudo nginx -t       - Tester config Nginx"
echo ""
