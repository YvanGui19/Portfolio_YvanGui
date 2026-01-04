import { useState } from 'react'
  import { motion } from 'framer-motion'
  import Card from '../../components/common/Card'

  const mockMessages = [
    { id: 1, name: 'Marie Dupont', email: 'marie@example.com', message: 'Bonjour, je suis intéressée par vos services...', date: 'Aujourd\'hui', read: false },
    { id: 2, name: 'Jean Martin', email: 'jean@example.com', message: 'Votre portfolio est impressionnant !', date: 'Hier', read: false },
    { id: 3, name: 'Sophie Laurent', email: 'sophie@example.com', message: 'Disponible pour une mission freelance ?', date: 'Il y a 3 jours', read: true },
  ]

  function Messages() {
    const [messages] = useState(mockMessages)
    const [selected, setSelected] = useState(null)

    return (
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-text-muted">Consultez les messages reçus</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Liste des messages */}
          <div className="lg:col-span-1 space-y-3">
            {messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`p-4 cursor-pointer transition-all ${
                    selected?.id === msg.id ? 'border-primary' : ''
                  } ${!msg.read ? 'border-l-4 border-l-primary' : ''}`}
                  onClick={() => setSelected(msg)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                      {msg.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-sm truncate">{msg.name}</p>
                        <span className="text-xs text-text-muted">{msg.date}</span>
                      </div>
                      <p className="text-xs text-text-muted truncate">{msg.message}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Détail du message */}
          <div className="lg:col-span-2">
            {selected ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Card className="p-6">
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl font-bold">
                      {selected.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">{selected.name}</h2>
                      <p className="text-text-muted">{selected.email}</p>
                    </div>
                  </div>
                  <p className="text-text-light leading-relaxed mb-6">{selected.message}</p>
                  <div className="flex gap-3">
                    <a
                      href={`mailto:${selected.email}`}
                      className="px-4 py-2 bg-primary text-background rounded-lg font-medium hover:bg-primary-dark transition-colors"
                    >
                      Répondre
                    </a>
                    <button className="px-4 py-2 text-danger hover:bg-danger/10 rounded-lg transition-colors">
                      Supprimer
                    </button>
                  </div>
                </Card>
              </motion.div>
            ) : (
              <Card className="p-12 text-center">
                <p className="text-text-muted">Sélectionnez un message pour le lire</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    )
  }

  export default Messages
