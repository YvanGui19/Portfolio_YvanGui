import { motion } from 'framer-motion'
  import { Link } from 'react-router-dom'
  import { useAuth } from '../../context/AuthContext'
  import Card from '../../components/common/Card'
  import Button from '../../components/common/Button'

  const stats = [
    { label: 'Projets', value: '4', icon: '📁', trend: '+2 ce mois' },
    { label: 'Compétences', value: '12', icon: '⚡', trend: '+3 récentes' },
    { label: 'Messages', value: '8', icon: '📧', trend: '3 non lus' },
    { label: 'Expériences', value: '5', icon: '💼', trend: 'À jour' },
  ]

  const recentActivity = [
    { action: 'Nouveau message de Marie Dupont', time: 'Il y a 2h', icon: '📧' },
    { action: 'Projet "Portfolio" mis à jour', time: 'Il y a 5h', icon: '📁' },
    { action: 'Compétence "React" ajoutée', time: 'Hier', icon: '⚡' },
  ]

  function Dashboard() {
    const { user } = useAuth()

    return (
      <div>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">
            Bienvenue, <span className="text-primary">{user?.name || 'Admin'}</span>
          </h1>
          <p className="text-text-muted">Voici un aperçu de votre portfolio</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card hover className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{stat.icon}</span>
                  <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {stat.trend}
                  </span>
                </div>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-text-muted text-sm">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Actions rapides */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">Actions rapides</h2>
          <div className="flex flex-wrap gap-4">
            <Button to="/admin/projects/new">+ Nouveau projet</Button>
            <Button variant="outline" to="/admin/messages">Voir les messages</Button>
            <Button variant="outline" to="/admin/skills">Gérer compétences</Button>
          </div>
        </motion.div>

        {/* Activité récente */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card>
            <Card.Header>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Activité récente</h2>
                <Link to="/admin/messages" className="text-sm text-primary hover:underline">
                  Tout voir →
                </Link>
              </div>
            </Card.Header>
            <Card.Content className="p-0">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 border-b border-border last:border-b-0"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span>{activity.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.action}</p>
                    <p className="text-xs text-text-muted">{activity.time}</p>
                  </div>
                </div>
              ))}
            </Card.Content>
          </Card>
        </motion.div>
      </div>
    )
  }

  export default Dashboard
