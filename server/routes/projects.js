const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const {
getProjects,
getProject,
createProject,
updateProject,
deleteProject,
} = require('../controllers/projectController');

// Routes publiques
router.get('/', getProjects);
router.get('/:id', getProject);

// Routes protégées
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;
