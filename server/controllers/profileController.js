const Profile = require('../models/Profile');

const DEFAULT_PROFILE = {
  firstName: 'YVAN',
  lastName: 'GUI',
  heroTitle: 'Infrastructure & Sécurité — Étudiant Mastère ERIS',
  heroBio:
    "Ancien expert technique en aéronautique, je mets mes compétences d'analyse, de rigueur et de résolution de problèmes au service de l'infrastructure et de la cybersécurité — avec un solide bagage en développement web.",
  bioParagraphs: [
    "Passionné par la technologie depuis toujours, j'ai d'abord construit ma carrière dans l'aéronautique. Pendant plus de dix ans, de la maintenance d'hélicoptères militaires à la coordination de projets en défense, j'ai évolué dans des environnements exigeant rigueur, précision et fiabilité opérationnelle.",
    "Diplômé Développeur Web (RNCP), je conçois aujourd'hui des applications full-stack que je déploie et opère moi-même : ce portfolio React, un gestionnaire de mots de passe zero-knowledge, un générateur d'entropie cryptographique.",
    "Étudiant en Mastère ERIS (Expert Réseaux, Infrastructures & Sécurité), j'administre un VPS souverain sous Linux qui héberge mes services en production — visioconférence, VPN maillé, accès distant chiffré. Ce double profil dev + infra constitue mon socle DevSecOps : développer, durcir et exploiter en gardant la sécurité au cœur de chaque décision.",
  ],
  email: 'yvan.gui19@gmail.com',
  location: 'Toulouse, France',
  linkedinUrl: 'https://www.linkedin.com/in/yvangui',
  githubUrl: 'https://github.com/YvanGui19',
};

async function getOrCreateProfile() {
  let profile = await Profile.findOne();
  if (!profile) {
    profile = await Profile.create(DEFAULT_PROFILE);
  }
  return profile;
}

// @desc    Récupérer le profil (singleton, auto-seed si vide)
// @route   GET /api/profile
// @access  Public
exports.getProfile = async (req, res) => {
  try {
    const profile = await getOrCreateProfile();
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// @desc    Mettre à jour le profil
// @route   PUT /api/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const existing = await getOrCreateProfile();
    const updated = await Profile.findByIdAndUpdate(existing._id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};
