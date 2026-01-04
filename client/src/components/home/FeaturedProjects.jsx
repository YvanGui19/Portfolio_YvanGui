import { motion } from 'framer-motion'
  import { Link } from 'react-router-dom'
  import Card from '../common/Card'
  import Button from '../common/Button'

  // Données temporaires � remplacer par l'API)
  const featuredProjects = [
    {
      id: 1,
      title: 'Portfolio Personnel',
      description: 'Application full stack avec panel admin, authentification JWT et API REST.',
      technologies: ['React', 'Node.js', 'MongoDB'],
      image: null,
    },
    {
      id: 2,
      title: 'Mon Vieux Grimoire',
      description: 'API REST pour un site de notation de livres avec authentification sécurisée.',
      technologies: ['Node.js', 'Express', 'MongoDB'],
      image: null,
    },
    {
      id: 3,
      title: 'Kasa',
      description: 'Application React de location immobilière avec navigation SPA.',
      technologies: ['React', 'React Router', 'Sass'],
      image: null,
    },
  ]

  function FeaturedProjects() {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Featured <span className="text-primary">Projects</span>
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Découvrez mes dernières réalisations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card hover className="h-full flex flex-col">
                  {/* Image placeholder */}
                  <div className="h-48 bg-surface-light rounded-t-xl flex items-center justify-center border-b border-border">
                    <span className="text-4xl">🖼️</span>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-text-muted text-sm mb-4 flex-1">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs bg-primary/10 text-primary border border-primary/30 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={`/projects/${project.id}`}
                      className="text-primary text-sm font-medium hover:underline"
                    >
                      Voir le projet →
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button to="/projects" variant="outline">
              Voir tous les projets
            </Button>
          </div>
        </div>
      </section>
    )
  }

  export default FeaturedProjects
