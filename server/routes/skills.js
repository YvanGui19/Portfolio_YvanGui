const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const {
getSkills,
createSkill,
updateSkill,
deleteSkill,
} = require('../controllers/skillController');

// Route publique
router.get('/', getSkills);

// Routes protégées
router.post('/', protect, createSkill);
router.put('/:id', protect, updateSkill);
router.delete('/:id', protect, deleteSkill);

module.exports = router;
