const Experience = require('../models/Experience');

// @desc    Récupérer toutes les expériences
// @route   GET /api/experiences
// @access  Public
exports.getExperiences = async (req, res) => {
try {
const experiences = await Experience.find().sort({ type: 1, startDate: -1 });
res.status(200).json({
success: true,
count: experiences.length,
data: experiences,
});
} catch (error) {
res.status(500).json({ message: 'Erreur serveur', error: error.message });
}
};

// @desc    Créer une expérience
// @route   POST /api/experiences
// @access  Private
exports.createExperience = async (req, res) => {
try {
const experience = await Experience.create(req.body);
res.status(201).json({
success: true,
data: experience,
});
} catch (error) {
res.status(500).json({ message: 'Erreur serveur', error: error.message });
}
};

// @desc    Mettre à jour une expérience
// @route   PUT /api/experiences/:id
// @access  Private
exports.updateExperience = async (req, res) => {
try {
const experience = await Experience.findByIdAndUpdate(
req.params.id,
req.body,
{ new: true, runValidators: true }
);

if (!experience) {
return res.status(404).json({ message: 'Expérience non trouvée' });
}

res.status(200).json({
success: true,
data: experience,
});
} catch (error) {
res.status(500).json({ message: 'Erreur serveur', error: error.message });
}
};

// @desc    Supprimer une expérience
// @route   DELETE /api/experiences/:id
// @access  Private
exports.deleteExperience = async (req, res) => {
try {
const experience = await Experience.findByIdAndDelete(req.params.id);

if (!experience) {
return res.status(404).json({ message: 'Expérience non trouvée' });
}

res.status(200).json({
success: true,
message: 'Expérience supprimée',
});
} catch (error) {
res.status(500).json({ message: 'Erreur serveur', error: error.message });
}
};
