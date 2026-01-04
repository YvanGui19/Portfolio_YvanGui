import { useState } from 'react'
  import { NavLink, useNavigate } from 'react-router-dom'
  import { useAuth } from '../../context/AuthContext'

  const navItems = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: '🏠' },
    { to: '/admin/projects', label: 'Projets', icon: '📁' },
    { to: '/admin/skills', label: 'Compétences', icon: '⚡' },
    { to: '/admin/experiences', label: 'Expériences', icon: '💼' },
    { to: '/admin/messages', label: 'Messages', icon: '📧' },
  ]

  function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
      await logout()
      navigate('/admin/login')
    }

    return (
      <div className="min-h-screen bg-background">
        {/* Overlay mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 z-50 h-full w-64 bg-surface border-r border-border transform transition-transform duration-300 lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <h1 className="text-xl font-bold text-primary">Yvan Gui</h1>
            <p className="text-xs text-text-muted">Admin Portal</p>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-primary/10 text-primary shadow-glow'
                      : 'text-text-muted hover:bg-surface-light hover:text-text'
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* User section */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div>
                <p className="font-medium text-sm">{user?.name || 'Admin'}</p>
                <p className="text-xs text-text-muted">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-sm text-text-muted hover:text-danger hover:bg-danger/10 rounded-lg transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </aside>

        {/* Main content */}
        <div className="lg:ml-64">
          {/* Header mobile */}
          <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-surface border-b border-border flex items-center justify-between px-4 z-30">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-text-muted hover:text-primary"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="text-primary font-bold">Admin</span>
            <div className="w-10" />
          </header>

          {/* Page content */}
          <main className="p-6 pt-20 lg:pt-6 min-h-screen">
            {children}
          </main>
        </div>
      </div>
    )
  }

  export default AdminLayout
