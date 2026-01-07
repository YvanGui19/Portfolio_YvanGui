const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
{
email: {
type: String,
required: [true, 'L\'email est requis'],
unique: true,
lowercase: true,
trim: true,
match: [/^\S+@\S+\.\S+$/, 'Email invalide'],
},
password: {
type: String,
required: [true, 'Le mot de passe est requis'],
minlength: [8, 'Le mot de passe doit contenir au moins 8 caractères'],
select: false,
},
name: {
type: String,
required: [true, 'Le nom est requis'],
trim: true,
},
role: {
type: String,
enum: ['admin'],
default: 'admin',
},
},
{
timestamps: true,
}
);

// Hash du mot de passe avant sauvegarde
userSchema.pre('save', async function () {
if (!this.isModified('password')) {
return;
}

const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password, salt);
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
