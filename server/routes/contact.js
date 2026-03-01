const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const { contactValidation } = require('../middlewares/validator');
const {
sendMessage,
getMessages,
updateMessageStatus,
deleteMessage,
} = require('../controllers/contactController');

// Route publique
router.post('/', contactValidation, sendMessage);

// Routes protégées
router.get('/messages', protect, getMessages);
router.put('/messages/:id', protect, updateMessageStatus);
router.delete('/messages/:id', protect, deleteMessage);

module.exports = router;
