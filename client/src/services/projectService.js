import api from './api'

  const projectService = {
    // Récupérer tous les projets
    getAll: async () => {
      const response = await api.get('/projects')
      return response.data
    },

    // Récupérer un projet par ID
    getById: async (id) => {
      const response = await api.get(`/projects/${id}`)
      return response.data
    },

    // Créer un projet (admin)
    create: async (projectData) => {
      const response = await api.post('/projects', projectData)
      return response.data
    },

    // Modifier un projet (admin)
    update: async (id, projectData) => {
      const response = await api.put(`/projects/${id}`, projectData)
      return response.data
    },

    // Supprimer un projet (admin)
    delete: async (id) => {
      const response = await api.delete(`/projects/${id}`)
      return response.data
    },
    
// Upload une image
    uploadImage: async (file) => {
      const formData = new FormData()
      formData.append('image', file)
      const response = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return response.data
    }
  }

  export default projectService
