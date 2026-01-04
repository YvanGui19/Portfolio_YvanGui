import { motion } from 'framer-motion'
  import Button from '../common/Button'

  function Hero() {
    return (
      <section className="min-h-screen flex items-center justify-center pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Texte */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-primary font-medium mb-4">Hello, je suis</p>
              <h1 className="text-5xl lg:text-7xl font-bold mb-4">
                <span className="text-text">Yvan</span>{' '}
                <span className="text-primary">Gui</span>
              </h1>
              <h2 className="text-2xl lg:text-3xl text-text-muted mb-6">
                Développeur Web
              </h2>
              <p className="text-text-light mb-8 max-w-lg">
                Ancien mécanicien et expert technique dans l'aéronautique,
                j'ai choisi de mettre mes compétences d'analyse, de rigueur
                et de résolution de problèmes au service du développement web.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button to="/projects">Voir mes projets</Button>
                <Button variant="outline" to="/contact">Me contacter</Button>
              </div>
            </motion.div>

            {/* Avatar / Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center">
                  <span className="text-6xl lg:text-8xl font-bold text-primary">YG</span>
                </div>
                {/* Cercle décoratif */}
                <div className="absolute -inset-4 rounded-full border border-primary/20 animate-pulse" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    )
  }

  export default Hero
