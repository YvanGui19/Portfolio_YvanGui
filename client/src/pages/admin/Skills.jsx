import { useState } from 'react'
  import { motion } from 'framer-motion'
  import Card from '../../components/common/Card'
  import Button from '../../components/common/Button'
  import Input from '../../components/common/Input'

  const mockSkills = [
    { id: 1, name: 'React', category: 'Frontend', level: 90 },
    { id: 2, name: 'Node.js', category: 'Backend', level: 85 },
    { id: 3, name: 'MongoDB', category: 'Backend', level: 80 },
    { id: 4, name: 'JavaScript', category: 'Frontend', level: 95 },
  ]

  function Skills() {
    const [skills] = useState(mockSkills)
    const [showForm, setShowForm] = useState(false)

    return (
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold">Compétences</h1>
            <p className="text-text-muted">Gérez vos compétences techniques</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Annuler' : '+ Nouvelle compétence'}
          </Button>
        </motion.div>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-8"
          >
            <Card className="p-6">
              <form className="grid sm:grid-cols-3 gap-4">
                <Input label="Nom" placeholder="React, Node.js..." />
                <Input label="Catégorie" placeholder="Frontend, Backend..." />
                <Input label="Niveau (%)" type="number" placeholder="90" />
                <div className="sm:col-span-3">
                  <Button type="submit">Ajouter</Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">{skill.name}</h3>
                  <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {skill.category}
                  </span>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-text-muted">Niveau</span>
                    <span className="text-primary">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-surface-light rounded-full">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 p-2 text-sm hover:bg-surface-light rounded-lg text-text-muted hover:text-primary">
                    ✏️ Modifier
                  </button>
                  <button className="flex-1 p-2 text-sm hover:bg-danger/10 rounded-lg text-text-muted hover:text-danger">
                    🗑️ Supprimer
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  export default Skills
