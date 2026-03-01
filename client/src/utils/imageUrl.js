/**
 * Retourne l'URL complète d'une image
 * Gère les URLs Cloudinary (complètes) et les chemins locaux (relatifs)
 */
export const getImageUrl = (path) => {
  if (!path) return null;

  // Si c'est déjà une URL complète (Cloudinary ou autre)
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // Sinon, c'est un chemin relatif - ajouter l'URL de base
  return `${import.meta.env.VITE_UPLOADS_URL}${path}`;
};
