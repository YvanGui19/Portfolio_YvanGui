const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Générer un token JWT et l'envoyer dans un cookie
const sendTokenCookie = (user, statusCode, res) => {
const token = jwt.sign(
{ id: user._id },
process.env.JWT_SECRET,
{ expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
);

res.cookie('token', token, {
httpOnly: true,
secure: process.env.NODE_ENV === 'production',
sameSite: 'strict',
maxAge: 24 * 60 * 60 * 1000, // 24 heures
});

res.status(statusCode).json({
success: true,
user: {
id: user._id,
email: user.email,
name: user.name,
role: user.role,
},
});
};

// @desc    Créer un admin
// @route   POST /api/auth/register
// @access  Private (pour créer le premier admin, temporairement public)
exports.register = async (req, res) => {
try {
const { email, password, name } = req.body;

// Vérifier si l'utilisateur existe déjà
const existingUser = await User.findOne({ email });
if (existingUser) {
return res.status(400).json({ message: 'Cet email est déjà utilisé' });
}

// Créer l'utilisateur
const user = await User.create({ email, password, name });

sendTokenCookie(user, 201, res);
} catch (error) {
res.status(500).json({ message: 'Erreur serveur', error: error.message });
}
};

// @desc    Connexion
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
try {
const { email, password } = req.body;

// Vérifier que email et password sont fournis
if (!email || !password) {
return res.status(400).json({ message: 'Email et mot de passe requis' });
}

// Trouver l'utilisateur (inclure le password)
const user = await User.findOne({ email }).select('+password');
if (!user) {
return res.status(401).json({ message: 'Identifiants invalides' });
}

// Vérifier le mot de passe
const isMatch = await user.comparePassword(password);
if (!isMatch) {
return res.status(401).json({ message: 'Identifiants invalides' });
}

sendTokenCookie(user, 200, res);
} catch (error) {
res.status(500).json({ message: 'Erreur serveur', error: error.message });
}
};

// @desc    Déconnexion
// @route   POST /api/auth/logout
// @access  Private
exports.logout = async (req, res) => {
res.cookie('token', '', {
httpOnly: true,
expires: new Date(0),
});

res.status(200).json({ success: true, message: 'Déconnexion réussie' });
};

// @desc    Obtenir l'utilisateur connecté
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
try {
const user = await User.findById(req.user._id);
res.status(200).json({
success: true,
user: {
id: user._id,
email: user.email,
name: user.name,
role: user.role,
},
});
} catch (error) {
res.status(500).json({ message: 'Erreur serveur', error: error.message });
}
};

// @desc    Mettre à jour le profil
// @route   PUT /api/auth/me
// @access  Private
exports.updateMe = async (req, res) => {
try {
const { name, email } = req.body;

const user = await User.findByIdAndUpdate(
req.user._id,
{ name, email },
{ new: true, runValidators: true }
);

res.status(200).json({
success: true,
user: {
id: user._id,
email: user.email,
name: user.name,
role: user.role,
},
});
} catch (error) {
res.status(500).json({ message: 'Erreur serveur', error: error.message });
}
};
