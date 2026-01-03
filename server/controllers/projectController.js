const Project = require('../models/Project');

// @desc    Récupérer tous les projets
// @route   GET /api/projects
// @access  Public
exports.getProjects = async (req, res) => {
try {
const projects = await Project.find().sort({ order: 1, createdAt: -1 });
res.status(200).json({
success: true,
count: projects.length,
data: projects,
});
} catch (error) {
res.status(500).json({ message: 'Erreur serveur', error: error.message });
}
};

// @desc    Récupérer un projet par ID
// @route   GET /api/projects/:id
// @access  Public
exports.getProject = async (req, res) => {
try {
const project = await Project.findById(req.params.id);

if (!project) {
return res.status(404).json({ message: 'Projet non trouvé' });
}

res.status(200).json({
success: true,
data: project,
});
} catch (error) {
res.status(500).json({ message: 'Erreur serveur', error: error.message });
}
};

// @desc    Créer un projet
// @route   POST /api/projects
// @access  Private
exports.createProject = async (req, res) => {
try {
const project = await Project.create(req.body);
res.status(201).json({
success: true,
data: project,
});
} catch (error) {
res.status(500).json({ message: 'Erreur serveur', error: error.message });
}
};

// @desc    Mettre à jour un projet
// @route   PUT /api/projects/:id
// @access  Private
exports.updateProject = async (req, res) => {
try {
const project = await Project.findByIdAndUpdate(
req.params.id,
req.body,
{ new: true, runValidators: true }
);

if (!project) {
return res.status(404).json({ message: 'Projet non trouvé' });
}

res.status(200).json({
success: true,
data: project,
});
} catch (error) {
res.status(500).json({ message: 'Erreur serveur', error: error.message });
}
};

// @desc    Supprimer un projet
// @route   DELETE /api/projects/:id
// @access  Private
exports.deleteProject = async (req, res) => {
try {
const project = await Project.findByIdAndDelete(req.params.id);

if (!project) {
return res.status(404).json({ message: 'Projet non trouvé' });
}

res.status(200).json({
success: true,
message: 'Projet supprimé',
});
} catch (error) {
res.status(500).json({ message: 'Erreur serveur', error: error.message });
}
};
