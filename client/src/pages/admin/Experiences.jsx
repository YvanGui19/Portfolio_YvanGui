import { useState } from 'react'
  import { motion } from 'framer-motion'
  import Card from '../../components/common/Card'
  import Button from '../../components/common/Button'

  const mockExperiences = [
    { id: 1, title: 'Développeur Web', company: 'OpenClassrooms', period: '2024 - Présent', type: 'education' },
    { id: 2, title: 'Expert Technique', company: 'Aéronautique', period: '2018 - 2024', type: 'work' },
    { id: 3, title: 'Mécanicien Aéronautique', company: 'Armée de l\'Air', period: '2014 - 2018', type: 'work' },
  ]

  function Experiences() {
    const [experiences] = useState(mockExperiences)

    return (
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold">Expériences</h1>
            <p className="text-text-muted">Gérez votre parcours professionnel</p>
          </div>
          <Button>+ Nouvelle expérience</Button>
        </motion.div>

        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-xl">
                      {exp.type === 'work' ? '💼' : '🎓'}
                    </div>
                    <div>
                      <h3 className="font-semibold">{exp.title}</h3>
                      <p className="text-sm text-text-muted">{exp.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-primary">{exp.period}</span>
                    <button className="p-2 hover:bg-surface-light rounded-lg text-text-muted hover:text-primary">
                      ✏️
                    </button>
                    <button className="p-2 hover:bg-danger/10 rounded-lg text-text-muted hover:text-danger">
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

  export default Experiences
