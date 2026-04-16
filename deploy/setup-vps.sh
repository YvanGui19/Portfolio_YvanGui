#!/bin/bash

# ===========================================
# Script de déploiement Portfolio sur VPS Ubuntu
# ===========================================

set -e  # Arrêter en cas d'erreur

echo "=========================================="
echo "  Déploiement Portfolio - VPS Ubuntu"
echo "=========================================="

# Variables
APP_DIR="/var/www/portfolio"
REPO_URL="https://github.com/YvanGui19/Portfolio_YvanGui.git"
BRANCH="v2"

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_step() {
    echo -e "${GREEN}[STEP]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# 1. Mise à jour système
print_step "Mise à jour du système..."
sudo apt update && sudo apt upgrade -y

# 2. Installation des dépendances
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
if [ ! -f "$APP_DIR/server/.env" ]; then
    cat > $APP_DIR/server/.env << 'ENVEOF'
NODE_ENV=production
PORT=5000

# MongoDB - Remplacer par ta connexion
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/portfolio

# JWT Secret - Générer un secret unique
JWT_SECRET=CHANGE_ME_TO_A_SECURE_SECRET

# Cloudinary (optionnel)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# URL du frontend
CLIENT_URL=http://YOUR_VPS_IP
ENVEOF
    print_warning "Fichier .env créé - MODIFIER LES VALEURS dans $APP_DIR/server/.env"
fi

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
