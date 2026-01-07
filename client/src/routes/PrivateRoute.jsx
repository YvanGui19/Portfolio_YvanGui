import { Navigate } from 'react-router-dom'
  import { useAuth } from '../context/AuthContext'
  import { MessagesProvider } from '../context/MessagesContext'
  import AdminLayout from '../components/layout/AdminLayout'

  function PrivateRoute({ children }) {
    const { user, loading } = useAuth()

    // Afficher un loader pendant la vérification
    if (loading) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-text-muted">Chargement...</p>
          </div>
        </div>
      )
    }

    // Rediriger si non connecté
    if (!user) {
      return <Navigate to="/admin/login" replace />
    }

    // Afficher la page avec le layout admin
    return (
      <MessagesProvider>
        <AdminLayout>{children}</AdminLayout>
      </MessagesProvider>
    )
  }

  export default PrivateRoute
