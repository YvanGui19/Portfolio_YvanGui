#!/bin/bash

# ===========================================
# Script de mise à jour du Portfolio
# ===========================================

set -e

APP_DIR="/var/www/portfolio"
BRANCH="main"

GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${GREEN}[UPDATE]${NC} Mise à jour du portfolio..."

cd $APP_DIR

# Pull des dernières modifications
echo -e "${GREEN}[UPDATE]${NC} Pull des modifications..."
git fetch origin
git checkout $BRANCH
git pull origin $BRANCH

# Mise à jour des dépendances
echo -e "${GREEN}[UPDATE]${NC} Mise à jour des dépendances client..."
cd $APP_DIR/client
npm ci --production=false

echo -e "${GREEN}[UPDATE]${NC} Mise à jour des dépendances serveur..."
cd $APP_DIR/server
npm ci --production

# Rebuild du frontend
echo -e "${GREEN}[UPDATE]${NC} Rebuild du frontend..."
cd $APP_DIR/client
npm run build

# Redémarrage de l'API
echo -e "${GREEN}[UPDATE]${NC} Redémarrage de l'API..."
pm2 restart portfolio-api

echo ""
echo -e "${GREEN}[UPDATE]${NC} Mise à jour terminée !"
echo ""
