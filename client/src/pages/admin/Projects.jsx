import { useState } from 'react'
  import { Link } from 'react-router-dom'
  import { motion } from 'framer-motion'
  import Card from '../../components/common/Card'
  import Button from '../../components/common/Button'

  const mockProjects = [
    { id: 1, title: 'Portfolio Personnel', status: 'published', category: 'Full Stack' },
    { id: 2, title: 'Mon Vieux Grimoire', status: 'published', category: 'Backend' },
    { id: 3, title: 'Kasa', status: 'published', category: 'Frontend' },
    { id: 4, title: 'Sophie Bluel', status: 'draft', category: 'Frontend' },
  ]

  function Projects() {
    const [projects] = useState(mockProjects)

    const handleDelete = (id) => {
      if (window.confirm('Supprimer ce projet ?')) {
        console.log('Delete project:', id)
        // TODO: Appel API
      }
    }

    return (
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold">Projets</h1>
            <p className="text-text-muted">Gérez vos projets portfolio</p>
          </div>
          <Button to="/admin/projects/new">+ Nouveau projet</Button>
        </motion.div>

        <div className="grid gap-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-surface-light rounded-lg flex items-center justify-center">
                      📁
                    </div>
                    <div>
                      <h3 className="font-semibold">{project.title}</h3>
                      <p className="text-sm text-text-muted">{project.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      project.status === 'published'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-warning/10 text-warning'
                    }`}>
                      {project.status === 'published' ? 'Publié' : 'Brouillon'}
                    </span>
                    <Link
                      to={`/admin/projects/${project.id}/edit`}
                      className="p-2 hover:bg-surface-light rounded-lg text-text-muted hover:text-primary"
                    >
                      ✏️
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-2 hover:bg-danger/10 rounded-lg text-text-muted hover:text-danger"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  export default Projects
