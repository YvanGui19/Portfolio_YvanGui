import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../../context/AuthContext'
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
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 bg-dark-navy relative overflow-hidden page-404-grid hero-grid">
      {/* Glitch effects overlay */}
      <div className="hero-glitch-overlay" />
      <div className="hero-glitch-bars" />
      <div className="hero-glitch-blocks" />
      <div className="hero-glitch-blocks-extra" />
      <div className="hero-crt-lines" />

      {/* Marathon style artifacts - Cyan theme */}
      <div className="section-artifacts">
        {/* === MOBILE ONLY === */}
        <div className="marathon-diagonal-stripes marathon-diagonal-stripes-cyan 2xl:hidden" style={{ top: '10%', right: '3%', width: '24px', height: '80px' }} />
        <div className="marathon-diagonal-stripes marathon-diagonal-stripes-cyan 2xl:hidden" style={{ bottom: '8%', left: '3%', width: '22px', height: '70px' }} />

        {/* === DESKTOP ONLY === */}
        {/* Haut gauche - COIN : flèche + rayures */}
        <div className="marathon-artifact marathon-artifact-xl marathon-artifact-cyan hidden 2xl:block" style={{ top: '8%', left: '2%' }}>⇱</div>
        <div className="marathon-diagonal-stripes marathon-diagonal-stripes-cyan hidden 2xl:block" style={{ top: '12%', left: '2%', width: '45px', height: '260px' }} />

        {/* Haut gauche - grille (bien décalée) */}
        <div className="marathon-grid marathon-grid-3x3 marathon-grid-cyan hidden 2xl:block" style={{ top: '18%', left: '6%' }}>
          <span>◇</span><span>─</span><span>◇</span>
          <span>│</span><span>◈</span><span>│</span>
          <span>◇</span><span>─</span><span>◇</span>
        </div>

        {/* Haut droit - données verticales */}
        <div className="marathon-vline marathon-vline-cyan hidden 2xl:block" style={{ top: '10%', right: '2%' }}>
          <span>»</span><span>─</span><span>◎</span><span>─</span><span>»</span><span>─</span><span>◎</span><span>─</span><span>»</span>
        </div>

        {/* Milieu gauche - données verticales */}
        <div className="marathon-vline marathon-vline-cyan hidden 2xl:block" style={{ top: '48%', left: '2%' }}>
          <span>┌</span><span>│</span><span>─</span><span>│</span><span>─</span><span>│</span><span>─</span><span>│</span><span>┘</span>
        </div>

        {/* Milieu droit - grille */}
        <div className="marathon-grid marathon-grid-3x3 marathon-grid-cyan hidden 2xl:block" style={{ top: '32%', right: '2%' }}>
          <span>⟨</span><span>─</span><span>⟩</span>
          <span>│</span><span>@</span><span>│</span>
          <span>⟨</span><span>─</span><span>⟩</span>
        </div>

        {/* Milieu droit - data strip */}
        <div className="marathon-data-strip marathon-data-strip-cyan hidden 2xl:block" style={{ top: '48%', right: '2%' }}>
          <span>┌──@──┐</span>
          <span>│∙∙∙∙∙│</span>
          <span>└──@──┘</span>
        </div>

        {/* Bas gauche - pattern horizontal */}
        <div className="marathon-hline marathon-hline-cyan hidden 2xl:block" style={{ bottom: '18%', left: '2%' }}>
          <span>⟨</span><span>─</span><span>◎</span><span>─</span><span>∙</span><span>─</span><span>◎</span><span>─</span><span>⟩</span>
        </div>

        {/* Bas droit - COIN : rayures + flèche */}
        <div className="marathon-diagonal-stripes marathon-diagonal-stripes-cyan hidden 2xl:block" style={{ bottom: '12%', right: '2%', width: '45px', height: '280px' }} />
        <div className="marathon-artifact marathon-artifact-xl marathon-artifact-cyan hidden 2xl:block" style={{ bottom: '4%', right: '2%' }}>⇲</div>

        {/* Bas droit - grille (bien décalée) */}
        <div className="marathon-grid marathon-grid-3x3 marathon-grid-cyan hidden 2xl:block" style={{ bottom: '22%', right: '6%' }}>
          <span>»</span><span>─</span><span>«</span>
          <span>│</span><span>◎</span><span>│</span>
          <span>»</span><span>─</span><span>«</span>
        </div>
      </div>

      <Helmet>
        <title>Admin Login | Yvan Gui</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Access tag */}
      <div className="font-mono text-[0.75rem] text-cyan tracking-[0.3em] uppercase mb-4 relative z-10">
        // ACCESS_PANEL
      </div>

      {/* Large title with glitch effect */}
      <div className="glitch-title-admin text-[clamp(3rem,10vw,5rem)] tracking-[0.15em] uppercase mb-2 relative z-10">
        ADMIN
      </div>

      {/* Subtitle */}
      <h1 className="font-mono text-[clamp(0.8rem,2vw,1rem)] tracking-[0.2em] text-grey uppercase mb-8 relative z-10">
        AUTHENTIFICATION REQUISE
      </h1>

      {/* Login form */}
      <form onSubmit={handleSubmit} className="w-full max-w-sm relative z-10 space-y-4 mb-6">
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />

        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Mot de passe"
        />

        {error && (
          <div className="font-mono text-[0.8rem] text-red text-center py-2">
            // {error}
          </div>
        )}

        <Button
          type="submit"
          variant="danger"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Connexion...' : 'Se connecter'}
        </Button>
      </form>

      {/* Back link */}
      <div className="relative z-10 mb-8">
        <Button to="/" variant="ghost" size="sm">
          ← Retour au site
        </Button>
      </div>

      {/* Terminal details */}
      <div className="font-mono text-[0.8rem] text-grey text-left px-6 py-4 border border-white/10 bg-black/30 relative z-10 max-w-sm w-full">
        <div className="mb-1">
          <span className="text-off-white">&gt; Route:</span>{' '}
          <span className="text-cyan">/admin/login</span>
        </div>
        <div className="mb-1">
          <span className="text-off-white">&gt; Access:</span>{' '}
          <span className="text-red">RESTRICTED</span>
        </div>
        <div>
          <span className="text-off-white">&gt; Protocol:</span>{' '}
          <span className="text-cyan">SECURE_AUTH</span>
        </div>
      </div>
    </div>
  )
}

export default Login
