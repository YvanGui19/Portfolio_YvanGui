const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const { getProfile, updateProfile } = require('../controllers/profileController');

router.get('/', getProfile);
router.put('/', protect, updateProfile);

module.exports = router;
