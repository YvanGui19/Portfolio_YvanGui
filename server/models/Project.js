const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
{
title: {
type: String,
required: [true, 'Le titre est requis'],
trim: true,
},
description: {
type: String,
required: [true, 'La description est requise'],
minlength: [20, 'La description doit contenir au moins 20 caractères'],
},
technologies: {
type: [String],
default: [],
},
images: {
type: [String],
default: [],
},
githubUrl: {
type: String,
trim: true,
},
liveUrl: {
type: String,
trim: true,
},
featured: {
type: Boolean,
default: false,
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

// Index pour trier par ordre et date
projectSchema.index({ order: 1, createdAt: -1 });

module.exports = mongoose.model('Project', projectSchema);
