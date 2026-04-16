import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import ScrollToTop from '../components/common/ScrollToTop'

// Layout (chargement immédiat)
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import GlitchCursor from '../components/GlitchCursor'
import { ProceduralBackground } from '../components/canvas'

// Page d'accueil (chargement immédiat pour LCP)
import Home from '../pages/public/Home'

// Pages publiques (lazy loading)
const Projects = lazy(() => import('../pages/public/Projects'))
const About = lazy(() => import('../pages/public/About'))
const Contact = lazy(() => import('../pages/public/Contact'))
const NotFound = lazy(() => import('../pages/public/NotFound'))
const ProjectDetail = lazy(() => import('../pages/public/ProjectDetail'))
const MotifTest = lazy(() => import('../pages/public/MotifTest'))

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
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#c8f000] focus:text-[#080906] focus:font-bold focus:no-underline focus:outline-2 focus:outline-offset-2 focus:outline-white"
    >
      Aller au contenu principal
    </a>
  )
}
// Composant de chargement - Style Marathon
function PageLoader() {
  return (
    <div className="flex flex-col justify-center items-center min-h-[50vh] gap-4">
      <span className="spinner text-3xl"></span>
      <span className="font-mono text-[0.8rem] text-lime tracking-[0.2em] uppercase">
        Loading...
      </span>
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
                <div className="min-h-screen bg-[#080906] text-text flex flex-col relative">
                  <GlitchCursor />
                  <ProceduralBackground
                    animated={true}
                    gridStep={28}
                    targetFps={24}
                    speed={0.006}
                    className="fixed opacity-[0.06]"
                  />
                  <SkipLink />
                  <Header />
                  <main id="main-content" className="flex-1 relative z-[1]">
                    <Suspense fallback={<PageLoader />}>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/projects/:id" element={<ProjectDetail />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/motif-test" element={<MotifTest />} />
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

            {/* 404 pour routes admin */}
            <Route path="/admin/*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default AppRouter
