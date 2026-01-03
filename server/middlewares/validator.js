const { body, validationResult } = require('express-validator');

// Middleware pour gérer les résultats de validation
const handleValidation = (req, res, next) => {
const errors = validationResult(req);
if (!errors.isEmpty()) {
return res.status(400).json({
success: false,
message: 'Erreur de validation',
errors: errors.array().map((err) => ({
field: err.path,
message: err.msg,
})),
});
}
next();
};

// Validation pour l'inscription
const registerValidation = [
body('name')
.trim()
.notEmpty()
.withMessage('Le nom est requis'),
body('email')
.trim()
.isEmail()
.withMessage('Email invalide')
.normalizeEmail(),
body('password')
.isLength({ min: 8 })
.withMessage('Le mot de passe doit contenir au moins 8 caractères'),
handleValidation,
];

// Validation pour la connexion
const loginValidation = [
body('email')
.trim()
.isEmail()
.withMessage('Email invalide')
.normalizeEmail(),
body('password')
.notEmpty()
.withMessage('Le mot de passe est requis'),
handleValidation,
];

// Validation pour les projets
const projectValidation = [
body('title')
.trim()
.notEmpty()
.withMessage('Le titre est requis'),
body('description')
.trim()
.isLength({ min: 20 })
.withMessage('La description doit contenir au moins 20 caractères'),
handleValidation,
];

// Validation pour le formulaire de contact
const contactValidation = [
body('name')
.trim()
.notEmpty()
.withMessage('Le nom est requis'),
body('email')
.trim()
.isEmail()
.withMessage('Email invalide')
.normalizeEmail(),
body('message')
.trim()
.isLength({ min: 10 })
.withMessage('Le message doit contenir au moins 10 caractères'),
handleValidation,
];

module.exports = {
registerValidation,
loginValidation,
projectValidation,
contactValidation,
};
