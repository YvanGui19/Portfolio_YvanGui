import { BrowserRouter, Routes, Route } from 'react-router-dom'
  import Header from '../components/layout/Header'
  import Footer from '../components/layout/Footer'
  import Home from '../pages/public/Home'
  import Projects from '../pages/public/Projects'
  import About from '../pages/public/About'
  import Contact from '../pages/public/Contact'
  import NotFound from '../pages/public/NotFound'

  function AppRouter() {
    return (
      <BrowserRouter>
        <div className="min-h-screen bg-background text-text flex flex-col">
          <Header />

          <main className="flex-1">
            <Routes>
              {/* Routes publiques */}
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* Route 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    )
  }

  export default AppRouter
