const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const {
register,
login,
logout,
getMe,
updateMe,
} = require('../controllers/authController');

// Routes publiques
router.post('/register', register);
router.post('/login', login);

// Routes protégées
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);
router.put('/me', protect, updateMe);

module.exports = router;
