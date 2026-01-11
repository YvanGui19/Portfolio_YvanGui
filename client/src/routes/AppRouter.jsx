import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import ScrollToTop from '../components/common/ScrollToTop'

// Layout (chargement immédiat)
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

// Page d'accueil (chargement immédiat pour LCP)
import Home from '../pages/public/Home'

// Pages publiques (lazy loading)
const Projects = lazy(() => import('../pages/public/Projects'))
const About = lazy(() => import('../pages/public/About'))
const Contact = lazy(() => import('../pages/public/Contact'))
const NotFound = lazy(() => import('../pages/public/NotFound'))
const ProjectDetail = lazy(() => import('../pages/public/ProjectDetail'))

// Pages admin (lazy loading - chunk séparé)
const Login = lazy(() => import(/* webpackChunkName: "admin" */ '../pages/admin/Login'))
const Dashboard = lazy(() => import(/* webpackChunkName: "admin" */ '../pages/admin/Dashboard'))
const AdminProjects = lazy(() => import(/* webpackChunkName: "admin" */ '../pages/admin/Projects'))
const Skills = lazy(() => import(/* webpackChunkName: "admin" */ '../pages/admin/Skills'))
const Experiences = lazy(() => import(/* webpackChunkName: "admin" */ '../pages/admin/Experiences'))
const Messages = lazy(() => import(/* webpackChunkName: "admin" */ '../pages/admin/Messages'))
const ProjectForm = lazy(() => import(/* webpackChunkName: "admin" */ '../pages/admin/ProjectForm'))

// Protection des routes
import PrivateRoute from './PrivateRoute'


// Lien d'évitement pour l'accessibilité
function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-background focus:rounded-lg focus:outline-none"
    >
      Aller au contenu principal
    </a>
  )
}
// Composant de chargement
function PageLoader() {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Routes publiques avec Header/Footer */}
            <Route
              path="/*"
              element={
                <div className="min-h-screen bg-background text-text flex flex-col">
                  <SkipLink />
                  <Header />
                  <main id="main-content" className="flex-1">
                    <Suspense fallback={<PageLoader />}>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/projects/:id" element={<ProjectDetail />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Suspense>
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
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default AppRouter
