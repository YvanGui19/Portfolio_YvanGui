const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
{
name: {
type: String,
required: [true, 'Le nom de la compétence est requis'],
trim: true,
},
category: {
type: String,
required: [true, 'La catégorie est requise'],
enum: ['Frontend', 'Backend', 'Tools', 'Other'],
},
level: {
type: Number,
min: 1,
max: 5,
default: 3,
},
icon: {
type: String,
trim: true,
},
order: {
type: Number,
default: 0,
},
},
{
timestamps: true,
}
);

// Index pour trier par catégorie et ordre
skillSchema.index({ category: 1, order: 1 });

module.exports = mongoose.model('Skill', skillSchema);
