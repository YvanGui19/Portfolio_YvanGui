import api from './api'

  const experienceService = {
    getAll: async () => {
      const response = await api.get('/experiences')
      return response.data
    },

    create: async (expData) => {
      const response = await api.post('/experiences', expData)
      return response.data
    },

    update: async (id, expData) => {
      const response = await api.put(`/experiences/${id}`, expData)
      return response.data
    },

    delete: async (id) => {
      const response = await api.delete(`/experiences/${id}`)
      return response.data
    },
  }

  export default experienceService
