const ContactMessage = require('../models/ContactMessage');

// @desc    Envoyer un message de contact
// @route   POST /api/contact
// @access  Public
exports.sendMessage = async (req, res) => {
try {
const message = await ContactMessage.create(req.body);
res.status(201).json({
success: true,
message: 'Message envoyé avec succès',
data: message,
});
} catch (error) {
res.status(500).json({ message: 'Erreur serveur', error: error.message });
}
};

// @desc    Récupérer tous les messages
// @route   GET /api/contact/messages
// @access  Private
exports.getMessages = async (req, res) => {
try {
const messages = await ContactMessage.find().sort({ createdAt: -1 });
res.status(200).json({
success: true,
count: messages.length,
data: messages,
});
} catch (error) {
res.status(500).json({ message: 'Erreur serveur', error: error.message });
}
};

// @desc    Mettre à jour le statut d'un message
// @route   PUT /api/contact/messages/:id
// @access  Private
exports.updateMessageStatus = async (req, res) => {
try {
const message = await ContactMessage.findByIdAndUpdate(
req.params.id,
{ status: req.body.status },
{ new: true, runValidators: true }
);

if (!message) {
return res.status(404).json({ message: 'Message non trouvé' });
}

res.status(200).json({
success: true,
data: message,
});
} catch (error) {
res.status(500).json({ message: 'Erreur serveur', error: error.message });
}
};

// @desc    Supprimer un message
// @route   DELETE /api/contact/messages/:id
// @access  Private
exports.deleteMessage = async (req, res) => {
try {
const message = await ContactMessage.findByIdAndDelete(req.params.id);

if (!message) {
return res.status(404).json({ message: 'Message non trouvé' });
}

res.status(200).json({
success: true,
message: 'Message supprimé',
});
} catch (error) {
res.status(500).json({ message: 'Erreur serveur', error: error.message });
}
};
