import { motion } from 'framer-motion'
  import Button from '../common/Button'

  function CallToAction() {
    return (
      <section className="py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Let's Build Something{' '}
              <span className="text-primary">Amazing</span> Together
            </h2>
            <p className="text-text-muted text-lg mb-8 max-w-2xl mx-auto">
              Vous avez un projet en tête ? Je suis disponible pour discuter
              de vos idées et vous accompagner dans leur réalisation.
            </p>
            <Button to="/contact" size="lg">
              Me contacter
            </Button>
          </motion.div>
        </div>
      </section>
    )
  }

  export default CallToAction
