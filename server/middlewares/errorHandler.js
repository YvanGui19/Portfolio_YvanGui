const errorHandler = (err, req, res, next) => {
console.error('Erreur:', err);

// Erreur de validation Mongoose
if (err.name === 'ValidationError') {
const messages = Object.values(err.errors).map((e) => e.message);
return res.status(400).json({
success: false,
message: 'Erreur de validation',
errors: messages,
});
}

// Erreur de cast Mongoose (ID invalide)
if (err.name === 'CastError') {
return res.status(400).json({
success: false,
message: 'ID invalide',
});
}

// Erreur de duplication (email déjà utilisé, etc.)
if (err.code === 11000) {
const field = Object.keys(err.keyValue)[0];
return res.status(400).json({
success: false,
message: `Ce ${field} est déjà utilisé`,
});
}

// Erreur JWT
if (err.name === 'JsonWebTokenError') {
return res.status(401).json({
success: false,
message: 'Token invalide',
});
}

// Erreur JWT expiré
if (err.name === 'TokenExpiredError') {
return res.status(401).json({
success: false,
message: 'Token expiré',
});
}

// Erreur par défaut
res.status(err.statusCode || 500).json({
success: false,
message: err.message || 'Erreur serveur',
});
};

module.exports = errorHandler;
