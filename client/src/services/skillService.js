import api from './api'

  const skillService = {
    getAll: async () => {
      const response = await api.get('/skills')
      return response.data
    },

    create: async (skillData) => {
      const response = await api.post('/skills', skillData)
      return response.data
    },

    update: async (id, skillData) => {
      const response = await api.put(`/skills/${id}`, skillData)
      return response.data
    },

    delete: async (id) => {
      const response = await api.delete(`/skills/${id}`)
      return response.data
    },
  }

  export default skillService
