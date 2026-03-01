import axios from 'axios'

// Création de l'instance Axios configurée
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Envoie les cookies avec chaque requête (JWT)
  headers: {
'Content-Type': 'application/json',
},
})

export default api
