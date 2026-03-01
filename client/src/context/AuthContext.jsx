import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

// Création du contexte
const AuthContext = createContext(null)

// Provider qui enveloppe l'application
export function AuthProvider({ children }) {
const [user, setUser] = useState(null)
const [loading, setLoading] = useState(true)

// Vérifie si l'utilisateur est déjà connecté au chargement
// Seulement si une session était active (évite erreur 401 dans la console)
useEffect(() => {
const hasSession = localStorage.getItem('hasSession')
if (hasSession) {
  checkAuth()
} else {
  setLoading(false)
}
}, [])

const checkAuth = async () => {
try {
const response = await api.get('/auth/me')
setUser(response.data.user)
} catch {
setUser(null)
localStorage.removeItem('hasSession')
} finally {
setLoading(false)
}
}

const login = async (email, password) => {
const response = await api.post('/auth/login', { email, password })
localStorage.setItem('hasSession', 'true')
setUser(response.data.user)
return response.data
}

const logout = async () => {
await api.post('/auth/logout')
localStorage.removeItem('hasSession')
setUser(null)
}

return (
<AuthContext.Provider value={{ user, loading, login, logout }}>
{children}
</AuthContext.Provider>
)
}

// Hook personnalisé pour utiliser le contexte
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
const context = useContext(AuthContext)
if (!context) {
throw new Error('useAuth doit être utilisé dans un AuthProvider')
}
return context
}
