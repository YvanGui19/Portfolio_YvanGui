# Scripts Portfolio

## generate-dithered-avatar.js

Ce script génère une image dithered à partir d'une photo portrait. L'objectif est de **ne jamais exposer la photo originale** sur internet tout en conservant l'effet visuel dithered du portfolio.

### Installation

```bash
cd scripts
npm install
```

> Note: Le script utilise `jimp`, une bibliothèque pure JavaScript qui ne nécessite pas de compilation native (contrairement à `canvas`).

### Utilisation

```bash
# Depuis le dossier scripts/
node generate-dithered-avatar.js <chemin-image-originale> [chemin-sortie]

# Exemple
node generate-dithered-avatar.js ../ma-photo-originale.png ../client/public/images/profile-dithered.png
```

### Options (variables d'environnement)

```bash
# Changer la couleur (défaut: #C2FE0B - lime Marathon)
DITHER_COLOR=#01FFFF node generate-dithered-avatar.js ./photo.png

# Changer la taille des pixels (défaut: 2)
DITHER_SIZE=3 node generate-dithered-avatar.js ./photo.png

# Changer la taille de sortie (défaut: 320px)
DITHER_OUTPUT=400 node generate-dithered-avatar.js ./photo.png
```

### Workflow recommandé

1. **Garde ta photo originale en dehors du repo** (ou dans un dossier ignoré par git)
2. **Génère l'image dithered** :
   ```bash
   node generate-dithered-avatar.js /chemin/vers/ma-vraie-photo.png ../client/public/images/profile-dithered.png
   ```
3. **Commite uniquement l'image dithered** (`profile-dithered.png`)
4. **Ne commite JAMAIS l'originale**

### Sécurité

Le fichier `.gitignore` à la racine du projet est configuré pour ignorer les patterns courants de photos originales :
- `**/profile-original.*`
- `**/photo-originale.*`
- `**/original-portrait.*`
- `*.original.png`
- `*.original.jpg`

Si ta photo a un autre nom, ajoute-la manuellement au `.gitignore` avant de commiter.
