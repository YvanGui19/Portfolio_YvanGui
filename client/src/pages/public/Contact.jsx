import { useState } from 'react'
  import { motion } from 'framer-motion'
  import Card from '../../components/common/Card'
  import Input from '../../components/common/Input'
  import Button from '../../components/common/Button'

  function Contact() {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: '',
    })
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null)

    const validateForm = () => {
      const newErrors = {}

      if (!formData.name.trim()) {
        newErrors.name = 'Le nom est requis'
      }

      if (!formData.email.trim()) {
        newErrors.email = 'L\'email est requis'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Email invalide'
      }

      if (!formData.message.trim()) {
        newErrors.message = 'Le message est requis'
      } else if (formData.message.trim().length < 10) {
        newErrors.message = 'Le message doit contenir au moins 10 caractères'
      }

      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
    }

    const handleChange = (e) => {
      const { name, value } = e.target
      setFormData(prev => ({ ...prev, [name]: value }))
      // Effacer l'erreur quand l'utilisateur tape
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }))
      }
    }

    const handleSubmit = async (e) => {
      e.preventDefault()

      if (!validateForm()) return

      setIsSubmitting(true)
      setSubmitStatus(null)

      try {
        // TODO: Remplacer par l'appel API réel
        // await api.post('/contact', formData)

        // Simulation d'envoi
        await new Promise(resolve => setTimeout(resolve, 1000))

        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } catch (error) {
        setSubmitStatus('error')
      } finally {
        setIsSubmitting(false)
      }
    }

    return (
      <div className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Me <span className="text-primary">Contacter</span>
            </h1>
            <p className="text-text-muted max-w-2xl mx-auto">
              Vous avez un projet en tête ? N'hésitez pas à me contacter !
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Formulaire */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label="Nom"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    error={errors.name}
                  />

                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    error={errors.email}
                  />

                  <Input
                    label="Message"
                    type="textarea"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Décrivez votre projet..."
                    error={errors.message}
                  />

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                  </Button>

                  {submitStatus === 'success' && (
                    <p className="text-primary text-center">
                      Message envoyé avec succès !
                    </p>
                  )}

                  {submitStatus === 'error' && (
                    <p className="text-danger text-center">
                      Une erreur est survenue. Veuillez réessayer.
                    </p>
                  )}
                </form>
              </Card>
            </motion.div>

            {/* Informations de contact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Restons en <span className="text-primary">Contact</span>
                </h2>
                <p className="text-text-light mb-8">
                  Je suis disponible pour des missions freelance, des collaborations
                  ou simplement pour échanger sur vos projets.
                </p>
              </div>

              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-xl">📧</span>
                  </div>
                  <div>
                    <p className="text-text-muted text-sm">Email</p>
                    <p className="font-medium">contact@yvangui.dev</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-xl">📍</span>
                  </div>
                  <div>
                    <p className="text-text-muted text-sm">Localisation</p>
                    <p className="font-medium">Pamiers, France</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-xl">💼</span>
                  </div>
                  <div>
                    <p className="text-text-muted text-sm">Disponibilité</p>
                    <p className="font-medium text-primary">Disponible pour missions</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  export default Contact
