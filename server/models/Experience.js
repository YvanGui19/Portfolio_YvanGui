const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema(
{
type: {
type: String,
required: [true, 'Le type est requis'],
enum: ['experience', 'education'],
},
title: {
type: String,
required: [true, 'Le titre est requis'],
trim: true,
},
company: {
type: String,
required: [true, 'L\'entreprise ou l\'école est requise'],
trim: true,
},
location: {
type: String,
trim: true,
},
startDate: {
type: Date,
required: [true, 'La date de début est requise'],
},
endDate: {
type: Date,
default: null, // null = en cours
},
description: {
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

// Index pour trier par type et date
experienceSchema.index({ type: 1, startDate: -1 });

module.exports = mongoose.model('Experience', experienceSchema);
