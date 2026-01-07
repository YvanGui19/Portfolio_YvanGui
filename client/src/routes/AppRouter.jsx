import { BrowserRouter, Routes, Route } from 'react-router-dom'
  import { AuthProvider } from '../context/AuthContext'
  import ScrollToTop from '../components/common/ScrollToTop'

  // Layout
  import Header from '../components/layout/Header'
  import Footer from '../components/layout/Footer'

  // Pages publiques
  import Home from '../pages/public/Home'
  import Projects from '../pages/public/Projects'
  import About from '../pages/public/About'
  import Contact from '../pages/public/Contact'
  import NotFound from '../pages/public/NotFound'
  import ProjectDetail from '../pages/public/ProjectDetail'

  // Pages admin
  import Login from '../pages/admin/Login'
  import Dashboard from '../pages/admin/Dashboard'
  import AdminProjects from '../pages/admin/Projects'
  import Skills from '../pages/admin/Skills'
  import Experiences from '../pages/admin/Experiences'
  import Messages from '../pages/admin/Messages'
  import ProjectForm from '../pages/admin/ProjectForm'

  // Protection des routes
  import PrivateRoute from './PrivateRoute'

  function AppRouter() {
    return (
      <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
          <Routes>
            {/* Routes publiques avec Header/Footer */}
            <Route
              path="/*"
              element={
                <div className="min-h-screen bg-background text-text flex flex-col">
                  <Header />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/projects" element={<Projects />} />
                      <Route path="/projects/:id" element={<ProjectDetail />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              }
            />

            {/* Route login (sans layout) */}
            <Route path="/admin/login" element={<Login />} />

            {/* Routes admin protégées */}
            <Route path="/admin/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/admin/projects" element={<PrivateRoute><AdminProjects /></PrivateRoute>} />
            <Route path="/admin/projects/new" element={<PrivateRoute><ProjectForm /></PrivateRoute>} />
            <Route path="/admin/projects/:id/edit" element={<PrivateRoute><ProjectForm /></PrivateRoute>} />
            <Route path="/admin/skills" element={<PrivateRoute><Skills /></PrivateRoute>} />
            <Route path="/admin/experiences" element={<PrivateRoute><Experiences /></PrivateRoute>} />
            <Route path="/admin/messages" element={<PrivateRoute><Messages /></PrivateRoute>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    )
  }

  export default AppRouter
