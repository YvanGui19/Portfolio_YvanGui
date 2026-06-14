const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true, default: 'YVAN' },
    lastName: { type: String, trim: true, default: 'GUI' },
    heroTitle: { type: String, trim: true, default: 'Développeur Web Full Stack' },
    heroBio: { type: String, trim: true, default: '' },
    bioParagraphs: { type: [String], default: [] },
    email: { type: String, trim: true, default: '' },
    location: { type: String, trim: true, default: '' },
    linkedinUrl: { type: String, trim: true, default: '' },
    githubUrl: { type: String, trim: true, default: '' },
    neofetch: {
      os: { type: String, default: 'Portfolio Linux x86_64' },
      host: { type: String, default: 'React 19 + Vite' },
      kernel: { type: String, default: 'Node.js + Express' },
      shell: { type: String, default: 'portfolio-bash 1.0' },
      terminal: { type: String, default: 'Ubuntu Style' },
      cpu: { type: String, default: 'MERN Stack @ 100%' },
      memory: { type: String, default: 'MongoDB' },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', profileSchema);
