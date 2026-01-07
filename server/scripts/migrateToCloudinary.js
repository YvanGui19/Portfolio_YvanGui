/**
 * Script de migration des images locales vers Cloudinary
 * Usage: node scripts/migrateToCloudinary.js
 *
 * Ce script :
 * 1. Supprime les images locales non référencées en base de données
 * 2. Migre les images utilisées vers Cloudinary
 * 3. Met à jour les URLs en base de données
 */

require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const cloudinary = require('../config/cloudinary');
const Project = require('../models/Project');

const UPLOADS_DIR = path.join(__dirname, '../uploads/projects');

const migrateImages = async () => {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connecté à MongoDB');

    // Récupérer tous les projets et leurs images
    const projects = await Project.find();
    console.log(`${projects.length} projets trouvés`);

    // Collecter toutes les images référencées en base
    const referencedImages = new Set();
    for (const project of projects) {
      if (project.images) {
        for (const img of project.images) {
          if (!img.startsWith('http')) {
            referencedImages.add(path.basename(img));
          }
        }
      }
    }
    console.log(`${referencedImages.size} images référencées en base`);

    // Lister les fichiers locaux
    const localFiles = fs.existsSync(UPLOADS_DIR) ? fs.readdirSync(UPLOADS_DIR) : [];
    console.log(`${localFiles.length} fichiers locaux trouvés`);

    // Supprimer les fichiers non référencés
    let deletedCount = 0;
    for (const file of localFiles) {
      if (!referencedImages.has(file)) {
        const filePath = path.join(UPLOADS_DIR, file);
        fs.unlinkSync(filePath);
        console.log(`Supprimé (non référencé): ${file}`);
        deletedCount++;
      }
    }
    console.log(`${deletedCount} fichiers orphelins supprimés\n`);

    // Migrer les images vers Cloudinary
    for (const project of projects) {
      if (!project.images || project.images.length === 0) {
        console.log(`[${project.title}] Aucune image`);
        continue;
      }

      const newImages = [];
      let hasChanges = false;

      for (const imagePath of project.images) {
        // Si c'est déjà une URL Cloudinary, on garde
        if (imagePath.startsWith('http')) {
          newImages.push(imagePath);
          continue;
        }

        // Chemin local de l'image
        const filename = path.basename(imagePath);
        const localPath = path.join(UPLOADS_DIR, filename);

        // Vérifier si le fichier existe
        if (!fs.existsSync(localPath)) {
          console.log(`[${project.title}] Image non trouvée: ${filename}`);
          continue;
        }

        try {
          // Upload vers Cloudinary
          const result = await cloudinary.uploader.upload(localPath, {
            folder: 'portfolio/projects',
            transformation: [
              { width: 1200, height: 800, crop: 'limit' },
              { quality: 'auto:good' },
            ],
          });

          newImages.push(result.secure_url);
          hasChanges = true;
          console.log(`[${project.title}] Uploadé: ${filename} -> Cloudinary`);
        } catch (uploadError) {
          console.error(`[${project.title}] Erreur upload ${filename}:`, uploadError.message);
        }
      }

      // Mettre à jour le projet si des images ont été migrées
      if (hasChanges) {
        project.images = newImages;
        await project.save();
        console.log(`[${project.title}] Base de données mise à jour`);
      }
    }

    console.log('\nMigration terminée !');
  } catch (error) {
    console.error('Erreur migration:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Déconnecté de MongoDB');
  }
};

migrateImages();
