const Profile = require('../models/Profile');

const DEFAULT_PROFILE = {
  firstName: 'YVAN',
  lastName: 'GUI',
  heroTitle: 'Développeur Web Full Stack',
  heroBio:
    "Ancien expert technique dans l'aéronautique, j'ai choisi de mettre mes compétences d'analyse, de rigueur et de résolution de problèmes au service du développement web.",
  bioParagraphs: [
    "Passionné par la technologie depuis toujours, j'ai d'abord construit ma carrière dans l'aéronautique. Pendant plus de dix ans, j'ai travaillé sur des hélicoptères et des avions.",
    "Ces expériences m'ont appris la précision, la rigueur et la fiabilité opérationnelle dans des environnements exigeants.",
    "Aujourd'hui, je conçois des solutions web fiables et orientées utilisateur, avec la même rigueur qui m'a guidé dans l'aéronautique.",
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
