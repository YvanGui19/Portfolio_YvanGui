import { useState } from 'react'
  import { motion } from 'framer-motion'
  import { Link } from 'react-router-dom'
  import Card from '../../components/common/Card'

  // Données temporaires (seront remplacées par l'API)
  const allProjects = [
    {
      id: 1,
      title: 'Portfolio Personnel',
      description: 'Application full stack avec panel admin, authentification JWT et API REST complète.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      category: 'Full Stack',
    },
    {
      id: 2,
      title: 'Mon Vieux Grimoire',
      description: 'API REST pour un site de notation de livres avec authentification sécurisée.',
      technologies: ['Node.js', 'Express', 'MongoDB'],
      category: 'Backend',
    },
    {
      id: 3,
      title: 'Kasa',
      description: 'Application React de location immobilière avec navigation SPA et design responsive.',
      technologies: ['React', 'React Router', 'Sass'],
      category: 'Frontend',
    },
    {
      id: 4,
      title: 'Sophie Bluel',
      description: 'Portfolio dynamique avec galerie filtrable et interface admin en JavaScript vanilla.',
      technologies: ['JavaScript', 'API REST', 'HTML', 'CSS'],
      category: 'Frontend',
    },
  ]

  const categories = ['Tous', 'Full Stack', 'Frontend', 'Backend']

  function Projects() {
    const [activeFilter, setActiveFilter] = useState('Tous')

    const filteredProjects = activeFilter === 'Tous'
      ? allProjects
      : allProjects.filter(project => project.category === activeFilter)

    return (
      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Mes <span className="text-primary">Projets</span>
            </h1>
            <p className="text-text-muted max-w-2xl mx-auto">
              Découvrez les projets que j'ai réalisés durant ma formation et en freelance
            </p>
          </motion.div>

          {/* Filtres */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-primary text-background shadow-glow'
                    : 'bg-surface-light text-text-muted border border-border hover:border-primary hover:text-primary'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Grille de projets */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                layout
              >
                <Card hover className="h-full">
                  {/* Image placeholder */}
                  <div className="h-56 bg-surface-light rounded-t-xl flex items-center justify-center border-b border-border">
                    <span className="text-5xl">🖼️</span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-xl font-semibold">{project.title}</h2>
                      <span className="text-xs text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>

                    <p className="text-text-muted text-sm mb-4">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs bg-surface text-text-light border border-border rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={`/projects/${project.id}`}
                      className="inline-flex items-center text-primary font-medium hover:underline"
                    >
                      Voir le projet
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  export default Projects
