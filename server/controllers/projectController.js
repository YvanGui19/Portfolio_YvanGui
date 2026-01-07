const Project = require('../models/Project');
const { deleteFromCloudinary, deleteMultipleFromCloudinary } = require('../middlewares/upload');

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
    // Récupérer le projet actuel pour comparer les images
    const currentProject = await Project.findById(req.params.id);

    if (!currentProject) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }

    // Identifier les images supprimées
    if (currentProject.images && req.body.images) {
      const removedImages = currentProject.images.filter(
        (img) => !req.body.images.includes(img)
      );
      // Supprimer les images retirées de Cloudinary
      if (removedImages.length > 0) {
        await deleteMultipleFromCloudinary(removedImages);
      }
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

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
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }

    // Supprimer les images de Cloudinary
    if (project.images && project.images.length > 0) {
      await deleteMultipleFromCloudinary(project.images);
    }

    // Supprimer le projet
    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Projet supprimé',
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};
