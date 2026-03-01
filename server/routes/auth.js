const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const { loginValidation } = require('../middlewares/validator');
const {
login,
logout,
getMe,
updateMe,
} = require('../controllers/authController');

// Route publique
router.post('/login', loginValidation, login);

// Routes protégées
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);
router.put('/me', protect, updateMe);

module.exports = router;
