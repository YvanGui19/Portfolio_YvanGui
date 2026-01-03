const Skill = require('../models/Skill');

// @desc    Récupérer toutes les compétences
// @route   GET /api/skills
// @access  Public
exports.getSkills = async (req, res) => {
try {
const skills = await Skill.find().sort({ category: 1, order: 1 });
res.status(200).json({
success: true,
count: skills.length,
data: skills,
});
} catch (error) {
res.status(500).json({ message: 'Erreur serveur', error: error.message });
}
};

// @desc    Créer une compétence
// @route   POST /api/skills
// @access  Private
exports.createSkill = async (req, res) => {
try {
const skill = await Skill.create(req.body);
res.status(201).json({
success: true,
data: skill,
});
} catch (error) {
res.status(500).json({ message: 'Erreur serveur', error: error.message });
}
};

// @desc    Mettre à jour une compétence
// @route   PUT /api/skills/:id
// @access  Private
exports.updateSkill = async (req, res) => {
try {
const skill = await Skill.findByIdAndUpdate(
req.params.id,
req.body,
{ new: true, runValidators: true }
);

if (!skill) {
return res.status(404).json({ message: 'Compétence non trouvée' });
}

res.status(200).json({
success: true,
data: skill,
});
} catch (error) {
res.status(500).json({ message: 'Erreur serveur', error: error.message });
}
};

// @desc    Supprimer une compétence
// @route   DELETE /api/skills/:id
// @access  Private
exports.deleteSkill = async (req, res) => {
try {
const skill = await Skill.findByIdAndDelete(req.params.id);

if (!skill) {
return res.status(404).json({ message: 'Compétence non trouvée' });
}

res.status(200).json({
success: true,
message: 'Compétence supprimée',
});
} catch (error) {
res.status(500).json({ message: 'Erreur serveur', error: error.message });
}
};
