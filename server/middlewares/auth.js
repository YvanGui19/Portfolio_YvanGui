const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
try {
// Récupérer le token depuis le cookie
const token = req.cookies.token;

if (!token) {
return res.status(401).json({
message: 'Non autorisé - Veuillez vous connecter'
});
}

// Vérifier le token
const decoded = jwt.verify(token, process.env.JWT_SECRET);

// Vérifier que l'utilisateur existe toujours
const user = await User.findById(decoded.id);
if (!user) {
return res.status(401).json({
message: 'L\'utilisateur n\'existe plus'
});
}

// Ajouter l'utilisateur à la requête
req.user = user;
next();
} catch (error) {
return res.status(401).json({
message: 'Token invalide ou expiré'
});
}
};
