import { useState } from 'react'
  import { useNavigate } from 'react-router-dom'
  import { motion } from 'framer-motion'
  import { useAuth } from '../../context/AuthContext'
  import Card from '../../components/common/Card'
  import Input from '../../components/common/Input'
  import Button from '../../components/common/Button'

  function Login() {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    })
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleChange = (e) => {
      const { name, value } = e.target
      setFormData(prev => ({ ...prev, [name]: value }))
      setError('')
    }

    const handleSubmit = async (e) => {
      e.preventDefault()

      if (!formData.email || !formData.password) {
        setError('Veuillez remplir tous les champs')
        return
      }

      setIsLoading(true)
      setError('')

      try {
        await login(formData.email, formData.password)
        navigate('/admin/dashboard')
      } catch (err) {
        setError(err.response?.data?.message || 'Identifiants incorrects')
      } finally {
        setIsLoading(false)
      }
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Admin Panel</h1>
            <p className="text-text-muted">Connectez-vous pour accéder au dashboard</p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@example.com"
              />

              <Input
                label="Mot de passe"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
              />

              {error && (
                <p className="text-danger text-sm text-center">{error}</p>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Connexion...' : 'Se connecter'}
              </Button>
            </form>
          </Card>

          <p className="text-center mt-6 text-text-muted text-sm">
            <a href="/" className="text-primary hover:underline">
              ← Retour au site
            </a>
          </p>
        </motion.div>
      </div>
    )
  }

  export default Login
