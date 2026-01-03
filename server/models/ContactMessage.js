const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema(
{
name: {
type: String,
required: [true, 'Le nom est requis'],
trim: true,
},
email: {
type: String,
required: [true, 'L\'email est requis'],
trim: true,
lowercase: true,
match: [/^\S+@\S+\.\S+$/, 'Email invalide'],
},
message: {
type: String,
required: [true, 'Le message est requis'],
minlength: [10, 'Le message doit contenir au moins 10 caractères'],
},
status: {
type: String,
enum: ['unread', 'read'],
default: 'unread',
},
},
{
timestamps: true,
}
);

// Index pour trier par statut et date
contactMessageSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
