const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const {
getExperiences,
createExperience,
updateExperience,
deleteExperience,
} = require('../controllers/experienceController');

// Route publique
router.get('/', getExperiences);

// Routes protégées
router.post('/', protect, createExperience);
router.put('/:id', protect, updateExperience);
router.delete('/:id', protect, deleteExperience);

module.exports = router;
