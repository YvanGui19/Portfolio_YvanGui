import api from './api'

  const contactService = {
    // Envoyer un message (public)
    send: async (messageData) => {
      const response = await api.post('/contact', messageData)
      return response.data
    },

    // Récupérer tous les messages (admin)
    getAll: async () => {
      const response = await api.get('/contact/messages')
      return response.data
    },

    // Marquer comme lu (admin)
    markAsRead: async (id) => {
      const response = await api.put(`/contact/messages/${id}`, { status: 'read' })
      return response.data
    },

    // Supprimer un message (admin)
    delete: async (id) => {
      const response = await api.delete(`/contact/messages/${id}`)
      return response.data
    },
  }

  export default contactService
