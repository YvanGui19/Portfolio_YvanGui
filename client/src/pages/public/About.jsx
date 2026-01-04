import { motion } from 'framer-motion'
  import Card from '../../components/common/Card'
  import Button from '../../components/common/Button'

  const experiences = [
    {
      type: 'work',
      title: 'Développeur Web Full Stack',
      company: 'Formation OpenClassrooms',
      period: '2025 - Présent',
      description: 'Développement d\'applications web complètes avec React, Node.js et MongoDB.',
    },
    {
      type: 'work',
      title: 'Expert Technique / Coordinateur',
      company: 'Secteur Aéronautique',
      period: '2014 - 2024',
      description: 'Support technique, gestion de projets et coordination d\'équipes sur hélicoptères et avions.',
    },
    {
      type: 'education',
      title: 'Développeur Web',
      company: 'OpenClassrooms',
      period: '2024 - 2025',
      description: 'Formation complète : HTML, CSS, JavaScript, React, Node.js, MongoDB.',
    },
  ]

  const skillCategories = [
    {
      name: 'Frontend',
      skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Tailwind CSS', 'Sass'],
    },
    {
      name: 'Backend',
      skills: ['Node.js', 'Express.js', 'MongoDB', 'API REST', 'JWT'],
    },
    {
      name: 'Outils',
      skills: ['Git', 'GitHub', 'VS Code', 'Figma', 'Postman'],
    },
  ]

  function About() {
    return (
      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              À <span className="text-primary">Propos</span>
            </h1>
            <p className="text-text-muted max-w-2xl mx-auto">
              De l'aéronautique au développement web
            </p>
          </motion.div>

          {/* Mon Histoire */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid lg:grid-cols-2 gap-12 items-center mb-20"
          >
            <div>
              <h2 className="text-2xl font-bold mb-6">
                Mon <span className="text-primary">Histoire</span>
              </h2>
              <div className="space-y-4 text-text-light">
                <p>
                  Passionné par la technologie depuis toujours, j'ai d'abord construit ma carrière
                  dans l'aéronautique. Pendant plus de dix ans, j'ai travaillé sur des hélicoptères
                  et des avions, avant d'évoluer vers le support et l'expertise technique.
                </p>
                <p>
                  Ces expériences m'ont appris la précision, la rigueur et la fiabilité
                  opérationnelle dans des environnements exigeants.
                </p>
                <p>
                  Aujourd'hui, je conçois des solutions web fiables et orientées utilisateur,
                  avec la même rigueur et le même sens du service qui m'ont guidé dans l'aéronautique.
                </p>
              </div>
              <div className="flex gap-4 mt-8">
                <Button to="/contact">Me contacter</Button>
                <Button variant="outline" href="/cv.pdf">
                  Télécharger CV
                </Button>
              </div>
            </div>

            {/* Avatar */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center">
                  <span className="text-6xl lg:text-8xl font-bold text-primary">YG</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Expériences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-2xl font-bold mb-8 text-center">
              Mon <span className="text-primary">Parcours</span>
            </h2>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {exp.type === 'work' ? '💼' : '🎓'}
                        </span>
                        <h3 className="text-lg font-semibold">{exp.title}</h3>
                      </div>
                      <span className="text-primary text-sm">{exp.period}</span>
                    </div>
                    <p className="text-text-muted ml-11">{exp.company}</p>
                    <p className="text-text-light text-sm mt-2 ml-11">{exp.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Compétences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-8 text-center">
              Mes <span className="text-primary">Compétences</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {skillCategories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full">
                    <h3 className="text-lg font-semibold text-primary mb-4">
                      {category.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 text-sm bg-surface text-text-light border border-border rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  export default About
