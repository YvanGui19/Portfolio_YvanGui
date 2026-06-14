import api from './api'

const profileService = {
  get: async () => {
    const response = await api.get('/profile')
    return response.data
  },

  update: async (profileData) => {
    const response = await api.put('/profile', profileData)
    return response.data
  },
}

export default profileService
