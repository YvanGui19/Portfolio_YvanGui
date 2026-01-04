import { motion } from 'framer-motion'

  const skills = [
    { name: 'HTML5', icon: '🌐' },
    { name: 'CSS3', icon: '🎨' },
    { name: 'JavaScript', icon: '⚡' },
    { name: 'React', icon: '⚛️' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Express', icon: '🚂' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'Git', icon: '📋' },
  ]

  function Skills() {
    return (
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Technologies I <span className="text-primary">Work With</span>
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Les outils et technologies que j'utilise pour créer des applications web modernes
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-surface-light border border-border rounded-lg p-4 text-center hover:border-primary hover:shadow-glow transition-all duration-300"
              >
                <span className="text-3xl mb-2 block">{skill.icon}</span>
                <span className="text-sm text-text-muted">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  export default Skills
